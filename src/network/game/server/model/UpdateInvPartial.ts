import { Inventory } from '#/engine/Inventory.js';
import { ServerProtPriority } from '#/network/game/server/codec/ServerProtPriority.js';
import OutgoingMessage from '#/network/game/server/OutgoingMessage.js';

export default class UpdateInvPartial extends OutgoingMessage {
    priority = ServerProtPriority.IMMEDIATE;

    readonly slots: number[];

    constructor(
        readonly component: number,
        readonly inv: Inventory,
        ...slots: number[]
    ) {
        super();
        this.slots = slots;
    }
}
