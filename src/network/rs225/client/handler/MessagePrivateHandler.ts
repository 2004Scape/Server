import MessageHandler from '#/network/client/handler/MessageHandler.js';
import Player from '#/engine/entity/Player.js';
import MessagePrivate from '#/network/client/model/MessagePrivate.js';
import World from '#/engine/World.js';

export default class MessagePrivateHandler extends MessageHandler<MessagePrivate> {
    handle(message: MessagePrivate, player: Player): boolean {
        if (player.muted_until !== null && player.muted_until > new Date()) {
            // todo: do we still log their attempt to chat?
            return false;
        }

        World.sendPrivateMessage(player, message.username, message.input);
        return true;
    }
}
