import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt244 from '#/network/game/server/codec/rs244/ServerProt244.js';
import IfSetRecol from '#/network/game/server/model/IfSetRecol.js';

export default class IfSetRecolEncoder extends MessageEncoder<IfSetRecol> {
    prot = ServerProt244.IF_SETRECOL;

    encode(buf: Packet, message: IfSetRecol): void {
        buf.p2(message.component);
        buf.p2(message.src);
        buf.p2(message.dst);
    }
}
