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
import SeqType from '#lostcity/cache/SeqType.js';
import FontType from '#lostcity/cache/FontType.js';
import ScriptOpcode from "#lostcity/engine/ScriptOpcode.js";

type CommandHandler = (state: ScriptState) => void;
type CommandHandlers = {
    [opcode: number]: CommandHandler
}

// script executor
export default class ScriptRunner {
    static handlers: CommandHandlers = {
        // Language required opcodes

        [ScriptOpcode.PUSH_CONSTANT_INT]: (state) => {
            state.pushInt(state.intOperand);
        },

        [ScriptOpcode.PUSH_VARP]: (state) => {
            if (state._activePlayer === null) {
                throw new Error("No active_player.")
            }
            let varp = state.intOperand;
            state.pushInt(state._activePlayer.getVarp(varp));
        },

        [ScriptOpcode.POP_VARP]: (state) => {
            if (state._activePlayer === null) {
                throw new Error("No active_player.")
            }
            let varp = state.intOperand;
            let value = state.popInt();
            state._activePlayer.setVarp(varp, value);
        },

        [ScriptOpcode.PUSH_CONSTANT_STRING]: (state) => {
            state.pushString(state.stringOperand);
        },

        [ScriptOpcode.BRANCH]: (state) => {
            state.pc += state.intOperand;
        },

        [ScriptOpcode.BRANCH_NOT]: (state) => {
            let b = state.popInt();
            let a = state.popInt();

            if (a !== b) {
                state.pc += state.intOperand;
            }
        },

        [ScriptOpcode.BRANCH_EQUALS]: (state) => {
            let b = state.popInt();
            let a = state.popInt();

            if (a === b) {
                state.pc += state.intOperand;
            }
        },

        [ScriptOpcode.BRANCH_LESS_THAN]: (state) => {
            let b = state.popInt();
            let a = state.popInt();

            if (a < b) {
                state.pc += state.intOperand;
            }
        },

        [ScriptOpcode.BRANCH_GREATER_THAN]: (state) => {
            let b = state.popInt();
            let a = state.popInt();

            if (a > b) {
                state.pc += state.intOperand;
            }
        },

        [ScriptOpcode.RETURN]: (state) => {
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

        [ScriptOpcode.BRANCH_LESS_THAN_OR_EQUALS]: (state) => {
            let b = state.popInt();
            let a = state.popInt();

            if (a <= b) {
                state.pc += state.intOperand;
            }
        },

        [ScriptOpcode.BRANCH_GREATER_THAN_OR_EQUALS]: (state) => {
            let b = state.popInt();
            let a = state.popInt();

            if (a >= b) {
                state.pc += state.intOperand;
            }
        },

        [ScriptOpcode.PUSH_INT_LOCAL]: (state) => {
            state.pushInt(state.intLocals[state.intOperand]);
        },

        [ScriptOpcode.POP_INT_LOCAL]: (state) => {
            state.intLocals[state.intOperand] = state.popInt();
        },

        [ScriptOpcode.PUSH_STRING_LOCAL]: (state) => {
            state.pushString(state.stringLocals[state.intOperand]);
        },

        [ScriptOpcode.POP_STRING_LOCAL]: (state) => {
            state.stringLocals[state.intOperand] = state.popString();
        },

        [ScriptOpcode.JOIN_STRING]: (state) => {
            let count = state.intOperand;

            let strings = [];
            for (let i = 0; i < count; i++) {
                strings.push(state.popString());
            }

            state.pushString(strings.reverse().join(''));
        },

        [ScriptOpcode.POP_INT_DISCARD]: (state) => {
            state.isp--;
        },

        [ScriptOpcode.POP_STRING_DISCARD]: (state) => {
            state.ssp--;
        },

        [ScriptOpcode.GOSUB_WITH_PARAMS]: (state) => {
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

        [ScriptOpcode.SWITCH]: (state) => {
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

        [ScriptOpcode.JUMP]: (state) => {
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

        [ScriptOpcode.JUMP_WITH_PARAMS]: (state) => {
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

        [ScriptOpcode.ERROR]: (state) => {
            throw new Error(state.popString());
        },

        // ----

        [ScriptOpcode.WEAKQUEUE]: (state) => {
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

        [ScriptOpcode.STRONGQUEUE]: (state) => {
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

        [ScriptOpcode.ANIM]: (state) => {
            let delay = state.popInt();
            let seq = state.popInt();

            state.activePlayer.playAnimation(seq, delay);
        },

        [ScriptOpcode.COORD]: (state) => {
            let packed = state.activePlayer.z | (state.activePlayer.x << 14) | (state.activePlayer.level << 28);
            state.pushInt(packed);
        },

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

        [ScriptOpcode.LAST_COMSUBID]: (state) => {
        },

        [ScriptOpcode.LAST_SLOT]: (state) => {
            state.pushInt(state.activePlayer.lastVerifySlot ?? -1);
        },

        [ScriptOpcode.MAP_CLOCK]: (state) => {
            state.pushInt(World.currentTick);
        },

        [ScriptOpcode.MES]: (state) => {
            state.activePlayer.messageGame(state.popString());
        },

        [ScriptOpcode.NPC_ANIM]: (state) => {
            let delay = state.popInt();
            let seq = state.popInt();

            state.activeNpc.playAnimation(seq, delay);
        },

        [ScriptOpcode.NPC_FINDHERO]: (state) => {
            state.pushInt(state.activeNpc.hero);
        },

        [ScriptOpcode.NPC_QUEUE]: (state) => {
            let delay = state.popInt();
            let queueId = state.popInt();

            let script = ScriptProvider.findScript(`ai_queue${queueId}`, state.activeNpc);
            if (script) {
                state.activeNpc.enqueueScript(script, delay);
            }
        },

        [ScriptOpcode.P_OPLOC]: (state) => {
            let type = state.popInt();
            state.activePlayer.setInteraction(`oploc${type}`, state.activeLoc);
            state.activePlayer.persistent = true;
        },

        [ScriptOpcode.NPC_RANGE]: (state) => {
            let coord = state.popInt();
            let level = (coord >> 28) & 0x3fff;
            let x = (coord >> 14) & 0x3fff;
            let z = coord & 0x3fff;

            state.pushInt(Position.distanceTo(state.activeNpc, {
                x, z, level
            }));
        },

        [ScriptOpcode.P_DELAY]: (state) => {
            state.activePlayer.delay = state.popInt() + 1;
            state.execution = ScriptState.SUSPENDED;
        },

        [ScriptOpcode.P_APRANGE]: (state) => {
            state.activePlayer.currentApRange = state.popInt();
            state.activePlayer.apRangeCalled = true;
        },

        [ScriptOpcode.P_PAUSEBUTTON]: (state) => {
            state.execution = ScriptState.SUSPENDED;
        },

        [ScriptOpcode.P_TELEJUMP]: (state) => {
            let coord = state.popInt();
            let level = (coord >> 28) & 0x3fff;
            let x = (coord >> 14) & 0x3fff;
            let z = coord & 0x3fff;

            state.activePlayer.teleport(x, z, level);
        },

        [ScriptOpcode.SEQLENGTH]: (state) => {
            let seq = state.popInt();

            state.pushInt(SeqType.get(seq).duration);
        },

        [ScriptOpcode.SPLIT_INIT]: (state) => {
            let [maxWidth, linesPerPage, fontId] = state.popInts(3);
            let text = state.popString();

            let font = FontType.get(fontId);

            state.splittedPages = [];
            let page = 0;

            // first, we need to split lines on each pipe character
            let lines = text.split('|');

            // next, we need to check if any lines exceed maxWidth and put them on a new line immediately following
            for (let line of lines) {
                while (line.length > 0) {
                    if (!state.splittedPages[page]) {
                        state.splittedPages[page] = [];
                    }

                    // 1) if the string is too long, we may have to split it
                    let width = font.stringWidth(line);
                    if (width <= maxWidth) {
                        state.splittedPages[page].push(line);
                        break;
                    }

                    // 2) we need to split on the next word boundary
                    let splitIndex = line.length;
                    let splitWidth = width;
    
                    // check the width at every space to see where we can cut the line
                    for (let i = 0; i < line.length; i++) {
                        if (line[i] === ' ') {
                            let w = font.stringWidth(line.substring(0, i));

                            if (w <= maxWidth) {
                                splitIndex = i;
                                splitWidth = w;
                            } else {
                                break;
                            }
                        }
                    }

                    state.splittedPages[page].push(line.substring(0, splitIndex));
                    line = line.substring(splitIndex + 1);

                    if (state.splittedPages[page].length >= linesPerPage) {
                        page++;
                    }
                }
            }
        },

        [ScriptOpcode.SPLIT_PAGECOUNT]: (state) => {
            state.pushInt(state.splittedPages.length);
        },

        [ScriptOpcode.SPLIT_LINECOUNT]: (state) => {
            let page = state.popInt();

            state.pushInt(state.splittedPages[page].length);
        },

        [ScriptOpcode.SPLIT_GET]: (state) => {
            let [page, line] = state.popInts(2);

            state.pushString(state.splittedPages[page][line]);
        },

        [ScriptOpcode.STAT]: (state) => {
            let stat = state.popInt();

            state.pushInt(state.activePlayer.levels[stat]);
        },

        [ScriptOpcode.STAT_BASE]: (state) => {
            let stat = state.popInt();

            state.pushInt(state.activePlayer.baseLevel[stat]);
        },

        [ScriptOpcode.STAT_RANDOM]: (state) => {
            let [level, low, high] = state.popInts(3);

            let value = Math.floor(low * (99 - level) / 98) + Math.floor(high * (level - 1) / 98) + 1;
            let chance = Math.floor(Math.random() * 256);

            state.pushInt(value > chance ? 1 : 0);
        },

        [ScriptOpcode.P_LOGOUT]: (state) => {
            state.activePlayer.logout();
        },

        [ScriptOpcode.NPC_PARAM]: (state) => {
            let paramId = state.popInt();
            let param = ParamType.get(paramId);
            let npc = NpcType.get(state.activeNpc.type);
            if (param.isString()) {
                state.pushString(ParamHelper.getStringParam(paramId, npc, param.defaultString));
            } else {
                state.pushInt(ParamHelper.getIntParam(paramId, npc, param.defaultInt));
            }
        },

        [ScriptOpcode.LOC_PARAM]: (state) => {
            let paramId = state.popInt();
            let param = ParamType.get(paramId);
            let loc = LocType.get(state.activeLoc.type);
            if (param.isString()) {
                state.pushString(ParamHelper.getStringParam(paramId, loc, param.defaultString));
            } else {
                state.pushInt(ParamHelper.getIntParam(paramId, loc, param.defaultInt));
            }
        },

        [ScriptOpcode.STRUCT_PARAM]: (state) => {
            let [structId, paramId] = state.popInts(2);
            let param = ParamType.get(paramId);
            let struct = StructType.get(structId);
            if (param.isString()) {
                state.pushString(ParamHelper.getStringParam(paramId, struct, param.defaultString));
            } else {
                state.pushInt(ParamHelper.getIntParam(paramId, struct, param.defaultInt));
            }
        },

        [ScriptOpcode.IF_SETCOLOUR]: (state) => {
            let colour = state.popInt();
            let com = state.popInt();

            state.activePlayer.ifSetColour(com, colour);
        },

        [ScriptOpcode.IF_OPENBOTTOM]: (state) => {
            let com = state.popInt();

            state.activePlayer.ifOpenBottom(com);
        },

        [ScriptOpcode.IF_OPENSUB]: (state) => {
            let com2 = state.popInt();
            let com1 = state.popInt();

            state.activePlayer.ifOpenSub(com1, com2);
        },

        [ScriptOpcode.IF_SETHIDE]: (state) => {
            let hidden = state.popInt();
            let com = state.popInt();

            state.activePlayer.ifSetHide(com, hidden ? true : false);
        },

        [ScriptOpcode.IF_SETOBJECT]: (state) => {
            let zoom = state.popInt();
            let objId = state.popInt();
            let com = state.popInt();

            state.activePlayer.ifSetObject(com, objId, zoom);
        },

        [ScriptOpcode.IF_SETTABACTIVE]: (state) => {
            state.activePlayer.ifSetTabFlash(state.popInt());
        },

        [ScriptOpcode.IF_SETMODEL]: (state) => {
            let modelId = state.popInt();
            let com = state.popInt();

            state.activePlayer.ifSetModel(com, modelId);
        },

        [ScriptOpcode.IF_SETMODELCOLOUR]: (state) => {
        },

        [ScriptOpcode.IF_SETTABFLASH]: (state) => {
            state.activePlayer.ifSetTabFlash(state.popInt());
        },

        [ScriptOpcode.IF_CLOSESUB]: (state) => {
            state.activePlayer.ifCloseSub();
        },

        [ScriptOpcode.IF_SETANIM]: (state) => {
            let seqId = state.popInt();
            let com = state.popInt();

            state.activePlayer.ifSetAnim(com, seqId);
        },

        [ScriptOpcode.IF_SETTAB]: (state) => {
            let tab = state.popInt();
            let com = state.popInt();

            state.activePlayer.ifSetTab(com, tab);
        },

        [ScriptOpcode.IF_OPENTOP]: (state) => {
            state.activePlayer.ifOpenTop(state.popInt());
        },

        [ScriptOpcode.IF_OPENSTICKY]: (state) => {
            state.activePlayer.ifOpenTop(state.popInt());
        },

        [ScriptOpcode.IF_OPENSIDEBAR]: (state) => {
            state.activePlayer.ifOpenTop(state.popInt());
        },

        [ScriptOpcode.IF_SETPLAYERHEAD]: (state) => {
            state.activePlayer.ifSetPlayerHead(state.popInt());
        },

        [ScriptOpcode.IF_SETTEXT]: (state) => {
            let text = state.popString();
            let com = state.popInt();

            state.activePlayer.ifSetText(com, text);
        },

        [ScriptOpcode.IF_SETNPCHEAD]: (state) => {
            let npcId = state.popInt();
            let com = state.popInt();

            state.activePlayer.ifSetNpcHead(com, npcId);
        },

        [ScriptOpcode.IF_SETPOSITION]: (state) => {
        },

        [ScriptOpcode.IF_MULTIZONE]: (state) => {
            state.activePlayer.ifMultiZone(state.popInt() ? true : false);
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

        // ----

        [ScriptOpcode.GIVEXP]: (state) => {
            const self = state.activePlayer;

            let xp = state.popInt();
            let stat = state.popInt();

            self.giveXp(stat, xp);
        },

        [ScriptOpcode.NPC_DAMAGE]: (state) => {
            let amount = state.popInt();
            let type = state.popInt();

            state.activeNpc.applyDamage(amount, type, state.activePlayer.pid);
        },

        [ScriptOpcode.DAMAGE]: (state) => {
            let amount = state.popInt();
            let type = state.popInt();
            let uid = state.popInt();

            World.getPlayer(uid)!.applyDamage(amount, type); // TODO (jkm) consider whether we want to use ! here
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
