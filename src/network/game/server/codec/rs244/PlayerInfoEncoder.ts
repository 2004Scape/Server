import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt244 from '#/network/game/server/codec/rs244/ServerProt244.js';
import PlayerInfo from '#/network/game/server/model/PlayerInfo.js';

export default class PlayerInfoEncoder extends MessageEncoder<PlayerInfo> {
    prot = ServerProt244.PLAYER_INFO;

    encode(buf: Packet, message: PlayerInfo): void {
        buf.pdata(message.bytes, 0, message.bytes.length);
    }

    test(message: PlayerInfo): number {
        return message.bytes.length;
    }
}
