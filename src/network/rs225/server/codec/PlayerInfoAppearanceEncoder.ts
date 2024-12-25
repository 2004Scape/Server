import InfoMessageEncoder from '#/network/server/codec/InfoMessageEncoder.js';
import PlayerInfoAppearance from '#/network/server/model/PlayerInfoAppearance.js';
import Packet from '#/io/Packet.js';
import InfoProt from '#/network/rs225/server/prot/InfoProt.js';

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