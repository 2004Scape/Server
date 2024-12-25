import InfoMessageEncoder from '#/network/outgoing/codec/InfoMessageEncoder.js';
import Packet from '#/io/Packet.js';
import InfoProt from '#/network/225/outgoing/prot/InfoProt.js';
import NpcInfoSay from '#/network/outgoing/model/NpcInfoSay.js';

export default class NpcInfoSayEncoder extends InfoMessageEncoder<NpcInfoSay> {
    prot: InfoProt = InfoProt.NPC_SAY;

    encode(buf: Packet, message: NpcInfoSay): void {
        buf.pjstr(message.say);
    }

    test(message: NpcInfoSay): number {
        return 1 + message.say.length;
    }
}