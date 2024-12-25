import InfoMessageEncoder from '#/network/outgoing/codec/InfoMessageEncoder.js';
import Packet from '#/io/Packet.js';
import InfoProt from '#/network/225/outgoing/prot/InfoProt.js';
import PlayerInfoAnim from '#/network/outgoing/model/PlayerInfoAnim.js';

export default class PlayerInfoAnimEncoder extends InfoMessageEncoder<PlayerInfoAnim> {
    prot: InfoProt = InfoProt.PLAYER_ANIM;

    encode(buf: Packet, message: PlayerInfoAnim): void {
        buf.p2(message.anim);
        buf.p1(message.delay);
    }
}