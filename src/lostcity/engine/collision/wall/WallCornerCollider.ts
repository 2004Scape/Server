import CollisionFlagMap from '#rsmod/collision/CollisionFlagMap.js';
import CollisionFlag from '#rsmod/flag/CollisionFlag.js';
import { LocRotation } from '#lostcity/engine/collision/LocRotation.js';

export default class WallCornerCollider {
    private readonly flags: CollisionFlagMap;

    constructor(flags: CollisionFlagMap) {
        this.flags = flags;
    }

    change(
        x: number,
        z: number,
        level: number,
        rotation: number,
        blockrange: boolean,
        add: boolean
    ): void {
        const northWest = blockrange ? CollisionFlag.WALL_NORTH_WEST_PROJ_BLOCKER : CollisionFlag.WALL_NORTH_WEST;
        const southEast = blockrange ? CollisionFlag.WALL_SOUTH_EAST_PROJ_BLOCKER : CollisionFlag.WALL_SOUTH_EAST;
        const northEast = blockrange ? CollisionFlag.WALL_NORTH_EAST_PROJ_BLOCKER : CollisionFlag.WALL_NORTH_EAST;
        const southWest = blockrange ? CollisionFlag.WALL_SOUTH_WEST_PROJ_BLOCKER : CollisionFlag.WALL_SOUTH_WEST;
        switch (rotation) {
            case LocRotation.WEST:
                if (add) {
                    this.flags.add(x, z, level, northWest);
                    this.flags.add(x - 1, z + 1, level, southEast);
                } else {
                    this.flags.remove(x, z, level, northWest);
                    this.flags.remove(x - 1, z + 1, level, southEast);
                }
                break;
            case LocRotation.NORTH:
                if (add) {
                    this.flags.add(x, z, level, northEast);
                    this.flags.add(x + 1, z + 1, level, southWest);
                } else {
                    this.flags.remove(x, z, level, northEast);
                    this.flags.remove(x + 1, z + 1, level, southWest);
                }
                break;
            case LocRotation.EAST:
                if (add) {
                    this.flags.add(x, z, level, southEast);
                    this.flags.add(x + 1, z - 1, level, northWest);
                } else {
                    this.flags.remove(x, z, level, southEast);
                    this.flags.remove(x + 1, z - 1, level, northWest);
                }
                break;
            case LocRotation.SOUTH:
                if (add) {
                    this.flags.add(x, z, level, southWest);
                    this.flags.add(x - 1, z - 1, level, northEast);
                } else {
                    this.flags.remove(x, z, level, southWest);
                    this.flags.remove(x - 1, z - 1, level, northEast);
                }
                break;
        }
        if (blockrange) {
            // If just blocked projectiles, then block normally next.
            return this.change(x, z, level, rotation, false, add);
        }
    }
}
