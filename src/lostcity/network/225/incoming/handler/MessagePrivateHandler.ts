import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import Player from '#lostcity/entity/Player.js';
import MessagePrivate from '#lostcity/network/incoming/model/MessagePrivate.js';
import World from '#lostcity/engine/World.js';

export default class MessagePrivateHandler extends MessageHandler<MessagePrivate> {
    handle(message: MessagePrivate, player: Player): boolean {
        const { username, input } = message;

        World.socialPrivateMessage(player.username37, username, input);
        return true;
    }
}
