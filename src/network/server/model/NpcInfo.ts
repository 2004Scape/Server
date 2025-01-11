import OutgoingMessage from '#/network/server/OutgoingMessage.js';
import ServerProtPriority from '#/network/server/prot/ServerProtPriority.js';
import Player from '#/engine/entity/Player.js';
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