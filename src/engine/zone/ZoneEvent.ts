import ZoneEventType from '#/engine/zone/ZoneEventType.js';

export default class ZoneEvent {
    readonly type: ZoneEventType;
    readonly receiver64: bigint;
    readonly message: Uint8Array | undefined;

    constructor(type: ZoneEventType, receiver64: bigint, message: Uint8Array | undefined) {
        this.type = type;
        this.receiver64 = receiver64;
        this.message = message;
    }
}
