import CollisionFlagMap from "#rsmod/collision/CollisionFlagMap.js";
import StepEvaluator from "#lostcity/engine/collision/StepEvaluator.js";
import FloorCollider from "#lostcity/engine/collision/FloorCollider.js";
import WallCollider from "#lostcity/engine/collision/WallCollider.js";
import LocCollider from "#lostcity/engine/collision/LocCollider.js";
import StepValidator from "#rsmod/StepValidator.js";
import fs from 'fs';
import Packet from "#jagex2/io/Packet.js";
import {LocShape, LocShapes} from "#lostcity/engine/collision/LocShape.js";
import {LocRotation} from "#lostcity/engine/collision/LocRotation.js";
import LocType from "#lostcity/cache/LocType.js";
import {LocLayer} from "#lostcity/engine/collision/LocLayer.js";

export default class CollisionManager {
    readonly collisionFlagMap: CollisionFlagMap;
    private readonly floorCollider: FloorCollider
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
        console.time('Loading maps');

        const lands = new Map<number, number>();
        const locs = new Map<number, number>();

        const maps = fs.readdirSync('data/pack/server/maps').filter(x => x[0] === 'm');
        for (let i = 0; i < maps.length; i++) {
            const [mapsquareX, mapsquareZ] = maps[i].substring(1).split('_').map(x => parseInt(x));

            const landMap = Packet.load(`data/pack/server/maps/m${mapsquareX}_${mapsquareZ}`);
            const locMap = Packet.load(`data/pack/server/maps/l${mapsquareX}_${mapsquareZ}`);

            for (let level = 0; level < 4; level++) {
                for (let x = 0; x < 64; x++) {
                    for (let z = 0; z < 64; z++) {
                        const coord = this.packCoord(x, z, level);
                        lands.set(coord, this.decodeLand(landMap));
                    }
                }
            }

            this.decodeLocs(locs, locMap);

            for (const [key, value] of lands) {
                const collision = (value >> 22) & 0x1F;
                if ((collision & 0x1) != 1) {
                    continue;
                }
                const x = key & 0x3F;
                const z = (key >> 6) & 0x3F;
                const level = (key >> 12) & 0x3;
                const adjustedCoord = this.packCoord(x, z, 1);
                const adjustedLand = lands.get(adjustedCoord);
                if (adjustedLand == undefined) {
                    throw new Error(`Invalid adjusted land. Coord was: ${adjustedCoord}`);
                }
                const adjustedCollision = (adjustedLand >> 22) & 0x1F;
                const adjustedLevel = (adjustedCollision & 0x2) == 2 ? level - 1 : level;
                if (adjustedLevel < 0) {
                    continue;
                }
                this.changeLandCollision((x + mapsquareX) << 6, (z + mapsquareZ) << 6, adjustedLevel, true);
            }
            for (const [key, value] of locs) {
                const x = key & 0x3F;
                const z = (key >> 6) & 0x3F;
                const level = (key >> 12) & 0x3;
                const adjustedCoord = this.packCoord(x, z, 1);
                const adjustedLand = lands.get(adjustedCoord);
                if (adjustedLand == undefined) {
                    throw new Error(`Invalid adjusted land. Coord was: ${adjustedCoord}`);
                }
                const adjustedCollision = (adjustedLand >> 22) & 0x1F;
                const adjustedLevel = (adjustedCollision & 0x2) == 2 ? level - 1 : level;
                if (adjustedLevel < 0) {
                    continue;
                }
                const locId = value & 0xFFFF;
                const shape = (value >> 16) & 0x1F;
                const rotation = (value >> 21) & 0x3;
                this.changeLocCollision(locId, shape, rotation, (x + mapsquareX) << 6, (z + mapsquareZ) << 6, adjustedLevel, true)
            }
        }

        console.timeEnd('Loading maps');
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
        const locShape = Object.values(LocShape)[shape] as LocShape;
        const locRotation = Object.values(LocRotation)[rotation] as LocRotation;
        switch (LocShapes.layer(locShape)) {
            case LocLayer.WALL:
                this.wallCollider.change(x, z, level, locRotation, locShape, blockproj, add);
                break;
            case LocLayer.GROUND:
                switch (locRotation) {
                    case LocRotation.NORTH:
                    case LocRotation.SOUTH:
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

    private decodeLand(
        packet: Packet,
        height: number = 0,
        overlayId: number = 0,
        overlayPath: number = 0,
        overlayRotation: number = 0,
        collision: number = 0,
        underlayId: number = 0
    ): number {
        const opcode = packet.g1();
        if (opcode == 0 || opcode == 1) {
            return this.packLand(
                opcode == 1 ? packet.g1() : height,
                overlayId,
                overlayPath,
                overlayRotation,
                collision,
                underlayId
            );
        }
        return this.decodeLand(
            packet,
            height,
            opcode >= 2 && opcode <= 49 ? packet.g1s() : overlayId,
            opcode >= 2 && opcode <= 49 ? (opcode - 2) / 4 : overlayPath,
            opcode >= 2 && opcode <= 49 ? (opcode - 2) & 3 : overlayRotation,
            opcode >= 50 && opcode <= 81 ? opcode - 49 : collision,
            opcode > 81 ? opcode - 81 : underlayId
        );
    }

    private decodeLocs(
        locs: Map<number, number>,
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
        locs: Map<number, number>,
        packet: Packet,
        locId: number,
        packed: number
    ): void {
        const offset = packet.gsmart();
        if (offset == 0) {
            return;
        }
        const attributes = packet.g1();
        const shape = attributes >> 2
        const rotation = attributes & 0x3
        const coord = packed + offset - 1;
        locs.set(coord, this.packLoc(locId, shape, rotation));
        return this.decodeLoc(locs, packet, locId, coord);
    }

    private packCoord(
        x: number,
        z: number,
        level: number
    ): number {
        return ((x & 0x3F) |
            ((z & 0x3F) << 6) |
            ((level & 0x3) << 12));
    }

    private packLand(
        height: number,
        overlayId: number,
        overlayPath: number,
        overlayRotation: number,
        collision: number,
        underlayId: number
    ): number {
        return ((height & 0xff) |
            ((overlayId & 0x7F) << 8) |
            ((overlayPath & 0x1F) << 15) |
            ((overlayRotation & 0x3) << 20) |
            ((collision & 0x1F) << 22) |
            ((underlayId & 0x7F) << 27));
    }

    private packLoc(
        id: number,
        shape: number,
        rotation: number
    ): number {
        return ((id & 0xFFFF) |
            ((shape & 0x1F) << 16) |
            ((rotation & 0x3) << 21));
    }
}