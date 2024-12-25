import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import MessageGame from '#/network/outgoing/model/MessageGame.js';

export default class MessageGameEncoder extends MessageEncoder<MessageGame> {
    prot = ServerProt.MESSAGE_GAME;

    encode(buf: Packet, message: MessageGame): void {
        buf.pjstr(message.msg);
    }

    test(message: MessageGame): number {
        return 1 + message.msg.length;
    }
}