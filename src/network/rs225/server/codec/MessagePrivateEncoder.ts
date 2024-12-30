import MessageEncoder from '#/network/server/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/rs225/server/prot/ServerProt.js';
import MessagePrivate from '#/network/server/model/MessagePrivate.js';
import WordPack from '#/wordenc/WordPack.js';
import WordEnc from '#/cache/wordenc/WordEnc.js';

export default class MessagePrivateEncoder extends MessageEncoder<MessagePrivate> {
    prot = ServerProt.MESSAGE_PRIVATE;

    encode(buf: Packet, message: MessagePrivate): void {
        buf.p8(message.from);
        buf.p4(message.messageId);
        buf.p1(message.staffModLevel);
        WordPack.pack(buf, WordEnc.filter(message.msg));
    }

    test(message: MessagePrivate): number {
        return 8 + 4 + 1 + 1 + message.msg.length;
    }
}