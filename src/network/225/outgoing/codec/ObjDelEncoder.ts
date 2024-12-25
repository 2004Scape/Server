import Packet from '#/io/Packet.js';
import ZoneProt from '#/network/225/outgoing/prot/ZoneProt.js';
import ObjDel from '#/network/outgoing/model/ObjDel.js';
import ZoneMessageEncoder from '#/network/outgoing/codec/ZoneMessageEncoder.js';

export default class ObjDelEncoder extends ZoneMessageEncoder<ObjDel> {
    prot = ZoneProt.OBJ_DEL;

    encode(buf: Packet, message: ObjDel): void {
        buf.p1(message.coord);
        buf.p2(message.obj);
    }
}