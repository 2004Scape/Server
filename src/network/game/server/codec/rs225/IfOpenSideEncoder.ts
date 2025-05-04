import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import IfOpenSide from '#/network/game/server/model/IfOpenSide.js';

export default class IfOpenSideEncoder extends MessageEncoder<IfOpenSide> {
    prot = ServerProt225.IF_OPENSIDE;

    encode(buf: Packet, message: IfOpenSide): void {
        buf.p2(message.component);
    }
}
