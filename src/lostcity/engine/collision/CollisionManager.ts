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

            const landMap = Packet.load(`data/pack/server/maps/m${fileX}_${fileZ}`);
            const locMap = Packet.load(`data/pack/server/maps/l${fileX}_${fileZ}`);

            // 4 * 64 * 64 size is guarantee for lands.
            lands.set(mapsquareId, new Array<number>(4 * 64 * 64));
            // Dynamically grow locs depending on whats decoded.
            locs.set(mapsquareId, new Array<number>());

            this.decodeLands(lands.get(mapsquareId)!, landMap);
            this.decodeLocs(locs.get(mapsquareId)!, locMap);

            for (const land of lands.get(mapsquareId)!) {
                const unpackedLand = this.unpackLand(land);
                const unpackedCoord = this.unpackCoord(unpackedLand.coord);
                const x = unpackedCoord.x;
                const z = unpackedCoord.z;
                const level = unpackedCoord.level;
                const absoluteX = x + mapsquareX;
                const absoluteZ = z + mapsquareZ;
                // There is a possibility of an entire zone not being initialized with zero clipping
                // depending on if that zone contains anything to clip from the cache or not.
                // So this way guarantees every zone in our mapsquares are properly initialized for the pathfinder.
                this.collisionFlagMap.allocateIfAbsent(absoluteX, absoluteZ, level);
                if ((unpackedLand.collision & 0x1) != 1) {
                    continue;
                }
                const adjustedCoord = this.packCoord(x, z, 1);
                const adjustedLand = lands.get(mapsquareId)?.find(x => this.unpackLand(x).coord === adjustedCoord);
                if (!adjustedLand) {
                    throw new Error(`Invalid adjusted land. Coord was: ${adjustedCoord}`);
                }
                const unpackedAdjustedLand = this.unpackLand(adjustedLand);
                const adjustedLevel = (unpackedAdjustedLand.collision & 0x2) == 2 ? level - 1 : level;
                if (adjustedLevel < 0) {
                    continue;
                }
                this.changeLandCollision(absoluteX, absoluteZ, adjustedLevel, true);
            }
            for (const loc of locs.get(mapsquareId)!) {
                const unpackedLoc = this.unpackLoc(loc);
                const unpackedCoord = this.unpackCoord(unpackedLoc.coord);
                const x = unpackedCoord.x;
                const z = unpackedCoord.z;
                const level = unpackedCoord.level;
                const absoluteX = x + mapsquareX;
                const absoluteZ = z + mapsquareZ;
                const adjustedCoord = this.packCoord(x, z, 1);
                const adjustedLand = lands.get(mapsquareId)?.find(x => this.unpackLand(x).coord === adjustedCoord);
                if (!adjustedLand) {
                    throw new Error(`Invalid adjusted land. Coord was: ${adjustedCoord}`);
                }
                const unpackedAdjustedLand = this.unpackLand(adjustedLand);
                const adjustedLevel = (unpackedAdjustedLand.collision & 0x2) == 2 ? level - 1 : level;
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
                    const coord = this.packCoord(x, z, level);
                    const land = this.decodeLand(packet);
                    lands[coord] = this.packLand(land, coord);
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
        packet: Packet,
        locId: number = -1
    ): void {
        const offset = packet.gsmart();
        if (offset == 0) {
            return;
        }
        this.decodeLoc(locs, packet, locId + offset, 0);
        return this.decodeLocs(locs, packet, locId + offset);
    }

    private decodeLoc(
        locs: Array<number>,
        packet: Packet,
        locId: number,
        packed: number
    ): void {
        const offset = packet.gsmart();
        if (offset == 0) {
            return;
        }
        const attributes = packet.g1();
        const shape = attributes >> 2;
        const rotation = attributes & 0x3;
        const coord = packed + offset - 1;
        locs.push(this.packLoc(locId, shape, rotation, coord));
        return this.decodeLoc(locs, packet, locId, coord);
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

    private packLand(
        collision: number,
        coord: number
    ): number {
        return (collision & 0x1F) |
            ((coord & 0x3FFF) << 5);
    }

    private unpackLand(packed: number) {
        const collision = packed & 0x1F;
        const coord = (packed >> 5) & 0x3FFF;
        return { collision, coord };
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
        return lowBits + (highBits * Math.pow(2, 23));
    }

    private unpackLoc(packed: number) {
        const id = packed & 0xFFFF;
        const shape = (packed >> 16) & 0x1F;
        const rotation = (packed >> 21) & 0x3;
        const coord = (packed / Math.pow(2, 23)) & 0x3FFF;
        return { id, shape, rotation, coord };
    }
}
