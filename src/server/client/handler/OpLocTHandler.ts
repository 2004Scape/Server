import * as rsbuf from '@2004scape/rsbuf';
import { ClientProtCategory, OpLocT } from '@2004scape/rsbuf';

import Component, { ComActionTarget } from '#/cache/config/Component.js';
import Interaction from '#/engine/entity/Interaction.js';
import { NetworkPlayer } from '#/engine/entity/NetworkPlayer.js';
import ServerTriggerType from '#/engine/script/ServerTriggerType.js';
import World from '#/engine/World.js';
import MessageHandler from '#/server/client/MessageHandler.js';

export default class OpLocTHandler extends MessageHandler<OpLocT> {
    category: ClientProtCategory = ClientProtCategory.USER_EVENT;

    handle(message: OpLocT, player: NetworkPlayer): boolean {
        const { x, z, loc: locId, spell: spellComId } = message;

        if (player.delayed) {
            player.write(rsbuf.unsetMapFlag());
            return false;
        }

        const spellCom = Component.get(spellComId);
        if (typeof spellCom === 'undefined' || !player.isComponentVisible(spellCom) || (spellCom.actionTarget & ComActionTarget.LOC) === 0) {
            player.write(rsbuf.unsetMapFlag());
            player.clearPendingAction();
            return false;
        }

        const absLeftX = player.originX - 52;
        const absRightX = player.originX + 52;
        const absTopZ = player.originZ + 52;
        const absBottomZ = player.originZ - 52;
        if (x < absLeftX || x > absRightX || z < absBottomZ || z > absTopZ) {
            player.write(rsbuf.unsetMapFlag());
            player.clearPendingAction();
            return false;
        }

        const loc = World.getLoc(x, z, player.level, locId);
        if (!loc) {
            player.moveClickRequest = false;
            player.clearPendingAction();
            return false;
        }

        player.clearPendingAction();
        player.setInteraction(Interaction.ENGINE, loc, ServerTriggerType.APLOCT, spellComId);
        player.opcalled = true;
        return true;
    }
}
