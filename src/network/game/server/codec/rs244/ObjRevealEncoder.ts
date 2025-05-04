import Packet from '#/io/Packet.js';
import ZoneProt from '#/network/game/server/codec/rs244/ZoneProt.js';
import ZoneMessageEncoder from '#/network/game/server/codec/ZoneMessageEncoder.js';
import ObjReveal from '#/network/game/server/model/ObjReveal.js';


export default class ObjRevealEncoder extends ZoneMessageEncoder<ObjReveal> {
    prot = ZoneProt.OBJ_REVEAL;

    encode(buf: Packet, message: ObjReveal): void {
        buf.p1(message.coord);
        buf.p2(message.obj);
        buf.p2(Math.min(message.count, 65535));
        buf.p2(message.receiverId);
    }
}
