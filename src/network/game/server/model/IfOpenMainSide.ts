import { ServerProtPriority } from '#/network/game/server/codec/ServerProtPriority.js';
import OutgoingMessage from '#/network/game/server/OutgoingMessage.js';

export default class IfOpenMainSide extends OutgoingMessage {
    priority = ServerProtPriority.BUFFERED;

    constructor(
        readonly main: number,
        readonly side: number
    ) {
        super();
    }
}
