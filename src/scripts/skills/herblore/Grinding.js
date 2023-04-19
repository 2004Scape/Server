import ObjectType from '#cache/config/ObjectType.js';
import objs from '#cache/objs.js';
import BaseScript from '#engine/Script.js';
import ScriptManager from '#engine/ScriptManager.js';
import { Skills } from '#util/Experience.js';

const ingredients = [
    {
        // Unicorn horn dust
        groundId: 235,
        rawId: 237
    },
    {
        // Dragon scale dust
        groundId: 241,
        rawId: 243
    },
    {
        // Chocolate dust
        groundId: 1975,
        rawId: 1973
    }
];

class GrindIngredientEvent extends BaseScript {
    *run(player) {
        const { ingredient } = this.params;

        this.anim('human_herbing_grind');
        yield this.p_delay(1);

        const raw = ObjectType.get(ingredient.rawId);
        this.inv_del(player.inv, ingredient.rawId);
        this.inv_add(player.inv, ingredient.groundId);

        this.mes(`You grind the ${raw.name} to dust.`);
    }
}

class GrindIngredient extends BaseScript {
    *run(player) {
        if (!this.map_members()) {
            this.mes(BaseScript.dm_members_obj);
            return;
        }

        const { onItemId, onSlot, onInterfaceId, useItemId, useSlot, useInterfaceId } = this.params;
        if (!player.inv.hasAt(onSlot, onItemId) || !player.inv.hasAt(useSlot, useItemId)) {
            return;
        }

        const ingredient = ingredients.find(i => i.rawId == onItemId || i.rawId == useItemId);
        this.weakqueue(GrindIngredientEvent, { ingredient });
    }
}

for (let i = 0; i < ingredients.length; i++) {
    ScriptManager.registerHeldUse({ onItemId: ingredients[i].rawId, useItemId: objs.pestle_and_mortar }, GrindIngredient);
}

// ----

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
        yield this.p_delay(1);

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

// ----

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
