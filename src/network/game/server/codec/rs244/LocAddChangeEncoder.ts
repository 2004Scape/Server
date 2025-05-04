import Packet from '#/io/Packet.js';
import ZoneProt from '#/network/game/server/codec/rs244/ZoneProt.js';
import ZoneMessageEncoder from '#/network/game/server/codec/ZoneMessageEncoder.js';
import LocAddChange from '#/network/game/server/model/LocAddChange.js';


export default class LocAddChangeEncoder extends ZoneMessageEncoder<LocAddChange> {
    prot = ZoneProt.LOC_ADD_CHANGE;

    encode(buf: Packet, message: LocAddChange): void {
        buf.p1(message.coord);
        buf.p1((message.shape << 2) | (message.angle & 0x3));
        buf.p2(message.loc);
    }
}
