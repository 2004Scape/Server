import MessageHandler from '#/network/client/handler/MessageHandler.js';
import Player from '#/engine/entity/Player.js';
import FriendListDel from '#/network/client/model/FriendListDel.js';
import World from '#/engine/World.js';

export default class FriendListDelHandler extends MessageHandler<FriendListDel> {
    handle(message: FriendListDel, player: Player): boolean {
        World.removeFriend(player, message.username);
        return true;
    }
}
