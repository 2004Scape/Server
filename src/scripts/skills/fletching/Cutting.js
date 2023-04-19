import BaseScript from '#engine/Script.js';
import ScriptManager from '#engine/ScriptManager.js';

import objs from '#cache/objs.js';

class FletchNormalLogs extends BaseScript {
    *run(player) {
        if (!this.map_members()) {
            this.mes(BaseScript.dm_members_obj);
            return;
        }

        const { onItemId, onSlot, onInterfaceId, useItemId, useSlot, useInterfaceId } = this.params;
        if (!player.inv.hasAt(onSlot, onItemId) || !player.inv.hasAt(useSlot, useItemId)) {
            return;
        }

        yield this.p_choice('Arrow shafts', 'Shortbow', 'Longbow');

        switch (this.choice) {
            case 1:
                this.inv_del(player.inv, objs.logs1);
                this.inv_add(player.inv, objs.arrow_shaft, 15);
                break;
            case 2:
                this.inv_del(player.inv, objs.logs1);
                this.inv_add(player.inv, objs.shortbow1);
                break;
            case 3:
                this.inv_del(player.inv, objs.logs1);
                this.inv_add(player.inv, objs.longbow1);
                break;
        }
    }
}

ScriptManager.registerHeldUse({ onItemId: objs.logs1, useItemId: objs.knife }, FletchNormalLogs);

// ----

const Logs = [
    {
        log: objs.oak_logs,
        shortbow: objs.oak_shortbow1,
        longbow: objs.oak_longbow1,
    },
    {
        log: objs.willow_logs,
        shortbow: objs.willow_shortbow1,
        longbow: objs.willow_longbow1,
    },
    {
        log: objs.maple_logs,
        shortbow: objs.maple_shortbow1,
        longbow: objs.maple_longbow1,
    },
    {
        log: objs.yew_logs,
        shortbow: objs.yew_shortbow1,
        longbow: objs.yew_longbow1,
    },
    {
        log: objs.magic_logs,
        shortbow: objs.magic_shortbow1,
        longbow: objs.magic_longbow1,
    },
];

class FletchLogs extends BaseScript {
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
        if (onItemId === objs.knife) {
            type = Logs.find(a => a.log === useItemId);
        } else if (useItemId === objs.knife) {
            type = Logs.find(a => a.log === onItemId);
        }

        yield this.p_choice('Shortbow', 'Longbow');

        switch (this.choice) {
            case 1:
                this.inv_del(player.inv, type.log);
                this.inv_add(player.inv, type.shortbow);
                break;
            case 2:
                this.inv_del(player.inv, type.log);
                this.inv_add(player.inv, type.longbow);
                break;
        }
    }
}

for (let i = 0; i < Logs.length; i++) {
    ScriptManager.registerHeldUse({ onItemId: Logs[i].log, useItemId: objs.knife }, FletchLogs);
}
