import NpcType from '#/cache/config/NpcType.js';
import { ParamHelper } from '#/cache/config/ParamHelper.js';
import ParamType from '#/cache/config/ParamType.js';

import ScriptOpcode from '#/engine/script/ScriptOpcode.js';
import { CommandHandlers } from '#/engine/script/ScriptRunner.js';

import {check, NpcTypeValid, NumberNotNull, ParamTypeValid} from '#/engine/script/ScriptValidators.js';

const NpcConfigOps: CommandHandlers = {
    [ScriptOpcode.NC_NAME]: state => {
        const npcType: NpcType = check(state.popInt(), NpcTypeValid);

        state.pushString(npcType.name ?? npcType.debugname ?? 'null');
    },

    [ScriptOpcode.NC_PARAM]: state => {
        const [npcId, paramId] = state.popInts(2);

        const npcType: NpcType = check(npcId, NpcTypeValid);
        const paramType: ParamType = check(paramId, ParamTypeValid);
        if (paramType.isString()) {
            state.pushString(ParamHelper.getStringParam(paramId, npcType, paramType.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramId, npcType, paramType.defaultInt));
        }
    },

    [ScriptOpcode.NC_CATEGORY]: state => {
        state.pushInt(check(state.popInt(), NpcTypeValid).category);
    },

    [ScriptOpcode.NC_DESC]: state => {
        state.pushString(check(state.popInt(), NpcTypeValid).desc ?? 'null');
    },

    [ScriptOpcode.NC_DEBUGNAME]: state => {
        state.pushString(check(state.popInt(), NpcTypeValid).debugname ?? 'null');
    },

    [ScriptOpcode.NC_OP]: state => {
        const [npcId, op] = state.popInts(2);

        const npcType: NpcType = check(npcId, NpcTypeValid);
        check(op, NumberNotNull);

        if (!npcType.op) {
            state.pushString('');
            return;
        }
        state.pushString(npcType.op[op - 1] ?? '');
    }
};

export default NpcConfigOps;
