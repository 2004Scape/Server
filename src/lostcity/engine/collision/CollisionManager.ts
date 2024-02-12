import fs from 'fs';

import Packet from '#jagex2/io/Packet.js';

import ZoneManager from '#lostcity/engine/zone/ZoneManager.js';

import FloorCollider from '#lostcity/engine/collision/FloorCollider.js';
import WallCollider from '#lostcity/engine/collision/WallCollider.js';
import LocCollider from '#lostcity/engine/collision/LocCollider.js';
import LocAngle from '#lostcity/engine/collision/LocAngle.js';
import LocLayer from '#lostcity/engine/collision/LocLayer.js';
import NpcCollider from '#lostcity/engine/collision/NpcCollider.js';
import { LocShapes } from '#lostcity/engine/collision/LocShape.js';
import RoofCollider from '#lostcity/engine/collision/RoofCollider.js';
import PlayerCollider from '#lostcity/engine/collision/PlayerCollider.js';

// all of this above needs to be refactored into an export ^ for one line imports.

import LocType from '#lostcity/cache/LocType.js';

import Loc from '#lostcity/entity/Loc.js';

import { CollisionFlagMap, LineValidator, NaivePathFinder, PathFinder, StepValidator } from '@2004scape/rsmod-pathfinder';

export default class CollisionManager {
    private static readonly SHIFT_23 = Math.pow(2, 23);

    private readonly floorCollider: FloorCollider;
    private readonly wallCollider: WallCollider;
    private readonly locCollider: LocCollider;
    private readonly npcCollider: NpcCollider;
    private readonly roofCollider: RoofCollider;
    private readonly playerCollider: PlayerCollider;

    readonly flags: CollisionFlagMap;
    readonly stepValidator: StepValidator;
    readonly pathFinder: PathFinder;
    readonly naivePathFinder: NaivePathFinder;
    readonly lineValidator: LineValidator;

    constructor() {
        this.flags = new CollisionFlagMap();
        this.stepValidator = new StepValidator(this.flags);
        this.floorCollider = new FloorCollider(this.flags);
        this.wallCollider = new WallCollider(this.flags);
        this.locCollider = new LocCollider(this.flags);
        this.npcCollider = new NpcCollider(this.flags);
        this.roofCollider = new RoofCollider(this.flags);
        this.playerCollider = new PlayerCollider(this.flags);
        this.pathFinder = new PathFinder(this.flags);
        this.naivePathFinder = new NaivePathFinder(this.stepValidator);
        this.lineValidator = new LineValidator(this.flags);
    }

    init(zoneManager: ZoneManager) {
        console.time('Loading collision');

        const maps: string[] = fs.readdirSync('data/pack/server/maps').filter((x: string): boolean => x[0] === 'm');
        for (let index: number = 0; index < maps.length; index++) {
            const [mx, mz] = maps[index].substring(1).split('_').map((x: string) => parseInt(x));

            const lands: Int8Array = new Int8Array(4 * 64 * 64); // 4 * 64 * 64 size is guaranteed for lands
            const locs: number[] = []; // dynamically grow locs

            this.decodeLands(lands, Packet.load(`data/pack/server/maps/m${mx}_${mz}`));
            this.decodeLocs(locs, Packet.load(`data/pack/server/maps/l${mx}_${mz}`));

            const mapsquareX: number = mx << 6;
            const mapsquareZ: number = mz << 6;

            this.applyLandCollision(mapsquareX, mapsquareZ, lands);
            this.applyLocCollision(zoneManager, locs, mapsquareX, mapsquareZ, lands);
        }
        console.timeEnd('Loading collision');
    }

    /**
     * Change collision at a specified Position for lands/floors.
     * @param x The x pos.
     * @param z The z pos.
     * @param level The level pos.
     * @param add True if adding this collision. False if removing.
     */
    changeLandCollision(x: number, z: number, level: number, add: boolean): void {
        this.floorCollider.change(x, z, level, add);
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
        const locLayer: LocLayer = LocShapes.layer(shape);
        if (locLayer === LocLayer.WALL) {
            this.wallCollider.change(x, z, level, angle, shape, blockrange, add);
        } else if (locLayer === LocLayer.GROUND) {
            if (angle === LocAngle.NORTH || angle === LocAngle.SOUTH) {
                this.locCollider.change(x, z, level, length, width, blockrange, add);
            } else {
                this.locCollider.change(x, z, level, width, length, blockrange, add);
            }
        } else if (locLayer === LocLayer.GROUND_DECOR) {
            if (active === 1) {
                this.floorCollider.change(x, z, level, add);
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
        this.npcCollider.change(x, z, level, size, add);
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
        this.playerCollider.change(x, z, level, size, add);
    }

    /**
     * Change collision at a specified Position for roofs.
     * @param x The x pos.
     * @param z The z pos.
     * @param level The level pos.
     * @param add True if adding this collision. False if removing.
     */
    changeRoofCollision(x: number, z: number, level: number, add: boolean): void {
        this.roofCollider.change(x, z, level, add);
    }

    private decodeLands(lands: Int8Array, packet: Packet): void {
        for (let level: number = 0; level < 4; level++) {
            for (let x: number = 0; x < 64; x++) {
                for (let z: number = 0; z < 64; z++) {
                    lands[this.packCoord(x, z, level)] = this.decodeLand(packet);
                }
            }
        }
    }

    private applyLandCollision(mapsquareX: number, mapsquareZ: number, lands: Int8Array): void {
        for (let level: number = 0; level < 4; level++) {
            for (let x: number = 0; x < 64; x++) {
                const absoluteX: number = x + mapsquareX;

                for (let z: number = 0; z < 64; z++) {
                    const absoluteZ: number = z + mapsquareZ;

                    if (x % 7 === 0 && z % 7 === 0) { // allocate per zone
                        this.flags.allocateIfAbsent(absoluteX, absoluteZ, level);
                    }

                    const land: number = lands[this.packCoord(x, z, level)];
                    if ((land & 0x4) !== 0) {
                        this.changeRoofCollision(absoluteX, absoluteZ, level, true);
                    }
                    if ((land & 0x1) !== 1) {
                        continue;
                    }

                    const adjustedLevel: number = (lands[this.packCoord(x, z, 1)] & 0x2) === 2 ? level - 1 : level;
                    if (adjustedLevel < 0) {
                        continue;
                    }

                    this.changeLandCollision(absoluteX, absoluteZ, adjustedLevel, true);
                }
            }
        }
    }

    private applyLocCollision(zoneManager: ZoneManager, locs: number[], mapsquareX: number, mapsquareZ: number, lands: Int8Array): void {
        for (let index: number = 0; index < locs.length; index++) {
            const packed: number = locs[index];
            const {id, shape, coord, angle} = this.unpackLoc(packed);
            const {x, z, level} = this.unpackCoord(coord);

            const absoluteX: number = x + mapsquareX;
            const absoluteZ: number = z + mapsquareZ;

            const adjustedLevel: number = (lands[this.packCoord(x, z, 1)] & 0x2) === 2 ? level - 1 : level;
            if (adjustedLevel < 0) {
                continue;
            }

            const type: LocType = LocType.get(id);
            const width: number = type.width;
            const length: number = type.length;

            zoneManager.getZone(absoluteX, absoluteZ, adjustedLevel).addStaticLoc(new Loc(adjustedLevel, absoluteX, absoluteZ, width, length, id, shape, angle));

            if (type.blockwalk) {
                this.changeLocCollision(shape, angle, type.blockrange, length, width, type.active, absoluteX, absoluteZ, adjustedLevel, true);
            }
        }
    }

    private decodeLand(packet: Packet, collision: number = 0): number {
        const opcode: number = packet.g1();
        if (opcode === 0 || opcode === 1) {
            if (opcode === 1) {
                packet.g1();
            }
            return collision;
        }
        if (opcode >= 2 && opcode <= 49) {
            packet.g1s();
        }
        return this.decodeLand(packet, opcode >= 50 && opcode <= 81 ? opcode - 49 : collision);
    }

    private decodeLocs(locs: number[], packet: Packet): void {
        let locId: number = -1;
        let locIdOffset: number = packet.gsmart();

        while (locIdOffset !== 0) {
            locId += locIdOffset;

            let coord: number = 0;
            let coordOffset: number = packet.gsmart();

            while (coordOffset !== 0) {
                coord += coordOffset - 1;

                const attributes: number = packet.g1();
                locs.push(this.packLoc(locId, attributes >> 2, attributes & 0x3, coord));

                coordOffset = packet.gsmart();
            }
            locIdOffset = packet.gsmart();
        }
    }

    private packCoord(x: number, z: number, level: number): number {
        return (z & 0x3f) | ((x & 0x3f) << 6) | ((level & 0x3) << 12);
    }

    private unpackCoord(packed: number): { level: number; x: number; z: number } {
        const z: number = packed & 0x3f;
        const x: number = (packed >> 6) & 0x3f;
        const level: number = (packed >> 12) & 0x3;
        return { x, z, level };
    }

    private packLoc(id: number, shape: number, angle: number, coord: number): number {
        const lowBits: number = (id & 0xffff) | ((shape & 0x1f) << 16) | ((angle & 0x3) << 21);
        const highBits: number = coord & 0x3fff;
        return lowBits + highBits * CollisionManager.SHIFT_23;
    }

    private unpackLoc(packed: number): { coord: number; shape: number; angle: number; id: number } {
        const id: number = packed & 0xffff;
        const shape: number = (packed >> 16) & 0x1f;
        const angle: number = (packed >> 21) & 0x3;
        const coord: number = (packed / CollisionManager.SHIFT_23) & 0x3fff;
        return { id, shape, angle, coord };
    }
}
