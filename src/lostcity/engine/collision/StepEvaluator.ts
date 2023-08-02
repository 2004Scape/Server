import StepValidator from '#rsmod/StepValidator.js';
import CollisionStrategy from '#rsmod/collision/CollisionStrategy.js';
import CollisionStrategies from '#rsmod/collision/CollisionStrategies.js';
import CollisionFlag from '#rsmod/flag/CollisionFlag.js';

export default class StepEvaluator {
    private readonly stepValidator: StepValidator;

    constructor(stepValidator: StepValidator) {
        this.stepValidator = stepValidator;
    }

    canTravel(
        level: number,
        x: number,
        z: number,
        offsetX: number,
        offsetZ: number,
        size: number = 1,
        extraFlag: number,
        collision: CollisionStrategy = CollisionStrategies.NORMAL,
    ): boolean {
        let blocked;
        if (offsetX == 0 && offsetZ == -1) {
            blocked = this.stepValidator.isBlockedSouth(level, x, z, size, extraFlag, collision);
        } else if (offsetX == 0 && offsetZ == 1) {
            blocked = this.stepValidator.isBlockedNorth(level, x, z, size, extraFlag, collision);
        } else if (offsetX == -1 && offsetZ == 0) {
            blocked = this.stepValidator.isBlockedWest(level, x, z, size, extraFlag, collision);
        } else if (offsetX == 1 && offsetZ == 0) {
            blocked = this.stepValidator.isBlockedEast(level, x, z, size, extraFlag, collision);
        } else if (offsetX == -1 && offsetZ == -1) {
            blocked = this.stepValidator.isBlockedSouthWest(level, x, z, size, extraFlag, collision);
        } else if (offsetX == -1 && offsetZ == 1) {
            blocked = this.stepValidator.isBlockedNorthWest(level, x, z, size, extraFlag, collision);
        } else if (offsetX == 1 && offsetZ == -1) {
            blocked = this.stepValidator.isBlockedSouthEast(level, x, z, size, extraFlag, collision);
        } else if (offsetX == 1 && offsetZ == 1) {
            blocked = this.stepValidator.isBlockedNorthEast(level, x, z, size, extraFlag, collision);
        } else {
            throw new Error(`Invalid offsets: offsetX was: ${offsetX}, offsetZ was: ${offsetZ}`);
        }
        return !blocked;
    }
}
