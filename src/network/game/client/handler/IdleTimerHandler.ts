import Player from '#/engine/entity/Player.js';
import MessageHandler from '#/network/game/client/handler/MessageHandler.js';
import IdleTimer from '#/network/game/client/model/IdleTimer.js';
import Environment from '#/util/Environment.js';


export default class IdleTimerHandler extends MessageHandler<IdleTimer> {
    handle(_message: IdleTimer, player: Player): boolean {
        if (!Environment.NODE_DEBUG) {
            player.requestIdleLogout = true;
        }

        return true;
    }
}
