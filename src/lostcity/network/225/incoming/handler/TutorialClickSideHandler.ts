import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import Player from '#lostcity/entity/Player.js';
import TutorialClickSide from '#lostcity/network/incoming/model/TutorialClickSide.js';
import ScriptProvider from '#lostcity/engine/script/ScriptProvider.js';
import ServerTriggerType from '#lostcity/engine/script/ServerTriggerType.js';
import ScriptRunner from '#lostcity/engine/script/ScriptRunner.js';

export default class TutorialClickSideHandler extends MessageHandler<TutorialClickSide> {
    handle(message: TutorialClickSide, player: Player): boolean {
        const { tab } = message;

        if (tab < 0 || tab > 13) {
            return false;
        }

        const script = ScriptProvider.getByTriggerSpecific(ServerTriggerType.TUTORIAL, -1, -1);
        if (script) {
            player.executeScript(ScriptRunner.init(script, player), true);
        }

        return true;
    }
}
