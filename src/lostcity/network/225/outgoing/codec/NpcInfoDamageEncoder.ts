import InfoMessageEncoder from '#lostcity/network/outgoing/codec/InfoMessageEncoder.js';
import Packet from '#jagex/io/Packet.js';
import InfoProt from '#lostcity/network/225/outgoing/prot/InfoProt.js';
import NpcInfoDamage from '#lostcity/network/outgoing/model/NpcInfoDamage.js';

export default class NpcInfoDamageEncoder extends InfoMessageEncoder<NpcInfoDamage> {
    prot: InfoProt = InfoProt.NPC_DAMAGE;

    encode(buf: Packet, message: NpcInfoDamage): void {
        buf.p1(message.damage);
        buf.p1(message.type);
        buf.p1(message.currentHitpoints);
        buf.p1(message.baseHitpoints);
    }
}