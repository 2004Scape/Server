import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt225 from '#/network/game/client/codec/rs225/ClientProt225.js';
import IdleTimer from '#/network/game/client/model/IdleTimer.js';

export default class IdleTimerDecoder extends MessageDecoder<IdleTimer> {
    prot = ClientProt225.IDLE_TIMER;

    decode() {
        return new IdleTimer();
    }
}
