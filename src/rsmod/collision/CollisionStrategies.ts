import CollisionFlag from '../flag/CollisionFlag.js';
import CollisionStrategy from './CollisionStrategy.js';

export class Normal implements CollisionStrategy {
    canMove(tileFlag: number, blockFlag: number): boolean {
        return (tileFlag & blockFlag) === CollisionFlag.OPEN;
    }
}

export class Blocked implements CollisionStrategy {
    canMove(tileFlag: number, blockFlag: number): boolean {
        const flag = blockFlag & ~CollisionFlag.FLOOR;
        return (tileFlag & flag) == 0 && (tileFlag & CollisionFlag.FLOOR) != CollisionFlag.OPEN;
    }
}

export class Indoors implements CollisionStrategy {
    canMove(tileFlag: number, blockFlag: number): boolean {
        return (tileFlag & blockFlag) == 0 && (tileFlag & CollisionFlag.ROOF) != CollisionFlag.OPEN;
    }
}

export class Outdoors implements CollisionStrategy {
    canMove(tileFlag: number, blockFlag: number): boolean {
        return (tileFlag & (blockFlag | CollisionFlag.ROOF)) == CollisionFlag.OPEN;
    }
}

export class LineOfSight implements CollisionStrategy {
    static BLOCK_MOVEMENT: number = CollisionFlag.WALL_NORTH_WEST |
        CollisionFlag.WALL_NORTH |
        CollisionFlag.WALL_NORTH_EAST |
        CollisionFlag.WALL_EAST |
        CollisionFlag.WALL_SOUTH_EAST |
        CollisionFlag.WALL_SOUTH |
        CollisionFlag.WALL_SOUTH_WEST |
        CollisionFlag.WALL_WEST |
        CollisionFlag.LOC;

    canMove(tileFlag: number, blockFlag: number): boolean {
        const movementFlags = (blockFlag & LineOfSight.BLOCK_MOVEMENT) << 9
        return (tileFlag & movementFlags) == CollisionFlag.OPEN
    }
}
