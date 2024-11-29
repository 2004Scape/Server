import InfoMessageEncoder from '#lostcity/network/outgoing/codec/InfoMessageEncoder.js';
import Packet from '#jagex/io/Packet.js';
import InfoProt from '#lostcity/network/225/outgoing/prot/InfoProt.js';
import NpcInfoFaceCoord from '#lostcity/network/outgoing/model/NpcInfoFaceCoord.js';

export default class NpcInfoFaceCoordEncoder extends InfoMessageEncoder<NpcInfoFaceCoord> {
    prot: InfoProt = InfoProt.NPC_FACE_COORD;

    encode(buf: Packet, message: NpcInfoFaceCoord): void {
        buf.p2(message.x);
        buf.p2(message.z);
    }
}