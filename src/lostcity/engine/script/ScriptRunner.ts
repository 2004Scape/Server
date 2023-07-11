import ScriptState from '#lostcity/engine/script/ScriptState.js';
import ScriptProvider from '#lostcity/engine/script/ScriptProvider.js';
import World from '#lostcity/engine/World.js';
import path from 'path';
import { Position } from '#lostcity/entity/Position.js';
import Player from '#lostcity/entity/Player.js';
import Npc from '#lostcity/entity/Npc.js';
import ParamType from "#lostcity/cache/ParamType.js";
import Script from "#lostcity/engine/script/Script.js";
import { ScriptArgument } from "#lostcity/entity/EntityQueueRequest.js";
import NpcType from "#lostcity/cache/NpcType.js";
import StructType from "#lostcity/cache/StructType.js";
import { ParamHelper } from "#lostcity/cache/ParamHelper.js";
import LocType from '#lostcity/cache/LocType.js';
import Loc from '#lostcity/entity/Loc.js';
import SeqType from '#lostcity/cache/SeqType.js';
import FontType from '#lostcity/cache/FontType.js';
import ScriptOpcode from "#lostcity/engine/script/ScriptOpcode.js";
import ObjType from "#lostcity/cache/ObjType.js";
import CoreOps from "#lostcity/engine/script/handlers/CoreOps.js";
import ServerOps from "#lostcity/engine/script/handlers/ServerOps.js";
import PlayerOps from "#lostcity/engine/script/handlers/PlayerOps.js";
import NpcOps from "#lostcity/engine/script/handlers/NpcOps.js";
import LocOps from "#lostcity/engine/script/handlers/LocOps.js";
import ObjOps from "#lostcity/engine/script/handlers/ObjOps.js";

export type CommandHandler = (state: ScriptState) => void;
export type CommandHandlers = {
    [opcode: number]: CommandHandler
}

// script executor
export default class ScriptRunner {
    static handlers: CommandHandlers = {
        // Language required opcodes
        ...CoreOps,
        ...ServerOps,
        ...PlayerOps,
        ...NpcOps,
        ...LocOps,
        ...ObjOps,

        [ScriptOpcode.ERROR]: (state) => {
            throw new Error(state.popString());
        },

        // Server opcodes

        [ScriptOpcode.INV_ADD]: (state) => {
            let count = state.popInt();
            let obj = state.popInt();
            let inv = state.popInt();

            state.activePlayer.invAdd(inv, obj, count);
        },

        [ScriptOpcode.INV_CHANGESLOT]: (state) => {
        },

        [ScriptOpcode.INV_DEL]: (state) => {
            let count = state.popInt();
            let obj = state.popInt();
            let inv = state.popInt();

            state.activePlayer.invDel(inv, obj, count);
        },

        [ScriptOpcode.INV_GETOBJ]: (state) => {
            let slot = state.popInt();
            let inv = state.popInt();

            let obj = state.activePlayer.invGetSlot(inv, slot);
            state.pushInt(obj.id ?? -1);
        },

        [ScriptOpcode.INV_ITEMSPACE2]: (state) => {
            let size = state.popInt();
            let count = state.popInt();
            let obj = state.popInt();
            let inv = state.popInt();

            state.pushInt(0); // TODO
        },

        [ScriptOpcode.INV_MOVEITEM]: (state) => {
            let count = state.popInt();
            let obj = state.popInt();
            let toInv = state.popInt();
            let fromInv = state.popInt();
        },

        [ScriptOpcode.INV_RESENDSLOT]: (state) => {
            let slot = state.popInt();
            let inv = state.popInt();
        },

        [ScriptOpcode.INV_SETSLOT]: (state) => {
            let count = state.popInt();
            let obj = state.popInt();
            let slot = state.popInt();
            let inv = state.popInt();
            state.activePlayer.invSet(inv, obj, count, slot);
        },

        [ScriptOpcode.INV_SIZE]: (state) => {
            let inv = state.popInt();
            state.pushInt(state.activePlayer.invSize(inv) as number);
        },

        [ScriptOpcode.INV_TOTAL]: (state) => {
            let obj = state.popInt();
            let inv = state.popInt();
            state.pushInt(state.activePlayer.invTotal(inv, obj) as number);
        },

        [ScriptOpcode.INV_TRANSMIT]: (state) => {
            let com = state.popInt();
            let inv = state.popInt();

            state.activePlayer.createInv(inv);
            state.activePlayer.invListenOnCom(inv, com);
        },

        [ScriptOpcode.INV_STOPTRANSMIT]: (state) => {
            let inv = state.popInt();

            state.activePlayer.invStopListenOnCom(inv);
        },

        // Math opcodes

        [ScriptOpcode.ADD]: (state) => {
            let b = state.popInt();
            let a = state.popInt();
            state.pushInt(a + b);
        },

        [ScriptOpcode.SUB]: (state) => {
            let b = state.popInt();
            let a = state.popInt();
            state.pushInt(a - b);
        },

        [ScriptOpcode.MULTIPLY]: (state) => {
            let b = state.popInt();
            let a = state.popInt();
            state.pushInt(a * b);
        },

        [ScriptOpcode.DIVIDE]: (state) => {
            let b = state.popInt();
            let a = state.popInt();
            state.pushInt(a / b);
        },

        [ScriptOpcode.RANDOM]: (state) => {
            let a = state.popInt();
            state.pushInt(Math.random() * a);
        },

        [ScriptOpcode.RANDOMINC]: (state) => {
            let a = state.popInt();
            state.pushInt(Math.random() * (a + 1));
        },

        [ScriptOpcode.INTERPOLATE]: (state) => {
            let [y0, y1, x0, x1, x] = state.popInts(5);
            let lerp = Math.floor((y1 - y0) / (x1 - x0)) * (x - x0) + y0;

            state.pushInt(lerp);
        },

        [ScriptOpcode.MIN]: (state) => {
            let [a, b] = state.popInts(2);
            state.pushInt(Math.min(a, b));
        },

        [ScriptOpcode.TOSTRING]: (state) => {
            state.pushString(state.popInt().toString());
        },

        [ScriptOpcode.OC_PARAM]: (state) => {
            let paramId = state.popInt()
            let param = ParamType.get(paramId);
            let obj = ObjType.get(state.popInt())
            if (param.isString()) {
                state.pushString(ParamHelper.getStringParam(paramId, obj, param.defaultString));
            } else {
                state.pushInt(ParamHelper.getIntParam(paramId, obj, param.defaultInt));
            }
        },

        // ----

        [ScriptOpcode.ACTIVE_NPC]: (state) => {
            let activeNpc = state.intOperand === 0 ? state._activeNpc : state._activeNpc2;
            state.pushInt(activeNpc !== null ? 1 : 0);
        },

        [ScriptOpcode.ACTIVE_PLAYER]: (state) => {
            let activePlayer = state.intOperand === 0 ? state._activePlayer : state._activePlayer2;
            state.pushInt(activePlayer !== null ? 1 : 0);
        },

        [ScriptOpcode.ACTIVE_LOC]: (state) => {
            state.pushInt(0);
            // state.pushInt(state.activeLoc !== null ? 1 : 0);
        },

        [ScriptOpcode.ACTIVE_OBJ]: (state) => {
            state.pushInt(0);
            // state.pushInt(state.activeObj !== null ? 1 : 0);
        },
    };

    /**
     *
     * @param script
     * @param self
     * @param target
     * @param on
     * @param args
     */
    static init(script: Script, self: any = null, target: any = null, on = null, args: ScriptArgument[] | null = []) {
        let state = new ScriptState(script, args);
        state.self = self;
        state.target = target;

        if (self instanceof Player) {
            state._activePlayer = self;
        } else if (self instanceof Npc) {
            state._activeNpc = self;
        } else if (self instanceof Loc) {
            state._activeLoc = self;
        }

        if (target instanceof Player) {
            if (self instanceof Player) {
                state._activePlayer2 = target;
            } else {
                state._activePlayer = target;
            }
        } else if (target instanceof Npc) {
            if (self instanceof Npc) {
                state._activeNpc2 = target;
            } else {
                state._activeNpc = target;
            }
        } else if (target instanceof Loc) {
            if (self instanceof Loc) {
                state._activeLoc2 = target;
            } else {
                state._activeLoc = target;
            }
        }

        return state;
    }

    static execute(state: ScriptState, reset = false, benchmark = false) {
        if (!state || !state.script || !state.script.info) {
            return ScriptState.ABORTED;
        }

        try {
            if (reset) {
                state.reset();
            }

            if (state.execution !== ScriptState.RUNNING) {
                state.executionHistory.push(state.execution);
            }
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
            console.error(err);

            if (state.self instanceof Player) {
                state.self.messageGame(`script error: ${err.message}`);
                state.self.messageGame(`file: ${path.basename(state.script.info.sourceFilePath)}`);
                state.self.messageGame('');

                state.self.messageGame('stack backtrace:');
                state.self.messageGame(`    1: ${state.script.name} - ${state.script.fileName}:${state.script.lineNumber(state.pc)}`);
                for (let i = state.fp; i > 0; i--) {
                    let frame = state.frames[i];
                    if (frame) {
                        state.self.messageGame(`    ${state.fp - i + 2}: ${frame.script.name} - ${frame.script.fileName}:${frame.script.lineNumber(frame.pc)}`);
                    }
                }
            } else {
                console.error(`script error: ${err.message}`);
                console.error(`file: ${path.basename(state.script.info.sourceFilePath)}`);
                console.error('');

                console.error('stack backtrace:');
                console.error(`    1: ${state.script.name} - ${state.script.fileName}:${state.script.lineNumber(state.pc)}`);
                for (let i = state.fp; i > 0; i--) {
                    let frame = state.frames[i];
                    if (frame) {
                        console.error(`    ${state.fp - i + 2}: ${frame.script.name} - ${frame.script.fileName}:${frame.script.lineNumber(frame.pc)}`);
                    }
                }
            }

            state.execution = ScriptState.ABORTED;
        }

        return state.execution;
    }

    static executeInner(state: ScriptState, opcode: number) {
        if (!ScriptRunner.handlers[opcode]) {
            throw new Error(`Unknown opcode ${opcode}`);
        }

        ScriptRunner.handlers[opcode](state);
    }
}
