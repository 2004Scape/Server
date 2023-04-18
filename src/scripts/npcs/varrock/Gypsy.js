import BaseScript from '#scripts/BaseScript.js';
import ScriptManager from '#scripts/ScriptManager.js';

import npcs from '#cache/npcs.js';

class GypsyTalk extends BaseScript {
    *run(player) {
        yield this.chatnpc('chatcon1', `Greetings young one.`);
        yield this.chatnpc('chatcon1', `You're a hero now. That was a good bit of demonslaying.`);
        yield this.p_choice(`How do you know I killed it?`, `Thanks.`, `Stop calling me that!`);

        if (this.choice == 1) {
            yield this.chatplayer('chatcon1', `How do you know I killed it?`);
            yield this.chatnpc('chatcon1', `You forget. I'm good at knowing things.`);
        } else if (this.choice == 2) {
            yield this.chatplayer('chatcon1', `Thanks.`);
        } else if (this.choice == 3) {
            yield this.chatplayer('chatcon1', `Stop calling me that!`);
            yield this.chatnpc('chatcon1', `In the scheme of things you are very young.`);

            yield this.p_choice(`Ok but how old are you?`, `Oh if it's in the scheme of things that's ok.`);

            if (this.choice == 1) {
                yield this.chatplayer('chatcon1', `Ok but how old are you?`);
                yield this.chatnpc('chatcon1', `Count the number of legs on the stools in the Blue`, `Moon inn, and multiply that number by seven.`);
                yield this.chatplayer('chatcon1', `Er, yeah, whatever.`);
            } else if (this.choice == 2) {
                yield this.chatplayer('chatcon1', `Oh if it's in the scheme of things that's ok.`);
                yield this.chatnpc('chatcon1', `You show wisdom for one so young.`);
            }
        }
    }
}

ScriptManager.register('OPNPC1', { npcId: npcs.gypsy }, GypsyTalk);
