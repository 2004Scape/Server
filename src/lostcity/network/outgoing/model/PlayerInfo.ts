import OutgoingMessage from '#lostcity/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#lostcity/network/outgoing/prot/ServerProtPriority.js';
import Player from '#lostcity/entity/Player.js';
import PlayerRenderer from '#lostcity/engine/renderer/PlayerRenderer.js';

// this is slightly unsafe.
export default class PlayerInfo extends OutgoingMessage {
    priority = ServerProtPriority.IMMEDIATE;

    constructor(
        readonly currentTick: number,
        readonly renderer: PlayerRenderer,
        readonly player: Player,
        readonly deltaX: number,
        readonly deltaZ: number,
        readonly changedLevel: boolean
    ) {
        super();
    }
}