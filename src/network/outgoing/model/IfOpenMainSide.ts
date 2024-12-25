import OutgoingMessage from '#/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#/network/outgoing/prot/ServerProtPriority.js';

export default class IfOpenMainSide extends OutgoingMessage {
    priority = ServerProtPriority.BUFFERED;

    constructor(
        readonly main: number,
        readonly side: number
    ) {
        super();
    }
}