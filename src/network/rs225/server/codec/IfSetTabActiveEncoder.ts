import MessageEncoder from '#/network/server/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/rs225/server/prot/ServerProt.js';
import IfSetTabActive from '#/network/server/model/IfSetTab.js';

export default class IfSetTabEncoder extends MessageEncoder<IfSetTabActive> {
    prot = ServerProt.IF_SETTAB_ACTIVE;

    encode(buf: Packet, message: IfSetTabActive): void {
        buf.p1(message.tab);
    }
}