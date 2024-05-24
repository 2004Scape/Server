import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import NoTimeout from '#lostcity/network/225/incoming/NoTimeout.js';

export default class NoTimeoutDecoder extends MessageDecoder<NoTimeout> {
    prot = ClientProt.NO_TIMEOUT;

    decode() {
        return new NoTimeout();
    }
}
