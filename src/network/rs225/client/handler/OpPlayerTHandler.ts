import MessageHandler from '#/network/client/handler/MessageHandler.js';
import OpPlayerT from '#/network/client/model/OpPlayerT.js';
import Component from '#/cache/config/Component.js';
import World from '#/engine/World.js';
import Interaction from '#/engine/entity/Interaction.js';
import ServerTriggerType from '#/engine/script/ServerTriggerType.js';
import { NetworkPlayer } from '#/engine/entity/NetworkPlayer.js';
import UnsetMapFlag from '#/network/server/model/UnsetMapFlag.js';

export default class OpPlayerTHandler extends MessageHandler<OpPlayerT> {
    handle(message: OpPlayerT, player: NetworkPlayer): boolean {
        const { pid, spellComponent: spellComId } = message;

        if (player.delayed()) {
            player.write(new UnsetMapFlag());
            return false;
        }

        const spellCom = Component.get(spellComId);
        if (typeof spellCom === 'undefined' || !player.isComponentVisible(spellCom)) {
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

        player.clearPendingAction();
        player.setInteraction(Interaction.ENGINE, other, ServerTriggerType.APPLAYERT, { type: -1, com: spellComId });
        player.opcalled = true;
        player.opucalled = true;
        return true;
    }
}
