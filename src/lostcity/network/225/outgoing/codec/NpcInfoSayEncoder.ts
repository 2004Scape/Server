import InfoMessageEncoder from '#lostcity/network/outgoing/codec/InfoMessageEncoder.js';
import Packet from '#jagex/io/Packet.js';
import InfoProt from '#lostcity/network/225/outgoing/prot/InfoProt.js';
import NpcInfoSay from '#lostcity/network/outgoing/model/NpcInfoSay.js';

export default class NpcInfoSayEncoder extends InfoMessageEncoder<NpcInfoSay> {
    prot: InfoProt = InfoProt.NPC_SAY;

    encode(buf: Packet, message: NpcInfoSay): void {
        buf.pjstr(message.say);
    }

    test(message: NpcInfoSay): number {
        return 1 + message.say.length;
    }
}