import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import IfSetNpcHead from '#/network/outgoing/model/IfSetNpcHead.js';

export default class IfSetNpcHeadEncoder extends MessageEncoder<IfSetNpcHead> {
    prot = ServerProt.IF_SETNPCHEAD;

    encode(buf: Packet, message: IfSetNpcHead): void {
        buf.p2(message.component);
        buf.p2(message.npc);
    }
}