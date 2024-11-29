import InfoMessageEncoder from '#lostcity/network/outgoing/codec/InfoMessageEncoder.js';
import Packet from '#jagex/io/Packet.js';
import InfoProt from '#lostcity/network/225/outgoing/prot/InfoProt.js';
import PlayerInfoFaceEntity from '#lostcity/network/outgoing/model/PlayerInfoFaceEntity.js';

export default class PlayerInfoFaceEntityEncoder extends InfoMessageEncoder<PlayerInfoFaceEntity> {
    prot: InfoProt = InfoProt.PLAYER_FACE_ENTITY;

    encode(buf: Packet, message: PlayerInfoFaceEntity): void {
        buf.p2(message.entity);
    }
}