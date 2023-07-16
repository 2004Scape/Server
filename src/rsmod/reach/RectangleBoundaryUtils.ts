import BlockAccessFlag from '../flag/BlockAccessFlag.js';
import CollisionFlag from '../flag/CollisionFlag.js';
import CollisionFlagMap from "#rsmod/collision/CollisionFlagMap";

export default class RectangleBoundaryUtils {
    static collides(
        srcX: number,
        srcZ: number,
        destX: number,
        destZ: number,
        srcWidth: number,
        srcHeight: number,
        destWidth: number,
        destHeight: number
    ): boolean {
        return srcX >= destX + destWidth || srcX + srcWidth <= destX ? false : srcZ < destZ + destHeight && destZ < srcHeight + srcZ;
    }

    static reachRectangle1(
        flags: CollisionFlagMap,
        level: number,
        srcX: number,
        srcZ: number,
        destX: number,
        destZ: number,
        destWidth: number,
        destHeight: number,
        blockAccessFlags: number
    ): boolean {
        const east = destX + destWidth - 1;
        const north = destZ + destHeight - 1;

        if (srcX == destX - 1 && srcZ >= destZ && srcZ <= north &&
            (flags.get(srcX, srcZ, level) & CollisionFlag.WALL_EAST) == 0 &&
            (blockAccessFlags & BlockAccessFlag.BLOCK_WEST) == 0
        ) {
            return true;
        }

        if (srcX == east + 1 && srcZ >= destZ && srcZ <= north &&
            (flags.get(srcX, srcZ, level) & CollisionFlag.WALL_WEST) == 0 &&
            (blockAccessFlags & BlockAccessFlag.BLOCK_EAST) == 0
        ) {
            return true;
        }

        if (srcZ + 1 == destZ && srcX >= destX && srcX <= east &&
            (flags.get(srcX, srcZ, level) & CollisionFlag.WALL_NORTH) == 0 &&
            (blockAccessFlags & BlockAccessFlag.BLOCK_SOUTH) == 0
        ) {
            return true;
        }

        return srcZ == north + 1 && srcX >= destX && srcX <= east &&
            (flags.get(srcX, srcZ, level) & CollisionFlag.WALL_SOUTH) == 0 &&
            (blockAccessFlags & BlockAccessFlag.BLOCK_NORTH) == 0;
    }

    static reachRectangleN(
        flags: CollisionFlagMap,
        level: number,
        srcX: number,
        srcZ: number,
        destX: number,
        destZ: number,
        srcWidth: number,
        srcHeight: number,
        destWidth: number,
        destHeight: number,
        blockAccessFlags: number
    ): boolean {
        const srcEast = srcX + srcWidth;
        const srcNorth = srcHeight + srcZ;
        const destEast = destWidth + destX;
        const destNorth = destHeight + destZ;

        if (destEast == srcX && (blockAccessFlags & BlockAccessFlag.BLOCK_EAST) == CollisionFlag.OPEN) {
            const fromZ = Math.max(srcZ, destZ);
            const toZ = Math.min(srcNorth, destNorth);
            for (let sideZ = fromZ; sideZ < toZ; sideZ++) {
                if ((flags.get(destEast - 1, sideZ, level) & CollisionFlag.WALL_EAST) == CollisionFlag.OPEN) {
                    return true;
                }
            }
        } else if (srcEast == destX && (blockAccessFlags & BlockAccessFlag.BLOCK_WEST) == CollisionFlag.OPEN) {
            const fromZ = Math.max(srcZ, destZ);
            const toZ = Math.min(srcNorth, destNorth);
            for (let sideZ = fromZ; sideZ < toZ; sideZ++) {
                if ((flags.get(destX, sideZ, level) & CollisionFlag.WALL_WEST) == CollisionFlag.OPEN) {
                    return true;
                }
            }
        } else if (srcZ == destNorth && (blockAccessFlags & BlockAccessFlag.BLOCK_NORTH) == CollisionFlag.OPEN) {
            const fromX = Math.max(srcX, destX);
            const toX = Math.min(srcEast, destEast);
            for (let sideX = fromX; sideX < toX; sideX++) {
                if ((flags.get(sideX, destNorth - 1, level) & CollisionFlag.WALL_NORTH) == CollisionFlag.OPEN) {
                    return true;
                }
            }
        } else if (destZ == srcNorth && (blockAccessFlags & BlockAccessFlag.BLOCK_SOUTH) == CollisionFlag.OPEN) {
            const fromX = Math.max(srcX, destX);
            const toX = Math.min(srcEast, destEast);
            for (let sideX = fromX; sideX < toX; sideX++) {
                if ((flags.get(sideX, destZ, level) & CollisionFlag.WALL_SOUTH) == CollisionFlag.OPEN) {
                    return true;
                }
            }
        }
        return false;
    }
}
