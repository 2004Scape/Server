import { ServerProtPriority } from '#/network/game/server/codec/ServerProtPriority.js';
import OutgoingMessage from '#/network/game/server/OutgoingMessage.js';

export default class PlayerInfo extends OutgoingMessage {
    priority = ServerProtPriority.IMMEDIATE;

    constructor(readonly bytes: Uint8Array) {
        super();
    }
}
