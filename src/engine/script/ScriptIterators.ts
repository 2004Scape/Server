import LocType from '#/cache/config/LocType.js';
import NpcType from '#/cache/config/NpcType.js';
import ObjType from '#/cache/config/ObjType.js';
import { CoordGrid } from '#/engine/CoordGrid.js';
import Entity from '#/engine/entity/Entity.js';
import HuntModeType from '#/engine/entity/hunt/HuntModeType.js';
import HuntVis from '#/engine/entity/hunt/HuntVis.js';
import Loc from '#/engine/entity/Loc.js';
import Npc from '#/engine/entity/Npc.js';
import NpcIteratorType from '#/engine/entity/NpcIteratorType.js';
import Obj from '#/engine/entity/Obj.js';
import { isLineOfSight, isLineOfWalk } from '#/engine/GameMap.js';
import World from '#/engine/World.js';

abstract class ScriptIterator<T extends Entity> implements IterableIterator<T> {
    private readonly iterator: IterableIterator<T>;
    protected readonly tick: number;

    protected constructor(tick: number) {
        this.iterator = this.generator();
        this.tick = tick;
    }

    protected abstract generator(): IterableIterator<T>;

    [Symbol.iterator](): IterableIterator<T> {
        return this.iterator;
    }

    next(): IteratorResult<T> {
        return this.iterator.next();
    }
}

export class HuntIterator extends ScriptIterator<Entity> {
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
    private readonly checkType: number;
    private readonly checkCategory: number;
    private readonly type: HuntModeType;

    constructor(tick: number, level: number, x: number, z: number, distance: number, checkVis: HuntVis, checkType: number, checkCategory: number, type: HuntModeType) {
        super(tick);
        const centerX: number = CoordGrid.zone(x);
        const centerZ: number = CoordGrid.zone(z);
        const radius: number = (1 + distance / 8) | 0;
        this.x = x;
        this.z = z;
        this.level = level;
        this.maxX = centerX + radius;
        this.minX = centerX - radius;
        this.maxZ = centerZ + radius;
        this.minZ = centerZ - radius;
        this.distance = distance;
        this.checkVis = checkVis;
        this.checkType = checkType;
        this.checkCategory = checkCategory;
        this.type = type;
    }

    protected *generator(): IterableIterator<Entity> {
        for (let x: number = this.maxX; x >= this.minX; x--) {
            const zoneX: number = x << 3;
            for (let z: number = this.maxZ; z >= this.minZ; z--) {
                const zoneZ: number = z << 3;

                if (this.type === HuntModeType.PLAYER) {
                    for (const player of World.gameMap.getZone(zoneX, zoneZ, this.level).getAllPlayersSafe(true)) {
                        if (World.currentTick > this.tick) {
                            throw new Error('[HuntIterator] tried to use an old iterator. Create a new iterator instead.');
                        }

                        if (CoordGrid.distanceToSW({ x: this.x, z: this.z }, player) > this.distance) {
                            continue;
                        }

                        if (this.checkVis === HuntVis.LINEOFSIGHT && !isLineOfSight(this.level, player.x, player.z, this.x, this.z)) {
                            continue;
                        }

                        if (this.checkVis === HuntVis.LINEOFWALK && !isLineOfWalk(this.level, player.x, player.z, this.x, this.z)) {
                            continue;
                        }

                        yield player;
                    }
                } else if (this.type === HuntModeType.NPC) {
                    for (const npc of World.gameMap.getZone(zoneX, zoneZ, this.level).getAllNpcsSafe(true)) {
                        if (World.currentTick > this.tick) {
                            throw new Error('[HuntIterator] tried to use an old iterator. Create a new iterator instead.');
                        }
                        if (this.checkType !== -1 && npc.type !== this.checkType) {
                            continue;
                        }
                        const npcType: NpcType = NpcType.get(npc.type);
                        if (this.checkCategory !== -1 && npcType.category !== this.checkCategory) {
                            continue;
                        }
                        if (CoordGrid.distanceToSW({ x: this.x, z: this.z }, npc) > this.distance) {
                            continue;
                        }
                        if (this.checkVis === HuntVis.LINEOFSIGHT && !isLineOfSight(this.level, this.x, this.z, npc.x, npc.z)) {
                            continue;
                        }
                        if (this.checkVis === HuntVis.LINEOFWALK && !isLineOfWalk(this.level, this.x, this.z, npc.x, npc.z)) {
                            continue;
                        }
                        yield npc;
                    }
                } else if (this.type === HuntModeType.OBJ) {
                    // scripting only cares about dynamic objs??
                    for (const obj of World.gameMap.getZone(zoneX, zoneZ, this.level).getAllObjsSafe(true)) {
                        if (World.currentTick > this.tick) {
                            throw new Error('[HuntIterator] tried to use an old iterator. Create a new iterator instead.');
                        }
                        if (this.checkType !== -1 && obj.type !== this.checkType) {
                            continue;
                        }
                        const objType: ObjType = ObjType.get(obj.type);
                        if (this.checkCategory !== -1 && objType.category !== this.checkCategory) {
                            continue;
                        }
                        if (CoordGrid.distanceToSW({ x: this.x, z: this.z }, obj) > this.distance) {
                            continue;
                        }
                        if (this.checkVis === HuntVis.LINEOFSIGHT && !isLineOfSight(this.level, this.x, this.z, obj.x, obj.z)) {
                            continue;
                        }
                        if (this.checkVis === HuntVis.LINEOFWALK && !isLineOfWalk(this.level, this.x, this.z, obj.x, obj.z)) {
                            continue;
                        }
                        yield obj;
                    }
                } else if (this.type === HuntModeType.SCENERY) {
                    for (const loc of World.gameMap.getZone(zoneX, zoneZ, this.level).getAllLocsSafe(true)) {
                        if (World.currentTick > this.tick) {
                            throw new Error('[HuntIterator] tried to use an old iterator. Create a new iterator instead.');
                        }
                        if (this.checkType !== -1 && loc.type !== this.checkType) {
                            continue;
                        }
                        const locType: LocType = LocType.get(loc.type);
                        if (this.checkCategory !== -1 && locType.category !== this.checkCategory) {
                            continue;
                        }
                        if (CoordGrid.distanceToSW({ x: this.x, z: this.z }, loc) > this.distance) {
                            continue;
                        }
                        if (this.checkVis === HuntVis.LINEOFSIGHT && !isLineOfSight(this.level, this.x, this.z, loc.x, loc.z)) {
                            continue;
                        }
                        if (this.checkVis === HuntVis.LINEOFWALK && !isLineOfWalk(this.level, this.x, this.z, loc.x, loc.z)) {
                            continue;
                        }
                        yield loc;
                    }
                }
            }
        }
    }
}

/**
 * This iterator powers the `npc_huntall` RuneScript command.
 */
export class NpcHuntAllCommandIterator extends ScriptIterator<Npc> {
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

    constructor(tick: number, level: number, x: number, z: number, distance: number, checkVis: HuntVis) {
        super(tick);
        const centerX: number = CoordGrid.zone(x);
        const centerZ: number = CoordGrid.zone(z);
        const radius: number = (1 + distance / 8) | 0;
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

    protected *generator(): IterableIterator<Npc> {
        for (let x: number = this.maxX; x >= this.minX; x--) {
            const zoneX: number = x << 3;
            for (let z: number = this.maxZ; z >= this.minZ; z--) {
                const zoneZ: number = z << 3;

                for (const npc of World.gameMap.getZone(zoneX, zoneZ, this.level).getAllNpcsSafe(true)) {
                    if (World.currentTick > this.tick) {
                        throw new Error('[HuntIterator] tried to use an old iterator. Create a new iterator instead.');
                    }
                    const npcType: NpcType = NpcType.get(npc.type);
                    if (!npcType.op) {
                        continue;
                    }
                    if (!npcType.op[1]) {
                        continue;
                    }
                    if (CoordGrid.distanceToSW({ x: this.x, z: this.z }, npc) > this.distance) {
                        continue;
                    }
                    if (this.checkVis === HuntVis.LINEOFSIGHT && !isLineOfSight(this.level, this.x, this.z, npc.x, npc.z)) {
                        continue;
                    }
                    if (this.checkVis === HuntVis.LINEOFWALK && !isLineOfWalk(this.level, this.x, this.z, npc.x, npc.z)) {
                        continue;
                    }
                    yield npc;
                }
            }
        }
    }
}

export class NpcIterator extends ScriptIterator<Npc> {
    private readonly level: number;
    private readonly x: number;
    private readonly z: number;
    private readonly minX: number;
    private readonly maxX: number;
    private readonly minZ: number;
    private readonly maxZ: number;
    private readonly distance: number;
    private readonly checkVis: HuntVis;
    private readonly type: NpcIteratorType;
    private readonly npcType?: NpcType;

    constructor(tick: number, level: number, x: number, z: number, distance: number, checkVis: HuntVis, type: NpcIteratorType, npcType?: NpcType) {
        super(tick);
        const centerX: number = CoordGrid.zone(x);
        const centerZ: number = CoordGrid.zone(z);
        const radius: number = (1 + distance / 8) | 0;
        this.x = x;
        this.z = z;
        this.level = level;
        this.maxX = centerX + radius;
        this.minX = centerX - radius;
        this.maxZ = centerZ + radius;
        this.minZ = centerZ - radius;
        this.distance = distance;
        this.checkVis = checkVis;
        this.type = type;
        this.npcType = npcType;
    }

    protected *generator(): IterableIterator<Npc> {
        if (this.type === NpcIteratorType.ZONE) {
            for (const npc of World.gameMap.getZone(this.x, this.z, this.level).getAllNpcsSafe(true)) {
                if (World.currentTick > this.tick) {
                    throw new Error('[NpcIterator] tried to use an old iterator. Create a new iterator instead.');
                }
                yield npc;
            }
        } else if (this.type === NpcIteratorType.DISTANCE) {
            for (let x: number = this.maxX; x >= this.minX; x--) {
                const zoneX: number = x << 3;
                for (let z: number = this.maxZ; z >= this.minZ; z--) {
                    const zoneZ: number = z << 3;
                    for (const npc of World.gameMap.getZone(zoneX, zoneZ, this.level).getAllNpcsSafe(true)) {
                        if (World.currentTick > this.tick) {
                            throw new Error('[NpcIterator] tried to use an old iterator. Create a new iterator instead.');
                        }
                        if (CoordGrid.distanceToSW({ x: this.x, z: this.z }, npc) > this.distance) {
                            continue;
                        }
                        if (this.checkVis === HuntVis.LINEOFSIGHT && !isLineOfSight(this.level, this.x, this.z, npc.x, npc.z)) {
                            continue;
                        }
                        if (this.checkVis === HuntVis.LINEOFWALK && !isLineOfWalk(this.level, this.x, this.z, npc.x, npc.z)) {
                            continue;
                        }
                        if (this.npcType && NpcType.get(npc.type) !== this.npcType) {
                            continue;
                        }
                        yield npc;
                    }
                }
            }
        }
    }
}

export class LocIterator extends ScriptIterator<Loc> {
    private readonly level: number;
    private readonly x: number;
    private readonly z: number;

    constructor(tick: number, level: number, x: number, z: number) {
        super(tick);
        this.level = level;
        this.x = x;
        this.z = z;
    }

    protected *generator(): IterableIterator<Loc> {
        for (const loc of World.gameMap.getZone(this.x, this.z, this.level).getAllLocsSafe(true)) {
            if (World.currentTick > this.tick) {
                throw new Error('[LocIterator] tried to use an old iterator. Create a new iterator instead.');
            }
            yield loc;
        }
    }
}

export class ObjIterator extends ScriptIterator<Obj> {
    private readonly level: number;
    private readonly x: number;
    private readonly z: number;

    constructor(tick: number, level: number, x: number, z: number) {
        super(tick);
        this.level = level;
        this.x = x;
        this.z = z;
    }

    protected *generator(): IterableIterator<Obj> {
        for (const Obj of World.gameMap.getZone(this.x, this.z, this.level).getAllObjsSafe(true)) {
            if (World.currentTick > this.tick) {
                throw new Error('[ObjIterator] tried to use an old iterator. Create a new iterator instead.');
            }
            yield Obj;
        }
    }
}
