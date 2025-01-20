import InfoMessageEncoder from '#/network/server/codec/InfoMessageEncoder.js';
import Packet from '#/io/Packet.js';
import InfoProt from '#/network/rs225/server/prot/InfoProt.js';
import NpcInfoSay from '#/network/server/model/NpcInfoSay.js';

export default class NpcInfoSayEncoder extends InfoMessageEncoder<NpcInfoSay> {
    prot: InfoProt = InfoProt.NPC_SAY;

    encode(buf: Packet, message: NpcInfoSay): void {
        buf.pjstr(message.say);
    }

    test(message: NpcInfoSay): number {
        return 1 + message.say.length;
    }
}