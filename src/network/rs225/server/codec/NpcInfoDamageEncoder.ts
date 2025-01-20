import InfoMessageEncoder from '#/network/server/codec/InfoMessageEncoder.js';
import Packet from '#/io/Packet.js';
import InfoProt from '#/network/rs225/server/prot/InfoProt.js';
import NpcInfoDamage from '#/network/server/model/NpcInfoDamage.js';

export default class NpcInfoDamageEncoder extends InfoMessageEncoder<NpcInfoDamage> {
    prot: InfoProt = InfoProt.NPC_DAMAGE;

    encode(buf: Packet, message: NpcInfoDamage): void {
        buf.p1(message.damage);
        buf.p1(message.type);
        buf.p1(message.currentHitpoints);
        buf.p1(message.baseHitpoints);
    }
}