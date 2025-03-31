import * as rsbuf from '@2004scape/rsbuf';
import { ClientProtCategory, OpObjU } from '@2004scape/rsbuf';

import Component from '#/cache/config/Component.js';
import ObjType from '#/cache/config/ObjType.js';
import Interaction from '#/engine/entity/Interaction.js';
import { NetworkPlayer } from '#/engine/entity/NetworkPlayer.js';
import ServerTriggerType from '#/engine/script/ServerTriggerType.js';
import World from '#/engine/World.js';
import MessageHandler from '#/network/MessageHandler.js';
import Environment from '#/util/Environment.js';

export default class OpObjUHandler extends MessageHandler<OpObjU> {
    category: ClientProtCategory = ClientProtCategory.USER_EVENT;
    
    handle(message: OpObjU, player: NetworkPlayer): boolean {
        const { x, z, obj: objId, useObj: item, useSlot: slot, useComponent: comId } = message;

        if (player.delayed) {
            player.write(rsbuf.unsetMapFlag(player.pid));
            return false;
        }

        const com = Component.get(comId);
        if (typeof com === 'undefined' || !player.isComponentVisible(com)) {
            player.write(rsbuf.unsetMapFlag(player.pid));
            player.clearPendingAction();
            return false;
        }

        const absLeftX = player.originX - 52;
        const absRightX = player.originX + 52;
        const absTopZ = player.originZ + 52;
        const absBottomZ = player.originZ - 52;
        if (x < absLeftX || x > absRightX || z < absBottomZ || z > absTopZ) {
            player.write(rsbuf.unsetMapFlag(player.pid));
            player.clearPendingAction();
            return false;
        }

        const listener = player.invListeners.find(l => l.com === comId);
        if (!listener) {
            player.write(rsbuf.unsetMapFlag(player.pid));
            player.clearPendingAction();
            return false;
        }

        const inv = player.getInventoryFromListener(listener);
        if (!inv || !inv.validSlot(slot) || !inv.hasAt(slot, item)) {
            player.write(rsbuf.unsetMapFlag(player.pid));
            player.clearPendingAction();
            return false;
        }

        const obj = World.getObj(x, z, player.level, objId, player.hash64);
        if (!obj) {
            player.write(rsbuf.unsetMapFlag(player.pid));
            player.clearPendingAction();
            return false;
        }

        player.clearPendingAction();
        if (ObjType.get(item).members && !Environment.NODE_MEMBERS) {
            player.messageGame("To use this item please login to a members' server.");
            player.write(rsbuf.unsetMapFlag(player.pid));
            return false;
        }

        player.lastUseItem = item;
        player.lastUseSlot = slot;

        player.setInteraction(Interaction.ENGINE, obj, ServerTriggerType.APOBJU);
        player.opcalled = true;
        return true;
    }
}
