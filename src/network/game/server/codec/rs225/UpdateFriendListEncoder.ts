import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import UpdateFriendList from '#/network/game/server/model/UpdateFriendList.js';

export default class UpdateFriendListEncoder extends MessageEncoder<UpdateFriendList> {
    prot = ServerProt225.UPDATE_FRIENDLIST;

    encode(buf: Packet, message: UpdateFriendList): void {
        buf.p8(message.name);
        buf.p1(message.nodeId);
    }
}
