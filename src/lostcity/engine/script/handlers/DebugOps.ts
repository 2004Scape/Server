import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import { CommandHandlers } from '#lostcity/engine/script/ScriptRunner.js';

const DebugOps: CommandHandlers = {
    [ScriptOpcode.ERROR]: (state) => {
        throw new Error(state.popString());
    },

    [ScriptOpcode.MAP_LOCALDEV]: (state) => {
        state.pushInt(process.env.LOCAL_DEV === 'true' ? 1 : 0);
    },
};

export default DebugOps;
