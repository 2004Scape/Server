import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import OpNpcU from '#lostcity/network/incoming/model/OpNpcU.js';
import Component from '#lostcity/cache/config/Component.js';
import World from '#lostcity/engine/World.js';
import ObjType from '#lostcity/cache/config/ObjType.js';
import Interaction from '#lostcity/entity/Interaction.js';
import ServerTriggerType from '#lostcity/engine/script/ServerTriggerType.js';
import { NetworkPlayer } from '#lostcity/entity/NetworkPlayer.js';
import Environment from '#lostcity/util/Environment.js';

export default class OpNpcUHandler extends MessageHandler<OpNpcU> {
    handle(message: OpNpcU, player: NetworkPlayer): boolean {
        const { nid, useObj: item, useSlot: slot, useComponent: comId } = message;

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

        const npc = World.getNpc(nid);
        if (!npc || npc.delayed()) {
            player.unsetMapFlag();
            return false;
        }

        if (!player.buildArea.npcs.has(npc.nid)) {
            player.unsetMapFlag();
            return false;
        }

        if (ObjType.get(item).members && !Environment.MEMBERS_WORLD) {
            player.messageGame("To use this item please login to a members' server.");
            player.unsetMapFlag();
            return false;
        }

        player.lastUseItem = item;
        player.lastUseSlot = slot;

        player.clearPendingAction();
        player.setInteraction(Interaction.ENGINE, npc, ServerTriggerType.APNPCU, { type: npc.type, com: -1 });
        player.opcalled = true;
        return true;
    }
}
