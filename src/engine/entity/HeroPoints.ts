import { quicksort } from '#/util/QuickSort.js';

type Hero = {
    hash64: bigint;
    points: number;
};

export default class HeroPoints extends Array<Hero> {
    constructor(length: number) {
        super(length);
        this.clear();
    }

    clear(): void {
        this.fill({ hash64: -1n, points: 0 });
    }

    addHero(hash64: bigint, points: number): void {
        // Do nothing if no points added
        if (points < 1) {
            return;
        }
        // Check if hero already exists, then add points
        const index = this.findIndex(hero => hero && hero.hash64 === hash64);
        if (index !== -1) {
            this[index].points += points;
            return;
        }

        // Otherwise, add a new hash64
        const emptyIndex = this.findIndex(hero => hero && hero.hash64 === -1n);
        if (emptyIndex !== -1) {
            this[emptyIndex] = { hash64, points };
        }
    }

    findHero(): bigint {
        // We clone the array because it should not be permanently sorted
        const clone = [...this];

        // Quicksort heroes by points
        quicksort(0, this.length - 1, clone, (a: Hero, b: Hero) => {
            return b.points - a.points;
        });

        return clone[0].hash64;
    }
}
