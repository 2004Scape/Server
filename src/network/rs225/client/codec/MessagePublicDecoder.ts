import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/client/codec/MessageDecoder.js';
import ClientProt from '#/network/rs225/client/prot/ClientProt.js';
import MessagePublic from '#/network/client/model/MessagePublic.js';
import WordPack from '#/wordenc/WordPack.js';

export default class MessagePublicDecoder extends MessageDecoder<MessagePublic> {
    prot = ClientProt.MESSAGE_PUBLIC;

    decode(buf: Packet, length: number) {
        const color = buf.g1();
        const effect = buf.g1();
        // todo: do we want to unpack in the decoder or the handler?
        const input = WordPack.unpack(buf, length - 2);
        return new MessagePublic(input, color, effect);
    }
}
