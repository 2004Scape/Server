import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import IfSetTabActive from '#/network/game/server/model/IfSetTab.js';

export default class IfSetTabEncoder extends MessageEncoder<IfSetTabActive> {
    prot = ServerProt225.IF_SETTAB_ACTIVE;

    encode(buf: Packet, message: IfSetTabActive): void {
        buf.p1(message.tab);
    }
}
