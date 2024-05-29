import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import OpPlayer from '#lostcity/network/incoming/model/OpPlayer.js';
import { NetworkPlayer } from '#lostcity/entity/NetworkPlayer.js';
import World from '#lostcity/engine/World.js';
import ServerTriggerType from '#lostcity/engine/script/ServerTriggerType.js';
import Interaction from '#lostcity/entity/Interaction.js';

export default class OpPlayerHandler extends MessageHandler<OpPlayer> {
    handle(message: OpPlayer, player: NetworkPlayer): boolean {
        const { pid } = message;

        if (player.delayed()) {
            player.unsetMapFlag();
            return false;
        }

        const other = World.getPlayer(pid);
        if (!other) {
            return false;
        }

        if (!player.players.has(other.uid)) {
            return false;
        }

        let mode: ServerTriggerType;
        if (message.op === 1) {
            mode = ServerTriggerType.APPLAYER1;
        } else if (message.op === 2) {
            mode = ServerTriggerType.APPLAYER2;
        } else if (message.op === 3) {
            mode = ServerTriggerType.APPLAYER3;
        } else {
            mode = ServerTriggerType.APPLAYER4;
        }

        player.clearInteraction();
        player.closeModal();
        player.setInteraction(Interaction.ENGINE, other, mode);
        player.opcalled = true;
        return true;
    }
}
