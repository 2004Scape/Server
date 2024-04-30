import World from '#lostcity/engine/World.js';
import {Position} from '#lostcity/entity/Position.js';
import Loc from '#lostcity/entity/Loc.js';

abstract class ScriptIterator<T> implements IterableIterator<T> {
    private readonly it: IterableIterator<T>;

    protected constructor() {
        this.it = this.generator();
    }

    abstract generator(): IterableIterator<T>;

    [Symbol.iterator](): IterableIterator<T> {
        return this.it;
    }

    next(): IteratorResult<T> {
        return this.it.next();
    }
}

export class HuntAllIterator extends ScriptIterator<[number, number]> {
    // a radius of 1 will loop 9 zones
    // a radius of 2 will loop 25 zones
    // a radius of 3 will loop 49 zones
    private readonly centerX: number;
    private readonly centerZ: number;
    private readonly radius: number;
    private readonly x: number;
    private readonly z: number;
    private readonly level: number;

    constructor(distance: number, coord: number) {
        super();
        const {level, x, z} = Position.unpackCoord(coord);
        this.centerX = Position.zone(x);
        this.centerZ = Position.zone(z);
        this.radius = (1 + (distance / 8)) | 0;
        this.x = x;
        this.z = z;
        this.level = level;
    }

    *generator(): IterableIterator<[number, number]> {
        const maxX: number = this.centerX + this.radius;
        const minX: number = this.centerX - this.radius;
        for (let zx = maxX; zx >= minX; zx--) {
            const zoneX: number = zx << 3;
            const maxZ: number = this.centerZ + this.radius;
            const minZ: number = this.centerZ - this.radius;
            for (let zz = maxZ; zz >= minZ; zz--) {
                const zoneZ: number = zz << 3;
                yield* World.getZonePlayers(this.x + (zoneX - this.x), this.z + (zoneZ - this.z), this.level).entries();
            }
        }
    }
}

export class NpcFindAllIterator extends ScriptIterator<[number, number]> {
    private readonly coord: number;

    constructor(coord: number) {
        super();
        this.coord = coord;
    }

    *generator(): IterableIterator<[number, number]> {
        const {level, x, z} = Position.unpackCoord(this.coord);
        yield* World.getZoneNpcs(x, z, level).entries();
    }
}

export class LocFindAllIterator extends ScriptIterator<[number, Loc]> {
    private readonly coord: number;

    constructor(coord: number) {
        super();
        this.coord = coord;
    }

    *generator(): IterableIterator<[number, Loc]> {
        const {level, x, z} = Position.unpackCoord(this.coord);
        yield* World.getZoneLocs(x, z, level).entries();
    }
}