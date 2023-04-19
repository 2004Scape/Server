import ObjectType from '#cache/config/ObjectType.js';
import objs from '#cache/objs.js';
import BaseScript from '#engine/Script.js';
import ScriptManager from '#engine/ScriptManager.js';
import { Skills } from '#util/Experience.js';

const herbs = [
    {
        // Guam
        clean: 249,
        dirty: 199,
        level: 1,
        experience: 2.5
    },
    {
        // Marrentill
        clean: 251,
        dirty: 201,
        level: 5,
        experience: 3.8
    },
    {
        // Tarromin
        clean: 253,
        dirty: 203,
        level: 11,
        experience: 5
    },
    {
        // Harralander
        clean: 255,
        dirty: 205,
        level: 20,
        experience: 6.3
    },
    {
        // Ranarr
        clean: 257,
        dirty: 207,
        level: 25,
        experience: 7.5
    },
    {
        // Irit leaf
        clean: 259,
        dirty: 209,
        level: 40,
        experience: 8.8
    },
    {
        // Avantoe
        clean: 261,
        dirty: 211,
        level: 48,
        experience: 10
    },
    {
        // Kwuarm
        clean: 263,
        dirty: 213,
        level: 54,
        experience: 11.3
    },
    {
        // Cadantine
        clean: 265,
        dirty: 215,
        level: 65,
        experience: 12.5
    },
    {
        // Lantadyme
        clean: 2481,
        dirty: 2485,
        level: 67,
        experience: 13.1
    },
    {
        // Dwarf weed
        clean: 267,
        dirty: 217,
        level: 70,
        experience: 13.8
    },
    {
        // Torstol
        clean: 269,
        dirty: 219,
        level: 75,
        experience: 15
    }
];

class IdentifyHerb extends BaseScript {
    *run(player) {
        if (!this.map_members()) {
            this.mes(BaseScript.dm_members_obj);
            return;
        }

        const { itemId, slot, interfaceId } = this.params;
        if (!player.inv.hasAt(slot, itemId)) {
            return;
        }

        const herb = herbs.find(h => h.dirty == itemId);
        if (this.stat(Skills.HERBLORE) < herb.level) {
            this.mes(`You need a higher Herblore level to identify this herb.`);
            return;
        }

        const clean = ObjectType.get(herb.clean);
        this.inv_setslot(player.inv, slot, herb.clean, 1);
        this.mes(`That appears to be a ${clean.name}.`);
        this.givexp(Skills.HERBLORE, herb.experience);
    }
}

for (let i = 0; i < herbs.length; i++) {
    ScriptManager.register('OPHELD1', { itemId: herbs[i].dirty }, IdentifyHerb);
}
