import BaseScript from '#engine/Script.js';
import ScriptManager from '#engine/ScriptManager.js';

import npcs from '#cache/npcs.js';

class GypsyTalk extends BaseScript {
    *run(player) {
        yield this.chatnpc('default', `Greetings young one.`);
        yield this.chatnpc('default', `You're a hero now. That was a good bit of demonslaying.`);
        yield this.p_choice(`How do you know I killed it?`, `Thanks.`, `Stop calling me that!`);

        if (this.choice == 1) {
            yield this.chatplayer('default', `How do you know I killed it?`);
            yield this.chatnpc('default', `You forget. I'm good at knowing things.`);
        } else if (this.choice == 2) {
            yield this.chatplayer('default', `Thanks.`);
        } else if (this.choice == 3) {
            yield this.chatplayer('default', `Stop calling me that!`);
            yield this.chatnpc('default', `In the scheme of things you are very young.`);

            yield this.p_choice(`Ok but how old are you?`, `Oh if it's in the scheme of things that's ok.`);

            if (this.choice == 1) {
                yield this.chatplayer('default', `Ok but how old are you?`);
                yield this.chatnpc('default', `Count the number of legs on the stools in the Blue`, `Moon inn, and multiply that number by seven.`);
                yield this.chatplayer('default', `Er, yeah, whatever.`);
            } else if (this.choice == 2) {
                yield this.chatplayer('default', `Oh if it's in the scheme of things that's ok.`);
                yield this.chatnpc('default', `You show wisdom for one so young.`);
            }
        }
    }
}

ScriptManager.register('OPNPC1', { npcId: npcs.gypsy }, GypsyTalk);
