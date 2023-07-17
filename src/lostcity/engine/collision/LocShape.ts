import {LocLayer} from "#lostcity/engine/collision/LocLayer.js";
import {LocShapes} from "#lostcity/engine/collision/LocShapes.js";

export default class LocShape {
    static shape(shape: number): LocShapes {
        switch (shape) {
            case 0:
                return LocShapes.WALL_STRAIGHT;
            case 1:
                return LocShapes.WALL_DIAGONAL_CORNER;
            case 2:
                return LocShapes.WALL_L;
            case 3:
                return LocShapes.WALL_SQUARE_CORNER;
            case 4:
                return LocShapes.WALLDECOR_STRAIGHT_NOOFFSET;
            case 5:
                return LocShapes.WALLDECOR_STRAIGHT_OFFSET;
            case 6:
                return LocShapes.WALLDECOR_DIAGONAL_OFFSET;
            case 7:
                return LocShapes.WALLDECOR_DIAGONAL_NOOFFSET;
            case 8:
                return LocShapes.WALLDECOR_DIAGONAL_BOTH;
            case 9:
                return LocShapes.WALL_DIAGONAL;
            case 10:
                return LocShapes.CENTREPIECE_STRAIGHT;
            case 11:
                return LocShapes.CENTREPIECE_DIAGONAL;
            case 12:
                return LocShapes.ROOF_STRAIGHT;
            case 13:
                return LocShapes.ROOF_DIAGONAL_WITH_ROOFEDGE;
            case 14:
                return LocShapes.ROOF_DIAGONAL;
            case 15:
                return LocShapes.ROOF_L_CONCAVE;
            case 16:
                return LocShapes.ROOF_L_CONVEX;
            case 17:
                return LocShapes.ROOF_FLAT;
            case 18:
                return LocShapes.ROOFEDGE_STRAIGHT;
            case 19:
                return LocShapes.ROOFEDGE_DIAGONAL_CORNER;
            case 20:
                return LocShapes.ROOFEDGE_L;
            case 21:
                return LocShapes.ROOFEDGE_SQUARE_CORNER;
            case 22:
                return LocShapes.GROUND_DECOR;
            default:
                throw new Error("Invalid loc shape.")
        }
    }

    static layer(shape: LocShape): LocLayer {
        switch (shape) {
            case LocShapes.WALL_STRAIGHT:
            case LocShapes.WALL_DIAGONAL_CORNER:
            case LocShapes.WALL_L:
            case LocShapes.WALL_SQUARE_CORNER:
                return LocLayer.WALL;
            case LocShapes.WALLDECOR_STRAIGHT_NOOFFSET:
            case LocShapes.WALLDECOR_STRAIGHT_OFFSET:
            case LocShapes.WALLDECOR_DIAGONAL_OFFSET:
            case LocShapes.WALLDECOR_DIAGONAL_NOOFFSET:
            case LocShapes.WALLDECOR_DIAGONAL_BOTH:
                return LocLayer.WALL_DECOR;
            case LocShapes.WALL_DIAGONAL:
            case LocShapes.CENTREPIECE_STRAIGHT:
            case LocShapes.CENTREPIECE_DIAGONAL:
            case LocShapes.ROOF_STRAIGHT:
            case LocShapes.ROOF_DIAGONAL_WITH_ROOFEDGE:
            case LocShapes.ROOF_DIAGONAL:
            case LocShapes.ROOF_L_CONCAVE:
            case LocShapes.ROOF_L_CONVEX:
            case LocShapes.ROOF_FLAT:
            case LocShapes.ROOFEDGE_STRAIGHT:
            case LocShapes.ROOFEDGE_DIAGONAL_CORNER:
            case LocShapes.ROOFEDGE_L:
            case LocShapes.ROOFEDGE_SQUARE_CORNER:
                return LocLayer.GROUND;
            case LocShapes.GROUND_DECOR:
                return LocLayer.GROUND_DECOR;
            default:
                throw new Error("Invalid loc shape.")
        }
    }

    static isWall(shape: LocShape): boolean {
        return this.layer(shape) === LocLayer.WALL;
    }

    static isWallDecor(shape: LocShape): boolean {
        return this.layer(shape) === LocLayer.WALL_DECOR;
    }

    static isGround(shape: LocShape): boolean {
        return this.layer(shape) === LocLayer.GROUND;
    }

    static isGroundDecor(shape: LocShape): boolean {
        return this.layer(shape) === LocLayer.GROUND_DECOR;
    }
}