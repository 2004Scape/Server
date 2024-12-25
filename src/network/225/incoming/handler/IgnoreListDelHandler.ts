import MessageHandler from '#/network/incoming/handler/MessageHandler.js';
import Player from '#/engine/entity/Player.js';
import IgnoreListDel from '#/network/incoming/model/IgnoreListDel.js';
import World from '#/engine/World.js';

export default class IgnoreListDelHandler extends MessageHandler<IgnoreListDel> {
    handle(message: IgnoreListDel, player: Player): boolean {
        World.removeIgnore(player, message.username);
        return true;
    }
}
