import MessageHandler from '#/network/client/handler/MessageHandler.js';
import Player from '#/engine/entity/Player.js';
import IdleTimer from '#/network/client/model/IdleTimer.js';

export default class IdleTimerHandler extends MessageHandler<IdleTimer> {
    handle(_message: IdleTimer, player: Player): boolean {
        player.logoutRequested = true;
        return true;
    }
}
