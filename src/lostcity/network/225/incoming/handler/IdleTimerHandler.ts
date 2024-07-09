import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import Player from '#lostcity/entity/Player.js';
import Environment from '#lostcity/util/Environment.js';
import IdleTimer from '#lostcity/network/incoming/model/IdleTimer.js';

export default class IdleTimerHandler extends MessageHandler<IdleTimer> {
    handle(_message: IdleTimer, player: Player): boolean {
        if (Environment.NODE_PRODUCTION) {
            player.logout();
            player.logoutRequested = true;
        }

        return true;
    }
}
