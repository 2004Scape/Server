import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import Player from '#lostcity/entity/Player.js';
import ScriptProvider from '#lostcity/engine/script/ScriptProvider.js';
import ServerTriggerType from '#lostcity/engine/script/ServerTriggerType.js';
import ScriptRunner from '#lostcity/engine/script/ScriptRunner.js';
import Environment from '#lostcity/util/Environment.js';
import Component from '#lostcity/cache/config/Component.js';
import OpHeldT from '#lostcity/network/incoming/model/OpHeldT.js';

export default class OpHeldTHandler extends MessageHandler<OpHeldT> {
    handle(message: OpHeldT, player: Player): boolean {
        const { obj: item, slot, component: comId, spellComponent: spellComId } = message;

        const com = Component.get(comId);
        if (typeof com === 'undefined' || !player.isComponentVisible(com)) {
            return false;
        }

        const spellCom = Component.get(comId);
        if (typeof spellCom === 'undefined' || !player.isComponentVisible(spellCom)) {
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

        player.clearInteraction();
        player.closeModal();

        const script = ScriptProvider.getByTrigger(ServerTriggerType.OPHELDT, spellComId, -1);
        if (script) {
            player.executeScript(ScriptRunner.init(script, player), true);
        } else {
            if (Environment.LOCAL_DEV) {
                player.messageGame(`No trigger for [opheldt,${spellCom.comName}]`);
            }

            // todo: is this appropriate?
            player.messageGame('Nothing interesting happens.');
        }

        return true;
    }
}
