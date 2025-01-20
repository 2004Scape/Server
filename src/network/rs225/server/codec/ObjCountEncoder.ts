import Packet from '#/io/Packet.js';
import ZoneProt from '#/network/rs225/server/prot/ZoneProt.js';
import ObjCount from '#/network/server/model/ObjCount.js';
import ZoneMessageEncoder from '#/network/server/codec/ZoneMessageEncoder.js';

export default class ObjCountEncoder extends ZoneMessageEncoder<ObjCount> {
    prot = ZoneProt.OBJ_COUNT;

    encode(buf: Packet, message: ObjCount): void {
        buf.p1(message.coord);
        buf.p2(message.obj);
        buf.p2(Math.min(message.oldCount, 65535));
        buf.p2(Math.min(message.newCount, 65535));
    }
}