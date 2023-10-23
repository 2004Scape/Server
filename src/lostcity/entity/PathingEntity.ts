import Entity from '#lostcity/entity/Entity.js';
import {Direction, Position} from '#lostcity/entity/Position.js';
import World from '#lostcity/engine/World.js';
import RouteCoordinates from '#rsmod/RouteCoordinates.js';
import Npc from '#lostcity/entity/Npc.js';
import MoveRestrict from '#lostcity/entity/MoveRestrict.js';
import CollisionFlag from '#rsmod/flag/CollisionFlag.js';
import Player from '#lostcity/entity/Player.js';
import {Interaction} from '#lostcity/entity/Interaction.js';
import ReachStrategy from '#rsmod/reach/ReachStrategy.js';
import Loc from '#lostcity/entity/Loc.js';
import LocType from '#lostcity/cache/LocType.js';

export default abstract class PathingEntity extends Entity {
    // constructor properties
    moveRestrict: MoveRestrict;

    // runtime properties
    walkDir: number = -1;
    runDir: number = -1;
    walkStep: number = -1;
    walkQueue: { x: number, z: number }[] = [];
    lastX: number = -1;
    lastZ: number = -1;
    forceMove: boolean = false;
    tele: boolean = false;
    jump: boolean = false;

    orientation: number = Direction.SOUTH;

    exactStartX: number = -1;
    exactStartZ: number = -1;
    exactEndX: number = -1;
    exactEndZ: number = -1;
    exactMoveStart: number = -1;
    exactMoveEnd: number = -1;
    exactFaceDirection: number = -1;

    protected constructor(level: number, x: number, z: number, width: number, length: number, moveRestrict: MoveRestrict) {
        super(level, x, z, width, length);
        this.moveRestrict = moveRestrict;
        this.tele = true;
    }

    /**
     * Attempts to update movement for a PathingEntity.
     */
    abstract updateMovement(running: number): void;

    /**
     * Process movement function for a PathingEntity to use.
     * Checks for if this PathingEntity has any steps to take to move.
     * Handles force movement. Validates and moves depending on if this
     * PathingEntity is walking or running only.
     * Applies an orientation update to this PathingEntity if a step
     * direction was taken.
     * Updates this PathingEntity zone presence if moved.
     * @param running
     * Returns false is this PathingEntity has no steps to take.
     * Returns true if a step was taken and movement processed.
     */
    processMovement(running: number): boolean {
        if (!this.hasSteps()) {
            this.walkStep = -1;
            this.walkQueue = [];
            this.forceMove = false;
            return false;
        }

        const previousX = this.x;
        const previousZ = this.z;
        const previousLevel = this.level;

        if (this.forceMove) {
            if (this.walkDir !== -1 && this.runDir === -1) {
                this.runDir = this.validateAndAdvanceStep();
            } else if (this.walkDir === -1) {
                this.walkDir = this.validateAndAdvanceStep();
            } else {
                this.validateAndAdvanceStep();
            }
        } else {
            if (this.walkDir === -1) {
                this.walkDir = this.validateAndAdvanceStep();
            }

            if (this.walkDir !== -1 && this.runDir === -1 && running === 1) {
                this.runDir = this.validateAndAdvanceStep();
            }
        }

        // keeps this pathing entity orientation updated as they move around the map.
        // important for like when you login you see all entities correct dir.
        if (this.runDir !== -1) {
            this.orientation = this.runDir;
        } else if (this.walkDir !== -1) {
            this.orientation = this.walkDir;
        }

        this.refreshZonePresence(previousX, previousZ, previousLevel);
        return true;
    }

    /**
     * Zone presence implementation for a PathingEntity.
     * Can allow updating collision map, removing a PathingEntity from a zone, etc.
     * @param previousX Their previous recorded x position before movement.
     * @param previousZ Their previous recorded z position before movement.
     * @param previousLevel Their previous recorded level position before movement. This one is important for teleport.
     */
    refreshZonePresence(previousX: number, previousZ: number, previousLevel: number): void {
        // update collision map
        // players and npcs both can change this collision
        World.collisionManager.changeNpcCollision(this.width, previousX, previousZ, previousLevel, false);
        World.collisionManager.changeNpcCollision(this.width, this.x, this.z, this.level, true);

        if (Position.zone(previousX) !== Position.zone(this.x) || Position.zone(previousZ) !== Position.zone(this.z) || previousLevel != this.level) {
            // update zone entities
            if (this instanceof Player) {
                World.getZone(previousX, previousZ, previousLevel).removePlayer(this);
                World.getZone(this.x, this.z, this.level).addPlayer(this);
                if (previousLevel != this.level) {
                    this.loadedZones = {};
                }
            } else if (this instanceof Npc) {
                World.getZone(previousX, previousZ, previousLevel).removeNpc(this);
                World.getZone(this.x, this.z, this.level).addNpc(this);
            }
        }
    }

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

    /**
     * Queue this PathingEntity to a single walk step.
     * @param x The x position of the step.
     * @param z The z position of the step.
     * @param forceMove If to apply forcemove to this PathingEntity.
     */
    queueWalkStep(x: number, z: number, forceMove: boolean = false): void {
        this.walkQueue = [];
        this.walkQueue.push({ x: x, z: z });
        this.walkQueue.reverse();
        this.walkStep = this.walkQueue.length - 1;
        this.forceMove = forceMove;
    }

    /**
     * Queue multiple walk steps to this PathingEntity.
     * @param steps The steps to queue.
     */
    queueWalkSteps(steps: RouteCoordinates[]): void {
        this.walkQueue = [];
        for (const step of steps) {
            this.walkQueue.push({ x: step.x, z: step.z });
        }
        this.walkQueue.reverse();
        this.walkStep = this.walkQueue.length - 1;
    }

    teleJump(x: number, z: number, level: number): void {
        this.teleport(x, z, level);
        this.jump = true;
    }

    teleport(x: number, z: number, level: number): void {
        if (isNaN(level)) {
            level = 0;
        }
        level = Math.max(0, Math.min(level, 3));

        const previousX = this.x;
        const previousZ = this.z;
        const previousLevel = this.level;

        this.x = x;
        this.z = z;
        this.level = level;
        this.refreshZonePresence(previousX, previousZ, previousLevel);

        this.tele = true;
        if (previousLevel != level) {
            this.jump = true;
        }
        this.walkDir = -1;
        this.runDir = -1;
        this.walkStep = 0;
        this.walkQueue = [];

        this.orientation = Position.face(previousX, previousZ, x, z);
    }

    /**
     * Check if the number of tiles moved is > 2, we use Teleport for this PathingEntity.
     */
    validateDistanceWalked() {
        if (this.tele) {
            return;
        }

        const distanceCheck = Position.distanceTo({ x: this.x, z: this.z }, { x: this.lastX, z: this.lastZ }) > 2;
        if (distanceCheck) {
            this.tele = true;
        }
    }

    /**
     * Returns if this PathingEntity has any queued walk steps.
     */
    hasSteps(): boolean {
        return this.walkStep !== -1 && this.walkStep < this.walkQueue.length;
    }

    /**
     * Returns a random cardinal step that is available to use.
     */
    cardinalStep(): { x: number; z: number; } {
        const directions = [
            [-1, 0], // West
            [1, 0],  // East
            [0, 1], // North
            [0, -1],  // South
        ];

        for (let index = 0; index < directions.length; index++) {
            const index = Math.floor(Math.random() * directions.length);
            const dir = directions[index];
            directions.splice(index, 1);

            const dx = dir[0];
            const dz = dir[1];

            if (this.canTravelWithStrategy(dx, dz, CollisionFlag.BLOCK_NPC)) {
                return { x: this.x + dx, z: this.z + dz };
            }
        }
        return { x: this.x, z: this.z };
    }

    inOperableDistance(interaction: Interaction): boolean {
        const target = interaction.target;

        if (target instanceof Player || target instanceof Npc) {
            return ReachStrategy.reached(World.collisionFlags, this.level, this.x, this.z, target.x, target.z, target.width, target.length, this.width, 0, -2);
        }

        if (this.x === target.x && this.z === target.z) {
            return true;
        }

        if (target instanceof Loc) {
            const type = LocType.get(target.type);
            return ReachStrategy.reached(World.collisionFlags, this.level, this.x, this.z, target.x, target.z, type.width, type.length, this.width, target.rotation, target.shape);
        }
        return ReachStrategy.reached(World.collisionFlags, this.level, this.x, this.z, target.x, target.z, 1, 1, this.width, 0, -2);
    }

    inApproachDistance(interaction: Interaction): boolean {
        const target = interaction.target;

        if (target instanceof Player || target instanceof Npc) {
            return World.linePathFinder.lineOfSight(this.level, this.x, this.z, target.x, target.z, this.width, target.width, target.length).success && Position.distanceTo(this, target) <= interaction.apRange;
        } else if (target instanceof Loc) {
            const type = LocType.get(target.type);
            return World.linePathFinder.lineOfSight(this.level, this.x, this.z, target.x, target.z, this.width, type.width, type.length).success && Position.distanceTo(this, target) <= interaction.apRange;
        }
        return World.linePathFinder.lineOfSight(this.level, this.x, this.z, target.x, target.z, this.width).success && Position.distanceTo(this, target) <= interaction.apRange;
    }

    resetPathingEntity(): void {
        this.walkDir = -1;
        this.runDir = -1;
        this.tele = false;
        this.jump = false;
        this.lastX = this.x;
        this.lastZ = this.z;
        this.exactStartX = -1;
        this.exactStartZ = -1;
        this.exactEndX = -1;
        this.exactEndZ = -1;
        this.exactMoveStart = -1;
        this.exactMoveEnd = -1;
        this.exactFaceDirection = -1;
    }

    private takeStep(): { dir: number; persistStep: boolean; } {
        // dir -1 is an invalid step.

        const isNpc = this instanceof Npc;

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

        // check if force moving.
        if (this.forceMove) {
            return { dir, persistStep: isNpc };
        }

        // npc walking gets check for BLOCK_NPC flag.
        const extraFlag = isNpc ? CollisionFlag.BLOCK_NPC : CollisionFlag.OPEN;

        // check current direction if can travel to chosen dest.
        if (this.canTravelWithStrategy(dx, dz, extraFlag)) {
            return { dir, persistStep: isNpc };
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
