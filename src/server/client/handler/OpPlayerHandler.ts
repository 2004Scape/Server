import * as rsbuf from '@2004scape/rsbuf';
import { ClientProtCategory, OpPlayer } from '@2004scape/rsbuf';

import Interaction from '#/engine/entity/Interaction.js';
import { NetworkPlayer } from '#/engine/entity/NetworkPlayer.js';
import ServerTriggerType from '#/engine/script/ServerTriggerType.js';
import World from '#/engine/World.js';
import MessageHandler from '#/server/client/MessageHandler.js';

export default class OpPlayerHandler extends MessageHandler<OpPlayer> {
    category = ClientProtCategory.USER_EVENT;
    
    handle(message: OpPlayer, player: NetworkPlayer): boolean {
        const { op, pid } = message;

        if (player.delayed) {
            player.write(rsbuf.unsetMapFlag());
            return false;
        }

        const other = World.getPlayer(pid);
        if (!other) {
            player.write(rsbuf.unsetMapFlag());
            player.clearPendingAction();
            return false;
        }

        if (!rsbuf.hasPlayer(player.pid, other.pid)) {
            player.write(rsbuf.unsetMapFlag());
            player.clearPendingAction();
            return false;
        }

        let mode: ServerTriggerType;
        if (op === 1) {
            mode = ServerTriggerType.APPLAYER1;
        } else if (op === 2) {
            mode = ServerTriggerType.APPLAYER2;
        } else if (op === 3) {
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
