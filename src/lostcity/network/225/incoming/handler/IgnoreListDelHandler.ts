import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import Player from '#lostcity/entity/Player.js';
import World from '#lostcity/engine/World.js';
import IgnoreListDel from '#lostcity/network/incoming/model/IgnoreListDel.js';

export default class IgnoreListDelHandler extends MessageHandler<IgnoreListDel> {
    handle(message: IgnoreListDel, player: Player): boolean {
        const { username: other } = message;

        World.socialRemoveIgnore(player.username37, other);
        return true;
    }
}
