import { CoordGrid } from '#/engine/CoordGrid.js';
import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt from '#/network/game/server/codec/rs225/ServerProt.js';
import UpdateZoneFullFollows from '#/network/game/server/model/UpdateZoneFullFollows.js';

export default class UpdateZoneFullFollowsEncoder extends MessageEncoder<UpdateZoneFullFollows> {
    prot = ServerProt.UPDATE_ZONE_FULL_FOLLOWS;

    encode(buf: Packet, message: UpdateZoneFullFollows): void {
        buf.p1((message.zoneX << 3) - CoordGrid.zoneOrigin(message.originX));
        buf.p1((message.zoneZ << 3) - CoordGrid.zoneOrigin(message.originZ));
    }
}
