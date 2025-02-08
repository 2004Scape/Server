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

    private readonly highbits: Map<number, Bits>;
    private readonly lowbits: Map<number, Bits>;

    protected constructor(infos: Map<InfoProt, Map<number, Uint8Array>>) {
        this.infos = infos;
        this.highs = new Map();
        this.lows = new Map();
        this.highbits = new Map();
        this.lowbits = new Map();
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

    cacheHighBits(id: number, bits: Bits): void {
        this.highbits.set(id, bits);
    }

    cacheLowBits(id: number, bits: Bits): void {
        this.lowbits.set(id, bits);
    }

    write(buf: Packet, id: number, prot: InfoProt): void {
        const cache: Map<number, Uint8Array> | undefined = this.infos.get(prot);
        if (typeof cache === 'undefined') {
            throw new Error('[Renderer] tried to write a buf not cached!');
        }
        this.writeBlock(buf, cache, id);
    }

    writeBits(buf: Packet, id: number, bytes: number): number {
        const high: Bits | undefined = this.highbits.get(id);
        if (typeof high === 'undefined') {
            throw new Error('[Renderer] tried to write a high bits buf not cached!');
        }
        if (!this.space(bytes, buf, high.n, high.bytes) || high.bytes === 0) {
            const low: Bits | undefined = this.lowbits.get(id);
            if (typeof low === 'undefined') {
                throw new Error('[Renderer] tried to write a low bits buf not cached!');
            }
            buf.pBit(low.n, low.value);
            return low.bytes;
        }
        buf.pBit(high.n, high.value);
        return high.bytes;
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
        this.highbits.clear();
        this.lowbits.clear();
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

    protected run(id: number, walkDir: number, runDir: number, bytes: number): void {
        this.cacheHighBits(id, {
            n: Renderer.RUN_BITS,
            value: (1 << 9) | (2 << 7) | ((walkDir & 0x7) << 4) | ((runDir & 0x7) << 1) | 1,
            bytes: bytes,
        });

        this.cacheLowBits(id, {
            n: Renderer.RUN_BITS,
            value: (1 << 9) | (2 << 7) | ((walkDir & 0x7) << 4) | ((runDir & 0x7) << 1) | 0,
            bytes: 0,
        });
    }

    protected walk(id: number, walkDir: number, bytes: number): void {
        this.cacheHighBits(id, {
            n: Renderer.WALK_BITS,
            value: (1 << 6) | (1 << 4) | ((walkDir & 0x7) << 1) | 1,
            bytes: bytes,
        });

        this.cacheLowBits(id, {
            n: Renderer.WALK_BITS,
            value: (1 << 6) | (1 << 4) | ((walkDir & 0x7) << 1) | 0,
            bytes: 0,
        });
    }

    protected extend(id: number, bytes: number): void {
        this.cacheHighBits(id, {
            n: Renderer.EXTEND_BITS,
            value: (1 << 2) | 0,
            bytes: bytes,
        });

        this.cacheLowBits(id, {
            n: Renderer.IDLE_BITS,
            value: 0,
            bytes: 0,
        });
    }

    protected idle(id: number): void {
        this.cacheHighBits(id, {
            n: Renderer.IDLE_BITS,
            value: 0,
            bytes: 0,
        });

        this.cacheLowBits(id, {
            n: Renderer.IDLE_BITS,
            value: 0,
            bytes: 0,
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