import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt244 from '#/network/game/server/codec/rs244/ServerProt244.js';
import TutFlash from '#/network/game/server/model/TutFlash.js';

export default class TutFlashEncoder extends MessageEncoder<TutFlash> {
    prot = ServerProt244.TUT_FLASH;

    encode(buf: Packet, message: TutFlash): void {
        buf.p1(message.tab);
    }
}
