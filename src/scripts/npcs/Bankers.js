import BaseScript from '#engine/Script.js';
import ScriptManager from '#engine/ScriptManager.js';

import npcs from '#cache/npcs.js';

class BankerTalk extends BaseScript {
    *run(player) {
        yield this.p_aprange(2);

        yield this.chatnpc('chatcon1', `Good day, how may I help you?`);
        yield this.p_choice(`I'd like to access my bank account, please.`, `What is this place?`);

        if (this.choice == 1) {
            player.openBank();
            yield this.bank_visible();
        } else if (this.choice == 2) {
            yield this.chatplayer('chatcon1', `What is this place?`);
            yield this.chatnpc('chatcon1', `This is a branch of the Bank of Gielinor. We have`, `branches in many towns.`);
            yield this.chatplayer('chatcon1', `And what do you do?`);
            yield this.chatnpc('chatcon1', `We will look after your items and money for you.`, `Leave your valuables with us if you want to keep them`, `safe.`);
        }
    }
}

ScriptManager.register('APNPC1', { npcId: npcs.banker1 }, BankerTalk);
ScriptManager.register('APNPC1', { npcId: npcs.banker2 }, BankerTalk);
ScriptManager.register('APNPC1', { npcId: npcs.banker3 }, BankerTalk);
ScriptManager.register('APNPC1', { npcId: npcs.banker4 }, BankerTalk);
ScriptManager.register('APNPC1', { npcId: npcs.banker5 }, BankerTalk);
ScriptManager.register('APNPC1', { npcId: npcs.banker6 }, BankerTalk);
ScriptManager.register('APNPC1', { npcId: npcs.banker7 }, BankerTalk);
