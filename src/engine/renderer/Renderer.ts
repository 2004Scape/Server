import Entity from '#/engine/entity/Entity.js';
import InfoMessage from '#/network/server/InfoMessage.js';
import InfoMessageEncoder from '#/network/server/codec/InfoMessageEncoder.js';
import ServerProtRepository from '#/network/rs225/server/prot/ServerProtRepository.js';
import Packet from '#/io/Packet.js';
import InfoProt from '#/network/rs225/server/prot/InfoProt.js';

interface Bits {
    n: number;
    value: number;
    bytes: number;
}

export default abstract class Renderer<T extends Entity> {
    public static readonly MAX_BYTES: number = 4997;

    public static readonly PLAYER_ADD_BITS: number = 23;
    public static readonly NPC_ADD_BITS: number = 35;

    private static readonly TELEPORT_BITS: number = 21;
    private static readonly RUN_BITS: number = 10;
    private static readonly WALK_BITS: number = 7;
    private static readonly EXTEND_BITS: number = 3;
    private static readonly REMOVE_BITS: number = 3;
    private static readonly IDLE_BITS: number = 1;

    protected readonly infos: Map<InfoProt, Map<number, Uint8Array>>;

    protected readonly highs: Map<number, number>;
    protected readonly lows: Map<number, number>;

    private readonly bits: Map<number, Bits>;

    protected constructor(infos: Map<InfoProt, Map<number, Uint8Array>>) {
        this.infos = infos;
        this.highs = new Map();
        this.lows = new Map();
        this.bits = new Map();
    }

    abstract computeInfo(entity: T): void;
    abstract computeBits(entity: T): void;

    write1(buf: Packet, masks: number): void {
        buf.p1(masks & 0xff);
    }

    write2(buf: Packet, masks: number, big: number): void {
        if (masks > 0xff) {
            masks |= big;
        }
        buf.p1(masks & 0xff);
        if (masks & big) {
            buf.p1(masks >> 8);
        }
    }

    cache(id: number, message: InfoMessage, prot: InfoProt): number {
        const cache = this.infos.get(prot);
        if (typeof cache === 'undefined') {
            throw new Error('[Renderer] tried to cache to empty!');
        }
        if (cache.has(id) && !message.persists) {
            return 0;
        }
        return this.encodeInfo(cache, id, message);
    }

    cacheBits(id: number, bits: Bits): void {
        this.bits.set(id, bits);
    }

    write(buf: Packet, id: number, prot: InfoProt): void {
        const cache: Map<number, Uint8Array> | undefined = this.infos.get(prot);
        if (typeof cache === 'undefined') {
            throw new Error('[Renderer] tried to write a buf not cached!');
        }
        this.writeBlock(buf, cache, id);
    }

    writeBits(buf: Packet, id: number, bytes: number): number {
        const bits: Bits | undefined = this.bits.get(id);
        if (typeof bits === 'undefined') {
            throw new Error('[Renderer] tried to write a bits buf not cached!');
        }
        if (!this.space(bytes, buf, bits.n, bits.bytes)) {
            buf.pBit(Renderer.IDLE_BITS, 0);
            return 0;
        }
        buf.pBit(bits.n, bits.value);
        return bits.bytes;
    }

    has(id: number, prot: InfoProt): boolean {
        const cache: Map<number, Uint8Array> | undefined = this.infos.get(prot);
        return cache ? cache.has(id) : false;
    }

    highdefinitions(id: number): number {
        return this.highs.get(id) ?? 0;
    }

    lowdefinitions(id: number): number {
        return this.lows.get(id) ?? 0;
    }

    removeTemporary() {
        this.highs.clear();
        this.bits.clear();
    }

    removePermanent(id: number) {
        this.highs.delete(id);
        this.lows.delete(id);
    }

    teleport(buf: Packet, y: number, x: number, z: number, jump: boolean, extend: boolean,): void {
        buf.pBit(Renderer.TELEPORT_BITS, (1 << 20) | (3 << 18) | ((y & 0x3) << 16) | ((x & 0x7f) << 9) | ((z & 0x7f) << 2) | ((jump ? 1 : 0) << 1) | (extend ? 1 : 0));
    }

    remove(buf: Packet): void {
        buf.pBit(Renderer.REMOVE_BITS, (1 << 2) | 3);
    }

    addPlayer(buf: Packet, pid: number, x: number, z: number, jump: boolean): void {
        buf.pBit(Renderer.PLAYER_ADD_BITS, ((pid & 0x7ff) << 12) | ((x & 0x1f) << 7) | ((z & 0x1f) << 2) | ((jump ? 1 : 0) << 1) | 1);
    }

    addNpc(buf: Packet, nid: number, type: number, x: number, z: number): void {
        buf.pBit(Renderer.NPC_ADD_BITS, ((nid & 0x1fff) << 22) | ((type & 0x7ff) << 11) | ((x & 0x1f) << 6) | ((z & 0x1f) << 1) | 1);
    }

    protected run(id: number, walkDir: number, runDir: number, extend: boolean, bytes: number): void {
        this.cacheBits(id, {
            n: Renderer.RUN_BITS,
            value: (1 << 9) | (2 << 7) | ((walkDir & 0x7) << 4) | ((runDir & 0x7) << 1) | (extend ? 1 : 0),
            bytes: bytes,
        });
    }

    protected walk(id: number, walkDir: number, extend: boolean, bytes: number): void {
        this.cacheBits(id, {
            n: Renderer.WALK_BITS,
            value: (1 << 6) | (1 << 4) | ((walkDir & 0x7) << 1) | (extend ? 1 : 0),
            bytes: bytes,
        });
    }

    protected extend(id: number, bytes: number): void {
        this.cacheBits(id, {
            n: Renderer.EXTEND_BITS,
            value: 1 << 2,
            bytes: bytes,
        });
    }

    protected idle(id: number, bytes: number): void {
        this.cacheBits(id, {
            n: Renderer.IDLE_BITS,
            value: 0,
            bytes: bytes,
        });
    }

    protected encodeInfo<T extends InfoMessage>(messages: Map<number, Uint8Array>, id: number, message: T): number {
        const encoder: InfoMessageEncoder<T> | undefined = ServerProtRepository.getInfoEncoder(message);
        if (typeof encoder === 'undefined') {
            throw new Error(`Encoder not found for info message! ${message}`);
        }
        const test = encoder.test(message);
        const bytes = new Uint8Array(test);
        encoder.encode(new Packet(bytes), message);
        messages.set(id, bytes);
        return test;
    }

    protected writeBlock(buf: Packet, messages: Map<number, Uint8Array>, id: number): void {
        const bytes: Uint8Array | undefined = messages.get(id);
        if (typeof bytes === 'undefined') {
            throw new Error('[Renderer] Tried to write empty block!');
        }
        buf.pdata(bytes, 0, bytes.length);
    }

    protected header(masks: number): number {
        let length = 1;
        if (masks > 0xff) {
            length += 1;
        }
        return length;
    }

    space(bytes: number, buf: Packet, bitsToAdd: number, bytesToAdd: number): boolean {
        // 7 aligns to the next byte
        return ((buf.bitPos + bitsToAdd + 7) >>> 3) + (bytes + bytesToAdd) <= Renderer.MAX_BYTES;
    }
}