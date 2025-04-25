import { ServerProtPriority } from '#/network/game/server/codec/ServerProtPriority.js';
import OutgoingMessage from '#/network/game/server/OutgoingMessage.js';

export default class IfSetModel extends OutgoingMessage {
    priority = ServerProtPriority.BUFFERED;

    constructor(
        readonly component: number,
        readonly model: number
    ) {
        super();
    }
}
