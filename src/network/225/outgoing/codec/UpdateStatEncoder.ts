import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import UpdateStat from '#/network/outgoing/model/UpdateStat.js';

export default class UpdateStatEncoder extends MessageEncoder<UpdateStat> {
    prot = ServerProt.UPDATE_STAT;

    encode(buf: Packet, message: UpdateStat): void {
        buf.p1(message.stat);
        buf.p4((message.exp / 10) | 0);
        buf.p1(message.level); // not base level
    }
}