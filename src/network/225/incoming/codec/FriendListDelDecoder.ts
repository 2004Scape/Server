import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#/network/225/incoming/prot/ClientProt.js';
import FriendListDel from '#/network/incoming/model/FriendListDel.js';

export default class FriendListDelDecoder extends MessageDecoder<FriendListDel> {
    prot = ClientProt.FRIENDLIST_DEL;

    decode(buf: Packet) {
        const username = buf.g8();
        return new FriendListDel(username);
    }
}
