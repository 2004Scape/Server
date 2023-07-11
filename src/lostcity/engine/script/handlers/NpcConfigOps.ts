import { CommandHandlers } from "#lostcity/engine/script/ScriptRunner.js";
import ScriptOpcode from "#lostcity/engine/script/ScriptOpcode.js";

const NpcConfigOps: CommandHandlers = {
    [ScriptOpcode.NC_NAME]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.NC_PARAM]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.NC_CATEGORY]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.NC_DESC]: (state) => {
        throw new Error("unimplemented");
    },
};

export default NpcConfigOps;
