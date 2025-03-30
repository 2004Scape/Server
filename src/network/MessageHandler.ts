import { ClientProtCategory } from '@2004scape/rsbuf';

import Player from '#/engine/entity/Player.js';

export default abstract class MessageHandler<T> {
    abstract readonly category: ClientProtCategory;
    abstract handle(message: T, player: Player): boolean;
}
