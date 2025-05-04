import { CoordGrid } from '#/engine/CoordGrid.js';
import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import UpdateZonePartialFollows from '#/network/game/server/model/UpdateZonePartialFollows.js';

export default class UpdateZonePartialFollowsEncoder extends MessageEncoder<UpdateZonePartialFollows> {
    prot = ServerProt225.UPDATE_ZONE_PARTIAL_FOLLOWS;

    encode(buf: Packet, message: UpdateZonePartialFollows): void {
        buf.p1((message.zoneX << 3) - CoordGrid.zoneOrigin(message.originX));
        buf.p1((message.zoneZ << 3) - CoordGrid.zoneOrigin(message.originZ));
    }
}
