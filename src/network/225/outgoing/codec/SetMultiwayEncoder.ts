import MessageEncoder from '#/network/outgoing/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/225/outgoing/prot/ServerProt.js';
import SetMultiway from '#/network/outgoing/model/SetMultiway.js';

export default class SetMultiwayEncoder extends MessageEncoder<SetMultiway> {
    prot = ServerProt.SET_MULTIWAY;

    encode(buf: Packet, message: SetMultiway): void {
        buf.pbool(message.hidden);
    }
}