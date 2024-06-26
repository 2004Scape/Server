import OutgoingMessage from '#lostcity/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#lostcity/network/outgoing/prot/ServerProtPriority.js';
import Player from '#lostcity/entity/Player.js';

export default class NpcInfo extends OutgoingMessage {
    priority = ServerProtPriority.HIGH;

    constructor(
        readonly player: Player
    ) {
        super();
    }
}