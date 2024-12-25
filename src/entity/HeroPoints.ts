type Hero = {
    uid: number;
    points: number;
}

export default class HeroPoints extends Array<Hero> {
    constructor(length: number) {
        super(length);
        this.clear();
    }

    clear(): void {
        this.fill({ uid: -1, points: 0 });
    }

    addHero(uid: number, points: number): void {
        // check if hero already exists, then add points
        const index = this.findIndex(hero => hero && hero.uid === uid);
        if (index !== -1) {
            this[index].points += points;
            return;
        }

        // otherwise, add a new uid. if all 16 spaces are taken do we replace the lowest?
        const emptyIndex = this.findIndex(hero => hero && hero.uid === -1);
        if (emptyIndex !== -1) {
            this[emptyIndex] = { uid, points };
        }
    }

    findHero(): number {
        // quicksort heroes by points
        this.sort((a, b) => {
            return b.points - a.points;
        });
        return this[0].uid;
    }
}