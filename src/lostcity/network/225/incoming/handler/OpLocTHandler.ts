import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import { NetworkPlayer } from '#lostcity/entity/NetworkPlayer.js';
import Component from '#lostcity/cache/Component.js';
import OpLocT from '#lostcity/network/incoming/model/OpLocT.js';
import World from '#lostcity/engine/World.js';
import Interaction from '#lostcity/entity/Interaction.js';
import ServerTriggerType from '#lostcity/engine/script/ServerTriggerType.js';

export default class OpLocTHandler extends MessageHandler<OpLocT> {
    handle(message: OpLocT, player: NetworkPlayer): boolean {
        const { x, z, loc: locId, spellComponent: spellComId } = message;

        if (player.delayed()) {
            player.unsetMapFlag();
            return false;
        }

        const spellCom = Component.get(spellComId);
        if (typeof spellCom === 'undefined' || !player.isComponentVisible(spellCom)) {
            return false;
        }

        const absLeftX = player.loadedX - 52;
        const absRightX = player.loadedX + 52;
        const absTopZ = player.loadedZ + 52;
        const absBottomZ = player.loadedZ - 52;
        if (x < absLeftX || x > absRightX || z < absBottomZ || z > absTopZ) {
            return false;
        }

        const loc = World.getLoc(x, z, player.level, locId);
        if (!loc) {
            return false;
        }

        player.clearInteraction();
        player.closeModal();
        player.setInteraction(Interaction.ENGINE, loc, ServerTriggerType.APLOCT, { type: loc.type, com: spellComId });
        player.opcalled = true;
        return true;
    }
}
