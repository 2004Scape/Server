import MessageHandler from '#/network/client/handler/MessageHandler.js';
import OpNpcU from '#/network/client/model/OpNpcU.js';
import Component from '#/cache/config/Component.js';
import World from '#/engine/World.js';
import ObjType from '#/cache/config/ObjType.js';
import Interaction from '#/engine/entity/Interaction.js';
import ServerTriggerType from '#/engine/script/ServerTriggerType.js';
import { NetworkPlayer } from '#/engine/entity/NetworkPlayer.js';
import Environment from '#/util/Environment.js';
import UnsetMapFlag from '#/network/server/model/UnsetMapFlag.js';

export default class OpNpcUHandler extends MessageHandler<OpNpcU> {
    handle(message: OpNpcU, player: NetworkPlayer): boolean {
        const { nid, useObj: item, useSlot: slot, useComponent: comId } = message;

        if (player.delayed()) {
            player.write(new UnsetMapFlag());
            return false;
        }

        const com = Component.get(comId);
        if (typeof com === 'undefined' || !player.isComponentVisible(com)) {
            player.write(new UnsetMapFlag());
            return false;
        }

        const listener = player.invListeners.find(l => l.com === comId);
        if (!listener) {
            player.write(new UnsetMapFlag());
            return false;
        }

        const inv = player.getInventoryFromListener(listener);
        if (!inv || !inv.validSlot(slot) || !inv.hasAt(slot, item)) {
            player.write(new UnsetMapFlag());
            return false;
        }

        const npc = World.getNpc(nid);
        if (!npc || npc.delayed()) {
            player.write(new UnsetMapFlag());
            return false;
        }

        if (!player.buildArea.npcs.has(npc)) {
            player.write(new UnsetMapFlag());
            return false;
        }

        player.clearPendingAction();
        if (ObjType.get(item).members && !Environment.NODE_MEMBERS) {
            player.messageGame("To use this item please login to a members' server.");
            player.write(new UnsetMapFlag());
            return false;
        }

        player.lastUseItem = item;
        player.lastUseSlot = slot;

        player.setInteraction(Interaction.ENGINE, npc, ServerTriggerType.APNPCU, { type: npc.type, com: -1 });
        player.opcalled = true;
        player.opucalled = true;
        return true;
    }
}
