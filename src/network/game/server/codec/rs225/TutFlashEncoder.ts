import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import TutFlash from '#/network/game/server/model/TutFlash.js';

export default class TutFlashEncoder extends MessageEncoder<TutFlash> {
    prot = ServerProt225.TUT_FLASH;

    encode(buf: Packet, message: TutFlash): void {
        buf.p1(message.tab);
    }
}
