import Packet from '#jagex2/io/Packet.js';
import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import IgnoreListDel from '#lostcity/network/225/incoming/IgnoreListDel.js';

export default class IgnoreListDelDecoder extends MessageDecoder<IgnoreListDel> {
    prot = ClientProt.IGNORELIST_DEL;

    decode(buf: Packet) {
        const username = buf.g8();
        return new IgnoreListDel(username);
    }
}
