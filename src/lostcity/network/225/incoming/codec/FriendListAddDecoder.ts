import Packet from '#jagex2/io/Packet.js';
import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import FriendListAdd from '#lostcity/network/225/incoming/FriendListAdd.js';

export default class FriendListAddDecoder extends MessageDecoder<FriendListAdd> {
    prot = ClientProt.FRIENDLIST_ADD;

    decode(buf: Packet) {
        const username = buf.g8();
        return new FriendListAdd(username);
    }
}
