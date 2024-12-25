import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#/network/225/incoming/prot/ClientProt.js';
import ChatSetMode from '#/network/incoming/model/ChatSetMode.js';

export default class ChatSetModeDecoder extends MessageDecoder<ChatSetMode> {
    prot = ClientProt.CHAT_SETMODE;

    decode(buf: Packet) {
        const publicChatSetting = buf.g1();
        const privateChatSetting = buf.g1();
        const tradeChatSetting = buf.g1();

        return new ChatSetMode(publicChatSetting, privateChatSetting, tradeChatSetting);
    }
}
