import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import IfSetColour from '#/network/game/server/model/IfSetColour.js';

export default class IfSetColourEncoder extends MessageEncoder<IfSetColour> {
    prot = ServerProt225.IF_SETCOLOUR;

    encode(buf: Packet, message: IfSetColour): void {
        buf.p2(message.component);
        buf.p2(message.colour);
    }
}
