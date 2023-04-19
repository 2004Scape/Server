import BaseScript from '#engine/Script.js';
import ScriptManager from '#engine/ScriptManager.js';

import npcs from '#cache/npcs.js';
import objs from '#cache/objs.js';

class HansTalk extends BaseScript {
    *run(player) {
        yield this.chatnpc('chatcon1', `Hello there player!`);
        yield this.chatnpc('chatcon1', `Don't be alarmed, I've been gifted special powers`, `to see into the next plane.`);

        if (!player.streamer) {
            yield this.chatnpc('chatcon1', `Let me guess. You want to hide some of your`, `personal details when you log in again?`);

            yield this.p_choice(`Yes! How did you know?`, `Err, no, I just wanted to see what you would say.`);
            if (this.choice == 1) {
                yield this.chatnpc('chatcon1', `I told you that already.`);
                player.streamer = true;
                yield this.chatnpc('chatcon1', `I've gone ahead and put your personal details away`, `somewhere very safe.`);
            } else if (this.choice == 2) {
                yield this.chatnpc('chatcon1', `I've got important business to attend to.`, `These castle grounds won't walk themselves!`);
            }
        } else {
            yield this.chatnpc('chatcon1', `I can see that you're a streamer, so I won't bother you`, `with my usual spiel.`);

            yield this.p_choice(`Can you bring my personal details back?`, `Err, no, I just wanted to see what you would say.`);
            if (this.choice == 1) {
                player.streamer = false;
                yield this.chatnpc('chatcon1', `One... two... three... poof. There you go.`);
            } else if (this.choice == 2) {
                yield this.chatnpc('chatcon1', `I've got important business to attend to.`, `These castle grounds won't walk themselves!`);
            }
        }
    }
}

ScriptManager.register('OPNPC1', { npcId: npcs.hans }, HansTalk);
