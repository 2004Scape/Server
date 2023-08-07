import CollisionFlagMap from "#rsmod/collision/CollisionFlagMap";
import CollisionFlag from "#rsmod/flag/CollisionFlag";

describe('CollisionFlagMap', () => {
    test('test get collision flag', () => {
        const map = new CollisionFlagMap();
        map.allocateIfAbsent(0, 0, 0);
        const flags = map.flags[0];
        expect(flags).not.toBeNull();
        flags![0] = 123456;
        expect(map.get(0, 0, 0)).toBe(123456);
    });

    test('test get collision flag null zone', () => {
        const map = new CollisionFlagMap();
        expect(map.isZoneAllocated(3200, 3200, 0)).toBeFalsy();

        for (let x = 3200; x < 3208; x++) {
            for (let z = 3200; z < 3208; z++) {
                expect(map.get(x, z, 0)).toBe(CollisionFlag.NULL);
            }
        }
    });

    test('test get collision flag allocated zone', () => {
        const map = new CollisionFlagMap();
        expect(map.isZoneAllocated(3200, 3200, 0)).toBeFalsy();

        map.allocateIfAbsent(3200, 3200, 0);
        expect(map.isZoneAllocated(3200, 3200, 0)).toBeTruthy();

        for (let x = 3200; x < 3208; x++) {
            for (let z = 3200; z < 3208; z++) {
                expect(map.get(x, z, 0)).toBe(CollisionFlag.OPEN);
            }
        }
    });

    test('test set collision flag', () => {
        const map = new CollisionFlagMap();
        expect(map.get(3200, 3200, 0)).toBe(CollisionFlag.NULL);
        expect(map.get(3200, 3200, 1)).toBe(CollisionFlag.NULL);
        expect(map.get(3200, 3200, 2)).toBe(CollisionFlag.NULL);

        map.set(3200, 3200, 0, 0x800);
        map.set(3200, 3200, 1, 0x200);
        map.set(3200, 3200, 2, 0);

        expect(map.get(3200, 3200, 0)).toBe(0x800);
        expect(map.get(3200, 3200, 1)).toBe(0x200);
        expect(map.get(3200, 3200, 2)).toBe(0);
    });

    test('test add collision flag', () => {
        const map = new CollisionFlagMap();
        map.allocateIfAbsent(3200, 3200, 0);
        expect(map.get(3200, 3200, 0)).toBe(CollisionFlag.OPEN);

        map.add(3200, 3200, 0, 0x1000);
        expect(map.get(3200, 3200, 0)).toBe(0x1000);

        map.add(3200, 3200, 0, 0x400);
        expect(map.isFlagged(3200, 3200, 0, 0x1000)).toBeTruthy();
        expect(map.isFlagged(3200, 3200, 0, 0x400)).toBeTruthy();

        for (let x = 3201; x < 3208; x++) {
            for (let z = 3201; z < 3208; z++) {
                expect(map.get(x, z, 0)).toBe(CollisionFlag.OPEN);
            }
        }
    });

    test('test remove collision flag', () => {
        const map = new CollisionFlagMap();
        map.allocateIfAbsent(3200, 3200, 0);
        expect(map.get(3200, 3200, 0)).toBe(CollisionFlag.OPEN);

        map.add(3200, 3200, 0, 0x1000);
        expect(map.get(3200, 3200, 0)).toBe(0x1000);

        map.remove(3200, 3200, 0, 0x1000);
        expect(map.get(3200, 3200, 0)).toBe(CollisionFlag.OPEN);
    });

    test('test deallocate if present', () => {
        const map = new CollisionFlagMap();
        map.allocateIfAbsent(3200, 3200, 0);
        expect(map.get(3200, 3200, 0)).toBe(CollisionFlag.OPEN);

        map.deallocateIfPresent(3200, 3200, 0);
        expect(map.get(3200, 3200, 0)).toBe(CollisionFlag.NULL);
    });
});