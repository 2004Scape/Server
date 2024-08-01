import { ScriptArgument } from '#lostcity/entity/EntityQueueRequest.js';
import ScriptFile from '#lostcity/engine/script/ScriptFile.js';

export enum NpcTimerType {
    NPC
}

export enum PlayerTimerType {
    NORMAL,
    SOFT
}

export type TimerType = NpcTimerType | PlayerTimerType;

export interface EntityTimer {
    /**
     * The type of the timer.
     */
    type: TimerType;

    /**
     * The script to execute.
     */
    script: ScriptFile;

    /**
     * The arguments to execute the script with.
     */
    args: ScriptArgument[] | null;

    /**
     * The time interval between executions.
     */
    interval: number;

    /**
     * Tracks the time until execution.
     */
    clock: number;
}
