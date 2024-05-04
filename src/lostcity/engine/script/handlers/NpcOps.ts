import HuntType from '#lostcity/cache/HuntType.js';
import ParamType from '#lostcity/cache/ParamType.js';
import NpcType from '#lostcity/cache/NpcType.js';
import { ParamHelper } from '#lostcity/cache/ParamHelper.js';

import World from '#lostcity/engine/World.js';

import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import ScriptPointer, { checkedHandler } from '#lostcity/engine/script/ScriptPointer.js';
import ScriptProvider from '#lostcity/engine/script/ScriptProvider.js';
import { CommandHandlers } from '#lostcity/engine/script/ScriptRunner.js';
import ScriptState from '#lostcity/engine/script/ScriptState.js';
import ServerTriggerType from '#lostcity/engine/script/ServerTriggerType.js';
import {NpcIterator} from '#lostcity/engine/script/ScriptIterators.js';

import Loc from '#lostcity/entity/Loc.js';
import Obj from '#lostcity/entity/Obj.js';
import { Position } from '#lostcity/entity/Position.js';
import Npc from '#lostcity/entity/Npc.js';
import NpcMode from '#lostcity/entity/NpcMode.js';
import Player from '#lostcity/entity/Player.js';

import Environment from '#lostcity/util/Environment.js';

import {
    check,
    CoordValid,
    DurationValid,
    HitTypeValid,
    HuntTypeValid,
    NpcModeValid,
    NpcStatValid,
    NpcTypeValid,
    NumberNotNull,
    ParamTypeValid,
    QueueValid,
    SpotAnimTypeValid
} from '#lostcity/engine/script/ScriptValidators.js';

const ActiveNpc = [ScriptPointer.ActiveNpc, ScriptPointer.ActiveNpc2];

const NpcOps: CommandHandlers = {
    [ScriptOpcode.NPC_FINDUID]: state => {
        const npcUid = state.popInt();
        const slot = npcUid & 0xffff;
        const expectedType = (npcUid >> 16) & 0xffff;
        const npc = World.getNpc(slot);

        if (!npc || npc.type !== expectedType) {
            state.pushInt(0);
            return;
        }

        state.activeNpc = npc;
        state.pointerAdd(ActiveNpc[state.intOperand]);
        state.pushInt(1);
    },

    [ScriptOpcode.NPC_ADD]: state => {
        const [coord, id, duration] = state.popInts(3);

        check(coord, CoordValid);
        check(id, NpcTypeValid);
        check(duration, DurationValid);

        const pos = Position.unpackCoord(coord);
        const npcType = NpcType.get(id);

        const npc = new Npc(pos.level, pos.x, pos.z, npcType.size, npcType.size, World.getNextNid(), npcType.id, npcType.moverestrict, npcType.blockwalk);

        npc.static = false;
        npc.despawn = World.currentTick + duration;
        World.addNpc(npc);
        state.activeNpc = npc;
        state.pointerAdd(ActiveNpc[state.intOperand]);
    },

    [ScriptOpcode.NPC_ANIM]: checkedHandler(ActiveNpc, state => {
        const delay = state.popInt();
        const seq = state.popInt();

        state.activeNpc.playAnimation(seq, delay);
    }),

    [ScriptOpcode.NPC_BASESTAT]: checkedHandler(ActiveNpc, state => {
        const stat = check(state.popInt(), NpcStatValid);

        state.pushInt(state.activeNpc.baseLevels[stat]);
    }),

    [ScriptOpcode.NPC_CATEGORY]: checkedHandler(ActiveNpc, state => {
        const npc = NpcType.get(state.activeNpc.type);
        state.pushInt(npc.category);
    }),

    [ScriptOpcode.NPC_COORD]: checkedHandler(ActiveNpc, state => {
        const npc = state.activeNpc;
        state.pushInt(Position.packCoord(npc.level, npc.x, npc.z));
    }),

    [ScriptOpcode.NPC_DEL]: checkedHandler(ActiveNpc, state => {
        if (Environment.CLIRUNNER) {
            return;
        }

        World.removeNpc(state.activeNpc);
    }),

    [ScriptOpcode.NPC_DELAY]: checkedHandler(ActiveNpc, state => {
        if (Environment.CLIRUNNER) {
            return;
        }

        state.activeNpc.delay = state.popInt() + 1;
        state.execution = ScriptState.NPC_SUSPENDED;
    }),

    [ScriptOpcode.NPC_FACESQUARE]: checkedHandler(ActiveNpc, state => {
        const coord = check(state.popInt(), CoordValid);

        const pos = Position.unpackCoord(coord);
        state.activeNpc.faceSquare(pos.x, pos.z);
    }),

    [ScriptOpcode.NPC_FINDEXACT]: state => {
        const [coord, id] = state.popInts(2);

        check(coord, CoordValid);
        check(id, NpcTypeValid);

        const {level, x, z} = Position.unpackCoord(coord);
        state.npcIterator = new NpcIterator(World.currentTick, level, x, z);

        for (const npc of state.npcIterator) {
            if(npc && npc.type === id && npc.x === x && npc.level === level && npc.z === z) {
                state.activeNpc = npc;
                state.pointerAdd(ActiveNpc[state.intOperand]);
                state.pushInt(1);
                return;
            }
        }
        state.pushInt(0);
        return;
    },

    [ScriptOpcode.NPC_FINDHERO]: checkedHandler(ActiveNpc, state => {
        const uid = state.activeNpc.findHero();
        if (uid === -1) {
            state.pushInt(0);
            return;
        }

        const player = World.getPlayerByUid(uid);
        if (!player) {
            state.pushInt(0);
            return;
        }

        state.activePlayer = player;
        state.pointerAdd(ScriptPointer.ActivePlayer);
        state.pushInt(1);
    }),

    [ScriptOpcode.NPC_PARAM]: checkedHandler(ActiveNpc, state => {
        const paramId = state.popInt();

        check(paramId, ParamTypeValid);

        const param = ParamType.get(paramId);
        const npc = NpcType.get(state.activeNpc.type);
        if (param.isString()) {
            state.pushString(ParamHelper.getStringParam(paramId, npc, param.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramId, npc, param.defaultInt));
        }
    }),

    [ScriptOpcode.NPC_QUEUE]: checkedHandler(ActiveNpc, state => {
        const delay = state.popInt();
        const arg = state.popInt();
        const queueId = state.popInt() - 1;

        check(queueId, QueueValid);

        const type = NpcType.get(state.activeNpc.type);
        const script = ScriptProvider.getByTrigger(ServerTriggerType.AI_QUEUE1 + queueId, type.id, type.category);
        if (script) {
            state.activeNpc.enqueueScript(script, delay, [arg]);
        }
    }),

    [ScriptOpcode.NPC_RANGE]: checkedHandler(ActiveNpc, state => {
        const coord = check(state.popInt(), CoordValid);

        const pos = Position.unpackCoord(coord);
        const npc = state.activeNpc;

        if (pos.level !== npc.level) {
            state.pushInt(-1);
        } else {
            state.pushInt(
                Position.distanceTo(npc, {
                    x: pos.x,
                    z: pos.z,
                    width: 1,
                    length: 1
                })
            );
        }
    }),

    [ScriptOpcode.NPC_SAY]: checkedHandler(ActiveNpc, state => {
        state.activeNpc.say(state.popString());
    }),

    [ScriptOpcode.NPC_SETHUNT]: checkedHandler(ActiveNpc, state => {
        state.activeNpc.huntrange = check(state.popInt(), NumberNotNull);
    }),

    [ScriptOpcode.NPC_SETHUNTMODE]: checkedHandler(ActiveNpc, state => {
        const mode = check(state.popInt(), HuntTypeValid);

        const huntType = HuntType.get(mode);
        state.activeNpc.huntMode = huntType.id;
    }),

    [ScriptOpcode.NPC_SETMODE]: checkedHandler(ActiveNpc, state => {
        const mode = check(state.popInt(), NpcModeValid);

        state.activeNpc.mode = mode;
        state.activeNpc.clearWaypoints();

        if (mode === NpcMode.NULL || mode === NpcMode.NONE || mode === NpcMode.WANDER || mode === NpcMode.PATROL) {
            state.activeNpc.clearInteraction();
            return;
        }

        let target: Player | Npc | Loc | Obj | null;
        if (mode >= NpcMode.OPNPC1) {
            target = state._activeNpc2;
        } else if (mode >= NpcMode.OPOBJ1) {
            target = state._activeObj;
        } else if (mode >= NpcMode.OPLOC1) {
            target = state._activeLoc;
        } else {
            target = state._activePlayer;
        }

        if (target) {
            state.activeNpc.setInteraction(target, mode);
        } else {
            state.activeNpc.noMode();
        }
    }),

    [ScriptOpcode.NPC_STAT]: checkedHandler(ActiveNpc, state => {
        const stat = check(state.popInt(), NpcStatValid);

        state.pushInt(state.activeNpc.levels[stat]);
    }),

    [ScriptOpcode.NPC_STATHEAL]: checkedHandler(ActiveNpc, state => {
        const [stat, constant, percent] = state.popInts(3);

        check(stat, NpcStatValid);
        check(constant, NumberNotNull);
        check(percent, NumberNotNull);

        const npc = state.activeNpc;
        const base = npc.baseLevels[stat];
        const current = npc.levels[stat];
        const healed = current + (constant + (current * percent) / 100);
        npc.levels[stat] = Math.min(healed, base);

        // reset hero points if hp current == base
        if (stat === 0 && npc.levels[stat] === npc.baseLevels[stat]) {
            npc.resetHeroPoints();
        }
    }),

    [ScriptOpcode.NPC_TYPE]: checkedHandler(ActiveNpc, state => {
        state.pushInt(state.activeNpc.type);
    }),

    [ScriptOpcode.NPC_DAMAGE]: checkedHandler(ActiveNpc, state => {
        const amount = check(state.popInt(), NumberNotNull);
        const type = check(state.popInt(), HitTypeValid);

        state.activeNpc.applyDamage(amount, type);
    }),

    [ScriptOpcode.NPC_NAME]: checkedHandler(ActiveNpc, state => {
        const npcType = NpcType.get(state.activeNpc.type);

        state.pushString(npcType.name ?? 'null');
    }),

    [ScriptOpcode.NPC_UID]: checkedHandler(ActiveNpc, state => {
        state.pushInt(state.activeNpc.uid);
    }),

    [ScriptOpcode.NPC_SETTIMER]: checkedHandler(ActiveNpc, state => {
        const interval = check(state.popInt(), NumberNotNull);

        state.activeNpc.setTimer(interval);
    }),

    [ScriptOpcode.SPOTANIM_NPC]: checkedHandler(ActiveNpc, state => {
        const delay = state.popInt();
        const height = state.popInt();
        const spotanim = state.popInt();

        check(spotanim, SpotAnimTypeValid);

        state.activeNpc.spotanim(spotanim, height, delay);
    }),

    [ScriptOpcode.NPC_FINDALLZONE]: state => {
        const coord: number = check(state.popInt(), CoordValid);

        const {level, x, z} = Position.unpackCoord(coord);

        state.npcIterator = new NpcIterator(World.currentTick, level, x, z);
        // not necessary but if we want to refer to the original npc again, we can
        if (state._activeNpc) {
            state._activeNpc2 = state._activeNpc;
            state.pointerAdd(ScriptPointer.ActiveNpc2);
        }
    },

    [ScriptOpcode.NPC_FINDNEXT]: state => {
        const result = state.npcIterator?.next();
        if (!result || result.done) {
            // no more npcs in zone
            state.pushInt(0);
            return;
        }

        state.activeNpc = result.value;
        state.pointerAdd(ActiveNpc[state.intOperand]);
        state.pushInt(1);
    },

    [ScriptOpcode.NPC_TELE]: checkedHandler(ActiveNpc, state => {
        const coord = check(state.popInt(), CoordValid);

        const pos = Position.unpackCoord(coord);
        state.activeNpc.teleport(pos.x, pos.z, pos.level);
    }),

    [ScriptOpcode.NPC_WALK]: checkedHandler(ActiveNpc, state => {
        const coord = check(state.popInt(), CoordValid);

        const pos = Position.unpackCoord(coord);
        state.activeNpc.queueWaypoint(pos.x, pos.z);
    }),

    [ScriptOpcode.NPC_CHANGETYPE]: checkedHandler(ActiveNpc, state => {
        const id = check(state.popInt(), NpcTypeValid);

        state.activeNpc.changeType(id);
    }),

    [ScriptOpcode.NPC_GETMODE]: checkedHandler(ActiveNpc, state => {
        state.pushInt(state.activeNpc.mode);
    }),

    [ScriptOpcode.NPC_HEROPOINTS]: checkedHandler([ScriptPointer.ActivePlayer, ...ActiveNpc], state => {
        const damage = check(state.popInt(), NumberNotNull);

        state.activeNpc.addHero(state.activePlayer.uid, damage);
    }),

    [ScriptOpcode.NPC_WALKTRIGGER]: checkedHandler(ActiveNpc, state => {
        const [queueId, arg] = state.popInts(2);

        check(queueId, QueueValid);

        state.activeNpc.walktrigger = queueId - 1;
        state.activeNpc.walktriggerArg = arg;
    }),

    [ScriptOpcode.NPC_STATADD]: checkedHandler(ActiveNpc, state => {
        const [stat, constant, percent] = state.popInts(3);

        check(stat, NpcStatValid);
        check(constant, NumberNotNull);
        check(percent, NumberNotNull);

        const npc = state.activeNpc;
        const current = npc.levels[stat];
        const added = current + (constant + (current * percent) / 100);
        npc.levels[stat] = Math.min(added, 255);

        if (stat === 0 && npc.levels[stat] >= npc.baseLevels[stat]) {
            npc.resetHeroPoints();
        }
    }),

    [ScriptOpcode.NPC_STATSUB]: checkedHandler(ActiveNpc, state => {
        const [stat, constant, percent] = state.popInts(3);

        check(stat, NpcStatValid);
        check(constant, NumberNotNull);
        check(percent, NumberNotNull);

        const npc = state.activeNpc;
        const current = npc.levels[stat];
        const subbed = current - (constant + (current * percent) / 100);
        npc.levels[stat] = Math.max(subbed, 0);
    })
};

export default NpcOps;
