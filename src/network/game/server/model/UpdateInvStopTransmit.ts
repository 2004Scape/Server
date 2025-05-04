import { ServerProtPriority } from '#/network/game/server/codec/ServerProtPriority.js';
import OutgoingMessage from '#/network/game/server/OutgoingMessage.js';

export default class UpdateInvStopTransmit extends OutgoingMessage {
    priority = ServerProtPriority.IMMEDIATE;

    constructor(readonly component: number) {
        super();
    }
}
