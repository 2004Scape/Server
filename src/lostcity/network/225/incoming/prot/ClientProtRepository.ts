import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import InvButtonDecoder from '#lostcity/network/225/incoming/codec/InvButtonDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import IncomingMessage from '#lostcity/network/incoming/IncomingMessage.js';

class ClientProtRepository {
    bound: Map<number, MessageDecoder<IncomingMessage>> = new Map();

    private bind(decoder: MessageDecoder<IncomingMessage>) {
        this.bound.set(decoder.prot.id, decoder);
    }

    constructor() {
        this.bind(new InvButtonDecoder(ClientProt.INV_BUTTON1, 1));
        this.bind(new InvButtonDecoder(ClientProt.INV_BUTTON2, 2));
        this.bind(new InvButtonDecoder(ClientProt.INV_BUTTON3, 3));
        this.bind(new InvButtonDecoder(ClientProt.INV_BUTTON4, 4));
        this.bind(new InvButtonDecoder(ClientProt.INV_BUTTON5, 5));
    }

    get(prot: ClientProt) {
        return this.bound.get(prot.id);
    }
}

export default new ClientProtRepository();
