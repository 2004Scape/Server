import OutgoingMessage from '#/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#/network/outgoing/prot/ServerProtPriority.js';

export default class UpdateIgnoreList extends OutgoingMessage {
    priority = ServerProtPriority.BUFFERED;

    constructor(readonly names: bigint[]) {
        super();
    }
}