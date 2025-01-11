import MessageEncoder from '#/network/server/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/rs225/server/prot/ServerProt.js';
import ChatFilterSettings from '#/network/server/model/ChatFilterSettings.js';

export default class ChatFilterSettingsEncoder extends MessageEncoder<ChatFilterSettings> {
    prot = ServerProt.CHAT_FILTER_SETTINGS;

    encode(buf: Packet, message: ChatFilterSettings): void {
        buf.p1(message.publicChat);
        buf.p1(message.privateChat);
        buf.p1(message.tradeDuel);
    }
}