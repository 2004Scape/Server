import locs from '#cache/locs.js';
import objs from '#cache/objs.js';
import BaseScript from '#engine/Script.js';
import ScriptManager from '#engine/ScriptManager.js';

class RangeCook extends BaseScript {
    *run(player) {
        const { locId, objId, x, z, slot, interfaceId } = this.params;
        yield this.p_arrivedelay();

        if (!player.inv.hasAt(slot, objId)) {
            return;
        }

        this.anim('human_cooking');
        // cooking sound?
        yield this.p_delay(3);

        this.inv_del(player.inv, objId);
        this.inv_add(player.inv, objs.shrimps);
    }
}

ScriptManager.register('OPLOCU', { locId: locs.range1, objId: objs.raw_shrimps1 }, RangeCook);
ScriptManager.register('OPLOCU', { locId: locs.range2, objId: objs.raw_shrimps1 }, RangeCook);
ScriptManager.register('OPLOCU', { locId: locs.range3, objId: objs.raw_shrimps1 }, RangeCook);
ScriptManager.register('OPLOCU', { locId: locs.range4, objId: objs.raw_shrimps1 }, RangeCook);
ScriptManager.register('OPLOCU', { locId: locs.range5, objId: objs.raw_shrimps1 }, RangeCook);
ScriptManager.register('OPLOCU', { locId: locs.range6, objId: objs.raw_shrimps1 }, RangeCook);
ScriptManager.register('OPLOCU', { locId: locs.cooking_range, objId: objs.raw_shrimps1 }, RangeCook);
