import Component from '#lostcity/cache/Component.js';
import ScriptProvider from '#lostcity/engine/script/ScriptProvider.js';
import ScriptRunner from '#lostcity/engine/script/ScriptRunner.js';
import ServerTriggerType from '#lostcity/engine/script/ServerTriggerType.js';
import Player from '#lostcity/entity/Player.js';
import InvButton from '#lostcity/network/incoming/model/InvButton.js';
import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import Environment from '#lostcity/util/Environment.js';

export default class InvButtonHandler extends MessageHandler<InvButton> {
    handle(message: InvButton, player: Player): boolean {
        // jagex has if_button1-5
        const { op, obj: item, slot, component: comId } = message;

        const com = Component.get(comId);
        if (typeof com === 'undefined' || !com.inventoryOptions || !com.inventoryOptions.length || !player.isComponentVisible(com)) {
            return false;
        }

        if (!com.inventoryOptions[op - 1]) {
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

        if (player.delayed()) {
            return false;
        }

        player.lastItem = item;
        player.lastSlot = slot;

        let trigger: ServerTriggerType;
        if (op === 1) {
            trigger = ServerTriggerType.INV_BUTTON1;
        } else if (op === 2) {
            trigger = ServerTriggerType.INV_BUTTON2;
        } else if (op === 3) {
            trigger = ServerTriggerType.INV_BUTTON3;
        } else if (op === 4) {
            trigger = ServerTriggerType.INV_BUTTON4;
        } else {
            trigger = ServerTriggerType.INV_BUTTON5;
        }

        const script = ScriptProvider.getByTrigger(trigger, comId, -1);
        if (script) {
            const root = Component.get(com.rootLayer);

            player.executeScript(ScriptRunner.init(script, player), root.overlay == false);
        } else {
            if (Environment.LOCAL_DEV) {
                player.messageGame(`No trigger for [${ServerTriggerType.toString(trigger)},${com.comName}]`);
            }
        }

        return true;
    }
}
