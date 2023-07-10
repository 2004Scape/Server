import ScriptOpcodes from '#lostcity/engine/ScriptOpcodes.js';
import ScriptState from '#lostcity/engine/ScriptState.js';
import ScriptProvider from '#lostcity/engine/ScriptProvider.js';
import World from '#lostcity/engine/World.js';
import path from 'path';
import { Position } from '#lostcity/entity/Position.js';
import Player from '#lostcity/entity/Player.js';
import Npc from '#lostcity/entity/Npc.js';
import ParamType from "#lostcity/cache/ParamType.js";
import Script from "#lostcity/engine/Script.js";
import { ScriptArgument } from "#lostcity/entity/EntityQueueRequest.js";
import NpcType from "#lostcity/cache/NpcType.js";
import StructType from "#lostcity/cache/StructType.js";
import { ParamHelper } from "#lostcity/cache/ParamHelper.js";
import LocType from '#lostcity/cache/LocType.js';
import Loc from '#lostcity/entity/Loc.js';
import { toInt32 } from '#lostcity/util/Numbers.js';

type CommandHandler = (state: ScriptState) => void;
type CommandHandlers = {
    [opcode: number]: CommandHandler
}

// script executor
export default class ScriptRunner {
    static handlers: CommandHandlers = {
        // Language required opcodes

        [ScriptOpcodes.PUSH_CONSTANT_INT]: (state) => {
            state.pushInt(state.intOperand);
        },

        [ScriptOpcodes.PUSH_VARP]: (state) => {
            if (state._activePlayer === null) {
                throw new Error("No active_player.")
            }
            let varp = state.intOperand;
            state.pushInt(state._activePlayer.getVarp(varp));
        },

        [ScriptOpcodes.POP_VARP]: (state) => {
            if (state._activePlayer === null) {
                throw new Error("No active_player.")
            }
            let varp = state.intOperand;
            let value = state.popInt();
            state._activePlayer.setVarp(varp, value);
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
                script: state.script,
                pc: state.pc,
                intLocals: state.intLocals,
                stringLocals: state.stringLocals,
            };

            state.pc = -1;
            state.script = proc;
            state.intLocals = intLocals;
            state.stringLocals = stringLocals;
        },

        [ScriptOpcodes.SWITCH]: (state) => {
            let key = state.popInt();
            let table = state.script.switchTables[state.intOperand];
            if (table === undefined) {
                return
            }

            let result = table[key];
            if (result) {
                state.pc += result;
            }
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

            // copy stack to locals (passing args)
            let intLocals = [];
            for (let i = 0; i < label.intArgCount; i++) {
                intLocals[label.intArgCount - i - 1] = state.popInt();
            }

            let stringLocals = [];
            for (let i = 0; i < label.stringArgCount; i++) {
                stringLocals[label.stringArgCount - i - 1] = state.popString();
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

        // ----

        [ScriptOpcodes.WEAKQUEUE]: (state) => {
            let types = state.popString();
            let count = types.length;

            let args: ScriptArgument[] = [];
            for (let i = count - 1; i >= 0; i--) {
                let type = types.charAt(i);

                if (type === 's') {
                    args[i] = state.popString();
                } else {
                    args[i] = state.popInt();
                }
            }

            let delay = state.popInt();
            let scriptId = state.popInt();

            let script = ScriptProvider.get(scriptId);
            if (script) {
                state.activePlayer.enqueueScript(script, 'weak', delay, args);
            }
        },

        [ScriptOpcodes.STRONGQUEUE]: (state) => {
            let types = state.popString();
            let count = types.length;

            let args: ScriptArgument[] = [];
            for (let i = count - 1; i >= 0; i--) {
                let type = types.charAt(i);

                if (type === 's') {
                    args[i] = state.popString();
                } else {
                    args[i] = state.popInt();
                }
            }

            let delay = state.popInt();
            let scriptId = state.popInt();

            let script = ScriptProvider.get(scriptId);
            if (script) {
                state.activePlayer.enqueueScript(script, 'strong', delay, args);
            }
        },

        // Server opcodes

        [ScriptOpcodes.ANIM]: (state) => {
            let delay = state.popInt();
            let seq = state.popInt();

            state.activePlayer.playAnimation(seq, delay);
        },

        [ScriptOpcodes.COORD]: (state) => {
            let packed = state.activePlayer.z | (state.activePlayer.x << 14) | (state.activePlayer.level << 28);
            state.pushInt(packed);
        },

        [ScriptOpcodes.INV_ADD]: (state) => {
            let count = state.popInt();
            let obj = state.popInt();
            let inv = state.popInt();

            state.activePlayer.invAdd(inv, obj, count);
        },

        [ScriptOpcodes.INV_CHANGESLOT]: (state) => {
        },

        [ScriptOpcodes.INV_DEL]: (state) => {
            let count = state.popInt();
            let obj = state.popInt();
            let inv = state.popInt();

            state.activePlayer.invDel(inv, obj, count);
        },

        [ScriptOpcodes.INV_GETOBJ]: (state) => {
            let slot = state.popInt();
            let inv = state.popInt();

            let obj = state.activePlayer.invGetSlot(inv, slot);
            state.pushInt(obj.id ?? -1);
        },

        [ScriptOpcodes.INV_ITEMSPACE2]: (state) => {
            let size = state.popInt();
            let count = state.popInt();
            let obj = state.popInt();
            let inv = state.popInt();

            state.pushInt(0); // TODO
        },

        [ScriptOpcodes.INV_MOVEITEM]: (state) => {
            let count = state.popInt();
            let obj = state.popInt();
            let toInv = state.popInt();
            let fromInv = state.popInt();
        },

        [ScriptOpcodes.INV_RESENDSLOT]: (state) => {
            let slot = state.popInt();
            let inv = state.popInt();
        },

        [ScriptOpcodes.INV_SETSLOT]: (state) => {
            let count = state.popInt();
            let obj = state.popInt();
            let slot = state.popInt();
            let inv = state.popInt();
            state.activePlayer.invSet(inv, obj, count, slot);
        },

        [ScriptOpcodes.INV_SIZE]: (state) => {
            let inv = state.popInt();
            state.pushInt(state.activePlayer.invSize(inv) as number);
        },

        [ScriptOpcodes.INV_TOTAL]: (state) => {
            let obj = state.popInt();
            let inv = state.popInt();
            state.pushInt(state.activePlayer.invTotal(inv, obj) as number);
        },

        [ScriptOpcodes.LAST_COMSUBID]: (state) => {
        },

        [ScriptOpcodes.LAST_SLOT]: (state) => {
            state.pushInt(state.activePlayer.lastVerifySlot ?? -1);
        },

        [ScriptOpcodes.MAP_CLOCK]: (state) => {
            state.pushInt(World.currentTick);
        },

        [ScriptOpcodes.MES]: (state) => {
            state.activePlayer.messageGame(state.popString());
        },

        [ScriptOpcodes.NPC_ANIM]: (state) => {
            let delay = state.popInt();
            let seq = state.popInt();

            state.activeNpc.playAnimation(seq, delay);
        },

        [ScriptOpcodes.NPC_FINDHERO]: (state) => {
            state.pushInt(state.activeNpc.hero);
        },

        [ScriptOpcodes.NPC_QUEUE]: (state) => {
            let delay = state.popInt();
            let queueId = state.popInt();

            let script = ScriptProvider.findScript(`ai_queue${queueId}`, state.activeNpc);
            if (script) {
                state.activeNpc.enqueueScript(script, delay);
            }
        },

        [ScriptOpcodes.P_OPLOC]: (state) => {
            let type = state.popInt();
            state.activePlayer.setInteraction(`oploc${type}`, state.activeLoc);
            state.activePlayer.persistent = true;
        },

        [ScriptOpcodes.NPC_RANGE]: (state) => {
            let coord = state.popInt();
            let level = (coord >> 28) & 0x3fff;
            let x = (coord >> 14) & 0x3fff;
            let z = coord & 0x3fff;

            state.pushInt(Position.distanceTo(state.activeNpc, {
                x, z, level
            }));
        },

        [ScriptOpcodes.P_DELAY]: (state) => {
            state.activePlayer.delay = state.popInt() + 1;
            state.execution = ScriptState.SUSPENDED;
        },

        [ScriptOpcodes.P_APRANGE]: (state) => {
            state.activePlayer.currentApRange = state.popInt();
            state.activePlayer.apRangeCalled = true;
        },

        [ScriptOpcodes.P_PAUSEBUTTON]: (state) => {
            state.execution = ScriptState.PAUSEBUTTON;
        },

        [ScriptOpcodes.P_TELEJUMP]: (state) => {
            let coord = state.popInt();
            let level = (coord >> 28) & 0x3fff;
            let x = (coord >> 14) & 0x3fff;
            let z = coord & 0x3fff;

            state.activePlayer.teleport(x, z, level);
        },

        [ScriptOpcodes.STAT]: (state) => {
            let stat = state.popInt();

            state.pushInt(state.activePlayer.levels[stat]);
        },

        [ScriptOpcodes.P_LOGOUT]: (state) => {
            state.activePlayer.logout();
        },

        [ScriptOpcodes.NPC_PARAM]: (state) => {
            let paramId = state.popInt();
            let param = ParamType.get(paramId);
            let npc = NpcType.get(state.activeNpc.type);
            if (param.isString()) {
                state.pushString(ParamHelper.getStringParam(paramId, npc, param.defaultString));
            } else {
                state.pushInt(ParamHelper.getIntParam(paramId, npc, param.defaultInt));
            }
        },

        [ScriptOpcodes.LOC_PARAM]: (state) => {
            let paramId = state.popInt();
            let param = ParamType.get(paramId);
            let loc = LocType.get(state.activeLoc.type);
            if (param.isString()) {
                state.pushString(ParamHelper.getStringParam(paramId, loc, param.defaultString));
            } else {
                state.pushInt(ParamHelper.getIntParam(paramId, loc, param.defaultInt));
            }
        },

        [ScriptOpcodes.STRUCT_PARAM]: (state) => {
            let [structId, paramId] = state.popInts(2);
            let param = ParamType.get(paramId);
            let struct = StructType.get(structId);
            if (param.isString()) {
                state.pushString(ParamHelper.getStringParam(paramId, struct, param.defaultString));
            } else {
                state.pushInt(ParamHelper.getIntParam(paramId, struct, param.defaultInt));
            }
        },

        [ScriptOpcodes.IF_SETCOLOUR]: (state) => {
            let colour = state.popInt();
            let com = state.popInt();

            state.activePlayer.ifSetColour(com, colour);
        },

        [ScriptOpcodes.IF_OPENBOTTOM]: (state) => {
            state.activePlayer.ifOpenBottom(state.popInt());
        },

        [ScriptOpcodes.IF_OPENSUB]: (state) => {
            let com2 = state.popInt();
            let com1 = state.popInt();

            state.activePlayer.ifOpenSub(com1, com2);
        },

        [ScriptOpcodes.IF_SETHIDE]: (state) => {
            let hidden = state.popInt();
            let com = state.popInt();

            state.activePlayer.ifSetHide(com, hidden ? true : false);
        },

        [ScriptOpcodes.IF_SETOBJECT]: (state) => {
            let zoom = state.popInt();
            let objId = state.popInt();
            let com = state.popInt();

            state.activePlayer.ifSetObject(com, objId, zoom);
        },

        [ScriptOpcodes.IF_SETTABACTIVE]: (state) => {
            state.activePlayer.ifSetTabFlash(state.popInt());
        },

        [ScriptOpcodes.IF_SETMODEL]: (state) => {
            let modelId = state.popInt();
            let com = state.popInt();

            state.activePlayer.ifSetModel(com, modelId);
        },

        [ScriptOpcodes.IF_SETMODELCOLOUR]: (state) => {
        },

        [ScriptOpcodes.IF_SETTABFLASH]: (state) => {
            state.activePlayer.ifSetTabFlash(state.popInt());
        },

        [ScriptOpcodes.IF_CLOSESUB]: (state) => {
            state.activePlayer.ifCloseSub();
        },

        [ScriptOpcodes.IF_SETANIM]: (state) => {
            let seqId = state.popInt();
            let com = state.popInt();

            state.activePlayer.ifSetAnim(com, seqId);
        },

        [ScriptOpcodes.IF_SETTAB]: (state) => {
            let tab = state.popInt();
            let com = state.popInt();

            state.activePlayer.ifSetTab(com, tab);
        },

        [ScriptOpcodes.IF_OPENTOP]: (state) => {
            state.activePlayer.ifOpenTop(state.popInt());
        },

        [ScriptOpcodes.IF_OPENSTICKY]: (state) => {
            state.activePlayer.ifOpenTop(state.popInt());
        },

        [ScriptOpcodes.IF_OPENSIDEBAR]: (state) => {
            state.activePlayer.ifOpenTop(state.popInt());
        },

        [ScriptOpcodes.IF_SETPLAYERHEAD]: (state) => {
            state.activePlayer.ifSetPlayerHead(state.popInt());
        },

        [ScriptOpcodes.IF_SETTEXT]: (state) => {
            let text = state.popString();
            let com = state.popInt();

            state.activePlayer.ifSetText(com, text);
        },

        [ScriptOpcodes.IF_SETNPCHEAD]: (state) => {
            let npcId = state.popInt();
            let com = state.popInt();

            state.activePlayer.ifSetNpcHead(com, npcId);
        },

        [ScriptOpcodes.IF_SETPOSITION]: (state) => {
        },

        [ScriptOpcodes.IF_MULTIZONE]: (state) => {
            state.activePlayer.ifMultiZone(state.popInt() ? true : false);
        },

        [ScriptOpcodes.INV_TRANSMIT]: (state) => {
            let com = state.popInt();
            let inv = state.popInt();

            state.activePlayer.createInv(inv);
            state.activePlayer.invListenOnCom(inv, com);
        },

        [ScriptOpcodes.INV_STOPTRANSMIT]: (state) => {
            let inv = state.popInt();

            state.activePlayer.invStopListenOnCom(inv);
        },

        // ----

        [ScriptOpcodes.ERROR]: (state) => {
            const self = state.activePlayer;

            self.messageGame(`Error: ${state.popString()}`);
        },

        [ScriptOpcodes.GIVEXP]: (state) => {
            const self = state.activePlayer;

            let xp = state.popInt();
            let stat = state.popInt();

            self.giveXp(stat, xp);
        },

        [ScriptOpcodes.NPC_DAMAGE]: (state) => {
            let amount = state.popInt();
            let type = state.popInt();

            state.activeNpc.applyDamage(amount, type, state.activePlayer.pid);
        },

        [ScriptOpcodes.DAMAGE]: (state) => {
            let amount = state.popInt();
            let type = state.popInt();
            let uid = state.popInt();

            World.getPlayer(uid)!.applyDamage(amount, type); // TODO (jkm) consider whether we want to use ! here
        },

        // Math opcodes

        [ScriptOpcodes.ADD]: (state) => {
            let b = state.popInt();
            let a = state.popInt();
            state.pushInt(a + b);
        },

        [ScriptOpcodes.SUB]: (state) => {
            let b = state.popInt();
            let a = state.popInt();
            state.pushInt(a - b);
        },

        [ScriptOpcodes.MULTIPLY]: (state) => {
            let b = state.popInt();
            let a = state.popInt();
            state.pushInt(a * b);
        },

        [ScriptOpcodes.DIVIDE]: (state) => {
            let b = state.popInt();
            let a = state.popInt();
            state.pushInt(a / b);
        },

        [ScriptOpcodes.RANDOM]: (state) => {
            let a = state.popInt();
            state.pushInt(Math.random() * a);
        },

        [ScriptOpcodes.RANDOMINC]: (state) => {
            let a = state.popInt();
            state.pushInt(Math.random() * (a + 1));
        },

        [ScriptOpcodes.INTERPOLATE]: (state) => {
            let [y0, y1, x0, x1, x] = state.popInts(5);
            let lerp = y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);

            state.pushInt(toInt32(lerp));
        },

        [ScriptOpcodes.MIN]: (state) => {
            let [a, b] = state.popInts(2);
            state.pushInt(Math.min(a, b));
        },

        [ScriptOpcodes.TOSTRING]: (state) => {
            state.pushString(state.popInt().toString());
        },

        // ----

        [ScriptOpcodes.ACTIVE_NPC]: (state) => {
            state.pushInt(state.activeNpc !== null ? 1 : 0);
        },

        [ScriptOpcodes.ACTIVE_PLAYER]: (state) => {
            state.pushInt(state.activePlayer !== null ? 1 : 0);
        },

        [ScriptOpcodes.ACTIVE_LOC]: (state) => {
            state.pushInt(0);
            // state.pushInt(state.activeLoc !== null ? 1 : 0);
        },

        [ScriptOpcodes.ACTIVE_OBJ]: (state) => {
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
                    state.self.messageGame(`    ${state.fp - i + 2}: ${frame.script.name} - ${frame.script.fileName}:${frame.script.lineNumber(frame.pc)}`);
                }
            } else {
                console.error(`script error: ${err.message}`);
                console.error(`file: ${path.basename(state.script.info.sourceFilePath)}`);
                console.error('');

                console.error('stack backtrace:');
                console.error(`    1: ${state.script.name} - ${state.script.fileName}:${state.script.lineNumber(state.pc)}`);
                for (let i = state.fp; i > 0; i--) {
                    let frame = state.frames[i];
                    console.error(`    ${state.fp - i + 2}: ${frame.script.name} - ${frame.script.fileName}:${frame.script.lineNumber(frame.pc)}`);
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
