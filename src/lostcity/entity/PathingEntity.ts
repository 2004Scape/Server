import World from '#lostcity/engine/World.js';

import BlockWalk from '#lostcity/entity/BlockWalk.js';
import Entity from '#lostcity/entity/Entity.js';
import Loc from '#lostcity/entity/Loc.js';
import MoveRestrict from '#lostcity/entity/MoveRestrict.js';
import MoveSpeed from '#lostcity/entity/MoveSpeed.js';
import { Direction, Position } from '#lostcity/entity/Position.js';

import LocType from '#lostcity/cache/LocType.js';

import {canTravel, CollisionFlag, CollisionType, hasLineOfSight, isFlagged, reached} from '@2004scape/rsmod-pathfinder';

export default abstract class PathingEntity extends Entity {
    // constructor properties
    readonly moveRestrict: MoveRestrict;
    readonly blockWalk: BlockWalk;

    // runtime properties
    moveSpeed: MoveSpeed = MoveSpeed.INSTANT;
    walkDir: number = -1;
    runDir: number = -1;
    waypointIndex: number = -1;
    waypoints: { x: number; z: number }[] = [];
    lastX: number = -1;
    lastZ: number = -1;
    jump: boolean = false;

    walktrigger: number = -1;
    walktriggerArg: number = 0; // used for npcs

    orientation: number = Direction.SOUTH;

    exactStartX: number = -1;
    exactStartZ: number = -1;
    exactEndX: number = -1;
    exactEndZ: number = -1;
    exactMoveStart: number = -1;
    exactMoveEnd: number = -1;
    exactMoveDirection: number = -1;

    protected constructor(level: number, x: number, z: number, width: number, length: number, moveRestrict: MoveRestrict, blockWalk: BlockWalk) {
        super(level, x, z, width, length);
        this.moveRestrict = moveRestrict;
        this.blockWalk = blockWalk;
    }

    /**
     * Attempts to update movement for a PathingEntity.
     */
    abstract updateMovement(): void;
    abstract blockWalkFlag(): CollisionFlag;
    abstract defaultMoveSpeed(): MoveSpeed;

    /**
     * Process movement function for a PathingEntity to use.
     * Checks for if this PathingEntity has any waypoints to move towards.
     * Handles force movement. Validates and moves depending on if this
     * PathingEntity is walking or running only.
     * Applies an orientation update to this PathingEntity if a step
     * direction was taken.
     * Updates this PathingEntity zone presence if moved.
     * Returns false is this PathingEntity has no waypoints.
     * Returns true if a step was taken and movement processed.
     */
    processMovement(): boolean {
        if (!this.hasWaypoints()) {
            this.clearWalkSteps();
            return false;
        }

        const previousX = this.x;
        const previousZ = this.z;
        const previousLevel = this.level;

        if (this.moveSpeed !== MoveSpeed.STATIONARY && this.walkDir === -1) {
            this.walkDir = this.validateAndAdvanceStep();
            if (this.moveSpeed !== MoveSpeed.WALK && this.walkDir !== -1 && this.runDir === -1) {
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
        // only update collision map when the entity moves.
        if (this.x != previousX || this.z !== previousZ || this.level !== previousLevel) {
            // update collision map
            // players and npcs both can change this collision
            switch (this.blockWalk) {
                case BlockWalk.NPC:
                    World.collisionManager.changeNpcCollision(this.width, previousX, previousZ, previousLevel, false);
                    World.collisionManager.changeNpcCollision(this.width, this.x, this.z, this.level, true);
                    break;
                case BlockWalk.ALL:
                    World.collisionManager.changeNpcCollision(this.width, previousX, previousZ, previousLevel, false);
                    World.collisionManager.changeNpcCollision(this.width, this.x, this.z, this.level, true);
                    World.collisionManager.changePlayerCollision(this.width, previousX, previousZ, previousLevel, false);
                    World.collisionManager.changePlayerCollision(this.width, this.x, this.z, this.level, true);
                    break;
            }
        }

        if (Position.zone(previousX) !== Position.zone(this.x) || Position.zone(previousZ) !== Position.zone(this.z) || previousLevel != this.level) {
            World.getZone(previousX, previousZ, previousLevel).leave(this);
            World.getZone(this.x, this.z, this.level).enter(this);
        }
    }

    /**
     * Validates the next step in our current waypoint.
     *
     * Deques to the next step if reached the end of current step,
     * then attempts to look for a possible second next step,
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
        const dir = this.takeStep();
        if (dir === null) {
            return -1;
        }
        if (dir === -1) {
            this.waypointIndex--;
            if (this.waypointIndex < this.waypoints.length - 1 && this.waypointIndex != -1) {
                return this.validateAndAdvanceStep();
            }
            return -1;
        }
        this.x = Position.moveX(this.x, dir);
        this.z = Position.moveZ(this.z, dir);
        return dir;
    }

    /**
     * Queue this PathingEntity to a single waypoint.
     * @param x The x position of the step.
     * @param z The z position of the step.
     */
    queueWaypoint(x: number, z: number): void {
        this.waypoints = [];
        this.waypoints.push({ x, z });
        this.waypointIndex = 0;
    }

    /**
     * Queue waypoints to this PathingEntity.
     * @param waypoints The waypoints to queue.
     */
    queueWaypoints(waypoints: ArrayLike<number>): void {
        const points: Int32Array = Int32Array.from(waypoints);
        this.waypoints = [];
        for (const step of points) {
            this.waypoints.push({ x: step >> 14 & 0x3fff, z: step & 0x3fff });
        }
        this.waypoints.reverse();
        this.waypointIndex = this.waypoints.length - 1;
    }

    clearWalkSteps() {
        this.waypoints = [];
        this.waypointIndex = -1;
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

        this.moveSpeed = MoveSpeed.INSTANT;
        if (previousLevel != level) {
            this.jump = true;
        }
    }

    /**
     * Check if the number of tiles moved is > 2, we use Teleport for this PathingEntity.
     */
    validateDistanceWalked() {
        const distanceCheck =
            Position.distanceTo(this, {
                x: this.lastX,
                z: this.lastZ,
                width: this.width,
                length: this.length
            }) > 2;
        if (distanceCheck) {
            this.jump = true;
        }
    }

    getMovementDir() {
        // temp variables to convert movement operations
        let walkDir = this.walkDir;
        let runDir = this.runDir;
        let tele = this.moveSpeed === MoveSpeed.INSTANT;

        // convert p_teleport() into walk or run
        const distanceMoved = Position.distanceTo(this, {
            x: this.lastX,
            z: this.lastZ,
            width: this.width,
            length: this.length
        });
        if (tele && !this.jump && distanceMoved <= 2) {
            if (distanceMoved === 2) {
                // run
                const firstX = ((this.x + this.lastX) / 2) | 0;
                const firstZ = ((this.z + this.lastZ) / 2) | 0;
                walkDir = Position.face(this.lastX, this.lastZ, firstX, firstZ);
                runDir = Position.face(firstX, firstZ, this.x, this.z);
            } else {
                // walk
                walkDir = Position.face(this.lastX, this.lastZ, this.x, this.z);
                runDir = -1;
            }

            tele = false;
        }

        return { walkDir, runDir, tele };
    }

    /**
     * Returns if this PathingEntity has any queued waypoints.
     */
    hasWaypoints(): boolean {
        return this.waypointIndex !== -1 && this.waypointIndex < this.waypoints.length;
    }

    isLastWaypoint(): boolean {
        return this.waypointIndex === 0;
    }

    inOperableDistance(target: Entity): boolean {
        if (target.level !== this.level) {
            return false;
        }
        if (target instanceof PathingEntity) {
            return reached(this.level, this.x, this.z, target.x, target.z, target.width, target.length, this.width, target.orientation, -2);
        } else if (target instanceof Loc) {
            const forceapproach = LocType.get(target.type).forceapproach;
            return reached(this.level, this.x, this.z, target.x, target.z, target.width, target.length, this.width, target.angle, target.shape, forceapproach);
        }
        const shape = isFlagged(target.x, target.z, target.level, CollisionFlag.WALK_BLOCKED) ? -2 : -1;
        return reached(this.level, this.x, this.z, target.x, target.z, target.width, target.length, this.width, 0, shape);
    }

    inApproachDistance(range: number, target: Entity): boolean {
        if (target.level !== this.level) {
            return false;
        }
        if (target instanceof PathingEntity && Position.intersects(this.x, this.z, this.width, this.length, target.x, target.z, target.width, target.length)) {
            // pathing entity has a -2 shape basically (not allow on same tile) for ap.
            // you are not within ap distance of pathing entity if you are underneath it.
            return false;
        }
        return Position.distanceTo(this, target) <= range && hasLineOfSight(this.level, this.x, this.z, target.x, target.z, this.width, target.width, target.length, CollisionFlag.PLAYER);
    }

    getCollisionStrategy(): CollisionType | null {
        switch (this.moveRestrict) {
            case MoveRestrict.NORMAL:
                return CollisionType.NORMAL;
            case MoveRestrict.BLOCKED:
                return CollisionType.BLOCKED;
            case MoveRestrict.BLOCKED_NORMAL:
                return CollisionType.LINE_OF_SIGHT;
            case MoveRestrict.INDOORS:
                return CollisionType.INDOORS;
            case MoveRestrict.OUTDOORS:
                return CollisionType.OUTDOORS;
            case MoveRestrict.NOMOVE:
                return null;
            case MoveRestrict.PASSTHRU:
                return CollisionType.NORMAL;
        }
    }

    resetPathingEntity(): void {
        this.moveSpeed = this.defaultMoveSpeed();
        this.walkDir = -1;
        this.runDir = -1;
        this.jump = false;
        this.lastX = this.x;
        this.lastZ = this.z;
        this.exactStartX = -1;
        this.exactStartZ = -1;
        this.exactEndX = -1;
        this.exactEndZ = -1;
        this.exactMoveStart = -1;
        this.exactMoveEnd = -1;
        this.exactMoveDirection = -1;
    }

    private takeStep(): number | null {
        // dir -1 means we reached the destination.
        // dir null means nothing happened
        const srcX = this.x;
        const srcZ = this.z;

        const dest = this.waypoints[this.waypointIndex];
        const destX = dest.x;
        const destZ = dest.z;

        const dir = Position.face(srcX, srcZ, destX, destZ);

        const dx = Position.deltaX(dir);
        const dz = Position.deltaZ(dir);

        // check if moved off current pos.
        if (dx == 0 && dz == 0) {
            return -1;
        }

        const collisionStrategy = this.getCollisionStrategy();
        if (collisionStrategy === null) {
            // nomove moverestrict returns as null = no walking allowed.
            return -1;
        }

        const extraFlag = this.blockWalkFlag();
        if (extraFlag === CollisionFlag.NULL) {
            // nomove moverestrict returns as null = no walking allowed.
            return -1;
        }

        // check current direction if can travel to chosen dest.
        if (canTravel(this.level, this.x, this.z, dx, dz, this.width, extraFlag, collisionStrategy)) {
            return dir;
        }

        // check another direction if can travel to chosen dest on current z-axis.
        if (dx != 0 && canTravel(this.level, this.x, this.z, dx, 0, this.width, extraFlag, collisionStrategy)) {
            return Position.face(srcX, srcZ, destX, srcZ);
        }

        // check another direction if can travel to chosen dest on current x-axis.
        if (dz != 0 && canTravel(this.level, this.x, this.z, 0, dz, this.width, extraFlag, collisionStrategy)) {
            return Position.face(srcX, srcZ, srcX, destZ);
        }
        return null;
    }
}
