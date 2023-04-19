import BaseScript from '#engine/Script.js';
import ScriptManager from '#engine/ScriptManager.js';

// Woodcutting waits 3 ticks and calculates a 50% chance to chop a tree down, otherwise it waits another 3 ticks and tries again
class ChopTree extends BaseScript {
    *run(player) {
        yield this.p_arrivedelay();

        this.mes('You swing your axe at the tree.');
        this.anim('human_woodcutting_bronze_axe');
        this.sound_synth('woodchop');

        let chance = false;
        while (!chance) {
            yield this.wait(2);

            this.counter += 2;
            if (this.counter >= 4) {
                chance = Math.random() > 0.75;
                if (!chance) {
                    // replay the animation every 4 ticks
                    this.anim('human_woodcutting_bronze_axe');
                }
                this.counter = 0;
            }

            // replay the sound every 2 ticks
            if (!chance) {
                this.sound_synth('woodchop');
            }
        }

        this.mes('You get some logs.');
        player.inv.add(1511, 1);

        // TODO: You need an axe to chop down this tree.
        // TODO: You do not have an axe which you have the woodcutting level to use.
    }
}

ScriptManager.register('OPLOC1', { locId: 1276 }, ChopTree);
ScriptManager.register('OPLOC1', { locId: 1278 }, ChopTree);
ScriptManager.register('OPLOC1', { locId: 1281 }, ChopTree);
ScriptManager.register('OPLOC1', { locId: 1286 }, ChopTree);
ScriptManager.register('OPLOC1', { locId: 1308 }, ChopTree);
