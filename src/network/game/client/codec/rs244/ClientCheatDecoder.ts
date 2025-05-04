import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt244 from '#/network/game/client/codec/rs244/ClientProt244.js';
import ClientCheat from '#/network/game/client/model/ClientCheat.js';


export default class ClientCheatDecoder extends MessageDecoder<ClientCheat> {
    prot = ClientProt244.CLIENT_CHEAT;

    decode(buf: Packet) {
        const input = buf.gjstr();
        return new ClientCheat(input);
    }
}
