import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#/network/225/incoming/prot/ClientProt.js';
import IgnoreListDel from '#/network/incoming/model/IgnoreListDel.js';

export default class IgnoreListDelDecoder extends MessageDecoder<IgnoreListDel> {
    prot = ClientProt.IGNORELIST_DEL;

    decode(buf: Packet) {
        const username = buf.g8();
        return new IgnoreListDel(username);
    }
}
