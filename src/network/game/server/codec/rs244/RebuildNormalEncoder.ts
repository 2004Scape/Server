import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt244 from '#/network/game/server/codec/rs244/ServerProt244.js';
import RebuildNormal from '#/network/game/server/model/RebuildNormal.js';

export default class RebuildNormalEncoder extends MessageEncoder<RebuildNormal> {
    prot = ServerProt244.REBUILD_NORMAL;

    encode(buf: Packet, message: RebuildNormal): void {
        buf.p2(message.zoneX);
        buf.p2(message.zoneZ);
    }

    test(_message: RebuildNormal): number {
        return 4;
    }
}
