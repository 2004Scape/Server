import * as rsbuf from '@2004scape/rsbuf';
import { ClientProtCategory, OpPlayerT } from '@2004scape/rsbuf';

import Component from '#/cache/config/Component.js';
import Interaction from '#/engine/entity/Interaction.js';
import { NetworkPlayer } from '#/engine/entity/NetworkPlayer.js';
import ServerTriggerType from '#/engine/script/ServerTriggerType.js';
import World from '#/engine/World.js';
import MessageHandler from '#/network/MessageHandler.js';

export default class OpPlayerTHandler extends MessageHandler<OpPlayerT> {
    category: ClientProtCategory = ClientProtCategory.USER_EVENT;
    
    handle(message: OpPlayerT, player: NetworkPlayer): boolean {
        const { pid, spell: spellComId } = message;

        if (player.delayed) {
            player.write(rsbuf.unsetMapFlag(player.pid));
            return false;
        }

        const spellCom = Component.get(spellComId);
        if (typeof spellCom === 'undefined' || !player.isComponentVisible(spellCom)) {
            player.write(rsbuf.unsetMapFlag(player.pid));
            player.clearPendingAction();
            return false;
        }

        const other = World.getPlayer(pid);
        if (!other) {
            player.write(rsbuf.unsetMapFlag(player.pid));
            player.clearPendingAction();
            return false;
        }

        if (!rsbuf.hasPlayer(player.pid, other.pid)) {
            player.write(rsbuf.unsetMapFlag(player.pid));
            player.clearPendingAction();
            return false;
        }

        player.clearPendingAction();
        player.setInteraction(Interaction.ENGINE, other, ServerTriggerType.APPLAYERT, spellComId);
        player.opcalled = true;
        return true;
    }
}
