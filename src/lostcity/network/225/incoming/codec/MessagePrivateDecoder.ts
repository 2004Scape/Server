import Packet from '#jagex2/io/Packet.js';
import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import MessagePrivate from '#lostcity/network/225/incoming/MessagePrivate.js';
import WordPack from '#jagex2/wordenc/WordPack.js';

export default class MessagePrivateDecoder extends MessageDecoder<MessagePrivate> {
    prot = ClientProt.MESSAGE_PRIVATE;

    decode(buf: Packet) {
        const username = buf.g8();
        const input = WordPack.unpack(buf, buf.length - 8);
        // todo: do we want to unpack in the decoder or the handler?
        return new MessagePrivate(username, input);
    }
}
