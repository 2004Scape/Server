import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import UpdatePid from '#/network/game/server/model/UpdatePid.js';

export default class UpdatePidEncoder extends MessageEncoder<UpdatePid> {
    prot = ServerProt225.UPDATE_PID;

    encode(buf: Packet, message: UpdatePid): void {
        buf.p2(message.uid);
    }
}
