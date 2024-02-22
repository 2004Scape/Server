import { CollisionFlag, CollisionFlagMap } from '@2004scape/rsmod-pathfinder';

import LocAngle from '#lostcity/engine/collision/LocAngle.js';

export default class WallStraightCollider {
    private readonly flags: CollisionFlagMap;

    constructor(flags: CollisionFlagMap) {
        this.flags = flags;
    }

    change(x: number, z: number, level: number, angle: number, blockrange: boolean, add: boolean): void {
        const west: number = blockrange ? CollisionFlag.WALL_WEST_PROJ_BLOCKER : CollisionFlag.WALL_WEST;
        const east: number = blockrange ? CollisionFlag.WALL_EAST_PROJ_BLOCKER : CollisionFlag.WALL_EAST;
        const north: number = blockrange ? CollisionFlag.WALL_NORTH_PROJ_BLOCKER : CollisionFlag.WALL_NORTH;
        const south: number = blockrange ? CollisionFlag.WALL_SOUTH_PROJ_BLOCKER : CollisionFlag.WALL_SOUTH;

        if (angle === LocAngle.WEST) {
            if (add) {
                this.flags.add(x, z, level, west);
                this.flags.add(x - 1, z, level, east);
            } else {
                this.flags.remove(x, z, level, west);
                this.flags.remove(x - 1, z, level, east);
            }
        } else if (angle === LocAngle.NORTH) {
            if (add) {
                this.flags.add(x, z, level, north);
                this.flags.add(x, z + 1, level, south);
            } else {
                this.flags.remove(x, z, level, north);
                this.flags.remove(x, z + 1, level, south);
            }
        } else if (angle === LocAngle.EAST) {
            if (add) {
                this.flags.add(x, z, level, east);
                this.flags.add(x + 1, z, level, west);
            } else {
                this.flags.remove(x, z, level, east);
                this.flags.remove(x + 1, z, level, west);
            }
        } else if (angle === LocAngle.SOUTH) {
            if (add) {
                this.flags.add(x, z, level, south);
                this.flags.add(x, z - 1, level, north);
            } else {
                this.flags.remove(x, z, level, south);
                this.flags.remove(x, z - 1, level, north);
            }
        }
        if (blockrange) {
            // If just blocked projectiles, then block normally next.
            return this.change(x, z, level, angle, false, add);
        }
    }
}
