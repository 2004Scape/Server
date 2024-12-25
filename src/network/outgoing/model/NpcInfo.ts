import OutgoingMessage from '#/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#/network/outgoing/prot/ServerProtPriority.js';
import Player from '#/entity/Player.js';
import NpcRenderer from '#/engine/renderer/NpcRenderer.js';

// this is slightly unsafe.
export default class NpcInfo extends OutgoingMessage {
    priority = ServerProtPriority.IMMEDIATE;

    constructor(
        readonly currentTick: number,
        readonly renderer: NpcRenderer,
        readonly player: Player,
        readonly deltaX: number,
        readonly deltaZ: number,
        readonly changedLevel: boolean
    ) {
        super();
    }
}