import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt244 from '#/network/game/server/codec/rs244/ServerProt244.js';
import CamLookAt from '#/network/game/server/model/CamLookAt.js';

export default class CamLookAtEncoder extends MessageEncoder<CamLookAt> {
    prot = ServerProt244.CAM_LOOKAT;

    encode(buf: Packet, message: CamLookAt): void {
        buf.p1(message.x);
        buf.p1(message.z);
        buf.p2(message.height);
        buf.p1(message.speed);
        buf.p1(message.multiplier);
    }
}
