import MessageHandler from '#/network/client/handler/MessageHandler.js';
import { NetworkPlayer } from '#/engine/entity/NetworkPlayer.js';
import Component from '#/cache/config/Component.js';
import OpLocT from '#/network/client/model/OpLocT.js';
import World from '#/engine/World.js';
import Interaction from '#/engine/entity/Interaction.js';
import ServerTriggerType from '#/engine/script/ServerTriggerType.js';
import UnsetMapFlag from '#/network/server/model/UnsetMapFlag.js';

export default class OpLocTHandler extends MessageHandler<OpLocT> {
    handle(message: OpLocT, player: NetworkPlayer): boolean {
        const { x, z, loc: locId, spellComponent: spellComId } = message;

        if (player.delayed()) {
            player.write(new UnsetMapFlag());
            return false;
        }

        const spellCom = Component.get(spellComId);
        if (typeof spellCom === 'undefined' || !player.isComponentVisible(spellCom)) {
            player.write(new UnsetMapFlag());
            return false;
        }

        const absLeftX = player.originX - 52;
        const absRightX = player.originX + 52;
        const absTopZ = player.originZ + 52;
        const absBottomZ = player.originZ - 52;
        if (x < absLeftX || x > absRightX || z < absBottomZ || z > absTopZ) {
            player.write(new UnsetMapFlag());
            return false;
        }

        const loc = World.getLoc(x, z, player.level, locId);
        if (!loc) {
            player.moveClickRequest = false;
            return false;
        }

        player.clearPendingAction();
        player.setInteraction(Interaction.ENGINE, loc, ServerTriggerType.APLOCT, { type: loc.type, com: spellComId });
        player.opcalled = true;
        return true;
    }
}
