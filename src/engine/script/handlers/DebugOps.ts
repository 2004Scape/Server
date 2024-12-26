import ScriptOpcode from '#/engine/script/ScriptOpcode.js';
import { CommandHandlers } from '#/engine/script/ScriptRunner.js';

import Environment from '#/util/Environment.js';
import World from '#/engine/World.js';
import WorldStat from '#/engine/WorldStat.js';

const DebugOps: CommandHandlers = {
    [ScriptOpcode.ERROR]: state => {
        throw new Error(state.popString());
    },

    [ScriptOpcode.MAP_PRODUCTION]: state => {
        state.pushInt(Environment.NODE_PRODUCTION ? 1 : 0);
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
    },

    [ScriptOpcode.TIMESPENT]: state => {
        state.timespent = performance.now();
    },

    [ScriptOpcode.GETTIMESPENT]: state => {
        const elapsed = performance.now() - state.timespent;

        if (state.popInt() === 1) {
            // microseconds
            state.pushInt(elapsed * 1000);
        } else {
            // milliseconds
            state.pushInt(elapsed);
        }
    },
};

export default DebugOps;
