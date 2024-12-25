import MessageHandler from '#/network/client/handler/MessageHandler.js';
import ObjType from '#/cache/config/ObjType.js';
import World from '#/engine/World.js';
import OpObj from '#/network/client/model/OpObj.js';
import ServerTriggerType from '#/engine/script/ServerTriggerType.js';
import Interaction from '#/engine/entity/Interaction.js';
import { NetworkPlayer } from '#/engine/entity/NetworkPlayer.js';
import UnsetMapFlag from '#/network/server/model/UnsetMapFlag.js';

export default class OpObjHandler extends MessageHandler<OpObj> {
    handle(message: OpObj, player: NetworkPlayer): boolean {
        const { x, z, obj: objId } = message;

        if (player.delayed()) {
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
            player.moveClickRequest = false;
            return false;
        }

        const objType = ObjType.get(obj.type);
        // todo: validate all options
        if ((message.op === 1 && ((objType.op && !objType.op[0]) || !objType.op)) || (message.op === 4 && ((objType.op && !objType.op[3]) || !objType.op))) {
            player.write(new UnsetMapFlag());
            return false;
        }

        let mode: ServerTriggerType;
        if (message.op === 1) {
            mode = ServerTriggerType.APOBJ1;
        } else if (message.op === 2) {
            mode = ServerTriggerType.APOBJ2;
        } else if (message.op === 3) {
            mode = ServerTriggerType.APOBJ3;
        } else if (message.op === 4) {
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
