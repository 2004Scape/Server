import * as rsbuf from '@2004scape/rsbuf';
import { ClientProtCategory, MoveClick } from '@2004scape/rsbuf';

import { CoordGrid } from '#/engine/CoordGrid.js';
import { NetworkPlayer } from '#/engine/entity/NetworkPlayer.js';
import MessageHandler from '#/server/client/MessageHandler.js';
import Environment from '#/util/Environment.js';
import WalkTriggerSetting from '#/util/WalkTriggerSetting.js';

export default class MoveClickHandler extends MessageHandler<MoveClick> {
    category: ClientProtCategory = ClientProtCategory.USER_EVENT;
    
    handle(message: MoveClick, player: NetworkPlayer): boolean {
        if (player.delayed) {
            player.write(rsbuf.unsetMapFlag());
            return false;
        }

        const { ctrl, op, path } = message;

        const start = CoordGrid.unpackCoord(path[0]);
        if (CoordGrid.distanceToSW(player, { x: start.x, z: start.z }) > 104) {
            player.unsetMapFlag();
            player.userPath = [];
            return false;
        }

        if (Environment.NODE_CLIENT_ROUTEFINDER) {
            if (path.length === 1 && start.x === player.x && start.z === player.z) {
                // this check ignores setting the path when the player is clicking on their current tile
                player.userPath = [];
            } else {
                player.userPath = [];

                for (let i = 0; i < path.length; i++) {
                    const coord = CoordGrid.unpackCoord(path[i]);
                    player.userPath[i] = CoordGrid.packCoord(player.level, coord.x, coord.z);
                }
            }
        } else {
            const dest = CoordGrid.unpackCoord(path[path.length - 1]);
            player.userPath = [CoordGrid.packCoord(player.level, dest.x, dest.z)];
        }
        if (Environment.NODE_WALKTRIGGER_SETTING === WalkTriggerSetting.PLAYERPACKET) {
            player.pathToMoveClick(player.userPath, !Environment.NODE_CLIENT_ROUTEFINDER);
        }
        if (!op) {
            player.clearPendingAction();
            if (player.runenergy < 100 && ctrl) {
                player.tempRun = 0;
            } else {
                player.tempRun = ctrl ? 1 : 0;
            }
            if (Environment.NODE_WALKTRIGGER_SETTING === WalkTriggerSetting.PLAYERPACKET && player.hasWaypoints()) {
                player.processWalktrigger();
            }
        }
        return true;
    }
}
