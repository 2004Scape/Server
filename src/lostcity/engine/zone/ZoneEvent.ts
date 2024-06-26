import ServerProt from '#lostcity/network/225/outgoing/prot/ServerProt.js';
import ZoneEventType from '#lostcity/engine/zone/ZoneEventType.js';
import ZoneMessage from '#lostcity/network/outgoing/ZoneMessage.js';

export default class ZoneEvent {
    readonly prot: ServerProt;
    readonly type: ZoneEventType;
    readonly receiverId: number;
    readonly message: ZoneMessage;

    constructor(prot: ServerProt, type: ZoneEventType, receiverId: number, message: ZoneMessage) {
        this.prot = prot;
        this.type = type;
        this.receiverId = receiverId;
        this.message = message;
    }
}
