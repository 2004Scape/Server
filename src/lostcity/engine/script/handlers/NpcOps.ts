import {CommandHandlers} from '#lostcity/engine/script/ScriptRunner.js';
import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import ParamType from '#lostcity/cache/ParamType.js';
import NpcType from '#lostcity/cache/NpcType.js';
import {ParamHelper} from '#lostcity/cache/ParamHelper.js';
import ScriptProvider from '#lostcity/engine/script/ScriptProvider.js';
import {Position} from '#lostcity/entity/Position.js';
import ScriptPointer, {checkedHandler} from '#lostcity/engine/script/ScriptPointer.js';
import ServerTriggerType from '#lostcity/engine/script/ServerTriggerType.js';
import World from '#lostcity/engine/World.js';
import Npc from '#lostcity/entity/Npc.js';

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
        const [coord, id, duration] = state.popInts(3);

        const level = (coord >> 28) & 0x3fff;
        const x = (coord >> 14) & 0x3fff;
        const z = coord & 0x3fff;
        const npcType = NpcType.get(id);

        const npc = new Npc(
            level,
            x,
            z,
            npcType.size,
            npcType.size,
            World.getNextNid(),
            npcType.id,
            npcType.moverestrict
        );
        npc.despawn = World.currentTick + duration;
        World.addNpc(npc);
    },

    [ScriptOpcode.NPC_ANIM]: checkedHandler(ActiveNpc, (state) => {
        const delay = state.popInt();
        const seq = state.popInt();

        state.activeNpc.playAnimation(seq, delay);
    }),

    [ScriptOpcode.NPC_BASESTAT]: checkedHandler(ActiveNpc, (state) => {
        const delay = state.popInt();
        const seq = state.popInt();

        state.activeNpc.playAnimation(seq, delay);
    }),

    [ScriptOpcode.NPC_CATEGORY]: checkedHandler(ActiveNpc, (state) => {
        const npc = NpcType.get(state.activeNpc.type);
        state.pushInt(npc.category);
    }),

    [ScriptOpcode.NPC_COORD]: checkedHandler(ActiveNpc, (state) => {
        const packed = state.activeNpc.z | (state.activeNpc.x << 14) | (state.activeNpc.level << 28);
        state.pushInt(packed);
    }),

    [ScriptOpcode.NPC_DEL]: checkedHandler(ActiveNpc, (state) => {
        World.removeNpc(state.activeNpc);
    }),

    [ScriptOpcode.NPC_DELAY]: checkedHandler(ActiveNpc, (state) => {
        throw new Error('unimplemented');
    }),

    [ScriptOpcode.NPC_FACESQUARE]: checkedHandler(ActiveNpc, (state) => {
        const coord = state.popInt();
        const x = (coord >> 14) & 0x3fff;
        const z = coord & 0x3fff;
        state.activeNpc.faceSquare(x, z);
    }),

    [ScriptOpcode.NPC_FINDEXACT]: (state) => {
        throw new Error('unimplemented');
    },

    [ScriptOpcode.NPC_FINDHERO]: checkedHandler(ActiveNpc, (state) => {
        state.pushInt(state.activeNpc.hero);
    }),

    [ScriptOpcode.NPC_PARAM]: checkedHandler(ActiveNpc, (state) => {
        const paramId = state.popInt();
        const param = ParamType.get(paramId);
        const npc = NpcType.get(state.activeNpc.type);
        if (param.isString()) {
            state.pushString(ParamHelper.getStringParam(paramId, npc, param.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramId, npc, param.defaultInt));
        }
    }),

    [ScriptOpcode.NPC_QUEUE]: checkedHandler(ActiveNpc, (state) => {
        const delay = state.popInt();
        const queueId = state.popInt() - 1;
        if (queueId < 0 || queueId >= 20) {
            throw new Error(`Invalid ai_queue: ${queueId + 1}`);
        }

        const type = NpcType.get(state.activeNpc.type);
        const script = ScriptProvider.getByTrigger(ServerTriggerType.AI_QUEUE1 + queueId, type.id, type.category);
        if (script) {
            state.activeNpc.enqueueScript(script, delay);
        }
    }),

    [ScriptOpcode.NPC_RANGE]: checkedHandler(ActiveNpc, (state) => {
        const coord = state.popInt();
        const level = (coord >> 28) & 0x3fff;
        const x = (coord >> 14) & 0x3fff;
        const z = coord & 0x3fff;

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
        throw new Error('unimplemented');
    }),

    [ScriptOpcode.NPC_SETHUNTMODE]: checkedHandler(ActiveNpc, (state) => {
        throw new Error('unimplemented');
    }),

    [ScriptOpcode.NPC_SETMODE]: checkedHandler(ActiveNpc, (state) => {
        throw new Error('unimplemented');
    }),

    [ScriptOpcode.NPC_STAT]: checkedHandler(ActiveNpc, (state) => {
        throw new Error('unimplemented');
    }),

    [ScriptOpcode.NPC_STATHEAL]: checkedHandler(ActiveNpc, (state) => {
        throw new Error('unimplemented');
    }),

    [ScriptOpcode.NPC_TYPE]: checkedHandler(ActiveNpc, (state) => {
        state.pushInt(state.activeNpc.type);
    }),

    [ScriptOpcode.NPC_DAMAGE]: checkedHandler(ActiveNpc, (state) => {
        const amount = state.popInt();
        const type = state.popInt();

        state.activeNpc.applyDamage(amount, type, state.activePlayer.pid);
    }),

    [ScriptOpcode.NPC_NAME]: checkedHandler(ActiveNpc, (state) => {
        const npcType = NpcType.get(state.activeNpc.type);

        state.pushString(npcType.name ?? 'null');
    }),

    [ScriptOpcode.NPC_UID]: checkedHandler(ActiveNpc, (state) => {
        const npc = state.activeNpc;
        state.pushInt((npc.type << 16) | npc.nid);
    }),

    [ScriptOpcode.NPC_SETTIMER]: checkedHandler(ActiveNpc, (state) => {
        const interval = state.popInt();

        state.activeNpc.setTimer(interval);
    }),

    [ScriptOpcode.SPOTANIM_NPC]: checkedHandler(ActiveNpc, (state) => {
        const delay = state.popInt();
        const height = state.popInt();
        const spotanim = state.popInt();

        state.activeNpc.spotanim(spotanim, height, delay);
    }),

    [ScriptOpcode.NPC_FINDALLZONE]: (state) => {
        const coord = state.popInt();

        const level = (coord >> 28) & 0x3fff;
        const x = (coord >> 14) & 0x3fff;
        const z = coord & 0x3fff;

        state.npcFindAllZone = World.getZoneNpcs(x, z, level);
        state.npcFindAllZoneIndex = 0;

        // not necessary but if we want to refer to the original npc again, we can
        if (state._activeNpc) {
            state._activeNpc2 = state._activeNpc;
            state.pointerAdd(ScriptPointer.ActiveNpc2);
        }
    },

    [ScriptOpcode.NPC_FINDNEXT]: (state) => {
        const npc = state.npcFindAllZone[state.npcFindAllZoneIndex++];

        if (npc) {
            state._activeNpc = npc;
            state.pointerAdd(ScriptPointer.ActiveNpc);
        }

        state.pushInt(npc ? 1 : 0);
    },

    [ScriptOpcode.NPC_TELE]: checkedHandler(ActiveNpc, (state) => {
        const coord = state.popInt();

        const level = (coord >> 28) & 0x3fff;
        const x = (coord >> 14) & 0x3fff;
        const z = coord & 0x3fff;

        state.activeNpc.tele(x, z, level);
    }),
};

export default NpcOps;
