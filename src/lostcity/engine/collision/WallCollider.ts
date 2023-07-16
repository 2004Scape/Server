import CollisionFlagMap from "#rsmod/collision/CollisionFlagMap.js";
import {LocRotation} from "#lostcity/engine/collision/LocRotation";
import {LocShape, LocShapes} from "#lostcity/engine/collision/LocShape";
import WallStraightCollider from "#lostcity/engine/collision/wall/WallStraightCollider";
import WallCornerCollider from "#lostcity/engine/collision/wall/WallCornerCollider";
import WallCornerLCollider from "#lostcity/engine/collision/wall/WallCornerLCollider";

export default class FloorCollider {
    private readonly flags: CollisionFlagMap;
    private readonly wallStraightCollider: WallStraightCollider;
    private readonly wallCornerCollider: WallCornerCollider;
    private readonly wallCornerLCollider: WallCornerLCollider;

    constructor(flags: CollisionFlagMap) {
        this.flags = flags;
        this.wallStraightCollider = new WallStraightCollider(flags);
        this.wallCornerCollider = new WallCornerCollider(flags);
        this.wallCornerLCollider = new WallCornerLCollider(flags);
    }

    change(
        x: number,
        z: number,
        level: number,
        rotation: LocRotation,
        shape: LocShape,
        blockproj: boolean,
        add: boolean
    ): void {
        switch (shape) {
            case LocShape.WALL_STRAIGHT:
                this.wallStraightCollider.change(x, z, level, rotation, blockproj, add);
                break;
            case LocShape.WALL_DIAGONAL_CORNER:
            case LocShape.WALL_SQUARE_CORNER:
                this.wallCornerCollider.change(x, z, level, rotation, blockproj, add);
                break;
            case LocShape.WALL_L:
                this.wallCornerLCollider.change(x, z, level, rotation, blockproj, add);
                break;
            default:
                throw new Error(`Invalid loc shape for wall collider. Shape was: ${shape}.`)
        }
    }
}