import ScriptState from '#lostcity/engine/script/ScriptState.js';
import path from 'path';
import Player from '#lostcity/entity/Player.js';
import Npc from '#lostcity/entity/Npc.js';
import Script from "#lostcity/engine/script/Script.js";
import { ScriptArgument } from "#lostcity/entity/EntityQueueRequest.js";
import Loc from '#lostcity/entity/Loc.js';
import CoreOps from "#lostcity/engine/script/handlers/CoreOps.js";
import ServerOps from "#lostcity/engine/script/handlers/ServerOps.js";
import PlayerOps from "#lostcity/engine/script/handlers/PlayerOps.js";
import NpcOps from "#lostcity/engine/script/handlers/NpcOps.js";
import LocOps from "#lostcity/engine/script/handlers/LocOps.js";
import ObjOps from "#lostcity/engine/script/handlers/ObjOps.js";
import NpcConfigOps from "#lostcity/engine/script/handlers/NpcConfigOps.js";
import LocConfigOps from "#lostcity/engine/script/handlers/LocConfigOps.js";
import ObjConfigOps from "#lostcity/engine/script/handlers/ObjConfigOps.js";
import InvOps from "#lostcity/engine/script/handlers/InvOps.js";
import EnumOps from "#lostcity/engine/script/handlers/EnumOps.js";
import StringOps from "#lostcity/engine/script/handlers/StringOps.js";
import NumberOps from "#lostcity/engine/script/handlers/NumberOps.js";
import DebugOps from "#lostcity/engine/script/handlers/DebugOps.js";
import ScriptPointer from "#lostcity/engine/script/ScriptPointer.js";

export type CommandHandler = (state: ScriptState) => void;
export type CommandHandlers = {
    [opcode: number]: CommandHandler
}

// script executor
export default class ScriptRunner {
    static readonly HANDLERS: CommandHandlers = {
        // Language required opcodes
        ...CoreOps,
        ...ServerOps,
        ...PlayerOps,
        ...NpcOps,
        ...LocOps,
        ...ObjOps,
        ...NpcConfigOps,
        ...LocConfigOps,
        ...ObjConfigOps,
        ...InvOps,
        ...EnumOps,
        ...StringOps,
        ...NumberOps,
        ...DebugOps,
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

        if (self instanceof Player) {
            state._activePlayer = self;
            state.pointerAdd(ScriptPointer.ActivePlayer);
        } else if (self instanceof Npc) {
            state._activeNpc = self;
            state.pointerAdd(ScriptPointer.ActiveNpc);
        } else if (self instanceof Loc) {
            state._activeLoc = self;
            state.pointerAdd(ScriptPointer.ActiveLoc);
        }

        if (target instanceof Player) {
            if (self instanceof Player) {
                state._activePlayer2 = target;
                state.pointerAdd(ScriptPointer.ActivePlayer2);
            } else {
                state._activePlayer = target;
                state.pointerAdd(ScriptPointer.ActivePlayer);
            }
        } else if (target instanceof Npc) {
            if (self instanceof Npc) {
                state._activeNpc2 = target;
                state.pointerAdd(ScriptPointer.ActiveNpc2);
            } else {
                state._activeNpc = target;
                state.pointerAdd(ScriptPointer.ActiveNpc);
            }
        } else if (target instanceof Loc) {
            if (self instanceof Loc) {
                state._activeLoc2 = target;
                state.pointerAdd(ScriptPointer.ActiveLoc2);
            } else {
                state._activeLoc = target;
                state.pointerAdd(ScriptPointer.ActiveLoc);
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
        let handler = ScriptRunner.HANDLERS[opcode];
        if (!handler) {
            throw new Error(`Unknown opcode ${opcode}`);
        }

        handler(state);
    }
}
