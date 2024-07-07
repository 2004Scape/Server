import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import World from '#lostcity/engine/World.js';
import ObjType from '#lostcity/cache/config/ObjType.js';
import Interaction from '#lostcity/entity/Interaction.js';
import ServerTriggerType from '#lostcity/engine/script/ServerTriggerType.js';
import { NetworkPlayer } from '#lostcity/entity/NetworkPlayer.js';
import OpPlayerU from '#lostcity/network/incoming/model/OpPlayerU.js';
import Component from '#lostcity/cache/config/Component.js';
import Environment from '#lostcity/util/Environment.js';

export default class OpPlayerUHandler extends MessageHandler<OpPlayerU> {
    handle(message: OpPlayerU, player: NetworkPlayer): boolean {
        const { pid, useObj: item, useSlot: slot, useComponent: comId } = message;

        if (player.delayed()) {
            player.unsetMapFlag();
            return false;
        }

        const com = Component.get(comId);
        if (typeof com === 'undefined' || !player.isComponentVisible(com)) {
            player.unsetMapFlag();
            return false;
        }

        const listener = player.invListeners.find(l => l.com === comId);
        if (!listener) {
            player.unsetMapFlag();
            return false;
        }

        const inv = player.getInventoryFromListener(listener);
        if (!inv || !inv.validSlot(slot) || !inv.hasAt(slot, item)) {
            player.unsetMapFlag();
            return false;
        }

        const other = World.getPlayer(pid);
        if (!other) {
            player.unsetMapFlag();
            return false;
        }

        if (!player.buildArea.players.has(other.uid)) {
            player.unsetMapFlag();
            return false;
        }

        if (ObjType.get(item).members && !Environment.MEMBERS_WORLD) {
            player.messageGame("To use this item please login to a members' server.");
            player.unsetMapFlag();
            return false;
        }

        player.lastUseSlot = slot;

        player.clearPendingAction();
        player.setInteraction(Interaction.ENGINE, other, ServerTriggerType.APPLAYERU, { type: item, com: -1 });
        player.opcalled = true;
        return true;
    }
}
