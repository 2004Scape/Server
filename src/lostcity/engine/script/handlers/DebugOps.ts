import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import { CommandHandlers } from '#lostcity/engine/script/ScriptRunner.js';

import Environment from '#lostcity/util/Environment.js';
import World from '#lostcity/engine/World.js';
import WorldStat from '#lostcity/engine/WorldStat.js';

const DebugOps: CommandHandlers = {
    [ScriptOpcode.ERROR]: state => {
        throw new Error(state.popString());
    },

    [ScriptOpcode.MAP_LOCALDEV]: state => {
        state.pushInt(Environment.LOCAL_DEV ? 1 : 0);
    },

    [ScriptOpcode.MAP_LASTCLOCK]: state => {
        state.pushInt(World.lastCycleStats[WorldStat.CYCLE]);
    },

    [ScriptOpcode.MAP_LASTWORLD]: state => {
        state.pushInt(World.lastCycleStats[WorldStat.WORLD]);
    },

    [ScriptOpcode.MAP_LASTCLIENTIN]: state => {
        state.pushInt(World.lastCycleStats[WorldStat.CLIENT_IN]);
    },

    [ScriptOpcode.MAP_LASTNPC]: state => {
        state.pushInt(World.lastCycleStats[WorldStat.NPC]);
    },

    [ScriptOpcode.MAP_LASTPLAYER]: state => {
        state.pushInt(World.lastCycleStats[WorldStat.PLAYER]);
    },

    [ScriptOpcode.MAP_LASTLOGOUT]: state => {
        state.pushInt(World.lastCycleStats[WorldStat.LOGOUT]);
    },

    [ScriptOpcode.MAP_LASTLOGIN]: state => {
        state.pushInt(World.lastCycleStats[WorldStat.LOGIN]);
    },

    [ScriptOpcode.MAP_LASTZONE]: state => {
        state.pushInt(World.lastCycleStats[WorldStat.ZONE]);
    },

    [ScriptOpcode.MAP_LASTCLIENTOUT]: state => {
        state.pushInt(World.lastCycleStats[WorldStat.CLIENT_OUT]);
    },

    [ScriptOpcode.MAP_LASTCLEANUP]: state => {
        state.pushInt(World.lastCycleStats[WorldStat.CLEANUP]);
    },

    [ScriptOpcode.MAP_LASTBANDWIDTHIN]: state => {
        state.pushInt(World.lastCycleStats[WorldStat.BANDWIDTH_IN]);
    },

    [ScriptOpcode.MAP_LASTBANDWIDTHOUT]: state => {
        state.pushInt(World.lastCycleStats[WorldStat.BANDWIDTH_OUT]);
    }
};

export default DebugOps;
