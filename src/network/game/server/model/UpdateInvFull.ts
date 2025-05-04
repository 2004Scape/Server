import { Inventory } from '#/engine/Inventory.js';
import { ServerProtPriority } from '#/network/game/server/codec/ServerProtPriority.js';
import OutgoingMessage from '#/network/game/server/OutgoingMessage.js';

export default class UpdateInvFull extends OutgoingMessage {
    priority = ServerProtPriority.IMMEDIATE;

    constructor(
        readonly component: number,
        readonly inv: Inventory
    ) {
        super();
    }
}
