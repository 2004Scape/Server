import InfoMessageEncoder from '#lostcity/network/outgoing/codec/InfoMessageEncoder.js';
import PlayerInfoAppearance from '#lostcity/network/outgoing/model/PlayerInfoAppearance.js';
import Packet from '#jagex/io/Packet.js';
import InfoProt from '#lostcity/network/225/outgoing/prot/InfoProt.js';

export default class PlayerInfoAppearanceEncoder extends InfoMessageEncoder<PlayerInfoAppearance> {
    prot: InfoProt = InfoProt.PLAYER_APPEARANCE;

    encode(buf: Packet, message: PlayerInfoAppearance): void {
        buf.p1(message.appearance.length);
        buf.pdata(message.appearance, 0, message.appearance.length);
    }

    test(message: PlayerInfoAppearance): number {
        return 1 + message.appearance.length;
    }
}