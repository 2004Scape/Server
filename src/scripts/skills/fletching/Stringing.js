import BaseScript from '#scripts/BaseScript.js';
import ScriptManager from '#scripts/ScriptManager.js';

import objs from '#cache/objs.js';

const Bows = [
    {
        unstrung: objs.shortbow1,
        strung: objs.shortbow2,
        level: 5
    },
    {
        unstrung: objs.longbow1,
        strung: objs.longbow2,
        level: 10
    },
    {
        unstrung: objs.oak_shortbow1,
        strung: objs.oak_shortbow2,
        level: 20
    },
    {
        unstrung: objs.oak_longbow1,
        strung: objs.oak_longbow2,
        level: 25
    },
    {
        unstrung: objs.willow_shortbow1,
        strung: objs.willow_shortbow2,
        level: 35
    },
    {
        unstrung: objs.willow_longbow1,
        strung: objs.willow_longbow2,
        level: 40
    },
    {
        unstrung: objs.maple_shortbow1,
        strung: objs.maple_shortbow2,
        level: 50
    },
    {
        unstrung: objs.maple_longbow1,
        strung: objs.maple_longbow2,
        level: 55
    },
    {
        unstrung: objs.yew_shortbow1,
        strung: objs.yew_shortbow2,
        level: 65
    },
    {
        unstrung: objs.yew_longbow1,
        strung: objs.yew_longbow2,
        level: 70
    },
    {
        unstrung: objs.magic_shortbow1,
        strung: objs.magic_shortbow2,
        level: 80
    },
    {
        unstrung: objs.magic_longbow1,
        strung: objs.magic_longbow2,
        level: 85
    }
];

class AddBowString extends BaseScript {
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
        if (onItemId === objs.bow_string) {
            type = Bows.find(a => a.unstrung === useItemId);
        } else if (useItemId === objs.bow_string) {
            type = Bows.find(a => a.unstrung === onItemId);
        }

        this.inv_del(player.inv, objs.bow_string);
        this.inv_del(player.inv, type.unstrung);
        this.inv_add(player.inv, type.strung);
    }
}

for (let i = 0; i < Bows.length; i++) {
    ScriptManager.registerHeldUse({ onItemId: objs.bow_string, useItemId: Bows[i].unstrung }, AddBowString);
}
