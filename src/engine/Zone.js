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
}
