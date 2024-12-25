import OutgoingMessage from '#/network/outgoing/OutgoingMessage.js';
import ServerProtPriority from '#/network/outgoing/prot/ServerProtPriority.js';
import {Inventory} from '#/engine/Inventory.js';

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