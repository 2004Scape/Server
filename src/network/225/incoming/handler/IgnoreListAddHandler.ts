import MessageHandler from '#/network/incoming/handler/MessageHandler.js';
import Player from '#/entity/Player.js';
import IgnoreListAdd from '#/network/incoming/model/IgnoreListAdd.js';
import World from '#/engine/World.js';

export default class IgnoreListAddHandler extends MessageHandler<IgnoreListAdd> {
    handle(message: IgnoreListAdd, player: Player): boolean {
        World.addIgnore(player, message.username);
        return true;
    }
}
