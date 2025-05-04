import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import UpdateRunEnergy from '#/network/game/server/model/UpdateRunEnergy.js';

export default class UpdateRunEnergyEncoder extends MessageEncoder<UpdateRunEnergy> {
    prot = ServerProt225.UPDATE_RUNENERGY;

    encode(buf: Packet, message: UpdateRunEnergy): void {
        buf.p1((message.energy / 100) | 0);
    }
}
