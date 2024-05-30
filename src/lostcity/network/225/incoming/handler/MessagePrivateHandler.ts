import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import Player from '#lostcity/entity/Player.js';
import MessagePrivate from '#lostcity/network/incoming/model/MessagePrivate.js';

export default class MessagePrivateHandler extends MessageHandler<MessagePrivate> {
    handle(message: MessagePrivate, player: Player): boolean {
        return true;
    }
}
