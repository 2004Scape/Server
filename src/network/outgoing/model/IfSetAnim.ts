import OutgoingMessage from '#/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#/network/outgoing/prot/ServerProtPriority.js';

export default class IfSetAnim extends OutgoingMessage {
    priority = ServerProtPriority.BUFFERED;

    constructor(
        readonly component: number,
        readonly seq: number
    ) {
        super();
    }
}