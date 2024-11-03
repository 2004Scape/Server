import {CoordGrid} from '#lostcity/engine/CoordGrid.js';
import Player from '#lostcity/entity/Player.js';
import World from '#lostcity/engine/World.js';
import Npc from '#lostcity/entity/Npc.js';

export type ExtendedInfo = {
    id: number,
    added: boolean
}

export default class BuildArea {
    public static readonly INTERVAL: number = 10;
    public static readonly PREFERRED_PLAYERS: number = 250;
    public static readonly PREFERRED_NPCS: number = 255;
    public static readonly PREFERRED_VIEW_DISTANCE: number = 15;

    // constructor
    readonly npcs: Set<number>; // observed npcs
    readonly players: Set<number>; // observed players
    readonly loadedZones: Set<number>;
    readonly activeZones: Set<number>;
    readonly extendedInfo: Set<ExtendedInfo>;
    readonly appearances: Map<number, number>;

    // runtime
    forceViewDistance: boolean = false;
    viewDistance: number = BuildArea.PREFERRED_VIEW_DISTANCE;

    lastResize: number = 0;

    constructor() {
        this.npcs = new Set();
        this.players = new Set();
        this.loadedZones = new Set();
        this.activeZones = new Set();
        this.extendedInfo = new Set();
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

    clearExtended(): void {
        this.extendedInfo.clear();
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

    *getNearbyPlayers(uid: number, level: number, x: number, z: number, originX: number, originZ: number): IterableIterator<Player> {
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
                            player.uid !== uid &&
                            CoordGrid.isWithinDistanceSW({ x: x + dx, z: z + dz }, player, this.viewDistance) &&
                            !this.players.has(player.uid) &&
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

        npcs: for (const zoneIndex of this.activeZones) {
            for (const npc of World.gameMap.getZoneIndex(zoneIndex).getAllNpcsSafe()) {
                if (this.npcs.size >= BuildArea.PREFERRED_NPCS) {
                    break npcs;
                }
                if (!CoordGrid.isWithinDistanceSW({ x, z }, npc, 15) || this.npcs.has(npc.nid) || npc.level !== level || npc.x <= absLeftX || npc.x >= absRightX || npc.z >= absTopZ || npc.z <= absBottomZ) {
                    continue;
                }
                yield npc;
            }
        }
    }
}
