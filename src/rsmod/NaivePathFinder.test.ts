import NaivePathFinder from '#rsmod/NaivePathFinder.js';
import StepValidator from '#rsmod/StepValidator.js';
import CollisionFlagMap from '#rsmod/collision/CollisionFlagMap.js';

describe('NaivePathFinder', () => {
    test('test intersects size 1', () => {
        const map = new CollisionFlagMap();
        const sv = new StepValidator(map);
        const pf = new NaivePathFinder(sv);

        expect(pf.intersects(3222, 3222, 1, 1, 3222, 3222, 1, 1)).toBeTruthy();
        expect(pf.intersects(3222, 3222, 1, 1, 3223, 3223, 1, 1)).toBeFalsy();

        expect(pf.intersects(3222, 3222, 2, 2, 3222, 3222, 1, 1)).toBeTruthy();
        expect(pf.intersects(3222, 3222, 2, 2, 3223, 3223, 1, 1)).toBeTruthy();
        expect(pf.intersects(3222, 3222, 2, 2, 3224, 3224, 1, 1)).toBeFalsy();

        expect(pf.intersects(3222, 3222, 3, 3, 3222, 3222, 1, 1)).toBeTruthy();
        expect(pf.intersects(3222, 3222, 3, 3, 3223, 3223, 1, 1)).toBeTruthy();
        expect(pf.intersects(3222, 3222, 3, 3, 3224, 3224, 1, 1)).toBeTruthy();
        expect(pf.intersects(3222, 3222, 3, 3, 3225, 3225, 1, 1)).toBeFalsy();
    });

    test('test intersects size 2', () => {
        const map = new CollisionFlagMap();
        const sv = new StepValidator(map);
        const pf = new NaivePathFinder(sv);

        expect(pf.intersects(3222, 3222, 1, 1, 3222, 3222, 2, 2)).toBeTruthy();
        expect(pf.intersects(3222, 3222, 1, 1, 3223, 3223, 2, 2)).toBeFalsy();

        expect(pf.intersects(3222, 3222, 2, 2, 3222, 3222, 2, 2)).toBeTruthy();
        expect(pf.intersects(3222, 3222, 2, 2, 3223, 3223, 2, 2)).toBeTruthy();
        expect(pf.intersects(3222, 3222, 2, 2, 3224, 3224, 2, 2)).toBeFalsy();

        expect(pf.intersects(3222, 3222, 3, 3, 3222, 3222, 2, 2)).toBeTruthy();
        expect(pf.intersects(3222, 3222, 3, 3, 3223, 3223, 2, 2)).toBeTruthy();
        expect(pf.intersects(3222, 3222, 3, 3, 3224, 3224, 2, 2)).toBeTruthy();
        expect(pf.intersects(3222, 3222, 3, 3, 3225, 3225, 2, 2)).toBeFalsy();

        expect(pf.intersects(3222, 3222, 1, 1, 3221, 3221, 2, 2)).toBeTruthy();
        expect(pf.intersects(3222, 3222, 1, 1, 3220, 3220, 2, 2)).toBeFalsy();
        expect(pf.intersects(3222, 3222, 1, 1, 3222, 3221, 2, 2)).toBeTruthy();
        expect(pf.intersects(3222, 3222, 1, 1, 3222, 3220, 2, 2)).toBeFalsy();
    });
});