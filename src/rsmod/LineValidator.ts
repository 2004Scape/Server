import CollisionFlag from '#rsmod/flag/CollisionFlag.js';
import CollisionFlagMap from '#rsmod/collision/CollisionFlagMap.js';
import Line from '#rsmod/Line.js';

export default class LineValidator {
    private readonly flags: CollisionFlagMap;

    constructor(flags: CollisionFlagMap) {
        this.flags = flags;
    }

    hasLineOfSight(
        level: number,
        srcX: number,
        srcZ: number,
        destX: number,
        destZ: number,
        srcSize: number = 1,
        destWidth: number = 0,
        destHeight: number = 0,
        extraFlag: number = 0
    ): boolean {
        return this.rayCast(
            level,
            srcX,
            srcZ,
            destX,
            destZ,
            srcSize,
            destWidth,
            destHeight,
            Line.SIGHT_BLOCKED_WEST | extraFlag,
            Line.SIGHT_BLOCKED_EAST | extraFlag,
            Line.SIGHT_BLOCKED_SOUTH | extraFlag,
            Line.SIGHT_BLOCKED_NORTH | extraFlag,
            CollisionFlag.LOC | extraFlag,
            CollisionFlag.LOC_PROJ_BLOCKER | extraFlag,
            true
        )
    }

    hasLineOfWalk(
        level: number,
        srcX: number,
        srcZ: number,
        destX: number,
        destZ: number,
        srcSize: number = 1,
        destWidth: number = 0,
        destHeight: number = 0,
        extraFlag: number = 0
    ): boolean {
        return this.rayCast(
            level,
            srcX,
            srcZ,
            destX,
            destZ,
            srcSize,
            destWidth,
            destHeight,
            Line.WALK_BLOCKED_WEST | extraFlag,
            Line.WALK_BLOCKED_EAST | extraFlag,
            Line.WALK_BLOCKED_SOUTH | extraFlag,
            Line.WALK_BLOCKED_NORTH | extraFlag,
            CollisionFlag.LOC | extraFlag,
            CollisionFlag.LOC_PROJ_BLOCKER | extraFlag,
            false
        )
    }

    rayCast(
        level: number,
        srcX: number,
        srcZ: number,
        destX: number,
        destZ: number,
        srcSize: number,
        destWidth: number,
        destHeight: number,
        flagWest: number,
        flagEast: number,
        flagSouth: number,
        flagNorth: number,
        flagLoc: number,
        flagProj: number,
        los: boolean
    ): boolean {
        const startX = Line.coordinate(srcX, destX, srcSize);
        const startZ = Line.coordinate(srcZ, destZ, srcSize);

        if (los && this.flags.isFlagged(startX, startZ, level, flagLoc)) {
            return false;
        }

        const endX = Line.coordinate(destX, srcX, destWidth);
        const endZ = Line.coordinate(destZ, srcZ, destHeight);

        if (startX == endX && startZ == endZ) {
            return true;
        }

        const deltaX = endX - startX;
        const deltaZ = endZ - startZ;
        const absoluteDeltaX = Math.abs(deltaX);
        const absoluteDeltaZ = Math.abs(deltaZ);

        const travelEast = deltaX >= 0;
        const travelNorth = deltaZ >= 0;

        let xFlags = travelEast ? flagWest : flagEast;
        let zFlags = travelNorth ? flagSouth : flagNorth;

        if (absoluteDeltaX > absoluteDeltaZ) {
            const offsetX = travelEast ? 1 : -1;
            const offsetZ = travelNorth ? 0 : -1;

            let scaledZ = Line.scaleUp(startZ) + Line.HALF_TILE + offsetZ;
            const tangent = Line.scaleUp(deltaZ) / absoluteDeltaX;

            let currX = startX;
            while (currX != endX) {
                currX += offsetX;
                const currZ = Line.scaleDown(scaledZ);
                if (los && currX == endX && currZ == endZ) {
                    xFlags = xFlags & ~flagProj;
                }
                if (this.flags.isFlagged(currX, currZ, level, xFlags)) {
                    return false;
                }

                scaledZ += tangent;

                const nextZ = Line.scaleDown(scaledZ);
                if (los && currX == endX && nextZ == endZ) {
                    zFlags = zFlags & ~flagProj;
                }
                if (nextZ != currZ && this.flags.isFlagged(currX, nextZ, level, zFlags)) {
                    return false;
                }
            }
        } else {
            const offsetX = travelEast ? 0 : -1;
            const offsetZ = travelNorth ? 1 : -1;

            let scaledX = Line.scaleUp(startX) + Line.HALF_TILE + offsetX;
            const tangent = Line.scaleUp(deltaX) / absoluteDeltaZ;

            let currZ = startZ;
            while (currZ != endZ) {
                currZ += offsetZ;
                const currX = Line.scaleDown(scaledX);
                if (los && currX == endX && currZ == endZ) {
                    zFlags = zFlags & ~flagProj;
                }
                if (this.flags.isFlagged(currX, currZ, level, zFlags)) {
                    return false;
                }

                scaledX += tangent;

                const nextX = Line.scaleDown(scaledX);
                if (los && nextX == endX && currZ == endZ) {
                    xFlags = xFlags & ~flagProj;
                }
                if (nextX != currX && this.flags.isFlagged(nextX, currZ, level, xFlags)) {
                    return false;
                }
            }
        }
        return true;
    }
}
