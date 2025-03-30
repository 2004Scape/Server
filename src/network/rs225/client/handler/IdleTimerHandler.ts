import { ClientProtCategory, IdleTimer } from '@2004scape/rsbuf';

import Player from '#/engine/entity/Player.js';
import MessageHandler from '#/network/MessageHandler.js';
import Environment from '#/util/Environment.js';

export default class IdleTimerHandler extends MessageHandler<IdleTimer> {
    category: ClientProtCategory = ClientProtCategory.CLIENT_EVENT;
    
    handle(_message: IdleTimer, player: Player): boolean {
        if (!Environment.NODE_DEBUG) {
            player.requestIdleLogout = true;
        }

        return true;
    }
}
