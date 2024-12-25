import OutgoingMessage from '#/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#/network/outgoing/prot/ServerProtPriority.js';
import Player from '#/engine/entity/Player.js';
import PlayerRenderer from '#/engine/renderer/PlayerRenderer.js';

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