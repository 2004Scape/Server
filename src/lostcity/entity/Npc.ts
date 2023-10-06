import ScriptRunner from '#lostcity/engine/script/ScriptRunner.js';
import ScriptState from '#lostcity/engine/script/ScriptState.js';
import { EntityQueueRequest, ScriptArgument } from '#lostcity/entity/EntityQueueRequest.js';
import Script from '#lostcity/engine/script/Script.js';
import PathingEntity from '#lostcity/entity/PathingEntity.js';
import ScriptProvider from '#lostcity/engine/script/ScriptProvider.js';
import ServerTriggerType from '#lostcity/engine/script/ServerTriggerType.js';
import NpcType from '#lostcity/cache/NpcType.js';
import { Interaction } from '#lostcity/entity/Interaction.js';
import { MoveRestrict } from '#lostcity/entity/MoveRestrict.js';

export default class Npc extends PathingEntity {
    static ANIM = 0x2;
    static FACE_ENTITY = 0x4;
    static SAY = 0x8;
    static DAMAGE = 0x10;
    static CHANGE_TYPE = 0x20;
    static SPOTANIM = 0x40;
    static FACE_COORD = 0x80;

    // constructor properties
    nid: number;
    type: number;
    origType: number;
    startX: number;
    startZ: number;

    // runtime variables
    static: boolean = true; // static (map) or dynamic (scripted) npc

    mask: number = 0;
    faceX: number = -1;
    faceZ: number = -1;
    faceEntity: number = -1;
    damageTaken: number = -1;
    damageType: number = -1;
    currentHealth: number = 10;
    maxHealth: number = 10;

    hero: number = 0; // temp damage source

    activeScript: ScriptState | null = null;
    // script variables
    delay: number = 0;
    queue: EntityQueueRequest[] = [];
    timerInterval: number = 1;
    timerClock: number = 0;
    interaction: Interaction | null = null;

    private animId: number = -1;
    private animDelay: number = -1;
    private chat: string | null = null;
    private graphicId: number = -1;
    private graphicHeight: number = -1;
    private graphicDelay: number = -1;

    constructor(level: number, x: number, z: number, width: number, length: number, nid: number, type: number, moveRestrict: MoveRestrict) {
        super(level, x, z, width, length, moveRestrict);
        this.nid = nid;
        this.type = type;
        this.startX = this.x;
        this.startZ = this.z;
        this.origType = type;

        const npcType = NpcType.get(type);
        if (npcType.timer !== -1) {
            this.setTimer(npcType.timer);
        }
    }

    resetEntity(respawn: boolean) {
        this.resetPathingEntity();

        if (respawn) {
            this.type = this.origType;
            this.despawn = -1;
            this.respawn = -1;
        }

        if (this.mask === 0) {
            return;
        }

        this.mask = 0;
        this.damageTaken = -1;
        this.damageType = -1;
        this.animId = -1;
        this.animDelay = -1;
    }

    updateMovement(running: number = -1): void {
        if (this.tele) {
            this.walkDir = -1;
            this.runDir = -1;
            return;
        }

        if (this.x === this.lastX && this.z === this.lastZ) {
            if (running === -1 && !this.forceMove) {
                running = 0;
            }
            this.processMovement(running);
        }
    }

    delayed() {
        return this.delay > 0;
    }

    setTimer(interval: number) {
        this.timerInterval = interval;
    }

    executeScript(script: ScriptState) {
        if (!script) {
            return;
        }

        const state = ScriptRunner.execute(script);
        if (state !== ScriptState.FINISHED && state !== ScriptState.ABORTED) {
            this.activeScript = script;
        } else if (script === this.activeScript) {
            this.activeScript = null;
        }
    }

    processTimers() {
        if (this.timerInterval !== 0 && ++this.timerClock >= this.timerInterval) {
            this.timerClock = 0;

            const type = NpcType.get(this.type);
            const script = ScriptProvider.getByTrigger(ServerTriggerType.AI_TIMER, type.id, type.category);
            if (script) {
                this.executeScript(ScriptRunner.init(script, this));
            }
        }
    }

    processQueue() {
        let processedQueueCount = 0;

        for (let i = 0; i < this.queue.length; i++) {
            const queue = this.queue[i];

            // purposely only decrements the delay when the npc is not delayed
            if (!this.delayed()) {
                queue.delay--;
            }

            if (!this.delayed() && queue.delay <= 0) {
                const state = ScriptRunner.init(queue.script, this, null, null, queue.args);
                const executionState = ScriptRunner.execute(state);

                if (executionState !== ScriptState.FINISHED && executionState !== ScriptState.ABORTED) {
                    this.activeScript = state;
                }

                processedQueueCount++;
                this.queue.splice(i--, 1);
            }
        }

        return processedQueueCount;
    }

    enqueueScript(script: Script, delay = 0, args: ScriptArgument[] = []) {
        const request = new EntityQueueRequest('npc', script, args, delay + 1);
        this.queue.push(request);
    }

    randomWalk(range: number) {
        const dx = Math.round((Math.random() * (range * 2)) - range);
        const dz = Math.round((Math.random() * (range * 2)) - range);
        const destX = this.startX + dx;
        const destZ = this.startZ + dz;

        if (destX !== this.x || destZ !== this.z) {
            this.queueWalkStep(destX, destZ);
        }
    }

    processNpcModes() {
        const type = NpcType.get(this.type);

        // check if this npc does random walking
        if (type.moverestrict !== MoveRestrict.NOMOVE && Math.random() < 0.125) {
            this.randomWalk(type.wanderrange);
        }

        // TODO other npc modes

        this.updateMovement();
    }

    // ----

    playAnimation(seq: number, delay: number) {
        this.animId = seq;
        this.animDelay = delay;
        this.mask |= Npc.ANIM;
    }

    spotanim(spotanim: number, height: number, delay: number) {
        this.graphicId = spotanim;
        this.graphicHeight = height;
        this.graphicDelay = delay;
        this.mask |= Npc.SPOTANIM;
    }

    applyDamage(damage: number, type: number, hero: number) {
        this.damageTaken = damage;
        this.damageType = type;
        this.hero = hero;

        this.currentHealth -= damage;
        if (this.currentHealth < 0) {
            this.currentHealth = 0;
        }

        this.mask |= Npc.DAMAGE;
    }

    say(text: string) {
        if (!text) {
            return;
        }

        this.chat = text;
        this.mask |= Npc.SAY;
    }

    faceSquare(x: number, z: number) {
        this.faceX = x * 2 + 1;
        this.faceZ = z * 2 + 1;
        this.mask |= Npc.FACE_COORD;
    }
    
    changeType(id: number) {
        this.type = id;
        this.mask |= Npc.CHANGE_TYPE;
    }
}
