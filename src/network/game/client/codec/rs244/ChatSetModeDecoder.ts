import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt244 from '#/network/game/client/codec/rs244/ClientProt244.js';
import ChatSetMode from '#/network/game/client/model/ChatSetMode.js';


export default class ChatSetModeDecoder extends MessageDecoder<ChatSetMode> {
    prot = ClientProt244.CHAT_SETMODE;

    decode(buf: Packet) {
        const publicChatSetting = buf.g1();
        const privateChatSetting = buf.g1();
        const tradeChatSetting = buf.g1();

        return new ChatSetMode(publicChatSetting, privateChatSetting, tradeChatSetting);
    }
}
