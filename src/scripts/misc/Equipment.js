import ObjectType from '#cache/config/ObjectType.js';
import BaseScript from '#engine/Script.js';
import ScriptManager from '#engine/ScriptManager.js';

export class EquipItem extends BaseScript {
    *run(player) {
        const { itemId, slot, interfaceId } = this.params;
        if (!player.inv.hasAt(slot, itemId)) {
            return;
        }

        let item = player.inv.get(slot);
        let config = ObjectType.get(itemId);

        if (!config.wearpos.length) {
            this.mes(BaseScript.dm_default);
            return;
        }

        for (let i = 0; i < config.wearpos.length; i++) {
            let pos = config.wearpos[i];

            // TODO: inventory checks
            let equipped = player.worn.get(pos);
            if (equipped) {
                player.worn.transfer(player.inv, equipped, pos);
            }
        }

        player.inv.transfer(player.worn, item, slot, config.wearpos[0]);
    }
}

function loadWearable() {
    if (ObjectType.count > 0) {
        let wearable = ObjectType.filter(x => x.iops && (x.iops[1] == 'Wear' || x.iops[1] == 'Wield'));
        for (let i = 0; i < wearable.length; i++) {
            ScriptManager.register('OPHELD2', { itemId: wearable[i].id }, EquipItem);
        }
    } else {
        setTimeout(loadWearable, 100);
    }
}

loadWearable();

export class UnequipItem extends BaseScript {
    *run(player) {
        const { itemId, slot, interfaceId } = this.params;
        if (!player.worn.hasAt(slot, itemId)) {
            return;
        }

        let item = player.worn.get(slot);
        player.worn.transfer(player.inv, item);
    }
}

ScriptManager.register('IF_BUTTON1', { interfaceId: 1688 }, UnequipItem);
