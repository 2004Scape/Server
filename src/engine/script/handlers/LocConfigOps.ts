import LocType from '#/cache/config/LocType.js';
import { ParamHelper } from '#/cache/config/ParamHelper.js';
import ParamType from '#/cache/config/ParamType.js';

import ScriptOpcode from '#/engine/script/ScriptOpcode.js';
import { CommandHandlers } from '#/engine/script/ScriptRunner.js';

import {check, LocTypeValid, ParamTypeValid} from '#/engine/script/ScriptValidators.js';

const LocConfigOps: CommandHandlers = {
    [ScriptOpcode.LC_NAME]: state => {
        const locType: LocType = check(state.popInt(), LocTypeValid);

        state.pushString(locType.name ?? locType.debugname ?? 'null');
    },

    [ScriptOpcode.LC_PARAM]: state => {
        const [locId, paramId] = state.popInts(2);

        const locType: LocType = check(locId, LocTypeValid);
        const paramType: ParamType = check(paramId, ParamTypeValid);
        if (paramType.isString()) {
            state.pushString(ParamHelper.getStringParam(paramType.id, locType, paramType.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramType.id, locType, paramType.defaultInt));
        }
    },

    [ScriptOpcode.LC_CATEGORY]: state => {
        state.pushInt(check(state.popInt(), LocTypeValid).category);
    },

    [ScriptOpcode.LC_DESC]: state => {
        state.pushString(check(state.popInt(), LocTypeValid).desc ?? 'null');
    },

    [ScriptOpcode.LC_DEBUGNAME]: state => {
        state.pushString(check(state.popInt(), LocTypeValid).debugname ?? 'null');
    },

    [ScriptOpcode.LC_WIDTH]: state => {
        state.pushInt(check(state.popInt(), LocTypeValid).width);
    },

    [ScriptOpcode.LC_LENGTH]: state => {
        state.pushInt(check(state.popInt(), LocTypeValid).length);
    }
};

export default LocConfigOps;
