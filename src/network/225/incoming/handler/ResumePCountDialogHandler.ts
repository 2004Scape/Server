import MessageHandler from '#/network/incoming/handler/MessageHandler.js';
import Player from '#/entity/Player.js';
import ScriptState from '#/engine/script/ScriptState.js';
import ResumePCountDialog from '#/network/incoming/model/ResumePCountDialog.js';

export default class ResumePCountDialogHandler extends MessageHandler<ResumePCountDialog> {
    handle(message: ResumePCountDialog, player: Player): boolean {
        const { input } = message;

        if (!player.activeScript || player.activeScript.execution !== ScriptState.COUNTDIALOG) {
            return false;
        }

        player.activeScript.lastInt = input;
        player.executeScript(player.activeScript, true, true);
        return true;
    }
}
