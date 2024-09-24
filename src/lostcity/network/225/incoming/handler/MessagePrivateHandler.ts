import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import Player from '#lostcity/entity/Player.js';
import MessagePrivate from '#lostcity/network/incoming/model/MessagePrivate.js';
import World from '#lostcity/engine/World.js';

export default class MessagePrivateHandler extends MessageHandler<MessagePrivate> {
    handle(message: MessagePrivate, player: Player): boolean {
        World.sendPrivateMessage(player, message.username, message.input);
        return true;
    }
}
