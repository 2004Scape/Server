import CollisionFlagMap from '#rsmod/collision/CollisionFlagMap.js';
import CollisionFlag from '#rsmod/flag/CollisionFlag.js';
import {LocRotations} from '#lostcity/engine/collision/LocRotations.js';

export default class WallCornerCollider {
    private readonly flags: CollisionFlagMap;

    constructor(flags: CollisionFlagMap) {
        this.flags = flags;
    }

    change(
        x: number,
        z: number,
        level: number,
        rotation: LocRotations,
        blockproj: boolean,
        add: boolean
    ): void {
        const northWest = blockproj ? CollisionFlag.WALL_NORTH_WEST_PROJ_BLOCKER : CollisionFlag.WALL_NORTH_WEST;
        const southEast = blockproj ? CollisionFlag.WALL_SOUTH_EAST_PROJ_BLOCKER : CollisionFlag.WALL_SOUTH_EAST;
        const northEast = blockproj ? CollisionFlag.WALL_NORTH_EAST_PROJ_BLOCKER : CollisionFlag.WALL_NORTH_EAST;
        const southWest = blockproj ? CollisionFlag.WALL_SOUTH_WEST_PROJ_BLOCKER : CollisionFlag.WALL_SOUTH_WEST;
        switch (rotation) {
            case LocRotations.WEST:
                if (add) {
                    this.flags.add(x, z, level, northWest);
                    this.flags.add(x - 1, z + 1, level, southEast);
                } else {
                    this.flags.remove(x, z, level, northWest);
                    this.flags.remove(x - 1, z + 1, level, southEast);
                }
                break;
            case LocRotations.NORTH:
                if (add) {
                    this.flags.add(x, z, level, northEast);
                    this.flags.add(x + 1, z + 1, level, southWest);
                } else {
                    this.flags.remove(x, z, level, northEast);
                    this.flags.remove(x + 1, z + 1, level, southWest);
                }
                break;
            case LocRotations.EAST:
                if (add) {
                    this.flags.add(x, z, level, southEast);
                    this.flags.add(x + 1, z - 1, level, northWest);
                } else {
                    this.flags.remove(x, z, level, southEast);
                    this.flags.remove(x + 1, z - 1, level, northWest);
                }
                break;
            case LocRotations.SOUTH:
                if (add) {
                    this.flags.add(x, z, level, southWest);
                    this.flags.add(x - 1, z - 1, level, northEast);
                } else {
                    this.flags.remove(x, z, level, southWest);
                    this.flags.remove(x - 1, z - 1, level, northEast);
                }
                break;
        }
        if (blockproj) {
            // If just blocked projectiles, then block normally next.
            return this.change(x, z, level, rotation, false, add);
        }
    }
}
