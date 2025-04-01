import { ClientProtCategory, FriendListAdd } from '@2004scape/rsbuf';

import Player from '#/engine/entity/Player.js';
import World from '#/engine/World.js';
import MessageHandler from '#/server/client/MessageHandler.js';
import { fromBase37 } from '#/util/JString.js';

export default class FriendListAddHandler extends MessageHandler<FriendListAdd> {
    category: ClientProtCategory = ClientProtCategory.USER_EVENT;
    
    handle(message: FriendListAdd, player: Player): boolean {
        const username: bigint = message.username;
        
        if (player.socialProtect || fromBase37(username) === 'invalid_name') {
            return false;
        }

        World.addFriend(player, username);

        player.socialProtect = true;
        return true;
    }
}
