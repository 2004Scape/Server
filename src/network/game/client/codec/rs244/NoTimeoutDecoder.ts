import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt244 from '#/network/game/client/codec/rs244/ClientProt244.js';
import NoTimeout from '#/network/game/client/model/NoTimeout.js';


export default class NoTimeoutDecoder extends MessageDecoder<NoTimeout> {
    prot = ClientProt244.NO_TIMEOUT;

    decode() {
        return new NoTimeout();
    }
}
