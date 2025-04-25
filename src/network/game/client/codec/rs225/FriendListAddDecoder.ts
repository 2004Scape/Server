import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt225 from '#/network/game/client/codec/rs225/ClientProt225.js';
import FriendListAdd from '#/network/game/client/model/FriendListAdd.js';

export default class FriendListAddDecoder extends MessageDecoder<FriendListAdd> {
    prot = ClientProt225.FRIENDLIST_ADD;

    decode(buf: Packet) {
        const username = buf.g8();
        return new FriendListAdd(username);
    }
}
