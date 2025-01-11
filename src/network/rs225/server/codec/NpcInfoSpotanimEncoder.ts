import InfoMessageEncoder from '#/network/server/codec/InfoMessageEncoder.js';
import Packet from '#/io/Packet.js';
import InfoProt from '#/network/rs225/server/prot/InfoProt.js';
import NpcInfoSpotanim from '#/network/server/model/NpcInfoSpotanim.js';

export default class NpcInfoSpotanimEncoder extends InfoMessageEncoder<NpcInfoSpotanim> {
    prot: InfoProt = InfoProt.NPC_SPOTANIM;

    encode(buf: Packet, message: NpcInfoSpotanim): void {
        buf.p2(message.spotanim);
        buf.p4((message.height << 16) | message.delay);
    }
}