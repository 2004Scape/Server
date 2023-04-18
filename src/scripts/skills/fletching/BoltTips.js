import BaseScript from '#scripts/BaseScript.js';
import ScriptManager from '#scripts/ScriptManager.js';

import objs from '#cache/objs.js';

const Bolts = [
    {
        tip: objs.opal_bolttips,
        bolt: objs.opal_bolt
    },
    {
        tip: objs.pearl_bolttips,
        bolt: objs.pearl_bolt
    },
    {
        tip: objs.barb_bolttips,
        bolt: objs.barbed_bolt
    }
];

class AddBoltTips extends BaseScript {
    *run(player) {
        if (!this.map_members()) {
            this.mes(BaseScript.dm_members_obj);
            return;
        }

        const { onItemId, onSlot, onInterfaceId, useItemId, useSlot, useInterfaceId } = this.params;
        if (!player.inv.hasAt(onSlot, onItemId) || !player.inv.hasAt(useSlot, useItemId)) {
            return;
        }

        let type;
        if (onItemId === objs.bolt) {
            type = Bolts.find(a => a.tip === useItemId);
        } else if (useItemId === objs.bolt) {
            type = Bolts.find(a => a.tip === onItemId);
        }

        let count = Math.min(Math.min(this.inv_total(player.inv, objs.bolt), this.inv_total(player.inv, type.tip)), 10);
        this.inv_del(player.inv, objs.bolt, count);
        this.inv_del(player.inv, type.tip, count);
        this.inv_add(player.inv, type.bolt, count);
    }
}

for (let i = 0; i < Bolts.length; i++) {
    ScriptManager.registerHeldUse({ onItemId: objs.bolt, useItemId: Bolts[i].tip }, AddBoltTips);
}
