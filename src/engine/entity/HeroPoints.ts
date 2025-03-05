import { quicksort } from '#/util/QuickSort.js';

type Hero = {
    uid: number;
    points: number;
};

export default class HeroPoints extends Array<Hero> {
    constructor(length: number) {
        super(length);
        this.clear();
    }

    clear(): void {
        this.fill({ uid: -1, points: 0 });
    }

    addHero(uid: number, points: number): void {
        // Check if hero already exists, then add points
        const index = this.findIndex(hero => hero && hero.uid === uid);
        if (index !== -1) {
            this[index].points += points;
            return;
        }

        // Otherwise, add a new uid
        const emptyIndex = this.findIndex(hero => hero && hero.uid === -1);
        if (emptyIndex !== -1) {
            this[emptyIndex] = { uid, points: 1 };
        }
    }

    findHero(): number {
        // We clone the array because it should not be permanently sorted
        const clone = [...this];

        // Quicksort heroes by points
        quicksort(0, this.length - 1, clone, (a: Hero, b: Hero) => {
            return b.points - a.points;
        });

        return clone[0].uid;
    }
}
