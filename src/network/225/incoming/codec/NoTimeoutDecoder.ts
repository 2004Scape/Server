import MessageDecoder from '#/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#/network/225/incoming/prot/ClientProt.js';
import NoTimeout from '#/network/incoming/model/NoTimeout.js';

export default class NoTimeoutDecoder extends MessageDecoder<NoTimeout> {
    prot = ClientProt.NO_TIMEOUT;

    decode() {
        return new NoTimeout();
    }
}
