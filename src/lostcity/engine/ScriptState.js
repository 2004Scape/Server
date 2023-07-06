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
    lastRanOn = -1;

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
    player = null;
    target = null;
    type = 'normal';
    clock = 0;

    future() {
        return this.player.delay > 0 || this.clock > World.currentTick || this.execution >= ScriptState.PAUSEBUTTON || (this.lastRanOn === World.currentTick && this.execution == ScriptState.SUSPENDED);
    }

    constructor(script, args = []) {
        this.script = script;

        for (let i = 0; i < args.length; i++) {
            const arg = args[i];

            if (typeof arg === 'number') {
                state.intLocals[i] = arg;
            } else {
                state.stringLocals[i] = arg;
            }
        }
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
