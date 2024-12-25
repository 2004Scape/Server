import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import CamMoveTo from '#/network/outgoing/model/CamMoveTo.js';

export default class CamMoveToEncoder extends MessageEncoder<CamMoveTo> {
    prot = ServerProt.CAM_MOVETO;

    encode(buf: Packet, message: CamMoveTo): void {
        buf.p1(message.x);
        buf.p1(message.z);
        buf.p2(message.height);
        buf.p1(message.speed);
        buf.p1(message.multiplier);
    }
}