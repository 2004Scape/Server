import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt244 from '#/network/game/server/codec/rs244/ServerProt244.js';
import CamShake from '#/network/game/server/model/CamShake.js';

export default class CamShakeEncoder extends MessageEncoder<CamShake> {
    prot = ServerProt244.CAM_SHAKE;

    encode(buf: Packet, message: CamShake): void {
        buf.p1(message.type); // direction?
        buf.p1(message.jitter);
        buf.p1(message.amplitude);
        buf.p1(message.frequency);
    }
}
