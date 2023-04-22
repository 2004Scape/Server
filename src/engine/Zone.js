import ZoneEvent from "#engine/ZoneEvent.js";
import { ServerProt } from "#enum/ServerProt.js";

export default class Zone {
    x = 0;
    z = 0;
    plane = 0;

    events = [];

    addEvent(event) {
        this.events.push(event);
    }

    getEvents() {
        // TODO: filtering
        return this.events;
    }

    getEventsAfter(cycle) {
        return this.events.filter(e => e.cycle > cycle);
    }

    getObj(x, z, id) {
        return this.events.find(e => e.type === ServerProt.OBJ_ADD && e.x === x && e.z === z && e.id === id);
    }

    // TODO: count, private stacks, ...
    removeObj(x, z, id) {
        this.events.splice(this.events.findIndex(e => e.type === ServerProt.OBJ_ADD && e.x === x && e.z === z && e.id === id), 1);
        this.addEvent(ZoneEvent.objDel(x, z, this.plane, id));
    }
}
