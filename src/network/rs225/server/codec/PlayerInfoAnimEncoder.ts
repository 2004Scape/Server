import InfoMessageEncoder from '#/network/server/codec/InfoMessageEncoder.js';
import Packet from '#/io/Packet.js';
import InfoProt from '#/network/rs225/server/prot/InfoProt.js';
import PlayerInfoAnim from '#/network/server/model/PlayerInfoAnim.js';

export default class PlayerInfoAnimEncoder extends InfoMessageEncoder<PlayerInfoAnim> {
    prot: InfoProt = InfoProt.PLAYER_ANIM;

    encode(buf: Packet, message: PlayerInfoAnim): void {
        buf.p2(message.anim);
        buf.p1(message.delay);
    }
}