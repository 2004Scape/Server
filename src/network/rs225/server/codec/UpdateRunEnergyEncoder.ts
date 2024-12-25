import MessageEncoder from '#/network/server/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/rs225/server/prot/ServerProt.js';
import UpdateRunEnergy from '#/network/server/model/UpdateRunEnergy.js';

export default class UpdateRunEnergyEncoder extends MessageEncoder<UpdateRunEnergy> {
    prot = ServerProt.UPDATE_RUNENERGY;

    encode(buf: Packet, message: UpdateRunEnergy): void {
        buf.p1((message.energy / 100) | 0);
    }
}