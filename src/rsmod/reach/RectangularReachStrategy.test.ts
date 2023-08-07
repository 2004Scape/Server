import {buildCollisionMap, flag} from "#rsmod/PathFinder.test";
import CollisionFlag from "#rsmod/flag/CollisionFlag";
import ReachStrategy from "#rsmod/reach/ReachStrategy";
import DirectionFlag from "#rsmod/flag/DirectionFlag";

describe('RectangularReachStrategy', () => {
    const BLOCK_ACCESS_FLAG_TEST_ARGS = [
        [ 0, 1, DirectionFlag.NORTH ],
        [ 1, 0, DirectionFlag.EAST ],
        [ 0, -1, DirectionFlag.SOUTH ],
        [ -1, 0, DirectionFlag.WEST ]
    ] as const;

    const DIMENSIONS_TEST_ARGS = [
        [ 1, 1 ],
        [ 1, 2 ],
        [ 1, 3 ],
        [ 2, 1 ],
        [ 2, 2 ],
        [ 2, 3 ],
        [ 3, 1 ],
        [ 3, 2 ],
        [ 3, 3 ]
    ] as const;

    const WALL_STRAIGHT_STRATEGY_TEST_ARGS = [
        [ 0, 0, 1, CollisionFlag.WALL_SOUTH ],
        [ 0, 0, -1, CollisionFlag.WALL_NORTH ],
        [ 1, -1, 0, CollisionFlag.WALL_EAST ],
        [ 1, 1, 0, CollisionFlag.WALL_WEST ],
        [ 2, 0, 1, CollisionFlag.WALL_SOUTH ],
        [ 2, 0, -1, CollisionFlag.WALL_NORTH ],
        [ 3, -1, 0, CollisionFlag.WALL_EAST ],
        [ 3, 1, 0, CollisionFlag.WALL_WEST ]
    ] as const;

    const WALL_L_STRATEGY_TEST_ARGS = [
        [ 0, 1, 0, CollisionFlag.WALL_WEST ],
        [ 0, 0, -1, CollisionFlag.WALL_NORTH ],
        [ 1, -1, 0, CollisionFlag.WALL_EAST ],
        [ 1, 0, -1, CollisionFlag.BLOCK_NORTH ],
        [ 2, -1, 0, CollisionFlag.BLOCK_EAST ],
        [ 2, 0, 1, CollisionFlag.BLOCK_NORTH ],
        [ 3, 0, 1, CollisionFlag.BLOCK_SOUTH ],
        [ 3, 1, 0, CollisionFlag.BLOCK_WEST ]
    ] as const;

    const WALLDECOR_DIAGONAL_OFFSET_STRATEGY_TEST_ARGS = [
        [ 0, 1, 0, CollisionFlag.WALL_WEST ],
        [ 0, 0, -1, CollisionFlag.WALL_NORTH ],
        [ 1, -1, 0, CollisionFlag.WALL_EAST ],
        [ 1, 0, -1, CollisionFlag.WALL_NORTH ],
        [ 2, -1, 0, CollisionFlag.WALL_EAST ],
        [ 2, 0, 1, CollisionFlag.WALL_SOUTH ],
        [ 3, 1, 0, CollisionFlag.WALL_WEST ],
        [ 3, 0, 1, CollisionFlag.WALL_SOUTH ]
    ]

    describe('test wall decor strategy', () => {
        const srcX = 3200;
        const srcZ = 3200;
        const objX = 3200;
        const objZ = 3200;
        const map = buildCollisionMap(srcX, srcZ, objX, objZ);

        describe('shape 6', () => {
            test.each(WALLDECOR_DIAGONAL_OFFSET_STRATEGY_TEST_ARGS)('test reach with dimensions', (rotation, dirX, dirZ, flag) => {
                map.set(objX + dirX, objZ + dirZ, 0, flag);

                const reached = ReachStrategy.reached(map, 0, srcX + dirX, objZ + dirZ, objX, objZ, 1, 1, 1, rotation, 6);
                expect(reached).toBeFalsy();

                map.set(objX + dirX, objZ + dirZ, 0, CollisionFlag.OPEN);

                const reached2 = ReachStrategy.reached(map, 0, srcX + dirX, objZ + dirZ, objX, objZ, 1, 1, 1, rotation, 6);
                expect(reached2).toBeTruthy();
            });
        });

        describe('shape 7', () => {
            test.each(WALLDECOR_DIAGONAL_OFFSET_STRATEGY_TEST_ARGS)('test reach with dimensions', (rotation, dirX, dirZ, flag) => {
                map.set(objX + dirX, objZ + dirZ, 0, flag);

                const reached = ReachStrategy.reached(map, 0, srcX + dirX, objZ + dirZ, objX, objZ, 1, 1, 1, ReachStrategy.alteredRotation(rotation, 7), 7);
                expect(reached).toBeFalsy();

                map.set(objX + dirX, objZ + dirZ, 0, CollisionFlag.OPEN);

                const reached2 = ReachStrategy.reached(map, 0, srcX + dirX, objZ + dirZ, objX, objZ, 1, 1, 1, ReachStrategy.alteredRotation(rotation, 7), 7);
                expect(reached2).toBeTruthy();
            });
        });

        describe('shape 8', () => {
            test.each(WALLDECOR_DIAGONAL_OFFSET_STRATEGY_TEST_ARGS)('test reach with dimensions', (rotation, dirX, dirZ, flag) => {
                map.set(objX + dirX, objZ + dirZ, 0, flag);

                const reached = ReachStrategy.reached(map, 0, srcX + dirX, objZ + dirZ, objX, objZ, 1, 1, 1, rotation, 8);
                expect(reached).toBeFalsy();

                map.set(objX + dirX, objZ + dirZ, 0, CollisionFlag.OPEN);

                const reached2 = ReachStrategy.reached(map, 0, srcX + dirX, objZ + dirZ, objX, objZ, 1, 1, 1, rotation, 8);
                expect(reached2).toBeTruthy();
            });
        });
    });

    describe('test wall strategy', () => {
        describe('no flags', () => {
            const srcX = 3200;
            const srcZ = 3200;
            const objX = 3200;
            const objZ = 3200;
            const map = buildCollisionMap(srcX, srcZ, objX, objZ);

            describe('shape 0', () => {
                test.each(WALL_STRAIGHT_STRATEGY_TEST_ARGS)('test reach with dimensions', (rotation, dirX, dirZ, flag) => {
                    map.set(objX + dirX, objZ + dirZ, 0, flag);

                    const reached = ReachStrategy.reached(map, 0, objX + dirX, objZ + dirZ, objX, objZ, 1, 1, 1, rotation, 0);
                    expect(reached).toBeFalsy();

                    const reached2 = ReachStrategy.reached(map, 0, objX, objZ, objX + dirX, objZ + dirZ, 1, 1, 1, rotation, 0);
                    expect(reached2).toBeTruthy();

                    map.remove(objX + dirX, objZ + dirZ, 0, flag);
                });
            });

            describe('shape 2', () => {
                test.each(WALL_L_STRATEGY_TEST_ARGS)('test reach with dimensions', (rotation, dirX, dirZ, flag) => {
                    console.log(`${dirX}, ${dirZ}`)
                    map.set(objX + dirX, objZ + dirZ, 0, flag);

                    const reached = ReachStrategy.reached(map, 0, objX + dirX, objZ + dirZ, objX, objZ, 1, 1, 1, rotation, 2);
                    expect(reached).toBeFalsy();

                    const reached2 = ReachStrategy.reached(map, 0, objX, objZ, objX + dirX, objZ + dirZ, 1, 1, 1, rotation, 2);
                    expect(reached2).toBeTruthy();

                    map.remove(objX + dirX, objZ + dirZ, 0, flag);
                });
            });

            describe('shape 9', () => {
                test.each(WALL_STRAIGHT_STRATEGY_TEST_ARGS)('test reach with dimensions', (rotation, dirX, dirZ, flag) => {
                    map.set(objX + dirX, objZ + dirZ, 0, flag);

                    const reached = ReachStrategy.reached(map, 0, objX + dirX, objZ + dirZ, objX, objZ, 1, 1, 1, rotation, 9);
                    expect(reached).toBeFalsy();

                    const reached2 = ReachStrategy.reached(map, 0, objX, objZ, objX + dirX, objZ + dirZ, 1, 1, 1, rotation, 9);
                    expect(reached2).toBeTruthy();

                    map.remove(objX + dirX, objZ + dirZ, 0, flag);
                });
            });
        });

        describe('with flags', () => {
            const srcX = 3200;
            const srcZ = 3200;
            const objX = 3200;
            const objZ = 3200;
            const map = buildCollisionMap(srcX, srcZ, objX, objZ);

            describe('shape 0', () => {
                test.each(WALL_STRAIGHT_STRATEGY_TEST_ARGS)('test reach with dimensions', (rotation, dirX, dirZ, flag) => {
                    map.set(objX + dirX, objZ + dirZ, 0, flag);

                    const reached = ReachStrategy.reached(map, 0, srcX + dirX, objZ + dirZ, objX, objZ, 1, 1, 1, rotation, 0);
                    expect(reached).toBeFalsy();

                    map.set(objX + dirX, objZ + dirZ, 0, CollisionFlag.OPEN);

                    const reached2 = ReachStrategy.reached(map, 0, srcX + dirX, objZ + dirZ, objX, objZ, 1, 1, 1, rotation, 0);
                    expect(reached2).toBeTruthy();

                    map.remove(objX + dirX, objZ + dirZ, 0, flag);
                });
            });

            describe('shape 2', () => {
                test.each(WALL_L_STRATEGY_TEST_ARGS)('test reach with dimensions', (rotation, dirX, dirZ, flag) => {
                    console.log(`${dirX}, ${dirZ}`)
                    map.set(objX + dirX, objZ + dirZ, 0, flag);

                    const reached = ReachStrategy.reached(map, 0, srcX + dirX, objZ + dirZ, objX, objZ, 1, 1, 1, rotation, 2);
                    expect(reached).toBeFalsy();

                    map.set(objX + dirX, objZ + dirZ, 0, CollisionFlag.OPEN);

                    const reached2 = ReachStrategy.reached(map, 0, srcX + dirX, objZ + dirZ, objX, objZ, 1, 1, 1, rotation, 2);
                    expect(reached2).toBeTruthy();

                    map.remove(objX + dirX, objZ + dirZ, 0, flag);
                });
            });

            describe('shape 9', () => {
                test.each(WALL_STRAIGHT_STRATEGY_TEST_ARGS)('test reach with dimensions', (rotation, dirX, dirZ, flag) => {
                    map.set(objX + dirX, objZ + dirZ, 0, flag);

                    const reached = ReachStrategy.reached(map, 0, srcX + dirX, objZ + dirZ, objX, objZ, 1, 1, 1, rotation, 9);
                    expect(reached).toBeFalsy();

                    map.set(objX + dirX, objZ + dirZ, 0, CollisionFlag.OPEN);

                    const reached2 = ReachStrategy.reached(map, 0, srcX + dirX, objZ + dirZ, objX, objZ, 1, 1, 1, rotation, 9);
                    expect(reached2).toBeTruthy();

                    map.remove(objX + dirX, objZ + dirZ, 0, flag);
                });
            });
        });
    });

    describe('test divided by loc', () => {
        const srcX = 3200;
        const srcZ = 3200;
        const objX = 3200;
        const objZ = 3201;
        const map = buildCollisionMap(srcX, srcZ, objX, objZ);
        map.set(srcX, srcZ, 0, CollisionFlag.WALL_NORTH);

        test('test blocked north', () => {
            const reached = ReachStrategy.reached(map, 0, srcX, srcZ, objX, objZ, 1, 1, 1, 0, 10);
            expect(reached).toBeFalsy();
        });

        test('test free east', () => {
            map.set(srcX, srcZ, 0, CollisionFlag.WALL_EAST);
            const reached = ReachStrategy.reached(map, 0, srcX, srcZ, objX, objZ, 1, 1, 1, 0, 10);
            expect(reached).toBeTruthy();
        });

        test('test free south', () => {
            map.set(srcX, srcZ, 0, CollisionFlag.WALL_SOUTH);
            const reached = ReachStrategy.reached(map, 0, srcX, srcZ, objX, objZ, 1, 1, 1, 0, 10);
            expect(reached).toBeTruthy();
        });

        test('test free west', () => {
            map.set(srcX, srcZ, 0, CollisionFlag.WALL_WEST);
            const reached = ReachStrategy.reached(map, 0, srcX, srcZ, objX, objZ, 1, 1, 1, 0, 10);
            expect(reached).toBeTruthy();
        });

        test('test free northwest', () => {
            map.set(srcX, srcZ, 0, CollisionFlag.WALL_NORTH_WEST);
            const reached = ReachStrategy.reached(map, 0, srcX, srcZ, objX, objZ, 1, 1, 1, 0, 10);
            expect(reached).toBeTruthy();
        });

        test('test free northeast', () => {
            map.set(srcX, srcZ, 0, CollisionFlag.WALL_NORTH_EAST);
            const reached = ReachStrategy.reached(map, 0, srcX, srcZ, objX, objZ, 1, 1, 1, 0, 10);
            expect(reached).toBeTruthy();
        });

        test('test free southeast', () => {
            map.set(srcX, srcZ, 0, CollisionFlag.WALL_SOUTH_EAST);
            const reached = ReachStrategy.reached(map, 0, srcX, srcZ, objX, objZ, 1, 1, 1, 0, 10);
            expect(reached).toBeTruthy();
        });

        test('test free southwest', () => {
            map.set(srcX, srcZ, 0, CollisionFlag.WALL_SOUTH_WEST);
            const reached = ReachStrategy.reached(map, 0, srcX, srcZ, objX, objZ, 1, 1, 1, 0, 10);
            expect(reached).toBeTruthy();
        });
    });

    describe('test divided by wall', () => {
        const srcX = 3200;
        const srcZ = 3200;
        const objX = 3200;
        const objZ = 3201;
        const map = buildCollisionMap(srcX, srcZ, objX, objZ);
        map.set(srcX, srcZ, 0, CollisionFlag.WALL_NORTH);

        test('test blocked north', () => {
            const reached = ReachStrategy.reachRectangle(map, 0, srcX, srcZ, objX, objZ, 1, 1, 1);
            expect(reached).toBeFalsy();
        });

        test('test free east', () => {
            map.set(srcX, srcZ, 0, CollisionFlag.WALL_EAST);
            const reached = ReachStrategy.reachRectangle(map, 0, srcX, srcZ, objX, objZ, 1, 1, 1);
            expect(reached).toBeTruthy();
        });

        test('test free south', () => {
            map.set(srcX, srcZ, 0, CollisionFlag.WALL_SOUTH);
            const reached = ReachStrategy.reachRectangle(map, 0, srcX, srcZ, objX, objZ, 1, 1, 1);
            expect(reached).toBeTruthy();
        });

        test('test free west', () => {
            map.set(srcX, srcZ, 0, CollisionFlag.WALL_WEST);
            const reached = ReachStrategy.reachRectangle(map, 0, srcX, srcZ, objX, objZ, 1, 1, 1);
            expect(reached).toBeTruthy();
        });

        test('test free northwest', () => {
            map.set(srcX, srcZ, 0, CollisionFlag.WALL_NORTH_WEST);
            const reached = ReachStrategy.reachRectangle(map, 0, srcX, srcZ, objX, objZ, 1, 1, 1);
            expect(reached).toBeTruthy();
        });

        test('test free northeast', () => {
            map.set(srcX, srcZ, 0, CollisionFlag.WALL_NORTH_EAST);
            const reached = ReachStrategy.reachRectangle(map, 0, srcX, srcZ, objX, objZ, 1, 1, 1);
            expect(reached).toBeTruthy();
        });

        test('test free southeast', () => {
            map.set(srcX, srcZ, 0, CollisionFlag.WALL_SOUTH_EAST);
            const reached = ReachStrategy.reachRectangle(map, 0, srcX, srcZ, objX, objZ, 1, 1, 1);
            expect(reached).toBeTruthy();
        });

        test('test free southwest', () => {
            map.set(srcX, srcZ, 0, CollisionFlag.WALL_SOUTH_WEST);
            const reached = ReachStrategy.reachRectangle(map, 0, srcX, srcZ, objX, objZ, 1, 1, 1);
            expect(reached).toBeTruthy();
        });
    });

    describe('test block access flag', () => {
        test.each(BLOCK_ACCESS_FLAG_TEST_ARGS)('test block access flag', (offX, offZ, directionFlag) => {
            const objX = 3205;
            const objZ = 3205;
            const map = buildCollisionMap(objX, objZ, objX, objZ);
            flag(map, objX, objZ, 1, 1, CollisionFlag.LOC);

            const cardinal = [
                [ 0, -1 ],
                [ 0, 1 ],
                [ -1, 0 ],
                [ 1, 0 ]
            ];

            for (const dir of cardinal) {
                const srcX = objX + dir[0];
                const srcZ = objZ + dir[1];
                map.allocateIfAbsent(srcX, srcZ, 0);

                const reached = ReachStrategy.reachRectangle(map, 0, srcX, srcZ, objX, objZ, 1, 1, 1, 0, directionFlag);

                if (dir[0] == offX && dir[1] == offZ) {
                    expect(reached).toBeFalsy();
                } else {
                    expect(reached).toBeTruthy();
                }
            }
        });

        test.each(BLOCK_ACCESS_FLAG_TEST_ARGS)('test block access flag exclusive', (offX, offZ, directionFlag) => {
            const objX = 3205;
            const objZ = 3205;
            const map = buildCollisionMap(objX, objZ, objX, objZ);
            flag(map, objX, objZ, 1, 1, CollisionFlag.LOC);

            const cardinal = [
                [ 0, -1 ],
                [ 0, 1 ],
                [ -1, 0 ],
                [ 1, 0 ]
            ];

            for (const dir of cardinal) {
                const srcX = objX + dir[0];
                const srcZ = objZ + dir[1];
                map.allocateIfAbsent(srcX, srcZ, 0);

                const reached = ReachStrategy.reachExclusiveRectangle(map, 0, srcX, srcZ, objX, objZ, 1, 1, 1, 0, directionFlag);

                if (dir[0] == offX && dir[1] == offZ) {
                    expect(reached).toBeFalsy();
                } else {
                    expect(reached).toBeTruthy();
                }
            }
        });
    });

    describe('test reach with dimensions', () => {
        test.each(DIMENSIONS_TEST_ARGS)('test reach with dimensions', (width, height) => {
            const objX = 3202 + width;
            const objZ = 3202;
            const map = buildCollisionMap(objX - 1, objZ - 1, objX + width, objZ + height);
            flag(map, objX, objZ, width, height, CollisionFlag.LOC);

            const reached1 = ReachStrategy.reachRectangle(map, 0, objX - 2, objZ - 1, objX, objZ, 1, width, height);
            expect(reached1).toBeFalsy();

            const reached2 = ReachStrategy.reachRectangle(map, 0, objX - 1, objZ - 2, objX, objZ, 1, width, height);
            expect(reached2).toBeFalsy();

            for (let x = -1; x < width + 1; x++) {
                for (let z = -1; z < height + 1; z++) {
                    const reached3 = ReachStrategy.reachRectangle(map, 0, objX + x, objZ + z, objX, objZ, 1, width, height);
                    const diagonal = z == -1 && x == -1 || z == height && x == width || z == -1 && x == width || z == height && x == -1;
                    if (diagonal) {
                        expect(reached3).toBeFalsy();
                        continue;
                    }
                    expect(reached3).toBeTruthy();
                }
            }
        });

        test.each(DIMENSIONS_TEST_ARGS)('test reach with dimensions exclusive', (width, height) => {
            const objX = 3202 + width;
            const objZ = 3202;
            const map = buildCollisionMap(objX - 1, objZ - 1, objX + width, objZ + height);
            flag(map, objX, objZ, width, height, CollisionFlag.LOC);

            const reached1 = ReachStrategy.reachExclusiveRectangle(map, 0, objX - 2, objZ - 1, objX, objZ, 1, width, height);
            expect(reached1).toBeFalsy();

            const reached2 = ReachStrategy.reachExclusiveRectangle(map, 0, objX - 1, objZ - 2, objX, objZ, 1, width, height);
            expect(reached2).toBeFalsy();

            for (let x = -1; x < width + 1; x++) {
                for (let z = -1; z < height + 1; z++) {
                    const reached3 = ReachStrategy.reachExclusiveRectangle(map, 0, objX + x, objZ + z, objX, objZ, 1, width, height);
                    const diagonal = z == -1 && x == -1 || z == height && x == width || z == -1 && x == width || z == height && x == -1;
                    if (diagonal) {
                        expect(reached3).toBeFalsy();
                        continue;
                    }
                    const inLocArea = 0 <= x && width > x && 0 <= z && height > z;
                    if (inLocArea) {
                        expect(reached3).toBeFalsy();
                        continue;
                    }
                    expect(reached3).toBeTruthy();
                }
            }
        });
    });
});