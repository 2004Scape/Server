import MessageHandler from '#/network/incoming/handler/MessageHandler.js';
import Player from '#/entity/Player.js';
import MessagePrivate from '#/network/incoming/model/MessagePrivate.js';
import World from '#/engine/World.js';

export default class MessagePrivateHandler extends MessageHandler<MessagePrivate> {
    handle(message: MessagePrivate, player: Player): boolean {
        World.sendPrivateMessage(player, message.username, message.input);
        return true;
    }
}
