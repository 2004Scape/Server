import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#/network/225/incoming/prot/ClientProt.js';
import ClientCheat from '#/network/incoming/model/ClientCheat.js';

export default class ClientCheatDecoder extends MessageDecoder<ClientCheat> {
    prot = ClientProt.CLIENT_CHEAT;

    decode(buf: Packet) {
        const input = buf.gjstr();
        return new ClientCheat(input);
    }
}
