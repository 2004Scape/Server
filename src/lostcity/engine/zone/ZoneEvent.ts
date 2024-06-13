import ServerProt from '#lostcity/server/ServerProt.js';
import Packet from '#jagex2/io/Packet.js';
import Obj from '#lostcity/entity/Obj.js';
import Loc from '#lostcity/entity/Loc.js';

export type ZoneEvent = {
    prot: ServerProt;
    tick: number;
    x: number;
    z: number;
    layer?: number;
    receiverId?: number;
    subjectType?: number;
    buffer: Packet;
}

export type FutureZoneEvent = {
    entity: Obj | Loc;
    tick: number;
    event: ZoneEvent;
    zone: number;
}
