import Entity from '#/engine/entity/Entity.js';
import InfoMessage from '#/network/server/InfoMessage.js';
import InfoMessageEncoder from '#/network/server/codec/InfoMessageEncoder.js';
import ServerProtRepository from '#/network/rs225/server/prot/ServerProtRepository.js';
import Packet from '#/io/Packet.js';
import InfoProt from '#/network/rs225/server/prot/InfoProt.js';

export default abstract class Renderer<T extends Entity> {
    protected readonly caches: Map<InfoProt, Map<number, Uint8Array>>;

    protected readonly highs: Map<number, number>;
    protected readonly lows: Map<number, number>;

    protected constructor(caches: Map<InfoProt, Map<number, Uint8Array>>) {
        this.caches = caches;
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

    cache(id: number, message: InfoMessage, prot: InfoProt): number {
        const cache = this.caches.get(prot);
        if (typeof cache === 'undefined') {
            throw new Error('[Renderer] tried to cache to empty!');
        }
        if (cache.has(id) && !message.persists) {
            return 0;
        }
        return this.encodeInfo(cache, id, message);
    }

    write(buf: Packet, id: number, prot: InfoProt): void {
        const cache: Map<number, Uint8Array> | undefined = this.caches.get(prot);
        if (typeof cache === 'undefined') {
            throw new Error('[Renderer] tried to write a buf not cached!');
        }
        this.writeBlock(buf, cache, id);
    }

    has(id: number, prot: InfoProt): boolean {
        const cache: Map<number, Uint8Array> | undefined = this.caches.get(prot);
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
    }

    removePermanent(id: number) {
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
}