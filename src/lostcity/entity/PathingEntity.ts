import Entity from '#lostcity/entity/Entity.js';
import {Position} from '#lostcity/entity/Position.js';
import World from '#lostcity/engine/World.js';
import RouteCoordinates from '#rsmod/RouteCoordinates.js';
import Npc from '#lostcity/entity/Npc.js';
import { MoveRestrict } from '#lostcity/entity/MoveRestrict.js';
import CollisionFlag from '#rsmod/flag/CollisionFlag.js';

export default abstract class PathingEntity extends Entity {
    // constructor properties
    moveRestrict: MoveRestrict;

    // runtime properties
    walkDir = -1;
    walkStep = -1;
    walkQueue: { x: number, z: number }[] = [];
    forceMove = false;
    lastX = -1;
    lastZ = -1;

    protected constructor(level: number, x: number, z: number, width: number, length: number, moveRestrict: MoveRestrict) {
        super(level, x, z, width, length);
        this.moveRestrict = moveRestrict;
    }

    abstract updateMovement(): void;

    /**
     * Validates the advancing tile in our current steps.
     *
     * Deques to the next step if reached the end of current step,
     * then attempts to look for a possible second advancing tile,
     * validates and repeats.
     *
     * Moves this PathingEntity each time a step is validated.
     *
     * A PathingEntity can persist their current step for example if
     * blocked by another PathingEntity. Unless a PathingEntity does
     * a random walk again while still persisting their current step.
     *
     * Returns the final validated step direction.
     */
    validateAndAdvanceStep(): number {
        const { dir, persistStep } = this.takeStep();
        // if the next step is valid to take.
        if (dir != -1) {
            this.x = Position.moveX(this.x, dir);
            this.z = Position.moveZ(this.z, dir);
            return dir;
        }

        // this check allows npc to keep their current step
        // when they are blocked by something for example.
        if (persistStep) {
            return dir;
        }

        // deque for next step.
        this.walkStep--;
        if (this.walkStep < this.walkQueue.length - 1 && this.walkStep != -1) {
            return this.validateAndAdvanceStep();
        }
        return dir;
    }

    queueWalkStep(x: number, z: number): void {
        this.walkQueue = [];
        this.walkQueue.push({ x: x, z: z });
        this.walkQueue.reverse();
        this.walkStep = this.walkQueue.length - 1;
    }

    queueWalkSteps(steps: RouteCoordinates[]): void {
        this.walkQueue = [];
        for (const step of steps) {
            this.walkQueue.push({ x: step.x, z: step.z });
        }
        this.walkQueue.reverse();
        this.walkStep = this.walkQueue.length - 1;
    }

    hasSteps() {
        return this.walkStep !== -1 && this.walkStep < this.walkQueue.length;
    }

    private takeStep(): { dir: number; persistStep: boolean; } {
        // dir -1 is an invalid step.

        const isNpc = this instanceof Npc;

        // check if force moving.
        if (this.forceMove) {
            return { dir: -1, persistStep: isNpc };
        }

        const srcX = this.x;
        const srcZ = this.z;

        const dest = this.walkQueue[this.walkStep];
        const destX = dest.x;
        const destZ = dest.z;

        const dir = Position.face(srcX, srcZ, destX, destZ);

        const dx = Position.deltaX(dir);
        const dz = Position.deltaZ(dir);

        // check if moved off current pos.
        if (dx == 0 && dz == 0) {
            return { dir: -1, persistStep: isNpc };
        }

        // npc walking gets check for BLOCK_NPC flag.
        const extraFlag = isNpc ? CollisionFlag.BLOCK_NPC : CollisionFlag.OPEN;

        // check current direction if can travel to chosen dest.
        if (this.canTravelWithStrategy(dx, dz, extraFlag)) {
            return { dir: dir, persistStep: isNpc };
        }

        // check another direction if can travel to chosen dest on current z-axis.
        if (dx != 0 && this.canTravelWithStrategy(dx, 0, extraFlag)) {
            return { dir: Position.face(srcX, srcZ, destX, srcZ), persistStep: isNpc };
        }

        // check another direction if can travel to chosen dest on current x-axis.
        if (dz != 0 && this.canTravelWithStrategy(0, dz, extraFlag)) {
            return { dir: Position.face(srcX, srcZ, srcX, destZ), persistStep: isNpc };
        }

        return { dir: -1, persistStep: isNpc };
    }

    private canTravelWithStrategy(dx: number, dz: number, extraFlag: number): boolean {
        return World.collisionManager.canTravelWithStrategy(this.level, this.x, this.z, dx, dz, this.width, extraFlag, this.moveRestrict);
    }
}
