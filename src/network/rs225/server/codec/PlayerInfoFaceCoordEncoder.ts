import InfoMessageEncoder from '#/network/server/codec/InfoMessageEncoder.js';
import Packet from '#/io/Packet.js';
import InfoProt from '#/network/rs225/server/prot/InfoProt.js';
import PlayerInfoFaceCoord from '#/network/server/model/PlayerInfoFaceCoord.js';

export default class PlayerInfoFaceCoordEncoder extends InfoMessageEncoder<PlayerInfoFaceCoord> {
    prot: InfoProt = InfoProt.PLAYER_FACE_COORD;

    encode(buf: Packet, message: PlayerInfoFaceCoord): void {
        buf.p2(message.x);
        buf.p2(message.z);
    }
}