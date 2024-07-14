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

    async initAsync(zoneMap: ZoneMap): Promise<void> {
        console.time('Loading game map');
        const path: string = 'data/pack/server/maps/';
        const maps: string[] = ['m29_75', 'm30_75', 'm31_75', 'm32_70', 'm32_71', 'm32_72', 'm32_73', 'm32_74', 'm32_75', 'm33_70', 'm33_71', 'm33_72', 'm33_73', 'm33_74', 'm33_75', 'm33_76', 'm34_70', 'm34_71', 'm34_72', 'm34_73', 'm34_74', 'm34_75', 'm34_76', 'm35_20', 'm35_75', 'm35_76', 'm36_146', 'm36_147', 'm36_148', 'm36_149', 'm36_150', 'm36_153', 'm36_154', 'm36_52', 'm36_53', 'm36_54', 'm36_72', 'm36_73', 'm36_74', 'm36_75', 'm36_76', 'm37_146', 'm37_147', 'm37_148', 'm37_149', 'm37_150', 'm37_151', 'm37_152', 'm37_153', 'm37_154', 'm37_48', 'm37_49', 'm37_50', 'm37_51', 'm37_52', 'm37_53', 'm37_54', 'm37_55', 'm37_72', 'm37_73', 'm37_74', 'm37_75', 'm38_146', 'm38_147', 'm38_148', 'm38_149', 'm38_150', 'm38_151', 'm38_152', 'm38_153', 'm38_154', 'm38_155', 'm38_45', 'm38_46', 'm38_47', 'm38_48', 'm38_49', 'm38_50', 'm38_51', 'm38_52', 'm38_53', 'm38_54', 'm38_55', 'm38_72', 'm38_73', 'm38_74', 'm39_147', 'm39_148', 'm39_149', 'm39_150', 'm39_151', 'm39_152', 'm39_153', 'm39_154', 'm39_155', 'm39_45', 'm39_46', 'm39_47', 'm39_48', 'm39_49', 'm39_50', 'm39_51', 'm39_52', 'm39_53', 'm39_54', 'm39_55', 'm39_72', 'm39_73', 'm39_74', 'm39_75', 'm39_76', 'm40_147', 'm40_148', 'm40_149', 'm40_150', 'm40_151', 'm40_152', 'm40_153', 'm40_154', 'm40_45', 'm40_46', 'm40_47', 'm40_48', 'm40_49', 'm40_50', 'm40_51', 'm40_52', 'm40_53', 'm40_54', 'm40_55', 'm40_72', 'm40_73', 'm40_74', 'm40_75', 'm40_76', 'm41_146', 'm41_149', 'm41_151', 'm41_152', 'm41_153', 'm41_154', 'm41_45', 'm41_46', 'm41_47', 'm41_48', 'm41_49', 'm41_50', 'm41_51', 'm41_52', 'm41_53', 'm41_54', 'm41_55', 'm41_56', 'm41_72', 'm41_73', 'm41_74', 'm41_75', 'm42_144', 'm42_145', 'm42_146', 'm42_151', 'm42_152', 'm42_153', 'm42_49', 'm42_50', 'm42_51', 'm42_52', 'm42_53', 'm42_54', 'm42_55', 'm42_56', 'm42_72', 'm42_73', 'm42_74', 'm42_75', 'm43_144', 'm43_145', 'm43_146', 'm43_153', 'm43_154', 'm43_45', 'm43_46', 'm43_47', 'm43_48', 'm43_49', 'm43_50', 'm43_51', 'm43_52', 'm43_53', 'm43_54', 'm43_55', 'm43_56', 'm43_72', 'm43_73', 'm43_74', 'm43_75', 'm44_144', 'm44_145', 'm44_146', 'm44_148', 'm44_149', 'm44_150', 'm44_151', 'm44_152', 'm44_153', 'm44_154', 'm44_155', 'm44_45', 'm44_46', 'm44_47', 'm44_48', 'm44_49', 'm44_50', 'm44_51', 'm44_52', 'm44_53', 'm44_54', 'm44_55', 'm44_72', 'm44_73', 'm44_74', 'm44_75', 'm45_145', 'm45_146', 'm45_148', 'm45_150', 'm45_151', 'm45_152', 'm45_153', 'm45_154', 'm45_155', 'm45_45', 'm45_46', 'm45_47', 'm45_48', 'm45_49', 'm45_50', 'm45_51', 'm45_52', 'm45_53', 'm45_54', 'm45_55', 'm45_56', 'm45_57', 'm45_58', 'm45_59', 'm45_60', 'm45_61', 'm45_62', 'm45_73', 'm45_74', 'm45_75', 'm45_76', 'm46_149', 'm46_150', 'm46_152', 'm46_153', 'm46_154', 'm46_161', 'm46_45', 'm46_46', 'm46_47', 'm46_48', 'm46_49', 'm46_50', 'm46_51', 'm46_52', 'm46_53', 'm46_54', 'm46_55', 'm46_56', 'm46_57', 'm46_58', 'm46_59', 'm46_60', 'm46_61', 'm46_62', 'm46_75', 'm47_148', 'm47_149', 'm47_150', 'm47_152', 'm47_153', 'm47_160', 'm47_161', 'm47_47', 'm47_48', 'm47_49', 'm47_50', 'm47_51', 'm47_52', 'm47_53', 'm47_54', 'm47_55', 'm47_56', 'm47_57', 'm47_58', 'm47_59', 'm47_60', 'm47_61', 'm47_62', 'm47_75', 'm48_148', 'm48_149', 'm48_152', 'm48_153', 'm48_154', 'm48_155', 'm48_156', 'm48_47', 'm48_48', 'm48_49', 'm48_50', 'm48_51', 'm48_52', 'm48_53', 'm48_54', 'm48_55', 'm48_56', 'm48_57', 'm48_58', 'm48_59', 'm48_60', 'm48_61', 'm48_62', 'm49_148', 'm49_149', 'm49_153', 'm49_154', 'm49_155', 'm49_156', 'm49_46', 'm49_47', 'm49_48', 'm49_49', 'm49_50', 'm49_51', 'm49_52', 'm49_53', 'm49_54', 'm49_55', 'm49_56', 'm49_57', 'm49_58', 'm49_59', 'm49_60', 'm49_61', 'm49_62', 'm50_149', 'm50_150', 'm50_152', 'm50_153', 'm50_154', 'm50_46', 'm50_47', 'm50_48', 'm50_49', 'm50_50', 'm50_51', 'm50_52', 'm50_53', 'm50_54', 'm50_55', 'm50_56', 'm50_57', 'm50_58', 'm50_59', 'm50_60', 'm50_61', 'm50_62', 'm51_147', 'm51_154', 'm51_46', 'm51_47', 'm51_48', 'm51_49', 'm51_50', 'm51_51', 'm51_52', 'm51_53', 'm51_54', 'm51_55', 'm51_56', 'm51_57', 'm51_58', 'm51_59', 'm51_60', 'm51_61', 'm51_62', 'm52_152', 'm52_153', 'm52_154', 'm52_46', 'm52_47', 'm52_48', 'm52_49', 'm52_50', 'm52_51', 'm52_52', 'm52_53', 'm52_54', 'm52_55', 'm52_56', 'm52_57', 'm52_58', 'm52_59', 'm52_60', 'm52_61', 'm52_62', 'm53_49', 'm53_50', 'm53_51', 'm53_52', 'm53_53'];
        for (let index: number = 0; index < maps.length; index++) {
            console.log('init ', maps[index]);
            const [mx, mz] = maps[index].substring(1).split('_').map(Number);
            const mapsquareX: number = mx << 6;
            const mapsquareZ: number = mz << 6;

            this.decodeNpcs(await Packet.loadAsync(`${path}n${mx}_${mz}`), mapsquareX, mapsquareZ);
            this.decodeObjs(await Packet.loadAsync(`${path}o${mx}_${mz}`), mapsquareX, mapsquareZ, zoneMap);
            // collision
            const lands: Int8Array = new Int8Array(GameMap.MAPSQUARE); // 4 * 64 * 64 size is guaranteed for lands
            this.decodeLands(lands, await Packet.loadAsync(`${path}m${mx}_${mz}`), mapsquareX, mapsquareZ);
            this.decodeLocs(lands, await Packet.loadAsync(`${path}l${mx}_${mz}`), mapsquareX, mapsquareZ, zoneMap);
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
