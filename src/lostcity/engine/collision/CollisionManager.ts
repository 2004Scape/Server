import fs from 'fs';

import Packet from '#jagex2/io/Packet.js';

import StepValidator from '#rsmod/StepValidator.js';
import PathFinder from '#rsmod/PathFinder.js';
import LinePathFinder from '#rsmod/LinePathFinder.js';
import CollisionFlagMap from '#rsmod/collision/CollisionFlagMap.js';
import CollisionStrategies from '#rsmod/collision/CollisionStrategies.js';
import CollisionFlag from '#rsmod/flag/CollisionFlag.js';

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

import LocType from '#lostcity/cache/LocType.js';

import Loc from '#lostcity/entity/Loc.js';
import MoveRestrict from '#lostcity/entity/MoveRestrict.js';

export default class CollisionManager {
    private static readonly SHIFT_23 = Math.pow(2, 23);

    private readonly floorCollider: FloorCollider;
    private readonly wallCollider: WallCollider;
    private readonly locCollider: LocCollider;
    private readonly npcCollider: NpcCollider;
    private readonly roofCollider: RoofCollider;
    private readonly playerCollider: PlayerCollider;
    private readonly stepValidator: StepValidator;

    readonly flags: CollisionFlagMap;
    readonly pathFinder: PathFinder;
    readonly linePathFinder: LinePathFinder;

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
        this.linePathFinder = new LinePathFinder(this.flags);
    }

    init(zoneManager: ZoneManager) {
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

                        this.flags.allocateIfAbsent(absoluteX, absoluteZ, level);

                        if ((land & 0x4) != 0) {
                            this.changeRoofCollision(absoluteX, absoluteZ, level, true);
                        }

                        if ((land & 0x1) != 1) {
                            continue;
                        }

                        const adjustedCoord = this.packCoord(x, z, 1);
                        const adjustedLand = landMap[adjustedCoord];
                        const adjustedLevel = (adjustedLand & 0x2) == 2 ? level - 1 : level;
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
                const packed = locMap[i];
                const unpackedLoc = this.unpackLoc(packed);
                const unpackedCoord = this.unpackCoord(unpackedLoc.coord);

                const { x, z, level } = unpackedCoord;
                const absoluteX = x + mapsquareX;
                const absoluteZ = z + mapsquareZ;

                const adjustedCoord = this.packCoord(x, z, 1);
                const adjustedLand = landMap[adjustedCoord];

                const adjustedLevel = (adjustedLand & 0x2) == 2 ? level - 1 : level;
                if (adjustedLevel < 0) {
                    continue;
                }

                const locId = unpackedLoc.id;
                const shape = unpackedLoc.shape;
                const angle = unpackedLoc.angle;

                const type = LocType.get(locId);
                const width = type.width;
                const length = type.length;

                const loc = new Loc(
                    adjustedLevel,
                    absoluteX,
                    absoluteZ,
                    width,
                    length,
                    locId,
                    shape,
                    angle
                );

                zoneManager.getZone(absoluteX, absoluteZ, adjustedLevel).addStaticLoc(loc);

                if (type.blockwalk) {
                    this.changeLocCollision(shape, angle, type.blockrange, length, width, type.active, absoluteX, absoluteZ, adjustedLevel, true);
                }
            }
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
    changeLandCollision(
        x: number,
        z: number,
        level: number,
        add: boolean
    ): void {
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
    changeLocCollision(
        shape: number,
        angle: number,
        blockrange: boolean,
        length: number,
        width: number,
        active: number,
        x: number,
        z: number,
        level: number,
        add: boolean,
    ): void {
        switch (LocShapes.layer(shape)) {
            case LocLayer.WALL:
                this.wallCollider.change(x, z, level, angle, shape, blockrange, add);
                break;
            case LocLayer.GROUND:
                switch (angle) {
                    case LocAngle.NORTH:
                    case LocAngle.SOUTH:
                        this.locCollider.change(x, z, level, length, width, blockrange, add);
                        break;
                    default:
                        this.locCollider.change(x, z, level, width, length, blockrange, add);
                        break;
                }
                break;
            case LocLayer.GROUND_DECOR:
                if (active === 1) {
                    this.floorCollider.change(x, z, level, add);
                }
                break;
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
    changeNpcCollision(
        size: number,
        x: number,
        z: number,
        level: number,
        add: boolean
    ): void {
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
    changePlayerCollision(
        size: number,
        x: number,
        z: number,
        level: number,
        add: boolean
    ): void {
        this.playerCollider.change(x, z, level, size, add);
    }

    /**
     * Change collision at a specified Position for roofs.
     * @param x The x pos.
     * @param z The z pos.
     * @param level The level pos.
     * @param add True if adding this collision. False if removing.
     */
    changeRoofCollision(
        x: number,
        z: number,
        level: number,
        add: boolean
    ): void {
        this.roofCollider.change(x, z, level, add);
    }

    /**
     * Returns if a specified Position with equated offsets/size/extraFlag
     * is able to travel with a specified collision strategy.
     * @param level The level pos.
     * @param x The x pos.
     * @param z The z pos.
     * @param offsetX The x pos offset.
     * @param offsetZ The z pos offset.
     * @param size The size of this travelling strategy.
     * @param extraFlag Extra collision flag to check for travelling.
     * @param moveRestrict The move restrict collision strategy for travelling.
     */
    canTravelWithStrategy(
        level: number,
        x: number,
        z: number,
        offsetX: number,
        offsetZ: number,
        size: number,
        extraFlag: number,
        moveRestrict: MoveRestrict
    ): boolean {
        switch (moveRestrict) {
            case MoveRestrict.NORMAL:
                // Can check for extraFlag like npc block flag.
                return this.stepValidator.canTravel(level, x, z, offsetX, offsetZ, size, extraFlag, CollisionStrategies.NORMAL);
            case MoveRestrict.BLOCKED:
                // Does not check for any extra flags.
                return this.stepValidator.canTravel(level, x, z, offsetX, offsetZ, size, CollisionFlag.OPEN, CollisionStrategies.BLOCKED);
            case MoveRestrict.BLOCKED_NORMAL:
                // Can check for extraFlag like npc block flag.
                return this.stepValidator.canTravel(level, x, z, offsetX, offsetZ, size, extraFlag, CollisionStrategies.LINE_OF_SIGHT);
            case MoveRestrict.INDOORS:
                // Can check for extraFlag like npc block flag.
                return this.stepValidator.canTravel(level, x, z, offsetX, offsetZ, size, extraFlag, CollisionStrategies.INDOORS);
            case MoveRestrict.OUTDOORS:
                // Can check for extraFlag like npc block flag.
                return this.stepValidator.canTravel(level, x, z, offsetX, offsetZ, size, extraFlag, CollisionStrategies.OUTDOORS);
            case MoveRestrict.NOMOVE:
                return false;
            case MoveRestrict.PASSTHRU:
                // No extra flag checks for passthru.
                return this.stepValidator.canTravel(level, x, z, offsetX, offsetZ, size, CollisionFlag.OPEN, CollisionStrategies.NORMAL);
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

    private decodeLocs(locs: Array<number>, packet: Packet): void {
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
                const angle = attributes & 0x3;
                locs.push(this.packLoc(locId, shape, angle, coord));

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
        return ((z & 0x3F) | ((x & 0x3F) << 6) | ((level & 0x3) << 12));
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
        angle: number,
        coord: number
    ): number {
        const lowBits = (id & 0xFFFF) | ((shape & 0x1F) << 16) | ((angle & 0x3) << 21);
        const highBits = (coord & 0x3FFF);
        return lowBits + (highBits * CollisionManager.SHIFT_23);
    }

    private unpackLoc(packed: number) {
        const id = packed & 0xFFFF;
        const shape = (packed >> 16) & 0x1F;
        const angle = (packed >> 21) & 0x3;
        const coord = (packed / CollisionManager.SHIFT_23) & 0x3FFF;
        return { id, shape, angle, coord };
    }
}
