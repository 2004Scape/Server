import { ServerProtPriority } from '#/network/game/server/codec/ServerProtPriority.js';
import OutgoingMessage from '#/network/game/server/OutgoingMessage.js';

export default class UpdateRebootTimer extends OutgoingMessage {
    priority = ServerProtPriority.BUFFERED; // todo: what should priority be?

    constructor(readonly ticks: number) {
        super();
    }
}
