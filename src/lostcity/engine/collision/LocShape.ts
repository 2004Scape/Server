import { LocLayer } from '#lostcity/engine/collision/LocLayer.js';

export enum LocShape {
    WALL_STRAIGHT = 0,
    WALL_DIAGONAL_CORNER = 1,
    WALL_L = 2,
    WALL_SQUARE_CORNER = 3,
    WALLDECOR_STRAIGHT_NOOFFSET = 4,
    WALLDECOR_STRAIGHT_OFFSET = 5,
    WALLDECOR_DIAGONAL_OFFSET = 6,
    WALLDECOR_DIAGONAL_NOOFFSET = 7,
    WALLDECOR_DIAGONAL_BOTH = 8,
    WALL_DIAGONAL = 9,
    CENTREPIECE_STRAIGHT = 10,
    CENTREPIECE_DIAGONAL = 11,
    ROOF_STRAIGHT = 12,
    ROOF_DIAGONAL_WITH_ROOFEDGE = 13,
    ROOF_DIAGONAL = 14,
    ROOF_L_CONCAVE = 15,
    ROOF_L_CONVEX = 16,
    ROOF_FLAT = 17,
    ROOFEDGE_STRAIGHT = 18,
    ROOFEDGE_DIAGONAL_CORNER = 19,
    ROOFEDGE_L = 20,
    ROOFEDGE_SQUARE_CORNER = 21,
    GROUND_DECOR = 22
}

export class LocShapes {
    static layer(shape: LocShape): LocLayer {
        switch (shape) {
            case LocShape.WALL_STRAIGHT:
            case LocShape.WALL_DIAGONAL_CORNER:
            case LocShape.WALL_L:
            case LocShape.WALL_SQUARE_CORNER:
                return LocLayer.WALL;
            case LocShape.WALLDECOR_STRAIGHT_NOOFFSET:
            case LocShape.WALLDECOR_STRAIGHT_OFFSET:
            case LocShape.WALLDECOR_DIAGONAL_OFFSET:
            case LocShape.WALLDECOR_DIAGONAL_NOOFFSET:
            case LocShape.WALLDECOR_DIAGONAL_BOTH:
                return LocLayer.WALL_DECOR;
            case LocShape.WALL_DIAGONAL:
            case LocShape.CENTREPIECE_STRAIGHT:
            case LocShape.CENTREPIECE_DIAGONAL:
            case LocShape.ROOF_STRAIGHT:
            case LocShape.ROOF_DIAGONAL_WITH_ROOFEDGE:
            case LocShape.ROOF_DIAGONAL:
            case LocShape.ROOF_L_CONCAVE:
            case LocShape.ROOF_L_CONVEX:
            case LocShape.ROOF_FLAT:
            case LocShape.ROOFEDGE_STRAIGHT:
            case LocShape.ROOFEDGE_DIAGONAL_CORNER:
            case LocShape.ROOFEDGE_L:
            case LocShape.ROOFEDGE_SQUARE_CORNER:
                return LocLayer.GROUND;
            case LocShape.GROUND_DECOR:
                return LocLayer.GROUND_DECOR;
            default:
                throw new Error('Invalid loc shape.');
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
