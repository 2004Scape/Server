import { CommandHandlers } from "#lostcity/engine/script/ScriptRunner.js";
import ScriptOpcode from "#lostcity/engine/script/ScriptOpcode.js";

const EnumOps: CommandHandlers = {
    [ScriptOpcode.ENUM]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.ENUM_GETOUTPUTCOUNT]: (state) => {
        throw new Error("unimplemented");
    },
};

export default EnumOps;
