import InvType from '#lostcity/cache/InvType.js';
import ObjType from '#lostcity/cache/ObjType.js';
import { ParamHelper } from '#lostcity/cache/ParamHelper.js';
import ParamType from '#lostcity/cache/ParamType.js';

import World from '#lostcity/engine/World.js';

import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import ScriptPointer from '#lostcity/engine/script/ScriptPointer.js';
import { CommandHandlers } from '#lostcity/engine/script/ScriptRunner.js';

import Obj from '#lostcity/entity/Obj.js';
import { Position } from '#lostcity/entity/Position.js';

import Environment from '#lostcity/util/Environment.js';
import {
    check,
    CoordValid,
    DurationValid,
    InvTypeValid,
    ObjNotDummyValid,
    ObjStackValid,
    ObjTypeValid,
    ParamTypeValid
} from '#lostcity/engine/script/ScriptValidators.js';

const ActiveObj = [ScriptPointer.ActiveObj, ScriptPointer.ActiveObj2];
const ActivePlayer = [ScriptPointer.ActivePlayer, ScriptPointer.ActivePlayer2];

const ObjOps: CommandHandlers = {
    [ScriptOpcode.OBJ_ADD]: state => {
        const [coord, objId, count, duration] = state.popInts(4);

        if (objId === -1 || count === -1) {
            return;
        }

        check(objId, ObjTypeValid, ObjNotDummyValid);
        check(duration, DurationValid);
        check(coord, CoordValid);
        check(count, ObjStackValid);

        const {level, x, z} = Position.unpackCoord(coord);
        const obj: Obj = new Obj(level, x, z, objId, count);

        World.addObj(obj, state.activePlayer, duration);
        state.activeObj = obj;
        state.pointerAdd(ActiveObj[state.intOperand]);

        if (Environment.CLIRUNNER) {
            state.activePlayer.invAdd(InvType.getByName('bank')!.id, objId, count);
        }
    },

    [ScriptOpcode.OBJ_ADDALL]: state => {
        throw new Error('unimplemented');
    },

    [ScriptOpcode.OBJ_PARAM]: state => {
        const paramId = check(state.popInt(), ParamTypeValid);

        const param = ParamType.get(paramId);
        const obj = ObjType.get(state.activeObj.type);
        if (param.isString()) {
            state.pushString(ParamHelper.getStringParam(paramId, obj, param.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramId, obj, param.defaultInt));
        }
    },

    [ScriptOpcode.OBJ_NAME]: state => {
        const obj = ObjType.get(state.activeObj.type);

        state.pushString(obj.name ?? obj.debugname ?? 'null');
    },

    [ScriptOpcode.OBJ_DEL]: state => {
        if (state.pointerGet(ActivePlayer[state.intOperand])) {
            World.removeObj(state.activeObj, state.activePlayer);
        } else {
            World.removeObj(state.activeObj, null);
        }
    },

    [ScriptOpcode.OBJ_COUNT]: state => {
        state.pushInt(state.activeObj.count);
    },

    [ScriptOpcode.OBJ_TYPE]: state => {
        state.pushInt(state.activeObj.type);
    },

    [ScriptOpcode.OBJ_TAKEITEM]: state => {
        const inv = check(state.popInt(), InvTypeValid);

        const obj = state.activeObj;
        if (World.getObj(obj.x, obj.z, obj.level, obj.id)) {
            const objType = ObjType.get(obj.type);
            state.activePlayer.playerLog('Picked up item', objType.debugname as string);

            state.activePlayer.invAdd(inv, obj.id, obj.count);
            World.removeObj(obj, state.activePlayer);
        }
    },

    [ScriptOpcode.OBJ_COORD]: state => {
        const obj = state.activeObj;
        state.pushInt(Position.packCoord(obj.level, obj.x, obj.z));
    }
};

export default ObjOps;
