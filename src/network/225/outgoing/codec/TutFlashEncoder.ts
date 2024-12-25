import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import TutFlash from '#/network/outgoing/model/TutFlash.js';

export default class TutFlashEncoder extends MessageEncoder<TutFlash> {
    prot = ServerProt.TUT_FLASH;

    encode(buf: Packet, message: TutFlash): void {
        buf.p1(message.tab);
    }
}