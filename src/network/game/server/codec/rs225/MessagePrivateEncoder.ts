import WordEnc from '#/cache/wordenc/WordEnc.js';
import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import MessagePrivate from '#/network/game/server/model/MessagePrivate.js';
import WordPack from '#/wordenc/WordPack.js';



export default class MessagePrivateEncoder extends MessageEncoder<MessagePrivate> {
    prot = ServerProt225.MESSAGE_PRIVATE;

    encode(buf: Packet, message: MessagePrivate): void {
        let staffLvl: number = message.staffModLevel;
        if (staffLvl > 0) {
            staffLvl += 1;
        }

        buf.p8(message.from);
        buf.p4(message.messageId);
        buf.p1(staffLvl);
        WordPack.pack(buf, WordEnc.filter(message.msg));
    }

    test(message: MessagePrivate): number {
        return 8 + 4 + 1 + 1 + message.msg.length;
    }
}
