import CollisionFlagMap from '#rsmod/collision/CollisionFlagMap.js';
import CollisionFlag from '#rsmod/flag/CollisionFlag.js';
import {LocRotations} from '#lostcity/engine/collision/LocRotations.js';

export default class WallCornerLCollider {
    private readonly flags: CollisionFlagMap;

    constructor(flags: CollisionFlagMap) {
        this.flags = flags;
    }

    change(
        x: number,
        z: number,
        level: number,
        rotation: number,
        blockproj: boolean,
        add: boolean
    ): void {
        const west = blockproj ? CollisionFlag.WALL_WEST_PROJ_BLOCKER : CollisionFlag.WALL_WEST;
        const east = blockproj ? CollisionFlag.WALL_EAST_PROJ_BLOCKER : CollisionFlag.WALL_EAST;
        const north = blockproj ? CollisionFlag.WALL_NORTH_PROJ_BLOCKER : CollisionFlag.WALL_NORTH;
        const south = blockproj ? CollisionFlag.WALL_SOUTH_PROJ_BLOCKER : CollisionFlag.WALL_SOUTH;
        switch (rotation) {
            case LocRotations.WEST:
                if (add) {
                    this.flags.add(x, z, level, north | west);
                    this.flags.add(x - 1, z, level, east);
                    this.flags.add(x, z + 1, level, south);
                } else {
                    this.flags.remove(x, z, level, north | west);
                    this.flags.remove(x - 1, z, level, east);
                    this.flags.remove(x, z + 1, level, south);
                }
                break;
            case LocRotations.NORTH:
                if (add) {
                    this.flags.add(x, z, level, north | east);
                    this.flags.add(x, z + 1, level, south);
                    this.flags.add(x + 1, z, level, west);
                } else {
                    this.flags.remove(x, z, level, north | east);
                    this.flags.remove(x, z + 1, level, south);
                    this.flags.remove(x + 1, z, level, west);
                }
                break;
            case LocRotations.EAST:
                if (add) {
                    this.flags.add(x, z, level, south | east);
                    this.flags.add(x + 1, z, level, west);
                    this.flags.add(x, z - 1, level, north);
                } else {
                    this.flags.remove(x, z, level, south | east);
                    this.flags.remove(x + 1, z, level, west);
                    this.flags.remove(x, z - 1, level, north);
                }
                break;
            case LocRotations.SOUTH:
                if (add) {
                    this.flags.add(x, z, level, south | west);
                    this.flags.add(x, z - 1, level, north);
                    this.flags.add(x - 1, z, level, east);
                } else {
                    this.flags.remove(x, z, level, south | west);
                    this.flags.remove(x, z - 1, level, north);
                    this.flags.remove(x - 1, z, level, east);
                }
                break;
        }
        if (blockproj) {
            // If just blocked projectiles, then block normally next.
            return this.change(x, z, level, rotation, false, add);
        }
    }
}
