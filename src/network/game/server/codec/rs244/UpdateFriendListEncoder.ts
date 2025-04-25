import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt244 from '#/network/game/server/codec/rs244/ServerProt244.js';
import UpdateFriendList from '#/network/game/server/model/UpdateFriendList.js';

export default class UpdateFriendListEncoder extends MessageEncoder<UpdateFriendList> {
    prot = ServerProt244.UPDATE_FRIENDLIST;

    encode(buf: Packet, message: UpdateFriendList): void {
        buf.p8(message.name);
        buf.p1(message.nodeId);
    }
}
