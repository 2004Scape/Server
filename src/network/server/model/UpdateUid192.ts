import OutgoingMessage from '#/network/server/OutgoingMessage.js';
import ServerProtPriority from '#/network/server/prot/ServerProtPriority.js';

export default class UpdateUid192 extends OutgoingMessage {
    priority = ServerProtPriority.IMMEDIATE; // todo: what should priority be?

    constructor(readonly uid: number) {
        super();
    }
}