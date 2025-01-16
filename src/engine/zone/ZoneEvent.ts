import ZoneEventType from '#/engine/zone/ZoneEventType.js';
import ZoneMessage from '#/network/server/ZoneMessage.js';

export default class ZoneEvent {
    readonly type: ZoneEventType;
    readonly receiverHash64: bigint;
    readonly message: ZoneMessage;

    constructor(type: ZoneEventType, receiverHash64: bigint, message: ZoneMessage) {
        this.type = type;
        this.receiverHash64 = receiverHash64;
        this.message = message;
    }
}
