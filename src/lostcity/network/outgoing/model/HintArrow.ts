import OutgoingMessage from '#lostcity/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#lostcity/network/outgoing/prot/ServerProtPriority.js';

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