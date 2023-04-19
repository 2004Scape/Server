import BaseScript from '#engine/Script.js';
import ObjectType from '#cache/config/ObjectType.js';

export class LevelUpDialogue extends BaseScript {
    *run(player) {
        this.spotanim('levelup_anim');
        this.mes(this.params.unlock_text);

        // no specific function to handle this, so we'll just do it manually
        this.if_settext(this.params.unlock_inter_line1, this.params.unlock_text_line1);
        this.if_settext(this.params.unlock_inter_line2, this.params.unlock_text_line2);
        this.if_openbottom(this.params.unlock_inter);
        yield this.p_pausebutton();

        for (let i = 0; i < this.params.unlock_items.length; ++i) {
            let unlock = this.params.unlock_items[i];
            const item = ObjectType.get(unlock.item);

            // show "members can now make" on free worlds only: (item.members && !this.map_members())
            if (item.members && this.params.member_skill) {
                yield this.objbox(unlock.item, `Members can now make @dbl@${item.name.toLowerCase()}s@bla@.`);
            } else {
                yield this.objbox(unlock.item, `You can now make @dbl@${item.name.toLowerCase()}s@bla@.`);
            }
        }
    }
}
