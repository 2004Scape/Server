import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import VarpLarge from '#/network/outgoing/model/VarpLarge.js';

export default class VarpLargeEncoder extends MessageEncoder<VarpLarge> {
    prot = ServerProt.VARP_LARGE;

    encode(buf: Packet, message: VarpLarge): void {
        buf.p2(message.varp);
        buf.p4(message.value);
    }
}