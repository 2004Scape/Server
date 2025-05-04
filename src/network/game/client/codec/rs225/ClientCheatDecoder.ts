import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt225 from '#/network/game/client/codec/rs225/ClientProt225.js';
import ClientCheat from '#/network/game/client/model/ClientCheat.js';

export default class ClientCheatDecoder extends MessageDecoder<ClientCheat> {
    prot = ClientProt225.CLIENT_CHEAT;

    decode(buf: Packet) {
        const input = buf.gjstr();
        return new ClientCheat(input);
    }
}
