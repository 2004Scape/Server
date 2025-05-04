import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt244 from '#/network/game/server/codec/rs244/ServerProt244.js';
import ChatFilterSettings from '#/network/game/server/model/ChatFilterSettings.js';

export default class ChatFilterSettingsEncoder extends MessageEncoder<ChatFilterSettings> {
    prot = ServerProt244.CHAT_FILTER_SETTINGS;

    encode(buf: Packet, message: ChatFilterSettings): void {
        buf.p1(message.publicChat);
        buf.p1(message.privateChat);
        buf.p1(message.tradeDuel);
    }
}
