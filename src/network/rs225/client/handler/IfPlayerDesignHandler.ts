import { ClientProtCategory, IfPlayerDesign } from '@2004scape/rsbuf';

import IdkType from '#/cache/config/IdkType.js';
import InvType from '#/cache/config/InvType.js';
import Player from '#/engine/entity/Player.js';
import MessageHandler from '#/network/MessageHandler.js';

export default class IfPlayerDesignHandler extends MessageHandler<IfPlayerDesign> {
    category: ClientProtCategory = ClientProtCategory.USER_EVENT;
    
    handle(message: IfPlayerDesign, player: Player): boolean {
        const { gender, idkit, color } = message;

        if (!player.allowDesign) {
            return false;
        }

        if (gender > 1) {
            return false;
        }

        let pass = true;
        for (let i = 0; i < 7; i++) {
            let type = i;
            if (gender === 1) {
                type += 7;
            }

            if (type == 8 && idkit[i] === -1) {
                // female jaw is an exception
                continue;
            }

            const idk = IdkType.get(idkit[i]);
            if (!idk || idk.disable || idk.type != type) {
                pass = false;
                break;
            }
        }

        if (!pass) {
            return false;
        }

        for (let i = 0; i < 5; i++) {
            if (color[i] >= Player.DESIGN_BODY_COLORS[i].length) {
                pass = false;
                break;
            }
        }

        if (!pass) {
            return false;
        }

        player.gender = gender;
        player.body = idkit;
        player.colors = color;
        player.buildAppearance(InvType.WORN);
        return true;
    }
}
