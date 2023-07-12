import { CommandHandlers } from "#lostcity/engine/script/ScriptRunner.js";
import ScriptOpcode from "#lostcity/engine/script/ScriptOpcode.js";
import NpcType from "#lostcity/cache/NpcType.js";

const NpcConfigOps: CommandHandlers = {
    [ScriptOpcode.NC_NAME]: (state) => {
        let npcId = state.popInt();
        let npcType = NpcType.get(npcId);

        state.pushString(npcType.name ?? 'null');
    },

    [ScriptOpcode.NC_PARAM]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.NC_CATEGORY]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.NC_DESC]: (state) => {
        let npcId = state.popInt();
        let npcType = NpcType.get(npcId);

        state.pushString(npcType.desc ?? 'null');
    },

    [ScriptOpcode.NC_DEBUGNAME]: (state) => {
        let npcId = state.popInt();
        let npcType = NpcType.get(npcId);

        state.pushString(npcType.debugname ?? 'null');
    },
};

export default NpcConfigOps;
