import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import IfSetTab from '#/network/outgoing/model/IfSetTab.js';

export default class IfSetTabEncoder extends MessageEncoder<IfSetTab> {
    prot = ServerProt.IF_SETTAB;

    encode(buf: Packet, message: IfSetTab): void {
        buf.p2(message.component);
        buf.p1(message.tab);
    }
}