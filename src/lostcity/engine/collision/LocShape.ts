import { LocLayer } from '#lostcity/engine/collision/LocLayer.js';

export enum LocShape {
    WALL_STRAIGHT,
    WALL_DIAGONAL_CORNER,
    WALL_L,
    WALL_SQUARE_CORNER,
    WALLDECOR_STRAIGHT_NOOFFSET,
    WALLDECOR_STRAIGHT_OFFSET,
    WALLDECOR_DIAGONAL_OFFSET,
    WALLDECOR_DIAGONAL_NOOFFSET,
    WALLDECOR_DIAGONAL_BOTH,
    WALL_DIAGONAL,
    CENTREPIECE_STRAIGHT,
    CENTREPIECE_DIAGONAL,
    ROOF_STRAIGHT,
    ROOF_DIAGONAL_WITH_ROOFEDGE,
    ROOF_DIAGONAL,
    ROOF_L_CONCAVE,
    ROOF_L_CONVEX,
    ROOF_FLAT,
    ROOFEDGE_STRAIGHT,
    ROOFEDGE_DIAGONAL_CORNER,
    ROOFEDGE_L,
    ROOFEDGE_SQUARE_CORNER,
    GROUND_DECOR
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
