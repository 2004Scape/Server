import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import IfOpenSide from '#/network/outgoing/model/IfOpenSide.js';

export default class IfOpenSideEncoder extends MessageEncoder<IfOpenSide> {
    prot = ServerProt.IF_OPENSIDE;

    encode(buf: Packet, message: IfOpenSide): void {
        buf.p2(message.component);
    }
}