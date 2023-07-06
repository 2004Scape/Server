import ScriptOpcodes from '#lostcity/engine/ScriptOpcodes.js';
import ScriptState from '#lostcity/engine/ScriptState.js';
import ScriptProvider from '#lostcity/engine/ScriptProvider.js';
import World from '#lostcity/engine/World.js';
import path from 'path';
import { Position } from '#lostcity/entity/Position.js';
import Player from '#lostcity/entity/Player.js';

// script executor
export default class ScriptRunner {
    static handlers = {
        // Language required opcodes

        [ScriptOpcodes.PUSH_CONSTANT_INT]: (state) => {
            state.pushInt(state.intOperand);
        },

        [ScriptOpcodes.PUSH_CONSTANT_STRING]: (state) => {
            state.pushString(state.stringOperand);
        },

        [ScriptOpcodes.BRANCH]: (state) => {
            state.pc += state.intOperand;
        },

        [ScriptOpcodes.BRANCH_NOT]: (state) => {
            let b = state.popInt();
            let a = state.popInt();

            if (a !== b) {
                state.pc += state.intOperand;
            }
        },

        [ScriptOpcodes.BRANCH_EQUALS]: (state) => {
            let b = state.popInt();
            let a = state.popInt();

            if (a === b) {
                state.pc += state.intOperand;
            }
        },

        [ScriptOpcodes.BRANCH_LESS_THAN]: (state) => {
            let b = state.popInt();
            let a = state.popInt();

            if (a < b) {
                state.pc += state.intOperand;
            }
        },

        [ScriptOpcodes.BRANCH_GREATER_THAN]: (state) => {
            let b = state.popInt();
            let a = state.popInt();

            if (a > b) {
                state.pc += state.intOperand;
            }
        },

        [ScriptOpcodes.RETURN]: (state) => {
            if (state.fp === 0) {
                state.execution = ScriptState.FINISHED;
                return;
            }

            let frame = state.frames[--state.fp];
            state.pc = frame.pc;
            state.script = frame.script;
            state.intLocals = frame.intLocals;
            state.stringLocals = frame.stringLocals;
        },

        [ScriptOpcodes.BRANCH_LESS_THAN_OR_EQUALS]: (state) => {
            let b = state.popInt();
            let a = state.popInt();

            if (a <= b) {
                state.pc += state.intOperand;
            }
        },

        [ScriptOpcodes.BRANCH_GREATER_THAN_OR_EQUALS]: (state) => {
            let b = state.popInt();
            let a = state.popInt();

            if (a >= b) {
                state.pc += state.intOperand;
            }
        },

        [ScriptOpcodes.PUSH_INT_LOCAL]: (state) => {
            state.pushInt(state.intLocals[state.intOperand]);
        },

        [ScriptOpcodes.POP_INT_LOCAL]: (state) => {
            state.intLocals[state.intOperand] = state.popInt();
        },

        [ScriptOpcodes.PUSH_STRING_LOCAL]: (state) => {
            state.pushString(state.stringLocals[state.intOperand]);
        },

        [ScriptOpcodes.POP_STRING_LOCAL]: (state) => {
            state.stringLocals[state.intOperand] = state.popString();
        },

        [ScriptOpcodes.JOIN_STRING]: (state) => {
            let count = state.intOperand;

            let strings = [];
            for (let i = 0; i < count; i++) {
                strings.push(state.popString());
            }

            state.pushString(strings.reverse().join(''));
        },

        [ScriptOpcodes.POP_INT_DISCARD]: (state) => {
            state.isp--;
        },

        [ScriptOpcodes.POP_STRING_DISCARD]: (state) => {
            state.ssp--;
        },

        [ScriptOpcodes.GOSUB_WITH_PARAMS]: (state) => {
            let procId = state.intOperand;
            let proc = ScriptProvider.get(procId);
            if (!proc) {
                throw new Error('Invalid gosub proc ' + procId);
            }

            if (state.fp >= 50) {
                throw new Error('Stack overflow');
            }

            // copy stack to locals (passing args)
            let intLocals = [];
            for (let i = 0; i < proc.intArgCount; i++) {
                intLocals[proc.intArgCount - i - 1] = state.popInt();
            }

            let stringLocals = [];
            for (let i = 0; i < proc.stringArgCount; i++) {
                stringLocals[proc.stringArgCount - i - 1] = state.popString();
            }

            state.frames[state.fp++] = {
                pc: state.pc,
                script: state.script,
                intLocals: state.intLocals,
                stringLocals: state.stringLocals,
            };

            state.pc = -1;
            state.script = proc;
            state.intLocals = intLocals;
            state.stringLocals = stringLocals;
        },

        [ScriptOpcodes.SWITCH]: (state) => {
            let table = state.script.switchTables[state.intOperand];
            let key = state.popInt();
            let result = table[key];
            pc += result;
        },

        [ScriptOpcodes.JUMP]: (state) => {
            let labelId = state.intOperand;
            let label = ScriptProvider.get(labelId);
            if (!label) {
                throw new Error('Invalid jump label ' + labelId);
            }

            state.script = label;
            state.pc = -1;
            state.frames = [];
            state.fp = 0;
            state.intStack = [];
            state.isp = 0;
            state.stringStack = [];
            state.ssp = 0;
            state.intLocals = [];
            state.stringLocals = [];
        },

        [ScriptOpcodes.JUMP_WITH_PARAMS]: (state) => {
            let labelId = state.intOperand;
            let label = ScriptProvider.get(labelId);
            if (!label) {
                throw new Error('Invalid jump label ' + labelId);
            }

            state.script = label;
            state.pc = -1;
            state.frames = [];
            state.fp = 0;
            state.intStack = [];
            state.isp = 0;
            state.stringStack = [];
            state.ssp = 0;
            state.intLocals = [];
            state.stringLocals = [];
        },

        [ScriptOpcodes.ERROR]: (state) => {
            throw new Error(state.popString());
        },

        // Server opcodes

        [ScriptOpcodes.ANIM]: (state) => {
            let delay = state.popInt();
            let seq = state.popInt();

            state.player.playAnimation(seq, delay);
        },

        [ScriptOpcodes.COORD]: (state) => {
            // TODO: should pack this into a single int
            state.pushString(JSON.stringify({
                x: state.player.x,
                z: state.player.z,
                level: state.player.level,
            }));
        },

        [ScriptOpcodes.INV_TOTAL]: (state) => {
        },

        [ScriptOpcodes.INV_ADD]: (state) => {
            const player = state.player;

            let count = state.popInt();
            let obj = state.popInt();
            let inv = state.popInt();

            player.invAdd(inv, obj, count);
        },

        [ScriptOpcodes.INV_DEL]: (state) => {
            const player = state.player;

            let count = state.popInt();
            let obj = state.popInt();
            let inv = state.popInt();

            player.invDel(inv, obj, count);
        },

        [ScriptOpcodes.LAST_COMSUBID]: (state) => {
        },

        [ScriptOpcodes.MAP_CLOCK]: (state) => {
            state.pushInt(World.currentTick);
        },

        [ScriptOpcodes.MES]: (state) => {
            const player = state.player;

            player.messageGame(state.popString());
        },

        [ScriptOpcodes.NPC_RANGE]: (state) => {
            let coord = JSON.parse(state.popString());

            state.pushInt(Position.distanceTo(state.subject, coord));
        },

        [ScriptOpcodes.P_DELAY]: (state) => {
            const player = state.player;

            let delay = state.popInt();
            player.delay = delay + 1;

            state.execution = ScriptState.SUSPENDED;
        },

        [ScriptOpcodes.P_APRANGE]: (state) => {
            const player = state.player;

            player.currentApRange = state.popInt();
            player.apRangeCalled = true;
        },

        [ScriptOpcodes.P_PAUSEBUTTON]: (state) => {
        },

        // ----

        [ScriptOpcodes.IF_CHATSELECT]: (state) => {
        },

        [ScriptOpcodes.CHATNPC]: (state) => {
        },

        [ScriptOpcodes.ERROR]: (state) => {
            const player = state.player;

            player.messageGame(`Error: ${state.popString()}`);
        },

        [ScriptOpcodes.CHATPLAYER]: (state) => {
        },

        [ScriptOpcodes.OBJBOX]: (state) => {
        },

        [ScriptOpcodes.GIVEXP]: (state) => {
            const player = state.player;

            let xp = state.popInt();
            let stat = state.popInt();

            player.giveXp(stat, xp);
        },

        [ScriptOpcodes.NPC_DAMAGE]: (state) => {
            let amount = state.popInt();
            let type = state.popInt();

            state.subject.applyDamage(amount, type);
        },

        // Math opcodes

        [ScriptOpcodes.ADD]: (state) => {
            let b = state.popInt();
            let a = state.popInt();
            state.intStack[state.isp++] = a + b;
        },

        [ScriptOpcodes.SUB]: (state) => {
            let b = state.popInt();
            let a = state.popInt();
            state.intStack[state.isp++] = a - b;
        },

        [ScriptOpcodes.MULTIPLY]: (state) => {
            let b = state.popInt();
            let a = state.popInt();
            state.intStack[state.isp++] = a * b;
        },

        [ScriptOpcodes.DIVIDE]: (state) => {
            let b = state.popInt();
            let a = state.popInt();
            state.intStack[state.isp++] = a / b;
        },

        [ScriptOpcodes.RANDOM]: (state) => {
            let a = state.popInt();
            state.intStack[state.isp++] = Math.floor(Math.random() * a);
        },

        [ScriptOpcodes.RANDOMINC]: (state) => {
            let a = state.popInt();
            state.intStack[state.isp++] = Math.floor(Math.random() * (a + 1));
        },
    };

    static init(script, player = null, subject = null, on = null) {
        if (!script) {
            return null;
        }

        let state = new ScriptState(script);
        state.player = player;
        state.subject = subject;
        state.on = on;
        return state;
    }

    static execute(state, reset = false, benchmark = false) {
        if (!state) {
            return ScriptState.ABORTED;
        }

        try {
            if (reset) {
                state.reset();
            }

            state.lastRanOn = World.currentTick;
            state.execution = ScriptState.RUNNING;

            while (state.execution === ScriptState.RUNNING) {
                if (state.pc >= state.script.opcodes.length || state.pc < -1) {
                    throw new Error('Invalid program counter: ' + state.pc + ', max expected: ' + state.script.opcodes.length);
                }

                // if we're benchmarking we don't care about the opcount
                if (!benchmark && state.opcount > 500_000) {
                    throw new Error('Too many instructions');
                }

                state.opcount++;
                ScriptRunner.executeInner(state, state.script.opcodes[++state.pc]);
            }
        } catch (err) {
            state.player.messageGame(`script error: ${err.message}`);
            state.player.messageGame(`file: ${path.basename(state.script.info.sourceFilePath)}`);
            state.player.messageGame('');

            state.player.messageGame('stack backtrace:');
            state.player.messageGame(`    1: ${state.script.name} - ${state.script.fileName}:${state.script.lineNumber(state.pc)}`);
            for (let i = state.fp; i > 0; i--) {
                let frame = state.frames[i];
                state.player.messageGame(`    ${state.fp - i + 2}: ${frame.script.name} - ${frame.script.fileName}:${frame.script.lineNumber(frame.pc)}`);
            }

            state.execution = ScriptState.ABORTED;
        }

        return state.execution;
    }

    static executeInner(state, opcode) {
        if (!ScriptRunner.handlers[opcode]) {
            throw new Error(`Unknown opcode ${opcode}`);
        }

        ScriptRunner.handlers[opcode](state);
    }
}
