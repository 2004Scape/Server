import OutgoingMessage from '#/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#/network/outgoing/prot/ServerProtPriority.js';

export default class UpdateInvStopTransmit extends OutgoingMessage {
    priority = ServerProtPriority.IMMEDIATE;

    constructor(readonly component: number) {
        super();
    }
}