import OutgoingMessage from '#/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#/network/outgoing/prot/ServerProtPriority.js';

export default class UpdateStat extends OutgoingMessage {
    priority = ServerProtPriority.BUFFERED;

    constructor(
        readonly stat: number,
        readonly exp: number,
        readonly level: number
    ) {
        super();
    }
}