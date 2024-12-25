import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import IfSetPosition from '#/network/outgoing/model/IfSetPosition.js';

export default class IfSetPositionEncoder extends MessageEncoder<IfSetPosition> {
    prot = ServerProt.IF_SETPOSITION;

    encode(buf: Packet, message: IfSetPosition): void {
        buf.p2(message.component);
        buf.p2(message.x);
        buf.p2(message.y);
    }
}