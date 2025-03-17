import MessageDecoder from '#/network/client/codec/MessageDecoder.js';
import IdleTimer from '#/network/client/model/IdleTimer.js';
import ClientProt from '#/network/rs225/client/prot/ClientProt.js';

export default class IdleTimerDecoder extends MessageDecoder<IdleTimer> {
    prot = ClientProt.IDLE_TIMER;

    decode() {
        return new IdleTimer();
    }
}
