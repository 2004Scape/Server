import ScriptVarType from '#lostcity/cache/config/ScriptVarType.js';
import VarNpcType from '#lostcity/cache/config/VarNpcType.js';
import VarPlayerType from '#lostcity/cache/config/VarPlayerType.js';
import VarSharedType from '#lostcity/cache/config/VarSharedType.js';

import World from '#lostcity/engine/World.js';

import ScriptFile from '#lostcity/engine/script/ScriptFile.js';
import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import ScriptProvider from '#lostcity/engine/script/ScriptProvider.js';
import { CommandHandlers } from '#lostcity/engine/script/ScriptRunner.js';
import ScriptState from '#lostcity/engine/script/ScriptState.js';
import {check, VarNpcValid, VarPlayerValid, VarSharedValid} from '#lostcity/engine/script/ScriptValidators.js';
import {ProtectedActivePlayer} from '#lostcity/engine/script/ScriptPointer.js';

function gosub(state: ScriptState, id: number) {
    if (state.fp >= 50) {
        throw new Error('stack overflow');
    }

    // set up the gosub frame
    state.frames[state.fp++] = {
        script: state.script,
        pc: state.pc,
        intLocals: state.intLocals,
        stringLocals: state.stringLocals
    };

    // lookup script and set it up
    const script = ScriptProvider.get(id);
    if (!script) {
        throw new Error(`unable to find proc ${script}`);
    }
    setupNewScript(state, script);
}

function jump(state: ScriptState, id: number) {
    const label = ScriptProvider.get(id);
    if (!label) {
        throw new Error(`unable to find label ${id}`);
    }

    state.debugFrames[state.debugFp++] = {
        script: state.script,
        pc: state.pc
    };

    setupNewScript(state, label);
    state.fp = 0;
    state.frames = [];
}

function setupNewScript(state: ScriptState, script: ScriptFile) {
    state.script = script;
    state.pc = -1;
    state.intLocals = state.popInts(script.intArgCount);
    state.stringLocals = state.popStrings(script.stringArgCount);
}

const CoreOps: CommandHandlers = {
    [ScriptOpcode.PUSH_CONSTANT_INT]: state => {
        state.pushInt(state.intOperand);
    },

    [ScriptOpcode.PUSH_CONSTANT_STRING]: state => {
        state.pushString(state.stringOperand);
    },

    [ScriptOpcode.PUSH_VARP]: state => {
        const secondary = (state.intOperand >> 16) & 0x1;
        if (secondary && !state._activePlayer2) {
            throw new Error('No secondary active_player.');
        } else if (!secondary && !state._activePlayer) {
            throw new Error('No active_player.');
        }

        const varpType: VarPlayerType = check(state.intOperand & 0xffff, VarPlayerValid);
        if (varpType.type === ScriptVarType.STRING) {
            state.pushString(secondary ? state._activePlayer2!.getVar(varpType.id) as string : state._activePlayer!.getVar(varpType.id) as string);
        } else {
            state.pushInt(secondary ? state._activePlayer2!.getVar(varpType.id) as number : state._activePlayer!.getVar(varpType.id) as number);
        }
    },

    [ScriptOpcode.POP_VARP]: state => {
        const secondary = (state.intOperand >> 16) & 0x1;
        if (secondary && !state._activePlayer2) {
            throw new Error('No secondary active_player.');
        } else if (!secondary && !state._activePlayer) {
            throw new Error('No active_player.');
        }

        const varpType: VarPlayerType = check(state.intOperand & 0xffff, VarPlayerValid);
        if (!state.pointerGet(ProtectedActivePlayer[secondary]) && varpType.protect) {
            throw new Error(`%${varpType.debugname} requires protected access`);
        }

        if (varpType.type === ScriptVarType.STRING) {
            const value = state.popString();
            if (secondary) {
                state._activePlayer2!.setVar(varpType.id, value);
            } else {
                state._activePlayer!.setVar(varpType.id, value);
            }
        } else {
            const value = state.popInt();
            if (secondary) {
                state._activePlayer2!.setVar(varpType.id, value);
            } else {
                state._activePlayer!.setVar(varpType.id, value);
            }
        }
    },

    [ScriptOpcode.PUSH_VARN]: state => {
        const secondary = (state.intOperand >> 16) & 0x1;
        if (secondary && !state._activeNpc2) {
            throw new Error('No secondary active_npc.');
        } else if (!secondary && !state._activeNpc) {
            throw new Error('No active_npc.');
        }

        const varnType: VarNpcType = check(state.intOperand & 0xffff, VarNpcValid);
        if (varnType.type === ScriptVarType.STRING) {
            state.pushString(secondary ? state._activeNpc2!.getVar(varnType.id) as string : state._activeNpc!.getVar(varnType.id) as string);
        } else {
            state.pushInt(secondary ? state._activeNpc2!.getVar(varnType.id) as number : state._activeNpc!.getVar(varnType.id) as number);
        }
    },

    [ScriptOpcode.POP_VARN]: state => {
        const secondary = (state.intOperand >> 16) & 0x1;
        if (secondary && !state._activeNpc2) {
            throw new Error('No secondary active_npc.');
        } else if (!secondary && !state._activeNpc) {
            throw new Error('No active_npc.');
        }

        const varnType: VarNpcType = check(state.intOperand & 0xffff, VarNpcValid);
        if (varnType.type === ScriptVarType.STRING) {
            const value = state.popInt();
            if (secondary) {
                state._activeNpc2!.setVar(varnType.id, value);
            } else {
                state._activeNpc!.setVar(varnType.id, value);
            }
        } else {
            const value = state.popInt();
            if (secondary) {
                state._activeNpc2!.setVar(varnType.id, value);
            } else {
                state._activeNpc!.setVar(varnType.id, value);
            }
        }
    },

    [ScriptOpcode.PUSH_INT_LOCAL]: state => {
        state.pushInt(state.intLocals[state.intOperand]);
    },

    [ScriptOpcode.POP_INT_LOCAL]: state => {
        state.intLocals[state.intOperand] = state.popInt();
    },

    [ScriptOpcode.PUSH_STRING_LOCAL]: state => {
        state.pushString(state.stringLocals[state.intOperand]);
    },

    [ScriptOpcode.POP_STRING_LOCAL]: state => {
        state.stringLocals[state.intOperand] = state.popString();
    },

    [ScriptOpcode.BRANCH]: state => {
        state.pc += state.intOperand;
    },

    [ScriptOpcode.BRANCH_NOT]: state => {
        const b = state.popInt();
        const a = state.popInt();

        if (a !== b) {
            state.pc += state.intOperand;
        }
    },

    [ScriptOpcode.BRANCH_EQUALS]: state => {
        const b = state.popInt();
        const a = state.popInt();

        if (a === b) {
            state.pc += state.intOperand;
        }
    },

    [ScriptOpcode.BRANCH_LESS_THAN]: state => {
        const b = state.popInt();
        const a = state.popInt();

        if (a < b) {
            state.pc += state.intOperand;
        }
    },

    [ScriptOpcode.BRANCH_GREATER_THAN]: state => {
        const b = state.popInt();
        const a = state.popInt();

        if (a > b) {
            state.pc += state.intOperand;
        }
    },

    [ScriptOpcode.BRANCH_LESS_THAN_OR_EQUALS]: state => {
        const b = state.popInt();
        const a = state.popInt();

        if (a <= b) {
            state.pc += state.intOperand;
        }
    },

    [ScriptOpcode.BRANCH_GREATER_THAN_OR_EQUALS]: state => {
        const b = state.popInt();
        const a = state.popInt();

        if (a >= b) {
            state.pc += state.intOperand;
        }
    },

    [ScriptOpcode.POP_INT_DISCARD]: state => {
        state.isp--;
    },

    [ScriptOpcode.POP_STRING_DISCARD]: state => {
        state.ssp--;
    },

    [ScriptOpcode.RETURN]: state => {
        if (state.fp === 0) {
            state.execution = ScriptState.FINISHED;
            return;
        }

        const frame = state.frames[--state.fp];
        state.pc = frame.pc;
        state.script = frame.script;
        state.intLocals = frame.intLocals;
        state.stringLocals = frame.stringLocals;
    },

    [ScriptOpcode.JOIN_STRING]: state => {
        const count = state.intOperand;

        const strings = [];
        for (let i = 0; i < count; i++) {
            strings.push(state.popString());
        }

        state.pushString(strings.reverse().join(''));
    },

    [ScriptOpcode.GOSUB]: state => {
        gosub(state, state.popInt());
    },

    [ScriptOpcode.GOSUB_WITH_PARAMS]: state => {
        gosub(state, state.intOperand);
    },

    [ScriptOpcode.JUMP]: state => {
        jump(state, state.popInt());
    },

    [ScriptOpcode.JUMP_WITH_PARAMS]: state => {
        jump(state, state.intOperand);
    },

    [ScriptOpcode.DEFINE_ARRAY]: state => {
        throw new Error('unimplemented');
    },

    [ScriptOpcode.PUSH_ARRAY_INT]: state => {
        throw new Error('unimplemented');
    },

    [ScriptOpcode.POP_ARRAY_INT]: state => {
        throw new Error('unimplemented');
    },

    [ScriptOpcode.SWITCH]: state => {
        const key = state.popInt();
        const table = state.script.switchTables[state.intOperand];
        if (table === undefined) {
            return;
        }

        const result = table[key];
        if (result) {
            state.pc += result;
        }
    },

    [ScriptOpcode.PUSH_VARS]: state => {
        const varsType: VarSharedType = check(state.intOperand & 0xffff, VarSharedValid);

        if (varsType.type === ScriptVarType.STRING) {
            state.pushString(World.varsString[varsType.id] ?? '');
        } else {
            state.pushInt(World.vars[varsType.id]);
        }
    },

    [ScriptOpcode.POP_VARS]: state => {
        const varsType: VarSharedType = check(state.intOperand & 0xffff, VarSharedValid);

        if (varsType.type === ScriptVarType.STRING) {
            World.varsString[varsType.id] = state.popString();
        } else {
            World.vars[varsType.id] = state.popInt();
        }
    }
};

export default CoreOps;
