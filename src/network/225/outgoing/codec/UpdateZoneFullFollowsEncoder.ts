import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import UpdateZoneFullFollows from '#/network/outgoing/model/UpdateZoneFullFollows.js';
import {CoordGrid} from '#/engine/CoordGrid.js';

export default class UpdateZoneFullFollowsEncoder extends MessageEncoder<UpdateZoneFullFollows> {
    prot = ServerProt.UPDATE_ZONE_FULL_FOLLOWS;

    encode(buf: Packet, message: UpdateZoneFullFollows): void {
        buf.p1((message.zoneX << 3) - CoordGrid.zoneOrigin(message.originX));
        buf.p1((message.zoneZ << 3) - CoordGrid.zoneOrigin(message.originZ));
    }
}