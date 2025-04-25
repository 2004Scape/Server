import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import IfOpenMain from '#/network/game/server/model/IfOpenMain.js';

export default class IfOpenMainEncoder extends MessageEncoder<IfOpenMain> {
    prot = ServerProt225.IF_OPENMAIN;

    encode(buf: Packet, message: IfOpenMain): void {
        buf.p2(message.component);
    }
}
