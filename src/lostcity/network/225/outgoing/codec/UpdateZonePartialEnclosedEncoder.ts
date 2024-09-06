import MessageEncoder from '#lostcity/network/outgoing/codec/MessageEncoder.js';
import Packet from '#jagex2/io/Packet.js';
import ServerProt from '#lostcity/network/225/outgoing/prot/ServerProt.js';
import {CoordGrid} from '#lostcity/engine/CoordGrid.js';
import UpdateZonePartialEnclosed from '#lostcity/network/outgoing/model/UpdateZonePartialEnclosed.js';

export default class UpdateZonePartialEnclosedEncoder extends MessageEncoder<UpdateZonePartialEnclosed> {
    prot = ServerProt.UPDATE_ZONE_PARTIAL_ENCLOSED;

    encode(buf: Packet, message: UpdateZonePartialEnclosed): void {
        buf.p1((message.zoneX << 3) - CoordGrid.zoneOrigin(message.originX));
        buf.p1((message.zoneZ << 3) - CoordGrid.zoneOrigin(message.originZ));
        buf.pdata(message.data, 0, message.data.length);
    }

    test(message: UpdateZonePartialEnclosed): number {
        return 1 + 1 + message.data.length;
    }
}