import ScriptRunner from '#lostcity/engine/script/ScriptRunner.js';
import ScriptState from '#lostcity/engine/script/ScriptState.js';
import {EntityQueueRequest, ScriptArgument} from '#lostcity/entity/EntityQueueRequest.js';
import Script from '#lostcity/engine/script/Script.js';
import PathingEntity from '#lostcity/entity/PathingEntity.js';
import ScriptProvider from '#lostcity/engine/script/ScriptProvider.js';
import ServerTriggerType from '#lostcity/engine/script/ServerTriggerType.js';
import NpcType from '#lostcity/cache/NpcType.js';
import {Interaction} from '#lostcity/entity/Interaction.js';
import {MoveRestrict} from '#lostcity/entity/MoveRestrict.js';
import {NpcMode} from '#lostcity/engine/hunt/NpcMode.js';
import World from '#lostcity/engine/World.js';
import {HuntModeType} from '#lostcity/engine/hunt/HuntModeType.js';
import Loc from '#lostcity/entity/Loc.js';
import Obj from '#lostcity/entity/Obj.js';
import LocType from '#lostcity/cache/LocType.js';
import Player from '#lostcity/entity/Player.js';

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
    despawn: number = -1;
    respawn: number = -1;

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

    mode: NpcMode = NpcMode.OFF;
    modeTarget: number = -1;

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

    randomWalk() {
        const type = NpcType.get(this.type);

        const dx = Math.round((Math.random() * (type.wanderrange * 2)) - type.wanderrange);
        const dz = Math.round((Math.random() * (type.wanderrange * 2)) - type.wanderrange);
        const destX = this.startX + dx;
        const destZ = this.startZ + dz;

        if (destX !== this.x || destZ !== this.z) {
            this.queueWalkStep(destX, destZ);
        }
    }

    processNpcModes() {
        switch (this.mode) {
            case NpcMode.OPPLAYER1: {
                const script = ScriptProvider.getByTrigger(ServerTriggerType.AI_OPPLAYER1, this.type, -1);
                const player = World.getPlayer(this.modeTarget);
                if (script && player) {
                    this.setInteraction(ServerTriggerType.AI_OPPLAYER1, player);
                    World.enqueueScript(ScriptRunner.init(script, this, player, null, []));
                }
                break;
            }
            case NpcMode.OPPLAYER2: {
                const script = ScriptProvider.getByTrigger(ServerTriggerType.AI_OPPLAYER2, this.type, -1);
                const player = World.getPlayer(this.modeTarget);
                if (script && player) {
                    this.setInteraction(ServerTriggerType.AI_OPPLAYER2, player);
                    World.enqueueScript(ScriptRunner.init(script, this, player, null, []));
                }
                break;
            }
            default: {
                if (this.moveRestrict != MoveRestrict.NOMOVE) {
                    if (Math.random() < 0.125) {
                        this.randomWalk();
                    }
                }
                break;
            }
        }
        this.updateMovement();
    }

    setInteraction(mode: ServerTriggerType, target: Player | Npc | Loc | Obj) {
        if (this.forceMove || this.delayed()) {
            return;
        }

        this.interaction = {
            mode,
            target,
            x: target.x,
            z: target.z,
            ap: true, // true so we check for existence of ap script first
            apRange: 10,
            apRangeCalled: false,
        };

        if (target instanceof Player) {
            this.faceEntity = target.pid + 32768;
            this.mask |= Npc.FACE_ENTITY;
        } else if (target instanceof Npc) {
            this.faceEntity = target.nid;
            this.mask |= Npc.FACE_ENTITY;
        } else if (target instanceof Loc) {
            const type = LocType.get(target.type);
            this.faceX = (target.x * 2) + type.width;
            this.faceZ = (target.z * 2) + type.length;
        } else {
            this.faceX = (target.x * 2) + 1;
            this.faceZ = (target.z * 2) + 1;
        }

        // if (!this.getInteractionScript(this.interaction) || this.inOperableDistance(this.interaction)) {
        //     this.interaction.ap = false;
        // }
    }

    // ----

    resetTransient() {
        // pathing entity transient.
        super.resetTransient();

        if (this.mask === 0) {
            return;
        }

        this.mask = 0;
        this.damageTaken = -1;
        this.damageType = -1;
        this.animId = -1;
        this.animDelay = -1;
        this.type = this.origType;
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
