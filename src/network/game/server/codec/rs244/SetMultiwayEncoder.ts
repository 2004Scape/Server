import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt244 from '#/network/game/server/codec/rs244/ServerProt244.js';
import SetMultiway from '#/network/game/server/model/SetMultiway.js';

export default class SetMultiwayEncoder extends MessageEncoder<SetMultiway> {
    prot = ServerProt244.SET_MULTIWAY;

    encode(buf: Packet, message: SetMultiway): void {
        buf.pbool(message.hidden);
    }
}
