import Zone from '#lostcity/engine/zone/Zone.js';

export default class ZoneManager {
    static zoneIndex(x: number, z: number, level: number): number {
        return ((x >> 3) & 0x7ff) | (((z >> 3) & 0x7ff) << 11) | ((level & 0x3) << 22);
    }

    static unpackIndex(index: number): { x: number; z: number; level: number } {
        const x = (index & 0x7ff) << 3;
        const z = ((index >> 11) & 0x7ff) << 3;
        const level = index >> 22;
        return { x, z, level };
    }

    zones = new Map<number, Zone>();

    // ----

    getZone(absoluteX: number, absoluteZ: number, level: number): Zone {
        const zoneIndex = ZoneManager.zoneIndex(absoluteX, absoluteZ, level);
        let zone = this.zones.get(zoneIndex);
        if (typeof zone == 'undefined') {
            zone = new Zone(zoneIndex, level);
            this.zones.set(zoneIndex, zone);
        }
        return zone;
    }
}
