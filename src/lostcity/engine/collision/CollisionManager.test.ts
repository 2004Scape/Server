import CollisionManager from '#lostcity/engine/collision/CollisionManager.js';
import {CollisionFlag} from '@2004scape/rsmod-pathfinder';
import LocShape from '#lostcity/engine/collision/LocShape.js';
import LocAngle from '#lostcity/engine/collision/LocAngle.js';

describe('CollisionManager', (): void => {
    it('result after changeLandCollision', (): void => {
        const collision: CollisionManager = new CollisionManager();

        collision.flags.allocateIfAbsent(3222, 3222, 0);
        expect(collision.flags.isZoneAllocated(3222, 3222, 0)).toBeTruthy();

        collision.changeLandCollision(3222, 3222, 0, true);
        expect(collision.flags.isFlagged(3222, 3222, 0, CollisionFlag.FLOOR)).toBeTruthy();

        collision.changeLandCollision(3222, 3222, 0, false);
        expect(collision.flags.isFlagged(3222, 3222, 0, CollisionFlag.FLOOR)).toBeFalsy();
    });

    it('result after changeNpcCollision 1x1', (): void => {
        const collision: CollisionManager = new CollisionManager();

        collision.flags.allocateIfAbsent(3222, 3222, 0);
        expect(collision.flags.isZoneAllocated(3222, 3222, 0)).toBeTruthy();

        collision.changeNpcCollision(1, 3222, 3222, 0, true);
        expect(collision.flags.isFlagged(3222, 3222, 0, CollisionFlag.NPC)).toBeTruthy();

        collision.changeNpcCollision(1, 3222, 3222, 0, false);
        expect(collision.flags.isFlagged(3222, 3222, 0, CollisionFlag.NPC)).toBeFalsy();
    });

    it('result after changeNpcCollision 2x2', (): void => {
        const collision: CollisionManager = new CollisionManager();

        collision.flags.allocateIfAbsent(3222, 3222, 0);
        expect(collision.flags.isZoneAllocated(3222, 3222, 0)).toBeTruthy();

        collision.changeNpcCollision(2, 3222, 3222, 0, true);
        expect(collision.flags.isFlagged(3222, 3222, 0, CollisionFlag.NPC)).toBeTruthy();
        expect(collision.flags.isFlagged(3223, 3222, 0, CollisionFlag.NPC)).toBeTruthy();
        expect(collision.flags.isFlagged(3222, 3223, 0, CollisionFlag.NPC)).toBeTruthy();
        expect(collision.flags.isFlagged(3223, 3223, 0, CollisionFlag.NPC)).toBeTruthy();

        collision.changeNpcCollision(2, 3222, 3222, 0, false);
        expect(collision.flags.isFlagged(3222, 3222, 0, CollisionFlag.NPC)).toBeFalsy();
        expect(collision.flags.isFlagged(3223, 3222, 0, CollisionFlag.NPC)).toBeFalsy();
        expect(collision.flags.isFlagged(3222, 3223, 0, CollisionFlag.NPC)).toBeFalsy();
        expect(collision.flags.isFlagged(3223, 3223, 0, CollisionFlag.NPC)).toBeFalsy();
    });

    it('result after changeRoofCollision', (): void => {
        const collision: CollisionManager = new CollisionManager();

        collision.flags.allocateIfAbsent(3222, 3222, 0);
        expect(collision.flags.isZoneAllocated(3222, 3222, 0)).toBeTruthy();

        collision.changeRoofCollision(3222, 3222, 0, true);
        expect(collision.flags.isFlagged(3222, 3222, 0, CollisionFlag.ROOF)).toBeTruthy();

        collision.changeRoofCollision(3222, 3222, 0, false);
        expect(collision.flags.isFlagged(3222, 3222, 0, CollisionFlag.ROOF)).toBeFalsy();
    });

    it('result after changePlayerCollision 1x1', (): void => {
        const collision: CollisionManager = new CollisionManager();

        collision.flags.allocateIfAbsent(3222, 3222, 0);
        expect(collision.flags.isZoneAllocated(3222, 3222, 0)).toBeTruthy();

        collision.changeNpcCollision(1, 3222, 3222, 0, true);
        expect(collision.flags.isFlagged(3222, 3222, 0, CollisionFlag.NPC)).toBeTruthy();

        collision.changeNpcCollision(1, 3222, 3222, 0, false);
        expect(collision.flags.isFlagged(3222, 3222, 0, CollisionFlag.NPC)).toBeFalsy();
    });

    it('result after changePlayerCollision 2x2', (): void => {
        const collision: CollisionManager = new CollisionManager();

        collision.flags.allocateIfAbsent(3222, 3222, 0);
        expect(collision.flags.isZoneAllocated(3222, 3222, 0)).toBeTruthy();

        collision.changePlayerCollision(2, 3222, 3222, 0, true);
        expect(collision.flags.isFlagged(3222, 3222, 0, CollisionFlag.PLAYER)).toBeTruthy();
        expect(collision.flags.isFlagged(3223, 3222, 0, CollisionFlag.PLAYER)).toBeTruthy();
        expect(collision.flags.isFlagged(3222, 3223, 0, CollisionFlag.PLAYER)).toBeTruthy();
        expect(collision.flags.isFlagged(3223, 3223, 0, CollisionFlag.PLAYER)).toBeTruthy();

        collision.changePlayerCollision(2, 3222, 3222, 0, false);
        expect(collision.flags.isFlagged(3222, 3222, 0, CollisionFlag.PLAYER)).toBeFalsy();
        expect(collision.flags.isFlagged(3223, 3222, 0, CollisionFlag.PLAYER)).toBeFalsy();
        expect(collision.flags.isFlagged(3222, 3223, 0, CollisionFlag.PLAYER)).toBeFalsy();
        expect(collision.flags.isFlagged(3223, 3223, 0, CollisionFlag.PLAYER)).toBeFalsy();
    });

    it('result after changeLocCollision GROUND CENTREPIECE_STRAIGHT, WEST, 1x1', (): void => {
        const collision: CollisionManager = new CollisionManager();

        collision.flags.allocateIfAbsent(3222, 3222, 0);
        expect(collision.flags.isZoneAllocated(3222, 3222, 0)).toBeTruthy();

        collision.changeLocCollision(LocShape.CENTREPIECE_STRAIGHT, LocAngle.WEST, false, 1, 1, 0, 3222, 3222, 0, true);
        expect(collision.flags.isFlagged(3222, 3222, 0, CollisionFlag.LOC)).toBeTruthy();

        collision.changeLocCollision(LocShape.CENTREPIECE_STRAIGHT, LocAngle.WEST, false, 1, 1, 0, 3222, 3222, 0, false);
        expect(collision.flags.isFlagged(3222, 3222, 0, CollisionFlag.LOC)).toBeFalsy();
    });

    it('result after changeLocCollision GROUND CENTREPIECE_STRAIGHT, NORTH, 2x2', (): void => {
        const collision: CollisionManager = new CollisionManager();

        collision.flags.allocateIfAbsent(3222, 3222, 0);
        expect(collision.flags.isZoneAllocated(3222, 3222, 0)).toBeTruthy();

        collision.changeLocCollision(LocShape.CENTREPIECE_STRAIGHT, LocAngle.NORTH, false, 2, 2, 0, 3222, 3222, 0, true);
        expect(collision.flags.isFlagged(3222, 3222, 0, CollisionFlag.LOC)).toBeTruthy();
        expect(collision.flags.isFlagged(3223, 3222, 0, CollisionFlag.LOC)).toBeTruthy();
        expect(collision.flags.isFlagged(3222, 3223, 0, CollisionFlag.LOC)).toBeTruthy();
        expect(collision.flags.isFlagged(3223, 3223, 0, CollisionFlag.LOC)).toBeTruthy();

        collision.changeLocCollision(LocShape.CENTREPIECE_STRAIGHT, LocAngle.NORTH, false, 2, 2, 0, 3222, 3222, 0, false);
        expect(collision.flags.isFlagged(3222, 3222, 0, CollisionFlag.LOC)).toBeFalsy();
        expect(collision.flags.isFlagged(3223, 3222, 0, CollisionFlag.LOC)).toBeFalsy();
        expect(collision.flags.isFlagged(3222, 3223, 0, CollisionFlag.LOC)).toBeFalsy();
        expect(collision.flags.isFlagged(3223, 3223, 0, CollisionFlag.LOC)).toBeFalsy();
    });

    it('result after changeLocCollision GROUND CENTREPIECE_STRAIGHT, WEST, 2x2, blockrange', (): void => {
        const collision: CollisionManager = new CollisionManager();

        collision.flags.allocateIfAbsent(3222, 3222, 0);
        expect(collision.flags.isZoneAllocated(3222, 3222, 0)).toBeTruthy();

        collision.changeLocCollision(LocShape.CENTREPIECE_STRAIGHT, LocAngle.WEST, true, 2, 2, 0, 3222, 3222, 0, true);
        expect(collision.flags.isFlagged(3222, 3222, 0, CollisionFlag.LOC_PROJ_BLOCKER)).toBeTruthy();
        expect(collision.flags.isFlagged(3223, 3222, 0, CollisionFlag.LOC_PROJ_BLOCKER)).toBeTruthy();
        expect(collision.flags.isFlagged(3222, 3223, 0, CollisionFlag.LOC_PROJ_BLOCKER)).toBeTruthy();
        expect(collision.flags.isFlagged(3223, 3223, 0, CollisionFlag.LOC_PROJ_BLOCKER)).toBeTruthy();

        collision.changeLocCollision(LocShape.CENTREPIECE_STRAIGHT, LocAngle.WEST, true, 2, 2, 0, 3222, 3222, 0, false);
        expect(collision.flags.isFlagged(3222, 3222, 0, CollisionFlag.LOC_PROJ_BLOCKER)).toBeFalsy();
        expect(collision.flags.isFlagged(3223, 3222, 0, CollisionFlag.LOC_PROJ_BLOCKER)).toBeFalsy();
        expect(collision.flags.isFlagged(3222, 3223, 0, CollisionFlag.LOC_PROJ_BLOCKER)).toBeFalsy();
        expect(collision.flags.isFlagged(3223, 3223, 0, CollisionFlag.LOC_PROJ_BLOCKER)).toBeFalsy();
    });

    it('result after changeLocCollision GROUND_DECOR GROUND_DECOR, WEST, 1x1, active', (): void => {
        const collision: CollisionManager = new CollisionManager();

        collision.flags.allocateIfAbsent(3222, 3222, 0);
        expect(collision.flags.isZoneAllocated(3222, 3222, 0)).toBeTruthy();

        collision.changeLocCollision(LocShape.GROUND_DECOR, LocAngle.WEST, false, 1, 1, 1, 3224, 3224, 0, true);
        expect(collision.flags.isFlagged(3224, 3224, 0, CollisionFlag.FLOOR)).toBeTruthy();

        collision.changeLocCollision(LocShape.GROUND_DECOR, LocAngle.WEST, false, 1, 1, 1, 3224, 3224, 0, false);
        expect(collision.flags.isFlagged(3224, 3224, 0, CollisionFlag.FLOOR)).toBeFalsy();
    });

    it('result after changeLocCollision GROUND_DECOR GROUND_DECOR, WEST, 1x1, not active', (): void => {
        const collision: CollisionManager = new CollisionManager();

        collision.flags.allocateIfAbsent(3222, 3222, 0);
        expect(collision.flags.isZoneAllocated(3222, 3222, 0)).toBeTruthy();

        collision.changeLocCollision(LocShape.GROUND_DECOR, LocAngle.WEST, false, 1, 1, 0, 3222, 3222, 0, true);
        expect(collision.flags.isFlagged(3222, 3222, 0, CollisionFlag.FLOOR)).toBeFalsy();
    });

    it('result after changeLocCollision WALL WALL_L, WEST, 1x1', (): void => {
        const collision: CollisionManager = new CollisionManager();

        collision.flags.allocateIfAbsent(3222, 3222, 0);
        expect(collision.flags.isZoneAllocated(3222, 3222, 0)).toBeTruthy();

        collision.changeLocCollision(LocShape.WALL_L, LocAngle.WEST, false, 1, 1, 0, 3224, 3224, 0, true);
        expect(collision.flags.isFlagged(3224, 3224, 0, CollisionFlag.WALL_NORTH | CollisionFlag.WALL_WEST)).toBeTruthy();
        expect(collision.flags.isFlagged(3223, 3224, 0, CollisionFlag.WALL_EAST)).toBeTruthy();
        expect(collision.flags.isFlagged(3224, 3225, 0, CollisionFlag.WALL_SOUTH)).toBeTruthy();

        collision.changeLocCollision(LocShape.WALL_L, LocAngle.WEST, true, 1, 1, 0, 3224, 3224, 0, true);
        expect(collision.flags.isFlagged(3224, 3224, 0, CollisionFlag.WALL_NORTH_PROJ_BLOCKER | CollisionFlag.WALL_WEST_PROJ_BLOCKER)).toBeTruthy();
        expect(collision.flags.isFlagged(3223, 3224, 0, CollisionFlag.WALL_EAST_PROJ_BLOCKER)).toBeTruthy();
        expect(collision.flags.isFlagged(3224, 3225, 0, CollisionFlag.WALL_SOUTH_PROJ_BLOCKER)).toBeTruthy();

        collision.changeLocCollision(LocShape.WALL_L, LocAngle.WEST, false, 1, 1, 0, 3224, 3224, 0, false);
        expect(collision.flags.isFlagged(3224, 3224, 0, CollisionFlag.WALL_NORTH | CollisionFlag.WALL_WEST)).toBeFalsy();
        expect(collision.flags.isFlagged(3223, 3224, 0, CollisionFlag.WALL_EAST)).toBeFalsy();
        expect(collision.flags.isFlagged(3224, 3225, 0, CollisionFlag.WALL_SOUTH)).toBeFalsy();
        expect(collision.flags.isFlagged(3223, 3224, 0, CollisionFlag.WALL_EAST_PROJ_BLOCKER)).toBeTruthy();
        expect(collision.flags.isFlagged(3224, 3225, 0, CollisionFlag.WALL_SOUTH_PROJ_BLOCKER)).toBeTruthy();

        collision.changeLocCollision(LocShape.WALL_L, LocAngle.WEST, true, 1, 1, 0, 3224, 3224, 0, false);
        expect(collision.flags.isFlagged(3224, 3224, 0, CollisionFlag.WALL_NORTH | CollisionFlag.WALL_WEST)).toBeFalsy();
        expect(collision.flags.isFlagged(3223, 3224, 0, CollisionFlag.WALL_EAST)).toBeFalsy();
        expect(collision.flags.isFlagged(3224, 3225, 0, CollisionFlag.WALL_SOUTH)).toBeFalsy();
        expect(collision.flags.isFlagged(3223, 3224, 0, CollisionFlag.WALL_EAST_PROJ_BLOCKER)).toBeFalsy();
        expect(collision.flags.isFlagged(3224, 3225, 0, CollisionFlag.WALL_SOUTH_PROJ_BLOCKER)).toBeFalsy();
    });

    it('result after changeLocCollision WALL WALL_STRAIGHT, WEST, 1x1', (): void => {
        const collision: CollisionManager = new CollisionManager();

        collision.flags.allocateIfAbsent(3222, 3222, 0);
        expect(collision.flags.isZoneAllocated(3222, 3222, 0)).toBeTruthy();

        collision.changeLocCollision(LocShape.WALL_STRAIGHT, LocAngle.WEST, false, 1, 1, 0, 3224, 3224, 0, true);
        expect(collision.flags.isFlagged(3224, 3224, 0, CollisionFlag.WALL_WEST)).toBeTruthy();
        expect(collision.flags.isFlagged(3223, 3224, 0, CollisionFlag.WALL_EAST)).toBeTruthy();

        collision.changeLocCollision(LocShape.WALL_STRAIGHT, LocAngle.WEST, true, 1, 1, 0, 3224, 3224, 0, true);
        expect(collision.flags.isFlagged(3224, 3224, 0, CollisionFlag.WALL_WEST_PROJ_BLOCKER)).toBeTruthy();
        expect(collision.flags.isFlagged(3223, 3224, 0, CollisionFlag.WALL_EAST_PROJ_BLOCKER)).toBeTruthy();

        collision.changeLocCollision(LocShape.WALL_STRAIGHT, LocAngle.WEST, false, 1, 1, 0, 3224, 3224, 0, false);
        expect(collision.flags.isFlagged(3224, 3224, 0, CollisionFlag.WALL_WEST)).toBeFalsy();
        expect(collision.flags.isFlagged(3223, 3224, 0, CollisionFlag.WALL_EAST)).toBeFalsy();
        expect(collision.flags.isFlagged(3224, 3224, 0, CollisionFlag.WALL_WEST_PROJ_BLOCKER)).toBeTruthy();
        expect(collision.flags.isFlagged(3223, 3224, 0, CollisionFlag.WALL_EAST_PROJ_BLOCKER)).toBeTruthy();

        collision.changeLocCollision(LocShape.WALL_STRAIGHT, LocAngle.WEST, true, 1, 1, 0, 3224, 3224, 0, false);
        expect(collision.flags.isFlagged(3224, 3224, 0, CollisionFlag.WALL_WEST)).toBeFalsy();
        expect(collision.flags.isFlagged(3223, 3224, 0, CollisionFlag.WALL_EAST)).toBeFalsy();
        expect(collision.flags.isFlagged(3224, 3224, 0, CollisionFlag.WALL_WEST_PROJ_BLOCKER)).toBeFalsy();
        expect(collision.flags.isFlagged(3223, 3224, 0, CollisionFlag.WALL_EAST_PROJ_BLOCKER)).toBeFalsy();
    });

    it('result after changeLocCollision WALL WALL_SQUARE_CORNER, WEST, 1x1', (): void => {
        const collision: CollisionManager = new CollisionManager();

        collision.flags.allocateIfAbsent(3222, 3222, 0);
        expect(collision.flags.isZoneAllocated(3222, 3222, 0)).toBeTruthy();

        collision.changeLocCollision(LocShape.WALL_SQUARE_CORNER, LocAngle.WEST, false, 1, 1, 0, 3224, 3224, 0, true);
        expect(collision.flags.isFlagged(3224, 3224, 0, CollisionFlag.WALL_NORTH_WEST)).toBeTruthy();
        expect(collision.flags.isFlagged(3223, 3225, 0, CollisionFlag.WALL_SOUTH_EAST)).toBeTruthy();

        collision.changeLocCollision(LocShape.WALL_SQUARE_CORNER, LocAngle.WEST, true, 1, 1, 0, 3224, 3224, 0, true);
        expect(collision.flags.isFlagged(3224, 3224, 0, CollisionFlag.WALL_NORTH_WEST_PROJ_BLOCKER)).toBeTruthy();
        expect(collision.flags.isFlagged(3223, 3225, 0, CollisionFlag.WALL_SOUTH_EAST_PROJ_BLOCKER)).toBeTruthy();

        collision.changeLocCollision(LocShape.WALL_SQUARE_CORNER, LocAngle.WEST, false, 1, 1, 0, 3224, 3224, 0, false);
        expect(collision.flags.isFlagged(3224, 3224, 0, CollisionFlag.WALL_NORTH_WEST_PROJ_BLOCKER)).toBeTruthy();
        expect(collision.flags.isFlagged(3223, 3225, 0, CollisionFlag.WALL_SOUTH_EAST_PROJ_BLOCKER)).toBeTruthy();
        expect(collision.flags.isFlagged(3224, 3224, 0, CollisionFlag.WALL_NORTH_WEST)).toBeFalsy();
        expect(collision.flags.isFlagged(3223, 3225, 0, CollisionFlag.WALL_SOUTH_EAST)).toBeFalsy();

        collision.changeLocCollision(LocShape.WALL_SQUARE_CORNER, LocAngle.WEST, true, 1, 1, 0, 3224, 3224, 0, false);
        expect(collision.flags.isFlagged(3224, 3224, 0, CollisionFlag.WALL_NORTH_WEST_PROJ_BLOCKER)).toBeFalsy();
        expect(collision.flags.isFlagged(3223, 3225, 0, CollisionFlag.WALL_SOUTH_EAST_PROJ_BLOCKER)).toBeFalsy();
        expect(collision.flags.isFlagged(3224, 3224, 0, CollisionFlag.WALL_NORTH_WEST)).toBeFalsy();
        expect(collision.flags.isFlagged(3223, 3225, 0, CollisionFlag.WALL_SOUTH_EAST)).toBeFalsy();
    });
});
