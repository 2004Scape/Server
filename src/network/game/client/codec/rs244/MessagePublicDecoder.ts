import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt244 from '#/network/game/client/codec/rs244/ClientProt244.js';
import MessagePublic from '#/network/game/client/model/MessagePublic.js';


export default class MessagePublicDecoder extends MessageDecoder<MessagePublic> {
    prot = ClientProt244.MESSAGE_PUBLIC;

    decode(buf: Packet, length: number) {
        const color = buf.g1();
        const effect = buf.g1();
        const input = buf.data.slice(buf.pos, buf.pos + length - 2);
        buf.pos += length;
        return new MessagePublic(input, color, effect);
    }
}
