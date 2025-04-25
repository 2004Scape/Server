import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import IfOpenMainSide from '#/network/game/server/model/IfOpenMainSide.js';

export default class IfOpenMainSideEncoder extends MessageEncoder<IfOpenMainSide> {
    prot = ServerProt225.IF_OPENMAIN_SIDE;

    encode(buf: Packet, message: IfOpenMainSide): void {
        buf.p2(message.main);
        buf.p2(message.side);
    }
}
