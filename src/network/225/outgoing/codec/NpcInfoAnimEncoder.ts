import InfoMessageEncoder from '#/network/outgoing/codec/InfoMessageEncoder.js';
import Packet from '#/io/Packet.js';
import InfoProt from '#/network/225/outgoing/prot/InfoProt.js';
import NpcInfoAnim from '#/network/outgoing/model/NpcInfoAnim.js';

export default class NpcInfoAnimEncoder extends InfoMessageEncoder<NpcInfoAnim> {
    prot: InfoProt = InfoProt.NPC_ANIM;

    encode(buf: Packet, message: NpcInfoAnim): void {
        buf.p2(message.anim);
        buf.p1(message.delay);
    }
}