import MessageEncoder from '#/network/server/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/rs225/server/prot/ServerProt.js';
import UpdateZoneFullFollows from '#/network/server/model/UpdateZoneFullFollows.js';
import {CoordGrid} from '#/engine/CoordGrid.js';

export default class UpdateZoneFullFollowsEncoder extends MessageEncoder<UpdateZoneFullFollows> {
    prot = ServerProt.UPDATE_ZONE_FULL_FOLLOWS;

    encode(buf: Packet, message: UpdateZoneFullFollows): void {
        buf.p1((message.zoneX << 3) - CoordGrid.zoneOrigin(message.originX));
        buf.p1((message.zoneZ << 3) - CoordGrid.zoneOrigin(message.originZ));
    }
}