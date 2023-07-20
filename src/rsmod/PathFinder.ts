// noinspection DuplicatedCode

import CollisionFlag from "#rsmod/flag/CollisionFlag.js";
import CollisionFlagMap from "#rsmod/collision/CollisionFlagMap.js";
import CollisionStrategy from "#rsmod/collision/CollisionStrategy.js";
import ReachStrategy from "#rsmod/reach/ReachStrategy.js";
import DirectionFlag from "#rsmod/flag/DirectionFlag.js";
import CollisionStrategies from "#rsmod/collision/CollisionStrategies.js";
import Route from "#rsmod/Route.js";
import RotationUtils from "#rsmod/utils/RotationUtils.js";
import RouteCoordinates from "#rsmod/RouteCoordinates.js";

export default class PathFinder {
    private static DEFAULT_SEARCH_MAP_SIZE: number = 128;
    private static DEFAULT_RING_BUFFER_SIZE: number = 4096;
    private static DEFAULT_DISTANCE_VALUE: number = 99_999_999;
    private static DEFAULT_SRC_DIRECTION_VALUE: number = 99;
    private static MAX_ALTERNATIVE_ROUTE_LOWEST_COST: number = 1000;
    private static MAX_ALTERNATIVE_ROUTE_SEEK_RANGE: number = 100;
    private static MAX_ALTERNATIVE_ROUTE_DISTANCE_FROM_DESTINATION: number = 10;

    private readonly flags: CollisionFlagMap;
    private readonly searchMapSize: number;
    private readonly ringBufferSize: number;
    private readonly directions: Int32Array;
    private readonly distances: Int32Array;
    private readonly validLocalX: Int32Array;
    private readonly validLocalZ: Int32Array;

    private currLocalX: number = 0;
    private currLocalZ: number = 0;
    private bufReaderIndex: number = 0;
    private bufWriterIndex: number = 0;

    constructor(
        flags: CollisionFlagMap,
        searchMapSize: number = PathFinder.DEFAULT_SEARCH_MAP_SIZE,
        ringBufferSize: number = PathFinder.DEFAULT_RING_BUFFER_SIZE
    ) {
        this.flags = flags;
        this.searchMapSize = searchMapSize;
        this.ringBufferSize = ringBufferSize;
        this.directions = new Int32Array(searchMapSize * searchMapSize);
        this.distances = new Int32Array(searchMapSize * searchMapSize).fill(PathFinder.DEFAULT_DISTANCE_VALUE);
        this.validLocalX = new Int32Array(ringBufferSize);
        this.validLocalZ = new Int32Array(ringBufferSize);
    }

    findPath(
        level: number,
        srcX: number,
        srcZ: number,
        destX: number,
        destZ: number,
        srcSize: number = 1,
        destWidth: number = 1,
        destHeight: number = 1,
        rotation: number = 0,
        shape: number = -1,
        moveNear: Boolean = true,
        blockAccessFlags: number = 0,
        maxWaypoints: number = 25,
        collision: CollisionStrategy = CollisionStrategies.NORMAL
    ): Route {
        if (!(srcX >= 0 && srcX <= 0x7FFF && srcZ >= 0 && srcZ <= 0x7FFF)) {
            throw new Error(`Failed requirement. srcX was: ${srcX}, srcZ was: ${srcZ}.`);
        }
        if (!(destX >= 0 && destX <= 0x7FFF && destZ >= 0 && destZ <= 0x7FFF)) {
            throw new Error(`Failed requirement. destX was: ${destX}, destZ was: ${destZ}.`);
        }
        if (!(level >= 0 && level <= 0x3)) {
            throw new Error(`Failed requirement. level was: ${level}.`);
        }
        this.reset();
        const baseX = srcX - (this.searchMapSize / 2);
        const baseZ = srcZ - (this.searchMapSize / 2);
        const localSrcX = srcX - baseX;
        const localSrcZ = srcZ - baseZ;
        const localDestX = destX - baseX;
        const localDestZ = destZ - baseZ;
        this.appendDirection(localSrcX, localSrcZ, PathFinder.DEFAULT_SRC_DIRECTION_VALUE, 0);

        let pathFound: boolean;
        switch (srcSize) {
            case 1:
                pathFound = this.findPath1(
                    baseX,
                    baseZ,
                    level,
                    localDestX,
                    localDestZ,
                    destWidth,
                    destHeight,
                    srcSize,
                    rotation,
                    shape,
                    blockAccessFlags,
                    collision
                )
                break;
            case 2:
                pathFound = this.findPath2(
                    baseX,
                    baseZ,
                    level,
                    localDestX,
                    localDestZ,
                    destWidth,
                    destHeight,
                    srcSize,
                    rotation,
                    shape,
                    blockAccessFlags,
                    collision
                )
                break;
            default:
                pathFound = this.findPathN(
                    baseX,
                    baseZ,
                    level,
                    localDestX,
                    localDestZ,
                    destWidth,
                    destHeight,
                    srcSize,
                    rotation,
                    shape,
                    blockAccessFlags,
                    collision
                )
                break;
        }
        if (!pathFound) {
            if (!moveNear) {
                return Route.FAILED;
            }
            const foundApproachPoint = this.findClosestApproachPoint(
                localDestX,
                localDestZ,
                RotationUtils.rotate(rotation, destWidth, destHeight),
                RotationUtils.rotate(rotation, destHeight, destWidth)
            );
            if (!foundApproachPoint) {
                return Route.FAILED;
            }
        }
        const waypoints = Array<RouteCoordinates>();
        let nextDir = this.directions[this.localIndex(this.currLocalX, this.currLocalZ)];
        let currDir = -1;

        for (let index = 0; index < this.directions.length; index++) {
            if (this.currLocalX == localSrcX && this.currLocalZ == localSrcZ) {
                break;
            }
            if (currDir != nextDir) {
                currDir = nextDir;
                if (waypoints.length >= maxWaypoints) {
                    waypoints.pop();
                }
                const coords = new RouteCoordinates(baseX + this.currLocalX, baseZ + this.currLocalZ, level);
                waypoints.unshift(coords)
            }
            if ((currDir & DirectionFlag.EAST) != 0) {
                this.currLocalX++;
            } else if ((currDir & DirectionFlag.WEST) != 0) {
                this.currLocalX--;
            }
            if ((currDir & DirectionFlag.NORTH) != 0) {
                this.currLocalZ++;
            } else if ((currDir & DirectionFlag.SOUTH) != 0) {
                this.currLocalZ--;
            }
            nextDir = this.directions[this.localIndex(this.currLocalX, this.currLocalZ)];
        }
        return new Route(waypoints, !pathFound, true);
    }

    private findPath1(
        baseX: number,
        baseZ: number,
        level: number,
        localDestX: number,
        localDestZ: number,
        destWidth: number,
        destHeight: number,
        srcSize: number,
        rotation: number,
        shape: number,
        blockAccessFlags: number,
        collision: CollisionStrategy
    ): boolean {
        let x: number;
        let z: number;
        let clipFlag: number;
        let dirFlag: number;
        const relativeSearchSize = this.searchMapSize - 1;

        while (this.bufWriterIndex != this.bufReaderIndex) {
            this.currLocalX = this.validLocalX[this.bufReaderIndex];
            this.currLocalZ = this.validLocalZ[this.bufReaderIndex];
            this.bufReaderIndex = (this.bufReaderIndex + 1) & (this.ringBufferSize - 1);

            const reached = ReachStrategy.reached(
                this.flags,
                level,
                this.currLocalX + baseX,
                this.currLocalZ + baseZ,
                localDestX + baseX,
                localDestZ + baseZ,
                destWidth,
                destHeight,
                srcSize,
                rotation,
                shape,
                blockAccessFlags
            )
            if (reached) {
                return true;
            }

            const nextDistance = this.distances[this.localIndex(this.currLocalX, this.currLocalZ)] + 1;

            /* east to west */
            x = this.currLocalX - 1;
            z = this.currLocalZ;
            clipFlag = CollisionFlag.BLOCK_WEST;
            dirFlag = DirectionFlag.EAST;
            if (this.currLocalX > 0 && this.directions[this.localIndex(x, z)] == 0 && collision.canMove(this.collisionFlag(baseX, baseZ, x, z, level), clipFlag)) {
                this.appendDirection(x, z, dirFlag, nextDistance);
            }

            /* west to east */
            x = this.currLocalX + 1;
            z = this.currLocalZ;
            clipFlag = CollisionFlag.BLOCK_EAST;
            dirFlag = DirectionFlag.WEST;
            if (this.currLocalX < relativeSearchSize && this.directions[this.localIndex(x, z)] == 0 && collision.canMove(this.collisionFlag(baseX, baseZ, x, z, level), clipFlag)) {
                this.appendDirection(x, z, dirFlag, nextDistance);
            }

            /* north to south  */
            x = this.currLocalX
            z = this.currLocalZ - 1
            clipFlag = CollisionFlag.BLOCK_SOUTH
            dirFlag = DirectionFlag.NORTH
            if (this.currLocalZ > 0 && this.directions[this.localIndex(x, z)] == 0 && collision.canMove(this.collisionFlag(baseX, baseZ, x, z, level), clipFlag)) {
                this.appendDirection(x, z, dirFlag, nextDistance)
            }

            /* south to north */
            x = this.currLocalX
            z = this.currLocalZ + 1
            clipFlag = CollisionFlag.BLOCK_NORTH
            dirFlag = DirectionFlag.SOUTH
            if (this.currLocalZ < relativeSearchSize && this.directions[this.localIndex(x, z)] == 0 && collision.canMove(this.collisionFlag(baseX, baseZ, x, z, level), clipFlag)) {
                this.appendDirection(x, z, dirFlag, nextDistance)
            }

            /* north-east to south-west */
            x = this.currLocalX - 1
            z = this.currLocalZ - 1
            dirFlag = DirectionFlag.NORTH_EAST
            if (this.currLocalX > 0 && this.currLocalZ > 0 && this.directions[this.localIndex(x, z)] == 0 &&
                collision.canMove(this.collisionFlag(baseX, baseZ, x, z, level), CollisionFlag.BLOCK_SOUTH_WEST) &&
                collision.canMove(this.collisionFlag(baseX, baseZ, x, this.currLocalZ, level), CollisionFlag.BLOCK_WEST) &&
                collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX, z, level), CollisionFlag.BLOCK_SOUTH)
            ) {
                this.appendDirection(x, z, dirFlag, nextDistance)
            }

            /* north-west to south-east */
            x = this.currLocalX + 1
            z = this.currLocalZ - 1
            dirFlag = DirectionFlag.NORTH_WEST
            if (this.currLocalX < relativeSearchSize && this.currLocalZ > 0 && this.directions[this.localIndex(x, z)] == 0 &&
                collision.canMove(this.collisionFlag(baseX, baseZ, x, z, level), CollisionFlag.BLOCK_SOUTH_EAST) &&
                collision.canMove(this.collisionFlag(baseX, baseZ, x, this.currLocalZ, level), CollisionFlag.BLOCK_EAST) &&
                collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX, z, level), CollisionFlag.BLOCK_SOUTH)
            ) {
                this.appendDirection(x, z, dirFlag, nextDistance)
            }

            /* south-east to north-west */
            x = this.currLocalX - 1
            z = this.currLocalZ + 1
            dirFlag = DirectionFlag.SOUTH_EAST
            if (this.currLocalX > 0 && this.currLocalZ < relativeSearchSize && this.directions[this.localIndex(x, z)] == 0 &&
                collision.canMove(this.collisionFlag(baseX, baseZ, x, z, level), CollisionFlag.BLOCK_NORTH_WEST) &&
                collision.canMove(this.collisionFlag(baseX, baseZ, x, this.currLocalZ, level), CollisionFlag.BLOCK_WEST) &&
                collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX, z, level), CollisionFlag.BLOCK_NORTH)
            ) {
                this.appendDirection(x, z, dirFlag, nextDistance)
            }

            /* south-west to north-east */
            x = this.currLocalX + 1
            z = this.currLocalZ + 1
            dirFlag = DirectionFlag.SOUTH_WEST
            if (this.currLocalX < relativeSearchSize && this.currLocalZ < relativeSearchSize && this.directions[this.localIndex(x, z)] == 0 &&
                collision.canMove(this.collisionFlag(baseX, baseZ, x, z, level), CollisionFlag.BLOCK_NORTH_EAST) &&
                collision.canMove(this.collisionFlag(baseX, baseZ, x, this.currLocalZ, level), CollisionFlag.BLOCK_EAST) &&
                collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX, z, level), CollisionFlag.BLOCK_NORTH)
            ) {
                this.appendDirection(x, z, dirFlag, nextDistance)
            }
        }
        return false;
    }

    private findPath2(
        baseX: number,
        baseZ: number,
        level: number,
        localDestX: number,
        localDestZ: number,
        destWidth: number,
        destHeight: number,
        srcSize: number,
        rotation: number,
        shape: number,
        blockAccessFlags: number,
        collision: CollisionStrategy
    ): boolean {
        let x: number;
        let z: number;
        let dirFlag: number;
        const relativeSearchSize = this.searchMapSize - 2;

        while (this.bufWriterIndex != this.bufReaderIndex) {
            this.currLocalX = this.validLocalX[this.bufReaderIndex];
            this.currLocalZ = this.validLocalZ[this.bufReaderIndex];
            this.bufReaderIndex = (this.bufReaderIndex + 1) & (this.ringBufferSize - 1);

            const reached = ReachStrategy.reached(
                this.flags,
                level,
                this.currLocalX + baseX,
                this.currLocalZ + baseZ,
                localDestX + baseX,
                localDestZ + baseZ,
                destWidth,
                destHeight,
                srcSize,
                rotation,
                shape,
                blockAccessFlags
            )
            if (reached) {
                return true;
            }

            const nextDistance = this.distances[this.localIndex(this.currLocalX, this.currLocalZ)] + 1;

            /* east to west */
            x = this.currLocalX - 1
            z = this.currLocalZ
            dirFlag = DirectionFlag.EAST
            if (this.currLocalX > 0 && this.directions[this.localIndex(x, z)] == 0 &&
                collision.canMove(this.collisionFlag(baseX, baseZ, x, z, level), CollisionFlag.BLOCK_SOUTH_WEST) &&
                collision.canMove(this.collisionFlag(baseX, baseZ, x, this.currLocalZ + 1, level), CollisionFlag.BLOCK_NORTH_WEST)
            ) {
                this.appendDirection(x, z, dirFlag, nextDistance)
            }

            /* west to east */
            x = this.currLocalX + 1
            z = this.currLocalZ
            dirFlag = DirectionFlag.WEST
            if (this.currLocalX < relativeSearchSize && this.directions[this.localIndex(x, z)] == 0 &&
                collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX + 2, z, level), CollisionFlag.BLOCK_SOUTH_EAST) &&
                collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX + 2, this.currLocalZ + 1, level), CollisionFlag.BLOCK_NORTH_EAST)
            ) {
                this.appendDirection(x, z, dirFlag, nextDistance)
            }

            /* north to south  */
            x = this.currLocalX
            z = this.currLocalZ - 1
            dirFlag = DirectionFlag.NORTH
            if (this.currLocalZ > 0 && this.directions[this.localIndex(x, z)] == 0 &&
                collision.canMove(this.collisionFlag(baseX, baseZ, x, z, level), CollisionFlag.BLOCK_SOUTH_WEST) &&
                collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX + 1, z, level), CollisionFlag.BLOCK_SOUTH_EAST)
            ) {
                this.appendDirection(x, z, dirFlag, nextDistance)
            }

            /* south to north */
            x = this.currLocalX
            z = this.currLocalZ + 1
            dirFlag = DirectionFlag.SOUTH
            if (this.currLocalZ < relativeSearchSize && this.directions[this.localIndex(x, z)] == 0 &&
                collision.canMove(this.collisionFlag(baseX, baseZ, x, this.currLocalZ + 2, level), CollisionFlag.BLOCK_NORTH_WEST) &&
                collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX + 1, this.currLocalZ + 2, level), CollisionFlag.BLOCK_NORTH_EAST)
            ) {
                this.appendDirection(x, z, dirFlag, nextDistance)
            }

            /* north-east to south-west */
            x = this.currLocalX - 1
            z = this.currLocalZ - 1
            dirFlag = DirectionFlag.NORTH_EAST
            if (this.currLocalX > 0 && this.currLocalZ > 0 && this.directions[this.localIndex(x, z)] == 0 &&
                collision.canMove(this.collisionFlag(baseX, baseZ, x, this.currLocalZ, level), CollisionFlag.BLOCK_NORTH_AND_SOUTH_EAST) &&
                collision.canMove(this.collisionFlag(baseX, baseZ, x, z, level), CollisionFlag.BLOCK_SOUTH_WEST) &&
                collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX, z, level), CollisionFlag.BLOCK_NORTH_EAST_AND_WEST)
            ) {
                this.appendDirection(x, z, dirFlag, nextDistance)
            }

            /* north-west to south-east */
            x = this.currLocalX + 1
            z = this.currLocalZ - 1
            dirFlag = DirectionFlag.NORTH_WEST
            if (this.currLocalX < relativeSearchSize && this.currLocalZ > 0 && this.directions[this.localIndex(x, z)] == 0 &&
                collision.canMove(this.collisionFlag(baseX, baseZ, x, z, level), CollisionFlag.BLOCK_NORTH_EAST_AND_WEST) &&
                collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX + 2, z, level), CollisionFlag.BLOCK_SOUTH_EAST) &&
                collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX + 2, this.currLocalZ, level), CollisionFlag.BLOCK_NORTH_AND_SOUTH_WEST)
            ) {
                this.appendDirection(x, z, dirFlag, nextDistance)
            }

            /* south-east to north-west */
            x = this.currLocalX - 1
            z = this.currLocalZ + 1
            dirFlag = DirectionFlag.SOUTH_EAST
            if (this.currLocalX > 0 && this.currLocalZ < relativeSearchSize && this.directions[this.localIndex(x, z)] == 0 &&
                collision.canMove(this.collisionFlag(baseX, baseZ, x, z, level), CollisionFlag.BLOCK_NORTH_AND_SOUTH_EAST) &&
                collision.canMove(this.collisionFlag(baseX, baseZ, x, this.currLocalZ + 2, level), CollisionFlag.BLOCK_NORTH_WEST) &&
                collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX, this.currLocalZ + 2, level), CollisionFlag.BLOCK_SOUTH_EAST_AND_WEST)
            ) {
                this.appendDirection(x, z, dirFlag, nextDistance)
            }

            /* south-west to north-east */
            x = this.currLocalX + 1
            z = this.currLocalZ + 1
            dirFlag = DirectionFlag.SOUTH_WEST
            if (this.currLocalX < relativeSearchSize && this.currLocalZ < relativeSearchSize && this.directions[this.localIndex(x, z)] == 0 &&
                collision.canMove(this.collisionFlag(baseX, baseZ, x, this.currLocalZ + 2, level), CollisionFlag.BLOCK_SOUTH_EAST_AND_WEST) &&
                collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX + 2, this.currLocalZ + 2, level), CollisionFlag.BLOCK_NORTH_EAST) &&
                collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX + 2, z, level), CollisionFlag.BLOCK_NORTH_AND_SOUTH_WEST)
            ) {
                this.appendDirection(x, z, dirFlag, nextDistance)
            }
        }
        return false;
    }

    private findPathN(
        baseX: number,
        baseZ: number,
        level: number,
        localDestX: number,
        localDestZ: number,
        destWidth: number,
        destHeight: number,
        srcSize: number,
        rotation: number,
        shape: number,
        blockAccessFlags: number,
        collision: CollisionStrategy
    ): boolean {
        let x: number;
        let z: number;
        let dirFlag: number;
        const relativeSearchSize = this.searchMapSize - srcSize;

        while (this.bufWriterIndex != this.bufReaderIndex) {
            this.currLocalX = this.validLocalX[this.bufReaderIndex];
            this.currLocalZ = this.validLocalZ[this.bufReaderIndex];
            this.bufReaderIndex = (this.bufReaderIndex + 1) & (this.ringBufferSize - 1);

            const reached = ReachStrategy.reached(
                this.flags,
                level,
                this.currLocalX + baseX,
                this.currLocalZ + baseZ,
                localDestX + baseX,
                localDestZ + baseZ,
                destWidth,
                destHeight,
                srcSize,
                rotation,
                shape,
                blockAccessFlags
            )
            if (reached) {
                return true;
            }

            const nextDistance = this.distances[this.localIndex(this.currLocalX, this.currLocalZ)] + 1;

            /* east to west */
            x = this.currLocalX - 1
            z = this.currLocalZ
            dirFlag = DirectionFlag.EAST
            if (this.currLocalX > 0 && this.directions[this.localIndex(x, z)] == 0 &&
                collision.canMove(this.collisionFlag(baseX, baseZ, x, z, level), CollisionFlag.BLOCK_SOUTH_WEST) &&
                collision.canMove(this.collisionFlag(baseX, baseZ, x, this.currLocalZ + srcSize - 1, level), CollisionFlag.BLOCK_NORTH_WEST)
            ) {
                const clipFlag = CollisionFlag.BLOCK_NORTH_AND_SOUTH_EAST
                let blocked = false;
                for (let index = 1; index < srcSize - 1; index++) {
                    if (!collision.canMove(this.collisionFlag(baseX, baseZ, x, this.currLocalZ + index, level), clipFlag)) {
                        blocked = true;
                        break;
                    }
                }
                if (!blocked) {
                    this.appendDirection(x, z, dirFlag, nextDistance);
                }
            }

            /* west to east */
            x = this.currLocalX + 1
            z = this.currLocalZ
            dirFlag = DirectionFlag.WEST
            if (this.currLocalX < relativeSearchSize && this.directions[this.localIndex(x, z)] == 0 &&
                collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX + srcSize, z, level), CollisionFlag.BLOCK_SOUTH_EAST) &&
                collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX + srcSize, this.currLocalZ + srcSize - 1, level), CollisionFlag.BLOCK_NORTH_EAST)
            ) {
                const clipFlag = CollisionFlag.BLOCK_NORTH_AND_SOUTH_WEST
                let blocked = false;
                for (let index = 1; index < srcSize - 1; index++) {
                    if (!collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX + srcSize, this.currLocalZ + index, level), clipFlag)) {
                        blocked = true;
                        break;
                    }
                }
                if (!blocked) {
                    this.appendDirection(x, z, dirFlag, nextDistance)
                }
            }

            /* north to south  */
            x = this.currLocalX
            z = this.currLocalZ - 1
            dirFlag = DirectionFlag.NORTH
            if (this.currLocalZ > 0 && this.directions[this.localIndex(x, z)] == 0 &&
                collision.canMove(this.collisionFlag(baseX, baseZ, x, z, level), CollisionFlag.BLOCK_SOUTH_WEST) &&
                collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX + srcSize - 1, z, level), CollisionFlag.BLOCK_SOUTH_EAST)
            ) {
                const clipFlag = CollisionFlag.BLOCK_NORTH_EAST_AND_WEST
                let blocked = false;
                for (let index = 1; index < srcSize - 1; index++) {
                    if (!collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX + index, z, level), clipFlag)) {
                        blocked = true;
                        break;
                    }
                }
                if (!blocked) {
                    this.appendDirection(x, z, dirFlag, nextDistance)
                }
            }

            /* south to north */
            x = this.currLocalX
            z = this.currLocalZ + 1
            dirFlag = DirectionFlag.SOUTH
            if (this.currLocalZ < relativeSearchSize && this.directions[this.localIndex(x, z)] == 0 &&
                collision.canMove(this.collisionFlag(baseX, baseZ, x, this.currLocalZ + srcSize, level), CollisionFlag.BLOCK_NORTH_WEST) &&
                collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX + srcSize - 1, this.currLocalZ + srcSize, level), CollisionFlag.BLOCK_NORTH_EAST)
            ) {
                const clipFlag = CollisionFlag.BLOCK_SOUTH_EAST_AND_WEST
                let blocked = false;
                for (let index = 1; index < srcSize - 1; index++) {
                    if (!collision.canMove(this.collisionFlag(baseX, baseZ, x + index, this.currLocalZ + srcSize, level), clipFlag)) {
                        blocked = true;
                        break;
                    }
                }
                if (!blocked) {
                    this.appendDirection(x, z, dirFlag, nextDistance)
                }
            }

            /* north-east to south-west */
            x = this.currLocalX - 1
            z = this.currLocalZ - 1
            dirFlag = DirectionFlag.NORTH_EAST
            if (this.currLocalX > 0 && this.currLocalZ > 0 && this.directions[this.localIndex(x, z)] == 0 &&
                collision.canMove(this.collisionFlag(baseX, baseZ, x, z, level), CollisionFlag.BLOCK_SOUTH_WEST)
            ) {
                const clipFlag1 = CollisionFlag.BLOCK_NORTH_AND_SOUTH_EAST
                const clipFlag2 = CollisionFlag.BLOCK_NORTH_EAST_AND_WEST
                let blocked = false;
                for (let index = 1; index < srcSize; index++) {
                    const first = !collision.canMove(this.collisionFlag(baseX, baseZ, x, this.currLocalZ + index - 1, level), clipFlag1);
                    const second = !collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX + index - 1, z, level), clipFlag2);
                    if (first || second) {
                        blocked = true;
                        break;
                    }
                }
                if (!blocked) {
                    this.appendDirection(x, z, dirFlag, nextDistance)
                }
            }

            /* north-west to south-east */
            x = this.currLocalX + 1
            z = this.currLocalZ - 1
            dirFlag = DirectionFlag.NORTH_WEST
            if (this.currLocalX < relativeSearchSize && this.currLocalZ > 0 && this.directions[this.localIndex(x, z)] == 0 &&
                collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX + srcSize, z, level), CollisionFlag.BLOCK_SOUTH_EAST)
            ) {
                const clipFlag1 = CollisionFlag.BLOCK_NORTH_AND_SOUTH_WEST
                const clipFlag2 = CollisionFlag.BLOCK_NORTH_EAST_AND_WEST
                let blocked = false;
                for (let index = 1; index < srcSize; index++) {
                    const first = !collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX + srcSize, this.currLocalZ + index - 1, level), clipFlag1);
                    const second = !collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX + index, z, level), clipFlag2);
                    if (first || second) {
                        blocked = true;
                        break;
                    }
                }
                if (!blocked) {
                    this.appendDirection(x, z, dirFlag, nextDistance)
                }
            }

            /* south-east to north-west */
            x = this.currLocalX - 1
            z = this.currLocalZ + 1
            dirFlag = DirectionFlag.SOUTH_EAST
            if (this.currLocalX > 0 && this.currLocalZ < relativeSearchSize && this.directions[this.localIndex(x, z)] == 0 &&
                collision.canMove(this.collisionFlag(baseX, baseZ, x, this.currLocalZ + srcSize, level), CollisionFlag.BLOCK_NORTH_WEST)
            ) {
                const clipFlag1 = CollisionFlag.BLOCK_NORTH_AND_SOUTH_EAST
                const clipFlag2 = CollisionFlag.BLOCK_SOUTH_EAST_AND_WEST
                let blocked = false;
                for (let index = 1; index < srcSize; index++) {
                    const first = !collision.canMove(this.collisionFlag(baseX, baseZ, x, this.currLocalZ + index, level), clipFlag1);
                    const second = !collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX + index - 1, this.currLocalZ + srcSize, level), clipFlag2);
                    if (first || second) {
                        blocked = true;
                        break;
                    }
                }
                if (!blocked) {
                    this.appendDirection(x, z, dirFlag, nextDistance)
                }
            }

            /* south-west to north-east */
            x = this.currLocalX + 1
            z = this.currLocalZ + 1
            dirFlag = DirectionFlag.SOUTH_WEST
            if (this.currLocalX < relativeSearchSize && this.currLocalZ < relativeSearchSize && this.directions[this.localIndex(x, z)] == 0 &&
                collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX + srcSize, this.currLocalZ + srcSize, level), CollisionFlag.BLOCK_NORTH_EAST)
            ) {
                const clipFlag1 = CollisionFlag.BLOCK_SOUTH_EAST_AND_WEST
                const clipFlag2 = CollisionFlag.BLOCK_NORTH_AND_SOUTH_WEST
                let blocked = false;
                for (let index = 1; index < srcSize; index++) {
                    const first = !collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX + index, this.currLocalZ + srcSize, level), clipFlag1);
                    const second = !collision.canMove(this.collisionFlag(baseX, baseZ, this.currLocalX + srcSize, this.currLocalZ + index, level), clipFlag2);
                    if (first || second) {
                        blocked = true;
                        break;
                    }
                }
                if (!blocked) {
                    this.appendDirection(x, z, dirFlag, nextDistance)
                }
            }
        }
        return false;
    }

    private findClosestApproachPoint(
        localDestX: number,
        localDestZ: number,
        width: number,
        height: number
    ): boolean {
        let lowestCost = PathFinder.MAX_ALTERNATIVE_ROUTE_LOWEST_COST;
        let maxAlternativePath = PathFinder.MAX_ALTERNATIVE_ROUTE_SEEK_RANGE;
        const alternativeRouteRange = PathFinder.MAX_ALTERNATIVE_ROUTE_DISTANCE_FROM_DESTINATION;
        for (let x = (localDestX - alternativeRouteRange); x <= (localDestX + alternativeRouteRange); x++) {
            for (let z = (localDestX - alternativeRouteRange); z <= (localDestX + alternativeRouteRange); z++) {
                if (!(x >= 0 && x < this.searchMapSize) ||
                    !(z >= 0 && z < this.searchMapSize) ||
                    this.distances[this.localIndex(x, z)] >= PathFinder.MAX_ALTERNATIVE_ROUTE_SEEK_RANGE
                ) {
                    continue
                }

                let dx = 0;
                if (x < localDestX) {
                    dx = localDestX - x;
                } else if (x > localDestX + width - 1) {
                    dx = x - (width + localDestX - 1);
                }

                let dz = 0;
                if (z < localDestZ) {
                    dz = localDestZ - z;
                } else if (z > localDestZ + height - 1) {
                    dz = z - (height + localDestZ - 1);
                }
                const cost = dx * dx + dz * dz;
                if (cost < lowestCost || (cost == lowestCost && maxAlternativePath > this.distances[this.localIndex(x, z)])) {
                    this.currLocalX = x;
                    this.currLocalZ = z;
                    lowestCost = cost;
                    maxAlternativePath = this.distances[this.localIndex(x, z)];
                }
            }
        }
        return lowestCost != PathFinder.MAX_ALTERNATIVE_ROUTE_LOWEST_COST
    }

    private localIndex(x: number, z: number): number {
        return (x * this.searchMapSize) + z
    }

    private collisionFlag(
        baseX: number,
        baseZ: number,
        localX: number,
        localZ: number,
        level: number
    ): number {
        return this.flags.get(baseX + localX, baseZ + localZ, level);
    }

    private appendDirection(
        x: number,
        z: number,
        direction: number,
        distance: number
    ): void {
        const index = this.localIndex(x, z);
        this.directions[index] = direction;
        this.distances[index] = distance;
        this.validLocalX[this.bufWriterIndex] = x;
        this.validLocalZ[this.bufWriterIndex] = z;
        this.bufWriterIndex = (this.bufWriterIndex + 1) & (this.ringBufferSize - 1);
    }

    private reset(): void {
        this.directions.fill(0);
        this.distances.fill(PathFinder.DEFAULT_DISTANCE_VALUE);
        this.bufReaderIndex = 0;
        this.bufWriterIndex = 0;
    }
}
