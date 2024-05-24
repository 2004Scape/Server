import Packet from '#jagex2/io/Packet.js';
import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import MessagePublic from '#lostcity/network/225/incoming/MessagePublic.js';
import WordPack from '#jagex2/wordenc/WordPack.js';

export default class MessagePublicDecoder extends MessageDecoder<MessagePublic> {
    prot = ClientProt.MESSAGE_PUBLIC;

    decode(buf: Packet) {
        const color = buf.g1();
        const effect = buf.g1();
        // todo: do we want to unpack in the decoder or the handler?
        const input = WordPack.unpack(buf, buf.length - 2);
        return new MessagePublic(input, color, effect);
    }
}
