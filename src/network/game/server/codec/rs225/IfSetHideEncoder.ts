import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import IfSetHide from '#/network/game/server/model/IfSetHide.js';

export default class IfSetHideEncoder extends MessageEncoder<IfSetHide> {
    prot = ServerProt225.IF_SETHIDE;

    encode(buf: Packet, message: IfSetHide): void {
        buf.p2(message.component);
        buf.pbool(message.hidden);
    }
}
