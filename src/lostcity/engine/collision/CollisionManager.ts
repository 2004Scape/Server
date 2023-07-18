// noinspection DuplicatedCode

import CollisionFlagMap from '#rsmod/collision/CollisionFlagMap.js';
import StepEvaluator from '#lostcity/engine/collision/StepEvaluator.js';
import FloorCollider from '#lostcity/engine/collision/FloorCollider.js';
import WallCollider from '#lostcity/engine/collision/WallCollider.js';
import LocCollider from '#lostcity/engine/collision/LocCollider.js';
import StepValidator from '#rsmod/StepValidator.js';
import fs from 'fs';
import Packet from '#jagex2/io/Packet.js';
import LocShape from '#lostcity/engine/collision/LocShape.js';
import {LocRotations} from '#lostcity/engine/collision/LocRotations.js';
import LocType from '#lostcity/cache/LocType.js';
import {LocLayer} from '#lostcity/engine/collision/LocLayer.js';
import LocRotation from '#lostcity/engine/collision/LocRotation.js';

export default class CollisionManager {
    private static readonly SHIFT_23 = Math.pow(2, 23);

    readonly collisionFlagMap: CollisionFlagMap;
    private readonly floorCollider: FloorCollider;
    private readonly wallCollider: WallCollider;
    private readonly locCollider: LocCollider;

    readonly stepEvaluator: StepEvaluator;

    constructor() {
        this.collisionFlagMap = new CollisionFlagMap();
        this.stepEvaluator = new StepEvaluator(new StepValidator(this.collisionFlagMap));
        this.floorCollider = new FloorCollider(this.collisionFlagMap);
        this.wallCollider = new WallCollider(this.collisionFlagMap);
        this.locCollider = new LocCollider(this.collisionFlagMap);
    }

    init() {
        console.time('Loading collision');

        // Key = mapsquareId, Value = array of packed land/loc for map square id.
        const lands = new Map<number, Array<number>>();
        const locs = new Map<number, Array<number>>();

        const maps = fs.readdirSync('data/pack/server/maps').filter(x => x[0] === 'm');
        for (let index = 0; index < maps.length; index++) {
            const [fileX, fileZ] = maps[index].substring(1).split('_').map(x => parseInt(x));
            const mapsquareX = fileX << 6;
            const mapsquareZ = fileZ << 6;
            const mapsquareId = fileX << 8 | fileZ;

            const landData = Packet.load(`data/pack/server/maps/m${fileX}_${fileZ}`);
            lands.set(mapsquareId, new Array<number>(4 * 64 * 64)); // 4 * 64 * 64 size is guaranteed for lands

            const landMap = lands.get(mapsquareId)!;
            this.decodeLands(landMap, landData);

            for (let level = 0; level < 4; level++) {
                for (let x = 0; x < 64; x++) {
                    const absoluteX = x + mapsquareX;

                    for (let z = 0; z < 64; z++) {
                        const absoluteZ = z + mapsquareZ;
                        const coord = this.packCoord(x, z, level);
                        const land = landMap[coord];

                        this.collisionFlagMap.allocateIfAbsent(absoluteX, absoluteZ, level);
                        if ((land & 0x1) != 1) {
                            continue;
                        }

                        const firstLevelCoord = this.packCoord(x, z, 1);
                        const firstLevelLand = landMap[firstLevelCoord];
                        const adjustedLevel = (firstLevelLand & 0x2) == 2 ? 1 : 0;
                        if (adjustedLevel < 0) {
                            continue;
                        }

                        this.changeLandCollision(absoluteX, absoluteZ, adjustedLevel, true);
                    }
                }
            }

            const locData = Packet.load(`data/pack/server/maps/l${fileX}_${fileZ}`);
            locs.set(mapsquareId, new Array<number>()); // Dynamically grow locs depending on what's decoded

            const locMap = locs.get(mapsquareId)!;
            this.decodeLocs(locMap, locData);

            for (let i = 0; i < locMap.length; i++) {
                const loc = locMap[i];
                const unpackedLoc = this.unpackLoc(loc);
                const unpackedCoord = this.unpackCoord(unpackedLoc.coord);

                const x = unpackedCoord.x;
                const z = unpackedCoord.z;
                const level = unpackedCoord.level;
                const absoluteX = x + mapsquareX;
                const absoluteZ = z + mapsquareZ;

                const adjustedCoord = this.packCoord(x, z, 1);
                const adjustedLand = landMap[adjustedCoord];

                const adjustedLevel = (adjustedLand & 0x2) == 2 ? level - 1 : level;
                if (adjustedLevel < 0) {
                    continue;
                }

                this.changeLocCollision(unpackedLoc.id, unpackedLoc.shape, unpackedLoc.rotation, absoluteX, absoluteZ, adjustedLevel, true);
            }
        }
        console.timeEnd('Loading collision');
    }

    changeLandCollision(
        x: number,
        z: number,
        level: number,
        add: boolean
    ): void {
        this.floorCollider.change(x, z, level, add);
    }

    changeLocCollision(
        id: number,
        shape: number,
        rotation: number,
        x: number,
        z: number,
        level: number,
        add: boolean
    ) {
        const loc = LocType.get(id);
        if (!loc) {
            // means we're loading newer data, expect a client crash here!
            console.log(`Missing loc during collision. Loc id was: ${id}`);
            return;
        }
        const blockwalk = loc.blockwalk;
        // Blockwalk is required to apply collision changes.
        if (!blockwalk) {
            return;
        }

        const blockproj = loc.blockrange;
        const locShape = LocShape.shape(shape);
        const locRotation = LocRotation.rotation(rotation);
        switch (LocShape.layer(locShape)) {
            case LocLayer.WALL:
                this.wallCollider.change(x, z, level, locRotation, locShape, blockproj, add);
                break;
            case LocLayer.GROUND:
                switch (locRotation) {
                    case LocRotations.NORTH:
                    case LocRotations.SOUTH:
                        this.locCollider.change(x, z, level, loc.length, loc.width, blockproj, add);
                        break;
                    default:
                        this.locCollider.change(x, z, level, loc.width, loc.length, blockproj, add);
                        break;
                }
                break;
            case LocLayer.GROUND_DECOR:
                if (loc.active == 1) {
                    this.floorCollider.change(x, z, level, add);
                }
                break;
        }
    }

    private decodeLands(lands: Array<number>, packet: Packet): void {
        for (let level = 0; level < 4; level++) {
            for (let x = 0; x < 64; x++) {
                for (let z = 0; z < 64; z++) {
                    const collision = this.decodeLand(packet);
                    const coord = this.packCoord(x, z, level);
                    lands[coord] = collision;
                }
            }
        }
    }

    private decodeLand(packet: Packet, collision: number = 0): number {
        const opcode = packet.g1();
        if (opcode == 0 || opcode == 1) {
            if (opcode == 1) {
                packet.g1();
            }
            return collision;
        }
        if (opcode >= 2 && opcode <= 49) {
            packet.g1s();
        }
        return this.decodeLand(packet, opcode >= 50 && opcode <= 81 ? opcode - 49 : collision);
    }

    private decodeLocs(
        locs: Array<number>,
        packet: Packet
    ): void {
        let locId = -1;
        let locIdOffset = packet.gsmart();

        while (locIdOffset != 0) {
            locId += locIdOffset;

            let coord = 0;
            let coordOffset = packet.gsmart();

            while (coordOffset != 0) {
                coord += coordOffset - 1;

                const attributes = packet.g1();
                const shape = attributes >> 2;
                const rotation = attributes & 0x3;
                locs.push(this.packLoc(locId, shape, rotation, coord));

                coordOffset = packet.gsmart();
            }

            locIdOffset = packet.gsmart();
        }
    }

    private packCoord(
        x: number,
        z: number,
        level: number
    ): number {
        return ((z & 0x3F) |
            ((x & 0x3F) << 6) |
            ((level & 0x3) << 12));
    }

    private unpackCoord(packed: number) {
        const z = packed & 0x3F;
        const x = (packed >> 6) & 0x3F;
        const level = (packed >> 12) & 0x3;
        return { x, z, level };
    }

    private packLoc(
        id: number,
        shape: number,
        rotation: number,
        coord: number
    ): number {
        const lowBits = (id & 0xFFFF) |
            ((shape & 0x1F) << 16) |
            ((rotation & 0x3) << 21);
        const highBits = (coord & 0x3FFF);
        return lowBits + (highBits * CollisionManager.SHIFT_23);
    }

    private unpackLoc(packed: number) {
        const id = packed & 0xFFFF;
        const shape = (packed >> 16) & 0x1F;
        const rotation = (packed >> 21) & 0x3;
        const coord = (packed / CollisionManager.SHIFT_23) & 0x3FFF;
        return { id, shape, rotation, coord };
    }
}
