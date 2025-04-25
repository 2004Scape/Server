import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import UpdateStat from '#/network/game/server/model/UpdateStat.js';

export default class UpdateStatEncoder extends MessageEncoder<UpdateStat> {
    prot = ServerProt225.UPDATE_STAT;

    encode(buf: Packet, message: UpdateStat): void {
        buf.p1(message.stat);
        buf.p4((message.exp / 10) | 0);
        buf.p1(message.level); // not base level
    }
}
