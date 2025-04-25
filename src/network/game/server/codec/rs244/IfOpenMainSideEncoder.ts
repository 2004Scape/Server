import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt244 from '#/network/game/server/codec/rs244/ServerProt244.js';
import IfOpenMainSide from '#/network/game/server/model/IfOpenMainSide.js';

export default class IfOpenMainSideEncoder extends MessageEncoder<IfOpenMainSide> {
    prot = ServerProt244.IF_OPENMAIN_SIDE;

    encode(buf: Packet, message: IfOpenMainSide): void {
        buf.p2(message.main);
        buf.p2(message.side);
    }
}
