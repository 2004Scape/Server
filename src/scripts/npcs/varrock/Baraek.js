import BaseScript from '#engine/Script.js';
import ScriptManager from '#engine/ScriptManager.js';

import npcs from '#cache/npcs.js';
import objs from '#cache/objs.js';

class BaraekTalk extends BaseScript {
    *run(player) {
        yield this.p_choice(`Can you sell me some furs?`, `Hello. I am in search of a quest.`);

        if (this.choice == 1) {
            yield this.chatplayer('default', `Can you sell me some furs?`);
            yield this.chatnpc('default', `Yeah, sure. They're 20 gold coins each.`);

            yield this.p_choice(`Yeah, okay, here you go.`, `20 gold coins? That's an outrage!`);

            if (this.choice == 1) {
                yield this.chatplayer('default', `Yeah, OK, here you go.`);

                if (this.inv_total(player.inv, objs.coins2) >= 20) {
                    this.inv_del(player.inv, objs.coins2, 20);
                    this.inv_add(player.inv, objs.fur, 1);
                    yield this.objbox(objs.fur, `Baraek sells you a fur.`);
                } else {
                    yield this.chatplayer('default', `Oh dear, I don't have enough money!`);
                    yield this.chatnpc('default', `Well, my best price is 18 coins.`);

                    yield this.p_choice(`OK, here you go.`, `No thanks, I'll leave it.`);

                    if (this.choice == 1) {
                        yield this.chatplayer('default', `OK, here you go.`);

                        if (this.inv_total(player.inv, objs.coins2) >= 18) {
                            this.inv_del(player.inv, objs.coins2, 18);
                            this.inv_add(player.inv, objs.fur, 1);
                            yield this.objbox(objs.fur, `Baraek sells you a fur.`);
                        } else {
                            yield this.chatplayer('default', `Oh dear, I don't have that either.`);
                            yield this.chatnpc('default', `Well, I can't go any cheaper than that mate. I have a`, `family to feed.`);
                            yield this.chatplayer('default', `Oh well, never mind.`);
                        }
                    } else if (this.choice == 2) {
                        yield this.chatplayer('default', `No thanks, I'll leave it.`);
                        yield this.chatnpc('default', `It's your loss mate.`);
                    }
                }
            } else if (this.choice == 2) {
                yield this.chatplayer('default', `20 gold coins? That's an outrage!`);
                yield this.chatnpc('default', `Well, I can't go any cheaper than that mate. I have a`, `family to feed.`);
            }
        } else if (this.choice == 2) {
            yield this.chatplayer('default', `Hello! I am in search of a quest.`);
            yield this.chatnpc('default', `Sorry kiddo, I'm a fur trader nto a damsel in distress.`);
        }
    }
}

ScriptManager.register('OPNPC1', { npcId: npcs.baraek }, BaraekTalk);
