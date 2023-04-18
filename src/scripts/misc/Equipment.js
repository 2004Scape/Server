import ObjectType from '#cache/config/ObjectType.js';
import BaseScript from '#scripts/BaseScript.js';
import ScriptManager from '#scripts/ScriptManager.js';

const WEAR_SLOTS = {
    // not visible
    'ammo': -1,
    'ring': -1,

    // visible
    'helmet': 0,
    'head': 8,
    'jaw': 11,
    'cape': 1, 
    'neck': 2,
    'body': 4,
    'fullbody': 4, // hides upper arms
    'fullbodygloves': 4, // hides arms completely
    'hands': 9,
    'weapon': 3,
    '2h': 3, // hides shield
    'shield': 5,
    'legs': 7,
    'feet': 10
};

function getWearSlot(name) { 
    let match = Object.keys(slots).indexOf(name);
    if (match === -1) {
        return -1;
    }

    return Object.values(slots)[match];
}

export class EquipItem extends BaseScript {
    *run(player) {
        const { itemId, slot, interfaceId } = this.params;
        if (!player.inv.hasAt(slot, itemId)) {
            return;
        }

        let item = player.inv.get(slot);
        let wearSlot = 0; // getWearSlot(item.name);

        let equipped = player.worn.get(wearSlot);
        if (equipped) {
            player.worn.transfer(player.inv, equipped, wearSlot);
        }

        player.inv.transfer(player.worn, item, slot, wearSlot);
    }
}

function loadWearable() {
    if (ObjectType.count > 0) {
        let wearable = ObjectType.filter(x => x.iops && x.iops[1] == 'Wear');
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
