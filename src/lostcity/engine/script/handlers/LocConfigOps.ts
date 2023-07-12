import { CommandHandlers } from "#lostcity/engine/script/ScriptRunner.js";
import ScriptOpcode from "#lostcity/engine/script/ScriptOpcode.js";

const LocConfigOps: CommandHandlers = {
    [ScriptOpcode.LC_NAME]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.LC_PARAM]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.LC_CATEGORY]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.LC_DESC]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.LC_DEBUGNAME]: (state) => {
        throw new Error("unimplemented");
    },
};

export default LocConfigOps;
