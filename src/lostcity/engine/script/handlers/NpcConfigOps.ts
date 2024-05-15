import NpcType from '#lostcity/cache/NpcType.js';
import { ParamHelper } from '#lostcity/cache/ParamHelper.js';
import ParamType from '#lostcity/cache/ParamType.js';

import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import { CommandHandlers } from '#lostcity/engine/script/ScriptRunner.js';

import {check, NpcTypeValid, NumberNotNull, ParamTypeValid} from '#lostcity/engine/script/ScriptValidators.js';

const NpcConfigOps: CommandHandlers = {
    [ScriptOpcode.NC_NAME]: state => {
        const npcId = check(state.popInt(), NpcTypeValid);

        const npcType = NpcType.get(npcId);
        state.pushString(npcType.name ?? npcType.debugname ?? 'null');
    },

    [ScriptOpcode.NC_PARAM]: state => {
        const [npcId, paramId] = state.popInts(2);

        check(npcId, NpcTypeValid);
        check(paramId, ParamTypeValid);

        const npcType = NpcType.get(npcId);
        const paramType = ParamType.get(paramId);
        if (paramType.isString()) {
            state.pushString(ParamHelper.getStringParam(paramId, npcType, paramType.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramId, npcType, paramType.defaultInt));
        }
    },

    [ScriptOpcode.NC_CATEGORY]: state => {
        const npcId = check(state.popInt(), NpcTypeValid);

        const npcType = NpcType.get(npcId);
        state.pushInt(npcType.category);
    },

    [ScriptOpcode.NC_DESC]: state => {
        const npcId = check(state.popInt(), NpcTypeValid);

        const npcType = NpcType.get(npcId);
        state.pushString(npcType.desc ?? 'null');
    },

    [ScriptOpcode.NC_DEBUGNAME]: state => {
        const npcId = check(state.popInt(), NpcTypeValid);

        const npcType = NpcType.get(npcId);
        state.pushString(npcType.debugname ?? 'null');
    },

    [ScriptOpcode.NC_OP]: state => {
        const [npcId, op] = state.popInts(2);

        check(npcId, NpcTypeValid);
        check(op, NumberNotNull);

        const npcType = NpcType.get(npcId);

        if (!npcType.op) {
            state.pushString('');
            return;
        }
        state.pushString(npcType.op[op - 1] ?? '');
    }
};

export default NpcConfigOps;
