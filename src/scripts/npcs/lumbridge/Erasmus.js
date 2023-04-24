import BaseScript from '#engine/Script.js';
import ScriptManager from '#engine/ScriptManager.js';

import npcs from '#cache/npcs.js';
import objs from '#cache/objs.js';

class ErasmusTalk extends BaseScript {
    *run(player) {
        yield this.chatnpc('happy', 'What a beautiful day it is!');

        yield this.p_choice(`Indeed!`, `Can I start over?`);

        if (this.choice == 1) {
            yield this.chatplayer('happy', `Indeed! It's amazing!`);
        } else if (this.choice == 2) {
            yield this.chatnpc('happy', `Sure, as long as you agree to a few terms first.`);

            yield this.mesbox('You listen to the old man...');
            yield this.mesbox('... all of your items will be donated to the bank of Erasmus ...');
            yield this.mesbox('... your collected knowledge will cease to exist ...');
            yield this.mesbox('... everyone will forget what you look like ...');

            yield this.p_choice(`Whoa, no thank you!`, `I understand. Proceed.`);

            if (this.choice == 1) {
                yield this.chatplayer('shock', `Whoa, no thank you!`);
                yield this.chatnpc('happy', `Good luck in your adventures.`);
            } else if (this.choice == 2) {
                yield this.chatplayer('default', `I understand. Proceed.`);

                yield this.mesbox('You feel a strange power come over you...');
                player.bank.removeAll();
                player.inv.removeAll();
                player.worn.removeAll();
                player.varps = new Uint32Array(300);
                player.energy = 10000;
                player.levels = [1, 1, 1, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
                player.exp = [0, 0, 0, 1154, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                yield this.mesbox('poof!');

                yield this.chatnpc('happy', `What do you want to look like?`);
                this.if_openmain(3559); // redesign player
            }
        }
    }
}

ScriptManager.register('OPNPC1', { npcId: npcs.erasmus }, ErasmusTalk);
