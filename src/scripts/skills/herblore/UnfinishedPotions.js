import ObjectType from '#cache/config/ObjectType.js';
import objs from '#cache/objs.js';
import BaseScript from '#scripts/BaseScript.js';
import ScriptManager from '#scripts/ScriptManager.js';
import { Skills } from '#util/Experience.js';

const unfinishedPotions = [
    {
        // Unf guam
        unfinished: 91,
        herb: 249,
        level: 1
    },
    {
        // Unf marrentill
        unfinished: 93,
        herb: 251,
        level: 5
    },
    {
        // Unf tarromin
        unfinished: 95,
        herb: 253,
        level: 12
    },
    {
        // Unf harralander
        unfinished: 97,
        herb: 255,
        level: 22
    },
    {
        // Unf ranarr
        unfinished: 99,
        herb: 257,
        level: 30
    },
    {
        // Unf irit leaf
        unfinished: 101,
        herb: 259,
        level: 45
    },
    {
        // Unf avantoe
        unfinished: 103,
        herb: 261,
        level: 50
    },
    {
        // Unf kwuarm
        unfinished: 105,
        herb: 263,
        level: 55
    },
    {
        // Unf cadantine
        unfinished: 107,
        herb: 265,
        level: 66
    },
    {
        // Unf lantadyme
        unfinished: 2483,
        herb: 2481,
        level: 69
    },
    {
        // Unf dwarf weed
        unfinished: 109,
        herb: 267,
        level: 72
    },
    {
        // Unf torstol
        unfinished: 111,
        herb: 269,
        level: 78
    }
];

class MakeUnfinishedPotionEvent extends BaseScript {
    *run(player) {
        const { potion } = this.params;

        this.anim('human_herbing_vial');
        yield this.p_delay(2);

        this.inv_del(player.inv, objs.vial_of_water);
        this.inv_del(player.inv, potion.herb);
        this.inv_add(player.inv, potion.unfinished);

        const herb = ObjectType.get(potion.herb);
        this.mes(`You put the ${herb.name} into the vial of water.`);
    }
}

class MakeUnfinishedPotion extends BaseScript {
    *run(player) {
        if (!this.map_members()) {
            this.mes(BaseScript.dm_members_obj);
            return;
        }

        const { onItemId, onSlot, onInterfaceId, useItemId, useSlot, useInterfaceId } = this.params;
        if (!player.inv.hasAt(onSlot, onItemId) || !player.inv.hasAt(useSlot, useItemId)) {
            return;
        }

        const potion = unfinishedPotions.find(i => i.herb == onItemId || i.herb == useItemId);
        if (player.getLevel(Skills.HERBLORE) < potion.level) {
            this.mesbox(`You need level ${potion.level} Herblore to combine those.`);
            return;
        }

        this.weakqueue(MakeUnfinishedPotionEvent, { potion });
    }
}

for (let i = 0; i < unfinishedPotions.length; i++) {
    ScriptManager.registerHeldUse({ onItemId: unfinishedPotions[i].herb, useItemId: objs.vial_of_water }, MakeUnfinishedPotion);
}
