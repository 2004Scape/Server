import BaseScript from '#engine/Script.js';
import ScriptManager from '#engine/ScriptManager.js';

import objs from '#cache/objs.js';

class AddFeathersToShaft extends BaseScript {
    *run(player) {
        if (!this.map_members()) {
            this.mes(BaseScript.dm_members_obj);
            return;
        }

        const { onItemId, onSlot, onInterfaceId, useItemId, useSlot, useInterfaceId } = this.params;
        if (!player.inv.hasAt(onSlot, onItemId) || !player.inv.hasAt(useSlot, useItemId)) {
            return;
        }

        let count = Math.min(Math.min(this.inv_total(player.inv, objs.feather), this.inv_total(player.inv, objs.arrow_shaft)), 15);
        this.inv_del(player.inv, objs.feather, count);
        this.inv_del(player.inv, objs.arrow_shaft, count);
        this.inv_add(player.inv, objs.headless_arrow, count);
    }
}

ScriptManager.registerHeldUse({ onItemId: objs.feather, useItemId: objs.arrow_shaft }, AddFeathersToShaft);
