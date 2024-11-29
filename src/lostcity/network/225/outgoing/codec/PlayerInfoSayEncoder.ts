import InfoMessageEncoder from '#lostcity/network/outgoing/codec/InfoMessageEncoder.js';
import Packet from '#jagex/io/Packet.js';
import InfoProt from '#lostcity/network/225/outgoing/prot/InfoProt.js';
import PlayerInfoSay from '#lostcity/network/outgoing/model/PlayerInfoSay.js';

export default class PlayerInfoSayEncoder extends InfoMessageEncoder<PlayerInfoSay> {
    prot: InfoProt = InfoProt.PLAYER_SAY;

    encode(buf: Packet, message: PlayerInfoSay): void {
        buf.pjstr(message.say);
    }

    test(message: PlayerInfoSay): number {
        return 1 + message.say.length;
    }
}