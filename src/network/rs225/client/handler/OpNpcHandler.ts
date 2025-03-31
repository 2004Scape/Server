import * as rsbuf from '@2004scape/rsbuf';
import { ClientProtCategory, OpNpc } from '@2004scape/rsbuf';

import NpcType from '#/cache/config/NpcType.js';
import Interaction from '#/engine/entity/Interaction.js';
import { NetworkPlayer } from '#/engine/entity/NetworkPlayer.js';
import ServerTriggerType from '#/engine/script/ServerTriggerType.js';
import World from '#/engine/World.js';
import MessageHandler from '#/network/MessageHandler.js';

export default class OpNpcHandler extends MessageHandler<OpNpc> {
    category: ClientProtCategory = ClientProtCategory.USER_EVENT;
    
    handle(message: OpNpc, player: NetworkPlayer): boolean {
        const { op, nid } = message;

        if (op < 1 || op > 5) {
            return false;
        }

        if (player.delayed) {
            player.write(rsbuf.unsetMapFlag(player.pid));
            return false;
        }

        const npc = World.getNpc(nid);
        if (!npc || npc.delayed) {
            player.write(rsbuf.unsetMapFlag(player.pid));
            player.clearPendingAction();
            return false;
        }

        if (!rsbuf.hasNpc(player.pid, npc.nid)) {
            player.write(rsbuf.unsetMapFlag(player.pid));
            player.clearPendingAction();
            return false;
        }

        const npcType = NpcType.get(npc.type);
        if (!npcType.op || !npcType.op[op - 1]) {
            player.write(rsbuf.unsetMapFlag(player.pid));
            player.clearPendingAction();
            return false;
        }

        let mode: ServerTriggerType;
        if (op === 1) {
            mode = ServerTriggerType.APNPC1;
        } else if (op === 2) {
            mode = ServerTriggerType.APNPC2;
        } else if (op === 3) {
            mode = ServerTriggerType.APNPC3;
        } else if (op === 4) {
            mode = ServerTriggerType.APNPC4;
        } else {
            mode = ServerTriggerType.APNPC5;
        }

        player.clearPendingAction();
        player.setInteraction(Interaction.ENGINE, npc, mode);
        player.opcalled = true;
        return true;
    }
}
