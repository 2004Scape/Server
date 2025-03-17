export default class BuildArea {
    // constructor
    readonly loadedZones: Set<number>;
    readonly activeZones: Set<number>;

    constructor() {
        this.loadedZones = new Set();
        this.activeZones = new Set();
    }

    clear(reconnecting: boolean): void {
        if (!reconnecting) {
            this.activeZones.clear();
            this.loadedZones.clear();
        }
    }
}
