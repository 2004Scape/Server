import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import IfOpenMain from '#/network/outgoing/model/IfOpenMain.js';

export default class IfOpenMainEncoder extends MessageEncoder<IfOpenMain> {
    prot = ServerProt.IF_OPENMAIN;

    encode(buf: Packet, message: IfOpenMain): void {
        buf.p2(message.component);
    }
}