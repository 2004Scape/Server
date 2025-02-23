import { CoordGrid } from '#/engine/CoordGrid.js';
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

    clear(reconnecting: boolean): void {
        if (!reconnecting) {
            this.activeZones.clear();
            this.loadedZones.clear();
        }
        this.players.clear();
        this.npcs.clear();
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

    rebuildNpcs(): void {
        // optimization to avoid sending 3 bits * observed npcs when everything has to be removed anyways
        this.npcs.clear();
    }

    rebuildPlayers(pid: number, level: number, x: number, z: number): void {
        // optimization to avoid sending 3 bits * observed players when everything has to be removed anyways
        this.players.clear();
        this.lastResize = 0;
        this.viewDistance = BuildArea.PREFERRED_VIEW_DISTANCE;
        // pre calc if we can go ahead and shorten view distance
        let count: number = 0;
        for (const _ of this.getNearbyPlayersByClosest(pid, level, x, z)) {
            count++;
            if (count >= BuildArea.PREFERRED_PLAYERS) {
                this.viewDistance--;
                break;
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
        if (this.viewDistance < BuildArea.PREFERRED_VIEW_DISTANCE) {
            yield* this.getNearbyPlayersByClosest(pid, level, x, z);
        } else {
            yield* this.getNearbyPlayersByZones(pid, level, x, z);
        }
    }

    private *getNearbyPlayersByClosest(pid: number, level: number, x: number, z: number): IterableIterator<Player> {
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
                        if (this.filterPlayer(player, pid, level, x, z)) {
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

    private *getNearbyPlayersByZones(pid: number, level: number, x: number, z: number): IterableIterator<Player> {
        const distance: number = BuildArea.PREFERRED_VIEW_DISTANCE;
        const startX: number = CoordGrid.zone(x - distance);
        const startZ: number = CoordGrid.zone(z - distance);
        const endX: number = CoordGrid.zone(x + distance);
        const endZ: number = CoordGrid.zone(z + distance);

        for (let zx = startX; zx <= endX; zx++) {
            const zoneX: number = zx << 3;
            for (let zz = startZ; zz <= endZ; zz++) {
                const zoneZ: number = zz << 3;
                for (const player of World.gameMap.getZone(zoneX, zoneZ, level).getAllPlayersUnsafe()) {
                    if (this.players.size >= BuildArea.PREFERRED_PLAYERS) {
                        return;
                    }
                    if (!this.filterPlayer(player, pid, level, x, z)) {
                        continue;
                    }
                    yield player;
                }
            }
        }
    }

    *getNearbyNpcs(level: number, x: number, z: number): IterableIterator<Npc> {
        const distance: number = BuildArea.PREFERRED_VIEW_DISTANCE;
        const startX: number = CoordGrid.zone(x - distance);
        const startZ: number = CoordGrid.zone(z - distance);
        const endX: number = CoordGrid.zone(x + distance);
        const endZ: number = CoordGrid.zone(z + distance);

        for (let zx = startX; zx <= endX; zx++) {
            const zoneX: number = zx << 3;
            for (let zz = startZ; zz <= endZ; zz++) {
                const zoneZ: number = zz << 3;
                for (const npc of World.gameMap.getZone(zoneX, zoneZ, level).getAllNpcsUnsafe()) {
                    if (this.npcs.size >= BuildArea.PREFERRED_NPCS) {
                        return;
                    }
                    if (!this.filterNpc(npc, level, x, z)) {
                        continue;
                    }
                    yield npc;
                }
            }
        }
    }

    private filterPlayer(player: Player, pid: number, level: number, x: number, z: number): boolean {
        return !(!CoordGrid.isWithinDistanceSW({ x, z }, player, this.viewDistance) || player.pid === -1 || player.pid === pid || this.players.has(player) || player.level !== level);
    }

    private filterNpc(npc: Npc, level: number, x: number, z: number): boolean {
        return !(!CoordGrid.isWithinDistanceSW({ x, z }, npc, BuildArea.PREFERRED_VIEW_DISTANCE) || npc.nid === -1 || this.npcs.has(npc) || npc.level !== level);
    }
}
