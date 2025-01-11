import MessageHandler from '#/network/client/handler/MessageHandler.js';
import Player from '#/engine/entity/Player.js';
import IgnoreListAdd from '#/network/client/model/IgnoreListAdd.js';
import World from '#/engine/World.js';

export default class IgnoreListAddHandler extends MessageHandler<IgnoreListAdd> {
    handle(message: IgnoreListAdd, player: Player): boolean {
        World.addIgnore(player, message.username);
        return true;
    }
}
