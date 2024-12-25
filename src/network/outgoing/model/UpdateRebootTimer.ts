import OutgoingMessage from '#/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#/network/outgoing/prot/ServerProtPriority.js';

export default class UpdateRebootTimer extends OutgoingMessage {
    priority = ServerProtPriority.BUFFERED; // todo: what should priority be?

    constructor(readonly ticks: number) {
        super();
    }
}