import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt from '#/network/game/client/codec/rs244/ClientProt.js';
import NoTimeout from '#/network/game/client/model/NoTimeout.js';


export default class NoTimeoutDecoder extends MessageDecoder<NoTimeout> {
    prot = ClientProt.NO_TIMEOUT;

    decode() {
        return new NoTimeout();
    }
}
