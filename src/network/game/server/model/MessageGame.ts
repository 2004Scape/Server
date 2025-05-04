import { ServerProtPriority } from '#/network/game/server/codec/ServerProtPriority.js';
import OutgoingMessage from '#/network/game/server/OutgoingMessage.js';

export default class MessageGame extends OutgoingMessage {
    priority = ServerProtPriority.IMMEDIATE;

    constructor(readonly msg: string) {
        super();
    }
}
