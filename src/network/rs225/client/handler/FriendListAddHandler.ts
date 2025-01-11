import MessageHandler from '#/network/client/handler/MessageHandler.js';
import Player from '#/engine/entity/Player.js';
import FriendListAdd from '#/network/client/model/FriendListAdd.js';
import World from '#/engine/World.js';

export default class FriendListAddHandler extends MessageHandler<FriendListAdd> {
    handle(message: FriendListAdd, player: Player): boolean {
        World.addFriend(player, message.username);
        return true;
    }
}
