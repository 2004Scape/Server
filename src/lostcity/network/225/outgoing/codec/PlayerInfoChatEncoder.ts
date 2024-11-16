import InfoMessageEncoder from '#lostcity/network/outgoing/codec/InfoMessageEncoder.js';
import Packet from '#jagex/io/Packet.js';
import InfoProt from '#lostcity/network/225/outgoing/prot/InfoProt.js';
import PlayerInfoChat from '#lostcity/network/outgoing/model/PlayerInfoChat.js';

export default class PlayerInfoChatEncoder extends InfoMessageEncoder<PlayerInfoChat> {
    prot: InfoProt = InfoProt.PLAYER_CHAT;

    encode(buf: Packet, message: PlayerInfoChat): void {
        buf.p1(message.color);
        buf.p1(message.effect);
        buf.p1(message.type);
        buf.p1(message.chat.length);
        buf.pdata(message.chat, 0, message.chat.length);
    }

    test(message: PlayerInfoChat): number {
        return 1 + 1 + 1 + 1 + message.chat.length;
    }
}