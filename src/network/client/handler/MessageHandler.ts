import Player from '#/engine/entity/Player.js';
import IncomingMessage from '#/network/client/IncomingMessage.js';

export default abstract class MessageHandler<T extends IncomingMessage> {
    abstract handle(message: T, player: Player): boolean;
}
