import MessageHandler from '#/network/client/handler/MessageHandler.js';
import World from '#/engine/World.js';
import ObjType from '#/cache/config/ObjType.js';
import Interaction from '#/engine/entity/Interaction.js';
import ServerTriggerType from '#/engine/script/ServerTriggerType.js';
import { NetworkPlayer } from '#/engine/entity/NetworkPlayer.js';
import OpPlayerU from '#/network/client/model/OpPlayerU.js';
import Component from '#/cache/config/Component.js';
import Environment from '#/util/Environment.js';
import UnsetMapFlag from '#/network/server/model/UnsetMapFlag.js';

export default class OpPlayerUHandler extends MessageHandler<OpPlayerU> {
    handle(message: OpPlayerU, player: NetworkPlayer): boolean {
        const { pid, useObj: item, useSlot: slot, useComponent: comId } = message;

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

        const other = World.getPlayer(pid);
        if (!other) {
            player.write(new UnsetMapFlag());
            return false;
        }

        if (!player.buildArea.players.has(other)) {
            player.write(new UnsetMapFlag());
            return false;
        }

        player.clearPendingAction();
        if (ObjType.get(item).members && !Environment.NODE_MEMBERS) {
            player.messageGame("To use this item please login to a members' server.");
            player.write(new UnsetMapFlag());
            return false;
        }

        player.lastUseSlot = slot;

        player.setInteraction(Interaction.ENGINE, other, ServerTriggerType.APPLAYERU, { type: item, com: -1 });
        player.opcalled = true;
        player.opucalled = true;
        return true;
    }
}
