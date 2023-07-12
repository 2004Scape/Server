import { CommandHandlers } from "#lostcity/engine/script/ScriptRunner.js";
import ScriptOpcode from "#lostcity/engine/script/ScriptOpcode.js";
import ObjType from "#lostcity/cache/ObjType.js";
import ParamType from "#lostcity/cache/ParamType.js";
import { ParamHelper } from "#lostcity/cache/ParamHelper.js";

const ObjConfigOps: CommandHandlers = {
    [ScriptOpcode.OC_NAME]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.OC_PARAM]: (state) => {
        let [objId, paramId] = state.popInts(2);
        let obj = ObjType.get(objId)
        let param = ParamType.get(paramId);
        if (param.isString()) {
            state.pushString(ParamHelper.getStringParam(paramId, obj, param.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramId, obj, param.defaultInt));
        }
    },

    [ScriptOpcode.OC_CATEGORY]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.OC_DESC]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.OC_MEMBERS]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.OC_WEIGHT]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.OC_WEARPOS]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.OC_DEBUGNAME]: (state) => {
        throw new Error("unimplemented");
    },
};

export default ObjConfigOps;
