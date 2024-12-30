import MessageEncoder from '#/network/server/codec/MessageEncoder.js';
import Packet from '#/io/Packet.js';
import ServerProt from '#/network/rs225/server/prot/ServerProt.js';
import SetMultiway from '#/network/server/model/SetMultiway.js';

export default class SetMultiwayEncoder extends MessageEncoder<SetMultiway> {
    prot = ServerProt.SET_MULTIWAY;

    encode(buf: Packet, message: SetMultiway): void {
        buf.pbool(message.hidden);
    }
}