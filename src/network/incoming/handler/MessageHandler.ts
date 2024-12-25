import IncomingMessage from '#/network/incoming/IncomingMessage.js';
import Player from '#/entity/Player.js';

export default abstract class MessageHandler<T extends IncomingMessage> {
    abstract handle(message: T, player: Player): boolean;
}
