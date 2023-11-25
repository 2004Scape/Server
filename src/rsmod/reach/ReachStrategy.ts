// noinspection DuplicatedCode

import CollisionFlagMap from '#rsmod/collision/CollisionFlagMap.js';
import RotationUtils from '#rsmod/utils/RotationUtils.js';
import RectangleBoundaryUtils from '#rsmod/reach/RectangleBoundaryUtils.js';
import CollisionFlag from '#rsmod/flag/CollisionFlag.js';

export default class ReachStrategy {
    static WALL_STRATEGY: number = 0;
    static WALL_DECOR_STRATEGY: number = 1;
    static RECTANGLE_STRATEGY: number = 2;
    static NO_STRATEGY: number = 3;
    static RECTANGLE_EXCLUSIVE_STRATEGY: number = 4;

    static exitStrategy(locShape: number): number {
        if (locShape == -2) {
            return this.RECTANGLE_EXCLUSIVE_STRATEGY;
        } else if (locShape == -1) {
            return this.NO_STRATEGY;
        } else if ((locShape >= 0 && locShape <= 3) || locShape == 9) {
            return this.WALL_STRATEGY;
        } else if (locShape < 9) {
            return this.WALL_DECOR_STRATEGY;
        } else if ((locShape >= 10 && locShape <= 11) || locShape == 22) {
            return this.RECTANGLE_STRATEGY;
        }
        return this.NO_STRATEGY;
    }

    static alteredRotation(rotation: number, shape: number): number {
        return shape == 7 ? ((rotation + 2) & 0x3) : rotation;
    }

    static reached(
        flags: CollisionFlagMap,
        level: number,
        srcX: number,
        srcZ: number,
        destX: number,
        destZ: number,
        destWidth: number,
        destHeight: number,
        srcSize: number,
        rotation: number = 0,
        shape: number = -1,
        blockAccessFlags: number = 0
    ): boolean {
        let exitStrategy = this.exitStrategy(shape);
        if (exitStrategy != this.RECTANGLE_EXCLUSIVE_STRATEGY && srcX == destX && srcZ == destZ) {
            return true;
        }
        switch (exitStrategy) {
            case this.WALL_STRATEGY:
                return this.reachWall(
                    flags,
                    level,
                    srcX,
                    srcZ,
                    destX,
                    destZ,
                    srcSize,
                    shape,
                    rotation
                );
            case this.WALL_DECOR_STRATEGY:
                return this.reachWallDecor(
                    flags,
                    level,
                    srcX,
                    srcZ,
                    destX,
                    destZ,
                    srcSize,
                    shape,
                    rotation
                );
            case this.RECTANGLE_STRATEGY:
                return this.reachRectangle(
                    flags,
                    level,
                    srcX,
                    srcZ,
                    destX,
                    destZ,
                    srcSize,
                    destWidth,
                    destHeight,
                    rotation,
                    blockAccessFlags
                );
            case this.RECTANGLE_EXCLUSIVE_STRATEGY:
                return this.reachExclusiveRectangle(
                    flags,
                    level,
                    srcX,
                    srcZ,
                    destX,
                    destZ,
                    srcSize,
                    destWidth,
                    destHeight,
                    rotation,
                    blockAccessFlags
                );
        }
        return false;
    }

    static reachRectangle(
        flags: CollisionFlagMap,
        level: number,
        srcX: number,
        srcZ: number,
        destX: number,
        destZ: number,
        srcSize: number,
        destWidth: number,
        destHeight: number,
        locRotation: number = 0,
        blockAccessFlags: number = 0
    ): boolean {
        const rotatedWidth = RotationUtils.rotate(locRotation, destWidth, destHeight);
        const rotatedHeight = RotationUtils.rotate(locRotation, destHeight, destWidth);
        const rotatedBlockAccess = RotationUtils.rotateFlags(locRotation, blockAccessFlags);
        const collides = RectangleBoundaryUtils.collides(
            srcX,
            srcZ,
            destX,
            destZ,
            srcSize,
            srcSize,
            rotatedWidth,
            rotatedHeight
        );

        if (srcSize > 1) {
            return collides || RectangleBoundaryUtils.reachRectangleN(
                flags,
                level,
                srcX,
                srcZ,
                destX,
                destZ,
                srcSize,
                srcSize,
                rotatedWidth,
                rotatedHeight,
                rotatedBlockAccess
            );
        }
        return collides || RectangleBoundaryUtils.reachRectangle1(
            flags,
            level,
            srcX,
            srcZ,
            destX,
            destZ,
            rotatedWidth,
            rotatedHeight,
            rotatedBlockAccess
        );
    }

    static reachExclusiveRectangle(
        flags: CollisionFlagMap,
        level: number,
        srcX: number,
        srcZ: number,
        destX: number,
        destZ: number,
        srcSize: number,
        destWidth: number,
        destHeight: number,
        locRotation: number = 0,
        blockAccessFlags: number = 0
    ): boolean {
        const rotatedWidth = RotationUtils.rotate(locRotation, destWidth, destHeight);
        const rotatedHeight = RotationUtils.rotate(locRotation, destHeight, destWidth);
        const rotatedBlockAccess = RotationUtils.rotateFlags(locRotation, blockAccessFlags);
        const collides = RectangleBoundaryUtils.collides(
            srcX,
            srcZ,
            destX,
            destZ,
            srcSize,
            srcSize,
            rotatedWidth,
            rotatedHeight
        );

        if (srcSize > 1) {
            return !collides && RectangleBoundaryUtils.reachRectangleN(
                flags,
                level,
                srcX,
                srcZ,
                destX,
                destZ,
                srcSize,
                srcSize,
                rotatedWidth,
                rotatedHeight,
                rotatedBlockAccess
            );
        }
        return !collides && RectangleBoundaryUtils.reachRectangle1(
            flags,
            level,
            srcX,
            srcZ,
            destX,
            destZ,
            rotatedWidth,
            rotatedHeight,
            rotatedBlockAccess
        );
    }

    static reachWall(
        flags: CollisionFlagMap,
        level: number,
        srcX: number,
        srcZ: number,
        destX: number,
        destZ: number,
        srcSize: number,
        locShape: number,
        locRotation: number
    ): boolean {
        if (srcSize == 1 && srcX == destX && srcZ == destZ) {
            return true;
        } else if (srcSize != 1 && destX >= srcX && srcSize + srcX - 1 >= destX && destZ >= srcZ && srcSize + srcZ - 1 >= destZ) {
            return true;
        } else if (srcSize == 1) {
            return this.reachWall1(
                flags,
                level,
                srcX,
                srcZ,
                destX,
                destZ,
                locShape,
                locRotation
            );
        }
        return this.reachWallN(
            flags,
            level,
            srcX,
            srcZ,
            destX,
            destZ,
            srcSize,
            locShape,
            locRotation
        );
    }

    static reachWallDecor(
        flags: CollisionFlagMap,
        level: number,
        srcX: number,
        srcZ: number,
        destX: number,
        destZ: number,
        srcSize: number,
        locShape: number,
        locRotation: number
    ): boolean {
        if (srcSize == 1 && srcX == destX && srcZ == destZ) {
            return true;
        } else if (srcSize != 1 && destX >= srcX && srcSize + srcX - 1 >= destX && destZ >= srcZ && srcSize + srcZ - 1 >= destZ) {
            return true;
        } else if (srcSize == 1) {
            return this.reachWallDecor1(
                flags,
                level,
                srcX,
                srcZ,
                destX,
                destZ,
                locShape,
                locRotation
            );
        }
        return this.reachWallDecorN(
            flags,
            level,
            srcX,
            srcZ,
            destX,
            destZ,
            srcSize,
            locShape,
            locRotation
        );
    }

    static reachWall1(
        flags: CollisionFlagMap,
        level: number,
        srcX: number,
        srcZ: number,
        destX: number,
        destZ: number,
        locShape: number,
        locRotation: number
    ): boolean {
        // Much faster check this way.
        if (locShape != 0 && locShape != 2 && locShape != 9) {
            return false;
        }
        const collisionFlags = flags.get(srcX, srcZ, level);
        switch (locShape) {
            case 0:
                switch (locRotation) {
                    case 0:
                        if (srcX == destX - 1 && srcZ == destZ) {
                            return true;
                        } else if (srcX == destX && srcZ == destZ + 1 && (collisionFlags & CollisionFlag.BLOCK_NORTH) == CollisionFlag.OPEN) {
                            return true;
                        } else if (srcX == destX && srcZ == destZ - 1 && (collisionFlags & CollisionFlag.BLOCK_SOUTH) == CollisionFlag.OPEN) {
                            return true;
                        }
                        return false;
                    case 1:
                        if (srcX == destX && srcZ == destZ + 1) {
                            return true;
                        } else if (srcX == destX - 1 && srcZ == destZ && (collisionFlags & CollisionFlag.BLOCK_WEST) == CollisionFlag.OPEN) {
                            return true;
                        } else if (srcX == destX + 1 && srcZ == destZ && (collisionFlags & CollisionFlag.BLOCK_EAST) == CollisionFlag.OPEN) {
                            return true;
                        }
                        return false;
                    case 2:
                        if (srcX == destX + 1 && srcZ == destZ) {
                            return true;
                        } else if (srcX == destX && srcZ == destZ + 1 && (collisionFlags & CollisionFlag.BLOCK_NORTH) == CollisionFlag.OPEN) {
                            return true;
                        } else if (srcX == destX && srcZ == destZ - 1 && (collisionFlags & CollisionFlag.BLOCK_SOUTH) == CollisionFlag.OPEN) {
                            return true;
                        }
                        return false;
                    case 3:
                        if (srcX == destX && srcZ == destZ - 1) {
                            return true;
                        } else if (srcX == destX - 1 && srcZ == destZ && (collisionFlags & CollisionFlag.BLOCK_WEST) == CollisionFlag.OPEN) {
                            return true;
                        } else if (srcX == destX + 1 && srcZ == destZ && (collisionFlags & CollisionFlag.BLOCK_EAST) == CollisionFlag.OPEN) {
                            return true;
                        }
                        return false;
                }
                return false;
            case 2:
                switch (locRotation) {
                    case 0:
                        if (srcX == destX - 1 && srcZ == destZ) {
                            return true;
                        } else if (srcX == destX && srcZ == destZ + 1) {
                            return true;
                        } else if (srcX == destX + 1 && srcZ == destZ && (collisionFlags & CollisionFlag.BLOCK_EAST) == CollisionFlag.OPEN) {
                            return true;
                        } else if (srcX == destX && srcZ == destZ - 1 && (collisionFlags & CollisionFlag.BLOCK_SOUTH) == CollisionFlag.OPEN) {
                            return true;
                        }
                        return false;
                    case 1:
                        if (srcX == destX - 1 && srcZ == destZ && (collisionFlags & CollisionFlag.BLOCK_WEST) == CollisionFlag.OPEN) {
                            return true;
                        } else if (srcX == destX && srcZ == destZ + 1) {
                            return true;
                        } else if (srcX == destX + 1 && srcZ == destZ) {
                            return true;
                        } else if (srcX == destX && srcZ == destZ - 1 && (collisionFlags & CollisionFlag.BLOCK_SOUTH) == CollisionFlag.OPEN) {
                            return true;
                        }
                        return false;
                    case 2:
                        if (srcX == destX - 1 && srcZ == destZ && (collisionFlags & CollisionFlag.BLOCK_WEST) == CollisionFlag.OPEN) {
                            return true;
                        } else if (srcX == destX && srcZ == destZ + 1 && (collisionFlags & CollisionFlag.BLOCK_NORTH) == CollisionFlag.OPEN) {
                            return true;
                        } else if (srcX == destX + 1 && srcZ == destZ) {
                            return true;
                        } else if (srcX == destX && srcZ == destZ - 1) {
                            return true;
                        }
                        return false;
                    case 3:
                        if (srcX == destX - 1 && srcZ == destZ) {
                            return true;
                        } else if (srcX == destX && srcZ == destZ + 1 && (collisionFlags & CollisionFlag.BLOCK_NORTH) == CollisionFlag.OPEN) {
                            return true;
                        } else if (srcX == destX + 1 && srcZ == destZ && (collisionFlags & CollisionFlag.BLOCK_EAST) == CollisionFlag.OPEN) {
                            return true;
                        } else if (srcX == destX && srcZ == destZ - 1) {
                            return true;
                        }
                        return false;
                }
                return false;
            case 9:
                if (srcX == destX && srcZ == destZ + 1 && (collisionFlags & CollisionFlag.WALL_SOUTH) == CollisionFlag.OPEN) {
                    return true;
                } else if (srcX == destX && srcZ == destZ - 1 && (collisionFlags & CollisionFlag.WALL_NORTH) == CollisionFlag.OPEN) {
                    return true;
                } else if (srcX == destX - 1 && srcZ == destZ && (collisionFlags & CollisionFlag.WALL_EAST) == CollisionFlag.OPEN) {
                    return true;
                } else if (srcX == destX + 1 && srcZ == destZ && (collisionFlags & CollisionFlag.WALL_WEST) == CollisionFlag.OPEN) {
                    return true;
                }
                return false;
        }
    }

    static reachWallN(
        flags: CollisionFlagMap,
        level: number,
        srcX: number,
        srcZ: number,
        destX: number,
        destZ: number,
        srcSize: number,
        locShape: number,
        locRotation: number
    ): boolean {
        // Much faster check this way.
        if (locShape != 0 && locShape != 2 && locShape != 9) {
            return false;
        }
        const collisionFlags = flags.get(srcX, srcZ, level);
        const east = srcX + srcSize - 1;
        const north = srcZ + srcSize - 1;
        switch (locShape) {
            case 0:
                switch (locRotation) {
                    case 0:
                        if (srcX == destX - srcSize && srcZ <= destZ && north >= destZ) {
                            return true;
                        } else if ((destX >= srcX && destX <= east) && srcZ == destZ + 1 && (collisionFlags & CollisionFlag.BLOCK_NORTH) == CollisionFlag.OPEN) {
                            return true;
                        } else if ((destX >= srcX && destX <= east) && srcZ == destZ - srcSize && (collisionFlags & CollisionFlag.BLOCK_SOUTH) == CollisionFlag.OPEN) {
                            return true;
                        }
                        return false;
                    case 1:
                        if ((destX >= srcX && destX <= east) && srcZ == destZ + 1) {
                            return true;
                        } else if (srcX == destX - srcSize && srcZ <= destZ && north >= destZ && (collisionFlags & CollisionFlag.BLOCK_WEST) == CollisionFlag.OPEN) {
                            return true;
                        } else if (srcX == destX + 1 && srcZ <= destZ && north >= destZ && (collisionFlags & CollisionFlag.BLOCK_EAST) == CollisionFlag.OPEN) {
                            return true;
                        }
                        return false;
                    case 2:
                        if (srcX == destX + 1 && srcZ <= destZ && north >= destZ) {
                            return true;
                        } else if ((destX >= srcX && destX <= east) && srcZ == destZ + 1 && (collisionFlags & CollisionFlag.BLOCK_NORTH) == CollisionFlag.OPEN) {
                            return true;
                        } else if ((destX >= srcX && destX <= east) && srcZ == destZ - srcSize && (collisionFlags & CollisionFlag.BLOCK_SOUTH) == CollisionFlag.OPEN) {
                            return true;
                        }
                        return false;
                    case 3:
                        if ((destX >= srcX && destX <= east) && srcZ == destZ - srcSize) {
                            return true;
                        } else if (srcX == destX - srcSize && srcZ <= destZ && north >= destZ && (collisionFlags & CollisionFlag.BLOCK_WEST) == CollisionFlag.OPEN) {
                            return true;
                        } else if (srcX == destX + 1 && srcZ <= destZ && north >= destZ && (collisionFlags & CollisionFlag.BLOCK_EAST) == CollisionFlag.OPEN) {
                            return true;
                        }
                        return false;
                }
                return false;
            case 2:
                switch (locRotation) {
                    case 0:
                        if (srcX == destX - srcSize && srcZ <= destZ && north >= destZ) {
                            return true;
                        } else if ((destX >= srcX && destX <= east) && srcZ == destZ + 1) {
                            return true;
                        } else if (srcX == destX + 1 && srcZ <= destZ && north >= destZ && (collisionFlags & CollisionFlag.BLOCK_EAST) == CollisionFlag.OPEN) {
                            return true;
                        } else if ((destX >= srcX && destX <= east) && srcZ == destZ - srcSize && (collisionFlags & CollisionFlag.BLOCK_SOUTH) == CollisionFlag.OPEN) {
                            return true;
                        }
                        return false;
                    case 1:
                        if (srcX == destX - srcSize && srcZ <= destZ && north >= destZ && (collisionFlags & CollisionFlag.BLOCK_WEST) == CollisionFlag.OPEN) {
                            return true;
                        } else if ((destX >= srcX && destX <= east) && srcZ == destZ + 1) {
                            return true;
                        } else if (srcX == destX + 1 && srcZ <= destZ && north >= destZ) {
                            return true;
                        } else if ((destX >= srcX && destX <= east) && srcZ == destZ - srcSize && (collisionFlags & CollisionFlag.BLOCK_SOUTH) == CollisionFlag.OPEN) {
                            return true;
                        }
                        return false;
                    case 2:
                        if (srcX == destX - srcSize && srcZ <= destZ && north >= destZ && (collisionFlags & CollisionFlag.BLOCK_WEST) == CollisionFlag.OPEN) {
                            return true;
                        } else if ((destX >= srcX && destX <= east) && srcZ == destZ + 1 && (collisionFlags & CollisionFlag.BLOCK_NORTH) == CollisionFlag.OPEN) {
                            return true;
                        } else if (srcX == destX + 1 && srcZ <= destZ && north >= destZ) {
                            return true;
                        } else if ((destX >= srcX && destX <= east) && srcZ == destZ - srcSize) {
                            return true;
                        }
                        return false;
                    case 3:
                        if (srcX == destX - srcSize && srcZ <= destZ && north >= destZ) {
                            return true;
                        } else if ((destX >= srcX && destX <= east) && srcZ == destZ + 1 && (collisionFlags & CollisionFlag.BLOCK_NORTH) == CollisionFlag.OPEN) {
                            return true;
                        } else if (srcX == destX + 1 && srcZ <= destZ && north >= destZ && (collisionFlags & CollisionFlag.BLOCK_EAST) == CollisionFlag.OPEN) {
                            return true;
                        } else if ((destX >= srcX && destX <= east) && srcZ == destZ - srcSize) {
                            return true;
                        }
                        return false;
                }
                return false;
            case 9:
                if ((destX >= srcX && destX <= east) && srcZ == destZ + 1 && (collisionFlags & CollisionFlag.BLOCK_NORTH) == CollisionFlag.OPEN) {
                    return true;
                } else if ((destX >= srcX && destX <= east) && srcZ == destZ - srcSize && (collisionFlags & CollisionFlag.BLOCK_SOUTH) == CollisionFlag.OPEN) {
                    return true;
                } else if (srcX == destX - srcSize && srcZ <= destZ && north >= destZ && (collisionFlags & CollisionFlag.BLOCK_WEST) == CollisionFlag.OPEN) {
                    return true;
                } else if (srcX == destX + 1 && srcZ <= destZ && north >= destZ && (collisionFlags & CollisionFlag.BLOCK_EAST) == CollisionFlag.OPEN) {
                    return true;
                }
                return false;
        }
    }

    static reachWallDecor1(
        flags: CollisionFlagMap,
        level: number,
        srcX: number,
        srcZ: number,
        destX: number,
        destZ: number,
        locShape: number,
        locRotation: number
    ): boolean {
        // Faster check.
        if (locShape != 6 && locShape != 7 && locShape != 8) {
            return false
        }
        const collisionFlags = flags.get(srcX, srcZ, level);
        switch (locShape) {
            case 6:
            case 7:
                switch (this.alteredRotation(locRotation, locShape)) {
                    case 0:
                        if (srcX == destX + 1 && srcZ == destZ && (collisionFlags & CollisionFlag.WALL_WEST) == CollisionFlag.OPEN) {
                            return true;
                        } else if (srcX == destX && srcZ == destZ - 1 && (collisionFlags & CollisionFlag.WALL_NORTH) == CollisionFlag.OPEN) {
                            return true;
                        }
                        return false;
                    case 1:
                        if (srcX == destX - 1 && srcZ == destZ && (collisionFlags & CollisionFlag.WALL_EAST) == CollisionFlag.OPEN) {
                            return true;
                        } else if (srcX == destX && srcZ == destZ - 1 && (collisionFlags & CollisionFlag.WALL_NORTH) == CollisionFlag.OPEN) {
                            return true;
                        }
                        return false;
                    case 2:
                        if (srcX == destX - 1 && srcZ == destZ && (collisionFlags & CollisionFlag.WALL_EAST) == CollisionFlag.OPEN) {
                            return true;
                        } else if (srcX == destX && srcZ == destZ + 1 && (collisionFlags & CollisionFlag.WALL_SOUTH) == CollisionFlag.OPEN) {
                            return true;
                        }
                        return false;
                    case 3:
                        if (srcX == destX + 1 && srcZ == destZ && (collisionFlags & CollisionFlag.WALL_WEST) == CollisionFlag.OPEN) {
                            return true;
                        } else if (srcX == destX && srcZ == destZ + 1 && (collisionFlags & CollisionFlag.WALL_SOUTH) == CollisionFlag.OPEN) {
                            return true;
                        }
                }
                return false;
            case 8:
                if (srcX == destX && srcZ == destZ + 1 && (collisionFlags & CollisionFlag.WALL_SOUTH) == CollisionFlag.OPEN) {
                    return true;
                } else if (srcX == destX && srcZ == destZ - 1 && (collisionFlags & CollisionFlag.WALL_NORTH) == CollisionFlag.OPEN) {
                    return true;
                } else if (srcX == destX - 1 && srcZ == destZ && (collisionFlags & CollisionFlag.WALL_EAST) == CollisionFlag.OPEN) {
                    return true;
                } else if (srcX == destX + 1 && srcZ == destZ && (collisionFlags & CollisionFlag.WALL_WEST) == CollisionFlag.OPEN) {
                    return true;
                }
                return false;
        }
    }

    static reachWallDecorN(
        flags: CollisionFlagMap,
        level: number,
        srcX: number,
        srcZ: number,
        destX: number,
        destZ: number,
        srcSize: number,
        locShape: number,
        locRotation: number
    ): boolean {
        // Faster check.
        if (locShape != 6 && locShape != 7 && locShape != 8) {
            return false
        }
        const collisionFlags = flags.get(srcX, srcZ, level);
        const east = srcX + srcSize - 1;
        const north = srcZ + srcSize - 1;
        switch (locShape) {
            case 6:
            case 7:
                switch (this.alteredRotation(locRotation, locShape)) {
                    case 0:
                        if (srcX == destX + 1 && srcZ <= destZ && north >= destZ && (collisionFlags & CollisionFlag.WALL_WEST) == CollisionFlag.OPEN) {
                            return true;
                        } else if (srcX <= destX && srcZ == destZ - srcSize && east >= destX && (collisionFlags & CollisionFlag.WALL_NORTH) == CollisionFlag.OPEN) {
                            return true;
                        }
                        return false;
                    case 1:
                        if (srcX == destX - srcSize && srcZ <= destZ && north >= destZ && (collisionFlags & CollisionFlag.WALL_EAST) == CollisionFlag.OPEN) {
                            return true;
                        } else if (srcX <= destX && srcZ == destZ - srcSize && east >= destX && (collisionFlags & CollisionFlag.WALL_NORTH) == CollisionFlag.OPEN) {
                            return true;
                        }
                        return false;
                    case 2:
                        if (srcX == destX - srcSize && srcZ <= destZ && north >= destZ && (collisionFlags & CollisionFlag.WALL_EAST) == CollisionFlag.OPEN) {
                            return true;
                        } else if (srcX <= destX && srcZ == destZ + 1 && east >= destX && (collisionFlags & CollisionFlag.WALL_SOUTH) == CollisionFlag.OPEN) {
                            return true;
                        }
                        return false;
                    case 3:
                        if (srcX == destX + 1 && srcZ <= destZ && north >= destZ && (collisionFlags & CollisionFlag.WALL_WEST) == CollisionFlag.OPEN) {
                            return true;
                        } else if (srcX <= destX && srcZ == destZ + 1 && east >= destX && (collisionFlags & CollisionFlag.WALL_SOUTH) == CollisionFlag.OPEN) {
                            return true;
                        }
                        return false;
                }
                return false;
            case 8:
                if (srcX <= destX && srcZ == destZ + 1 && east >= destX && (collisionFlags & CollisionFlag.WALL_SOUTH) == 0) {
                    return true;
                } else if (srcX <= destX && srcZ == destZ - srcSize && east >= destX && (collisionFlags & CollisionFlag.WALL_NORTH) == CollisionFlag.OPEN) {
                    return true;
                } else if (srcX == destX - srcSize && srcZ <= destZ && north >= destZ && (collisionFlags & CollisionFlag.WALL_EAST) == CollisionFlag.OPEN) {
                    return true;
                } else if (srcX == destX + 1 && srcZ <= destZ && north >= destZ && (collisionFlags & CollisionFlag.WALL_WEST) == CollisionFlag.OPEN) {
                    return true;
                }
                return false;
        }
    }
}
