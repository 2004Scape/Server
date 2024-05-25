import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import Player from '#lostcity/entity/Player.js';
import World from '#lostcity/engine/World.js';
import FriendListAdd from '#lostcity/network/incoming/model/FriendListAdd.js';

export default class FriendListAddHandler extends MessageHandler<FriendListAdd> {
    handle(message: FriendListAdd, player: Player): boolean {
        const { username: other } = message;

        World.socialAddFriend(player.username37, other);
        return true;
    }
}
