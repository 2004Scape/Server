import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt from '#/network/game/server/codec/rs225/ServerProt.js';
import IfSetText from '#/network/game/server/model/IfSetText.js';

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
