import PathFinder from "./PathFinder";
import CollisionFlagMap from "./collision/CollisionFlagMap";
import CollisionFlag from "./flag/CollisionFlag";

function buildCollisionMap(x1: number, z1: number, x2: number, z2: number) {
    let map = new CollisionFlagMap();
    for (let level = 0; level < 4; level++) {
        for (let z = z1; z <= z2; z++) {
            for (let x = x1; x <= x2; x++) {
                map.allocateIfAbsent(x, z, level);
            }
        }
    }
    return map;
}

function flag(map: CollisionFlagMap, baseX: number, baseZ: number, width: number, height: number, mask: number) {
    for (let level = 0; level < 4; level++) {
        for (let z = 0; z < height; z++) {
            for (let x = 0; x < width; x++) {
                map.set(baseX + x, baseZ + z, level, mask);
            }
        }
    }
}

describe('PathFinder', () => {
    test('route coordinates match level input', () => {
        const srcX = 3200, srcZ = 3200;
        const destX = 3201, destZ = 3200;

        const map = buildCollisionMap(srcX, srcZ, destX, destZ);
        const pathFinder = new PathFinder(map);

        let route = pathFinder.findPath(0, srcX, srcZ, destX, destZ);
        expect(route.success).toBeTruthy();
        route.waypoints.forEach(routePoint => {
            expect(routePoint.level).toBe(0);
        });

        route = pathFinder.findPath(1, srcX, srcZ, destX, destZ);
        expect(route.success).toBeTruthy();
        route.waypoints.forEach(routePoint => {
            expect(routePoint.level).toBe(1);
        });

        route = pathFinder.findPath(2, srcX, srcZ, destX, destZ);
        expect(route.success).toBeTruthy();
        route.waypoints.forEach(routePoint => {
            expect(routePoint.level).toBe(2);
        });

        route = pathFinder.findPath(3, srcX, srcZ, destX, destZ);
        expect(route.success).toBeTruthy();
        route.waypoints.forEach(routePoint => {
            expect(routePoint.level).toBe(3);
        });
    });

    test('surrounded by objects allow move near', () => {
        const srcX = 3200, srcZ = 3200;
        const destX = 3205, destZ = 3200;

        const map = buildCollisionMap(srcX, srcZ, destX, destZ);
        flag(map, srcX - 1, srcZ - 1, 3, 3, CollisionFlag.LOC);
        map.set(srcX, srcZ, 0, CollisionFlag.OPEN); // Remove collision flag from source tile

        const pathFinder = new PathFinder(map);
        const route = pathFinder.findPath(0, srcX, srcZ, destX, destZ);
        expect(route.alternative).toBeTruthy();
        expect(route.waypoints).toHaveLength(0);
    });

    test('surrounded by objects no move near', () => {
        const srcX = 3200, srcZ = 3200;
        const destX = 3205, destZ = 3200;

        const map = buildCollisionMap(srcX, srcZ, destX, destZ);
        flag(map, srcX - 1, srcZ - 1, 3, 3, CollisionFlag.LOC);
        map.set(srcX, srcZ, 0, CollisionFlag.OPEN); // Remove collision flag from source tile

        const pathFinder = new PathFinder(map);
        const route = pathFinder.findPath(0, srcX, srcZ, destX, destZ, 1, 1, 1, 0, -1, false);
        expect(route.failed).toBeTruthy();
        expect(route.waypoints).toHaveLength(0);
    });

    test('single exit point', () => {            
        const srcX = 3200, srcZ = 3200;
        const destX = 3200, destZ = 3205;

        const map = buildCollisionMap(srcX, srcZ, destX, destZ);
        flag(map, srcX - 1, srcZ - 1, 3, 3, CollisionFlag.LOC);
        map.set(srcX, srcZ, 0, CollisionFlag.OPEN); // Remove collision flag from source tile
        map.set(srcX, srcZ - 1, 0, CollisionFlag.OPEN); // Remove collision flag from tile south of source tile.

        const pathFinder = new PathFinder(map);
        const route = pathFinder.findPath(0, srcX, srcZ, destX, destZ);
        expect(route.success).toBeTruthy();
        expect(route.waypoints).toHaveLength(4);

        expect(route.waypoints[0].x).toEqual(3200);
        expect(route.waypoints[0].z).toEqual(3198);

        expect(route.waypoints[1].x).toEqual(3198);
        expect(route.waypoints[1].z).toEqual(3198);

        expect(route.waypoints[2].x).toEqual(3198);
        expect(route.waypoints[2].z).toEqual(3203);

        expect(route.waypoints[3].x).toEqual(destX);
        expect(route.waypoints[3].z).toEqual(destZ);
    });

    test('standing on closest approach point', () => {
        const srcX = 3200, srcZ = 3200;
        const objX = 3200, objZ = 3201;

        const map = buildCollisionMap(srcX, srcZ, objX, objZ);
        const pathFinder = new PathFinder(map);
        map.add(objX, objZ, 0, CollisionFlag.WALL_NORTH | CollisionFlag.WALL_SOUTH | CollisionFlag.WALL_WEST | CollisionFlag.WALL_EAST);

        const route = pathFinder.findPath(0, srcX, srcZ, objX, objZ);
        expect(route.success).toBeTruthy();
        expect(route.alternative).toBeTruthy();
        expect(route.waypoints).toHaveLength(0);
    });
});
