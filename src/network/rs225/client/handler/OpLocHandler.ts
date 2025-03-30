import { ClientProtCategory, OpLoc } from '@2004scape/rsbuf';

import LocType from '#/cache/config/LocType.js';
import Interaction from '#/engine/entity/Interaction.js';
import { NetworkPlayer } from '#/engine/entity/NetworkPlayer.js';
import ServerTriggerType from '#/engine/script/ServerTriggerType.js';
import World from '#/engine/World.js';
import MessageHandler from '#/network/MessageHandler.js';
import UnsetMapFlag from '#/network/server/model/UnsetMapFlag.js';

export default class OpLocHandler extends MessageHandler<OpLoc> {
    category: ClientProtCategory = ClientProtCategory.USER_EVENT;
    
    handle(message: OpLoc, player: NetworkPlayer): boolean {
        const { op, x, z, loc: locId } = message;

        if (op < 1 || op > 5) {
            return false;
        }

        if (player.delayed) {
            player.write(new UnsetMapFlag());
            return false;
        }

        const absLeftX = player.originX - 52;
        const absRightX = player.originX + 52;
        const absTopZ = player.originZ + 52;
        const absBottomZ = player.originZ - 52;
        if (x < absLeftX || x > absRightX || z < absBottomZ || z > absTopZ) {
            player.write(new UnsetMapFlag());
            player.clearPendingAction();
            return false;
        }

        const loc = World.getLoc(x, z, player.level, locId);
        if (!loc) {
            player.write(new UnsetMapFlag());
            player.clearPendingAction();
            return false;
        }

        const locType = LocType.get(loc.type);
        if (!locType.op || !locType.op[op - 1]) {
            player.write(new UnsetMapFlag());
            player.clearPendingAction();
            return false;
        }

        let mode: ServerTriggerType;
        if (op === 1) {
            mode = ServerTriggerType.APLOC1;
        } else if (op === 2) {
            mode = ServerTriggerType.APLOC2;
        } else if (op === 3) {
            mode = ServerTriggerType.APLOC3;
        } else if (op === 4) {
            mode = ServerTriggerType.APLOC4;
        } else {
            mode = ServerTriggerType.APLOC5;
        }

        player.clearPendingAction();
        player.setInteraction(Interaction.ENGINE, loc, mode);
        player.opcalled = true;
        return true;
    }
}
