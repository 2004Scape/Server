import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import IdleTimer from '#lostcity/network/225/incoming/IdleTimer.js';

export default class IdleTimerDecoder extends MessageDecoder<IdleTimer> {
    prot = ClientProt.IDLE_TIMER;

    decode() {
        return new IdleTimer();
    }
}
