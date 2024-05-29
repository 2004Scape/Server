import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import NpcType from '#lostcity/cache/NpcType.js';
import ServerTriggerType from '#lostcity/engine/script/ServerTriggerType.js';
import Interaction from '#lostcity/entity/Interaction.js';
import World from '#lostcity/engine/World.js';
import { NetworkPlayer } from '#lostcity/entity/NetworkPlayer.js';
import OpNpc from '#lostcity/network/incoming/model/OpNpc.js';

export default class OpNpcHandler extends MessageHandler<OpNpc> {
    handle(message: OpNpc, player: NetworkPlayer): boolean {
        const { nid } = message;

        if (player.delayed()) {
            player.unsetMapFlag();
            return false;
        }

        const npc = World.getNpc(nid);
        if (!npc || npc.delayed()) {
            player.unsetMapFlag();
            return false;
        }

        if (!player.npcs.has(npc.nid)) {
            return false;
        }

        const npcType = NpcType.get(npc.type);
        if (!npcType.op || !npcType.op[message.op - 1]) {
            return false;
        }

        let mode: ServerTriggerType;
        if (message.op === 1) {
            mode = ServerTriggerType.APNPC1;
        } else if (message.op === 2) {
            mode = ServerTriggerType.APNPC2;
        } else if (message.op === 3) {
            mode = ServerTriggerType.APNPC3;
        } else if (message.op === 4) {
            mode = ServerTriggerType.APNPC4;
        } else {
            mode = ServerTriggerType.APNPC5;
        }

        player.clearInteraction();
        player.closeModal();
        player.setInteraction(Interaction.ENGINE, npc, mode, { type: npc.type, com: -1 });
        player.opcalled = true;
        return true;
    }
}
