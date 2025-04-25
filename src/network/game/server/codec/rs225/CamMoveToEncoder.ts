import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import CamMoveTo from '#/network/game/server/model/CamMoveTo.js';

export default class CamMoveToEncoder extends MessageEncoder<CamMoveTo> {
    prot = ServerProt225.CAM_MOVETO;

    encode(buf: Packet, message: CamMoveTo): void {
        buf.p1(message.x);
        buf.p1(message.z);
        buf.p2(message.height);
        buf.p1(message.speed);
        buf.p1(message.multiplier);
    }
}
