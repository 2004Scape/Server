import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import OpPlayerT from '#lostcity/network/incoming/model/OpPlayerT.js';
import Component from '#lostcity/cache/Component.js';
import World from '#lostcity/engine/World.js';
import Interaction from '#lostcity/entity/Interaction.js';
import ServerTriggerType from '#lostcity/engine/script/ServerTriggerType.js';
import { NetworkPlayer } from '#lostcity/entity/NetworkPlayer.js';

export default class OpPlayerTHandler extends MessageHandler<OpPlayerT> {
    handle(message: OpPlayerT, player: NetworkPlayer): boolean {
        const { pid, spellComponent: spellComId } = message;

        if (player.delayed()) {
            player.unsetMapFlag();
            return false;
        }

        const spellCom = Component.get(spellComId);
        if (typeof spellCom === 'undefined' || !player.isComponentVisible(spellCom)) {
            return false;
        }

        const other = World.getPlayer(pid);
        if (!other) {
            return false;
        }

        if (!player.players.has(other.uid)) {
            return false;
        }

        player.clearInteraction();
        player.closeModal();
        player.setInteraction(Interaction.ENGINE, other, ServerTriggerType.APPLAYERT, { type: -1, com: spellComId });
        player.opcalled = true;
        return true;
    }
}
