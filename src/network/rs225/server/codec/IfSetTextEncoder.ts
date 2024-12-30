import MessageEncoder from '#/network/server/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/rs225/server/prot/ServerProt.js';
import IfSetText from '#/network/server/model/IfSetText.js';

export default class IfSetTextEncoder extends MessageEncoder<IfSetText> {
    prot = ServerProt.IF_SETTEXT;

    encode(buf: Packet, message: IfSetText): void {
        buf.p2(message.component);
        buf.pjstr(message.text);
    }

    test(message: IfSetText): number {
        return 2 + 1 + message.text.length;
    }
}