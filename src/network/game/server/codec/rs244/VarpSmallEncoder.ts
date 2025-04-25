import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt244 from '#/network/game/server/codec/rs244/ServerProt244.js';
import VarpSmall from '#/network/game/server/model/VarpSmall.js';

export default class VarpSmallEncoder extends MessageEncoder<VarpSmall> {
    prot = ServerProt244.VARP_SMALL;

    encode(buf: Packet, message: VarpSmall): void {
        buf.p2(message.varp);
        buf.p1(message.value);
    }
}
