import MessageEncoder from '#lostcity/network/outgoing/codec/MessageEncoder.js';
import Packet from '#jagex2/io/Packet.js';
import ServerProt from '#lostcity/network/225/outgoing/prot/ServerProt.js';
import IfSetTabActive from '#lostcity/network/outgoing/model/IfSetTab.js';

export default class IfSetTabEncoder extends MessageEncoder<IfSetTabActive> {
    prot = ServerProt.IF_SETTAB_ACTIVE;

    encode(buf: Packet, message: IfSetTabActive): void {
        buf.p1(message.tab);
    }
}