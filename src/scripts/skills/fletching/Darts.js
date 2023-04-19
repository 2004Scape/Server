import BaseScript from '#engine/Script.js';
import ScriptManager from '#engine/ScriptManager.js';

import objs from '#cache/objs.js';

const Darts = [
    {
        dart: objs.bronze_dart,
        tip: objs.bronze_dart_tip
    },
    {
        dart: objs.iron_dart,
        tip: objs.iron_dart_tip
    },
    {
        dart: objs.steel_dart,
        tip: objs.steel_dart_tip
    },
    {
        dart: objs.mithril_dart,
        tip: objs.mithril_dart_tip
    },
    {
        dart: objs.adamant_dart,
        tip: objs.adamant_dart_tip
    },
    {
        dart: objs.rune_dart,
        tip: objs.rune_dart_tip
    }
];

class MakeDarts extends BaseScript {
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
        if (onItemId === objs.feather) {
            type = Darts.find(a => a.tip === useItemId);
        } else if (useItemId === objs.feather) {
            type = Darts.find(a => a.tip === onItemId);
        }

        let count = Math.min(Math.min(this.inv_total(player.inv, objs.feather), this.inv_total(player.inv, type.tip)), 10);
        this.inv_del(player.inv, objs.feather, count);
        this.inv_del(player.inv, type.tip, count);
        this.inv_add(player.inv, type.dart, count);
    }
}

for (let i = 0; i < Darts.length; i++) {
    ScriptManager.registerHeldUse({ onItemId: objs.feather, useItemId: Darts[i].tip }, MakeDarts);
}
