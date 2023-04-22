import World from '#engine/World.js';
import { Position } from '#util/Position.js';

function updateStep(player) {
    let dst = player.steps[player.step];
    let dir = Position.face(player.x, player.z, dst.x, dst.z);

    player.x = Position.moveX(player.x, dir);
    player.z = Position.moveZ(player.z, dir);

    if (dir == -1) {
        player.step--;

        if (player.step < player.steps.length - 1 && player.step != -1) {
            dir = updateStep(player);
        }
    }

    return dir;
}

export default class PlayerMovement {
    execute(player) {
        if (player.modalOpen) {
            player.walkDir = -1;
            player.runDir = -1;
            return;
        }

        if (!player.placement && player.step != -1 && player.step < player.steps.length) {
            player.walkDir = updateStep(player);

            if ((player.running || player.tempRunning) && player.step != -1 && player.step < player.steps.length) {
                player.runDir = updateStep(player);

                // run energy depletion
                let weightKg = Math.floor(player.weight / 1000);
                let clampWeight = Math.min(Math.max(weightKg, 0), 64);
                let loss = 67 + ((67 * clampWeight) / 64);

                let start = player.energy;
                player.energy -= loss;

                player.updateEnergy(start);
            } else {
                player.runDir = -1;
            }

            if (player.runDir != -1) {
                player.orientation = player.runDir;
            } else if (player.walkDir != -1) {
                player.orientation = player.walkDir;
            }
        } else {
            player.walkDir = -1;
            player.runDir = -1;
            player.steps = [];
            player.tempRunning = false;
        }
    }
}
