import { CommandHandlers } from "#lostcity/engine/script/ScriptRunner.js";
import ScriptOpcode from "#lostcity/engine/script/ScriptOpcode.js";
import ParamType from "#lostcity/cache/ParamType.js";
import NpcType from "#lostcity/cache/NpcType.js";
import { ParamHelper } from "#lostcity/cache/ParamHelper.js";
import ScriptProvider from "#lostcity/engine/script/ScriptProvider.js";
import { Position } from "#lostcity/entity/Position.js";
import ScriptPointer, { checkedHandler } from "#lostcity/engine/script/ScriptPointer.js";
import ServerTriggerType from "#lostcity/engine/script/ServerTriggerType.js";
import World from "#lostcity/engine/World.js";

const ActiveNpc = [ScriptPointer.ActiveNpc, ScriptPointer.ActiveNpc2];

const NpcOps: CommandHandlers = {
    [ScriptOpcode.NPC_FINDUID]: (state) => {
        const npcUid = state.popInt();
        const slot = npcUid & 0xFFFF;
        const expectedType = npcUid >> 16 & 0xFFFF;
        const npc = World.getNpc(slot);

        if (npc !== null && npc.type === expectedType) {
            state.activeNpc = npc;
            state.pointerAdd(ActiveNpc[state.intOperand]);
            state.pushInt(1);
        } else {
            state.pointerRemove(ActiveNpc[state.intOperand]);
            state.pushInt(0);
        }
    },

    [ScriptOpcode.NPC_ADD]: (state) => {
        throw new Error("unimplemented")
    },

    [ScriptOpcode.NPC_ANIM]: checkedHandler(ActiveNpc, (state) => {
        let delay = state.popInt();
        let seq = state.popInt();

        state.activeNpc.playAnimation(seq, delay);
    }),

    [ScriptOpcode.NPC_BASESTAT]: checkedHandler(ActiveNpc, (state) => {
        let delay = state.popInt();
        let seq = state.popInt();

        state.activeNpc.playAnimation(seq, delay);
    }),

    [ScriptOpcode.NPC_CATEGORY]: checkedHandler(ActiveNpc, (state) => {
        throw new Error("unimplemented")
    }),

    [ScriptOpcode.NPC_COORD]: checkedHandler(ActiveNpc, (state) => {
        throw new Error("unimplemented")
    }),

    [ScriptOpcode.NPC_DEL]: checkedHandler(ActiveNpc, (state) => {
        throw new Error("unimplemented")
    }),

    [ScriptOpcode.NPC_DELAY]: checkedHandler(ActiveNpc, (state) => {
        throw new Error("unimplemented")
    }),

    [ScriptOpcode.NPC_FACESQUARE]: checkedHandler(ActiveNpc, (state) => {
        throw new Error("unimplemented")
    }),

    [ScriptOpcode.NPC_FINDEXACT]: (state) => {
        throw new Error("unimplemented")
    },

    [ScriptOpcode.NPC_FINDHERO]: checkedHandler(ActiveNpc, (state) => {
        state.pushInt(state.activeNpc.hero);
    }),

    [ScriptOpcode.NPC_PARAM]: checkedHandler(ActiveNpc, (state) => {
        let paramId = state.popInt();
        let param = ParamType.get(paramId);
        let npc = NpcType.get(state.activeNpc.type);
        if (param.isString()) {
            state.pushString(ParamHelper.getStringParam(paramId, npc, param.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramId, npc, param.defaultInt));
        }
    }),

    [ScriptOpcode.NPC_QUEUE]: checkedHandler(ActiveNpc, (state) => {
        let delay = state.popInt();
        let queueId = state.popInt() - 1;
        if (queueId < 0 || queueId >= 20) {
            throw new Error(`Invalid ai_queue: ${queueId + 1}`);
        }

        let type = NpcType.get(state.activeNpc.type)
        let script = ScriptProvider.getByTrigger(ServerTriggerType.AI_QUEUE1 + queueId, type.id, type.category);
        if (script) {
            state.activeNpc.enqueueScript(script, delay);
        }
    }),

    [ScriptOpcode.NPC_RANGE]: checkedHandler(ActiveNpc, (state) => {
        let coord = state.popInt();
        let level = (coord >> 28) & 0x3fff;
        let x = (coord >> 14) & 0x3fff;
        let z = coord & 0x3fff;

        if (level !== state.activeNpc.level) {
            state.pushInt(-1);
        } else {
            state.pushInt(Position.distanceTo(state.activeNpc, {x, z}));
        }
    }),

    [ScriptOpcode.NPC_SAY]: checkedHandler(ActiveNpc, (state) => {
        state.activeNpc.say(state.popString());
    }),

    [ScriptOpcode.NPC_SETHUNT]: checkedHandler(ActiveNpc, (state) => {
        throw new Error("unimplemented")
    }),

    [ScriptOpcode.NPC_SETHUNTMODE]: checkedHandler(ActiveNpc, (state) => {
        throw new Error("unimplemented")
    }),

    [ScriptOpcode.NPC_SETMODE]: checkedHandler(ActiveNpc, (state) => {
        throw new Error("unimplemented")
    }),

    [ScriptOpcode.NPC_STAT]: checkedHandler(ActiveNpc, (state) => {
        throw new Error("unimplemented")
    }),

    [ScriptOpcode.NPC_STATHEAL]: checkedHandler(ActiveNpc, (state) => {
        throw new Error("unimplemented")
    }),

    [ScriptOpcode.NPC_TYPE]: checkedHandler(ActiveNpc, (state) => {
        state.pushInt(state.activeNpc.type);
    }),

    [ScriptOpcode.NPC_DAMAGE]: checkedHandler(ActiveNpc, (state) => {
        let amount = state.popInt();
        let type = state.popInt();

        state.activeNpc.applyDamage(amount, type, state.activePlayer.pid);
    }),

    [ScriptOpcode.NPC_NAME]: checkedHandler(ActiveNpc, (state) => {
        let npcType = NpcType.get(state.activeNpc.type);

        state.pushString(npcType.name ?? 'null');
    }),

    [ScriptOpcode.NPC_UID]: checkedHandler(ActiveNpc, (state) => {
        const npc = state.activeNpc;
        state.pushInt((npc.type << 16) | npc.nid);
    }),
};

export default NpcOps;
