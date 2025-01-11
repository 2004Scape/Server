import MessageDecoder from '#/network/client/codec/MessageDecoder.js';
import ClientProt from '#/network/rs225/client/prot/ClientProt.js';
import IdleTimer from '#/network/client/model/IdleTimer.js';

export default class IdleTimerDecoder extends MessageDecoder<IdleTimer> {
    prot = ClientProt.IDLE_TIMER;

    decode() {
        return new IdleTimer();
    }
}
