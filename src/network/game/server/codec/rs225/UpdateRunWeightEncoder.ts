import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import UpdateRunWeight from '#/network/game/server/model/UpdateRunWeight.js';

export default class UpdateRunWeightEncoder extends MessageEncoder<UpdateRunWeight> {
    prot = ServerProt225.UPDATE_RUNWEIGHT;

    encode(buf: Packet, message: UpdateRunWeight): void {
        buf.p2(message.kg);
    }
}
