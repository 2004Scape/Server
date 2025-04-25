import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt244 from '#/network/game/client/codec/rs244/ClientProt244.js';
import FriendListDel from '#/network/game/client/model/FriendListDel.js';


export default class FriendListDelDecoder extends MessageDecoder<FriendListDel> {
    prot = ClientProt244.FRIENDLIST_DEL;

    decode(buf: Packet) {
        const username = buf.g8();
        return new FriendListDel(username);
    }
}
