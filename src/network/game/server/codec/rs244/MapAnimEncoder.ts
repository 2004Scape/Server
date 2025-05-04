import Packet from '#/io/Packet.js';
import ZoneProt from '#/network/game/server/codec/rs244/ZoneProt.js';
import ZoneMessageEncoder from '#/network/game/server/codec/ZoneMessageEncoder.js';
import MapAnim from '#/network/game/server/model/MapAnim.js';


export default class MapAnimEncoder extends ZoneMessageEncoder<MapAnim> {
    prot = ZoneProt.MAP_ANIM;

    encode(buf: Packet, message: MapAnim): void {
        buf.p1(message.coord);
        buf.p2(message.spotanim);
        buf.p1(message.height);
        buf.p2(message.delay);
    }
}
