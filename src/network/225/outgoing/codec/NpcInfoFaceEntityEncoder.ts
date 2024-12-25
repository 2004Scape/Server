import InfoMessageEncoder from '#/network/outgoing/codec/InfoMessageEncoder.js';
import Packet from '#/io/Packet.js';
import InfoProt from '#/network/225/outgoing/prot/InfoProt.js';
import NpcInfoFaceEntity from '#/network/outgoing/model/NpcInfoFaceEntity.js';

export default class NpcInfoFaceEntityEncoder extends InfoMessageEncoder<NpcInfoFaceEntity> {
    prot: InfoProt = InfoProt.NPC_FACE_ENTITY;

    encode(buf: Packet, message: NpcInfoFaceEntity): void {
        buf.p2(message.entity);
    }
}