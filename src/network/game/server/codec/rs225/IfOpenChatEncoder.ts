import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt from '#/network/game/server/codec/rs225/ServerProt.js';
import IfOpenChat from '#/network/game/server/model/IfOpenChat.js';

export default class IfOpenChatEncoder extends MessageEncoder<IfOpenChat> {
    prot = ServerProt.IF_OPENCHAT;

    encode(buf: Packet, message: IfOpenChat): void {
        buf.p2(message.component);
    }
}
