import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt244 from '#/network/game/client/codec/rs244/ClientProt244.js';
import IdleTimer from '#/network/game/client/model/IdleTimer.js';


export default class IdleTimerDecoder extends MessageDecoder<IdleTimer> {
    prot = ClientProt244.IDLE_TIMER;

    decode() {
        return new IdleTimer();
    }
}
