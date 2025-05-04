import { ServerProtPriority } from '#/network/game/server/codec/ServerProtPriority.js';
import OutgoingMessage from '#/network/game/server/OutgoingMessage.js';

export default class UpdateZonePartialFollows extends OutgoingMessage {
    priority = ServerProtPriority.IMMEDIATE;

    constructor(
        readonly zoneX: number,
        readonly zoneZ: number,
        readonly originX: number,
        readonly originZ: number
    ) {
        super();
    }
}
