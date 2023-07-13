import CollisionFlagMap from '#rsmod/collision/CollisionFlagMap.js';
import RotationUtils from '../utils/RotationUtils.js';
import RectangleBoundaryUtils from './RectangleBoundaryUtils.js';

export default class ReachStrategy {
    static WALL_STRATEGY = 0;
    static WALL_DECO_STRATEGY = 1;
    static RECTANGLE_STRATEGY = 2;
    static NO_STRATEGY = 3;
    static RECTANGLE_EXCLUSIVE_STRATEGY = 4;

    static exitStrategy(locShape: number) {
        if (locShape == -2) {
            return ReachStrategy.RECTANGLE_EXCLUSIVE_STRATEGY;
        } else if (locShape == -1) {
            return ReachStrategy.NO_STRATEGY;
        } else if ((locShape >= 0 && locShape <= 3) || locShape == 9) {
            return ReachStrategy.WALL_STRATEGY;
        } else if (locShape < 9) {
            return ReachStrategy.WALL_DECO_STRATEGY;
        } else if ((locShape >= 10 && locShape <= 11) || locShape == 22) {
            return ReachStrategy.RECTANGLE_STRATEGY;
        } else {
            return ReachStrategy.NO_STRATEGY;
        }
    }

    static alteredRotation(rotation: number, shape: number) {
        return shape == 7 ? ((rotation + 2) & 0x3) : rotation;
    }

    static reached(flags: CollisionFlagMap, level: number, srcX: number, srcZ: number, destX: number, destZ: number, destWidth: number, destHeight: number, srcSize: number, locRot = 0, locShape = -1, blockAccessFlags = 0) {
        let exitStrategy = ReachStrategy.exitStrategy(locShape);
        if (exitStrategy != ReachStrategy.RECTANGLE_EXCLUSIVE_STRATEGY && srcX == destX && srcZ == destZ) {
            return true;
        }

        if (exitStrategy === ReachStrategy.WALL_STRATEGY) {
            return ReachStrategy.reachWall(flags, level, srcX, srcZ, destX, destZ, srcSize, locShape, locRot);
        } else if (exitStrategy === ReachStrategy.WALL_DECO_STRATEGY) {
            return ReachStrategy.reachWallDeco(flags, level, srcX, srcZ, destX, destZ, srcSize, locShape, locRot);
        } else if (exitStrategy === ReachStrategy.RECTANGLE_STRATEGY) {
            return ReachStrategy.reachRectangle(flags, level, srcX, srcZ, destX, destZ, srcSize, destWidth, destHeight, locRot, blockAccessFlags);
        } else if (exitStrategy === ReachStrategy.RECTANGLE_EXCLUSIVE_STRATEGY) {
            return ReachStrategy.reachExclusiveRectangle(flags, level, srcX, srcZ, destX, destZ, srcSize, destWidth, destHeight, locRot, blockAccessFlags);
        } else {
            return false;
        }
    }

    static reachRectangle(flags: CollisionFlagMap, level: number, srcX: number, srcZ: number, destX: number, destZ: number, srcSize: number, destWidth: number, destHeight: number, locRot: number, blockAccessFlags: number) {
        let rotatedWidth = RotationUtils.rotate(locRot, destWidth, destHeight);
        let rotatedHeight = RotationUtils.rotate(locRot, destHeight, destWidth);
        let rotatedBlockAccess = RotationUtils.rotateFlags(locRot, blockAccessFlags);

        if (srcSize > 1) {
            return RectangleBoundaryUtils.collides(srcX, srcZ, destX, destZ, srcSize, srcSize, rotatedWidth, rotatedHeight) ||
                RectangleBoundaryUtils.reachRectangleN(flags, level, srcX, srcZ, destX, destZ, srcSize, srcSize, destWidth, destHeight, rotatedBlockAccess);
        } else {
            return RectangleBoundaryUtils.collides(srcX, srcZ, destX, destZ, srcSize, srcSize, rotatedWidth, rotatedHeight) ||
                RectangleBoundaryUtils.reachRectangle1(flags, level, srcX, srcZ, destX, destZ, destWidth, destHeight, rotatedBlockAccess);
        }
    }

    static reachExclusiveRectangle(flags: CollisionFlagMap, level: number, srcX: number, srcZ: number, destX: number, destZ: number, srcSize: number, destWidth: number, destHeight: number, locRot: number, blockAccessFlags: number) {
        let rotatedWidth = RotationUtils.rotate(locRot, destWidth, destHeight);
        let rotatedHeight = RotationUtils.rotate(locRot, destHeight, destWidth);
        let rotatedBlockAccess = RotationUtils.rotateFlags(locRot, blockAccessFlags);

        if (srcSize > 1) {
            return !RectangleBoundaryUtils.collides(srcX, srcZ, destX, destZ, srcSize, srcSize, rotatedWidth, rotatedHeight) &&
                RectangleBoundaryUtils.reachRectangleN(flags, level, srcX, srcZ, destX, destZ, srcSize, srcSize, destWidth, destHeight, rotatedBlockAccess);
        } else {
            return !RectangleBoundaryUtils.collides(srcX, srcZ, destX, destZ, srcSize, srcSize, rotatedWidth, rotatedHeight) &&
                RectangleBoundaryUtils.reachRectangle1(flags, level, srcX, srcZ, destX, destZ, destWidth, destHeight, rotatedBlockAccess);
        }
    }

    static reachWall(flags: CollisionFlagMap, level: number, srcX: number, srcZ: number, destX: number, destZ: number, srcSize: number, locShape: number, locRot: number) {
        if (srcSize == 1 && srcX == destX && srcZ == destZ) {
            return true;
        } else if (srcSize != 1 && destX >= srcX && srcSize + srcX - 1 >= destX && destZ >= srcZ && srcSize + srcZ - 1 >= destZ) {
            return true;
        } else if (srcSize == 1) {
            return ReachStrategy.reachWall1(flags, level, srcX, srcZ, destX, destZ, locShape, locRot);
        } else {
            return ReachStrategy.reachWallN(flags, level, srcX, srcZ, destX, destZ, srcSize, locShape, locRot);
        }
    }

    static reachWallDeco(flags: CollisionFlagMap, level: number, srcX: number, srcZ: number, destX: number, destZ: number, srcSize: number, locShape: number, locRot: number) {
        if (srcSize == 1 && srcX == destX && srcZ == destZ) {
            return true;
        } else if (srcSize != 1 && destX >= srcX && srcSize + srcX - 1 >= destX && destZ >= srcZ && srcSize + srcZ - 1 >= destZ) {
            return true;
        } else if (srcSize == 1) {
            return ReachStrategy.reachWallDeco1(flags, level, srcX, srcZ, destX, destZ, locShape, locRot);
        } else {
            return ReachStrategy.reachWallDecoN(flags, level, srcX, srcZ, destX, destZ, srcSize, locShape, locRot);
        }
    }

    // ----

    static reachWall1(flags: CollisionFlagMap, level: number, srcX: number, srcZ: number, destX: number, destZ: number, locShape: number, locRot: number) {
    }

    static reachWallN(flags: CollisionFlagMap, level: number, srcX: number, srcZ: number, destX: number, destZ: number, srcSize: number, locShape: number, locRot: number) {
    }

    static reachWallDeco1(flags: CollisionFlagMap, level: number, srcX: number, srcZ: number, destX: number, destZ: number, locShape: number, locRot: number) {
    }

    static reachWallDecoN(flags: CollisionFlagMap, level: number, srcX: number, srcZ: number, destX: number, destZ: number, srcSize: number, locShape: number, locRot: number) {
    }
}
