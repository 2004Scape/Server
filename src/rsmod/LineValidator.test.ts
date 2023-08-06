import CollisionFlagMap from "#rsmod/collision/CollisionFlagMap";
import CollisionFlag from "#rsmod/flag/CollisionFlag";
import {buildCollisionMap} from "#rsmod/PathFinder.test";
import LineValidator from "#rsmod/LineValidator";

describe('LineValidator', () => {
    const srcX = 3200;
    const srcZ = 3200;

    const cardinal = [
        [ 0, -1 ],
        [ 0, 1 ],
        [ -1, 0 ],
        [ 1, 0 ]
    ];

    const flags = [
        CollisionFlag.OPEN,
        CollisionFlag.FLOOR,
        CollisionFlag.FLOOR_DECORATION,
        CollisionFlag.FLOOR | CollisionFlag.FLOOR_DECORATION
    ];

    const extraFlags = [
        CollisionFlag.BLOCK_PLAYER,
        CollisionFlag.BLOCK_NPC,
        CollisionFlag.BLOCK_PLAYER | CollisionFlag.BLOCK_NPC
    ];

    describe('line of walk', () => {
        test('test same tile has line of walk', () => {
            const map = new CollisionFlagMap();
            map.allocateIfAbsent(srcX, srcZ, 0);

            const pf = new LineValidator(map);
            const low = pf.hasLineOfWalk(0, srcX, srcZ, srcX, srcZ);

            expect(low).toBeTruthy();
        });

        describe('with flags', () => {
            test('test partial line of walk', () => {
                const map = new CollisionFlagMap();
                map.set(3200, 3205, 0, CollisionFlag.LOC);

                const pf = new LineValidator(map);
                const low = pf.hasLineOfWalk(0, srcX, srcZ, 3200, 3207);

                expect(low).toBeFalsy();
            });

            test('test clear line of walk', () => {
                for (const dir of cardinal) {
                    const destX = srcX + (dir[0] * 3);
                    const destZ = srcZ + (dir[1] * 3);

                    const map = buildCollisionMap(srcX, srcZ, destX, destZ);

                    for (let level = 0; level < 4; level++) {
                        map.allocateIfAbsent(srcX + dir[0], srcZ + dir[1], level);

                        const pf = new LineValidator(map);
                        const low = pf.hasLineOfWalk(level, srcX, srcZ, destX, destZ);

                        expect(low).toBeTruthy();
                    }
                }
            });

            test('test loc blocking', () => {
                for (const dir of cardinal) {
                    const destX = srcX + (dir[0] * 3);
                    const destZ = srcZ + (dir[1] * 3);

                    const map = buildCollisionMap(srcX, srcZ, destX, destZ);

                    for (let level = 0; level < 4; level++) {
                        map.set(srcX + dir[0], srcZ + dir[1], level, CollisionFlag.LOC);

                        const pf = new LineValidator(map);
                        const low = pf.hasLineOfWalk(level, srcX, srcZ, destX, destZ);

                        expect(low).toBeFalsy();
                    }
                }
            });

            test('test extra flag blocking', () => {
                for (const dir of cardinal) {
                    const destX = srcX + (dir[0] * 3);
                    const destZ = srcZ + (dir[1] * 3);

                    const map = buildCollisionMap(srcX, srcZ, destX, destZ);

                    for (let level = 0; level < 4; level++) {
                        for (const flag of extraFlags) {
                            map.set(srcX + dir[0], srcZ + dir[1], level, flag);

                            const pf = new LineValidator(map);
                            const low = pf.hasLineOfWalk(level, srcX, srcZ, destX, destZ, 1, 0, 0, flag);

                            expect(low).toBeFalsy();
                        }
                    }
                }
            });
        });
    });

    describe('line of sight', () => {
        test('test on top of loc fails line of sight', () => {
            const map = new CollisionFlagMap();
            map.add(srcX, srcZ, 0, CollisionFlag.LOC);

            const pf = new LineValidator(map);
            const los = pf.hasLineOfSight(0, srcX, srcZ, 3200, 3201);

            expect(los).toBeFalsy();
        });

        test('test on top of extra flag fails line of sight', () => {
            const map = new CollisionFlagMap();
            map.add(srcX, srcZ, 0, CollisionFlag.BLOCK_PLAYER);

            const pf = new LineValidator(map);
            const los = pf.hasLineOfSight(0, srcX, srcZ, 3200, 3201, 1, 0, 0, CollisionFlag.BLOCK_PLAYER);

            expect(los).toBeFalsy();
        });

        test('test same tile has line of sight', () => {
            const map = new CollisionFlagMap();
            map.allocateIfAbsent(srcX, srcZ, 0);

            const pf = new LineValidator(map);
            const los = pf.hasLineOfSight(0, srcX, srcZ, srcX, srcZ);

            expect(los).toBeTruthy();
        });

        describe('with flags', () => {
            test('test partial line of sight', () => {
                const map = new CollisionFlagMap();
                map.set(3200, 3205, 0, CollisionFlag.LOC_PROJ_BLOCKER);

                const pf = new LineValidator(map);
                const los = pf.hasLineOfSight(0, srcX, srcZ, 3200, 3207);

                expect(los).toBeFalsy();
            });

            test('test valid line of sight', () => {
                for (const dir of cardinal) {
                    const destX = srcX + (dir[0] * 3);
                    const destZ = srcZ + (dir[1] * 3);

                    const map = buildCollisionMap(srcX, srcZ, destX, destZ);

                    for (let level = 0; level < 4; level++) {
                        for (const flag of flags) {
                            map.set(srcX + dir[0], srcZ + dir[1], level, flag);

                            const pf = new LineValidator(map);
                            const los = pf.hasLineOfSight(level, srcX, srcZ, destX, destZ);

                            expect(los).toBeTruthy();
                        }
                    }
                }
            });

            test('test loc blocking', () => {
                for (const dir of cardinal) {
                    const destX = srcX + (dir[0] * 3);
                    const destZ = srcZ + (dir[1] * 3);

                    const map = buildCollisionMap(srcX, srcZ, destX, destZ);

                    for (let level = 0; level < 4; level++) {
                        map.set(srcX + dir[0], srcZ + dir[1], level, CollisionFlag.LOC_PROJ_BLOCKER);

                        const pf = new LineValidator(map);
                        const los = pf.hasLineOfSight(level, srcX, srcZ, destX, destZ);

                        expect(los).toBeFalsy();
                    }
                }
            });

            test('test extra flag blocking', () => {
                for (const dir of cardinal) {
                    const destX = srcX + (dir[0] * 3);
                    const destZ = srcZ + (dir[1] * 3);

                    const map = buildCollisionMap(srcX, srcZ, destX, destZ);

                    for (let level = 0; level < 4; level++) {
                        for (const flag of extraFlags) {
                            map.set(srcX + dir[0], srcZ + dir[1], level, flag);

                            const pf = new LineValidator(map);
                            const los = pf.hasLineOfSight(level, srcX, srcZ, destX, destZ, 1, 0, 0, flag);

                            expect(los).toBeFalsy();
                        }
                    }
                }
            });
        });
    });
});