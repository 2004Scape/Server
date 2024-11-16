import InfoMessageEncoder from '#lostcity/network/outgoing/codec/InfoMessageEncoder.js';
import Packet from '#jagex/io/Packet.js';
import InfoProt from '#lostcity/network/225/outgoing/prot/InfoProt.js';
import PlayerInfoDamage from '#lostcity/network/outgoing/model/PlayerInfoDamage.js';

export default class PlayerInfoDamageEncoder extends InfoMessageEncoder<PlayerInfoDamage> {
    prot: InfoProt = InfoProt.PLAYER_DAMAGE;

    encode(buf: Packet, message: PlayerInfoDamage): void {
        buf.p1(message.damage);
        buf.p1(message.type);
        buf.p1(message.currentHitpoints);
        buf.p1(message.baseHitpoints);
    }
}