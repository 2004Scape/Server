import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import World from '#lostcity/engine/World.js';
import ObjType from '#lostcity/cache/ObjType.js';
import Interaction from '#lostcity/entity/Interaction.js';
import ServerTriggerType from '#lostcity/engine/script/ServerTriggerType.js';
import { NetworkPlayer } from '#lostcity/entity/NetworkPlayer.js';
import OpPlayerU from '#lostcity/network/incoming/model/OpPlayerU.js';
import Component from '#lostcity/cache/Component.js';

export default class OpPlayerUHandler extends MessageHandler<OpPlayerU> {
    handle(message: OpPlayerU, player: NetworkPlayer): boolean {
        const { pid, useObj: item, useSlot: slot, useComponent: comId } = message;

        if (player.delayed()) {
            player.unsetMapFlag();
            return false;
        }

        const com = Component.get(comId);
        if (typeof com === 'undefined' || !player.isComponentVisible(com)) {
            return false;
        }

        const listener = player.invListeners.find(l => l.com === comId);
        if (!listener) {
            return false;
        }

        const inv = player.getInventoryFromListener(listener);
        if (!inv || !inv.validSlot(slot) || !inv.hasAt(slot, item)) {
            return false;
        }

        const other = World.getPlayer(pid);
        if (!other) {
            return false;
        }

        if (!player.players.has(player.uid)) {
            return false;
        }

        if (ObjType.get(item).members && !World.members) {
            player.messageGame("To use player item please login to a members' server.");
            return false;
        }

        player.lastUseSlot = slot;

        player.clearInteraction();
        player.closeModal();
        player.setInteraction(Interaction.ENGINE, other, ServerTriggerType.APPLAYERU, { type: item, com: -1 });
        player.opcalled = true;
        return true;
    }
}
