import {buildCollisionMap, buildCollisionMapWithFlag} from "#rsmod/PathFinder.test";
import StepValidator from "#rsmod/StepValidator";
import CollisionFlag from "#rsmod/flag/CollisionFlag";
import CollisionStrategies from "#rsmod/collision/CollisionStrategies";
import CollisionFlagMap from "#rsmod/collision/CollisionFlagMap";

describe('StepValidator', () => {
    const srcX = 3200;
    const srcZ = 3200;

    const args = [
        [ 1, 0, -1 ],
        [ 1, 0, 1 ],
        [ 1, -1, 0 ],
        [ 1, 1, 0 ],
        [ 1, -1, -1 ],
        [ 1, -1, 1 ],
        [ 1, 1, -1 ],
        [ 1, 1, 1 ],
        [ 2, 0, -1 ],
        [ 2, 0, 1 ],
        [ 2, -1, 0 ],
        [ 2, 1, 0 ],
        [ 2, -1, -1 ],
        [ 2, -1, 1 ],
        [ 2, 1, -1 ],
        [ 2, 1, 1 ],
        [ 3, 0, -1 ],
        [ 3, 0, 1 ],
        [ 3, -1, 0 ],
        [ 3, 1, 0 ],
        [ 3, -1, -1 ],
        [ 3, -1, 1 ],
        [ 3, 1, -1 ],
        [ 3, 1, 1 ],
    ];

    const extraFlags = [
        CollisionFlag.BLOCK_PLAYER,
        CollisionFlag.BLOCK_NPC,
        CollisionFlag.BLOCK_PLAYER | CollisionFlag.BLOCK_NPC
    ];

    test.each(args)('test clear path', (size, dirX, dirZ) => {
        const destX = srcX + dirX;
        const destZ = srcZ + dirZ;

        const map = buildCollisionMap(srcX, srcZ, destX, destZ);
        const stepValidator = new StepValidator(map);

        for (let level = 0; level < 4; level++) {
            const validated = stepValidator.canTravel(level, srcX, srcZ, dirX, dirZ, size);
            expect(validated).toBeTruthy();
        }
    });

    test.each(args)('test loc blocking', (size, dirX, dirZ) => {
        const destX = srcX + dirX;
        const destZ = srcZ + dirZ;

        const map = buildCollisionMap(srcX, srcZ, destX, destZ);
        const stepValidator = new StepValidator(map);

        for (let level = 0; level < 4; level++) {
            for (let index = 0; index < size * size; index++) {
                const deltaX = destX + (index % size);
                const deltaZ = destZ + (index / size);
                map.set(deltaX, deltaZ, level, CollisionFlag.LOC);
            }
        }

        for (let level = 0; level < 4; level++) {
            const validated = stepValidator.canTravel(level, srcX, srcZ, dirX, dirZ, size);
            expect(validated).toBeFalsy();
        }
    });

    test.each(args)('test extra flag blocking', (size, dirX, dirZ) => {
        const destX = srcX + dirX;
        const destZ = srcZ + dirZ;

        const map = buildCollisionMap(srcX, srcZ, destX, destZ);
        const stepValidator = new StepValidator(map);

        for (let level = 0; level < 4; level++) {
            for (const flag of extraFlags) {
                for (let index = 0; index < size * size; index++) {
                    const deltaX = destX + (index % size);
                    const deltaZ = destZ + (index / size);
                    map.set(deltaX, deltaZ, level, flag);
                }
            }
        }

        for (let level = 0; level < 4; level++) {
            for (const flag of extraFlags) {
                const validated = stepValidator.canTravel(level, srcX, srcZ, dirX, dirZ, size, flag);
                expect(validated).toBeFalsy();
            }
        }
    });

    test.each(args)('test blocked flag strategy', (size, dirX, dirZ) => {
        const destX = srcX + dirX;
        const destZ = srcZ + dirZ;

        const map = buildCollisionMapWithFlag(srcX, srcZ, destX, destZ, CollisionFlag.FLOOR);
        const stepValidator = new StepValidator(map);

        for (let level = 0; level < 4; level++) {
            for (const flag of extraFlags) {
                const validated = stepValidator.canTravel(level, srcX, srcZ, dirX, dirZ, 1, 0, CollisionStrategies.BLOCKED);
                expect(validated).toBeTruthy();
            }
        }
    });

    test.each(args)('test indoors flag strategy', (size, dirX, dirZ) => {
        const destX = srcX + dirX;
        const destZ = srcZ + dirZ;
        const outdoorsX = destX + dirX
        const outdoorsZ = destZ + dirZ

        const map = new CollisionFlagMap();
        for (let level = 0; level < 4; level++) {
            for (let x = Math.min(srcX, Math.min(destX, outdoorsX)); x <= Math.max(srcX, Math.max(destX, outdoorsX)); x++) {
                for (let z = Math.min(srcZ, Math.min(destZ, outdoorsZ)); z <= Math.max(srcZ, Math.max(destZ, outdoorsZ)); z++) {
                    map.set(x, z, level, CollisionFlag.ROOF);
                }
            }
        }

        const stepValidator = new StepValidator(map);

        for (let level = 0; level < 4; level++) {
            map.set(outdoorsX, outdoorsZ, level, CollisionFlag.OPEN);
        }

        for (let level = 0; level < 4; level++) {
            for (const flag of extraFlags) {
                const validated = stepValidator.canTravel(level, srcX, srcZ, dirX, dirZ, 1, 0, CollisionStrategies.INDOORS);
                expect(validated).toBeTruthy();

                const validated2 = stepValidator.canTravel(level, destX, destZ, dirX, dirZ, 1, 0, CollisionStrategies.INDOORS);
                expect(validated2).toBeFalsy();
            }
        }
    });

    test.each(args)('test outdoors flag strategy', (size, dirX, dirZ) => {
        const destX = srcX + dirX;
        const destZ = srcZ + dirZ;
        const indoorsX = destX + dirX
        const indoorsZ = destZ + dirZ

        const map = new CollisionFlagMap();
        for (let level = 0; level < 4; level++) {
            for (let x = Math.min(srcX, Math.min(destX, indoorsX)); x <= Math.max(srcX, Math.max(destX, indoorsX)); x++) {
                for (let z = Math.min(srcZ, Math.min(destZ, indoorsZ)); z <= Math.max(srcZ, Math.max(destZ, indoorsZ)); z++) {
                    map.allocateIfAbsent(x, z, level);
                }
            }
        }

        const stepValidator = new StepValidator(map);

        for (let level = 0; level < 4; level++) {
            map.set(indoorsX, indoorsZ, level, CollisionFlag.ROOF);
        }

        for (let level = 0; level < 4; level++) {
            for (const flag of extraFlags) {
                const validated = stepValidator.canTravel(level, srcX, srcZ, dirX, dirZ, 1, 0, CollisionStrategies.OUTDOORS);
                expect(validated).toBeTruthy();

                const validated2 = stepValidator.canTravel(level, destX, destZ, dirX, dirZ, 1, 0, CollisionStrategies.OUTDOORS);
                expect(validated2).toBeFalsy();
            }
        }
    });

    test.each(args)('test line of sight flag strategy', (size, dirX, dirZ) => {
        const destX = srcX + dirX;
        const destZ = srcZ + dirZ;
        const blockedX = destX + dirX
        const blockedZ = destZ + dirZ

        const map = new CollisionFlagMap();
        for (let level = 0; level < 4; level++) {
            for (let x = Math.min(srcX, Math.min(destX, blockedX)); x <= Math.max(srcX, Math.max(destX, blockedX)); x++) {
                for (let z = Math.min(srcZ, Math.min(destZ, blockedZ)); z <= Math.max(srcZ, Math.max(destZ, blockedZ)); z++) {
                    map.allocateIfAbsent(x, z, level);
                }
            }
        }

        const stepValidator = new StepValidator(map);

        for (let level = 0; level < 4; level++) {
            map.set(blockedX, blockedZ, level, CollisionFlag.LOC_PROJ_BLOCKER);
        }

        for (let level = 0; level < 4; level++) {
            for (const flag of extraFlags) {
                const validated = stepValidator.canTravel(level, srcX, srcZ, dirX, dirZ, 1, 0, CollisionStrategies.LINE_OF_SIGHT);
                expect(validated).toBeTruthy();

                const validated2 = stepValidator.canTravel(level, destX, destZ, dirX, dirZ, 1, 0, CollisionStrategies.LINE_OF_SIGHT);
                expect(validated2).toBeFalsy();
            }
        }
    });
});