import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import IfSetPosition from '#/network/game/server/model/IfSetPosition.js';

export default class IfSetPositionEncoder extends MessageEncoder<IfSetPosition> {
    prot = ServerProt225.IF_SETPOSITION;

    encode(buf: Packet, message: IfSetPosition): void {
        buf.p2(message.component);
        buf.p2(message.x);
        buf.p2(message.y);
    }
}
