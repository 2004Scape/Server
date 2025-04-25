import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ZoneProt from '#/network/game/server/codec/rs225/ServerProt225.js';
import ZoneMessage from '#/network/game/server/ZoneMessage.js';

export default abstract class ZoneMessageEncoder<T extends ZoneMessage> extends MessageEncoder<T> {
    abstract prot: ZoneProt;

    enclose(buf: Packet, message: T): void {
        buf.p1(this.prot.id);
        this.encode(buf, message);
    }
}
