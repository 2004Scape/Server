import PathFinder from "./PathFinder";
import CollisionFlagMap from "./collision/CollisionFlagMap";
import CollisionFlag from "./flag/CollisionFlag";

describe('PathFinder', () => {
    test('route coordinates match level input', () => {
        const srcX = 3200, srcZ = 3200;
        const destX = 3201, destZ = 3200;
        const map = new CollisionFlagMap();
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

    describe('surrounded by objects', () => {
        const srcX = 3200, srcZ = 3200;
        const destX = 3205, destZ = 3200;
        const level = 0;

        let map = new CollisionFlagMap();

        beforeEach(() => {
            // TODO (jkm) is there an alternative to the `CollisionFlagMap.flag` from Kotlin,
            //  taking a width and height?
            const width = 3;
            const height = 3;

            for (let z = 0; z < height; z++) {
                for (let x = 0; x < width; x++) {
                    map.add(srcX - 1 + x, srcZ - 1 + z, level, CollisionFlag.LOC);
                }
            }

            map.remove(srcX, srcZ, level, CollisionFlag.LOC); // Remove collision flag from source tile
        });
    
        test('surrounded by objects allow move near', () => {
            const pathFinder = new PathFinder(map);
    
            const route = pathFinder.findPath(level, srcX, srcZ, destX, destZ);
            expect(route.alternative).toBeTruthy();
            expect(route.waypoints).toHaveLength(0);
        });
    
        test('surrounded by objects no move near', () => {
            const moveNear = false;
            
            const pathFinder = new PathFinder(map);
    
            const route = pathFinder.findPath(level, srcX, srcZ, destX, destZ, 1, 1, 1, 0, -1, moveNear);
            expect(route.failed).toBeTruthy();
            expect(route.waypoints).toHaveLength(0);
        });

        test('single exit point', () => {            
            map.remove(srcX, srcZ - 1, level, CollisionFlag.LOC); // Remove collision flag from tile south of source tile

            const pathFinder = new PathFinder(map);
            const route = pathFinder.findPath(level, srcX, srcZ, destX, destZ);
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
    });

    test('standing on closest approach point', () => {
        const srcX = 3200, srcZ = 3200;
        const objX = 3200, objZ = 3201;

        const map = new CollisionFlagMap();
        map.add(objX, objZ, 0, CollisionFlag.WALL_NORTH | CollisionFlag.WALL_SOUTH | CollisionFlag.WALL_WEST | CollisionFlag.WALL_EAST);

        const pathFinder = new PathFinder(map);

        const route = pathFinder.findPath(0, srcX, srcZ, objX, objZ);
        expect(route.success).toBeTruthy();
        expect(route.alternative).toBeTruthy();
        expect(route.waypoints).toHaveLength(0);
    });
});
