// script state (maintains serverscript control flow)
import Npc from "#lostcity/entity/Npc.js";
import Player from "#lostcity/entity/Player.js";
import Script from "#lostcity/engine/script/Script.js";
import { ScriptArgument } from "#lostcity/entity/EntityQueueRequest.js";
import { toInt32 } from "#lostcity/util/Numbers.js";
import Loc from '#lostcity/entity/Loc.js';

export interface GosubStackFrame {
    script: Script,
    pc: number,
    intLocals: number[],
    stringLocals: string[],
}

export default class ScriptState {
    static ABORTED = -1;
    static RUNNING = 0;
    static FINISHED = 1;
    static SUSPENDED = 2;
    static PAUSEBUTTON = 3;
    static COUNTDIALOG = 4;

    // interpreter
    script: Script;
    execution = ScriptState.RUNNING;
    executionHistory: number[] = [];

    pc = -1; // program counter
    opcount = 0; // number of opcodes executed

    frames: GosubStackFrame[] = [];
    fp = 0; // frame pointer

    intStack: (number | null)[] = [];
    isp = 0; // int stack pointer

    stringStack: (string | null)[] = [];
    ssp = 0; // string stack pointer

    intLocals: number[] = [];
    stringLocals: string[] = [];

    // server
    /**
     * The primary entity.
     */
    self: any | null = null;

    /**
     * @deprecated
     */
    target: any | null = null;

    // active entities
    /**
     * The primary active player.
     */
    _activePlayer: Player | null = null;

    /**
     * The secondary active player.
     * @type {Player|null}
     */
    _activePlayer2: Player | null = null;

    /**
     * The primary active npc.
     */
    _activeNpc: Npc | null = null;

    /**
     * The secondary active npc.
     */
    _activeNpc2: Npc | null = null;

    /**
     * The primary active loc.
     */
    _activeLoc: Loc | null = null;

    /**
     * The secondary active loc.
     */
    _activeLoc2: Loc | null = null;

    /**
     * Used for string splitting operations with split_init and related commands.
     */
    splittedPages: string[][] = [];

    constructor(script: Script, args: ScriptArgument[] | null = []) {
        this.script = script;

        if (args) {
            for (let i = 0; i < args.length; i++) {
                const arg = args[i];

                if (typeof arg === 'number') {
                    this.intLocals.push(arg);
                } else {
                    this.stringLocals.push(arg);
                }
            }
        }
    }

    /**
     * Gets the active player. Automatically checks the operand to determine primary and secondary.
     */
    get activePlayer() {
        const player = this.intOperand === 0 ? this._activePlayer : this._activePlayer2;
        if (player === null) {
            throw new Error("Attempt to access null active_player");
        }
        return player;
    }

    /**
     * Gets the active npc. Automatically checks the operand to determine primary and secondary.
     */
    get activeNpc() {
        const npc = this.intOperand === 0 ? this._activeNpc : this._activeNpc2;
        if (npc === null) {
            throw new Error("Attempt to access null active_npc");
        }
        return npc;
    }

    /**
     * Gets the active location. Automatically checks the operand to determine primary and secondary.
     */
    get activeLoc() {
        const loc = this.intOperand === 0 ? this._activeLoc : this._activeLoc2;
        if (loc === null) {
            throw new Error("Attempt to access null active_loc");
        }
        return loc;
    }

    get intOperand(): number {
        return this.script.intOperands[this.pc];
    }

    get stringOperand(): string {
        return this.script.stringOperands[this.pc];
    }

    popInt(): number {
        const value = this.intStack[--this.isp];
        if (!value) {
            return 0;
        }
        return toInt32(value);
    }

    popInts(amount: number): number[] {
        let ints = Array<number>(amount);
        for (let i = amount - 1; i >= 0; i--) {
            ints[i] = this.popInt();
        }
        return ints;
    }

    pushInt(value: number) {
        this.intStack[this.isp++] = toInt32(value);
    }

    popString(): string {
        return this.stringStack[--this.ssp] ?? "";
    }

    popStrings(amount: number): string[] {
        let strings = Array<string>(amount);
        for (let i = amount - 1; i >= 0; i--) {
            strings[i] = this.popString();
        }
        return strings;
    }

    pushString(value: string) {
        this.stringStack[this.ssp++] = value;
    }

    reset() {
        this.pc = -1;
        this.frames = [];
        this.fp = 0;
        this.intStack = [];
        this.isp = 0;
        this.stringStack = [];
        this.ssp = 0;
        this.intLocals = [];
        this.stringLocals = [];
    }
}
