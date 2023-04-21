import World from '#engine/World.js';
import { ServerProt } from '#enum/ServerProt.js';
import Packet from '#util/Packet.js';
import { Position } from '#util/Position.js';

export default class ZoneEvent {
    type = -1;
    receiverId = -1;
    cycle = -1; // world cycle when this event was added

    x = 0;
    z = 0;
    plane = 0; // redundant

    buffer = null;

    static objAdd(x, z, plane, id, count, receiverId = -1) {
        let event = new ZoneEvent();
        event.type = ServerProt.OBJ_ADD;
        event.cycle = World.currentTick;
        event.receiverId = receiverId;
        event.x = x;
        event.z = z;
        event.plane = plane;

        event.id = id;
        event.count = count;
        return event;
    }

    static objReveal(x, z, plane, id, count, receiverId = -1) {
        let event = new ZoneEvent();
        event.type = ServerProt.OBJ_REVEAL;
        event.cycle = World.currentTick;
        event.receiverId = receiverId;
        event.x = x;
        event.z = z;
        event.plane = plane;

        event.id = id;
        event.count = count;
        return event;
    }

    static objCount(x, z, plane, id, oldCount, newCount, receiverId = -1) {
        let event = new ZoneEvent();
        event.type = ServerProt.OBJ_COUNT;
        event.cycle = World.currentTick;
        event.receiverId = receiverId;
        event.x = x;
        event.z = z;
        event.plane = plane;

        event.id = id;
        event.oldCount = oldCount;
        event.newCount = newCount;
        return event;
    }

    static objDel(x, z, plane, id, receiverId = -1) {
        let event = new ZoneEvent();
        event.type = ServerProt.OBJ_DEL;
        event.cycle = World.currentTick;
        event.receiverId = receiverId;
        event.x = x;
        event.z = z;
        event.plane = plane;

        event.id = id;
        event.receiverId = receiverId;
        return event;
    }

    static locAdd() {
    }

    static locAddChange() {
    }

    static locDel() {
    }

    static locAnim() {
    }

    static mapAnim() {
    }

    static mapProjAnim() {
    }

    encode() {
        // TODO: we absolutely want to cache updates but currently isaac writes into anything queued
        // if (this.buffer) {
        //     return this.buffer;
        // }

        let packet = new Packet();
        packet.p1(this.type);

        let localX = Position.zoneUpdate(this.x);
        let localZ = Position.zoneUpdate(this.z);
        let zoneDelta = ((localX & 0x7) << 4) | (localZ & 0x7);
        packet.p1(zoneDelta);

        if (this.type === ServerProt.OBJ_ADD) {
            packet.p2(this.id);
            packet.p2(this.count);
        } else if (this.type === ServerProt.OBJ_DEL) {
            packet.p2(this.id);
        } else if (this.type === ServerProt.OBJ_COUNT) {
            packet.p2(this.id);
            packet.p2(this.count);
        } else if (this.type === ServerProt.OBJ_REVEAL) {
            packet.p2(this.id);
            packet.p2(this.count);
            packet.p2(this.receiverId);
        }

        // this.buffer = packet;
        return packet;
    }
}
