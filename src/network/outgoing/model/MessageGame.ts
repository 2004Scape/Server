import OutgoingMessage from '#/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#/network/outgoing/prot/ServerProtPriority.js';

export default class MessageGame extends OutgoingMessage {
    priority = ServerProtPriority.IMMEDIATE;

    constructor(readonly msg: string) {
        super();
    }
}