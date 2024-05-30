import IncomingMessage from '#lostcity/network/incoming/IncomingMessage.js';
import Player from '#lostcity/entity/Player.js';

export default abstract class MessageHandler<T extends IncomingMessage> {
    abstract handle(message: T, player: Player): boolean;
}
