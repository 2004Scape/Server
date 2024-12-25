import InfoMessageEncoder from '#/network/outgoing/codec/InfoMessageEncoder.js';
import Packet from '#/io/Packet.js';
import InfoProt from '#/network/225/outgoing/prot/InfoProt.js';
import PlayerInfoFaceCoord from '#/network/outgoing/model/PlayerInfoFaceCoord.js';

export default class PlayerInfoFaceCoordEncoder extends InfoMessageEncoder<PlayerInfoFaceCoord> {
    prot: InfoProt = InfoProt.PLAYER_FACE_COORD;

    encode(buf: Packet, message: PlayerInfoFaceCoord): void {
        buf.p2(message.x);
        buf.p2(message.z);
    }
}