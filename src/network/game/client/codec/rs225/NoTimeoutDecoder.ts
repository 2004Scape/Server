import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt225 from '#/network/game/client/codec/rs225/ClientProt225.js';
import NoTimeout from '#/network/game/client/model/NoTimeout.js';

export default class NoTimeoutDecoder extends MessageDecoder<NoTimeout> {
    prot = ClientProt225.NO_TIMEOUT;

    decode() {
        return new NoTimeout();
    }
}
