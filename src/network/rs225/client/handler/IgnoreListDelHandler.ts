import { ClientProtCategory, IgnoreListDel } from '@2004scape/rsbuf';

import Player from '#/engine/entity/Player.js';
import World from '#/engine/World.js';
import MessageHandler from '#/network/MessageHandler.js';
import { fromBase37 } from '#/util/JString.js';

export default class IgnoreListDelHandler extends MessageHandler<IgnoreListDel> {
    category: ClientProtCategory = ClientProtCategory.USER_EVENT;
    
    handle(message: IgnoreListDel, player: Player): boolean {
        const username: bigint = message.username;
        
        if (player.socialProtect || fromBase37(username) === 'invalid_name') {
            return false;
        }

        World.removeIgnore(player, username);
        player.socialProtect = true;
        return true;
    }
}
