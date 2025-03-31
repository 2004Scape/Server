import * as rsbuf from '@2004scape/rsbuf';

import { PRELOADED_CRC } from '#/cache/PreloadedPacks.js';
import { CoordGrid } from '#/engine/CoordGrid.js';
import Player from '#/engine/entity/Player.js';
import World from '#/engine/World.js';
import ZoneMap from '#/engine/zone/ZoneMap.js';

export default class BuildArea {
    // constructor
    readonly player: Player;
    readonly loadedZones: Set<number>;
    readonly activeZones: Set<number>;
    readonly mapsquares: Set<number>;
    
    lastBuild: number = -1;

    constructor(player: Player) {
        this.player = player;
        this.loadedZones = new Set();
        this.activeZones = new Set();
        this.mapsquares = new Set();
    }

    clear(reconnecting: boolean): void {
        if (!reconnecting) {
            this.activeZones.clear();
            this.loadedZones.clear();
            this.mapsquares.clear();
        }
    }

    rebuildZones(): void {
        // update any newly tracked zones
        this.activeZones.clear();

        const centerX = CoordGrid.zone(this.player.x);
        const centerZ = CoordGrid.zone(this.player.z);

        const originX: number = CoordGrid.zone(this.player.originX);
        const originZ: number = CoordGrid.zone(this.player.originZ);

        const leftX = originX - 6;
        const rightX = originX + 6;
        const topZ = originZ + 6;
        const bottomZ = originZ - 6;

        for (let x = centerX - 3; x <= centerX + 3; x++) {
            for (let z = centerZ - 3; z <= centerZ + 3; z++) {
                // check if the zone is within the build area
                if (x < leftX || x > rightX || z > topZ || z < bottomZ) {
                    continue;
                }
                this.activeZones.add(ZoneMap.zoneIndex(x << 3, z << 3, this.player.level));
            }
        }
    }

    rebuildNormal(reconnect: boolean = false): void {
        const originX: number = CoordGrid.zone(this.player.originX);
        const originZ: number = CoordGrid.zone(this.player.originZ);

        const reloadLeftX = (originX - 4) << 3;
        const reloadRightX = (originX + 5) << 3;
        const reloadTopZ = (originZ + 5) << 3;
        const reloadBottomZ = (originZ - 4) << 3;

        // if the build area should be regenerated, do so now
        if (this.player.x < reloadLeftX || this.player.z < reloadBottomZ || this.player.x > reloadRightX - 1 || this.player.z > reloadTopZ - 1 || reconnect) {
            const zoneX: number = CoordGrid.zone(this.player.x);
            const zoneZ: number = CoordGrid.zone(this.player.z);

            const mapsquares = [];
            this.mapsquares.clear();
            const minX: number = zoneX - 6;
            const maxX: number = zoneX + 6;
            const minZ: number = zoneZ - 6;
            const maxZ: number = zoneZ + 6;

            // build area is 13x13 zones (8*13 = 104 tiles), so we need to load 6 zones in each direction
            for (let x: number = minX; x <= maxX; x++) {
                const mx: number = CoordGrid.mapsquare(x << 3);
                for (let z: number = minZ; z <= maxZ; z++) {
                    const mz: number = CoordGrid.mapsquare(z << 3);
                    const mapsquare: number = (mx << 8) | mz;
                    if (!this.mapsquares.has(mapsquare)) {
                        mapsquares.push(mapsquare);
                    }
                    this.mapsquares.add(mapsquare);
                }
            }

            const maps: Int32Array = Int32Array.from(mapsquares.map(packed => {
                const x: number = (packed >> 8) & 0xff;
                const z: number = packed & 0xff;
                return PRELOADED_CRC.get(`m${x}_${z}`) ?? 0;
            }));

            const locs: Int32Array = Int32Array.from(mapsquares.map(packed => {
                const x: number = (packed >> 8) & 0xff;
                const z: number = packed & 0xff;
                return PRELOADED_CRC.get(`l${x}_${z}`) ?? 0;
            }));

            this.player.write(rsbuf.rebuildNormal(this.player.pid, CoordGrid.zone(this.player.x), CoordGrid.zone(this.player.z), Uint16Array.from(mapsquares), maps, locs));

            this.player.originX = this.player.x;
            this.player.originZ = this.player.z;
            this.loadedZones.clear();
            this.lastBuild = World.currentTick; // DO NOT DELETE THIS NO MATTER WHAT ??
        }
    }
}
