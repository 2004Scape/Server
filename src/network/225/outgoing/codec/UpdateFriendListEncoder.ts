import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import UpdateFriendList from '#/network/outgoing/model/UpdateFriendList.js';

export default class UpdateFriendListEncoder extends MessageEncoder<UpdateFriendList> {
    prot = ServerProt.UPDATE_FRIENDLIST;

    encode(buf: Packet, message: UpdateFriendList): void {
        buf.p8(message.name);
        buf.p1(message.nodeId);
    }
}