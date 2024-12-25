import OutgoingMessage from '#/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#/network/outgoing/prot/ServerProtPriority.js';

export default class UpdateUid192 extends OutgoingMessage {
    priority = ServerProtPriority.IMMEDIATE; // todo: what should priority be?

    constructor(readonly uid: number) {
        super();
    }
}