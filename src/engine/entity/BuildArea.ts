import {CoordGrid} from '#/engine/CoordGrid.js';
import Player from '#/engine/entity/Player.js';
import World from '#/engine/World.js';
import Npc from '#/engine/entity/Npc.js';

export default class BuildArea {
    public static readonly INTERVAL: number = 10;
    public static readonly PREFERRED_PLAYERS: number = 250;
    public static readonly PREFERRED_NPCS: number = 255;
    public static readonly PREFERRED_VIEW_DISTANCE: number = 15;

    // constructor
    readonly npcs: Set<Npc>; // observed npcs
    readonly players: Set<Player>; // observed players
    readonly loadedZones: Set<number>;
    readonly activeZones: Set<number>;
    readonly appearances: Map<number, number>; // cached appearance ticks

    // runtime
    forceViewDistance: boolean = false;
    viewDistance: number = BuildArea.PREFERRED_VIEW_DISTANCE;
    lastResize: number = 0;

    constructor() {
        this.npcs = new Set();
        this.players = new Set();
        this.loadedZones = new Set();
        this.activeZones = new Set();
        this.appearances = new Map();
    }

    clear(): void {
        this.players.clear();
        this.npcs.clear();
        this.loadedZones.clear();
        this.activeZones.clear();
        this.appearances.clear();
    }

    resize(): void {
        if (this.forceViewDistance) {
            return;
        }
        if (this.players.size >= BuildArea.PREFERRED_PLAYERS) {
            if (this.viewDistance > 1) {
                this.viewDistance--;
            }
            this.lastResize = 0;
            return;
        }
        if (++this.lastResize >= BuildArea.INTERVAL) {
            if (this.viewDistance < BuildArea.PREFERRED_VIEW_DISTANCE) {
                this.viewDistance++;
            } else {
                this.lastResize = 0;
            }
        }
    }

    hasAppearance(pid: number, tick: number): boolean {
        const appearance: number | undefined = this.appearances.get(pid);
        if (typeof appearance === 'undefined') {
            return false;
        }
        return appearance === tick;
    }

    saveAppearance(pid: number, tick: number): void {
        this.appearances.set(pid, tick);
    }

    *getNearbyPlayers(pid: number, level: number, x: number, z: number): IterableIterator<Player> {
        const radius = this.viewDistance * 2;
        const min = -radius >> 1;
        const max = radius >> 1;
        const length = radius ** 2;

        let dx = 0;
        let dz = 0;
        let ldx = 0;
        let ldz = -1;

        for (let index = 1; index <= length; index++) {
            if (min < dx && dx <= max && min < dz && dz <= max) {
                const players = World.playerGrid.get(CoordGrid.packCoord(level, x + dx, z + dz));
                if (typeof players !== 'undefined') {
                    for (const player of players) {
                        if (this.players.size >= BuildArea.PREFERRED_PLAYERS) {
                            return;
                        }
                        if (
                            player.pid !== -1 &&
                            player.pid !== pid &&
                            CoordGrid.isWithinDistanceSW({ x: x + dx, z: z + dz }, player, this.viewDistance) &&
                            !this.players.has(player) &&
                            player.level === level
                        ) {
                            yield player;
                        }
                    }
                }
            }

            if (dx === dz || (dx < 0 && dx === -dz) || (dx > 0 && dx === 1 - dz)) {
                const tmp = ldx;
                ldx = -ldz;
                ldz = tmp;
            }

            dx += ldx;
            dz += ldz;
        }
    }

    *getNearbyNpcs(level: number, x: number, z: number): IterableIterator<Npc> {
        const startX: number = CoordGrid.zone(x - BuildArea.PREFERRED_VIEW_DISTANCE);
        const startZ: number = CoordGrid.zone(z - BuildArea.PREFERRED_VIEW_DISTANCE);
        const endX: number = CoordGrid.zone(x + BuildArea.PREFERRED_VIEW_DISTANCE);
        const endZ: number = CoordGrid.zone(z + BuildArea.PREFERRED_VIEW_DISTANCE);

        for (let zx = startX; zx <= endX; zx++) {
            const zoneX: number = zx << 3;
            for (let zz = startZ; zz <= endZ; zz++) {
                const zoneZ: number = zz << 3;
                for (const npc of World.gameMap.getZone(zoneX, zoneZ, level).getAllNpcsSafe()) {
                    if (this.npcs.size >= BuildArea.PREFERRED_NPCS) {
                        return;
                    }
                    if (!CoordGrid.isWithinDistanceSW({ x, z }, npc, BuildArea.PREFERRED_VIEW_DISTANCE) || npc.nid === -1 || this.npcs.has(npc) || npc.level !== level) {
                        continue;
                    }
                    yield npc;
                }
            }
        }
    }
}
