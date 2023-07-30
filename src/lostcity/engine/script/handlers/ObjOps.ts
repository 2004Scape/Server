import { CommandHandlers } from '#lostcity/engine/script/ScriptRunner.js';
import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import ObjType from '#lostcity/cache/ObjType.js';
import ParamType from '#lostcity/cache/ParamType.js';
import { ParamHelper } from '#lostcity/cache/ParamHelper.js';
import World from '#lostcity/engine/World.js';
import Obj from '#lostcity/entity/Obj.js';

const ObjOps: CommandHandlers = {
    [ScriptOpcode.OBJ_ADD]: (state) => {
        const [coord, type, count, duration] = state.popInts(4);

        const obj = new Obj();
        obj.type = type;
        obj.count = count;
        obj.level = (coord >> 28) & 0x3fff;
        obj.x = (coord >> 14) & 0x3fff;
        obj.z = coord & 0x3fff;
        World.addObj(obj, state.activePlayer, duration);
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
};

export default ObjOps;
