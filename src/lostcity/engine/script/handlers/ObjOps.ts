import { CommandHandlers } from "#lostcity/engine/script/ScriptRunner.js";
import ScriptOpcode from "#lostcity/engine/script/ScriptOpcode.js";

const ObjOps: CommandHandlers = {
    [ScriptOpcode.OBJ_ADD]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.OBJ_ADDALL]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.OBJ_PARAM]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.OBJ_NAME]: (state) => {
        throw new Error("unimplemented");
    },
};

export default ObjOps;
