import { CommandHandlers } from '#lostcity/engine/script/ScriptRunner.js';
import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';

const DebugOps: CommandHandlers = {
    [ScriptOpcode.ERROR]: (state) => {
        throw new Error(state.popString());
    },

    [ScriptOpcode.ACTIVE_NPC]: (state) => {
        const activeNpc = state.intOperand === 0 ? state._activeNpc : state._activeNpc2;
        state.pushInt(activeNpc !== null ? 1 : 0);
    },

    [ScriptOpcode.ACTIVE_PLAYER]: (state) => {
        const activePlayer = state.intOperand === 0 ? state._activePlayer : state._activePlayer2;
        state.pushInt(activePlayer !== null ? 1 : 0);
    },

    [ScriptOpcode.ACTIVE_LOC]: (state) => {
        const activeLoc = state.intOperand === 0 ? state._activeLoc : state._activeLoc2;
        state.pushInt(activeLoc !== null ? 1 : 0);
    },

    [ScriptOpcode.ACTIVE_OBJ]: (state) => {
        throw new Error('unimplemented');
    },
};

export default DebugOps;
