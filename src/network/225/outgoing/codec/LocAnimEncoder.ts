import Packet from '#/io/Packet.js';
import ZoneProt from '#/network/225/outgoing/prot/ZoneProt.js';
import LocAnim from '#/network/outgoing/model/LocAnim.js';
import ZoneMessageEncoder from '#/network/outgoing/codec/ZoneMessageEncoder.js';

export default class LocAnimEncoder extends ZoneMessageEncoder<LocAnim> {
    prot = ZoneProt.LOC_ANIM;

    encode(buf: Packet, message: LocAnim): void {
        buf.p1(message.coord);
        buf.p1((message.shape << 2) | (message.angle & 0x3));
        buf.p2(message.seq);
    }
}