import World from '#lostcity/engine/World.js';

// script state (maintains serverscript control flow)
export default class ScriptState {
    static RUNNING = 0;
    static SUSPENDED = 1;
    static FINISHED = 2;
    static ABORTED = 3;

    // engine states
    static PAUSEBUTTON = 4;

    // interpreter
    script = null;
    execution = ScriptState.RUNNING;

    pc = -1; // program counter
    opcount = 0; // number of opcodes executed

    frames = [];
    fp = 0; // frame pointer

    intStack = [];
    isp = 0; // int stack pointer

    stringStack = [];
    ssp = 0; // string stack pointer

    intLocals = [];
    stringLocals = [];

    // server
    /**
     * The primary entity.
     *
     * @type {Player|Npc|null}
     */
    self = null;

    /**
     * @deprecated
     * @type {any|null}
     */
    target = null;

    // active entities
    /**
     * The primary active player.
     * @type {Player|null}
     */
    _activePlayer = null;

    /**
     * The secondary active player.
     * @type {Player|null}
     */
    _activePlayer2 = null;

    /**
     * The primary active npc.
     * @type {Npc|null}
     */
    _activeNpc = null;

    /**
     * The secondary active npc.
     * @type {Npc|null}
     */
    _activeNp2 = null;

    constructor(script, args = []) {
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
     * @type {Player|null}
     */
    get activePlayer() {
        if (this.intOperand === 0) {
            return this._activePlayer;
        }
        return this._activePlayer2;
    }

    /**
     * Gets the active npc. Automatically checks the operand to determine primary and secondary.
     * @type {Npc|null}
     */
    get activeNpc() {
        if (this.intOperand === 0) {
            return this._activeNpc;
        }
        return this._activeNp2;
    }

    /**
     * Gets the active location. Automatically checks the operand to determine primary and secondary.
     * @type {any|null}
     */
    get activeLoc() {
        if (this.intOperand === 0) {
            // TODO _activeLoc
            return this.target;
        }
        // TODO _activeLoc2
        return this.target;
    }

    get intOperand() {
        return this.script.intOperands[this.pc];
    }

    get stringOperand() {
        return this.script.stringOperands[this.pc];
    }

    popInt() {
        return this.intStack[--this.isp];
    }

    pushInt(value) {
        this.intStack[this.isp++] = value;
    }

    popString() {
        return this.stringStack[--this.ssp];
    }

    pushString(value) {
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
