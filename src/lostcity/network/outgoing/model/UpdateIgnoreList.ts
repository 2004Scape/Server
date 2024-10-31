import OutgoingMessage from '#lostcity/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#lostcity/network/outgoing/prot/ServerProtPriority.js';

export default class UpdateIgnoreList extends OutgoingMessage {
    priority = ServerProtPriority.BUFFERED;

    constructor(readonly names: bigint[]) {
        super();
    }
}