import OutgoingMessage from '#lostcity/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#lostcity/network/outgoing/prot/ServerProtPriority.js';

export default class RebuildNormal extends OutgoingMessage {
    priority = ServerProtPriority.HIGH;

    constructor(
        readonly zoneX: number,
        readonly zoneZ: number
    ) {
        super();
    }
}