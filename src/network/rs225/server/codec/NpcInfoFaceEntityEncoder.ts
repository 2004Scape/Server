import InfoMessageEncoder from '#/network/server/codec/InfoMessageEncoder.js';
import Packet from '#/io/Packet.js';
import InfoProt from '#/network/rs225/server/prot/InfoProt.js';
import NpcInfoFaceEntity from '#/network/server/model/NpcInfoFaceEntity.js';

export default class NpcInfoFaceEntityEncoder extends InfoMessageEncoder<NpcInfoFaceEntity> {
    prot: InfoProt = InfoProt.NPC_FACE_ENTITY;

    encode(buf: Packet, message: NpcInfoFaceEntity): void {
        buf.p2(message.entity);
    }
}