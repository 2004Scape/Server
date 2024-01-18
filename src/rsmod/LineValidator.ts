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
        );
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
        );
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
        const startX: number = Line.coordinate(srcX, destX, srcSize);
        const startZ: number = Line.coordinate(srcZ, destZ, srcSize);

        if (los && this.flags.isFlagged(startX, startZ, level, flagLoc)) {
            return false;
        }

        const endX: number = Line.coordinate(destX, srcX, destWidth);
        const endZ: number = Line.coordinate(destZ, srcZ, destHeight);

        if (startX == endX && startZ == endZ) {
            return true;
        }

        const deltaX: number = endX - startX;
        const deltaZ: number = endZ - startZ;
        const absoluteDeltaX: number = Math.abs(deltaX);
        const absoluteDeltaZ: number = Math.abs(deltaZ);

        const travelEast: boolean = deltaX >= 0;
        const travelNorth: boolean = deltaZ >= 0;

        let xFlags: number = travelEast ? flagWest : flagEast;
        let zFlags: number = travelNorth ? flagSouth : flagNorth;

        if (absoluteDeltaX > absoluteDeltaZ) {
            const offsetX: number = travelEast ? 1 : -1;
            const offsetZ: number = travelNorth ? 0 : -1;

            let scaledZ: number = Line.scaleUp(startZ) + Line.HALF_TILE + offsetZ;
            const tangent: number = Line.scaleUp(deltaZ) / absoluteDeltaX;

            let currX: number = startX;
            while (currX != endX) {
                currX += offsetX;
                const currZ: number = Line.scaleDown(scaledZ);
                if (los && currX == endX && currZ == endZ) {
                    xFlags = xFlags & ~flagProj;
                }
                if (this.flags.isFlagged(currX, currZ, level, xFlags)) {
                    return false;
                }

                scaledZ += tangent;

                const nextZ: number = Line.scaleDown(scaledZ);
                if (los && currX == endX && nextZ == endZ) {
                    zFlags = zFlags & ~flagProj;
                }
                if (nextZ != currZ && this.flags.isFlagged(currX, nextZ, level, zFlags)) {
                    return false;
                }
            }
        } else {
            const offsetX: number = travelEast ? 0 : -1;
            const offsetZ: number = travelNorth ? 1 : -1;

            let scaledX: number = Line.scaleUp(startX) + Line.HALF_TILE + offsetX;
            const tangent: number = Line.scaleUp(deltaX) / absoluteDeltaZ;

            let currZ: number = startZ;
            while (currZ != endZ) {
                currZ += offsetZ;
                const currX: number = Line.scaleDown(scaledX);
                if (los && currX == endX && currZ == endZ) {
                    zFlags = zFlags & ~flagProj;
                }
                if (this.flags.isFlagged(currX, currZ, level, zFlags)) {
                    return false;
                }

                scaledX += tangent;

                const nextX: number = Line.scaleDown(scaledX);
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
