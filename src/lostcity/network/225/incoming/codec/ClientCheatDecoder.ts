import Packet from '#jagex2/io/Packet.js';
import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import ClientCheat from '#lostcity/network/225/incoming/ClientCheat.js';

export default class ClientCheatDecoder extends MessageDecoder<ClientCheat> {
    prot = ClientProt.CLIENT_CHEAT;

    decode(buf: Packet) {
        const input = buf.gjstr();
        return new ClientCheat(input);
    }
}
