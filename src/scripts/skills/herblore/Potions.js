import ObjectType from '#cache/config/ObjectType.js';
import objs from '#cache/objs.js';
import BaseScript from '#engine/Script.js';
import ScriptManager from '#engine/ScriptManager.js';
import { Skills } from '#util/Experience.js';

const potions = [
    {
        // Attack potion
        finished: 121,
        unfinished: 91,
        ingredient: 221,
        level: 1,
        experience: 25
    },
    {
        // Antipoison potion
        finished: 175,
        unfinished: 93,
        ingredient: 235,
        level: 5,
        experience: 37.5
    },
    {
        // Strength potion
        finished: 115,
        unfinished: 95,
        ingredient: 225,
        level: 12,
        experience: 50
    },
    {
        // Restore potion
        finished: 127,
        unfinished: 97,
        ingredient: 223,
        level: 22,
        experience: 62.5
    },
    {
        // Defence potion
        finished: 133,
        unfinished: 99,
        ingredient: 239,
        level: 30,
        experience: 75
    },
    {
        // Prayer potion
        finished: 139,
        unfinished: 99,
        ingredient: 231,
        level: 38,
        experience: 87.5
    },
    {
        // Super attack potion
        finished: 145,
        unfinished: 101,
        ingredient: 221,
        level: 45,
        experience: 100
    },
    {
        // Super antipoison potion
        finished: 181,
        unfinished: 101,
        ingredient: 235,
        level: 48,
        experience: 106.3
    },
    {
        // Fishing potion
        finished: 151,
        unfinished: 103,
        ingredient: 231,
        level: 50,
        experience: 112.5
    },
    {
        // Super strength potion
        finished: 157,
        unfinished: 105,
        ingredient: 225,
        level: 55,
        experience: 125
    },
    {
        // Weapon poison potion
        finished: 187,
        unfinished: 105,
        ingredient: 241,
        level: 60,
        experience: 137.5
    },
    {
        // Super defence potion
        finished: 163,
        unfinished: 107,
        ingredient: 239,
        level: 66,
        experience: 150
    },
    {
        // Antifire potion
        finished: 2454,
        unfinished: 2483,
        ingredient: 241,
        level: 69,
        experience: 157.5
    },
    {
        // Ranging potion
        finished: 169,
        unfinished: 109,
        ingredient: 245,
        level: 72,
        experience: 162.5
    },
    {
        // Zamorak brew potion
        finished: 189,
        unfinished: 111,
        ingredient: 247,
        level: 78,
        experience: 175
    },
];

class MakePotionEvent extends BaseScript {
    *run(player) {
        const { potion } = this.params;

        this.anim('human_herbing_vial');
        yield this.p_delay(1);

        this.inv_del(player.inv, potion.unfinished);
        this.inv_del(player.inv, potion.ingredient);
        this.inv_add(player.inv, potion.finished);

        if (potion.ingredient == objs.wine_of_zamorak) {
            this.inv_add(player.inv, objs.jug);
        }

        const ingredient = ObjectType.get(potion.ingredient);
        this.mes(`You mix the ${ingredient.name.toLowerCase()} into your potion.`);
        this.givexp(Skills.HERBLORE, potion.experience);
    }
}

class MakePotion extends BaseScript {
    *run(player) {
        if (!this.map_members()) {
            this.mes(BaseScript.dm_members_obj);
            return;
        }

        const { onItemId, onSlot, onInterfaceId, useItemId, useSlot, useInterfaceId } = this.params;
        if (!player.inv.hasAt(onSlot, onItemId) || !player.inv.hasAt(useSlot, useItemId)) {
            return;
        }

        const potion = potions.find(i => (i.ingredient == onItemId && i.unfinished == useItemId) || (i.ingredient == useItemId && i.unfinished == onItemId));
        if (player.getLevel(Skills.HERBLORE) < potion.level) {
            this.mesbox(`You need level ${potion.level} Herblore to combine those.`);
        }

        this.weakqueue(MakePotionEvent, { potion });
    }
}

for (let i = 0; i < potions.length; i++) {
    ScriptManager.registerHeldUse({ onItemId: potions[i].ingredient, useItemId: potions[i].unfinished }, MakePotion);
}
