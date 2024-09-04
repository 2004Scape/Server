import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import Player from '#lostcity/entity/Player.js';
import FriendListDel from '#lostcity/network/incoming/model/FriendListDel.js';
import World from '#lostcity/engine/World.js';

export default class FriendListDelHandler extends MessageHandler<FriendListDel> {
    handle(message: FriendListDel, player: Player): boolean {
        World.removeFriend(player, message.username);
        return true;
    }
}
