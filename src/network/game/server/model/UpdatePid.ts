import { ServerProtPriority } from '#/network/game/server/codec/ServerProtPriority.js';
import OutgoingMessage from '#/network/game/server/OutgoingMessage.js';

export default class UpdatePid extends OutgoingMessage {
    priority = ServerProtPriority.IMMEDIATE; // todo: what should priority be?

    constructor(readonly uid: number) {
        super();
    }
}
