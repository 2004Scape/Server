import { CommandHandlers } from "#lostcity/engine/script/ScriptRunner.js";
import ScriptOpcode from "#lostcity/engine/script/ScriptOpcode.js";
import ParamType from "#lostcity/cache/ParamType.js";
import LocType from "#lostcity/cache/LocType.js";
import { ParamHelper } from "#lostcity/cache/ParamHelper.js";

const LocOps: CommandHandlers = {
    [ScriptOpcode.LOC_ADD]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.LOC_ANGLE]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.LOC_ANIM]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.LOC_CATEGORY]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.LOC_CHANGE]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.LOC_COORD]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.LOC_DEL]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.LOC_DEL]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.LOC_FINDALLZONE]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.LOC_FINDNEXT]: (state) => {
        throw new Error("unimplemented");
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

    [ScriptOpcode.LOC_TYPE]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.LOC_NAME]: (state) => {
        throw new Error("unimplemented");
    },
};

export default LocOps;
