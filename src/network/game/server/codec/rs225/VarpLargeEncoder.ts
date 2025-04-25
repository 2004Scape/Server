import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import VarpLarge from '#/network/game/server/model/VarpLarge.js';

export default class VarpLargeEncoder extends MessageEncoder<VarpLarge> {
    prot = ServerProt225.VARP_LARGE;

    encode(buf: Packet, message: VarpLarge): void {
        buf.p2(message.varp);
        buf.p4(message.value);
    }
}
