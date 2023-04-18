import BaseScript from '#scripts/BaseScript.js';
import ScriptManager from '#scripts/ScriptManager.js';
import { Skills } from '#util/Experience.js';
import objs from '#cache/objs.js';
import locs from '#cache/locs.js';

class MineRock extends BaseScript {
    *run(player) {
        const { locId } = this.params;

        // this.mesbox('You need a Mining level of 55 to mine this rock.');

        // let inBackpack = false;
        // let inEquipment = false;
        // if (!inBackpack && !inEquipment) {
        //     this.mesbox('You need a pickaxe to mine this rock. You do not have a pickaxe', 'which you have the mining level to use.');
        //     yield this.p_pausebutton();
        // }

        yield this.p_arrivedelay();
        yield this.anim('human_mining_bronze_pickaxe');
        yield this.p_delay(0);
    }
}

ScriptManager.register('OPLOC1', { locId: locs.rocks1 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks2 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks3 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks4 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks7 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks8 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks9 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks10 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks11 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks12 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks13 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks14 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks15 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks16 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks17 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks18 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks19 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks20 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks21 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks22 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks23 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks24 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks25 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks26 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks27 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks28 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks29 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks30 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks31 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks32 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks33 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks34 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks35 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks36 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks37 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks38 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks39 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks40 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks41 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks42 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks43 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks44 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks45 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks46 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks47 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks48 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks49 }, MineRock);
ScriptManager.register('OPLOC1', { locId: locs.rocks50 }, MineRock);

class RespondNoOre extends BaseScript {
    *run(player) {
        this.mes('There is currently no ore available in this rock.');
    }
}

ScriptManager.register('OPLOC1', { locId: 452 }, RespondNoOre);
