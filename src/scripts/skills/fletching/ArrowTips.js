import BaseScript from '#engine/Script.js';
import ScriptManager from '#engine/ScriptManager.js';

import objs from '#cache/objs.js';

const Arrows = [
    {
        arrowtip: objs.bronze_arrowtips,
        arrow: objs.bronze_arrow,
        level: 1
    },
    {
        arrowtip: objs.iron_arrowtips,
        arrow: objs.iron_arrow,
        level: 15
    },
    {
        arrowtip: objs.steel_arrowtips,
        arrow: objs.steel_arrow,
        level: 30
    },
    {
        arrowtip: objs.mithril_arrowtips,
        arrow: objs.mithril_arrow,
        level: 45
    },
    {
        arrowtip: objs.adamant_arrowtips,
        arrow: objs.adamant_arrow,
        level: 60
    },
    {
        arrowtip: objs.rune_arrowtips,
        arrow: objs.rune_arrow,
        level: 75
    }
];

class AddArrowTips extends BaseScript {
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
        if (onItemId === objs.headless_arrow) {
            type = Arrows.find(a => a.arrowtip === useItemId);
        } else if (useItemId === objs.headless_arrow) {
            type = Arrows.find(a => a.arrowtip === onItemId);
        }

        let count = Math.min(Math.min(this.inv_total(player.inv, objs.headless_arrow), this.inv_total(player.inv, type.arrowtip)), 15);
        this.inv_del(player.inv, objs.headless_arrow, count);
        this.inv_del(player.inv, type.arrowtip, count);
        this.inv_add(player.inv, type.arrow, count);
    }
}

for (let i = 0; i < Arrows.length; i++) {
    ScriptManager.registerHeldUse({ onItemId: objs.headless_arrow, useItemId: Arrows[i].arrowtip }, AddArrowTips);
}
