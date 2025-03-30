import { ClientProtCategory, IgnoreListAdd } from '@2004scape/rsbuf';

import Player from '#/engine/entity/Player.js';
import World from '#/engine/World.js';
import MessageHandler from '#/network/MessageHandler.js';
import { fromBase37 } from '#/util/JString.js';

export default class IgnoreListAddHandler extends MessageHandler<IgnoreListAdd> {
    category: ClientProtCategory = ClientProtCategory.USER_EVENT;
    
    handle(message: IgnoreListAdd, player: Player): boolean {
        const username: bigint = message.username;
        
        if (player.socialProtect || fromBase37(username) === 'invalid_name') {
            return false;
        }

        World.addIgnore(player, username);
        player.socialProtect = true;
        return true;
    }
}
