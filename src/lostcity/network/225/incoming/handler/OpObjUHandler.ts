import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import OpObjU from '#lostcity/network/incoming/model/OpObjU.js';
import Component from '#lostcity/cache/Component.js';
import World from '#lostcity/engine/World.js';
import ObjType from '#lostcity/cache/ObjType.js';
import Interaction from '#lostcity/entity/Interaction.js';
import ServerTriggerType from '#lostcity/engine/script/ServerTriggerType.js';
import { NetworkPlayer } from '#lostcity/entity/NetworkPlayer.js';

export default class OpObjUHandler extends MessageHandler<OpObjU> {
    handle(message: OpObjU, player: NetworkPlayer): boolean {
        const { x, z, obj: objId, useObj: item, useSlot: slot, useComponent: comId } = message;

        if (player.delayed()) {
            player.unsetMapFlag();
            return false;
        }

        const com = Component.get(comId);
        if (typeof com === 'undefined' || !player.isComponentVisible(com)) {
            return false;
        }

        const absLeftX = player.loadedX - 52;
        const absRightX = player.loadedX + 52;
        const absTopZ = player.loadedZ + 52;
        const absBottomZ = player.loadedZ - 52;
        if (x < absLeftX || x > absRightX || z < absBottomZ || z > absTopZ) {
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

        const obj = World.getObj(x, z, player.level, objId);
        if (!obj) {
            return false;
        }

        if (ObjType.get(item).members && !World.members) {
            player.messageGame("To use player item please login to a members' server.");
            return false;
        }

        player.lastUseItem = item;
        player.lastUseSlot = slot;

        player.clearInteraction();
        player.closeModal();
        player.setInteraction(Interaction.ENGINE, obj, ServerTriggerType.APOBJU);
        player.opcalled = true;
        return true;
    }
}
