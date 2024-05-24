import Packet from '#jagex2/io/Packet.js';
import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import FriendListDel from '#lostcity/network/225/incoming/FriendListDel.js';

export default class FriendListDelDecoder extends MessageDecoder<FriendListDel> {
    prot = ClientProt.FRIENDLIST_DEL;

    decode(buf: Packet) {
        const username = buf.g8();
        return new FriendListDel(username);
    }
}
