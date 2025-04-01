import * as rsbuf from '@2004scape/rsbuf';
import { ClientProtCategory, OpPlayerU } from '@2004scape/rsbuf';

import Component from '#/cache/config/Component.js';
import ObjType from '#/cache/config/ObjType.js';
import Interaction from '#/engine/entity/Interaction.js';
import { NetworkPlayer } from '#/engine/entity/NetworkPlayer.js';
import ServerTriggerType from '#/engine/script/ServerTriggerType.js';
import World from '#/engine/World.js';
import MessageHandler from '#/server/client/MessageHandler.js';
import Environment from '#/util/Environment.js';

export default class OpPlayerUHandler extends MessageHandler<OpPlayerU> {
    category: ClientProtCategory = ClientProtCategory.USER_EVENT;

    handle(message: OpPlayerU, player: NetworkPlayer): boolean {
        const { pid, useObj: item, useSlot: slot, useComponent: comId } = message;

        if (player.delayed) {
            player.write(rsbuf.unsetMapFlag());
            return false;
        }

        const com = Component.get(comId);
        if (typeof com === 'undefined' || !player.isComponentVisible(com) || !com.interactable) {
            player.write(rsbuf.unsetMapFlag());
            player.clearPendingAction();
            return false;
        }

        const listener = player.invListeners.find(l => l.com === comId);
        if (!listener) {
            player.write(rsbuf.unsetMapFlag());
            player.clearPendingAction();
            return false;
        }

        const inv = player.getInventoryFromListener(listener);
        if (!inv || !inv.validSlot(slot) || !inv.hasAt(slot, item)) {
            player.write(rsbuf.unsetMapFlag());
            player.clearPendingAction();
            return false;
        }

        const other = World.getPlayer(pid);
        if (!other) {
            player.write(rsbuf.unsetMapFlag());
            player.clearPendingAction();
            return false;
        }

        if (!rsbuf.hasPlayer(player.pid, other.pid)) {
            player.write(rsbuf.unsetMapFlag());
            player.clearPendingAction();
            return false;
        }

        player.clearPendingAction();
        if (ObjType.get(item).members && !Environment.NODE_MEMBERS) {
            player.messageGame("To use this item please login to a members' server.");
            player.write(rsbuf.unsetMapFlag());
            return false;
        }

        player.lastUseSlot = slot;

        player.setInteraction(Interaction.ENGINE, other, ServerTriggerType.APPLAYERU, item);
        player.opcalled = true;
        return true;
    }
}
