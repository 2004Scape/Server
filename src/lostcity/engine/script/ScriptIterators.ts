import ObjType from '#lostcity/cache/config/ObjType.js';
import LocType from '#lostcity/cache/config/LocType.js';
import NpcType from '#lostcity/cache/config/NpcType.js';

import World from '#lostcity/engine/World.js';

import {Position} from '#lostcity/entity/Position.js';
import Loc from '#lostcity/entity/Loc.js';
import HuntVis from '#lostcity/entity/hunt/HuntVis.js';
import Npc from '#lostcity/entity/Npc.js';
import HuntModeType from '#lostcity/entity/hunt/HuntModeType.js';
import NpcIteratorType from '#lostcity/entity/NpcIteratorType.js';
import Entity from '#lostcity/entity/Entity.js';

import * as rsmod from '@2004scape/rsmod-pathfinder';

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

    constructor(
        tick: number,
        level: number,
        x: number,
        z: number,
        distance: number,
        checkVis: HuntVis,
        checkType: number,
        checkCategory: number,
        type: HuntModeType
    ) {
        super(tick);
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
                    for (const player of World.getZone(zoneX, zoneZ, this.level).getPlayers()) {
                        if (World.currentTick > this.tick) {
                            throw new Error('[HuntIterator] tried to use an old iterator. Create a new iterator instead.');
                        }
                        if (Position.distanceToSW({ x: this.x, z: this.z }, player) > this.distance) {
                            continue;
                        }
                        if (this.checkVis === HuntVis.LINEOFSIGHT && !rsmod.hasLineOfSight(this.level, this.x, this.z, player.x, player.z, 1, 1, 1, 1)) {
                            continue;
                        }
                        if (this.checkVis === HuntVis.LINEOFWALK && !rsmod.hasLineOfWalk(this.level, this.x, this.z, player.x, player.z, 1, 1, 1, 1)) {
                            continue;
                        }
                        yield player;
                    }
                } else if (this.type === HuntModeType.NPC) {
                    for (const npc of World.getZone(zoneX, zoneZ, this.level).getNpcs()) {
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
                        if (!npcType.op) {
                            continue;
                        }
                        if (!npcType.op[1]) {
                            continue;
                        }
                        if (Position.distanceToSW({ x: this.x, z: this.z }, npc) > this.distance) {
                            continue;
                        }
                        if (this.checkVis === HuntVis.LINEOFSIGHT && !rsmod.hasLineOfSight(this.level, this.x, this.z, npc.x, npc.z, 1, 1, 1, 1)) {
                            continue;
                        }
                        if (this.checkVis === HuntVis.LINEOFWALK && !rsmod.hasLineOfWalk(this.level, this.x, this.z, npc.x, npc.z, 1, 1, 1, 1)) {
                            continue;
                        }
                        yield npc;
                    }
                } else if (this.type === HuntModeType.OBJ) {
                    // scripting only cares about dynamic objs??
                    for (const obj of World.getZone(zoneX, zoneZ, this.level).getObjs()) {
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
                        if (Position.distanceToSW({ x: this.x, z: this.z }, obj) > this.distance) {
                            continue;
                        }
                        if (this.checkVis === HuntVis.LINEOFSIGHT && !rsmod.hasLineOfSight(this.level, this.x, this.z, obj.x, obj.z, 1, 1, 1, 1)) {
                            continue;
                        }
                        if (this.checkVis === HuntVis.LINEOFWALK && !rsmod.hasLineOfWalk(this.level, this.x, this.z, obj.x, obj.z, 1, 1, 1, 1)) {
                            continue;
                        }
                        yield obj;
                    }
                } else if (this.type === HuntModeType.SCENERY) {
                    for (const loc of World.getZone(zoneX, zoneZ, this.level).getLocs()) {
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
                        if (Position.distanceToSW({ x: this.x, z: this.z }, loc) > this.distance) {
                            continue;
                        }
                        if (this.checkVis === HuntVis.LINEOFSIGHT && !rsmod.hasLineOfSight(this.level, this.x, this.z, loc.x, loc.z, 1, 1, 1, 1)) {
                            continue;
                        }
                        if (this.checkVis === HuntVis.LINEOFWALK && !rsmod.hasLineOfWalk(this.level, this.x, this.z, loc.x, loc.z, 1, 1, 1, 1)) {
                            continue;
                        }
                        yield loc;
                    }
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

    constructor(tick: number, level: number, x: number, z: number,  distance: number, checkVis: HuntVis, type: NpcIteratorType) {
        super(tick);
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
        this.type = type;
    }

    protected *generator(): IterableIterator<Npc> {
        if (this.type === NpcIteratorType.ZONE) {
            for (const npc of World.getZone(this.x, this.z, this.level).getNpcs()) {
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
                    for (const npc of World.getZone(zoneX, zoneZ, this.level).getNpcs()) {
                        if (World.currentTick > this.tick) {
                            throw new Error('[NpcIterator] tried to use an old iterator. Create a new iterator instead.');
                        }
                        if (Position.distanceToSW({ x: this.x, z: this.z }, npc) > this.distance) {
                            continue;
                        }
                        if (this.checkVis === HuntVis.LINEOFSIGHT && !rsmod.hasLineOfSight(this.level, this.x, this.z, npc.x, npc.z, 1, 1, 1, 1)) {
                            continue;
                        }
                        if (this.checkVis === HuntVis.LINEOFWALK && !rsmod.hasLineOfWalk(this.level, this.x, this.z, npc.x, npc.z, 1, 1, 1, 1)) {
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
        for (const loc of World.getZone(this.x, this.z, this.level).getLocs()) {
            if (World.currentTick > this.tick) {
                throw new Error('[LocIterator] tried to use an old iterator. Create a new iterator instead.');
            }
            yield loc;
        }
    }
}