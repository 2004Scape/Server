import MessageHandler from '#/network/client/handler/MessageHandler.js';
import Player from '#/engine/entity/Player.js';
import IgnoreListDel from '#/network/client/model/IgnoreListDel.js';
import World from '#/engine/World.js';

export default class IgnoreListDelHandler extends MessageHandler<IgnoreListDel> {
    handle(message: IgnoreListDel, player: Player): boolean {
        World.removeIgnore(player, message.username);
        return true;
    }
}
