import BaseScript from '#scripts/BaseScript.js';
import ScriptManager from '#scripts/ScriptManager.js';

import npcs from '#cache/npcs.js';

class ManTalk extends BaseScript {
    *run(player) {
        yield this.chatplayer('chatcon1', `Hello, how's it going?`);

        let branch = this.random(60);

        if (branch < 5) {
            yield this.chatnpc('chatcon1', `That is classified information.`);
        } else if (branch < 10) {
            yield this.chatnpc('chatcon1', `Yo, wassup!`);
        } else if (branch < 15) {
            yield this.chatnpc('chatcon1', `Who are you?`);
            yield this.chatplayer('chatcon1', `I'm a bold adventurer.`);
            yield this.chatnpc('chatcon1', `Ah, a very noble profession.`);
        } else if (branch < 20) {
            yield this.chatnpc('chatcon1', `I'm fine, how are you?`);
            yield this.chatplayer('chatcon1', `Very well thank you.`);
        } else if (branch < 25) {
            yield this.chatnpc('chatcon1', `Not too bad thanks.`);
        } else if (branch < 30) {
            yield this.chatnpc('chatcon1', `Hello there! Nice weather we've been having.`);
        } else if (branch < 35) {
            yield this.chatplayer('chatcon1', `Do you wish to trade?`);
            yield this.chatnpc('chatcon1', `No, I have nothing I wish to get rid of. If you want to`, `do some trading, there are plenty of shops and market`, `stalls around though.`);
        } else if (branch < 40) {
            yield this.chatnpc('chatcon1', `I'm very well thank you.`);
        } else {
            yield this.chatnpc('chatcon1', `How can I help you?`);
            yield this.p_choice(`Do you wish to trade?`, `I'm in search of a quest.`, `I'm in search of enemies to kill.`);

            if (this.choice == 1) {
                yield this.chatplayer('chatcon1', `Do you wish to trade?`);
                yield this.chatnpc('chatcon1', `No, I have nothing I wish to get rid of. If you want to`, `do some trading, there are plenty of shops and market`, `stalls around though.`);
            } else if (this.choice == 2) {
                yield this.chatplayer('chatcon1', `I'm in search of a quest.`);
                yield this.chatnpc('chatcon1', `I'm sorry I can't help you there.`);
            } else if (this.choice == 3) {
                yield this.chatplayer('chatcon1', `I'm in search of enemies to kill.`);
                yield this.chatnpc('chatcon1', `I've heard there are many fearsome creatures`, `that dwell under the ground...`);
            }
        }
    }
}

ScriptManager.register('OPNPC1', { npcId: npcs.man1 }, ManTalk);
ScriptManager.register('OPNPC1', { npcId: npcs.man2 }, ManTalk);
ScriptManager.register('OPNPC1', { npcId: npcs.man3 }, ManTalk);
ScriptManager.register('OPNPC1', { npcId: npcs.man4 }, ManTalk);
ScriptManager.register('OPNPC1', { npcId: npcs.man5 }, ManTalk);
ScriptManager.register('OPNPC1', { npcId: npcs.man6 }, ManTalk);
ScriptManager.register('OPNPC1', { npcId: npcs.man7 }, ManTalk);
ScriptManager.register('OPNPC1', { npcId: npcs.man8 }, ManTalk);
ScriptManager.register('OPNPC1', { npcId: npcs.man9 }, ManTalk);
ScriptManager.register('OPNPC1', { npcId: npcs.man10 }, ManTalk);
ScriptManager.register('OPNPC1', { npcId: npcs.man11 }, ManTalk);
ScriptManager.register('OPNPC1', { npcId: npcs.man12 }, ManTalk);
ScriptManager.register('OPNPC1', { npcId: npcs.man13 }, ManTalk);
