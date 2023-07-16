import { CommandHandlers } from '#lostcity/engine/script/ScriptRunner.js';
import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import ParamType from '#lostcity/cache/ParamType.js';
import LocType from '#lostcity/cache/LocType.js';
import { ParamHelper } from '#lostcity/cache/ParamHelper.js';
import ScriptPointer, { checkedHandler } from '#lostcity/engine/script/ScriptPointer.js';

const ActiveLoc = [ScriptPointer.ActiveLoc, ScriptPointer.ActiveLoc2];

const LocOps: CommandHandlers = {
    [ScriptOpcode.LOC_ADD]: (state) => {
        throw new Error('unimplemented');
    },

    [ScriptOpcode.LOC_ANGLE]: checkedHandler(ActiveLoc, (state) => {
        throw new Error('unimplemented');
    }),

    [ScriptOpcode.LOC_ANIM]: checkedHandler(ActiveLoc, (state) => {
        throw new Error('unimplemented');
    }),

    [ScriptOpcode.LOC_CATEGORY]: checkedHandler(ActiveLoc, (state) => {
        throw new Error('unimplemented');
    }),

    [ScriptOpcode.LOC_CHANGE]: checkedHandler(ActiveLoc, (state) => {
        throw new Error('unimplemented');
    }),

    [ScriptOpcode.LOC_COORD]: checkedHandler(ActiveLoc, (state) => {
        throw new Error('unimplemented');
    }),

    [ScriptOpcode.LOC_DEL]: checkedHandler(ActiveLoc, (state) => {
        throw new Error('unimplemented');
    }),

    [ScriptOpcode.LOC_DEL]: checkedHandler(ActiveLoc, (state) => {
        throw new Error('unimplemented');
    }),

    [ScriptOpcode.LOC_FINDALLZONE]: (state) => {
        throw new Error('unimplemented');
    },

    [ScriptOpcode.LOC_FINDNEXT]: (state) => {
        throw new Error('unimplemented');
    },

    [ScriptOpcode.LOC_PARAM]: checkedHandler(ActiveLoc, (state) => {
        const paramId = state.popInt();
        const param = ParamType.get(paramId);
        const loc = LocType.get(state.activeLoc.type);
        if (param.isString()) {
            state.pushString(ParamHelper.getStringParam(paramId, loc, param.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramId, loc, param.defaultInt));
        }
    }),

    [ScriptOpcode.LOC_TYPE]: checkedHandler(ActiveLoc, (state) => {
        throw new Error('unimplemented');
    }),

    [ScriptOpcode.LOC_NAME]: checkedHandler(ActiveLoc, (state) => {
        throw new Error('unimplemented');
    }),
};

export default LocOps;
