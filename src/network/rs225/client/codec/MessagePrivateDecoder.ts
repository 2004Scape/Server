import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/client/codec/MessageDecoder.js';
import ClientProt from '#/network/rs225/client/prot/ClientProt.js';
import MessagePrivate from '#/network/client/model/MessagePrivate.js';
import WordPack from '#/wordenc/WordPack.js';

export default class MessagePrivateDecoder extends MessageDecoder<MessagePrivate> {
    prot = ClientProt.MESSAGE_PRIVATE;

    decode(buf: Packet, length: number) {
        const username = buf.g8();
        const input = WordPack.unpack(buf, length - 8);
        // todo: do we want to unpack in the decoder or the handler?
        return new MessagePrivate(username, input);
    }
}
