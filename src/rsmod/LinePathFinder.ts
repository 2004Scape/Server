import CollisionFlag from '#rsmod/flag/CollisionFlag.js';
import RayCast from '#rsmod/RayCast.js';
import CollisionFlagMap from '#rsmod/collision/CollisionFlagMap.js';
import RouteCoordinates from '#rsmod/RouteCoordinates.js';
import Line from '#rsmod/Line.js';

export default class LinePathFinder {
    private readonly flags: CollisionFlagMap;

    constructor(flags: CollisionFlagMap) {
        this.flags = flags;
    }

    lineOfSight(
        level: number,
        srcX: number,
        srcZ: number,
        destX: number,
        destZ: number,
        srcSize: number = 1,
        destWidth: number = 0,
        destHeight: number = 0,
        extraFlag: number = 0
    ): RayCast {
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
            true
        );
    }

    lineOfWalk(
        level: number,
        srcX: number,
        srcZ: number,
        destX: number,
        destZ: number,
        srcSize: number = 1,
        destWidth: number = 0,
        destHeight: number = 0,
        extraFlag: number = 0
    ): RayCast {
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
        flagObject: number,
        los: boolean
    ): RayCast {
        const startX: number = Line.coordinate(srcX, destX, srcSize);
        const startZ: number = Line.coordinate(srcZ, destZ, srcSize);

        if (los && this.flags.isFlagged(startX, startZ, level, flagObject)) {
            return RayCast.FAILED;
        }

        const endX: number = Line.coordinate(destX, srcX, destWidth);
        const endZ: number = Line.coordinate(destZ, srcZ, destHeight);

        if (startX == endX && startZ == endZ) {
            return RayCast.EMPTY_SUCCESS;
        }

        const deltaX: number = endX - startX;
        const deltaZ: number = endZ - startZ;
        const absoluteDeltaX: number = Math.abs(deltaX);
        const absoluteDeltaZ: number = Math.abs(deltaZ);

        const travelEast: boolean = deltaX >= 0;
        const travelNorth: boolean = deltaZ >= 0;

        let xFlags: number = travelEast ? flagWest : flagEast;
        let zFlags: number = travelNorth ? flagSouth : flagNorth;

        const coordinates: RouteCoordinates[] = [];
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
                    xFlags = (xFlags & ~CollisionFlag.LOC_PROJ_BLOCKER) | (xFlags & ~CollisionFlag.PLAYER);
                }
                if (this.flags.isFlagged(currX, currZ, level, xFlags)) {
                    return new RayCast(coordinates, coordinates.length > 0, false);
                }
                coordinates.push(new RouteCoordinates(currX, currZ, level));

                scaledZ += tangent;

                const nextZ: number = Line.scaleDown(scaledZ);
                if (nextZ != currZ) {
                    if (los && currX == endX && nextZ == endZ) {
                        zFlags = (zFlags & ~CollisionFlag.LOC_PROJ_BLOCKER) | (zFlags & ~CollisionFlag.PLAYER);
                    }
                    if (this.flags.isFlagged(currX, nextZ, level, zFlags)) {
                        return new RayCast(coordinates, coordinates.length > 0, false);
                    }
                    coordinates.push(new RouteCoordinates(currX, nextZ, level));
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
                    zFlags = (zFlags & ~CollisionFlag.LOC_PROJ_BLOCKER) | (zFlags & ~CollisionFlag.PLAYER);
                }
                if (this.flags.isFlagged(currX, currZ, level, zFlags)) {
                    return new RayCast(coordinates, coordinates.length > 0, false);
                }
                coordinates.push(new RouteCoordinates(currX, currZ, level));

                scaledX += tangent;

                const nextX: number = Line.scaleDown(scaledX);
                if (nextX != currX) {
                    if (los && nextX == endX && currZ == endZ) {
                        xFlags = (xFlags & ~CollisionFlag.LOC_PROJ_BLOCKER) | (xFlags & ~CollisionFlag.PLAYER);
                    }
                    if (this.flags.isFlagged(nextX, currZ, level, xFlags)) {
                        return new RayCast(coordinates, coordinates.length > 0, false);
                    }
                    coordinates.push(new RouteCoordinates(nextX, currZ, level));
                }
            }
        }
        return new RayCast(coordinates, false, true);
    }
}
