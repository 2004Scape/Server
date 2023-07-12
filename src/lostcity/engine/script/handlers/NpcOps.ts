import { CommandHandlers } from "#lostcity/engine/script/ScriptRunner.js";
import ScriptOpcode from "#lostcity/engine/script/ScriptOpcode.js";
import ParamType from "#lostcity/cache/ParamType.js";
import NpcType from "#lostcity/cache/NpcType.js";
import { ParamHelper } from "#lostcity/cache/ParamHelper.js";
import ScriptProvider from "#lostcity/engine/script/ScriptProvider.js";
import { Position } from "#lostcity/entity/Position.js";

const NpcOps: CommandHandlers = {
    [ScriptOpcode.NPC_FINDUID]: (state) => {
        throw new Error("unimplemented")
    },

    [ScriptOpcode.NPC_ADD]: (state) => {
        throw new Error("unimplemented")
    },

    [ScriptOpcode.NPC_ANIM]: (state) => {
        let delay = state.popInt();
        let seq = state.popInt();

        state.activeNpc.playAnimation(seq, delay);
    },

    [ScriptOpcode.NPC_BASESTAT]: (state) => {
        let delay = state.popInt();
        let seq = state.popInt();

        state.activeNpc.playAnimation(seq, delay);
    },

    [ScriptOpcode.NPC_CATEGORY]: (state) => {
        throw new Error("unimplemented")
    },

    [ScriptOpcode.NPC_COORD]: (state) => {
        throw new Error("unimplemented")
    },

    [ScriptOpcode.NPC_DEL]: (state) => {
        throw new Error("unimplemented")
    },

    [ScriptOpcode.NPC_DELAY]: (state) => {
        throw new Error("unimplemented")
    },

    [ScriptOpcode.NPC_FACESQUARE]: (state) => {
        throw new Error("unimplemented")
    },

    [ScriptOpcode.NPC_FINDEXACT]: (state) => {
        throw new Error("unimplemented")
    },

    [ScriptOpcode.NPC_FINDHERO]: (state) => {
        state.pushInt(state.activeNpc.hero);
    },

    [ScriptOpcode.NPC_PARAM]: (state) => {
        let paramId = state.popInt();
        let param = ParamType.get(paramId);
        let npc = NpcType.get(state.activeNpc.type);
        if (param.isString()) {
            state.pushString(ParamHelper.getStringParam(paramId, npc, param.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramId, npc, param.defaultInt));
        }
    },

    [ScriptOpcode.NPC_QUEUE]: (state) => {
        let delay = state.popInt();
        let queueId = state.popInt();

        let script = ScriptProvider.findScript(`ai_queue${queueId}`, state.activeNpc);
        if (script) {
            state.activeNpc.enqueueScript(script, delay);
        }
    },

    [ScriptOpcode.NPC_RANGE]: (state) => {
        let coord = state.popInt();
        let level = (coord >> 28) & 0x3fff;
        let x = (coord >> 14) & 0x3fff;
        let z = coord & 0x3fff;

        if (level !== state.activeNpc.level) {
            state.pushInt(-1);
        } else {
            state.pushInt(Position.distanceTo(state.activeNpc, {x, z}));
        }
    },

    [ScriptOpcode.NPC_SAY]: (state) => {
        throw new Error("unimplemented")
    },

    [ScriptOpcode.NPC_SETHUNT]: (state) => {
        throw new Error("unimplemented")
    },

    [ScriptOpcode.NPC_SETHUNTMODE]: (state) => {
        throw new Error("unimplemented")
    },

    [ScriptOpcode.NPC_SETMODE]: (state) => {
        throw new Error("unimplemented")
    },

    [ScriptOpcode.NPC_STAT]: (state) => {
        throw new Error("unimplemented")
    },

    [ScriptOpcode.NPC_STATHEAL]: (state) => {
        throw new Error("unimplemented")
    },

    [ScriptOpcode.NPC_TYPE]: (state) => {
        state.pushInt(state.activeNpc.type);
    },

    [ScriptOpcode.NPC_DAMAGE]: (state) => {
        let amount = state.popInt();
        let type = state.popInt();

        state.activeNpc.applyDamage(amount, type, state.activePlayer.pid);
    },

    [ScriptOpcode.NPC_NAME]: (state) => {
        let npcType = NpcType.get(state.activeNpc.type);

        state.pushString(npcType.name ?? 'null');
    },
};

export default NpcOps;
