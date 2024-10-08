import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import MoveClick from '#lostcity/network/incoming/model/MoveClick.js';
import { NetworkPlayer } from '#lostcity/entity/NetworkPlayer.js';
import { CoordGrid } from '#lostcity/engine/CoordGrid.js';
import Environment from '#lostcity/util/Environment.js';
import VarPlayerType from '#lostcity/cache/config/VarPlayerType.js';
import UnsetMapFlag from '#lostcity/network/outgoing/model/UnsetMapFlag.js';

export default class MoveClickHandler extends MessageHandler<MoveClick> {
    handle(message: MoveClick, player: NetworkPlayer): boolean {
        if (player.delayed()) {
            player.write(new UnsetMapFlag());
            return false;
        }
        const start = message.path[0];
        if (message.ctrlHeld < 0 || message.ctrlHeld > 1 || CoordGrid.distanceToSW(player, { x: start.x, z: start.z }) > 104) {
            player.unsetMapFlag();
            player.userPath = [];
            return false;
        }

        if (Environment.NODE_CLIENT_ROUTEFINDER) {
            if (message.path.length === 1 && start.x === player.x && start.z === player.z) {
                // this check ignores setting the path when the player is clicking on their current tile
                player.userPath = [];
            } else {
                player.userPath = [];

                for (let i = 0; i < message.path.length; i++) {
                    player.userPath[i] = CoordGrid.packCoord(player.level, message.path[i].x, message.path[i].z);
                }
            }
        } else {
            const dest = message.path[message.path.length - 1];
            player.userPath = [CoordGrid.packCoord(player.level, dest.x, dest.z)];
        }
        player.interactWalkTrigger = false;
        if (!message.opClick) {
            player.clearInteraction();
            player.closeModal();
            if (player.runenergy < 100 && message.ctrlHeld === 1) {
                player.setVar(VarPlayerType.TEMP_RUN, 0);
            } else {
                player.setVar(VarPlayerType.TEMP_RUN, message.ctrlHeld);
            }
        }
        return true;
    }
}
