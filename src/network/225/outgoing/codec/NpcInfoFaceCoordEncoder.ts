import InfoMessageEncoder from '#/network/outgoing/codec/InfoMessageEncoder.js';
import Packet from '#/io/Packet.js';
import InfoProt from '#/network/225/outgoing/prot/InfoProt.js';
import NpcInfoFaceCoord from '#/network/outgoing/model/NpcInfoFaceCoord.js';

export default class NpcInfoFaceCoordEncoder extends InfoMessageEncoder<NpcInfoFaceCoord> {
    prot: InfoProt = InfoProt.NPC_FACE_COORD;

    encode(buf: Packet, message: NpcInfoFaceCoord): void {
        buf.p2(message.x);
        buf.p2(message.z);
    }
}