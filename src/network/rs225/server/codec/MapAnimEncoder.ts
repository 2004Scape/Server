import Packet from '#/io/Packet.js';
import ZoneProt from '#/network/rs225/server/prot/ZoneProt.js';
import MapAnim from '#/network/server/model/MapAnim.js';
import ZoneMessageEncoder from '#/network/server/codec/ZoneMessageEncoder.js';

export default class MapAnimEncoder extends ZoneMessageEncoder<MapAnim> {
    prot = ZoneProt.MAP_ANIM;

    encode(buf: Packet, message: MapAnim): void {
        buf.p1(message.coord);
        buf.p2(message.spotanim);
        buf.p1(message.height);
        buf.p2(message.delay);
    }
}