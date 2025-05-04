import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import IfSetAnim from '#/network/game/server/model/IfSetAnim.js';

export default class IfSetAnimEncoder extends MessageEncoder<IfSetAnim> {
    prot = ServerProt225.IF_SETANIM;

    encode(buf: Packet, message: IfSetAnim): void {
        buf.p2(message.component);
        buf.p2(message.seq);
    }
}
