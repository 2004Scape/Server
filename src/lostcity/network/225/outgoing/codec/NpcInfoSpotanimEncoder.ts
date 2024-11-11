import InfoMessageEncoder from '#lostcity/network/outgoing/codec/InfoMessageEncoder.js';
import Packet from '#jagex/io/Packet.js';
import InfoProt from '#lostcity/network/225/outgoing/prot/InfoProt.js';
import NpcInfoSpotanim from '#lostcity/network/outgoing/model/NpcInfoSpotanim.js';

export default class NpcInfoSpotanimEncoder extends InfoMessageEncoder<NpcInfoSpotanim> {
    prot: InfoProt = InfoProt.NPC_SPOTANIM;

    encode(buf: Packet, message: NpcInfoSpotanim): void {
        buf.p2(message.spotanim);
        buf.p4((message.height << 16) | message.delay);
    }
}