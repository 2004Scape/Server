import OutgoingMessage from '#lostcity/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#lostcity/network/outgoing/prot/ServerProtPriority.js';

export default class UpdateUid192 extends OutgoingMessage {
    priority = ServerProtPriority.IMMEDIATE; // todo: what should priority be?

    constructor(readonly uid: number) {
        super();
    }
}