import { ServerProtPriority } from '#/network/game/server/codec/ServerProtPriority.js';
import OutgoingMessage from '#/network/game/server/OutgoingMessage.js';

export default class HintArrow extends OutgoingMessage {
    priority = ServerProtPriority.BUFFERED; // todo: what should priority be?

    constructor(
        readonly type: number,
        readonly nid: number,
        readonly pid: number,
        readonly x: number,
        readonly z: number,
        readonly y: number
    ) {
        super();
    }
}
