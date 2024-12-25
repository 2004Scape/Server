import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#/network/225/incoming/prot/ClientProt.js';
import IgnoreListAdd from '#/network/incoming/model/IgnoreListAdd.js';

export default class IgnoreListAddDecoder extends MessageDecoder<IgnoreListAdd> {
    prot = ClientProt.IGNORELIST_ADD;

    decode(buf: Packet) {
        const username = buf.g8();
        return new IgnoreListAdd(username);
    }
}
