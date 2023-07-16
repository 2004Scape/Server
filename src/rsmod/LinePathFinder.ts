import CollisionFlag from "./flag/CollisionFlag.js";
import RayCast from "./RayCast.js";
import CollisionFlagMap from "./collision/CollisionFlagMap.js";
import RouteCoordinates from "./RouteCoordinates.js";
import Line from "./Line.js";

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
        )
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
        flagObject: number,
        los: boolean
    ): RayCast {
        const startX = Line.coordinate(srcX, destX, srcSize);
        const startZ = Line.coordinate(srcZ, destZ, srcSize);

        if (los && this.flags.isFlagged(startX, startZ, level, flagObject)) {
            return RayCast.FAILED;
        }

        const endX = Line.coordinate(destX, srcX, destWidth);
        const endZ = Line.coordinate(destZ, srcZ, destHeight);

        if (startX == endX && startZ == endZ) {
            return RayCast.EMPTY_SUCCESS;
        }

        const deltaX = endX - startX;
        const deltaZ = endZ - startZ;
        const absoluteDeltaX = Math.abs(deltaX);
        const absoluteDeltaZ = Math.abs(deltaZ);

        const travelEast = deltaX >= 0;
        const travelNorth = deltaZ >= 0;

        let xFlags = travelEast ? flagWest : flagEast;
        let zFlags = travelNorth ? flagSouth : flagNorth;

        const coordinates = Array<RouteCoordinates>()
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
                    xFlags = xFlags & ~CollisionFlag.LOC_PROJ_BLOCKER;
                }
                if (this.flags.isFlagged(currX, currZ, level, xFlags)) {
                    return new RayCast(coordinates, coordinates.length > 0, false);
                }
                coordinates.push(new RouteCoordinates(currX, currZ, level));

                scaledZ += tangent;

                const nextZ = Line.scaleDown(scaledZ);
                if (los && currX == endX && nextZ == endZ) {
                    zFlags = zFlags & ~CollisionFlag.LOC_PROJ_BLOCKER;
                }
                if (nextZ != currZ) {
                    if (this.flags.isFlagged(currX, nextZ, level, zFlags)) {
                        return new RayCast(coordinates, coordinates.length > 0, false);
                    }
                    coordinates.push(new RouteCoordinates(currX, nextZ, level));
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
                    zFlags = zFlags & ~CollisionFlag.LOC_PROJ_BLOCKER;
                }
                if (this.flags.isFlagged(currX, currZ, level, zFlags)) {
                    return new RayCast(coordinates, coordinates.length > 0, false);
                }
                coordinates.push(new RouteCoordinates(currX, currZ, level));

                scaledX += tangent;

                const nextX = Line.scaleDown(scaledX);
                if (los && nextX == endX && currZ == endZ) {
                    xFlags = xFlags & ~CollisionFlag.LOC_PROJ_BLOCKER;
                }
                if (nextX != currX) {
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
