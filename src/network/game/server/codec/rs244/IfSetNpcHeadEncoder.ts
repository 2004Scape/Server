import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt from '#/network/game/server/codec/rs244/ServerProt.js';
import IfSetNpcHead from '#/network/game/server/model/IfSetNpcHead.js';

export default class IfSetNpcHeadEncoder extends MessageEncoder<IfSetNpcHead> {
    prot = ServerProt.IF_SETNPCHEAD;

    encode(buf: Packet, message: IfSetNpcHead): void {
        buf.p2(message.component);
        buf.p2(message.npc);
    }
}
