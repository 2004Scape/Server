import MessageHandler from '#/network/client/handler/MessageHandler.js';
import OpObjT from '#/network/client/model/OpObjT.js';
import Component from '#/cache/config/Component.js';
import Interaction from '#/engine/entity/Interaction.js';
import ServerTriggerType from '#/engine/script/ServerTriggerType.js';
import World from '#/engine/World.js';
import { NetworkPlayer } from '#/engine/entity/NetworkPlayer.js';
import UnsetMapFlag from '#/network/server/model/UnsetMapFlag.js';

export default class OpObjTHandler extends MessageHandler<OpObjT> {
    handle(message: OpObjT, player: NetworkPlayer): boolean {
        const { x, z, obj: objId, spellComponent: spellComId } = message;

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

        const obj = World.getObj(x, z, player.level, objId, player.pid);
        if (!obj) {
            player.write(new UnsetMapFlag());
            return false;
        }

        player.clearPendingAction();
        player.setInteraction(Interaction.ENGINE, obj, ServerTriggerType.APOBJT, { type: obj.type, com: spellComId });
        player.opcalled = true;
        player.opucalled = true;
        return true;
    }
}
