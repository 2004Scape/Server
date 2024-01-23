import CollisionFlag from '#rsmod/flag/CollisionFlag.js';

export default class Line {
    static SIGHT_BLOCKED_NORTH: number = CollisionFlag.LOC_PROJ_BLOCKER | CollisionFlag.WALL_NORTH_PROJ_BLOCKER;
    static SIGHT_BLOCKED_EAST: number = CollisionFlag.LOC_PROJ_BLOCKER | CollisionFlag.WALL_EAST_PROJ_BLOCKER;
    static SIGHT_BLOCKED_SOUTH: number = CollisionFlag.LOC_PROJ_BLOCKER | CollisionFlag.WALL_SOUTH_PROJ_BLOCKER;
    static SIGHT_BLOCKED_WEST: number = CollisionFlag.LOC_PROJ_BLOCKER | CollisionFlag.WALL_WEST_PROJ_BLOCKER;

    static WALK_BLOCKED_NORTH: number = CollisionFlag.WALL_NORTH | CollisionFlag.WALK_BLOCKED;
    static WALK_BLOCKED_EAST: number = CollisionFlag.WALL_EAST | CollisionFlag.WALK_BLOCKED;
    static WALK_BLOCKED_SOUTH: number = CollisionFlag.WALL_SOUTH | CollisionFlag.WALK_BLOCKED;
    static WALK_BLOCKED_WEST: number = CollisionFlag.WALL_WEST | CollisionFlag.WALK_BLOCKED;

    static HALF_TILE: number = this.scaleUp(1) / 2;

    static scaleUp(tiles: number): number {
        return tiles << 16
    }

    static scaleDown(tiles: number): number {
        return tiles >>> 16;
    }

    static coordinate(a: number, b: number, size: number): number {
        if (a >= b) {
            return a;
        } else if (a + size - 1 <= b) {
            return a + size - 1;
        }
        return b;
    }
}
