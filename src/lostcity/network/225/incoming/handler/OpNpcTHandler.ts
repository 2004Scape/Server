import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import Component from '#lostcity/cache/config/Component.js';
import OpNpcT from '#lostcity/network/incoming/model/OpNpcT.js';
import World from '#lostcity/engine/World.js';
import Interaction from '#lostcity/entity/Interaction.js';
import ServerTriggerType from '#lostcity/engine/script/ServerTriggerType.js';
import { NetworkPlayer } from '#lostcity/entity/NetworkPlayer.js';
import UnsetMapFlag from '#lostcity/network/outgoing/model/UnsetMapFlag.js';

export default class OpNpcTHandler extends MessageHandler<OpNpcT> {
    handle(message: OpNpcT, player: NetworkPlayer): boolean {
        const { nid, spellComponent: spellComId } = message;

        if (player.delayed()) {
            player.write(new UnsetMapFlag());
            return false;
        }

        const spellCom = Component.get(spellComId);
        if (typeof spellCom === 'undefined' || !player.isComponentVisible(spellCom)) {
            player.write(new UnsetMapFlag());
            return false;
        }

        const npc = World.getNpc(nid);
        if (!npc || npc.delayed()) {
            player.write(new UnsetMapFlag());
            return false;
        }

        if (!player.buildArea.npcs.has(npc)) {
            player.write(new UnsetMapFlag());
            return false;
        }

        player.clearPendingAction();
        player.setInteraction(Interaction.ENGINE, npc, ServerTriggerType.APNPCT, { type: npc.type, com: spellComId });
        player.opcalled = true;
        player.opucalled = true;
        return true;
    }
}
