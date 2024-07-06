import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import Player from '#lostcity/entity/Player.js';
import OpHeldU from '#lostcity/network/incoming/model/OpHeldU.js';
import Component from '#lostcity/cache/config/Component.js';
import ObjType from '#lostcity/cache/config/ObjType.js';
import ScriptProvider from '#lostcity/engine/script/ScriptProvider.js';
import ServerTriggerType from '#lostcity/engine/script/ServerTriggerType.js';
import CategoryType from '#lostcity/cache/config/CategoryType.js';
import ScriptRunner from '#lostcity/engine/script/ScriptRunner.js';
import Environment from '#lostcity/util/Environment.js';

export default class OpHeldUHandler extends MessageHandler<OpHeldU> {
    handle(message: OpHeldU, player: Player): boolean {
        const { obj: item, slot, component: comId, useObj: useItem, useSlot, useComponent: useComId } = message;

        const com = Component.get(comId);
        if (typeof com === 'undefined' || !player.isComponentVisible(com)) {
            player.unsetMapFlag();
            return false;
        }

        const useCom = Component.get(comId);
        if (typeof useCom === 'undefined' || !player.isComponentVisible(useCom)) {
            player.unsetMapFlag();
            return false;
        }

        {
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
        }

        {
            const listener = player.invListeners.find(l => l.com === useComId);
            if (!listener) {
                player.unsetMapFlag();
                return false;
            }

            const inv = player.getInventoryFromListener(listener);
            if (!inv || !inv.validSlot(useSlot) || !inv.hasAt(useSlot, useItem)) {
                player.unsetMapFlag();
                return false;
            }
        }

        if (player.delayed()) {
            player.unsetMapFlag();
            return false;
        }

        player.lastItem = item;
        player.lastSlot = slot;
        player.lastUseItem = useItem;
        player.lastUseSlot = useSlot;

        const objType = ObjType.get(player.lastItem);
        const useObjType = ObjType.get(player.lastUseItem);

        if ((objType.members || useObjType.members) && !Environment.MEMBERS_WORLD) {
            player.messageGame("To use this item please login to a members' server.");
            player.unsetMapFlag();
            return false;
        }

        // [opheldu,b]
        let script = ScriptProvider.getByTriggerSpecific(ServerTriggerType.OPHELDU, objType.id, -1);

        // [opheldu,a]
        if (!script) {
            script = ScriptProvider.getByTriggerSpecific(ServerTriggerType.OPHELDU, useObjType.id, -1);
            [player.lastItem, player.lastUseItem] = [player.lastUseItem, player.lastItem];
            [player.lastSlot, player.lastUseSlot] = [player.lastUseSlot, player.lastSlot];
        }

        // [opheld,b_category]
        const objCategory = objType.category !== -1 ? CategoryType.get(objType.category) : null;
        if (!script && objCategory) {
            script = ScriptProvider.getByTriggerSpecific(ServerTriggerType.OPHELDU, -1, objCategory.id);
        }

        // [opheld,a_category]
        const useObjCategory = useObjType.category !== -1 ? CategoryType.get(useObjType.category) : null;
        if (!script && useObjCategory) {
            script = ScriptProvider.getByTriggerSpecific(ServerTriggerType.OPHELDU, -1, useObjCategory.id);
            [player.lastItem, player.lastUseItem] = [player.lastUseItem, player.lastItem];
            [player.lastSlot, player.lastUseSlot] = [player.lastUseSlot, player.lastSlot];
        }

        player.clearInteraction();
        player.closeModal();

        if (script) {
            player.executeScript(ScriptRunner.init(script, player), true);
        } else {
            if (Environment.LOCAL_DEV) {
                player.messageGame(`No trigger for [opheldu,${objType.debugname}]`);
            }

            // todo: is this appropriate?
            player.messageGame('Nothing interesting happens.');
        }

        return true;
    }
}
