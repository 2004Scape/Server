import ObjType from '#lostcity/cache/ObjType.js';
import { ParamHelper } from '#lostcity/cache/ParamHelper.js';
import ParamType from '#lostcity/cache/ParamType.js';

import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import { CommandHandlers } from '#lostcity/engine/script/ScriptRunner.js';

import {check, ObjTypeValid, ParamTypeValid} from '#lostcity/engine/script/ScriptInputValidator.js';

const ObjConfigOps: CommandHandlers = {
    [ScriptOpcode.OC_NAME]: state => {
        const objId = check(state.popInt(), ObjTypeValid);

        const objType = ObjType.get(objId);
        state.pushString(objType.name ?? objType.debugname ?? 'null');
    },

    [ScriptOpcode.OC_PARAM]: state => {
        const [objId, paramId] = state.popInts(2);

        check(objId, ObjTypeValid);
        check(paramId, ParamTypeValid);

        const obj = ObjType.get(objId);
        const param = ParamType.get(paramId);
        if (param.isString()) {
            state.pushString(ParamHelper.getStringParam(paramId, obj, param.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramId, obj, param.defaultInt));
        }
    },

    [ScriptOpcode.OC_CATEGORY]: state => {
        const objId = check(state.popInt(), ObjTypeValid);

        const objType = ObjType.get(objId);
        state.pushInt(objType.category);
    },

    [ScriptOpcode.OC_DESC]: state => {
        const objId = check(state.popInt(), ObjTypeValid);

        const objType = ObjType.get(objId);
        state.pushString(objType.desc ?? 'null');
    },

    [ScriptOpcode.OC_MEMBERS]: state => {
        const objId = check(state.popInt(), ObjTypeValid);

        const objType = ObjType.get(objId);
        state.pushInt(objType.members ? 1 : 0);
    },

    [ScriptOpcode.OC_WEIGHT]: state => {
        const objId = check(state.popInt(), ObjTypeValid);

        const objType = ObjType.get(objId);
        state.pushInt(objType.weight);
    },

    [ScriptOpcode.OC_WEARPOS]: state => {
        const objId = check(state.popInt(), ObjTypeValid);

        const objType = ObjType.get(objId);
        state.pushInt(objType.wearpos);
    },

    [ScriptOpcode.OC_WEARPOS2]: state => {
        const objId = check(state.popInt(), ObjTypeValid);

        const objType = ObjType.get(objId);
        state.pushInt(objType.wearpos2);
    },

    [ScriptOpcode.OC_WEARPOS3]: state => {
        const objId = check(state.popInt(), ObjTypeValid);

        const objType = ObjType.get(objId);
        state.pushInt(objType.wearpos3);
    },

    [ScriptOpcode.OC_COST]: state => {
        const objId = check(state.popInt(), ObjTypeValid);

        const obj = ObjType.get(objId);
        state.pushInt(obj?.cost);
    },

    [ScriptOpcode.OC_TRADEABLE]: state => {
        const objId = check(state.popInt(), ObjTypeValid);

        const obj = ObjType.get(objId);
        state.pushInt(obj?.tradeable ? 1 : 0);
    },

    [ScriptOpcode.OC_DEBUGNAME]: state => {
        const objId = check(state.popInt(), ObjTypeValid);

        const objType = ObjType.get(objId);
        state.pushString(objType.debugname ?? 'null');
    },

    [ScriptOpcode.OC_CERT]: state => {
        const objId = check(state.popInt(), ObjTypeValid);

        const objType = ObjType.get(objId);
        if (objType.certtemplate == -1 && objType.certlink >= 0) {
            state.pushInt(objType.certlink);
        } else {
            state.pushInt(objId);
        }
    },

    [ScriptOpcode.OC_UNCERT]: state => {
        const objId = check(state.popInt(), ObjTypeValid);

        const objType = ObjType.get(objId);
        if (objType.certtemplate >= 0 && objType.certlink >= 0) {
            state.pushInt(objType.certlink);
        } else {
            state.pushInt(objId);
        }
    },

    [ScriptOpcode.OC_STACKABLE]: state => {
        const objId = check(state.popInt(), ObjTypeValid);

        const objType = ObjType.get(objId);
        state.pushInt(objType.stackable ? 1 : 0);
    }
};

export default ObjConfigOps;
