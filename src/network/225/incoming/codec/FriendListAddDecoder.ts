import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#/network/225/incoming/prot/ClientProt.js';
import FriendListAdd from '#/network/incoming/model/FriendListAdd.js';

export default class FriendListAddDecoder extends MessageDecoder<FriendListAdd> {
    prot = ClientProt.FRIENDLIST_ADD;

    decode(buf: Packet) {
        const username = buf.g8();
        return new FriendListAdd(username);
    }
}
