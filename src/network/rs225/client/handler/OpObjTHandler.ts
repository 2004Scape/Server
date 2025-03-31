import * as rsbuf from '@2004scape/rsbuf';
import { ClientProtCategory, OpObjT } from '@2004scape/rsbuf';

import Component from '#/cache/config/Component.js';
import Interaction from '#/engine/entity/Interaction.js';
import { NetworkPlayer } from '#/engine/entity/NetworkPlayer.js';
import ServerTriggerType from '#/engine/script/ServerTriggerType.js';
import World from '#/engine/World.js';
import MessageHandler from '#/network/MessageHandler.js';

export default class OpObjTHandler extends MessageHandler<OpObjT> {
    category: ClientProtCategory = ClientProtCategory.USER_EVENT;
    
    handle(message: OpObjT, player: NetworkPlayer): boolean {
        const { x, z, obj: objId, spell: spellComId } = message;

        if (player.delayed) {
            player.write(rsbuf.unsetMapFlag(player.pid));
            return false;
        }

        const spellCom = Component.get(spellComId);
        if (typeof spellCom === 'undefined' || !player.isComponentVisible(spellCom)) {
            player.write(rsbuf.unsetMapFlag(player.pid));
            player.clearPendingAction();
            return false;
        }

        const absLeftX = player.originX - 52;
        const absRightX = player.originX + 52;
        const absTopZ = player.originZ + 52;
        const absBottomZ = player.originZ - 52;
        if (x < absLeftX || x > absRightX || z < absBottomZ || z > absTopZ) {
            player.write(rsbuf.unsetMapFlag(player.pid));
            player.clearPendingAction();
            return false;
        }

        const obj = World.getObj(x, z, player.level, objId, player.hash64);
        if (!obj) {
            player.write(rsbuf.unsetMapFlag(player.pid));
            player.clearPendingAction();
            return false;
        }

        player.clearPendingAction();
        player.setInteraction(Interaction.ENGINE, obj, ServerTriggerType.APOBJT, spellComId);
        player.opcalled = true;
        return true;
    }
}
