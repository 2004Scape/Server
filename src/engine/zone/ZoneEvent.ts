import { OutgoingPacket } from '@2004scape/rsbuf';

import ZoneEventType from '#/engine/zone/ZoneEventType.js';

export default class ZoneEvent {
    readonly type: ZoneEventType;
    readonly receiver64: bigint;
    readonly message: OutgoingPacket | undefined;

    constructor(type: ZoneEventType, receiver64: bigint, message: OutgoingPacket | undefined) {
        this.type = type;
        this.receiver64 = receiver64;
        this.message = message;
    }
}
