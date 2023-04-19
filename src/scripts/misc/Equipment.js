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

        let wornToRemove = [];

        // first, do we have space to remove the conflicting item?
        for (let i = 0; i < config.wearpos.length; i++) {
            let pos = config.wearpos[i];

            let equipped = player.worn.get(pos);
            if (!equipped) {
                continue;
            }

            if (wornToRemove.indexOf(pos) === -1) {
                wornToRemove.push(pos);
            }
        }

        // second, do any of our equipped items conflict with the new item?
        for (let pos = 0; pos < player.worn.capacity; pos++) {
            let equipped = player.worn.get(pos);
            if (!equipped) {
                continue;
            }

            let equippedConfig = ObjectType.get(equipped.id);
            if (equippedConfig.wearpos.includes(config.wearpos[0])) {
                if (wornToRemove.indexOf(pos) === -1) {
                    wornToRemove.push(pos);
                }
            }
        }

        // subtract one because we're swapping the item we're equipping
        if (player.inv.freeSlotCount() < wornToRemove.length - 1) {
            this.mes(`You don't have enough free space to do that.`);
            return;
        }

        player.inv.delete(slot);
        for (let i = 0; i < wornToRemove.length; i++) {
            let pos = wornToRemove[i];

            let equipped = player.worn.get(pos);
            if (equipped) {
                player.worn.transfer(player.inv, equipped, pos);
            }
        }
        player.worn.set(config.wearpos[0], item);
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
