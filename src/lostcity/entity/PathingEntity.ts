import Entity from '#lostcity/entity/Entity.js';
import {Position} from '#lostcity/entity/Position.js';
import World from '#lostcity/engine/World.js';
import RouteCoordinates from '#rsmod/RouteCoordinates.js';
import Npc from '#lostcity/entity/Npc.js';

export default abstract class PathingEntity extends Entity {
    // movement
    walkDir = -1;
    walkStep = -1;
    walkQueue: { x: number, z: number }[] = [];

    abstract updateMovement(): void;

    updateMovementStep(): number {
        const dst = this.walkQueue[this.walkStep];
        let dir = Position.face(this.x, this.z, dst.x, dst.z);

        const dx = Position.deltaX(dir);
        const dz = Position.deltaZ(dir);

        const validated = (dx != 0 || dz != 0) && World.gameMap.collisionManager.evaluateWalkStep(this.level, this.x, this.z, dx, dz, this.size, this instanceof Npc);

        if (validated) {
            this.x = Position.moveX(this.x, dir);
            this.z = Position.moveZ(this.z, dir);
        } else {
            dir = -1;
        }

        if (dir == -1) {
            this.walkStep--;

            if (this.walkStep < this.walkQueue.length - 1 && this.walkStep != -1) {
                dir = this.updateMovementStep();
            }
        }

        return dir;
    }

    queueWalkWaypoint(x: number, z: number): void {
        this.walkQueue = [];
        this.walkQueue.push({ x: x, z: z });
        this.walkQueue.reverse();
        this.walkStep = this.walkQueue.length - 1;
    }

    queueWalkWaypoints(waypoints: RouteCoordinates[]): void {
        this.walkQueue = [];
        for (const waypoint of waypoints) {
            this.walkQueue.push({ x: waypoint.x, z: waypoint.z });
        }
        this.walkQueue.reverse();
        this.walkStep = this.walkQueue.length - 1;
    }

    hasSteps() {
        return this.walkStep - 1 >= 0;
    }
}
