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
    readonly highPlayers: Set<Player>; // cleared after player_info
    readonly lowPlayers: Set<Player>; // cleared after player_info
    readonly highNpcs: Set<Npc>; // cleared after npc_info
    readonly lowNpcs: Set<Npc>; // cleared after npc_info
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
        this.highPlayers = new Set();
        this.lowPlayers = new Set();
        this.highNpcs = new Set();
        this.lowNpcs = new Set();
        this.appearances = new Map();
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

    clearPlayerInfo(): void {
        this.highPlayers.clear();
        this.lowPlayers.clear();
    }

    clearNpcInfo(): void {
        this.highNpcs.clear();
        this.lowNpcs.clear();
    }

    *getNearbyPlayers(pid: number, level: number, x: number, z: number, originX: number, originZ: number): IterableIterator<Player> {
        const absLeftX: number = originX - 48;
        const absRightX: number = originX + 48;
        const absTopZ: number = originZ + 48;
        const absBottomZ: number = originZ - 48;

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
                            player.level === level &&
                            !(player.x <= absLeftX || player.x >= absRightX || player.z >= absTopZ || player.z <= absBottomZ)
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

    *getNearbyNpcs(level: number, x: number, z: number, originX: number, originZ: number): IterableIterator<Npc> {
        const absLeftX: number = originX - 48;
        const absRightX: number = originX + 48;
        const absTopZ: number = originZ + 48;
        const absBottomZ: number = originZ - 48;

        const centerX = CoordGrid.zone(x);
        const centerZ = CoordGrid.zone(z);

        const minx = centerX - 2;
        const minz = centerZ - 2;
        const maxx = centerX + 2;
        const maxz = centerZ + 2;

        for (let cx = minx; cx <= maxx; cx++) {
            for (let cz = minz; cz <= maxz; cz++) {
                for (const npc of World.gameMap.getZone(cx << 3, cz << 3, level).getAllNpcsSafe()) {
                    if (this.npcs.size >= BuildArea.PREFERRED_NPCS) {
                        return;
                    }
                    if (!CoordGrid.isWithinDistanceSW({ x, z }, npc, BuildArea.PREFERRED_VIEW_DISTANCE) || npc.nid === -1 || this.npcs.has(npc) || npc.level !== level || npc.x <= absLeftX || npc.x >= absRightX || npc.z >= absTopZ || npc.z <= absBottomZ) {
                        continue;
                    }
                    yield npc;
                }
            }
        }
    }
}
