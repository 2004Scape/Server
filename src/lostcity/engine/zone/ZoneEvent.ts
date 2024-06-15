import ServerProt from '#lostcity/server/ServerProt.js';
import ZoneEventType from '#lostcity/engine/zone/ZoneEventType.js';

export default class ZoneEvent {
    readonly prot: ServerProt;
    readonly type: ZoneEventType;
    readonly receiverId: number;
    readonly buffer: Uint8Array;

    constructor(prot: ServerProt, type: ZoneEventType, receiverId: number, buffer: Uint8Array) {
        this.prot = prot;
        this.type = type;
        this.receiverId = receiverId;
        this.buffer = buffer;
    }
}
