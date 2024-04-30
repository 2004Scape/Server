import World from '#lostcity/engine/World.js';
import {Position} from '#lostcity/entity/Position.js';
import Loc from '#lostcity/entity/Loc.js';

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

export class HuntAllIterator extends ScriptIterator<number> {
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

    constructor(distance: number, coord: number) {
        super();
        const {level, x, z} = Position.unpackCoord(coord);
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

    }

    protected *generator(): IterableIterator<number> {
        for (let x: number = this.maxX; x >= this.minX; x--) {
            const zoneX: number = x << 3;
            for (let z: number = this.maxZ; z >= this.minZ; z--) {
                const zoneZ: number = z << 3;
                yield* World.getZonePlayers(this.x + (zoneX - this.x), this.z + (zoneZ - this.z), this.level).values();
            }
        }
    }
}

export class NpcFindAllIterator extends ScriptIterator<number> {
    private readonly coord: number;

    constructor(coord: number) {
        super();
        this.coord = coord;
    }

    protected *generator(): IterableIterator<number> {
        const {level, x, z} = Position.unpackCoord(this.coord);
        yield* World.getZoneNpcs(x, z, level).values();
    }
}

export class LocFindAllIterator extends ScriptIterator<Loc> {
    private readonly coord: number;

    constructor(coord: number) {
        super();
        this.coord = coord;
    }

    protected *generator(): IterableIterator<Loc> {
        const {level, x, z} = Position.unpackCoord(this.coord);
        yield* World.getZoneLocs(x, z, level).values();
    }
}