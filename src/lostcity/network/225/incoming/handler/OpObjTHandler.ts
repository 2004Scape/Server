import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import OpObjT from '#lostcity/network/incoming/model/OpObjT.js';
import Component from '#lostcity/cache/Component.js';
import Interaction from '#lostcity/entity/Interaction.js';
import ServerTriggerType from '#lostcity/engine/script/ServerTriggerType.js';
import World from '#lostcity/engine/World.js';
import { NetworkPlayer } from '#lostcity/entity/NetworkPlayer.js';

export default class OpObjTHandler extends MessageHandler<OpObjT> {
    handle(message: OpObjT, player: NetworkPlayer): boolean {
        const { x, z, obj: objId, spellComponent: spellComId } = message;

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

        const obj = World.getObj(x, z, player.level, objId);
        if (!obj) {
            return false;
        }

        player.clearInteraction();
        player.closeModal();
        player.setInteraction(Interaction.ENGINE, obj, ServerTriggerType.APOBJT, { type: obj.type, com: spellComId });
        player.opcalled = true;
        return true;
    }
}
