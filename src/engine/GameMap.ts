import fs from 'fs';

import {CollisionFlag, CollisionType, LocAngle, LocLayer} from '@2004scape/rsmod-pathfinder';
import * as rsmod from '@2004scape/rsmod-pathfinder';

import Packet from '#/io/Packet.js';

import NpcType from '#/cache/config/NpcType.js';
import ObjType from '#/cache/config/ObjType.js';
import LocType from '#/cache/config/LocType.js';

import { CoordGrid } from '#/engine/CoordGrid.js';
import World from '#/engine/World.js';

import Zone from '#/engine/zone/Zone.js';
import ZoneGrid from '#/engine/zone/ZoneGrid.js';
import ZoneMap from '#/engine/zone/ZoneMap.js';

import Npc from '#/engine/entity/Npc.js';
import Obj from '#/engine/entity/Obj.js';
import EntityLifeCycle from '#/engine/entity/EntityLifeCycle.js';
import Loc from '#/engine/entity/Loc.js';

import { printDebug, printWarning } from '#/util/Logger.js';

export default class GameMap {
    private static readonly OPEN: number = 0x0;
    private static readonly BLOCKED: number = 0x1;
    private static readonly BRIDGE: number = 0x2;
    private static readonly ROOF: number = 0x4;
    private static readonly WALL: number = 0x8;
    private static readonly LOWMEMORY: number = 0x10;

    private static readonly Y: number = 4;
    private static readonly X: number = 64;
    private static readonly Z: number = 64;

    private static readonly MAPSQUARE: number = GameMap.X * GameMap.Y * GameMap.Z;

    private readonly members: boolean;
    private readonly zonemap: ZoneMap;
    private readonly multimap: Set<number>;
    private readonly freemap: Set<number>;

    constructor(members: boolean) {
        this.members = members;
        this.zonemap = new ZoneMap();
        this.multimap = new Set();
        this.freemap = new Set();
    }

    init(): void {
        printDebug('Loading game map');

        this.loadCsvMap(this.multimap, fs.readFileSync('data/src/maps/multiway.csv', 'ascii').replace(/\r/g, '').split('\n'));
        this.loadCsvMap(this.freemap, fs.readFileSync('data/src/maps/free2play.csv', 'ascii').replace(/\r/g, '').split('\n'));

        const path: string = 'data/pack/server/maps/';
        const maps: string[] = fs.readdirSync(path).filter(x => x[0] === 'm');
        for (let index: number = 0; index < maps.length; index++) {
            const [mx, mz] = maps[index].substring(1).split('_').map(Number);
            const mapsquareX: number = mx << 6;
            const mapsquareZ: number = mz << 6;

            this.loadNpcs(Packet.load(`${path}n${mx}_${mz}`), mapsquareX, mapsquareZ);
            this.loadObjs(Packet.load(`${path}o${mx}_${mz}`), mapsquareX, mapsquareZ);
            // collision
            const lands: Int8Array = new Int8Array(GameMap.MAPSQUARE); // 4 * 64 * 64 size is guaranteed for lands
            this.loadGround(lands, Packet.load(`${path}m${mx}_${mz}`), mapsquareX, mapsquareZ);
            this.loadLocations(lands, Packet.load(`${path}l${mx}_${mz}`), mapsquareX, mapsquareZ);
        }
    }

    async initAsync(): Promise<void> {
        const path: string = 'data/pack/server/maps/';
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { serverMaps } = await import('#/server/PreloadedDirs.js');
        const maps = serverMaps.map(async (map: string) => {
            const [mx, mz] = map.substring(1).split('_').map(Number);
            const mapsquareX: number = mx << 6;
            const mapsquareZ: number = mz << 6;

            const [npcData, objData, landData, locData] = await Promise.all([
                await Packet.loadAsync(`${path}n${mx}_${mz}`),
                await Packet.loadAsync(`${path}o${mx}_${mz}`),
                await Packet.loadAsync(`${path}m${mx}_${mz}`),
                await Packet.loadAsync(`${path}l${mx}_${mz}`)]);

            this.loadNpcs(npcData, mapsquareX, mapsquareZ);
            this.loadObjs(objData, mapsquareX, mapsquareZ);
            // collision
            const lands: Int8Array = new Int8Array(GameMap.MAPSQUARE); // 4 * 64 * 64 size is guaranteed for lands
            this.loadGround(lands, landData, mapsquareX, mapsquareZ);
            this.loadLocations(lands, locData, mapsquareX, mapsquareZ);
        });
        await Promise.all(maps);
    }

    isMulti(coord: number): boolean {
        return this.multimap.has(coord);
    }

    isFreeToPlay(x: number, z: number): boolean {
        return this.freemap.has(CoordGrid.packCoord(0, x, z));
    }

    getZone(x: number, z: number, level: number): Zone {
        return this.zonemap.zone(x, z, level);
    }

    getZoneIndex(zoneIndex: number): Zone {
        return this.zonemap.zoneByIndex(zoneIndex);
    }

    getZoneGrid(level: number): ZoneGrid {
        return this.zonemap.grid(level);
    }

    getTotalZones(): number {
        return this.zonemap.zoneCount();
    }

    getTotalLocs(): number {
        return this.zonemap.locCount();
    }

    getTotalObjs(): number {
        return this.zonemap.objCount();
    }

    private loadNpcs(packet: Packet, mapsquareX: number, mapsquareZ: number): void {
        while (packet.available > 0) {
            const { x, z, level } = this.unpackCoord(packet.g2());
            const absoluteX: number = mapsquareX + x;
            const absoluteZ: number = mapsquareZ + z;
            const count: number = packet.g1();
            for (let index: number = 0; index < count; index++) {
                const id: number = packet.g2();
                if (!this.members && !this.isFreeToPlay(absoluteX, absoluteZ)) {
                    continue;
                }
                const npcType: NpcType = NpcType.get(id);
                const size: number = npcType.size;
                const npc: Npc = new Npc(level, absoluteX, absoluteZ, size, size, EntityLifeCycle.RESPAWN, World.getNextNid(), npcType.id, npcType.moverestrict, npcType.blockwalk);
                if (npcType.members && this.members || !npcType.members) {
                    World.addNpc(npc, -1);
                }
            }
        }
    }

    private loadObjs(packet: Packet, mapsquareX: number, mapsquareZ: number): void {
        while (packet.available > 0) {
            const { x, z, level } = this.unpackCoord(packet.g2());
            const absoluteX: number = mapsquareX + x;
            const absoluteZ: number = mapsquareZ + z;
            const count: number = packet.g1();
            for (let index: number = 0; index < count; index++) {
                const id: number = packet.g2();
                const count: number = packet.g1();
                if (!this.members && !this.isFreeToPlay(absoluteX, absoluteZ)) {
                    continue;
                }
                const objType: ObjType = ObjType.get(id);
                const obj: Obj = new Obj(level, absoluteX, absoluteZ, EntityLifeCycle.RESPAWN, objType.id, count);
                if (objType.members && this.members || !objType.members) {
                    this.getZone(obj.x, obj.z, obj.level).addStaticObj(obj);
                }
            }
        }
    }

    private loadGround(lands: Int8Array, packet: Packet, mapsquareX: number, mapsquareZ: number): void {
        for (let level: number = 0; level < GameMap.Y; level++) {
            for (let x: number = 0; x < GameMap.X; x++) {
                for (let z: number = 0; z < GameMap.Z; z++) {
                    while (true) {
                        const opcode: number = packet.g1();
                        if (opcode === 0) {
                            break;
                        } else if (opcode === 1) {
                            packet.pos++;
                            break;
                        }

                        if (opcode <= 49) {
                            packet.pos++;
                        } else if (opcode <= 81) {
                            lands[this.packCoord(x, z, level)] = opcode - 49;
                        }
                    }
                }
            }
        }
        for (let level: number = 0; level < GameMap.Y; level++) {
            for (let x: number = 0; x < GameMap.X; x++) {
                const absoluteX: number = x + mapsquareX;

                for (let z: number = 0; z < GameMap.Z; z++) {
                    const absoluteZ: number = z + mapsquareZ;

                    if (!this.members && !this.isFreeToPlay(absoluteX, absoluteZ) && !this.bordersFreeToPlay(absoluteX, absoluteZ)) {
                        continue;
                    }

                    if (x % 7 === 0 && z % 7 === 0) { // allocate per zone
                        rsmod.allocateIfAbsent(absoluteX, absoluteZ, level);
                    }

                    const land: number = lands[this.packCoord(x, z, level)];

                    if ((land & GameMap.ROOF) !== GameMap.OPEN) {
                        changeRoofCollision(absoluteX, absoluteZ, level, true);
                    }

                    if ((land & GameMap.BLOCKED) !== GameMap.BLOCKED) {
                        continue;
                    }

                    const bridged: boolean = (level === 1 ? land & GameMap.BRIDGE : lands[this.packCoord(x, z, 1)] & GameMap.BRIDGE) === GameMap.BRIDGE;
                    const actualLevel: number = bridged ? level - 1 : level;
                    if (actualLevel < 0) {
                        continue;
                    }

                    changeLandCollision(absoluteX, absoluteZ, actualLevel, true);
                }
            }
        }
    }

    private loadLocations(lands: Int8Array, packet: Packet, mapsquareX: number, mapsquareZ: number): void {
        let locId: number = -1;
        let locIdOffset: number = packet.gsmart();
        while (locIdOffset !== 0) {
            locId += locIdOffset;

            let coord: number = 0;
            let coordOffset: number = packet.gsmart();

            while (coordOffset !== 0) {
                const { x, z, level } = this.unpackCoord(coord += coordOffset - 1);

                const info: number = packet.g1();
                coordOffset = packet.gsmart();

                const absoluteX: number = x + mapsquareX;
                const absoluteZ: number = z + mapsquareZ;

                if (!this.members && !this.isFreeToPlay(absoluteX, absoluteZ) && !this.bordersFreeToPlay(absoluteX, absoluteZ)) {
                    continue;
                }

                const bridged: boolean = (level === 1 ? lands[coord] & GameMap.BRIDGE : lands[this.packCoord(x, z, 1)] & GameMap.BRIDGE) === GameMap.BRIDGE;
                const actualLevel: number = bridged ? level - 1 : level;
                if (actualLevel < 0) {
                    continue;
                }

                const type: LocType = LocType.get(locId);
                const width: number = type.width;
                const length: number = type.length;
                const shape: number = info >> 2;
                const angle: number = info & 0x3;

                if (type.blockwalk) {
                    changeLocCollision(shape, angle, type.blockrange, length, width, type.active, absoluteX, absoluteZ, actualLevel, true);
                }

                if (type.active === 1) {
                    this.getZone(absoluteX, absoluteZ, actualLevel).addStaticLoc(new Loc(actualLevel, absoluteX, absoluteZ, width, length, EntityLifeCycle.RESPAWN, locId, shape, angle));
                }
            }
            locIdOffset = packet.gsmart();
        }
    }

    private loadCsvMap(map: Set<number>, csv: string[]): void {
        // easiest solution for the time being
        for (let i: number = 0; i < csv.length; i++) {
            if (csv[i].startsWith('//') || !csv[i].length) {
                continue;
            }

            const parts: string[] = csv[i].split(',');
            if (parts.length === 2) {
                const [from, to] = parts;
                const [fromLevel, fromMx, fromMz, fromLx, fromLz] = from.split('_').map(Number);
                const [_toLevel, toMx, toMz, toLx, toLz] = to.split('_').map(Number);

                if (fromLx % 8 !== 0 || fromLz % 8 !== 0 || toLx % 8 !== 7 || toLz % 8 !== 7 || fromMx > toMx || fromMz > toMz || (fromMx <= toMx && fromMz <= toMz && (fromLx > toLx || fromLz > toLz))) {
                    printWarning('Free to play map not aligned to a zone ' + csv[i]);
                }

                const startX: number  = (fromMx << 6) + fromLx;
                const startZ: number  = (fromMz << 6) + fromLz;
                const endX: number  = (toMx << 6) + toLx;
                const endZ: number  = (toMz << 6) + toLz;

                for (let x: number  = startX; x <= endX; x++) {
                    for (let z: number  = startZ; z <= endZ; z++) {
                        map.add(CoordGrid.packCoord(fromLevel, x, z));
                    }
                }
            } else {
                const [level, mx, mz, lx, lz] = csv[i].split('_').map(Number);

                for (let x: number  = 0; x < 8; x++) {
                    for (let z: number  = 0; z < 8; z++) {
                        map.add(CoordGrid.packCoord(level, (mx << 6) + lx + x, (mz << 6) + lz + z));
                    }
                }
            }
        }
    }

    private packCoord(x: number, z: number, level: number): number {
        return (z & 0x3f) | ((x & 0x3f) << 6) | ((level & 0x3) << 12);
    }

    private unpackCoord(packed: number): CoordGrid {
        const z: number = packed & 0x3f;
        const x: number = (packed >> 6) & 0x3f;
        const level: number = (packed >> 12) & 0x3;
        return { x, z, level };
    }

    private bordersFreeToPlay(x: number, z: number): boolean {
        return this.isFreeToPlay(x + 1, z) || this.isFreeToPlay(x - 1, z) || this.isFreeToPlay(x, z + 1) || this.isFreeToPlay(x, z - 1);
    }
}

// ---- rsmod wasm exports.

/**
 * Change collision at a specified Position for lands/floors.
 * @param x The x pos.
 * @param z The z pos.
 * @param level The level pos.
 * @param add True if adding this collision. False if removing.
 */
export function changeLandCollision(x: number, z: number, level: number, add: boolean): void {
    rsmod.changeFloor(x, z, level, add);
}

/**
 * Change collision at a specified Position for locs.
 * @param shape The shape of the loc to change.
 * @param angle The angle of the loc to change.
 * @param blockrange If this loc blocks range.
 * @param length The length of this loc.
 * @param width The width of this loc.
 * @param active If this loc is active.
 * @param x The x pos.
 * @param z The z pos.
 * @param level The level pos.
 * @param add True if adding this collision. False if removing.
 */
export function changeLocCollision(shape: number, angle: number, blockrange: boolean, length: number, width: number, active: number, x: number, z: number, level: number, add: boolean): void {
    const locLayer: LocLayer = rsmod.locShapeLayer(shape);
    if (locLayer === LocLayer.WALL) {
        rsmod.changeWall(x, z, level, angle, shape, blockrange, false, add);
    } else if (locLayer === LocLayer.GROUND) {
        if (angle === LocAngle.NORTH || angle === LocAngle.SOUTH) {
            rsmod.changeLoc(x, z, level, length, width, blockrange, false, add);
        } else {
            rsmod.changeLoc(x, z, level, width, length, blockrange, false, add);
        }
    } else if (locLayer === LocLayer.GROUND_DECOR) {
        if (active === 1) {
            rsmod.changeFloor(x, z, level, add);
        }
    }
}

/**
 * Change collision at a specified Position for npcs.
 * @param size The size square of this npc. (1x1, 2x2, etc).
 * @param x The x pos.
 * @param z The z pos.
 * @param level The level pos.
 * @param add True if adding this collision. False if removing.
 */
export function changeNpcCollision(size: number, x: number, z: number, level: number, add: boolean): void {
    rsmod.changeNpc(x, z, level, size, add);
}

/**
 * Change collision at a specified Position for players.
 * @param size The size square of this npc. (1x1, 2x2, etc).
 * @param x The x pos.
 * @param z The z pos.
 * @param level The level pos.
 * @param add True if adding this collision. False if removing.
 */
export function changePlayerCollision(size: number, x: number, z: number, level: number, add: boolean): void {
    rsmod.changePlayer(x, z, level, size, add);
}

/**
 * Change collision at a specified Position for roofs.
 * @param x The x pos.
 * @param z The z pos.
 * @param level The level pos.
 * @param add True if adding this collision. False if removing.
 */
export function changeRoofCollision(x: number, z: number, level: number, add: boolean): void {
    rsmod.changeRoof(x, z, level, add);
}

export function findPath(level: number, srcX: number, srcZ: number, destX: number, destZ: number): Uint32Array {
    return rsmod.findPath(level, srcX, srcZ, destX, destZ, 1, 1, 1, 0, -1, true, 0, 25, CollisionType.NORMAL);
}

export function findPathToEntity(level: number, srcX: number, srcZ: number, destX: number, destZ: number, srcSize: number, destWidth: number, destHeight: number): Uint32Array {
    return rsmod.findPath(level, srcX, srcZ, destX, destZ, srcSize, destWidth, destHeight, 0, -2, true, 0, 25, CollisionType.NORMAL);
}

export function findPathToLoc(level: number, srcX: number, srcZ: number, destX: number, destZ: number, srcSize: number, destWidth: number, destHeight: number, angle: number, shape: number, blockAccessFlags: number): Uint32Array {
    return rsmod.findPath(level, srcX, srcZ, destX, destZ, srcSize, destWidth, destHeight, angle, shape, true, blockAccessFlags, 25, CollisionType.NORMAL);
}

export function findNaivePath(level: number, srcX: number, srcZ: number, destX: number, destZ: number, srcWidth: number, srcHeight: number, destWidth: number, destHeight: number, extraFlag: number, collision: CollisionType): Uint32Array {
    return rsmod.findNaivePath(level, srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight, extraFlag, collision);
}

export function reachedEntity(level: number, srcX: number, srcZ: number, destX: number, destZ: number, destWidth: number, destHeight: number, srcSize: number): boolean {
    return rsmod.reached(level, srcX, srcZ, destX, destZ, destWidth, destHeight, srcSize, 0, -2, 0);
}

export function reachedLoc(level: number, srcX: number, srcZ: number, destX: number, destZ: number, destWidth: number, destHeight: number, srcSize: number, angle: number, shape: number, blockAccessFlags: number): boolean {
    return rsmod.reached(level, srcX, srcZ, destX, destZ, destWidth, destHeight, srcSize, angle, shape, blockAccessFlags);
}

export function reachedObj(level: number, srcX: number, srcZ: number, destX: number, destZ: number, destWidth: number, destHeight: number, srcSize: number): boolean {
    return rsmod.reached(level, srcX, srcZ, destX, destZ, destWidth, destHeight, srcSize, 0, -1, 0);
}

export function canTravel(level: number, x: number, z: number, offsetX: number, offsetZ: number, size: number, extraFlag: number, collision: CollisionType): boolean {
    return rsmod.canTravel(level, x, z, offsetX, offsetZ, size, extraFlag, collision);
}

export function isMapBlocked(x: number, z: number, level: number): boolean {
    return isFlagged(x, z, level, CollisionFlag.WALK_BLOCKED);
}

export function isIndoors(x: number, z: number, level: number): boolean {
    return isFlagged(x, z, level, CollisionFlag.ROOF);
}

export function isFlagged(x: number, z: number, level: number, masks: number): boolean {
    return rsmod.isFlagged(x, z, level, masks);
}

export function isLineOfWalk(level: number, srcX: number, srcZ: number, destX: number, destZ: number): boolean {
    return rsmod.hasLineOfWalk(level, srcX, srcZ, destX, destZ, 1, 1, 1, 1, 0);
}

export function isLineOfSight(level: number, srcX: number, srcZ: number, destX: number, destZ: number): boolean {
    return rsmod.hasLineOfSight(level, srcX, srcZ, destX, destZ, 1, 1, 1, 1, 0);
}

export function isApproached(level: number, srcX: number, srcZ: number, destX: number, destZ: number, srcWidth: number, srcHeight: number, destWidth: number, destHeight: number): boolean {
    return rsmod.hasLineOfSight(level, srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight, CollisionFlag.PLAYER);
}

export function layerForLocShape(shape: number): LocLayer {
    return rsmod.locShapeLayer(shape);
}
