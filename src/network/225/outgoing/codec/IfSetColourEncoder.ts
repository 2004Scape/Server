import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import IfSetColour from '#/network/outgoing/model/IfSetColour.js';

export default class IfSetColourEncoder extends MessageEncoder<IfSetColour> {
    prot = ServerProt.IF_SETCOLOUR;

    encode(buf: Packet, message: IfSetColour): void {
        buf.p2(message.component);
        buf.p2(message.colour);
    }
}