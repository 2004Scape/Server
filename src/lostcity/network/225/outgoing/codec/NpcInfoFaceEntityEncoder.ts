import InfoMessageEncoder from '#lostcity/network/outgoing/codec/InfoMessageEncoder.js';
import Packet from '#jagex/io/Packet.js';
import InfoProt from '#lostcity/network/225/outgoing/prot/InfoProt.js';
import NpcInfoFaceEntity from '#lostcity/network/outgoing/model/NpcInfoFaceEntity.js';

export default class NpcInfoFaceEntityEncoder extends InfoMessageEncoder<NpcInfoFaceEntity> {
    prot: InfoProt = InfoProt.NPC_FACE_ENTITY;

    encode(buf: Packet, message: NpcInfoFaceEntity): void {
        buf.p2(message.entity);
    }
}