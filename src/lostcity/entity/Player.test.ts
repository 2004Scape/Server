import World from '#lostcity/engine/World.js';
import ServerTriggerType from '#lostcity/engine/script/ServerTriggerType.js';
import Player from './Player.js';

const DEBUG = false;

describe('Player', () => {
    it('dummy', () => {
        expect(true).toBe(true);
    });

    if (DEBUG) {
        World.start(false, false);

        // kick-start the world a little
        for (let i = 0; i < 100; i++) {
            World.cycle(false);
        }

        describe('Loc interaction', () => {
            it('tree loc 2x2, 1 tile away', () => {
                // test what happpens when we're at the loc
                const player = Player.load('testacc');
                player.setVarp('tutorial_progress', 1000);
                player.setVarp('player_run', 0);
                player.x = 3264;
                player.z = 3234;
                player.level = 0;
                World.addPlayer(player, null);

                const loc = World.getLoc(3264, 3235, 0, 1276);
                expect(loc).not.toBe(null);

                if (loc) {
                    player.setInteraction(loc, ServerTriggerType.APLOC1);
                    player.processInteraction();
                }

                World.removePlayer(player);

                expect(player.interacted).toBe(true);
                expect(player.interactionSet).toBe(true); // tree calls p_oploc(1)
                expect(player.target).not.toBe(null);
                expect(player.x).toBe(3264);
                expect(player.z).toBe(3234);
                expect(player.hasSteps()).toBe(false);
            });

            it('tree loc 2x2, 2 tiles away, walking', () => {
                // test what happens when we need to walk to the loc
                const player = Player.load('testacc');
                player.setVarp('tutorial_progress', 1000);
                player.setVarp('player_run', 0);
                player.x = 3264;
                player.z = 3233;
                player.level = 0;
                World.addPlayer(player, null);

                const loc = World.getLoc(3264, 3235, 0, 1276);
                expect(loc).not.toBe(null);

                if (loc) {
                    player.setInteraction(loc, ServerTriggerType.APLOC1);
                    player.processInteraction();
                }

                World.removePlayer(player);

                expect(player.interacted).toBe(true);
                expect(player.interactionSet).toBe(true); // tree calls p_oploc(1)
                expect(player.target).not.toBe(null);
                expect(player.x).toBe(3264);
                expect(player.z).toBe(3234);
                expect(player.hasSteps()).toBe(false);
            });

            it('tree loc 2x2, 2 tiles away, running', () => {
                // test what happens when we run to the loc
                const player = Player.load('testacc');
                player.setVarp('tutorial_progress', 1000);
                player.setVarp('player_run', 1);
                player.x = 3264;
                player.z = 3233;
                player.level = 0;
                World.addPlayer(player, null);

                const loc = World.getLoc(3264, 3235, 0, 1276);
                expect(loc).not.toBe(null);

                if (loc) {
                    player.setInteraction(loc, ServerTriggerType.APLOC1);
                    player.processInteraction();
                }

                World.removePlayer(player);

                expect(player.interacted).toBe(true);
                expect(player.interactionSet).toBe(true); // tree calls p_oploc(1)
                expect(player.target).not.toBe(null);
                expect(player.x).toBe(3264);
                expect(player.z).toBe(3234);
                expect(player.hasSteps()).toBe(false);
            });

            it('tree loc 2x2, 3 tiles away, walking', () => {
                // test what happens when we need to run to the loc, and still can't reach it
                const player = Player.load('testacc');
                player.setVarp('tutorial_progress', 1000);
                player.setVarp('player_run', 0);
                player.x = 3264;
                player.z = 3232;
                player.level = 0;
                World.addPlayer(player, null);

                const loc = World.getLoc(3264, 3235, 0, 1276);
                expect(loc).not.toBe(null);

                if (loc) {
                    player.setInteraction(loc, ServerTriggerType.APLOC1);
                    player.processInteraction();
                }

                World.removePlayer(player);

                expect(player.interacted).toBe(false);
                expect(player.interactionSet).toBe(false);
                expect(player.target).not.toBe(null);
                expect(player.x).toBe(3264);
                expect(player.z).toBe(3233);
                expect(player.hasSteps()).toBe(true);
            });

            it('tree loc 2x2, 3 tiles away, running', () => {
                // test what happens when we need to run to the loc
                const player = Player.load('testacc');
                player.setVarp('tutorial_progress', 1000);
                player.setVarp('player_run', 1);
                player.x = 3264;
                player.z = 3232;
                player.level = 0;
                World.addPlayer(player, null);

                const loc = World.getLoc(3264, 3235, 0, 1276);
                expect(loc).not.toBe(null);

                if (loc) {
                    player.setInteraction(loc, ServerTriggerType.APLOC1);
                    player.processInteraction();
                }

                World.removePlayer(player);

                expect(player.interacted).toBe(true);
                expect(player.interactionSet).toBe(true); // tree calls p_oploc(1)
                expect(player.target).not.toBe(null);
                expect(player.x).toBe(3264);
                expect(player.z).toBe(3234);
                expect(player.hasSteps()).toBe(false);
            });

            it('tree loc 2x2, 4 tiles away', () => {
                // test what happens when we have to run to the loc, but we're still out of range after
                const player = Player.load('testacc');
                player.setVarp('tutorial_progress', 1000);
                player.setVarp('player_run', 1);
                player.x = 3264;
                player.z = 3231;
                player.level = 0;
                World.addPlayer(player, null);

                const loc = World.getLoc(3264, 3235, 0, 1276);
                expect(loc).not.toBe(null);

                if (loc) {
                    player.setInteraction(loc, ServerTriggerType.APLOC1);
                    player.processInteraction();
                }

                World.removePlayer(player);

                expect(player.interacted).toBe(false);
                expect(player.interactionSet).toBe(false);
                expect(player.target).not.toBe(null);
                expect(player.x).toBe(3264);
                expect(player.z).toBe(3233);
                expect(player.hasSteps()).toBe(true);
            });

            it('tree loc 2x2, 15 tiles away', () => {
                // test what happens when we're out of ap range completely
                const player = Player.load('testacc');
                player.setVarp('tutorial_progress', 1000);
                player.setVarp('player_run', 1);
                player.x = 3264;
                player.z = 3251;
                player.level = 0;
                World.addPlayer(player, null);

                const loc = World.getLoc(3264, 3235, 0, 1276);
                expect(loc).not.toBe(null);

                if (loc) {
                    player.setInteraction(loc, ServerTriggerType.APLOC1);
                    player.processInteraction();
                }

                World.removePlayer(player);

                expect(player.interacted).toBe(false);
                expect(player.interactionSet).toBe(false);
                expect(player.target).not.toBe(null);
                expect(player.x).toBe(3264);
                expect(player.z).toBe(3249);
                expect(player.hasSteps()).toBe(true);
            });

            it('tree loc 3x3, unreachable, at closest tile', () => {
                // test what happens when we can't path to the loc
                const player = Player.load('testacc');
                player.setVarp('tutorial_progress', 1000);
                player.setVarp('player_run', 1);
                player.x = 3213;
                player.z = 3263;
                player.level = 0;
                World.addPlayer(player, null);

                const loc = World.getLoc(3206, 3263, 0, 1281);
                expect(loc).not.toBe(null);

                if (loc) {
                    player.setInteraction(loc, ServerTriggerType.APLOC1);
                    player.processInteraction();
                }

                World.removePlayer(player);

                expect(player.interacted).toBe(false);
                expect(player.interactionSet).toBe(false);
                expect(player.target).toBe(null);
                expect(player.x).toBe(3213);
                expect(player.z).toBe(3263);
                expect(player.hasSteps()).toBe(false);
            });

            it('tree loc 3x3, unreachable, must path', () => {
                // test what happens when we can't path to the loc
                const player = Player.load('testacc');
                player.setVarp('tutorial_progress', 1000);
                player.setVarp('player_run', 1);
                player.x = 3216;
                player.z = 3251;
                player.level = 0;
                World.addPlayer(player, null);

                const loc = World.getLoc(3206, 3263, 0, 1281);
                expect(loc).not.toBe(null);

                // todo: validate path generated
                if (loc) {
                    player.setInteraction(loc, ServerTriggerType.APLOC1);
                    for (let i = 0; i < 10; i++) {
                        World.cycle(false);
                    }
                    player.processInteraction();
                }

                World.removePlayer(player);

                expect(player.interacted).toBe(false);
                expect(player.interactionSet).toBe(false);
                expect(player.target).toBe(null);
                expect(player.x).toBe(3213);
                expect(player.z).toBe(3263);
                expect(player.hasSteps()).toBe(false);
            });
        });
    }
});
