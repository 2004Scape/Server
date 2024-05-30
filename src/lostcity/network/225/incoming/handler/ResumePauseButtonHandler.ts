import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import Player from '#lostcity/entity/Player.js';
import ScriptState from '#lostcity/engine/script/ScriptState.js';
import ResumePauseButton from '#lostcity/network/incoming/model/ResumePauseButton.js';

export default class ResumePauseButtonHandler extends MessageHandler<ResumePauseButton> {
    handle(_message: ResumePauseButton, player: Player): boolean {
        if (!player.activeScript || player.activeScript.execution !== ScriptState.PAUSEBUTTON) {
            return false;
        }

        player.executeScript(player.activeScript, true);
        return true;
    }
}
