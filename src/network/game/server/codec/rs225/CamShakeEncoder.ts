import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import CamShake from '#/network/game/server/model/CamShake.js';

export default class CamShakeEncoder extends MessageEncoder<CamShake> {
    prot = ServerProt225.CAM_SHAKE;

    encode(buf: Packet, message: CamShake): void {
        buf.p1(message.type); // direction?
        buf.p1(message.jitter);
        buf.p1(message.amplitude);
        buf.p1(message.frequency);
    }
}
