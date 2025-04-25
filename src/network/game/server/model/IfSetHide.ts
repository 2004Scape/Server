import { ServerProtPriority } from '#/network/game/server/codec/ServerProtPriority.js';
import OutgoingMessage from '#/network/game/server/OutgoingMessage.js';

export default class IfSetHide extends OutgoingMessage {
    priority = ServerProtPriority.BUFFERED;

    constructor(
        readonly component: number,
        readonly hidden: boolean
    ) {
        super();
    }
}
