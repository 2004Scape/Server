import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/client/codec/MessageDecoder.js';
import ClientProt from '#/network/rs225/client/prot/ClientProt.js';
import MessagePrivate from '#/network/client/model/MessagePrivate.js';

export default class MessagePrivateDecoder extends MessageDecoder<MessagePrivate> {
    prot = ClientProt.MESSAGE_PRIVATE;

    decode(buf: Packet, length: number) {
        const username = buf.g8();
        const input = buf.data.slice(buf.pos, buf.pos + length - 8);
        buf.pos += length;
        return new MessagePrivate(username, input);
    }
}
