import SceneBuilder from '#cache/SceneBuilder.js';
import { Npc } from '#engine/Npc.js';
import World from '#engine/World.js';
import { Position } from '#util/Position.js';

function updateStep(npc) {
    let dst = npc.steps[npc.step];
    let dir = Position.face(npc.x, npc.z, dst.x, dst.z);

    let newX = Position.moveX(npc.x, dir);
    let newZ = Position.moveZ(npc.z, dir);

    if (!SceneBuilder.canMoveTo(npc.x, npc.z, newX, newZ, npc.plane)) {
        npc.step--;
        return -1;
    }

    if (dir !== -1) {
        npc.x = newX;
        npc.z = newZ;
    } else {
        npc.step--;

        if (npc.step < npc.steps.length - 1 && npc.step != -1) {
            dir = updateStep(npc);
        }
    }

    return dir;
}

export default class NpcMovement {
    execute(npc) {
        let randomMoveChance = 0;
        if (npc.wander > 0 && (npc.step === -1 || npc.step < npc.steps.length)) {
            randomMoveChance = Math.random();
        }

        if (npc.target != null && npc.target.type == 'player') {
            let player = World.players[npc.target.index];
            let dx = Math.abs(npc.x - player.x);
            let dz = Math.abs(npc.z - player.z);

            if (dx <= 1 && dz <= 1 && !npc.target.facing) {
                npc.target.facing = true;
                npc.mask |= Npc.FACE_ENTITY;
                npc.faceEntity = player.pid + 32768;
            }

            if (player.target != null && player.target.type == 'npc' && player.target.index == npc.nid) {
                // being targeted
                return;
            } else {
                // no longer being targeted, check conditions (are they in range? do we have a new path?)
                if (dx >= 4 || dz >= 4) {
                    // the player is out of range
                    npc.target = null;
                    npc.mask |= Npc.FACE_ENTITY;
                    npc.faceEntity = -1;
                } else if (randomMoveChance > 0.3) {
                    // keep looking at the player until we have another path
                    return;
                } else {
                    // we have another path
                    npc.target = null;
                    npc.mask |= Npc.FACE_ENTITY;
                    npc.faceEntity = -1;
                }
            }
        }

        // random walk
        if (npc.wander > 0 && (npc.step === -1 || npc.step < npc.steps.length) && randomMoveChance <= 0.3) {
            let randomX = Math.floor((Math.random() * npc.wander) + -(Math.random() * npc.wander));
            let randomZ = Math.floor((Math.random() * npc.wander) + -(Math.random() * npc.wander));

            while (Math.abs((npc.x + randomX) - npc.startX) > npc.wander || Math.abs((npc.z + randomZ) - npc.startZ) > npc.wander) {
                randomX = Math.floor((Math.random() * npc.wander) + -(Math.random() * npc.wander));
                randomZ = Math.floor((Math.random() * npc.wander) + -(Math.random() * npc.wander));
            }

            npc.steps = [ { x: npc.x + randomX, z: npc.z + randomZ } ];
            npc.step = 0;
        }

        if (npc.step != -1 && npc.step < npc.steps.length) {
            npc.walkDir = updateStep(npc);
        }
    }
}
