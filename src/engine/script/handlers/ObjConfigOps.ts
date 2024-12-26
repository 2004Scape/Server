import ObjType from '#/cache/config/ObjType.js';
import { ParamHelper } from '#/cache/config/ParamHelper.js';
import ParamType from '#/cache/config/ParamType.js';

import ScriptOpcode from '#/engine/script/ScriptOpcode.js';
import { CommandHandlers } from '#/engine/script/ScriptRunner.js';

import {check, ObjTypeValid, ParamTypeValid} from '#/engine/script/ScriptValidators.js';

const ObjConfigOps: CommandHandlers = {
    [ScriptOpcode.OC_NAME]: state => {
        const objType: ObjType = check(state.popInt(), ObjTypeValid);

        state.pushString(objType.name ?? objType.debugname ?? 'null');
    },

    [ScriptOpcode.OC_PARAM]: state => {
        const [objId, paramId] = state.popInts(2);

        const objType: ObjType = check(objId, ObjTypeValid);
        const paramType: ParamType = check(paramId, ParamTypeValid);
        if (paramType.isString()) {
            state.pushString(ParamHelper.getStringParam(paramType.id, objType, paramType.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramType.id, objType, paramType.defaultInt));
        }
    },

    [ScriptOpcode.OC_CATEGORY]: state => {
        state.pushInt(check(state.popInt(), ObjTypeValid).category);
    },

    [ScriptOpcode.OC_DESC]: state => {
        state.pushString(check(state.popInt(), ObjTypeValid).desc ?? 'null');
    },

    [ScriptOpcode.OC_MEMBERS]: state => {
        state.pushInt(check(state.popInt(), ObjTypeValid).members ? 1 : 0);
    },

    [ScriptOpcode.OC_WEIGHT]: state => {
        state.pushInt(check(state.popInt(), ObjTypeValid).weight);
    },

    [ScriptOpcode.OC_WEARPOS]: state => {
        state.pushInt(check(state.popInt(), ObjTypeValid).wearpos);
    },

    [ScriptOpcode.OC_WEARPOS2]: state => {
        state.pushInt(check(state.popInt(), ObjTypeValid).wearpos2);
    },

    [ScriptOpcode.OC_WEARPOS3]: state => {
        state.pushInt(check(state.popInt(), ObjTypeValid).wearpos3);
    },

    [ScriptOpcode.OC_COST]: state => {
        state.pushInt(check(state.popInt(), ObjTypeValid).cost);
    },

    [ScriptOpcode.OC_TRADEABLE]: state => {
        state.pushInt(check(state.popInt(), ObjTypeValid).tradeable ? 1 : 0);
    },

    [ScriptOpcode.OC_DEBUGNAME]: state => {
        state.pushString(check(state.popInt(), ObjTypeValid).debugname ?? 'null');
    },

    [ScriptOpcode.OC_CERT]: state => {
        const objType: ObjType = check(state.popInt(), ObjTypeValid);

        if (objType.certtemplate == -1 && objType.certlink >= 0) {
            state.pushInt(objType.certlink);
        } else {
            state.pushInt(objType.id);
        }
    },

    [ScriptOpcode.OC_UNCERT]: state => {
        const objType: ObjType = check(state.popInt(), ObjTypeValid);

        if (objType.certtemplate >= 0 && objType.certlink >= 0) {
            state.pushInt(objType.certlink);
        } else {
            state.pushInt(objType.id);
        }
    },

    [ScriptOpcode.OC_STACKABLE]: state => {
        state.pushInt(check(state.popInt(), ObjTypeValid).stackable ? 1 : 0);
    }
};

export default ObjConfigOps;
