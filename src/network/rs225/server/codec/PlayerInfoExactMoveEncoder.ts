import InfoMessageEncoder from '#/network/server/codec/InfoMessageEncoder.js';
import Packet from '#/io/Packet.js';
import InfoProt from '#/network/rs225/server/prot/InfoProt.js';
import PlayerInfoExactMove from '#/network/server/model/PlayerInfoExactMove.js';

export default class PlayerInfoExactMoveEncoder extends InfoMessageEncoder<PlayerInfoExactMove> {
    prot: InfoProt = InfoProt.PLAYER_EXACT_MOVE;

    encode(buf: Packet, message: PlayerInfoExactMove): void {
        buf.p1(message.startX);
        buf.p1(message.startZ);
        buf.p1(message.endX);
        buf.p1(message.endZ);
        buf.p2(message.start);
        buf.p2(message.end);
        buf.p1(message.direction);
    }
}