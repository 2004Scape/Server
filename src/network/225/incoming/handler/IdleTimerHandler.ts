import MessageHandler from '#/network/incoming/handler/MessageHandler.js';
import Player from '#/engine/entity/Player.js';
import Environment from '#/util/Environment.js';
import IdleTimer from '#/network/incoming/model/IdleTimer.js';

export default class IdleTimerHandler extends MessageHandler<IdleTimer> {
    handle(_message: IdleTimer, player: Player): boolean {
        if (Environment.NODE_PRODUCTION) {
            player.logout();
            player.logoutRequested = true;
        }

        return true;
    }
}
