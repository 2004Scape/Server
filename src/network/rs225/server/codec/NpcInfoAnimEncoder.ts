import InfoMessageEncoder from '#/network/server/codec/InfoMessageEncoder.js';
import Packet from '#/io/Packet.js';
import InfoProt from '#/network/rs225/server/prot/InfoProt.js';
import NpcInfoAnim from '#/network/server/model/NpcInfoAnim.js';

export default class NpcInfoAnimEncoder extends InfoMessageEncoder<NpcInfoAnim> {
    prot: InfoProt = InfoProt.NPC_ANIM;

    encode(buf: Packet, message: NpcInfoAnim): void {
        buf.p2(message.anim);
        buf.p1(message.delay);
    }
}