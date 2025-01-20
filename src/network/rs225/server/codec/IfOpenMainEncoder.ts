import MessageEncoder from '#/network/server/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/rs225/server/prot/ServerProt.js';
import IfOpenMain from '#/network/server/model/IfOpenMain.js';

export default class IfOpenMainEncoder extends MessageEncoder<IfOpenMain> {
    prot = ServerProt.IF_OPENMAIN;

    encode(buf: Packet, message: IfOpenMain): void {
        buf.p2(message.component);
    }
}