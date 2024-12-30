import InfoMessageEncoder from '#/network/server/codec/InfoMessageEncoder.js';
import Packet from '#/io/Packet.js';
import InfoProt from '#/network/rs225/server/prot/InfoProt.js';
import PlayerInfoSay from '#/network/server/model/PlayerInfoSay.js';

export default class PlayerInfoSayEncoder extends InfoMessageEncoder<PlayerInfoSay> {
    prot: InfoProt = InfoProt.PLAYER_SAY;

    encode(buf: Packet, message: PlayerInfoSay): void {
        buf.pjstr(message.say);
    }

    test(message: PlayerInfoSay): number {
        return 1 + message.say.length;
    }
}