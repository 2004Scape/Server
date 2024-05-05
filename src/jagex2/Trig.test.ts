import Trig from '#jagex2/Trig.js';

describe('Trig', (): void => {
    describe('cos', (): void => {
        it('result after 0', (): void => {
            expect(Trig.cos(0)).toBe(16384);
        });

        it('result after pi/2', () => {
            expect(Trig.cos(Math.PI / 2)).toBe(16383);
        });

        it('result after pi', () => {
            expect(Trig.cos(Math.PI)).toBe(16383);
        });

        it('result after 3pi/2', () => {
            expect(Trig.cos(3 * Math.PI / 2)).toBe(16383);
        });

        it('result after 2pi', () => {
            expect(Trig.cos(2 * Math.PI)).toBe(16383);
        });
    });

    describe('sin', (): void => {
        it('result after 0', (): void => {
            expect(Trig.sin(0)).toBe(0);
        });

        it('result after pi/2', () => {
            expect(Trig.sin(Math.PI / 2)).toBe(6);
        });

        it('result after pi', () => {
            expect(Trig.sin(Math.PI)).toBe(18);
        });

        it('result after 3pi/2', () => {
            expect(Trig.sin(3 * Math.PI / 2)).toBe(25);
        });

        it('result after 2pi', () => {
            expect(Trig.sin(2 * Math.PI)).toBe(37);
        });
    });

    describe('atan2', (): void => {
        it('result after (1, 0)', () => {
            expect(Trig.atan2(1, 0)).toBe(4096);
        });

        it('result after (1, 1)', () => {
            expect(Trig.atan2(1, 1)).toBe(2048);
        });

        it('result after (1, -1)', () => {
            expect(Trig.atan2(1, -1)).toBe(6144);
        });

        it('result after (0, -1)', () => {
            expect(Trig.atan2(0, -1)).toBe(8192);
        });

        it('result after (-1, 0)', () => {
            expect(Trig.atan2(-1, 0)).toBe(12288);
        });
    });

    describe('radians', (): void => {
        it('result after 0', () => {
            expect(Trig.radians(0)).toBeCloseTo(0.0);
        });

        it('result after 90', () => {
            expect(Trig.radians(90)).toBeCloseTo(0.03451457);
        });

        it('result after 180', () => {
            expect(Trig.radians(180)).toBeCloseTo(0.06902914);
        });

        it('result after 270', () => {
            expect(Trig.radians(270)).toBeCloseTo(0.103543706);
        });

        it('result after 360', () => {
            expect(Trig.radians(360)).toBeCloseTo(0.13805827);
        });
    });
});
