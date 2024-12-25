import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import UpdateRunEnergy from '#/network/outgoing/model/UpdateRunEnergy.js';

export default class UpdateRunEnergyEncoder extends MessageEncoder<UpdateRunEnergy> {
    prot = ServerProt.UPDATE_RUNENERGY;

    encode(buf: Packet, message: UpdateRunEnergy): void {
        buf.p1((message.energy / 100) | 0);
    }
}