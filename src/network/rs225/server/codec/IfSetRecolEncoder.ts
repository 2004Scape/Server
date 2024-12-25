import MessageEncoder from '#/network/server/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/rs225/server/prot/ServerProt.js';
import IfSetRecol from '#/network/server/model/IfSetRecol.js';

export default class IfSetRecolEncoder extends MessageEncoder<IfSetRecol> {
    prot = ServerProt.IF_SETRECOL;

    encode(buf: Packet, message: IfSetRecol): void {
        buf.p2(message.component);
        buf.p2(message.src);
        buf.p2(message.dst);
    }
}