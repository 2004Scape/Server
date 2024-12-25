import MessageDecoder from '#/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#/network/225/incoming/prot/ClientProt.js';
import IdleTimer from '#/network/incoming/model/IdleTimer.js';

export default class IdleTimerDecoder extends MessageDecoder<IdleTimer> {
    prot = ClientProt.IDLE_TIMER;

    decode() {
        return new IdleTimer();
    }
}
