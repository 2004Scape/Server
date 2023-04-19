import BaseScript from '#engine/Script.js';
import ScriptManager from '#engine/ScriptManager.js';

import npcs from '#cache/npcs.js';

class RomeoTalk extends BaseScript {
    *run(player) {
        yield this.chatnpc('chatcon1', `Juliet, Juliet, Juliet!  Wherefore Art thou?`);
        yield this.chatnpc('chatcon1', `Kind friend, have you seen Juliet?`);
        yield this.chatnpc('chatcon1', `She's disappeared and I can't find her anywhere.`);

        yield this.p_choice('Yes, I have seen her.', `No, but that's girls for you.`, 'Can I help find her for you?');

        if (this.choice == 1) {
            yield this.chatplayer('chatcon1', `Yes, I have seen her.`);
        } else if (this.choice == 2) {
            yield this.chatplayer('chatcon1', `No, but that's girls for you.`);
        } else if (this.choice == 3) {
            yield this.chatplayer('chatcon1', `Can I help find her for you?`);
            yield this.chatnpc('chatcon1', `Oh would you? That would be wonderful!`);
            yield this.chatnpc('chatcon1', `Please tell her I long to be with her.`);
            yield this.chatplayer('chatcon1', `Yes, I will tell her how you feel.`);
            yield this.chatnpc('chatcon1', `You are the saviour of my heart, thank you.`);
            yield this.chatplayer('chatcon1', `Err, yes. Ok. Thats... Nice.`);
        }
    }
}

ScriptManager.register('OPNPC1', { npcId: npcs.romeo }, RomeoTalk);
