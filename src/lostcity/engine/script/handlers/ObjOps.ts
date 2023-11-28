import { CommandHandlers } from '#lostcity/engine/script/ScriptRunner.js';
import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import ObjType from '#lostcity/cache/ObjType.js';
import ParamType from '#lostcity/cache/ParamType.js';
import { ParamHelper } from '#lostcity/cache/ParamHelper.js';
import World from '#lostcity/engine/World.js';
import Obj from '#lostcity/entity/Obj.js';
import { Inventory } from '#lostcity/engine/Inventory.js';
import { Position } from '#lostcity/entity/Position.js';
import ScriptPointer from '#lostcity/engine/script/ScriptPointer.js';

const ActiveObj = [ScriptPointer.ActiveObj, ScriptPointer.ActiveObj2];

const ObjOps: CommandHandlers = {
    [ScriptOpcode.OBJ_ADD]: (state) => {
        const [coord, type, count, duration] = state.popInts(4);

        if (type == -1) {
            throw new Error('OBJ_ADD attempted to use obj was null.');
        }

        if (count < 1 || count > Inventory.STACK_LIMIT) {
            throw new Error(`OBJ_ADD attempted to use count that was out of range: ${count}. Range should be: 1 to ${Inventory.STACK_LIMIT}`);
        }

        if (duration < 1) {
            throw new Error(`OBJ_ADD attempted to use duration that was out of range: ${duration}. duration should be greater than zero.`);
        }

        if (coord < 0 || coord > Position.max) {
            throw new Error(`OBJ_ADD attempted to use coord that was out of range: ${coord}. Range should be: 0 to ${Position.max}`);
        }

        const pos = Position.unpackCoord(coord);

        const obj = new Obj(
            pos.level,
            pos.x,
            pos.z,
            type,
            count
        );

        World.addObj(obj, state.activePlayer, duration);
        state.activeObj = obj;
        state.pointerAdd(ActiveObj[state.intOperand]);
    },

    [ScriptOpcode.OBJ_ADDALL]: (state) => {
        throw new Error('unimplemented');
    },

    [ScriptOpcode.OBJ_PARAM]: (state) => {
        const paramId = state.popInt();
        const param = ParamType.get(paramId);

        const obj = ObjType.get(state.activeObj.type);
        if (param.isString()) {
            state.pushString(ParamHelper.getStringParam(paramId, obj, param.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramId, obj, param.defaultInt));
        }
    },

    [ScriptOpcode.OBJ_NAME]: (state) => {
        const obj = ObjType.get(state.activeObj.type);

        state.pushString(obj.name ?? obj.debugname ?? 'null');
    },

    [ScriptOpcode.OBJ_DEL]: (state) => {
        World.removeObj(state.activeObj, state.activePlayer);
    },

    [ScriptOpcode.OBJ_COUNT]: (state) => {
        state.pushInt(state.activeObj.count);
    },

    [ScriptOpcode.OBJ_TYPE]: (state) => {
        state.pushInt(state.activeObj.type);
    },

    [ScriptOpcode.OBJ_TAKEITEM]: (state) => {
        const inv = state.popInt();
        const obj = state.activeObj;

        state.activePlayer.invAdd(inv, obj.id, obj.count);
        World.removeObj(obj, state.activePlayer);
    },
};

export default ObjOps;
