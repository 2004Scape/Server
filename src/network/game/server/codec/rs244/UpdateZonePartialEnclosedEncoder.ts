import { CoordGrid } from '#/engine/CoordGrid.js';
import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt244 from '#/network/game/server/codec/rs244/ServerProt244.js';
import UpdateZonePartialEnclosed from '#/network/game/server/model/UpdateZonePartialEnclosed.js';

export default class UpdateZonePartialEnclosedEncoder extends MessageEncoder<UpdateZonePartialEnclosed> {
    prot = ServerProt244.UPDATE_ZONE_PARTIAL_ENCLOSED;

    encode(buf: Packet, message: UpdateZonePartialEnclosed): void {
        buf.p1((message.zoneX << 3) - CoordGrid.zoneOrigin(message.originX));
        buf.p1((message.zoneZ << 3) - CoordGrid.zoneOrigin(message.originZ));
        buf.pdata(message.data, 0, message.data.length);
    }

    test(message: UpdateZonePartialEnclosed): number {
        return 1 + 1 + message.data.length;
    }
}
