import InfoMessageEncoder from '#lostcity/network/outgoing/codec/InfoMessageEncoder.js';
import Packet from '#jagex/io/Packet.js';
import InfoProt from '#lostcity/network/225/outgoing/prot/InfoProt.js';
import PlayerInfoSpotanim from '#lostcity/network/outgoing/model/PlayerInfoSpotanim.js';

export default class PlayerInfoSpotanimEncoder extends InfoMessageEncoder<PlayerInfoSpotanim> {
    prot: InfoProt = InfoProt.PLAYER_SPOTANIM;

    encode(buf: Packet, message: PlayerInfoSpotanim): void {
        buf.p2(message.spotanim);
        buf.p4((message.height << 16) | message.delay);
    }
}