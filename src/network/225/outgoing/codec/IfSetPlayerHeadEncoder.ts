import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import IfSetPlayerHead from '#/network/outgoing/model/IfSetPlayerHead.js';

export default class IfSetPlayerHeadEncoder extends MessageEncoder<IfSetPlayerHead> {
    prot = ServerProt.IF_SETPLAYERHEAD;

    encode(buf: Packet, message: IfSetPlayerHead): void {
        buf.p2(message.component);
    }
}