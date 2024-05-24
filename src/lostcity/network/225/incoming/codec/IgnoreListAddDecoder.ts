import Packet from '#jagex2/io/Packet.js';
import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import IgnoreListAdd from '#lostcity/network/225/incoming/IgnoreListAdd.js';

export default class IgnoreListAddDecoder extends MessageDecoder<IgnoreListAdd> {
    prot = ClientProt.IGNORELIST_ADD;

    decode(buf: Packet) {
        const username = buf.g8();
        return new IgnoreListAdd(username);
    }
}
