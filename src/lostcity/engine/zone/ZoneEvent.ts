import ServerProt from '#lostcity/server/ServerProt.js';

export default class ZoneEvent {
    readonly prot: ServerProt;
    readonly x: number;
    readonly z: number;
    readonly layer: number;
    readonly receiverId: number;
    readonly type: number;
    readonly buffer: Uint8Array;

    constructor(prot: ServerProt, x: number, z: number, layer: number, receiverId: number, type: number, buffer: Uint8Array) {
        this.prot = prot;
        this.x = x;
        this.z = z;
        this.layer = layer;
        this.receiverId = receiverId;
        this.type = type;
        this.buffer = buffer;
    }
}
