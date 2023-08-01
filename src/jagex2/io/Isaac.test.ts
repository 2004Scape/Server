import Isaac from '#jagex2/io/Isaac.js';

describe('Isaac', () => {
    describe('seed(0, 0, 0, 0)', () => {
        it('result after 1 million iterations', () => {
            const isaac = new Isaac();
            for (let i = 0; i < 1_000_000; i++) {
                isaac.nextInt();
            }

            // checks that isaac is shuffling correctly
            expect(isaac.nextInt()).toBe(1536048213);
        });
    });

    describe('seed(1, 2, 3, 4)', () => {
        it('result after 1 million iterations', () => {
            const isaac = new Isaac([1, 2, 3, 4]);
            for (let i = 0; i < 1_000_000; i++) {
                isaac.nextInt();
            }

            // checks that rsl was populated and that isaac is shuffling correctly
            expect(isaac.nextInt()).toBe(-107094133);
        });
    });
});
