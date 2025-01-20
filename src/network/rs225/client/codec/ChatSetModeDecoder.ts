import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/client/codec/MessageDecoder.js';
import ClientProt from '#/network/rs225/client/prot/ClientProt.js';
import ChatSetMode from '#/network/client/model/ChatSetMode.js';

export default class ChatSetModeDecoder extends MessageDecoder<ChatSetMode> {
    prot = ClientProt.CHAT_SETMODE;

    decode(buf: Packet) {
        const publicChatSetting = buf.g1();
        const privateChatSetting = buf.g1();
        const tradeChatSetting = buf.g1();

        return new ChatSetMode(publicChatSetting, privateChatSetting, tradeChatSetting);
    }
}
