import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/client/codec/MessageDecoder.js';
import ClientProt from '#/network/rs225/client/prot/ClientProt.js';
import IgnoreListAdd from '#/network/client/model/IgnoreListAdd.js';

export default class IgnoreListAddDecoder extends MessageDecoder<IgnoreListAdd> {
    prot = ClientProt.IGNORELIST_ADD;

    decode(buf: Packet) {
        const username = buf.g8();
        return new IgnoreListAdd(username);
    }
}
