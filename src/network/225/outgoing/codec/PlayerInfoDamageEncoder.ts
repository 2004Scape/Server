import InfoMessageEncoder from '#/network/outgoing/codec/InfoMessageEncoder.js';
import Packet from '#/io/Packet.js';
import InfoProt from '#/network/225/outgoing/prot/InfoProt.js';
import PlayerInfoDamage from '#/network/outgoing/model/PlayerInfoDamage.js';

export default class PlayerInfoDamageEncoder extends InfoMessageEncoder<PlayerInfoDamage> {
    prot: InfoProt = InfoProt.PLAYER_DAMAGE;

    encode(buf: Packet, message: PlayerInfoDamage): void {
        buf.p1(message.damage);
        buf.p1(message.type);
        buf.p1(message.currentHitpoints);
        buf.p1(message.baseHitpoints);
    }
}