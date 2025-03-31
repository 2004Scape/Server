import * as rsbuf from '@2004scape/rsbuf';
import { ClientProtCategory, OpObj } from '@2004scape/rsbuf';

import ObjType from '#/cache/config/ObjType.js';
import Interaction from '#/engine/entity/Interaction.js';
import { NetworkPlayer } from '#/engine/entity/NetworkPlayer.js';
import ServerTriggerType from '#/engine/script/ServerTriggerType.js';
import World from '#/engine/World.js';
import MessageHandler from '#/network/MessageHandler.js';

export default class OpObjHandler extends MessageHandler<OpObj> {
    category: ClientProtCategory = ClientProtCategory.USER_EVENT;
    
    handle(message: OpObj, player: NetworkPlayer): boolean {
        const { op, x, z, obj: objId } = message;

        if (op < 1 || op > 5) {
            return false;
        }

        if (player.delayed) {
            player.write(rsbuf.unsetMapFlag(player.pid));
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
            player.moveClickRequest = false;
            player.clearPendingAction();
            return false;
        }

        const objType = ObjType.get(obj.type);
        // todo: validate all options
        if ((op === 1 && ((objType.op && !objType.op[0]) || !objType.op)) || (op === 4 && ((objType.op && !objType.op[3]) || !objType.op))) {
            player.write(rsbuf.unsetMapFlag(player.pid));
            player.clearPendingAction();
            return false;
        }

        let mode: ServerTriggerType;
        if (op === 1) {
            mode = ServerTriggerType.APOBJ1;
        } else if (op === 2) {
            mode = ServerTriggerType.APOBJ2;
        } else if (op === 3) {
            mode = ServerTriggerType.APOBJ3;
        } else if (op === 4) {
            mode = ServerTriggerType.APOBJ4;
        } else {
            mode = ServerTriggerType.APOBJ5;
        }

        player.clearPendingAction();
        player.setInteraction(Interaction.ENGINE, obj, mode);
        player.opcalled = true;
        return true;
    }
}
