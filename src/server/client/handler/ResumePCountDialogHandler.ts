import { ClientProtCategory, ResumePCountDialog } from '@2004scape/rsbuf';

import Player from '#/engine/entity/Player.js';
import ScriptState from '#/engine/script/ScriptState.js';
import MessageHandler from '#/server/client/MessageHandler.js';

export default class ResumePCountDialogHandler extends MessageHandler<ResumePCountDialog> {
    category: ClientProtCategory = ClientProtCategory.USER_EVENT;
    
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
