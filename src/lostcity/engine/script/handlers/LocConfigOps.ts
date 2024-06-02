import LocType from '#lostcity/cache/LocType.js';
import { ParamHelper } from '#lostcity/cache/ParamHelper.js';
import ParamType from '#lostcity/cache/ParamType.js';

import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import { CommandHandlers } from '#lostcity/engine/script/ScriptRunner.js';

import {check, LocTypeValid, ParamTypeValid} from '#lostcity/engine/script/ScriptValidators.js';

const LocConfigOps: CommandHandlers = {
    [ScriptOpcode.LC_NAME]: state => {
        const locId = check(state.popInt(), LocTypeValid);

        const locType = LocType.get(locId);
        state.pushString(locType.name ?? locType.debugname ?? 'null');
    },

    [ScriptOpcode.LC_PARAM]: state => {
        const [locId, paramId] = state.popInts(2);

        const locType = LocType.get(check(locId, LocTypeValid));
        const paramType = ParamType.get(check(paramId, ParamTypeValid));
        if (paramType.isString()) {
            state.pushString(ParamHelper.getStringParam(paramId, locType, paramType.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramId, locType, paramType.defaultInt));
        }
    },

    [ScriptOpcode.LC_CATEGORY]: state => {
        const locId = check(state.popInt(), LocTypeValid);

        const locType = LocType.get(locId);
        state.pushInt(locType.category);
    },

    [ScriptOpcode.LC_DESC]: state => {
        const locId = check(state.popInt(), LocTypeValid);

        const locType = LocType.get(locId);
        state.pushString(locType.desc ?? 'null');
    },

    [ScriptOpcode.LC_DEBUGNAME]: state => {
        const locId = check(state.popInt(), LocTypeValid);

        const locType = LocType.get(locId);
        state.pushString(locType.debugname ?? 'null');
    },

    [ScriptOpcode.LC_WIDTH]: state => {
        const locId = check(state.popInt(), LocTypeValid);

        const locType = LocType.get(locId);
        state.pushInt(locType.width ?? 0);
    },

    [ScriptOpcode.LC_LENGTH]: state => {
        const locId = check(state.popInt(), LocTypeValid);

        const locType = LocType.get(locId);
        state.pushInt(locType.length ?? 0);
    }
};

export default LocConfigOps;
