// https://gist.github.com/Z-Kris/2eb1c2fbc22aa7486a57089c82f293f8

import RouteCoordinates from '#rsmod/RouteCoordinates.js';
import CollisionStrategy from '#rsmod/collision/CollisionStrategy.js';
import Route from '#rsmod/Route.js';
import StepValidator from '#rsmod/StepValidator.js';

export default class NaivePathFinder {
    private readonly stepValidator: StepValidator
    private readonly cardinals = [
        [-1, 0], // West
        [1, 0],  // East
        [0, 1], // North
        [0, -1],  // South
    ];

    constructor(stepValidator: StepValidator) {
        this.stepValidator = stepValidator;
    }

    findPath(
        level: number,
        srcX: number,
        srcZ: number,
        destX: number,
        destZ: number,
        srcWidth: number,
        srcHeight: number,
        destWidth: number,
        destHeight: number,
        blockAccessFlags: number,
        collision: CollisionStrategy
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
        // If we are intersecting at all, the path needs to try to move out of the way.
        if (this.intersects(srcX, srcZ, srcWidth, srcHeight, destX, destZ, destWidth, destHeight)) {
            const dest = this.cardinalDestination(level, srcX, srcZ);
            return new Route([dest], false, true);
        }
        const dest = this.naiveDestination(level, srcX, srcZ, srcWidth, srcHeight, destX, destZ, destWidth, destHeight);
        if (this.isDiagonal(dest.x, dest.z, srcWidth, srcHeight, destX, destZ, destWidth, destHeight)) {
            return new Route([dest], false, true);
        }
        /* If we can interact from this coord(or overlap with the target), allow the pathfinder to exit. */
        if (this.intersects(dest.x, dest.z, srcWidth, srcHeight, destX, destZ, destWidth, destHeight)) {
            return new Route([dest], false, true);
        }
        let currX = dest.x;
        let currZ = dest.z;
        while (currX !== destX && currZ !== destZ) {
            const dx = Math.sign(destX - currX);
            const dz = Math.sign(destZ - currZ);
            if (this.stepValidator.canTravel(level, currX, currZ, dx, dz, srcWidth, blockAccessFlags, collision)) {
                currX += dx;
                currZ += dz;
            } else if (dx !== 0 && this.stepValidator.canTravel(level, currX, currZ, dx, 0, srcWidth, blockAccessFlags, collision)) {
                currX += dx;
            } else if (dz !== 0 && this.stepValidator.canTravel(level, currX, currZ, 0, dz, srcWidth, blockAccessFlags, collision)) {
                currZ += dz;
            } else {
                /* If we can't step anywhere, exit out, we've arrived. */
                break;
            }
        }
        return new Route([new RouteCoordinates(currX, currZ, level)], false, true);
    }

    /**
     * Fast way to check if two squares are intersecting.
     * @param srcX The starting SW X.
     * @param srcZ The starting SW Z.
     * @param srcWidth The width on the X axis.
     * @param srcHeight The length on the Z axis.
     * @param destX The ending SW X.
     * @param destZ The ending SW Z.
     * @param destWidth The end width on the X axis.
     * @param destHeight The end length on the Z axis.
     */
    intersects(
        srcX: number,
        srcZ: number,
        srcWidth: number,
        srcHeight: number,
        destX: number,
        destZ: number,
        destWidth: number,
        destHeight: number
    ): boolean {
        const srcHorizontal = srcX + srcWidth;
        const srcVertical = srcZ + srcHeight;
        const destHorizontal = destX + destWidth;
        const destVertical = destZ + destHeight;
        return !(destX >= srcHorizontal || destHorizontal <= srcX || destZ >= srcVertical || destVertical <= srcZ);
    }

    private isDiagonal(
        srcX: number,
        srcZ: number,
        srcWidth: number,
        srcHeight: number,
        destX: number,
        destZ: number,
        destWidth: number,
        destHeight: number
    ): boolean {
        if (srcX + srcWidth === destX && srcZ + srcHeight === destZ) {
            return true;
        }
        if (srcX - 1 === destX + destWidth - 1 && srcZ - 1 === destZ + destHeight - 1) {
            return true;
        }
        if (srcX + srcWidth == destX && srcZ - 1 == (destZ + destHeight - 1)) {
            return true
        }
        return srcX - 1 == (destX + destWidth - 1) && srcZ + srcHeight == destZ;
    }

    cardinalDestination(level: number, srcX: number, srcZ: number): RouteCoordinates {
        const direction = this.cardinals[Math.floor(Math.random() * this.cardinals.length)];
        return new RouteCoordinates(srcX + direction[0], srcZ + direction[1], level);
    }

    /**
     * Calculates coordinates for [sourceX]/[sourceZ] to move to interact with [targetX]/[targetZ]
     * We first determine the cardinal direction of the source relative to the target by comparing if
     * the source lies to the left or right of diagonal \ and anti-diagonal / lines.
     * \ <= North <= /
     *  +------------+  >
     *  |            |  East
     *  +------------+  <
     * / <= South <= \
     * We then further bisect the area into three section relative to the south-west tile (zero):
     * 1. Greater than zero: follow their diagonal until the target side is reached (clamped at the furthest most tile)
     * 2. Less than zero: zero minus the size of the source
     * 3. Equal to zero: move directly towards zero / the south-west coordinate
     *
     * <  \ 0 /   <   /
     *     +---------+
     *     |         |
     *     +---------+
     * This method is equivalent to returning the last coordinate in a sequence of steps towards south-west when moving
     * ordinal then cardinally until entity side comes into contact with another.
     */
    naiveDestination(
        level: number,
        srcX: number,
        srcZ: number,
        srcWidth: number,
        srcHeight: number,
        destX: number,
        destZ: number,
        destWidth: number,
        destHeight: number
    ): RouteCoordinates {
        const diagonal = (srcX - destX) + (srcZ - destZ);
        const anti = (srcX - destX) - (srcZ - destZ);
        const southWestClockwise = anti < 0;
        const northWestClockwise = diagonal >= (destHeight - 1) - (srcWidth - 1);
        const northEastClockwise = anti > srcWidth - srcHeight;
        const southEastClockwise = diagonal <= (destWidth - 1) - (srcHeight - 1);

        const target = new RouteCoordinates(destX, destZ, level);
        if (southWestClockwise && !northWestClockwise) { // West
            let offZ = 0;
            if (diagonal >= -srcWidth) {
                offZ = this.coerceAtMost(diagonal + srcWidth, destHeight - 1);
            } else if (anti > -srcWidth) {
                offZ = -(srcWidth + anti);
            }
            return target.translate(-srcWidth, offZ, 0)
        } else if (northWestClockwise && !northEastClockwise) { // North
            let offX = 0;
            if (anti >= -destHeight) {
                offX = this.coerceAtMost(anti + destHeight, destWidth - 1);
            } else if (diagonal < destHeight) {
                offX = this.coerceAtLeast(diagonal - destHeight, -(srcWidth - 1));
            }
            return target.translate(offX, destHeight, 0)
        } else if (northEastClockwise && !southEastClockwise) { // East
            let offZ = 0;
            if (anti <= destWidth) {
                offZ = destHeight - anti;
            } else if (diagonal < destWidth) {
                offZ = this.coerceAtLeast(diagonal - destWidth, -(srcHeight - 1));
            }
            return target.translate(destWidth, offZ, 0)
        } else {
            if (!(southEastClockwise && !southWestClockwise)) { // South
                throw new Error(`Failed requirement. southEastClockwise was: ${southEastClockwise}, southWestClockwise was: ${southWestClockwise}.`);
            }
            let offX = 0;
            if (diagonal > -srcHeight) {
                offX = this.coerceAtMost(diagonal + srcHeight, destWidth - 1);
            } else if (anti < srcHeight) {
                offX = this.coerceAtLeast(anti - srcHeight, -(srcHeight - 1));
            }
            return target.translate(offX, -srcHeight, 0)
        }
    }

    /**
     * Ensures that this value is not greater than the specified maximumValue.
     */
    private coerceAtMost(value: number, maximumValue: number): number {
        return value > maximumValue ? maximumValue : value;
    }

    /**
     * Ensures that this value is not less than the specified minimumValue.
     */
    private coerceAtLeast(value: number, minimumValue: number): number {
        return value < minimumValue ? minimumValue : value;
    }
}