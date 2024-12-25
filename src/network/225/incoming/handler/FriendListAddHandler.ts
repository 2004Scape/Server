import MessageHandler from '#/network/incoming/handler/MessageHandler.js';
import Player from '#/entity/Player.js';
import FriendListAdd from '#/network/incoming/model/FriendListAdd.js';
import World from '#/engine/World.js';

export default class FriendListAddHandler extends MessageHandler<FriendListAdd> {
    handle(message: FriendListAdd, player: Player): boolean {
        World.addFriend(player, message.username);
        return true;
    }
}
