import { NpcInfoProt, Visibility } from '@2004scape/rsbuf';
import { CollisionFlag, CollisionType } from '@2004scape/rsmod-pathfinder';

import HuntType from '#/cache/config/HuntType.js';
import NpcType from '#/cache/config/NpcType.js';
import ScriptVarType from '#/cache/config/ScriptVarType.js';
import SeqType from '#/cache/config/SeqType.js';
import VarNpcType from '#/cache/config/VarNpcType.js';
import { Direction, CoordGrid } from '#/engine/CoordGrid.js';
import { BlockWalk } from '#/engine/entity/BlockWalk.js';
import Entity from '#/engine/entity/Entity.js';
import { EntityLifeCycle } from '#/engine/entity/EntityLifeCycle.js';
import HeroPoints from '#/engine/entity/HeroPoints.js';
import { HuntCheckNotTooStrong } from '#/engine/entity/hunt/HuntCheckNotTooStrong.js';
import { HuntModeType } from '#/engine/entity/hunt/HuntModeType.js';
import { Interaction } from '#/engine/entity/Interaction.js';
import Loc from '#/engine/entity/Loc.js';
import { MoveRestrict } from '#/engine/entity/MoveRestrict.js';
import { MoveSpeed } from '#/engine/entity/MoveSpeed.js';
import { MoveStrategy } from '#/engine/entity/MoveStrategy.js';
import { NpcMode } from '#/engine/entity/NpcMode.js';
import { NpcQueueRequest } from '#/engine/entity/NpcQueueRequest.js';
import { NpcStat } from '#/engine/entity/NpcStat.js';
import Obj from '#/engine/entity/Obj.js';
import PathingEntity from '#/engine/entity/PathingEntity.js';
import Player from '#/engine/entity/Player.js';
import { isFlagged, findNaivePath } from '#/engine/GameMap.js';
import ScriptFile from '#/engine/script/ScriptFile.js';
import { HuntIterator } from '#/engine/script/ScriptIterators.js';
import ScriptPointer from '#/engine/script/ScriptPointer.js';
import ScriptProvider from '#/engine/script/ScriptProvider.js';
import ScriptRunner from '#/engine/script/ScriptRunner.js';
import ScriptState from '#/engine/script/ScriptState.js';
import ServerTriggerType from '#/engine/script/ServerTriggerType.js';
import World from '#/engine/World.js';
import LinkList from '#/util/LinkList.js';

export default class Npc extends PathingEntity {
    // constructor properties
    nid: number;
    uid: number;
    baseType: number;
    currentType: number;
    startX: number;
    startZ: number;
    startLevel: number;
    levels: Uint8Array = new Uint8Array(6);
    baseLevels: Uint8Array = new Uint8Array(6);

    // runtime variables
    readonly vars: Int32Array;
    readonly varsString: (string | undefined)[];

    // script variables
    activeScript: ScriptState | null = null;
    queue: LinkList<NpcQueueRequest> = new LinkList();
    timerInterval: number = 0;
    timerClock: number = 0;
    regenClock: number = 0;
    huntClock: number = 0;
    huntMode: number = -1;
    huntTarget: Entity | null = null;
    huntrange: number = 0;
    spawnTriggerPending: boolean = true;

    nextPatrolTick: number = -1;
    nextPatrolPoint: number = 0;
    delayedPatrol: boolean = false;
    resetOnRevert: boolean = true;

    wanderCounter: number = 0;

    heroPoints: HeroPoints = new HeroPoints(16); // be sure to reset when stats are recovered/reset

    constructor(level: number, x: number, z: number, width: number, length: number, lifecycle: EntityLifeCycle, nid: number, type: number, moveRestrict: MoveRestrict, blockWalk: BlockWalk) {
        super(level, x, z, width, length, lifecycle, moveRestrict, blockWalk, MoveStrategy.NAIVE, NpcInfoProt.FACE_COORD, NpcInfoProt.FACE_ENTITY);
        this.nid = nid;
        this.baseType = type;
        this.currentType = type;
        this.uid = (type << 16) | nid;
        this.startX = this.x;
        this.startZ = this.z;
        this.startLevel = this.level;

        const npcType = NpcType.get(type);

        for (let index = 0; index < npcType.stats.length; index++) {
            const level = npcType.stats[index];
            this.levels[index] = level;
            this.baseLevels[index] = level;
        }

        this.setTimer(npcType.timer);

        this.vars = new Int32Array(VarNpcType.count);
        this.varsString = new Array(VarNpcType.count);
        this.targetOp = npcType.defaultmode;
        this.huntMode = npcType.huntmode;
        this.huntrange = npcType.huntrange;
        this.wanderCounter = 0;
    }

    cleanup(): void {
        this.nid = -1;
        this.uid = -1;
        this.activeScript = null;
        this.huntTarget = null;
        this.queue.clear();
    }

    getVar(id: number) {
        const varn = VarNpcType.get(id);
        return varn.type === ScriptVarType.STRING ? this.varsString[varn.id] : this.vars[varn.id];
    }

    setVar(id: number, value: number | string) {
        const varn = VarNpcType.get(id);

        if (varn.type === ScriptVarType.STRING && typeof value === 'string') {
            this.varsString[varn.id] = value;
        } else if (typeof value === 'number') {
            this.vars[varn.id] = value;
        }
    }

    resetEntity(respawn: boolean) {
        if (respawn) {
            this.currentType = this.baseType;
            this.uid = (this.type << 16) | this.nid;
            this.unfocus();
            this.playAnimation(-1, 0); // reset animation or last anim has a chance to appear on respawn
            for (let index = 0; index < this.baseLevels.length; index++) {
                this.levels[index] = this.baseLevels[index];
            }
            this.heroPoints.clear();
            this.queue.clear();

            for (let i = 0; i < this.vars.length; i++) {
                const varn = VarNpcType.get(i);
                if (varn.type === ScriptVarType.STRING) {
                    // todo: "null"? another value?
                    continue;
                } else {
                    this.vars[i] = varn.type === ScriptVarType.INT ? 0 : -1;
                }
            }

            this.varsString.fill(undefined);
            this.resetDefaults();

            const npcType: NpcType = NpcType.get(this.type);
            this.huntrange = npcType.huntrange;
            this.huntMode = npcType.huntmode;
            this.huntClock = 0;
            this.huntTarget = null;
            this.tele = true;
        } else {
            super.resetPathingEntity();
        }
    }

    pathToPathingTarget(): void {
        if (!this.target) {
            return;
        }

        if (!(this.target instanceof PathingEntity)) {
            this.pathToTarget();
            return;
        }

        if (CoordGrid.intersects(this.x, this.z, this.width, this.length, this.target.x, this.target.z, this.target.width, this.target.length)) {
            this.queueWaypoints(findNaivePath(this.level, this.x, this.z, this.target.x, this.target.z, this.width, this.length, this.target.width, this.target.length, 0, CollisionType.NORMAL));
            return;
        }

        this.pathToTarget();
    }

    updateMovement(): boolean {
        const type = NpcType.get(this.type);
        if (type.moverestrict === MoveRestrict.NOMOVE) {
            return false;
        }

        const { x, z } = CoordGrid.unpackCoord(this.waypoints[this.waypointIndex]);

        if (this.walktrigger !== -1 && (this.x !== x || this.z !== z)) {
            const type = NpcType.get(this.type);
            const script = ScriptProvider.getByTrigger(ServerTriggerType.AI_QUEUE1 + this.walktrigger, type.id, type.category);
            this.walktrigger = -1;

            if (script) {
                const state = ScriptRunner.init(script, this, null, [this.walktriggerArg]);
                ScriptRunner.execute(state);
            }
        }
        if (this.moveSpeed !== MoveSpeed.INSTANT) {
            this.moveSpeed = this.defaultMoveSpeed();
        }

        super.processMovement();

        const moved = this.lastTickX !== this.x || this.lastTickZ !== this.z;
        if (moved) {
            this.lastMovement = World.currentTick + 1;
            this.wanderCounter = 0;
        }
        return moved;
    }

    clearPatrol() {
        this.nextPatrolTick = -1;
    }

    targetWithinMaxRange(): boolean {
        if (!this.target) {
            return true;
        }
        if (this.targetOp === NpcMode.PLAYERFOLLOW) {
            return true;
        }
        const type = NpcType.get(this.type);

        const apTrigger: boolean =
            (this.targetOp >= NpcMode.APNPC1 && this.targetOp <= NpcMode.APNPC5) ||
            (this.targetOp >= NpcMode.APPLAYER1 && this.targetOp <= NpcMode.APPLAYER5) ||
            (this.targetOp >= NpcMode.APLOC1 && this.targetOp <= NpcMode.APLOC5) ||
            (this.targetOp >= NpcMode.APOBJ1 && this.targetOp <= NpcMode.APOBJ5);
        const opTrigger: boolean = !apTrigger;
        if (opTrigger) {
            const distanceToX = Math.abs(this.target.x - this.startX);
            const distanceToZ = Math.abs(this.target.z - this.startZ);
            if (Math.max(distanceToX, distanceToZ) > type.maxrange + 1) {
                return false;
            }
            // remove corner
            if (distanceToX === type.maxrange + 1 && distanceToZ === type.maxrange + 1) {
                return false;
            }
        } else if (apTrigger) {
            if (CoordGrid.distanceToSW(this.target, { x: this.startX, z: this.startZ }) > type.maxrange + type.attackrange) {
                return false;
            }
        } else if (this.targetOp === NpcMode.PLAYERESCAPE) {
            const distanceToEscape = CoordGrid.distanceTo(this, {
                x: this.startX,
                z: this.startZ,
                width: this.width,
                length: this.length
            });
            const targetDistanceFromStart = CoordGrid.distanceTo(this.target, {
                x: this.startX,
                z: this.startZ,
                width: this.target.width,
                length: this.target.length
            });

            if (targetDistanceFromStart > type.maxrange && distanceToEscape > type.maxrange) {
                return false;
            }
        } else if (CoordGrid.distanceToSW(this.target, { x: this.startX, z: this.startZ }) > type.maxrange) {
            return false;
        }
        return true;
    }

    blockWalkFlag(): CollisionFlag {
        if (this.moveRestrict === MoveRestrict.NORMAL) {
            return CollisionFlag.NPC;
        } else if (this.moveRestrict === MoveRestrict.BLOCKED) {
            return CollisionFlag.OPEN;
        } else if (this.moveRestrict === MoveRestrict.BLOCKED_NORMAL) {
            return CollisionFlag.NPC;
        } else if (this.moveRestrict === MoveRestrict.INDOORS) {
            return CollisionFlag.NPC;
        } else if (this.moveRestrict === MoveRestrict.OUTDOORS) {
            return CollisionFlag.NPC;
        } else if (this.moveRestrict === MoveRestrict.NOMOVE) {
            return CollisionFlag.NULL;
        } else if (this.moveRestrict === MoveRestrict.PASSTHRU) {
            return CollisionFlag.OPEN;
        }
        return CollisionFlag.NULL;
    }

    defaultMoveSpeed(): MoveSpeed {
        return MoveSpeed.WALK;
    }

    // ----

    setTimer(interval: number) {
        if (interval !== -1) {
            this.timerInterval = interval;
        }
    }

    executeScript(script: ScriptState) {
        const state = ScriptRunner.execute(script);
        if (state !== ScriptState.FINISHED && state !== ScriptState.ABORTED) {
            if (state === ScriptState.WORLD_SUSPENDED) {
                World.enqueueScript(script, script.popInt());
            } else if (state === ScriptState.NPC_SUSPENDED) {
                script.activeNpc.activeScript = script;
            } else {
                script.activePlayer.activeScript = script;
            }
        } else if (script === this.activeScript) {
            this.activeScript = null;
        }

        if (script.pointerGet(ScriptPointer.ProtectedActivePlayer) && script._activePlayer) {
            script._activePlayer.protect = false;
            script.pointerRemove(ScriptPointer.ProtectedActivePlayer);
        }

        if (script.pointerGet(ScriptPointer.ProtectedActivePlayer2) && script._activePlayer2) {
            script._activePlayer2.protect = false;
            script.pointerRemove(ScriptPointer.ProtectedActivePlayer2);
        }
    }

    processRegen() {
        const type = NpcType.get(this.type);

        // Hp regen timer counts down and procs every `regenRate` ticks
        // Since regenClock is initialized to 0, NPCs regen their hp on their first turn alive, and then on turn 101
        // This is accurate to OSRS behavior
        if (type.regenRate !== 0 && --this.regenClock <= 0) {
            this.regenClock = type.regenRate;
            for (let index = 0; index < this.baseLevels.length; index++) {
                const stat = this.levels[index];
                const baseStat = this.baseLevels[index];
                if (stat < baseStat) {
                    this.levels[index]++;
                } else if (stat > baseStat) {
                    this.levels[index]--;
                }
            }
        }
    }

    processTimers() {
        if (this.timerInterval > 0 && ++this.timerClock >= this.timerInterval) {
            const type = NpcType.get(this.type);
            const script = ScriptProvider.getByTrigger(ServerTriggerType.AI_TIMER, type.id, type.category);
            if (script) {
                this.executeScript(ScriptRunner.init(script, this));
                this.timerClock = 0;
            }
        }
    }

    processQueue() {
        for (const request of this.queue.all()) {
            // purposely only decrements the delay when the npc is not delayed
            if (!this.delayed) {
                request.delay--;
            }

            if (!this.delayed && request.delay <= 0) {
                request.unlink();
                const type: NpcType = NpcType.get(this.type);
                const script = ScriptProvider.getByTrigger(request.queueId, type.id, type.category);
                if (script) {
                    const state = ScriptRunner.init(script, this, null, request.args);
                    state.lastInt = request.lastInt;
                    this.executeScript(state);
                }
            }
        }
    }

    enqueueScript(queueId: number, delay = 0, arg: number = 0) {
        const request = new NpcQueueRequest(queueId, [], delay);
        request.lastInt = arg;
        this.queue.addTail(request);
    }

    randomWalk(range: number) {
        const dx = Math.round(Math.random() * (range * 2) - range);
        const dz = Math.round(Math.random() * (range * 2) - range);
        const destX = this.startX + dx;
        const destZ = this.startZ + dz;

        if (destX !== this.x || destZ !== this.z) {
            this.queueWaypoint(destX, destZ);
        }
    }

    validateTarget(): boolean {
        if (this.target === null) {
            return false;
        }

        // For Npc targets, validate that the Npc is found in the world and that it's not delayed
        if (this.target instanceof Npc && (typeof World.getNpc(this.target.nid) === 'undefined' || this.target.delayed)) {
            return false;
        }

        // This is effectively checking if the npc did a changetype
        if (this.target instanceof Npc && this.targetSubject.type !== -1 && World.getNpcByUid((this.targetSubject.type << 16) | this.target.nid) === null) {
            return false;
        }

        // For Obj targets, validate that the Obj still exists in the World
        if (this.target instanceof Obj && World.getObj(this.target.x, this.target.z, this.level, this.target.type, Obj.NO_RECEIVER) === null) {
            return false;
        }

        // For Loc targets, validate that the Loc still exists in the world
        if (this.target instanceof Loc && World.getLoc(this.target.x, this.target.z, this.level, this.target.type) === null) {
            return false;
        }

        // For Player targets, validate that the Player still exists in the world and is not in the process of logging out or invisible
        if (this.target instanceof Player && (World.getPlayerByUid(this.target.uid) === null || this.target.loggingOut || this.target.visibility !== Visibility.DEFAULT)) {
            return false;
        }

        return true;
    }

    processNpcModes() {
        if (this.delayed) {
            return;
        }

        // Fail safe
        if (this.targetOp === NpcMode.NULL) {
            const type: NpcType = NpcType.get(this.type);
            this.targetOp = type.defaultmode;
        }

        if (this.targetOp === NpcMode.NONE) {
            this.noMode();
        } else if (this.targetOp === NpcMode.WANDER) {
            this.wanderMode();
        } else if (this.targetOp === NpcMode.PATROL) {
            this.patrolMode();
        } else if (this.targetOp === NpcMode.PLAYERESCAPE) {
            this.playerEscapeMode();
        } else if (this.targetOp === NpcMode.PLAYERFOLLOW) {
            this.playerFollowMode();
        } else if (this.targetOp === NpcMode.PLAYERFACE) {
            this.playerFaceMode();
        } else if (this.targetOp === NpcMode.PLAYERFACECLOSE) {
            this.playerFaceCloseMode();
        } else {
            this.aiMode();
        }
    }

    noMode(): void {
        this.updateMovement();
    }

    clearInteraction(): void {
        super.clearInteraction();
        this.targetOp = NpcMode.NONE;
        this.faceEntity = -1;
        this.masks |= NpcInfoProt.FACE_ENTITY;
    }

    resetDefaults(): void {
        this.clearInteraction();
        const type: NpcType = NpcType.get(this.type);
        this.targetOp = type.defaultmode;
        this.faceEntity = -1;
        this.masks |= this.entitymask;

        const npcType: NpcType = NpcType.get(this.type);
        this.huntMode = npcType.huntmode;
        this.huntrange = npcType.huntrange;
        this.huntClock = 0;
        this.huntTarget = null;
        // Reset timer interval
        this.timerInterval = type.timer;
    }

    wanderMode(): void {
        const type = NpcType.get(this.type);

        // 1/8 chance to move every tick (even if they already have a destination)
        if (type.moverestrict !== MoveRestrict.NOMOVE && Math.random() < 0.125) {
            this.randomWalk(type.wanderrange);
        }

        this.updateMovement();

        const onSpawn = this.x === this.startX && this.z === this.startZ && this.level === this.startLevel;

        if (this.wanderCounter++ >= 500) {
            if (!onSpawn) {
                this.teleport(this.startX, this.startZ, this.startLevel);
            }
            this.wanderCounter = 0;
        }
    }

    patrolMode(): void {
        const type = NpcType.get(this.type);
        const patrolPoints = type.patrolCoord;
        const patrolDelay = type.patrolDelay[this.nextPatrolPoint];
        let dest = CoordGrid.unpackCoord(patrolPoints[this.nextPatrolPoint]);

        this.updateMovement();
        if (!this.hasWaypoints() && !this.target) {
            // requeue waypoints in cases where an npc was interacting and the interaction has been cleared
            this.queueWaypoint(dest.x, dest.z);
        }
        if (!(this.x === dest.x && this.z === dest.z) && this.nextPatrolTick > -1 && World.currentTick >= this.nextPatrolTick) {
            this.teleport(dest.x, dest.z, dest.level);
        }
        if (this.x === dest.x && this.z === dest.z && !this.delayedPatrol) {
            this.nextPatrolTick = World.currentTick + patrolDelay;
            this.delayedPatrol = true;
        }
        if (this.nextPatrolTick > World.currentTick) {
            return;
        }

        this.nextPatrolPoint = (this.nextPatrolPoint + 1) % patrolPoints.length;
        this.nextPatrolTick = World.currentTick + 30; // 30 ticks until we force the npc to the next patrol coord
        this.delayedPatrol = false;
        dest = CoordGrid.unpackCoord(patrolPoints[this.nextPatrolPoint]); // recalc dest
        this.queueWaypoint(dest.x, dest.z);
    }

    playerEscapeMode(): void {
        if (!this.validateTarget() || !this.targetWithinMaxRange()) {
            this.resetDefaults();
            return;
        }

        if (!(this.target instanceof Player)) {
            throw new Error('[Npc] Target must be a Player for playerescape mode.');
        }

        if (CoordGrid.distanceToSW(this, this.target) > 25) {
            this.resetDefaults();
            return;
        }

        let direction: number;
        let flags: number;
        if (this.target.x >= this.x && this.target.z >= this.z) {
            direction = Direction.SOUTH_WEST;
            flags = CollisionFlag.WALL_SOUTH | CollisionFlag.WALL_WEST;
        } else if (this.target.x >= this.x && this.target.z < this.z) {
            direction = Direction.NORTH_WEST;
            flags = CollisionFlag.WALL_NORTH | CollisionFlag.WALL_WEST;
        } else if (this.target.x < this.x && this.target.z >= this.z) {
            direction = Direction.SOUTH_EAST;
            flags = CollisionFlag.WALL_SOUTH | CollisionFlag.WALL_EAST;
        } else {
            direction = Direction.NORTH_EAST;
            flags = CollisionFlag.WALL_NORTH | CollisionFlag.WALL_EAST;
        }

        const mx: number = CoordGrid.moveX(this.x, direction);
        const mz: number = CoordGrid.moveZ(this.z, direction);

        if (isFlagged(mx, mz, this.level, flags)) {
            this.resetDefaults();
            return;
        }

        const coord: CoordGrid = { x: mx, z: mz, level: this.level };
        if (
            CoordGrid.distanceToSW(coord, {
                x: this.startX,
                z: this.startZ
            }) < NpcType.get(this.type).maxrange
        ) {
            this.queueWaypoint(coord.x, coord.z);
            this.updateMovement();
            return;
        }

        // walk along other axis.
        if (direction === Direction.NORTH_EAST || direction === Direction.NORTH_WEST) {
            this.queueWaypoint(this.x, coord.z);
        } else {
            this.queueWaypoint(coord.x, this.z);
        }
        this.updateMovement();
    }

    playerFollowMode(): void {
        if (!this.validateTarget() || !this.targetWithinMaxRange()) {
            this.resetDefaults();
            return;
        }
        const player = this.target;

        if (!(player instanceof Player)) {
            throw new Error('[Npc] Target must be a Player for playerfollow mode.');
        }

        // Set dest to target
        this.pathToPathingTarget();

        // Path
        this.updateMovement();

        this.startX = this.x;
        this.startZ = this.z;
        this.startLevel = this.level;
    }

    playerFaceMode(): void {
        if (!this.validateTarget()) {
            this.resetDefaults();
            return;
        }

        if (!(this.target instanceof Player)) {
            throw new Error('[Npc] Target must be a Player for playerface mode.');
        }

        if (this.level !== this.target.level) {
            this.resetDefaults();
            return;
        }

        const type = NpcType.get(this.type);

        if (CoordGrid.distanceTo(this, this.target) > type.maxrange) {
            this.resetDefaults();
            return;
        }
    }

    playerFaceCloseMode(): void {
        if (!this.validateTarget()) {
            this.resetDefaults();
            return;
        }

        if (!(this.target instanceof Player)) {
            throw new Error('[Npc] Target must be a Player for playerfaceclose mode.');
        }

        if (this.level !== this.target.level) {
            this.resetDefaults();
            return;
        }

        if (CoordGrid.distanceTo(this, this.target) > 1) {
            this.resetDefaults();
            return;
        }
    }

    aiMode(): void {
        const type: NpcType = NpcType.get(this.type);
        if (!this.target || !this.target.isValid() || this.target.level !== this.level || !this.targetWithinMaxRange()) {
            this.resetDefaults();
            return;
        }

        // Reset the wander timer if Npc runs its aimode
        this.wanderCounter = 0;

        // Try to interact before moving, include op Obj and Loc
        if (this.tryInteract(true)) {
            return;
        }

        // Set dest to target
        this.pathToPathingTarget();

        // Path
        const moved: boolean = this.updateMovement();

        // Clear target if givechase=no
        if (moved && !type.givechase) {
            this.resetDefaults();
            return;
        }

        // Try to interact again after moving
        if (this.target) {
            this.tryInteract(false);
        }
    }

    private tryInteract(allowOpScenery: boolean): boolean {
        if (!this.target) {
            return false;
        }
        const type: NpcType = NpcType.get(this.type);
        const apTrigger: boolean =
            (this.targetOp >= NpcMode.APNPC1 && this.targetOp <= NpcMode.APNPC5) ||
            (this.targetOp >= NpcMode.APPLAYER1 && this.targetOp <= NpcMode.APPLAYER5) ||
            (this.targetOp >= NpcMode.APLOC1 && this.targetOp <= NpcMode.APLOC5) ||
            (this.targetOp >= NpcMode.APOBJ1 && this.targetOp <= NpcMode.APOBJ5);
        const opTrigger: boolean = !apTrigger;

        const script: ScriptFile | null = this.getTrigger();

        if (script && opTrigger && this.inOperableDistance(this.target) && (this.target instanceof PathingEntity || allowOpScenery)) {
            this.executeScript(ScriptRunner.init(script, this, this.target));
            return true;
        }
        if (script && apTrigger && this.inApproachDistance(type.attackrange, this.target)) {
            this.executeScript(ScriptRunner.init(script, this, this.target));
            return true;
        }
        if (this.inOperableDistance(this.target)) {
            // this.target = null;
            this.resetDefaults();
            return true;
        }
        return false;
    }

    private getTrigger(): ScriptFile | null {
        const trigger: ServerTriggerType | null = this.getTriggerForMode(this.targetOp);
        if (trigger) {
            return ScriptProvider.getByTrigger(trigger, this.type, -1) ?? null;
        }
        return null;
    }

    private getTriggerForMode(mode: NpcMode | ServerTriggerType): ServerTriggerType | null {
        if (mode === NpcMode.OPPLAYER1) {
            return ServerTriggerType.AI_OPPLAYER1;
        } else if (mode === NpcMode.OPPLAYER2) {
            return ServerTriggerType.AI_OPPLAYER2;
        } else if (mode === NpcMode.OPPLAYER3) {
            return ServerTriggerType.AI_OPPLAYER3;
        } else if (mode === NpcMode.OPPLAYER4) {
            return ServerTriggerType.AI_OPPLAYER4;
        } else if (mode === NpcMode.OPPLAYER5) {
            return ServerTriggerType.AI_OPPLAYER5;
        } else if (mode === NpcMode.APPLAYER1) {
            return ServerTriggerType.AI_APPLAYER1;
        } else if (mode === NpcMode.APPLAYER2) {
            return ServerTriggerType.AI_APPLAYER2;
        } else if (mode === NpcMode.APPLAYER3) {
            return ServerTriggerType.AI_APPLAYER3;
        } else if (mode === NpcMode.APPLAYER4) {
            return ServerTriggerType.AI_APPLAYER4;
        } else if (mode === NpcMode.APPLAYER5) {
            return ServerTriggerType.AI_APPLAYER5;
        } else if (mode === NpcMode.OPLOC1) {
            return ServerTriggerType.AI_OPLOC1;
        } else if (mode === NpcMode.OPLOC2) {
            return ServerTriggerType.AI_OPLOC2;
        } else if (mode === NpcMode.OPLOC3) {
            return ServerTriggerType.AI_OPLOC3;
        } else if (mode === NpcMode.OPLOC4) {
            return ServerTriggerType.AI_OPLOC4;
        } else if (mode === NpcMode.OPLOC5) {
            return ServerTriggerType.AI_OPLOC5;
        } else if (mode === NpcMode.APLOC1) {
            return ServerTriggerType.AI_APLOC1;
        } else if (mode === NpcMode.APLOC2) {
            return ServerTriggerType.AI_APLOC2;
        } else if (mode === NpcMode.APLOC3) {
            return ServerTriggerType.AI_APLOC3;
        } else if (mode === NpcMode.APLOC4) {
            return ServerTriggerType.AI_APLOC4;
        } else if (mode === NpcMode.APLOC5) {
            return ServerTriggerType.AI_APLOC5;
        } else if (mode === NpcMode.OPOBJ1) {
            return ServerTriggerType.AI_OPOBJ1;
        } else if (mode === NpcMode.OPOBJ2) {
            return ServerTriggerType.AI_OPOBJ2;
        } else if (mode === NpcMode.OPOBJ3) {
            return ServerTriggerType.AI_OPOBJ3;
        } else if (mode === NpcMode.OPOBJ4) {
            return ServerTriggerType.AI_OPOBJ4;
        } else if (mode === NpcMode.OPOBJ5) {
            return ServerTriggerType.AI_OPOBJ5;
        } else if (mode === NpcMode.APOBJ1) {
            return ServerTriggerType.AI_APOBJ1;
        } else if (mode === NpcMode.APOBJ2) {
            return ServerTriggerType.AI_APOBJ2;
        } else if (mode === NpcMode.APOBJ3) {
            return ServerTriggerType.AI_APOBJ3;
        } else if (mode === NpcMode.APOBJ4) {
            return ServerTriggerType.AI_APOBJ4;
        } else if (mode === NpcMode.APOBJ5) {
            return ServerTriggerType.AI_APOBJ5;
        } else if (mode === NpcMode.OPNPC1) {
            return ServerTriggerType.AI_OPNPC1;
        } else if (mode === NpcMode.OPNPC2) {
            return ServerTriggerType.AI_OPNPC2;
        } else if (mode === NpcMode.OPNPC3) {
            return ServerTriggerType.AI_OPNPC3;
        } else if (mode === NpcMode.OPNPC4) {
            return ServerTriggerType.AI_OPNPC4;
        } else if (mode === NpcMode.OPNPC5) {
            return ServerTriggerType.AI_OPNPC5;
        } else if (mode === NpcMode.APNPC1) {
            return ServerTriggerType.AI_APNPC1;
        } else if (mode === NpcMode.APNPC2) {
            return ServerTriggerType.AI_APNPC2;
        } else if (mode === NpcMode.APNPC3) {
            return ServerTriggerType.AI_APNPC3;
        } else if (mode === NpcMode.APNPC4) {
            return ServerTriggerType.AI_APNPC4;
        } else if (mode === NpcMode.APNPC5) {
            return ServerTriggerType.AI_APNPC5;
        } else if (mode === NpcMode.QUEUE1) {
            return ServerTriggerType.AI_QUEUE1;
        } else if (mode === NpcMode.QUEUE2) {
            return ServerTriggerType.AI_QUEUE2;
        } else if (mode === NpcMode.QUEUE3) {
            return ServerTriggerType.AI_QUEUE3;
        } else if (mode === NpcMode.QUEUE4) {
            return ServerTriggerType.AI_QUEUE4;
        } else if (mode === NpcMode.QUEUE5) {
            return ServerTriggerType.AI_QUEUE5;
        } else if (mode === NpcMode.QUEUE6) {
            return ServerTriggerType.AI_QUEUE6;
        } else if (mode === NpcMode.QUEUE7) {
            return ServerTriggerType.AI_QUEUE7;
        } else if (mode === NpcMode.QUEUE8) {
            return ServerTriggerType.AI_QUEUE8;
        } else if (mode === NpcMode.QUEUE9) {
            return ServerTriggerType.AI_QUEUE9;
        } else if (mode === NpcMode.QUEUE10) {
            return ServerTriggerType.AI_QUEUE10;
        } else if (mode === NpcMode.QUEUE11) {
            return ServerTriggerType.AI_QUEUE11;
        } else if (mode === NpcMode.QUEUE12) {
            return ServerTriggerType.AI_QUEUE12;
        } else if (mode === NpcMode.QUEUE13) {
            return ServerTriggerType.AI_QUEUE13;
        } else if (mode === NpcMode.QUEUE14) {
            return ServerTriggerType.AI_QUEUE14;
        } else if (mode === NpcMode.QUEUE15) {
            return ServerTriggerType.AI_QUEUE15;
        } else if (mode === NpcMode.QUEUE16) {
            return ServerTriggerType.AI_QUEUE16;
        } else if (mode === NpcMode.QUEUE17) {
            return ServerTriggerType.AI_QUEUE17;
        } else if (mode === NpcMode.QUEUE18) {
            return ServerTriggerType.AI_QUEUE18;
        } else if (mode === NpcMode.QUEUE19) {
            return ServerTriggerType.AI_QUEUE19;
        } else if (mode === NpcMode.QUEUE20) {
            return ServerTriggerType.AI_QUEUE20;
        }
        return null;
    }

    // https://x.com/JagexAsh/status/1821236327150710829
    // https://x.com/JagexAsh/status/1799793914595131463
    huntAll(): void {
        this.huntTarget = null;

        const hunt: HuntType = HuntType.get(this.huntMode);

        // If a huntrate is defined, this acts as a throttle
        if (this.huntClock < hunt.rate - 1) {
            return;
        }

        // If no hunt, just return
        if (hunt.type === HuntModeType.OFF || this.huntrange < 1) {
            return;
        }

        let hunted: Entity[];
        if (hunt.type === HuntModeType.PLAYER) {
            hunted = this.huntPlayers(hunt);
        } else if (hunt.type === HuntModeType.NPC) {
            hunted = this.huntNpcs(hunt);
        } else if (hunt.type === HuntModeType.OBJ) {
            hunted = this.huntObjs(hunt);
        } else {
            hunted = this.huntLocs(hunt);
        }

        // Pick randomly from the hunted entities
        if (hunted.length > 0) {
            const entity: Entity = hunted[Math.floor(Math.random() * hunted.length)];
            this.huntTarget = entity;
        }
    }

    consumeHuntTarget() {
        const hunt: HuntType = HuntType.get(this.huntMode);

        // We need a huntTarget and a huntMode
        if (!this.huntTarget || hunt.type === HuntModeType.OFF) {
            return;
        }

        // Findnewmode runs a Queue trigger rather than setting the interaction
        if (NpcMode.QUEUE1 <= hunt.findNewMode && hunt.findNewMode <= NpcMode.QUEUE20) {
            const npcType = NpcType.get(this.type);
            const script = ScriptProvider.getByTrigger(ServerTriggerType.AI_QUEUE1 + (hunt.findNewMode - NpcMode.QUEUE1), npcType.id, npcType.category);

            if (script) {
                const state = ScriptRunner.init(script, this, null, null);
                ScriptRunner.execute(state);
            }
        } else {
            // Set the interaction
            this.setInteraction(Interaction.SCRIPT, this.huntTarget, hunt.findNewMode);
        }

        // Clear target
        this.huntTarget = null;
        this.huntClock = 0;

        // In osrs, and in this 2005: https://youtu.be/8AFed6tyOp8?t=231
        // Once an npc finds a huntTarget, it will no longer hunt until its interactions are cleared
        if (!hunt.findKeepHunting) {
            this.huntMode = -1;
            return;
        }
    }

    private huntPlayers(hunt: HuntType): Entity[] {
        const type: NpcType = NpcType.get(this.type);
        const players: Entity[] = [];
        const hunted: HuntIterator = new HuntIterator(World.currentTick, this.level, this.x, this.z, this.huntrange, hunt.checkVis, -1, -1, HuntModeType.PLAYER);

        for (const player of hunted) {
            if (!(player instanceof Player)) {
                throw new Error('[Npc] huntAll must be of type Player here.');
            }

            if (hunt.checkNotBusy && player.busy()) {
                continue;
            }

            if (hunt.checkAfk && player.zonesAfk()) {
                continue;
            }

            if (hunt.checkNotTooStrong === HuntCheckNotTooStrong.OUTSIDE_WILDERNESS && !player.isInWilderness() && player.combatLevel > type.vislevel * 2) {
                continue;
            }
            if (this.target !== player && !World.gameMap.isMulti(CoordGrid.packCoord(player.level, player.x, player.z))) {
                if (hunt.checkNotCombat !== -1 && (player.getVar(hunt.checkNotCombat) as number) + 8 > World.currentTick) {
                    continue;
                }
                if (hunt.checkNotCombatSelf !== -1 && (this.getVar(hunt.checkNotCombatSelf) as number) + 8 > World.currentTick) {
                    continue;
                }
            }
            if (
                hunt.checkVars &&
                !hunt.checkVars.every(checkVar => {
                    return checkVar.varId === -1 || hunt.checkHuntCondition(player.getVar(checkVar.varId) as number, checkVar.condition, checkVar.val);
                })
            ) {
                continue;
            }

            if (hunt.checkInv !== -1) {
                let quantity: number = 0;
                if (hunt.checkObj !== -1) {
                    quantity = player.invTotal(hunt.checkInv, hunt.checkObj);
                } else if (hunt.checkObjParam !== -1) {
                    quantity = player.invTotalParam(hunt.checkInv, hunt.checkObjParam);
                }
                if (!hunt.checkHuntCondition(quantity, hunt.checkInvCondition, hunt.checkInvVal)) {
                    continue;
                }
            }
            players.push(player);
        }
        return players;
    }

    private huntNpcs(hunt: HuntType): Entity[] {
        return Array.from(new HuntIterator(World.currentTick, this.level, this.x, this.z, this.huntrange, hunt.checkVis, hunt.checkNpc, hunt.checkCategory, HuntModeType.NPC));
    }

    private huntObjs(hunt: HuntType): Entity[] {
        return Array.from(new HuntIterator(World.currentTick, this.level, this.x, this.z, this.huntrange, hunt.checkVis, hunt.checkObj, hunt.checkCategory, HuntModeType.OBJ));
    }

    private huntLocs(hunt: HuntType): Entity[] {
        return Array.from(new HuntIterator(World.currentTick, this.level, this.x, this.z, this.huntrange, hunt.checkVis, hunt.checkLoc, hunt.checkCategory, HuntModeType.SCENERY));
    }

    // ----

    playAnimation(anim: number, delay: number) {
        if (anim >= SeqType.count) {
            return;
        }

        if (anim == -1 || this.animId == -1 || SeqType.get(anim).priority > SeqType.get(this.animId).priority || SeqType.get(this.animId).priority === 0) {
            this.animId = anim;
            this.animDelay = delay;
            this.masks |= NpcInfoProt.ANIM;
        }
    }

    spotanim(spotanim: number, height: number, delay: number) {
        this.graphicId = spotanim;
        this.graphicHeight = height;
        this.graphicDelay = delay;
        this.masks |= NpcInfoProt.SPOT_ANIM;
    }

    applyDamage(damage: number, type: number) {
        this.damageTaken = damage;
        this.damageType = type;

        const current = this.levels[NpcStat.HITPOINTS];
        if (current - damage <= 0) {
            this.levels[NpcStat.HITPOINTS] = 0;
            this.damageTaken = current;
        } else {
            this.levels[NpcStat.HITPOINTS] = current - damage;
        }

        this.masks |= NpcInfoProt.DAMAGE;
    }

    say(text: string) {
        if (!text) {
            return;
        }

        this.chat = text;
        this.masks |= NpcInfoProt.SAY;
    }

    faceSquare(x: number, z: number) {
        this.focus(CoordGrid.fine(x, 1), CoordGrid.fine(z, 1), true);
    }

    get type(): number {
        return this.currentType;
    }

    changeType(type: number, duration: number, reset: boolean = true) {
        if (!this.isActive || duration < 1) {
            return;
        }
        this.currentType = type;
        this.masks |= NpcInfoProt.CHANGE_TYPE;
        this.uid = (type << 16) | this.nid;
        this.resetOnRevert = reset;

        if (type === this.baseType && this.lifecycle === EntityLifeCycle.RESPAWN) {
            this.setLifeCycle(-1);
        } else {
            this.setLifeCycle(duration);
        }
    }

    revert(): void {
        if (this.resetOnRevert) {
            World.removeNpc(this, -1);
            World.addNpc(this, -1, false);
        } else {
            this.currentType = this.baseType;
            this.masks |= NpcInfoProt.CHANGE_TYPE;
            this.uid = (this.type << 16) | this.nid;
        }
    }

    isValid(_hash64?: bigint): boolean {
        if (this.delayed) {
            return false;
        }
        return super.isValid();
    }
}
