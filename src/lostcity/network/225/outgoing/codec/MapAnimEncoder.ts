import MessageEncoder from '#lostcity/network/outgoing/codec/MessageEncoder.js';
import Packet from '#jagex2/io/Packet.js';
import ServerProt from '#lostcity/network/225/outgoing/prot/ServerProt.js';
import MapAnim from '#lostcity/network/outgoing/model/MapAnim.js';

export default class MapAnimEncoder extends MessageEncoder<MapAnim> {
    prot = ServerProt.MAP_ANIM;

    encode(buf: Packet, message: MapAnim): void {
        buf.p1(message.coord);
        buf.p2(message.spotanim);
        buf.p1(message.height);
        buf.p2(message.delay);
    }
}