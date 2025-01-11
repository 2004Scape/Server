import Packet from '#/io/Packet.js';
import ZoneProt from '#/network/rs225/server/prot/ZoneProt.js';
import LocAddChange from '#/network/server/model/LocAddChange.js';
import ZoneMessageEncoder from '#/network/server/codec/ZoneMessageEncoder.js';

export default class LocAddChangeEncoder extends ZoneMessageEncoder<LocAddChange> {
    prot = ZoneProt.LOC_ADD_CHANGE;

    encode(buf: Packet, message: LocAddChange): void {
        buf.p1(message.coord);
        buf.p1((message.shape << 2) | (message.angle & 0x3));
        buf.p2(message.loc);
    }
}