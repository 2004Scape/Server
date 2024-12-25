import InfoMessageEncoder from '#/network/server/codec/InfoMessageEncoder.js';
import Packet from '#/io/Packet.js';
import InfoProt from '#/network/rs225/server/prot/InfoProt.js';
import PlayerInfoDamage from '#/network/server/model/PlayerInfoDamage.js';

export default class PlayerInfoDamageEncoder extends InfoMessageEncoder<PlayerInfoDamage> {
    prot: InfoProt = InfoProt.PLAYER_DAMAGE;

    encode(buf: Packet, message: PlayerInfoDamage): void {
        buf.p1(message.damage);
        buf.p1(message.type);
        buf.p1(message.currentHitpoints);
        buf.p1(message.baseHitpoints);
    }
}