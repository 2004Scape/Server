import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import Player from '#lostcity/entity/Player.js';
import IfButton from '#lostcity/network/incoming/model/IfButton.js';
import Component from '#lostcity/cache/config/Component.js';
import ScriptProvider from '#lostcity/engine/script/ScriptProvider.js';
import ScriptRunner from '#lostcity/engine/script/ScriptRunner.js';
import Environment from '#lostcity/util/Environment.js';
import ServerTriggerType from '#lostcity/engine/script/ServerTriggerType.js';
import ScriptState from '#lostcity/engine/script/ScriptState.js';

export default class IfButtonHandler extends MessageHandler<IfButton> {
    handle(message: IfButton, player: Player): boolean {
        const { component: comId } = message;

        const com = Component.get(comId);
        if (typeof com === 'undefined' || !player.isComponentVisible(com)) {
            return false;
        }

        player.lastCom = comId;

        if (player.resumeButtons.indexOf(player.lastCom) !== -1) {
            if (player.activeScript && player.activeScript.execution === ScriptState.PAUSEBUTTON) {
                player.executeScript(player.activeScript, true, true);
            }
        } else {
            const root = Component.get(com.rootLayer);

            const script = ScriptProvider.getByTriggerSpecific(ServerTriggerType.IF_BUTTON, comId, -1);
            if (script) {
                player.executeScript(ScriptRunner.init(script, player), root.overlay == false);
            } else if (Environment.NODE_DEBUG) {
                player.messageGame(`No trigger for [if_button,${com.comName}]`);
            }
        }

        return true;
    }
}
