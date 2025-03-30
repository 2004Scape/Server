import { ClientProtCategory, ResumePauseButton } from '@2004scape/rsbuf';

import Component from '#/cache/config/Component.js';
import Player from '#/engine/entity/Player.js';
import ScriptState from '#/engine/script/ScriptState.js';
import MessageHandler from '#/network/MessageHandler.js';

export default class ResumePauseButtonHandler extends MessageHandler<ResumePauseButton> {
    category: ClientProtCategory = ClientProtCategory.USER_EVENT;

    handle(message: ResumePauseButton, player: Player): boolean {
        const com = Component.get(message.component);
        if (typeof com === 'undefined' || !player.isComponentVisible(com)) {
            return false;
        }
        
        if (!player.activeScript || player.activeScript.execution !== ScriptState.PAUSEBUTTON) {
            return false;
        }

        player.executeScript(player.activeScript, true, true);
        return true;
    }
}
