import LocationType from '#cache/config/LocationType.js';
import locs from '#cache/locs.js';
import BaseScript from '#engine/Script.js';
import ScriptManager from '#engine/ScriptManager.js';

class GoUpStairs extends BaseScript {
    *run(player) {
        // let def = LocationType.get(this.params.locId);
        // TODO: account for orientation and size
        player.teleport(this.params.x, this.params.z, player.plane + 1);
    }
}

ScriptManager.register('OPLOC1', { locId: locs.staircase1 }, GoUpStairs);
ScriptManager.register('OPLOC1', { locId: locs.staircase4 }, GoUpStairs);
ScriptManager.register('OPLOC1', { locId: locs.staircase8 }, GoUpStairs);
ScriptManager.register('OPLOC1', { locId: locs.staircase13 }, GoUpStairs);
ScriptManager.register('OPLOC1', { locId: locs.staircase16 }, GoUpStairs);
ScriptManager.register('OPLOC1', { locId: locs.staircase17 }, GoUpStairs);
ScriptManager.register('OPLOC1', { locId: locs.staircase21 }, GoUpStairs);
ScriptManager.register('OPLOC1', { locId: locs.staircase25 }, GoUpStairs);

class GoDownStairs extends BaseScript {
    *run(player) {
        // let def = LocationType.get(this.params.locId);
        // TODO: account for orientation and size
        player.teleport(this.params.x, this.params.z, player.plane - 1);
    }
}

ScriptManager.register('OPLOC1', { locId: locs.staircase2 }, GoDownStairs);
ScriptManager.register('OPLOC1', { locId: locs.staircase3 }, GoDownStairs);
ScriptManager.register('OPLOC1', { locId: locs.staircase5 }, GoDownStairs);
ScriptManager.register('OPLOC1', { locId: locs.staircase6 }, GoDownStairs);
ScriptManager.register('OPLOC1', { locId: locs.staircase7 }, GoDownStairs);
ScriptManager.register('OPLOC1', { locId: locs.staircase11 }, GoDownStairs);
ScriptManager.register('OPLOC1', { locId: locs.staircase12 }, GoDownStairs);
ScriptManager.register('OPLOC1', { locId: locs.staircase15 }, GoDownStairs);
ScriptManager.register('OPLOC1', { locId: locs.staircase19 }, GoDownStairs);
ScriptManager.register('OPLOC1', { locId: locs.staircase20 }, GoDownStairs);
ScriptManager.register('OPLOC1', { locId: locs.staircase23 }, GoDownStairs);
ScriptManager.register('OPLOC1', { locId: locs.staircase24 }, GoDownStairs);
