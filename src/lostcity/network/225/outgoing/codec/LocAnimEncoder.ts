import MessageEncoder from '#lostcity/network/outgoing/codec/MessageEncoder.js';
import Packet from '#jagex2/io/Packet.js';
import ServerProt from '#lostcity/network/225/outgoing/prot/ServerProt.js';
import LocAnim from '#lostcity/network/outgoing/model/LocAnim.js';

export default class LocAnimEncoder extends MessageEncoder<LocAnim> {
    prot = ServerProt.LOC_ANIM;

    encode(buf: Packet, message: LocAnim): void {
        buf.p1(message.coord);
        buf.p1((message.shape << 2) | (message.angle & 0x3));
        buf.p2(message.seq);
    }
}