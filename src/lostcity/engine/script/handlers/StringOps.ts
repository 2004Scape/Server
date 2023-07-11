import { CommandHandlers } from "#lostcity/engine/script/ScriptRunner.js";
import ScriptOpcode from "#lostcity/engine/script/ScriptOpcode.js";

const StringOps: CommandHandlers = {
    [ScriptOpcode.APPEND_NUM]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.APPEND]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.APPEND_SIGNNUM]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.LOWERCASE]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.TOSTRING]: (state) => {
        state.pushString(state.popInt().toString());
    },

    [ScriptOpcode.COMPARE]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.ESCAPE]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.APPEND_CHAR]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.STRING_LENGTH]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.SUBSTRING]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.STRING_INDEXOF_CHAR]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.STRING_INDEXOF_STRING]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.UPPERCASE]: (state) => {
        throw new Error("unimplemented");
    },
};

export default StringOps;
