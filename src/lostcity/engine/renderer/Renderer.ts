import Entity from '#lostcity/entity/Entity.js';
import InfoMessage from '#lostcity/network/outgoing/InfoMessage.js';
import InfoMessageEncoder from '#lostcity/network/outgoing/codec/InfoMessageEncoder.js';
import ServerProtRepository from '#lostcity/network/225/outgoing/prot/ServerProtRepository.js';
import Packet from '#jagex2/io/Packet.js';

export default abstract class Renderer<T extends Entity> {
    private readonly anims: Map<number, Uint8Array>;
    private readonly entities: Map<number, Uint8Array>;
    private readonly says: Map<number, Uint8Array>;
    private readonly damages: Map<number, Uint8Array>;
    private readonly coords: Map<number, Uint8Array>;
    private readonly spotanims: Map<number, Uint8Array>;

    protected readonly highs: Map<number, number>;
    protected readonly lows: Map<number, number>;

    protected constructor() {
        this.anims = new Map();
        this.entities = new Map();
        this.says = new Map();
        this.damages = new Map();
        this.coords = new Map();
        this.spotanims = new Map();
        this.highs = new Map();
        this.lows = new Map();
    }

    abstract computeInfo(entity: T): void;

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

    cacheAnim(id: number, message: InfoMessage): number {
        if (this.anims.has(id)) {
            return 0;
        }
        return this.encodeInfo(this.anims, id, message);
    }

    writeAnim(buf: Packet, id: number): void {
        this.writeBlock(buf, this.anims, id);
    }

    cacheEntity(id: number, message: InfoMessage): number {
        if (this.entities.has(id)) {
            return 0;
        }
        return this.encodeInfo(this.entities, id, message);
    }

    writeEntity(buf: Packet, id: number): void {
        this.writeBlock(buf, this.entities, id);
    }

    hasEntity(id: number): boolean {
        return this.entities.has(id);
    }

    cacheSay(id: number, message: InfoMessage): number {
        if (this.says.has(id)) {
            return 0;
        }
        return this.encodeInfo(this.says, id, message);
    }

    writeSay(buf: Packet, id: number): void {
        this.writeBlock(buf, this.says, id);
    }

    cacheDamage(id: number, message: InfoMessage): number {
        if (this.damages.has(id)) {
            return 0;
        }
        return this.encodeInfo(this.damages, id, message);
    }

    writeDamage(buf: Packet, id: number): void {
        this.writeBlock(buf, this.damages, id);
    }

    cacheCoord(id: number, message: InfoMessage): number {
        if (this.coords.has(id)) {
            return 0;
        }
        return this.encodeInfo(this.coords, id, message);
    }

    writeCoord(buf: Packet, id: number): void {
        this.writeBlock(buf, this.coords, id);
    }

    hasCoord(id: number): boolean {
        return this.coords.has(id);
    }

    cacheSpotanim(id: number, message: InfoMessage): number {
        if (this.spotanims.has(id)) {
            return 0;
        }
        return this.encodeInfo(this.spotanims, id, message);
    }

    writeSpotanim(buf: Packet, id: number): void {
        this.writeBlock(buf, this.spotanims, id);
    }

    highdefinitions(id: number): number {
        return this.highs.get(id) ?? 0;
    }

    lowdefinitions(id: number): number {
        return this.lows.get(id) ?? 0;
    }

    removeTemporary() {
        this.anims.clear();
        this.entities.clear();
        this.says.clear();
        this.damages.clear();
        this.coords.clear();
        this.spotanims.clear();
        this.highs.clear();
    }

    removePermanent(id: number) {
        // this is basically redundant
        this.anims.delete(id);
        this.entities.delete(id);
        this.says.delete(id);
        this.damages.delete(id);
        this.coords.delete(id);
        this.spotanims.delete(id);
        this.highs.delete(id);
        this.lows.delete(id);
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

    protected writeBlock(buf: Packet, messages: Map<number, Uint8Array | undefined>, id: number): void {
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
}