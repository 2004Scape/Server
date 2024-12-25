import Packet from '#/io/Packet.js';
import LocDel from '#/network/outgoing/model/LocDel.js';
import ZoneProt from '#/network/225/outgoing/prot/ZoneProt.js';
import ZoneMessageEncoder from '#/network/outgoing/codec/ZoneMessageEncoder.js';

export default class LocDelEncoder extends ZoneMessageEncoder<LocDel> {
    prot = ZoneProt.LOC_DEL;

    encode(buf: Packet, message: LocDel): void {
        buf.p1(message.coord);
        buf.p1((message.shape << 2) | (message.angle & 0x3));
    }
}