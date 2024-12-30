import MessageEncoder from '#/network/server/codec/MessageEncoder.js';
import IfOpenChat from '#/network/server/model/IfOpenChat.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/rs225/server/prot/ServerProt.js';

export default class IfOpenChatEncoder extends MessageEncoder<IfOpenChat> {
    prot = ServerProt.IF_OPENCHAT;

    encode(buf: Packet, message: IfOpenChat): void {
        buf.p2(message.component);
    }
}