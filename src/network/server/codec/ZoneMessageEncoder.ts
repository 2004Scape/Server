import ZoneProt from '#/network/rs225/server/prot/ServerProt.js';
import Packet from '#/io/Packet.js';
import ZoneMessage from '#/network/server/ZoneMessage.js';
import MessageEncoder from '#/network/server/codec/MessageEncoder.js';

export default abstract class ZoneMessageEncoder<T extends ZoneMessage> extends MessageEncoder<T> {
    abstract prot: ZoneProt;

    enclose(message: T): Uint8Array {
        const buf: Packet = new Packet(new Uint8Array(1 + this.prot.length));
        buf.p1(this.prot.id);
        this.encode(buf, message);
        return buf.data;
    }
}