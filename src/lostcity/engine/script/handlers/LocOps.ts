import ParamType from '#lostcity/cache/ParamType.js';
import LocType from '#lostcity/cache/LocType.js';
import { ParamHelper } from '#lostcity/cache/ParamHelper.js';

import World from '#lostcity/engine/World.js';

import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import ScriptPointer, {ActiveLoc, checkedHandler} from '#lostcity/engine/script/ScriptPointer.js';
import { CommandHandlers } from '#lostcity/engine/script/ScriptRunner.js';
import {LocIterator} from '#lostcity/engine/script/ScriptIterators.js';

import Loc from '#lostcity/entity/Loc.js';
import { Position } from '#lostcity/entity/Position.js';

import {
    check,
    CoordValid,
    DurationValid,
    LocAngleValid,
    LocShapeValid,
    LocTypeValid,
    ParamTypeValid
} from '#lostcity/engine/script/ScriptValidators.js';

const LocOps: CommandHandlers = {
    [ScriptOpcode.LOC_ADD]: state => {
        const [coord, type, angle, shape, duration] = state.popInts(5);

        check(coord, CoordValid);
        check(type, LocTypeValid);
        check(angle, LocAngleValid);
        check(shape, LocShapeValid);
        check(duration, DurationValid);

        const pos = Position.unpackCoord(coord);

        const locType = LocType.get(type);
        const loc = new Loc(pos.level, pos.x, pos.z, locType.width, locType.length, type, shape, angle);

        World.addLoc(loc, duration);
        state.activeLoc = loc;
        state.pointerAdd(ActiveLoc[state.intOperand]);
    },

    [ScriptOpcode.LOC_ANGLE]: checkedHandler(ActiveLoc, state => {
        state.pushInt(state.activeLoc.angle);
    }),

    [ScriptOpcode.LOC_ANIM]: checkedHandler(ActiveLoc, state => {
        const seq = state.popInt();

        const loc = state.activeLoc;
        World.getZone(loc.x, loc.z, loc.level).animLoc(loc, seq);
    }),

    [ScriptOpcode.LOC_CATEGORY]: checkedHandler(ActiveLoc, state => {
        const locType = LocType.get(state.activeLoc.type);
        state.pushInt(locType.category);
    }),

    [ScriptOpcode.LOC_CHANGE]: checkedHandler(ActiveLoc, state => {
        const [id, duration] = state.popInts(2);

        check(id, LocTypeValid);
        check(duration, DurationValid);

        World.removeLoc(state.activeLoc, duration);

        const locType = LocType.get(id);
        const loc = new Loc(state.activeLoc.level, state.activeLoc.x, state.activeLoc.z, locType.width, locType.length, id, state.activeLoc.shape, state.activeLoc.angle);
        World.addLoc(loc, duration);

        state.activeLoc = loc;
        state.pointerAdd(ActiveLoc[state.intOperand]);
    }),

    [ScriptOpcode.LOC_COORD]: checkedHandler(ActiveLoc, state => {
        const loc = state.activeLoc;
        state.pushInt(Position.packCoord(loc.level, loc.x, loc.z));
    }),

    [ScriptOpcode.LOC_DEL]: checkedHandler(ActiveLoc, state => {
        const duration = check(state.popInt(), DurationValid);

        World.removeLoc(state.activeLoc, duration);
    }),

    [ScriptOpcode.LOC_FIND]: state => {
        const [coord, locId] = state.popInts(2);

        check(locId, LocTypeValid);
        check(coord, CoordValid);

        const pos = Position.unpackCoord(coord);
        const loc = World.getLoc(pos.x, pos.z, pos.level, locId);
        if (!loc || loc.respawn !== -1) {
            state.pushInt(0);
            return;
        }

        state._activeLoc = loc;
        state.pointerAdd(ScriptPointer.ActiveLoc);
        state.pushInt(1);
    },

    [ScriptOpcode.LOC_FINDALLZONE]: state => {
        const coord = check(state.popInt(), CoordValid);

        const {level, x, z} = Position.unpackCoord(coord);

        state.locIterator = new LocIterator(World.currentTick, level, x, z);
        // not necessary but if we want to refer to the original loc again, we can
        if (state._activeLoc) {
            state._activeLoc2 = state._activeLoc;
            state.pointerAdd(ScriptPointer.ActiveLoc2);
        }
    },

    [ScriptOpcode.LOC_FINDNEXT]: state => {
        const result = state.locIterator?.next();
        if (!result || result.done) {
            state.pushInt(0);
            return;
        }

        state.activeLoc = result.value;
        state.pointerAdd(ActiveLoc[state.intOperand]);
        state.pushInt(1);
    },

    [ScriptOpcode.LOC_PARAM]: checkedHandler(ActiveLoc, state => {
        const paramId = check(state.popInt(), ParamTypeValid);

        const param = ParamType.get(paramId);
        const loc = LocType.get(state.activeLoc.type);
        if (param.isString()) {
            state.pushString(ParamHelper.getStringParam(paramId, loc, param.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramId, loc, param.defaultInt));
        }
    }),

    [ScriptOpcode.LOC_TYPE]: checkedHandler(ActiveLoc, state => {
        state.pushInt(state.activeLoc.type);
    }),

    [ScriptOpcode.LOC_NAME]: checkedHandler(ActiveLoc, state => {
        const loc = LocType.get(state.activeLoc.type);

        state.pushString(loc.name ?? 'null');
    }),

    [ScriptOpcode.LOC_SHAPE]: checkedHandler(ActiveLoc, state => {
        state.pushInt(state.activeLoc.shape);
    })
};

export default LocOps;
