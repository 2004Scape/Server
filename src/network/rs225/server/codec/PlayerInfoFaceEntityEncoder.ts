import InfoMessageEncoder from '#/network/server/codec/InfoMessageEncoder.js';
import Packet from '#/io/Packet.js';
import InfoProt from '#/network/rs225/server/prot/InfoProt.js';
import PlayerInfoFaceEntity from '#/network/server/model/PlayerInfoFaceEntity.js';

export default class PlayerInfoFaceEntityEncoder extends InfoMessageEncoder<PlayerInfoFaceEntity> {
    prot: InfoProt = InfoProt.PLAYER_FACE_ENTITY;

    encode(buf: Packet, message: PlayerInfoFaceEntity): void {
        buf.p2(message.entity);
    }
}