import OutgoingMessage from '#/network/server/OutgoingMessage.js';
import ServerProtPriority from '#/network/server/prot/ServerProtPriority.js';
import {CoordGrid} from '#/engine/CoordGrid.js';

export default class RebuildNormal extends OutgoingMessage {
    priority = ServerProtPriority.IMMEDIATE;

    constructor(
        readonly zoneX: number,
        readonly zoneZ: number
    ) {
        super();
    }

    get mapsquares(): Set<number> {
        const minX: number = this.zoneX - 6;
        const maxX: number = this.zoneX + 6;
        const minZ: number = this.zoneZ - 6;
        const maxZ: number = this.zoneZ + 6;
        const result: Set<number> = new Set();
        // build area is 13x13 zones (8*13 = 104 tiles), so we need to load 6 zones in each direction
        for (let x: number = minX; x <= maxX; x++) {
            const mx: number = CoordGrid.mapsquare(x << 3);
            for (let z: number = minZ; z <= maxZ; z++) {
                const mz: number = CoordGrid.mapsquare(z << 3);
                result.add(mx << 8 | mz);
            }
        }
        return result;
    }
}