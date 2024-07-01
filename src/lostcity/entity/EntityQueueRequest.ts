import Linkable from '#jagex2/datastruct/Linkable.js';
import Script from '#lostcity/engine/script/Script.js';
import ScriptState from '#lostcity/engine/script/ScriptState.js';

export enum NpcQueueType {
    NORMAL
}

export enum PlayerQueueType {
    NORMAL,
    ENGINE,
    WEAK, // sept 2004
    STRONG, // late-2004
    SOFT // OSRS
}

export type QueueType = NpcQueueType | PlayerQueueType;
export type ScriptArgument = number | string;

export class EntityQueueRequest extends Linkable {
    /**
     * The type of queue request.
     */
    type: QueueType;

    /**
     * The script to execute.
     */
    script: Script;

    /**
     * The arguments to execute the script with.
     */
    args: ScriptArgument[];

    /**
     * The number of ticks remaining until the queue executes.
     */
    delay: number;

    lastInt: number = 0;

    constructor(type: QueueType, script: Script, args: ScriptArgument[], delay: number) {
        super();
        this.type = type;
        this.script = script;
        this.args = args;
        this.delay = delay;
    }
}

export class EntityQueueState extends Linkable {
    script: ScriptState;
    delay: number;

    constructor(script: ScriptState, delay: number) {
        super();
        this.script = script;
        this.delay = delay;
    }
}
