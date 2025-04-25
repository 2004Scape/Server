import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt from '#/network/game/server/codec/rs244/ServerProt.js';
import SetMultiway from '#/network/game/server/model/SetMultiway.js';

export default class SetMultiwayEncoder extends MessageEncoder<SetMultiway> {
    prot = ServerProt.SET_MULTIWAY;

    encode(buf: Packet, message: SetMultiway): void {
        buf.pbool(message.hidden);
    }
}
