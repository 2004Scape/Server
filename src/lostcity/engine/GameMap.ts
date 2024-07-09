import fs from 'fs';

import Packet from '#jagex2/io/Packet.js';

import NpcType from '#lostcity/cache/config/NpcType.js';
import ObjType from '#lostcity/cache/config/ObjType.js';
import LocType from '#lostcity/cache/config/LocType.js';

import ZoneMap from '#lostcity/engine/zone/ZoneMap.js';
import World from '#lostcity/engine/World.js';

import Npc from '#lostcity/entity/Npc.js';
import Obj from '#lostcity/entity/Obj.js';
import EntityLifeCycle from '#lostcity/entity/EntityLifeCycle.js';
import Loc from '#lostcity/entity/Loc.js';
import {Position} from '#lostcity/entity/Position.js';

import Environment from '#lostcity/util/Environment.js';

import {LocAngle, LocLayer} from '@2004scape/rsmod-pathfinder';
import * as rsmod from '@2004scape/rsmod-pathfinder';

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

    init(zoneMap: ZoneMap): void {
        console.time('Loading game map');
        const path: string = 'data/pack/server/maps/';
        const maps: string[] = fs.readdirSync(path).filter(x => x[0] === 'm');
        for (let index: number = 0; index < maps.length; index++) {
            const [mx, mz] = maps[index].substring(1).split('_').map(Number);
            const mapsquareX: number = mx << 6;
            const mapsquareZ: number = mz << 6;

            this.decodeNpcs(Packet.load(`${path}n${mx}_${mz}`), mapsquareX, mapsquareZ);
            this.decodeObjs(Packet.load(`${path}o${mx}_${mz}`), mapsquareX, mapsquareZ, zoneMap);
            // collision
            const lands: Int8Array = new Int8Array(GameMap.MAPSQUARE); // 4 * 64 * 64 size is guaranteed for lands
            this.decodeLands(lands, Packet.load(`${path}m${mx}_${mz}`), mapsquareX, mapsquareZ);
            this.decodeLocs(lands, Packet.load(`${path}l${mx}_${mz}`), mapsquareX, mapsquareZ, zoneMap);
        }
        console.timeEnd('Loading game map');
    }

    /**
     * Change collision at a specified Position for lands/floors.
     * @param x The x pos.
     * @param z The z pos.
     * @param level The level pos.
     * @param add True if adding this collision. False if removing.
     */
    changeLandCollision(x: number, z: number, level: number, add: boolean): void {
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
    changeLocCollision(shape: number, angle: number, blockrange: boolean, length: number, width: number, active: number, x: number, z: number, level: number, add: boolean): void {
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
    changeNpcCollision(size: number, x: number, z: number, level: number, add: boolean): void {
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
    changePlayerCollision(size: number, x: number, z: number, level: number, add: boolean): void {
        rsmod.changePlayer(x, z, level, size, add);
    }

    /**
     * Change collision at a specified Position for roofs.
     * @param x The x pos.
     * @param z The z pos.
     * @param level The level pos.
     * @param add True if adding this collision. False if removing.
     */
    changeRoofCollision(x: number, z: number, level: number, add: boolean): void {
        rsmod.changeRoof(x, z, level, add);
    }

    private decodeNpcs(packet: Packet, mapsquareX: number, mapsquareZ: number): void {
        while (packet.available > 0) {
            const {x, z, level} = this.unpackCoord(packet.g2());
            const absoluteX: number = mapsquareX + x;
            const absoluteZ: number = mapsquareZ + z;
            const count: number = packet.g1();
            for (let index: number = 0; index < count; index++) {
                const npcType: NpcType = NpcType.get(packet.g2());
                const size: number = npcType.size;
                const npc: Npc = new Npc(level, absoluteX, absoluteZ, size, size, EntityLifeCycle.RESPAWN, World.getNextNid(), npcType.id, npcType.moverestrict, npcType.blockwalk);
                if (npcType.members && Environment.NODE_MEMBERS || !npcType.members) {
                    World.addNpc(npc, -1);
                }
            }
        }
    }

    private decodeObjs(packet: Packet, mapsquareX: number, mapsquareZ: number, zoneMap: ZoneMap): void {
        while (packet.available > 0) {
            const {x, z, level} = this.unpackCoord(packet.g2());
            const absoluteX: number = mapsquareX + x;
            const absoluteZ: number = mapsquareZ + z;
            const count: number = packet.g1();
            for (let j: number = 0; j < count; j++) {
                const objType: ObjType = ObjType.get(packet.g2());
                const obj: Obj = new Obj(level, absoluteX, absoluteZ, EntityLifeCycle.RESPAWN, objType.id, packet.g1());
                if (objType.members && Environment.NODE_MEMBERS || !objType.members) {
                    zoneMap.zone(obj.x, obj.z, obj.level).addStaticObj(obj);
                }
            }
        }
    }

    private decodeLands(lands: Int8Array, packet: Packet, mapsquareX: number, mapsquareZ: number): void {
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

                    if (x % 7 === 0 && z % 7 === 0) { // allocate per zone
                        rsmod.allocateIfAbsent(absoluteX, absoluteZ, level);
                    }

                    const land: number = lands[this.packCoord(x, z, level)];

                    if ((land & GameMap.ROOF) !== GameMap.OPEN) {
                        this.changeRoofCollision(absoluteX, absoluteZ, level, true);
                    }

                    if ((land & GameMap.BLOCKED) !== GameMap.BLOCKED) {
                        continue;
                    }

                    const bridged: boolean = (level === 1 ? land & GameMap.BRIDGE : lands[this.packCoord(x, z, 1)] & GameMap.BRIDGE) === GameMap.BRIDGE;
                    const actualLevel: number = bridged ? level - 1 : level;
                    if (actualLevel < 0) {
                        continue;
                    }

                    this.changeLandCollision(absoluteX, absoluteZ, actualLevel, true);
                }
            }
        }
    }

    private decodeLocs(lands: Int8Array, packet: Packet, mapsquareX: number, mapsquareZ: number, zoneMap: ZoneMap): void {
        let locId: number = -1;
        let locIdOffset: number = packet.gsmart();
        while (locIdOffset !== 0) {
            locId += locIdOffset;

            let coord: number = 0;
            let coordOffset: number = packet.gsmart();

            while (coordOffset !== 0) {
                const {x, z, level} = this.unpackCoord(coord += coordOffset - 1);

                const info: number = packet.g1();
                coordOffset = packet.gsmart();

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

                const absoluteX: number = x + mapsquareX;
                const absoluteZ: number = z + mapsquareZ;

                zoneMap.zone(absoluteX, absoluteZ, actualLevel).addStaticLoc(new Loc(actualLevel, absoluteX, absoluteZ, width, length, EntityLifeCycle.RESPAWN, locId, shape, angle));

                if (type.blockwalk) {
                    this.changeLocCollision(shape, angle, type.blockrange, length, width, type.active, absoluteX, absoluteZ, actualLevel, true);
                }
            }
            locIdOffset = packet.gsmart();
        }
    }

    private packCoord(x: number, z: number, level: number): number {
        return (z & 0x3f) | ((x & 0x3f) << 6) | ((level & 0x3) << 12);
    }

    private unpackCoord(packed: number): Position {
        const z: number = packed & 0x3f;
        const x: number = (packed >> 6) & 0x3f;
        const level: number = (packed >> 12) & 0x3;
        return { x, z, level };
    }
}
