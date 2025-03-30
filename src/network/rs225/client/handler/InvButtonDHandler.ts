import { ClientProtCategory, InvButtonD } from '@2004scape/rsbuf';

import Component from '#/cache/config/Component.js';
import Player from '#/engine/entity/Player.js';
import ScriptProvider from '#/engine/script/ScriptProvider.js';
import ScriptRunner from '#/engine/script/ScriptRunner.js';
import ServerTriggerType from '#/engine/script/ServerTriggerType.js';
import MessageHandler from '#/network/MessageHandler.js';
import UpdateInvPartial from '#/network/server/model/UpdateInvPartial.js';
import Environment from '#/util/Environment.js';

export default class InvButtonDHandler extends MessageHandler<InvButtonD> {
    category: ClientProtCategory = ClientProtCategory.USER_EVENT;
    
    handle(message: InvButtonD, player: Player): boolean {
        // jagex has if_buttond
        const { component: comId, slot, target } = message;

        const com = Component.get(comId);
        if (typeof com === 'undefined' || !player.isComponentVisible(com)) {
            return false;
        }

        const listener = player.invListeners.find(l => l.com === comId);
        if (!listener) {
            return false;
        }

        const inv = player.getInventoryFromListener(listener);
        if (!inv || !inv.validSlot(slot) || !inv.validSlot(target)) {
            return false;
        }

        if (player.delayed) {
            // do nothing; revert the client visual
            player.write(new UpdateInvPartial(comId, inv, slot, target));
            return false;
        }

        player.lastSlot = slot;
        player.lastTargetSlot = target;

        const dragTrigger = ScriptProvider.getByTrigger(ServerTriggerType.INV_BUTTOND, comId);
        if (dragTrigger) {
            const root = Component.get(com.rootLayer);

            player.executeScript(ScriptRunner.init(dragTrigger, player), !root.overlay);
        } else if (Environment.NODE_DEBUG) {
            player.messageGame(`No trigger for [inv_buttond,${com.comName}]`);
        }

        return true;
    }
}
