import MessageHandler from '#/network/incoming/handler/MessageHandler.js';
import Player from '#/engine/entity/Player.js';
import ScriptState from '#/engine/script/ScriptState.js';
import ResumePauseButton from '#/network/incoming/model/ResumePauseButton.js';

export default class ResumePauseButtonHandler extends MessageHandler<ResumePauseButton> {
    handle(_message: ResumePauseButton, player: Player): boolean {
        if (!player.activeScript || player.activeScript.execution !== ScriptState.PAUSEBUTTON) {
            return false;
        }

        player.executeScript(player.activeScript, true, true);
        return true;
    }
}
