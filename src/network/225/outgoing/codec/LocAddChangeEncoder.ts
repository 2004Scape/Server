import Packet from '#/io/Packet.js';
import ZoneProt from '#/network/225/outgoing/prot/ZoneProt.js';
import LocAddChange from '#/network/outgoing/model/LocAddChange.js';
import ZoneMessageEncoder from '#/network/outgoing/codec/ZoneMessageEncoder.js';

export default class LocAddChangeEncoder extends ZoneMessageEncoder<LocAddChange> {
    prot = ZoneProt.LOC_ADD_CHANGE;

    encode(buf: Packet, message: LocAddChange): void {
        buf.p1(message.coord);
        buf.p1((message.shape << 2) | (message.angle & 0x3));
        buf.p2(message.loc);
    }
}