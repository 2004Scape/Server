// script state (maintains serverscript control flow)
import Npc from "#lostcity/entity/Npc";
import Player from "#lostcity/entity/Player";
import Script from "#lostcity/engine/Script";

export interface GosubStackFrame {
    script: Script,
    pc: number,
    intLocals: number[],
    stringLocals: string[],
}

export default class ScriptState {
    static RUNNING = 0;
    static SUSPENDED = 1;
    static FINISHED = 2;
    static ABORTED = 3;

    // engine states
    static PAUSEBUTTON = 4;

    // interpreter
    script: Script;
    execution = ScriptState.RUNNING;

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

    constructor(script: Script, args = []) {
        this.script = script;

        for (let i = 0; i < args.length; i++) {
            const arg = args[i];

            if (typeof arg === 'number') {
                this.intLocals.push(arg);
            } else {
                this.stringLocals.push(arg);
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
        throw new Error("Attempt to access null active_loc");
    }

    get intOperand(): number {
        return this.script.intOperands[this.pc];
    }

    get stringOperand(): string {
        return this.script.stringOperands[this.pc];
    }

    popInt(): number {
        return this.intStack[--this.isp] ?? 0;
    }

    pushInt(value: number) {
        this.intStack[this.isp++] = value;
    }

    popString(): string {
        return this.stringStack[--this.ssp] ?? "";
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
