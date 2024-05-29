import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import MoveClick from '#lostcity/network/incoming/model/MoveClick.js';
import { NetworkPlayer } from '#lostcity/entity/NetworkPlayer.js';
import { Position } from '#lostcity/entity/Position.js';
import Environment from '#lostcity/util/Environment.js';
import VarPlayerType from '#lostcity/cache/VarPlayerType.js';

export default class MoveClickHandler extends MessageHandler<MoveClick> {
    handle(message: MoveClick, player: NetworkPlayer): boolean {
        const start = message.path[0];
        if (player.delayed() || message.ctrlHeld < 0 || message.ctrlHeld > 1 || Position.distanceToSW(player, { x: start.x, z: start.z }) > 104) {
            player.unsetMapFlag();
            player.userPath = [];
            return false;
        }

        if (Environment.CLIENT_PATHFINDER) {
            player.userPath = [];

            for (let i = 0; i < message.path.length; i++) {
                player.userPath[i] = Position.packCoord(player.level, message.path[i].x, message.path[i].z);
            }
        } else {
            const dest = message.path[message.path.length - 1];
            player.userPath = [Position.packCoord(player.level, dest.x, dest.z)];
        }

        if (!message.opClick) {
            player.clearInteraction();
            player.closeModal();
        }

        if (player.runenergy < 100) {
            player.setVar(VarPlayerType.getId('temp_run'), 0);
        } else {
            player.setVar(VarPlayerType.getId('temp_run'), message.ctrlHeld);
        }

        return true;
    }
}
