import { CommandHandlers } from '#lostcity/engine/script/ScriptRunner.js';
import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import ObjType from '#lostcity/cache/ObjType.js';
import ParamType from '#lostcity/cache/ParamType.js';
import { ParamHelper } from '#lostcity/cache/ParamHelper.js';

const ObjConfigOps: CommandHandlers = {
    [ScriptOpcode.OC_NAME]: (state) => {
        const objId = state.popInt();
        const objType = ObjType.get(objId);

        state.pushString(objType.name ?? objType.debugname ?? 'null');
    },

    [ScriptOpcode.OC_PARAM]: (state) => {
        const [objId, paramId] = state.popInts(2);
        const obj = ObjType.get(objId);
        const param = ParamType.get(paramId);
        if (param.isString()) {
            state.pushString(ParamHelper.getStringParam(paramId, obj, param.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramId, obj, param.defaultInt));
        }
    },

    [ScriptOpcode.OC_CATEGORY]: (state) => {
        const objId = state.popInt();
        const objType = ObjType.get(objId);

        state.pushInt(objType.category);
    },

    [ScriptOpcode.OC_DESC]: (state) => {
        const objId = state.popInt();
        const objType = ObjType.get(objId);

        state.pushString(objType.desc ?? 'null');
    },

    [ScriptOpcode.OC_MEMBERS]: (state) => {
        const objId = state.popInt();
        const objType = ObjType.get(objId);

        state.pushInt(objType.members ? 1 : 0);
    },

    [ScriptOpcode.OC_WEIGHT]: (state) => {
        const objId = state.popInt();
        const objType = ObjType.get(objId);

        state.pushInt(objType.weight);
    },

    [ScriptOpcode.OC_WEARPOS]: (state) => {
        const objId = state.popInt();
        const objType = ObjType.get(objId);

        state.pushInt(objType.wearpos);
    },

    [ScriptOpcode.OC_WEARPOS2]: (state) => {
        const objId = state.popInt();
        const objType = ObjType.get(objId);

        state.pushInt(objType.wearpos2);
    },

    [ScriptOpcode.OC_WEARPOS3]: (state) => {
        const objId = state.popInt();
        const objType = ObjType.get(objId);

        state.pushInt(objType.wearpos3);
    },

    [ScriptOpcode.OC_COST]: (state) => {
        const objId = state.popInt();
        const obj = ObjType.get(objId);
        state.pushInt(obj?.cost);
    },

    [ScriptOpcode.OC_TRADEABLE]: (state) => {
        const objId = state.popInt();
        const obj = ObjType.get(objId);
        state.pushInt(obj?.tradeable ? 1 : 0);
    },

    [ScriptOpcode.OC_DEBUGNAME]: (state) => {
        const objId = state.popInt();
        const objType = ObjType.get(objId);

        state.pushString(objType.debugname ?? 'null');
    },
};

export default ObjConfigOps;
