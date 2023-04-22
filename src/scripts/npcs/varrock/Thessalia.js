import BaseScript from '#engine/Script.js';
import ScriptManager from '#engine/ScriptManager.js';

import npcs from '#cache/npcs.js';

class ThessaliaTalk extends BaseScript {
    *run(player) {
        yield this.chatnpc('default', `Do you want to buy any fine clothes?`);
        yield this.p_choice(`What have you got?`, `No, thank you.`);

        if (this.choice == 1) {
            yield this.chatplayer('default', `What have you got?`);
            yield this.chatnpc('default', `Well, I have a number of fine pieces of clothing on sale`, `or, if you prefer, I can offer you an exclusive, total-`, `clothing makeover?`);

            yield this.p_choice(`Tell me more about this makeover.`, `I'd just like to buy some clothes.`, `No, thank you.`);

            if (this.choice == 1) {
                yield this.chatplayer('default', `Tell me more about this makeover.`);
                yield this.chatnpc('default', `Certainly!`);
                yield this.chatnpc('default', `Here at Thessalia's fine clothing boutique, we offer a`, `unique service where we will totally revamp your outfit`, `to your choosing.`);
                // yield this.chatnpc('default', `It's on the house, completely free! Tired of always`, `wearing the same old outfit, day in, day out? This is`, `the service for you!`); // OSRS
                yield this.chatnpc('default', `So what do you say? Interested? We can change either`, `your top or your legwear!`);

                yield this.p_choice(`I'd like to change my top please.`, `I'd like to change my legwear please.`, `I'd just like to buy some clothes.`, `No, thank you.`);

                if (this.choice == 1 || this.choice == 2) {
                    yield this.chatnpc('default', `Just select what style and colour you would like from`, `this catalogue.`);

                    if (this.choice == 1) {
                        player.gender == 0 ? this.if_openmain(2851) : this.if_openmain(3038);
                    } else if (this.choice == 2) {
                        player.gender == 0 ? this.if_openmain(0) : this.if_openmain(4731);
                    }
                } else if (this.choice == 4) {
                    yield this.chatplayer('default', `No, thank you.`);
                    yield this.chatnpc('default', `Well, please return if you change your mind.`);
                }
            } else if (this.choice == 2) {
                this.if_close();
            } else if (this.choice == 3) {
                yield this.chatplayer('default', `No, thank you.`);
                yield this.chatnpc('default', `Well, please return if you change your mind.`);
            }
        } else if (this.choice == 2) {
            yield this.chatplayer('default', `No, thank you.`);
            yield this.chatnpc('default', `Well, please return if you change your mind.`);
        }
    }
}

ScriptManager.register('OPNPC1', { npcId: npcs.thessalia }, ThessaliaTalk);

class ThessaliaDesignMaleTorso extends BaseScript {
    *run(player) {
        const { buttonId } = this.params;

        if (buttonId >= 3010 && buttonId <= 3016) {
            // player.tempBody = buttonId - 3010;
        } else if (buttonId >= 3017 && buttonId <= 3022) {
            // player.tempArms = buttonId - 3017;
        } else if (buttonId >= 2943 && buttonId <= 2958) {
            player.tempColor = buttonId - 2943;
        } else if (buttonId == 2959) {
            // TODO: replace arms and torso
            // let body = IdentityKitType.indexOf(x => x.type == IdentityKitType.BODYPART_MALE_TORSO);
            // let arms = IdentityKitType.indexOf(x => x.type == IdentityKitType.BODYPART_MALE_ARMS);
            // player.body[4] = player.tempBody + body;
            // player.body[6] = player.tempArms + arms;
            player.colors[1] = player.tempColor; // torso color
            player.generateAppearance();
            player.closeModal();
        }
    }
}

// body
for (let i = 3010; i <= 3016; i++) {
    ScriptManager.register('IF_BUTTON', { buttonId: i }, ThessaliaDesignMaleTorso);
}

// arms
for (let i = 3017; i <= 3022; i++) {
    ScriptManager.register('IF_BUTTON', { buttonId: i }, ThessaliaDesignMaleTorso);
}

// color + confirm
for (let i = 2943; i <= 2959; i++) {
    ScriptManager.register('IF_BUTTON', { buttonId: i }, ThessaliaDesignMaleTorso);
}
