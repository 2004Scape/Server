import OutgoingMessage from '#lostcity/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#lostcity/network/outgoing/prot/ServerProtPriority.js';

export default class UpdateRunWeight extends OutgoingMessage {
    priority = ServerProtPriority.BUFFERED;

    constructor(readonly kg: number) {
        super();
    }
}