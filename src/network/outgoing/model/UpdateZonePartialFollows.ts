import OutgoingMessage from '#/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#/network/outgoing/prot/ServerProtPriority.js';

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