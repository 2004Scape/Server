import CollisionFlag from '../flag/CollisionFlag.js';
import CollisionStrategy from './CollisionStrategy.js';

class Normal implements CollisionStrategy {
    canMove(tileFlag: number, blockFlag: number): boolean {
        return (tileFlag & blockFlag) === CollisionFlag.OPEN;
    }
}

class Blocked implements CollisionStrategy {
    canMove(tileFlag: number, blockFlag: number): boolean {
        const flag = blockFlag & ~CollisionFlag.FLOOR;
        return (tileFlag & flag) == 0 && (tileFlag & CollisionFlag.FLOOR) != CollisionFlag.OPEN;
    }
}

class Indoors implements CollisionStrategy {
    canMove(tileFlag: number, blockFlag: number): boolean {
        return (tileFlag & blockFlag) == 0 && (tileFlag & CollisionFlag.ROOF) != CollisionFlag.OPEN;
    }
}

class Outdoors implements CollisionStrategy {
    canMove(tileFlag: number, blockFlag: number): boolean {
        return (tileFlag & (blockFlag | CollisionFlag.ROOF)) == CollisionFlag.OPEN;
    }
}

class LineOfSight implements CollisionStrategy {
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

export default class CollisionStrategies {
    static NORMAL: CollisionStrategy = new Normal();
    static BLOCKED: CollisionStrategy = new Blocked();
    static INDOORS: CollisionStrategy = new Indoors();
    static OUTDOORS: CollisionStrategy = new Outdoors();
    static LINE_OF_SIGHT: CollisionStrategy = new LineOfSight();
}
