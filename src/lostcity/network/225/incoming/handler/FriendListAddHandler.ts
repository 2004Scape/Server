import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import Player from '#lostcity/entity/Player.js';
import FriendListAdd from '#lostcity/network/incoming/model/FriendListAdd.js';
import World from '#lostcity/engine/World.js';

export default class FriendListAddHandler extends MessageHandler<FriendListAdd> {
    handle(message: FriendListAdd, player: Player): boolean {
        World.addFriend(player, message.username);
        return true;
    }
}
