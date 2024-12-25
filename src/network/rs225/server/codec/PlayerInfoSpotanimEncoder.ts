import InfoMessageEncoder from '#/network/server/codec/InfoMessageEncoder.js';
import Packet from '#/io/Packet.js';
import InfoProt from '#/network/rs225/server/prot/InfoProt.js';
import PlayerInfoSpotanim from '#/network/server/model/PlayerInfoSpotanim.js';

export default class PlayerInfoSpotanimEncoder extends InfoMessageEncoder<PlayerInfoSpotanim> {
    prot: InfoProt = InfoProt.PLAYER_SPOTANIM;

    encode(buf: Packet, message: PlayerInfoSpotanim): void {
        buf.p2(message.spotanim);
        buf.p4((message.height << 16) | message.delay);
    }
}