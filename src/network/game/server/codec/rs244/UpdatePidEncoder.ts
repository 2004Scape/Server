import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt from '#/network/game/server/codec/rs244/ServerProt.js';
import UpdatePid from '#/network/game/server/model/UpdatePid.js';

export default class UpdatePidEncoder extends MessageEncoder<UpdatePid> {
    prot = ServerProt.UPDATE_PID;

    encode(buf: Packet, message: UpdatePid): void {
        buf.p2(message.uid);
        buf.p1(1);
    }
}
