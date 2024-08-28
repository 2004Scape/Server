import MessageEncoder from '#lostcity/network/outgoing/codec/MessageEncoder.js';
import IfOpenChat from '#lostcity/network/outgoing/model/IfOpenChat.js';
import Packet from '#jagex2/io/Packet.js';
import ServerProt from '#lostcity/network/225/outgoing/prot/ServerProt.js';

export default class IfOpenChatEncoder extends MessageEncoder<IfOpenChat> {
    prot = ServerProt.IF_OPENCHAT;

    encode(buf: Packet, message: IfOpenChat): void {
        buf.p2(message.component);
    }
}