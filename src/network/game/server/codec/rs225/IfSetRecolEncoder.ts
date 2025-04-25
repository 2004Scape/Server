import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt from '#/network/game/server/codec/rs225/ServerProt.js';
import IfSetRecol from '#/network/game/server/model/IfSetRecol.js';

export default class IfSetRecolEncoder extends MessageEncoder<IfSetRecol> {
    prot = ServerProt.IF_SETRECOL;

    encode(buf: Packet, message: IfSetRecol): void {
        buf.p2(message.component);
        buf.p2(message.src);
        buf.p2(message.dst);
    }
}
