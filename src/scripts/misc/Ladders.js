import BaseScript from '#engine/Script.js';
import ScriptManager from '#engine/ScriptManager.js';

import locs from '#cache/locs.js';

class GoUpLadder extends BaseScript {
    *run(player) {
        yield this.p_arrivedelay();

        this.anim('human_reachforladdertop');
        yield this.p_delay(0);

        player.teleport(player.x, player.z, player.plane + 1, false);
    }
}

ScriptManager.register('OPLOC1', { locId: locs.ladder2 }, GoUpLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder3 }, GoUpLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder5 }, GoUpLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder11 }, GoUpLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder14 }, GoUpLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder16 }, GoUpLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder25 }, GoUpLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder27 }, GoUpLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder32 }, GoUpLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder33 }, GoUpLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder35 }, GoUpLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder39 }, GoUpLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder40 }, GoUpLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder43 }, GoUpLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder46 }, GoUpLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder47 }, GoUpLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder50 }, GoUpLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder52 }, GoUpLadder);
ScriptManager.register('OPLOC1', { locId: locs.ships_ladder1 }, GoUpLadder);
ScriptManager.register('OPLOC1', { locId: locs.ships_ladder3 }, GoUpLadder);
ScriptManager.register('OPLOC1', { locId: locs.ships_ladder5 }, GoUpLadder);
ScriptManager.register('OPLOC1', { locId: locs.tower_ladder1 }, GoUpLadder);

ScriptManager.register('OPLOC2', { locId: locs.ladder12 }, GoUpLadder);
ScriptManager.register('OPLOC2', { locId: locs.ladder15 }, GoUpLadder);
ScriptManager.register('OPLOC2', { locId: locs.ladder53 }, GoUpLadder);

class GoDownLadder extends BaseScript {
    *run(player) {
        yield this.p_arrivedelay();

        this.anim('human_reachforladder');
        yield this.p_delay(0);

        player.teleport(player.x, player.z, player.plane - 1, false);
    }
}

ScriptManager.register('OPLOC1', { locId: locs.ladder1 }, GoDownLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder6 }, GoDownLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder8 }, GoDownLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder10 }, GoDownLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder13 }, GoDownLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder17 }, GoDownLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder20 }, GoDownLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder22 }, GoDownLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder24 }, GoDownLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder26 }, GoDownLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder29 }, GoDownLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder31 }, GoDownLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder34 }, GoDownLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder38 }, GoDownLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder41 }, GoDownLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder41 }, GoDownLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder44 }, GoDownLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder45 }, GoDownLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder48 }, GoDownLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder49 }, GoDownLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder51 }, GoDownLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder58 }, GoDownLadder);
ScriptManager.register('OPLOC1', { locId: locs.ships_ladder2 }, GoDownLadder);
ScriptManager.register('OPLOC1', { locId: locs.ships_ladder4 }, GoDownLadder);
ScriptManager.register('OPLOC1', { locId: locs.ships_ladder6 }, GoDownLadder);
ScriptManager.register('OPLOC1', { locId: locs.tower_ladder2 }, GoDownLadder);

class GoDownFullLadder extends BaseScript {
    *run(player) {
        yield this.p_arrivedelay();

        this.anim('human_reachforladdertop');
        yield this.p_delay(0);

        player.teleport(player.x, player.z, player.plane - 1, false);
    }
}

ScriptManager.register('OPLOC3', { locId: locs.ladder12 }, GoDownFullLadder);
ScriptManager.register('OPLOC3', { locId: locs.ladder15 }, GoDownFullLadder);
ScriptManager.register('OPLOC3', { locId: locs.ladder53 }, GoDownFullLadder);

class GoUpRegionLadder extends BaseScript {
    *run(player) {
        yield this.p_arrivedelay();

        this.anim('human_reachforladdertop');
        yield this.p_delay(0);

        player.teleport(player.x, player.z - 6400, 0, false);
    }
}

ScriptManager.register('OPLOC1', { locId: locs.ladder4 }, GoUpRegionLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder7 }, GoUpRegionLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder19 }, GoUpRegionLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder21 }, GoUpRegionLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder30 }, GoUpRegionLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder37 }, GoUpRegionLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder54 }, GoUpRegionLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder56 }, GoUpRegionLadder);

class GoDownRegionLadder extends BaseScript {
    *run(player) {
        yield this.p_arrivedelay();

        this.anim('human_reachforladder');
        yield this.p_delay(0);

        player.teleport(player.x, player.z + 6400, 0, false);
    }
}

ScriptManager.register('OPLOC1', { locId: locs.ladder18 }, GoDownRegionLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder23 }, GoDownRegionLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder28 }, GoDownRegionLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder55 }, GoDownRegionLadder);
ScriptManager.register('OPLOC1', { locId: locs.ladder57 }, GoDownRegionLadder);
