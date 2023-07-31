import { CommandHandlers } from '#lostcity/engine/script/ScriptRunner.js';
import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import ParamType from '#lostcity/cache/ParamType.js';
import LocType from '#lostcity/cache/LocType.js';
import { ParamHelper } from '#lostcity/cache/ParamHelper.js';
import ScriptPointer, { checkedHandler } from '#lostcity/engine/script/ScriptPointer.js';
import World from '#lostcity/engine/World.js';
import Loc from '#lostcity/entity/Loc.js';

const ActiveLoc = [ScriptPointer.ActiveLoc, ScriptPointer.ActiveLoc2];

const LocOps: CommandHandlers = {
    [ScriptOpcode.LOC_ADD]: (state) => {
        const [coord, type, angle, shape, duration] = state.popInts(5);
        const loc = new Loc();
        loc.type = type;
        loc.rotation = angle & 0x3;
        loc.shape = shape;
        loc.level = (coord >> 28) & 0x3fff;
        loc.x = (coord >> 14) & 0x3fff;
        loc.z = coord & 0x3fff;
        World.addLoc(loc, duration);
    },

    [ScriptOpcode.LOC_ANGLE]: checkedHandler(ActiveLoc, (state) => {
        state.pushInt(state.activeLoc.rotation);
    }),

    [ScriptOpcode.LOC_ANIM]: checkedHandler(ActiveLoc, (state) => {
        throw new Error('unimplemented');
    }),

    [ScriptOpcode.LOC_CATEGORY]: checkedHandler(ActiveLoc, (state) => {
        const loc = LocType.get(state.activeLoc.type);
        state.pushInt(loc.category);
    }),

    [ScriptOpcode.LOC_CHANGE]: checkedHandler(ActiveLoc, (state) => {
        throw new Error('unimplemented');
    }),

    [ScriptOpcode.LOC_COORD]: checkedHandler(ActiveLoc, (state) => {
        const packed = state.activeLoc.z | (state.activeLoc.x << 14) | (state.activeLoc.level << 28);
        state.pushInt(packed);
    }),

    [ScriptOpcode.LOC_DEL]: checkedHandler(ActiveLoc, (state) => {
        const duration = state.popInt();
        World.removeLoc(state.activeLoc, duration);
    }),

    [ScriptOpcode.LOC_FINDALLZONE]: (state) => {
        const coord = state.popInt();

        const level = (coord >> 28) & 0x3fff;
        const x = (coord >> 14) & 0x3fff;
        const z = coord & 0x3fff;

        state.locFindAllZone = World.getZoneLocs(x, z, level);

        // not necessary but if we want to refer to the original loc again, we can
        if (state._activeLoc) {
            state._activeLoc2 = state._activeLoc;
            state.pointerAdd(ScriptPointer.ActiveLoc2);
        }
    },

    [ScriptOpcode.LOC_FINDNEXT]: (state) => {
        const loc = state.locFindAllZone.shift();

        if (loc) {
            state._activeLoc = loc;
            state.pointerAdd(ScriptPointer.ActiveLoc);
        }

        state.pushInt(loc ? 1 : 0);
    },

    [ScriptOpcode.LOC_PARAM]: checkedHandler(ActiveLoc, (state) => {
        const paramId = state.popInt();
        const param = ParamType.get(paramId);
        const loc = LocType.get(state.activeLoc.type);
        if (param.isString()) {
            state.pushString(ParamHelper.getStringParam(paramId, loc, param.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramId, loc, param.defaultInt));
        }
    }),

    [ScriptOpcode.LOC_TYPE]: checkedHandler(ActiveLoc, (state) => {
        state.pushInt(state.activeLoc.type);
    }),

    [ScriptOpcode.LOC_NAME]: checkedHandler(ActiveLoc, (state) => {
        const loc = LocType.get(state.activeLoc.type);
        
        state.pushString(loc.name ?? 'null');
    }),

    [ScriptOpcode.LOC_SHAPE]: checkedHandler(ActiveLoc, (state) => {
        state.pushInt(state.activeLoc.shape);
    }),
};

export default LocOps;
