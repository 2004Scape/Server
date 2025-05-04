import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt225 from '#/network/game/client/codec/rs225/ClientProt225.js';
import MessagePrivate from '#/network/game/client/model/MessagePrivate.js';

export default class MessagePrivateDecoder extends MessageDecoder<MessagePrivate> {
    prot = ClientProt225.MESSAGE_PRIVATE;

    decode(buf: Packet, length: number) {
        const username = buf.g8();
        const input = buf.data.slice(buf.pos, buf.pos + length - 8);
        buf.pos += length;
        return new MessagePrivate(username, input);
    }
}
