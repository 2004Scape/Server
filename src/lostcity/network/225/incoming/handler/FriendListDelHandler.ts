import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import Player from '#lostcity/entity/Player.js';
import World from '#lostcity/engine/World.js';
import FriendListDel from '#lostcity/network/incoming/model/FriendListDel.js';

export default class FriendListDelHandler extends MessageHandler<FriendListDel> {
    handle(message: FriendListDel, player: Player): boolean {
        const { username: other } = message;

        World.socialRemoveFriend(player.username37, other);
        return true;
    }
}
