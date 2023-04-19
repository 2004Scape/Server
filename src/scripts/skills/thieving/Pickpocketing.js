import BaseScript from '#engine/Script.js';
import ScriptManager from '#engine/ScriptManager.js';
import { Skills } from '#util/Experience.js';

class Pickpocket extends BaseScript {
    *run(player) {
        if (!this.map_members()) {
            this.mes(BaseScript.dm_members_action);
            return;
        }

        const { npcId } = this.params;

        // You fail to pick the man's pocket.
        // You've been stunned!
        // You're stunned!

        this.mes("You attempt to pick the man's pocket.");
        yield this.wait();

        this.anim('human_pickpocket');
        yield this.p_delay(0);

        this.mes("You pick the man's pocket.");
        player.inv.add(995, 10);
        player.addExperience(Skills.THIEVING, 100);
    }
}

ScriptManager.register('OPNPC3', { npcId: 1 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 2 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 3 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 4 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 5 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 6 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 7 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 9 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 10 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 15 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 16 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 18 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 20 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 21 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 23 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 24 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 25 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 26 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 32 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 34 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 66 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 67 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 159 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 160 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 161 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 168 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 169 }, Pickpocket);
ScriptManager.register('OPNPC3', { npcId: 187 }, Pickpocket);
