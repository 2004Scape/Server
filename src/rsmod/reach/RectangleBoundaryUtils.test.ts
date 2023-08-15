import CollisionFlagMap from '#rsmod/collision/CollisionFlagMap';
import BlockAccessFlag from '#rsmod/flag/BlockAccessFlag';
import CollisionFlag from '#rsmod/flag/CollisionFlag';
import RectangleBoundaryUtils from './RectangleBoundaryUtils';

describe('RectangleBoundaryUtils', () => {
    let flags: CollisionFlagMap;
    let blockAccessFlags: number;
    let level: number;

    beforeEach(() => {
        // Initialize with some default values
        flags = new CollisionFlagMap();
        blockAccessFlags = 0;
        level = 0;
    });

    describe('reachRectangleN', () => {
        describe('no collision flags', () => {
            describe('size 2', () => {
                it('should return true when src is west of destination', () => {
                    const srcX = 0, srcZ = 2, destX = 2, destZ = 2, srcWidth = 2, srcHeight = 2, destWidth = 2, destHeight = 2;

                    flags.set(srcX, srcZ, level, CollisionFlag.OPEN);

                    expect(RectangleBoundaryUtils.collides(srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight)).toBeFalsy();
                    expect(RectangleBoundaryUtils.reachRectangleN(flags, level, srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight, blockAccessFlags)).toBeTruthy();
                });

                it('should return true when src is east of destination', () => {
                    const srcX = 4, srcZ = 2, destX = 2, destZ = 2, srcWidth = 2, srcHeight = 2, destWidth = 2, destHeight = 2;

                    flags.set(srcX, srcZ, level, CollisionFlag.OPEN);

                    expect(RectangleBoundaryUtils.collides(srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight)).toBeFalsy();
                    expect(RectangleBoundaryUtils.reachRectangleN(flags, level, srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight, blockAccessFlags)).toBeTruthy();
                });

                it('should return true when src is south of destination', () => {
                    const srcX = 2, srcZ = 4, destX = 2, destZ = 2, srcWidth = 2, srcHeight = 2, destWidth = 2, destHeight = 2;

                    flags.set(srcX, srcZ, level, CollisionFlag.OPEN);

                    expect(RectangleBoundaryUtils.collides(srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight)).toBeFalsy();
                    expect(RectangleBoundaryUtils.reachRectangleN(flags, level, srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight, blockAccessFlags)).toBeTruthy();
                });

                it('should return true when src is north of destination', () => {
                    const srcX = 2, srcZ = 0, destX = 2, destZ = 2, srcWidth = 2, srcHeight = 2, destWidth = 2, destHeight = 2;

                    flags.set(srcX, srcZ, level, CollisionFlag.OPEN);

                    expect(RectangleBoundaryUtils.collides(srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight)).toBeFalsy();
                    expect(RectangleBoundaryUtils.reachRectangleN(flags, level, srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight, blockAccessFlags)).toBeTruthy();
                });
            });
        });

        describe('block access flags', () => {
            describe('size 2', () => {
                it('should return false when a wall is to the east of src and we cannot pass', () => {
                    const srcX = 0, srcZ = 2, destX = 2, destZ = 2, srcWidth = 2, srcHeight = 2, destWidth = 2, destHeight = 2;

                    flags.set(srcX, srcZ, level, CollisionFlag.WALL_EAST);
                    blockAccessFlags = BlockAccessFlag.BLOCK_WEST;

                    expect(RectangleBoundaryUtils.collides(srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight)).toBeFalsy();
                    expect(RectangleBoundaryUtils.reachRectangleN(flags, level, srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight, blockAccessFlags)).toBeFalsy();
                });

                it('should return false when a wall is to the west of src and we cannot pass', () => {
                    const srcX = 4, srcZ = 2, destX = 2, destZ = 2, srcWidth = 2, srcHeight = 2, destWidth = 2, destHeight = 2;

                    flags.set(srcX, srcZ, level, CollisionFlag.WALL_WEST);
                    blockAccessFlags = BlockAccessFlag.BLOCK_EAST;

                    expect(RectangleBoundaryUtils.collides(srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight)).toBeFalsy();
                    expect(RectangleBoundaryUtils.reachRectangleN(flags, level, srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight, blockAccessFlags)).toBeFalsy();
                });

                it('should return false when a wall is to the south of src and we cannot pass', () => {
                    const srcX = 2, srcZ = 4, destX = 2, destZ = 2, srcWidth = 2, srcHeight = 2, destWidth = 2, destHeight = 2;

                    flags.set(srcX, srcZ, level, CollisionFlag.WALL_SOUTH);
                    blockAccessFlags = BlockAccessFlag.BLOCK_NORTH;

                    expect(RectangleBoundaryUtils.collides(srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight)).toBeFalsy();
                    expect(RectangleBoundaryUtils.reachRectangleN(flags, level, srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight, blockAccessFlags)).toBeFalsy();
                });

                it('should return false when a wall is to the north of src and we cannot pass', () => {
                    const srcX = 2, srcZ = 0, destX = 2, destZ = 2, srcWidth = 2, srcHeight = 2, destWidth = 2, destHeight = 2;

                    flags.set(srcX, srcZ, level, CollisionFlag.WALL_NORTH);
                    blockAccessFlags = BlockAccessFlag.BLOCK_SOUTH;

                    expect(RectangleBoundaryUtils.collides(srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight)).toBeFalsy();
                    expect(RectangleBoundaryUtils.reachRectangleN(flags, level, srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight, blockAccessFlags)).toBeFalsy();
                });
            });
        });
    });

    describe('reachRectangle1', () => {
        describe('no collision flags', () => {
            it('should return true when src is west of destination', () => {
                const srcX = 1, srcZ = 2, destX = 2, destZ = 2, destWidth = 2, destHeight = 2;

                flags.set(srcX, srcZ, level, CollisionFlag.OPEN);

                expect(RectangleBoundaryUtils.reachRectangle1(flags, level, srcX, srcZ, destX, destZ, destWidth, destHeight, blockAccessFlags)).toBe(true);
            });

            it('should return true when src is east of destination', () => {
                const srcX = 4, srcZ = 2, destX = 2, destZ = 2, destWidth = 2, destHeight = 2;

                flags.set(srcX, srcZ, level, CollisionFlag.OPEN);

                expect(RectangleBoundaryUtils.reachRectangle1(flags, level, srcX, srcZ, destX, destZ, destWidth, destHeight, blockAccessFlags)).toBe(true);
            });

            it('should return true when src is south of destination', () => {
                const srcX = 2, srcZ = 1, destX = 2, destZ = 2, destWidth = 2, destHeight = 2;

                flags.set(srcX, srcZ, level, CollisionFlag.OPEN);

                expect(RectangleBoundaryUtils.reachRectangle1(flags, level, srcX, srcZ, destX, destZ, destWidth, destHeight, blockAccessFlags)).toBe(true);
            });

            it('should return true when src is north of destination', () => {
                const srcX = 2, srcZ = 4, destX = 2, destZ = 2, destWidth = 2, destHeight = 2;

                flags.set(srcX, srcZ, level, CollisionFlag.OPEN);

                expect(RectangleBoundaryUtils.reachRectangle1(flags, level, srcX, srcZ, destX, destZ, destWidth, destHeight, blockAccessFlags)).toBe(true);
            });
        });

        describe('block access flags', () => {
            it('should return false when a wall is to the east of src and we cannot pass', () => {
                const srcX = 1, srcZ = 2, destX = 2, destZ = 2, destWidth = 2, destHeight = 2;

                flags.set(srcX, srcZ, level, CollisionFlag.WALL_EAST);
                blockAccessFlags = BlockAccessFlag.BLOCK_WEST;

                expect(RectangleBoundaryUtils.reachRectangle1(flags, level, srcX, srcZ, destX, destZ, destWidth, destHeight, blockAccessFlags)).toBe(false);
            });

            it('should return false when a wall is to the west of src and we cannot pass', () => {
                const srcX = 4, srcZ = 2, destX = 2, destZ = 2, destWidth = 2, destHeight = 2;

                flags.set(srcX, srcZ, level, CollisionFlag.WALL_WEST);
                blockAccessFlags = BlockAccessFlag.BLOCK_EAST;

                expect(RectangleBoundaryUtils.reachRectangle1(flags, level, srcX, srcZ, destX, destZ, destWidth, destHeight, blockAccessFlags)).toBe(false);
            });

            it('should return false when a wall is to the south of src and we cannot pass', () => {
                const srcX = 2, srcZ = 1, destX = 2, destZ = 2, destWidth = 2, destHeight = 2;

                flags.set(srcX, srcZ, level, CollisionFlag.WALL_NORTH);
                blockAccessFlags = BlockAccessFlag.BLOCK_SOUTH;

                expect(RectangleBoundaryUtils.reachRectangle1(flags, level, srcX, srcZ, destX, destZ, destWidth, destHeight, blockAccessFlags)).toBe(false);
            });

            it('should return false when a wall is to the north of src and we cannot pass', () => {
                const srcX = 2, srcZ = 4, destX = 2, destZ = 2, destWidth = 2, destHeight = 2;

                flags.set(srcX, srcZ, level, CollisionFlag.WALL_SOUTH);
                blockAccessFlags = BlockAccessFlag.BLOCK_NORTH;

                expect(RectangleBoundaryUtils.reachRectangle1(flags, level, srcX, srcZ, destX, destZ, destWidth, destHeight, blockAccessFlags)).toBe(false);
            });
        });

        describe('positioning', () => {
            it('should return false when src is not adjacent to destination', () => {
                const srcX = 5, srcZ = 5, destX = 2, destZ = 2, destWidth = 2, destHeight = 2;

                flags.set(srcX, srcZ, level, CollisionFlag.OPEN);

                expect(RectangleBoundaryUtils.reachRectangle1(flags, level, srcX, srcZ, destX, destZ, destWidth, destHeight, blockAccessFlags)).toBe(false);
            });

            it('should return false when src is within the destination rectangle', () => {
                const srcX = 3, srcZ = 3, destX = 2, destZ = 2, destWidth = 2, destHeight = 2;

                flags.set(srcX, srcZ, level, CollisionFlag.OPEN);

                expect(RectangleBoundaryUtils.reachRectangle1(flags, level, srcX, srcZ, destX, destZ, destWidth, destHeight, blockAccessFlags)).toBe(false);
            });

            it('should return true when src is at the boundary and no wall blocking it', () => {
                const srcX = 3, srcZ = 4, destX = 2, destZ = 2, destWidth = 2, destHeight = 2;

                flags.set(srcX, srcZ, level, CollisionFlag.OPEN);

                expect(RectangleBoundaryUtils.reachRectangle1(flags, level, srcX, srcZ, destX, destZ, destWidth, destHeight, blockAccessFlags)).toBe(true);
            });

            it('should return false when src is at the boundary and there is a wall blocking it', () => {
                const srcX = 3, srcZ = 4, destX = 2, destZ = 2, destWidth = 2, destHeight = 2;

                flags.set(srcX, srcZ, level, CollisionFlag.WALL_SOUTH);
                blockAccessFlags = BlockAccessFlag.BLOCK_NORTH;

                expect(RectangleBoundaryUtils.reachRectangle1(flags, level, srcX, srcZ, destX, destZ, destWidth, destHeight, blockAccessFlags)).toBe(false);
            });
        });

    });
});