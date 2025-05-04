import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt244 from '#/network/game/server/codec/rs244/ServerProt244.js';
import IfOpenChat from '#/network/game/server/model/IfOpenChat.js';

export default class IfOpenChatEncoder extends MessageEncoder<IfOpenChat> {
    prot = ServerProt244.IF_OPENCHAT;

    encode(buf: Packet, message: IfOpenChat): void {
        buf.p2(message.component);
    }
}
