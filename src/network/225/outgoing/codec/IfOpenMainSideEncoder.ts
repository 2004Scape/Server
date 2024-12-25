import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import IfOpenMainSide from '#/network/outgoing/model/IfOpenMainSide.js';

export default class IfOpenMainSideEncoder extends MessageEncoder<IfOpenMainSide> {
    prot = ServerProt.IF_OPENMAIN_SIDE;

    encode(buf: Packet, message: IfOpenMainSide): void {
        buf.p2(message.main);
        buf.p2(message.side);
    }
}