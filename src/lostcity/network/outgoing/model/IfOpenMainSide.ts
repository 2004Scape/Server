import OutgoingMessage from '#lostcity/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#lostcity/network/outgoing/prot/ServerProtPriority.js';

export default class IfOpenMainSide extends OutgoingMessage {
    priority = ServerProtPriority.BUFFERED;

    constructor(
        readonly main: number,
        readonly side: number
    ) {
        super();
    }
}