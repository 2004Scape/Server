import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt244 from '#/network/game/server/codec/rs244/ServerProt244.js';
import IfSetHide from '#/network/game/server/model/IfSetHide.js';

export default class IfSetHideEncoder extends MessageEncoder<IfSetHide> {
    prot = ServerProt244.IF_SETHIDE;

    encode(buf: Packet, message: IfSetHide): void {
        buf.p2(message.component);
        buf.pbool(message.hidden);
    }
}
