import InfoMessageEncoder from '#/network/server/codec/InfoMessageEncoder.js';
import Packet from '#/io/Packet.js';
import InfoProt from '#/network/rs225/server/prot/InfoProt.js';
import NpcInfoFaceCoord from '#/network/server/model/NpcInfoFaceCoord.js';

export default class NpcInfoFaceCoordEncoder extends InfoMessageEncoder<NpcInfoFaceCoord> {
    prot: InfoProt = InfoProt.NPC_FACE_COORD;

    encode(buf: Packet, message: NpcInfoFaceCoord): void {
        buf.p2(message.x);
        buf.p2(message.z);
    }
}