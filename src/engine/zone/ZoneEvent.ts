import ZoneEventType from '#/engine/zone/ZoneEventType.js';
import ZoneMessage from '#/network/server/ZoneMessage.js';

export default class ZoneEvent {
    readonly type: ZoneEventType;
    readonly receiver64: bigint;
    readonly message: ZoneMessage;

    constructor(type: ZoneEventType, receiver64: bigint, message: ZoneMessage) {
        this.type = type;
        this.receiver64 = receiver64;
        this.message = message;
    }
}
