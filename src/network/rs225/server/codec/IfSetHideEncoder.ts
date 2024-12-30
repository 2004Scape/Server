import MessageEncoder from '#/network/server/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/rs225/server/prot/ServerProt.js';
import IfSetHide from '#/network/server/model/IfSetHide.js';

export default class IfSetHideEncoder extends MessageEncoder<IfSetHide> {
    prot = ServerProt.IF_SETHIDE;

    encode(buf: Packet, message: IfSetHide): void {
        buf.p2(message.component);
        buf.pbool(message.hidden);
    }
}