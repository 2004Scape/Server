import World from '#lostcity/engine/World.js';
import {Position} from '#lostcity/entity/Position.js';
import Loc from '#lostcity/entity/Loc.js';
import HuntVis from '#lostcity/entity/hunt/HuntVis.js';
import {hasLineOfSight, hasLineOfWalk} from '@2004scape/rsmod-pathfinder';
import Player from '#lostcity/entity/Player.js';
import Npc from '#lostcity/entity/Npc.js';

abstract class ScriptIterator<T> implements IterableIterator<T> {
    private readonly it: IterableIterator<T>;

    protected constructor() {
        this.it = this.generator();
    }

    protected abstract generator(): IterableIterator<T>;

    [Symbol.iterator](): IterableIterator<T> {
        return this.it;
    }

    next(): IteratorResult<T> {
        return this.it.next();
    }
}

export class HuntAllIterator extends ScriptIterator<Player> {
    // a radius of 1 will loop 9 zones
    // a radius of 2 will loop 25 zones
    // a radius of 3 will loop 49 zones
    private readonly x: number;
    private readonly z: number;
    private readonly level: number;
    private readonly minX: number;
    private readonly maxX: number;
    private readonly minZ: number;
    private readonly maxZ: number;
    private readonly distance: number;
    private readonly checkVis: HuntVis;

    constructor(level: number, x: number, z: number, distance: number, checkVis: HuntVis) {
        super();
        const centerX: number = Position.zone(x);
        const centerZ: number = Position.zone(z);
        const radius: number = (1 + (distance / 8)) | 0;
        this.x = x;
        this.z = z;
        this.level = level;
        this.maxX = centerX + radius;
        this.minX = centerX - radius;
        this.maxZ = centerZ + radius;
        this.minZ = centerZ - radius;
        this.distance = distance;
        this.checkVis = checkVis;
    }

    protected *generator(): IterableIterator<Player> {
        for (let x: number = this.maxX; x >= this.minX; x--) {
            const zoneX: number = x << 3;
            for (let z: number = this.maxZ; z >= this.minZ; z--) {
                const zoneZ: number = z << 3;
                const players: Set<number> = World.getZonePlayers(zoneX, zoneZ, this.level);

                for (const uid of players) {
                    const player: Player | null = World.getPlayerByUid(uid);
                    if (!player) {
                        continue;
                    }
                    if (Position.distanceToSW({x: this.x, z: this.z}, player) > this.distance) {
                        continue;
                    }
                    if (this.checkVis === HuntVis.LINEOFSIGHT && !hasLineOfSight(this.level, this.x, this.z, player.x, player.z, 1, 1, 1)) {
                        continue;
                    }
                    if (this.checkVis === HuntVis.LINEOFWALK && !hasLineOfWalk(this.level, this.x, this.z, player.x, player.z, 1, 1, 1)) {
                        continue;
                    }
                    yield player;
                }
            }
        }
    }
}

export class NpcFindAllIterator extends ScriptIterator<Npc> {
    private readonly level: number;
    private readonly x: number;
    private readonly z: number;

    constructor(level: number, x: number, z: number) {
        super();
        this.level = level;
        this.x = x;
        this.z = z;
    }

    protected *generator(): IterableIterator<Npc> {
        const npcs: Set<number> = World.getZoneNpcs(this.x, this.z, this.level);

        for (const nid of npcs) {
            const npc: Npc | null = World.getNpc(nid);
            if (!npc) {
                continue;
            }
            yield npc;
        }
    }
}

export class LocFindAllIterator extends ScriptIterator<Loc> {
    private readonly level: number;
    private readonly x: number;
    private readonly z: number;

    constructor(level: number, x: number, z: number) {
        super();
        this.level = level;
        this.x = x;
        this.z = z;
    }

    protected *generator(): IterableIterator<Loc> {
        const locs: Loc[] = World.getZoneLocs(this.x, this.z, this.level);
        for (const loc of locs) {
            yield loc;
        }
    }
}