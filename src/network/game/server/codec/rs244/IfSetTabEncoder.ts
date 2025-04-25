import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt244 from '#/network/game/server/codec/rs244/ServerProt244.js';
import IfSetTab from '#/network/game/server/model/IfSetTab.js';

export default class IfSetTabEncoder extends MessageEncoder<IfSetTab> {
    prot = ServerProt244.IF_SETTAB;

    encode(buf: Packet, message: IfSetTab): void {
        buf.p2(message.component);
        buf.p1(message.tab);
    }
}
