import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt from '#/network/game/client/codec/rs225/ClientProt.js';
import IdleTimer from '#/network/game/client/model/IdleTimer.js';

export default class IdleTimerDecoder extends MessageDecoder<IdleTimer> {
    prot = ClientProt.IDLE_TIMER;

    decode() {
        return new IdleTimer();
    }
}
