import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt from '#/network/game/server/codec/rs225/ServerProt.js';
import MessageGame from '#/network/game/server/model/MessageGame.js';

export default class MessageGameEncoder extends MessageEncoder<MessageGame> {
    prot = ServerProt.MESSAGE_GAME;

    encode(buf: Packet, message: MessageGame): void {
        buf.pjstr(message.msg);
    }

    test(message: MessageGame): number {
        return 1 + message.msg.length;
    }
}
