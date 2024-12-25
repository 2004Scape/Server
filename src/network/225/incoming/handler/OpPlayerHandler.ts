import MessageHandler from '#/network/incoming/handler/MessageHandler.js';
import OpPlayer from '#/network/incoming/model/OpPlayer.js';
import { NetworkPlayer } from '#/entity/NetworkPlayer.js';
import World from '#/engine/World.js';
import ServerTriggerType from '#/engine/script/ServerTriggerType.js';
import Interaction from '#/entity/Interaction.js';
import UnsetMapFlag from '#/network/outgoing/model/UnsetMapFlag.js';

export default class OpPlayerHandler extends MessageHandler<OpPlayer> {
    handle(message: OpPlayer, player: NetworkPlayer): boolean {
        const { pid } = message;

        if (player.delayed()) {
            player.write(new UnsetMapFlag());
            return false;
        }

        const other = World.getPlayer(pid);
        if (!other) {
            player.write(new UnsetMapFlag());
            return false;
        }

        if (!player.buildArea.players.has(other)) {
            player.write(new UnsetMapFlag());
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

        player.clearPendingAction();
        player.setInteraction(Interaction.ENGINE, other, mode);
        player.opcalled = true;
        return true;
    }
}
