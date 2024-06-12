import EnumType from '#lostcity/cache/config/EnumType.js';

import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import { CommandHandlers } from '#lostcity/engine/script/ScriptRunner.js';

import {check, EnumTypeValid} from '#lostcity/engine/script/ScriptValidators.js';

const EnumOps: CommandHandlers = {
    [ScriptOpcode.ENUM]: state => {
        const [inputType, outputType, enumId, key] = state.popInts(4);

        const enumType: EnumType = check(enumId, EnumTypeValid);

        // verify types
        if (enumType.inputtype !== inputType || enumType.outputtype !== outputType) {
            throw new Error(`Type validation error: ${enumType.debugname} key: ${key}. Expected input: ${inputType} got: ${enumType.inputtype}. Expected output: ${outputType} got: ${enumType.outputtype}`);
        }

        const value = enumType.values.get(key);
        if (typeof value === 'string') {
            state.pushString(value ?? enumType.defaultString);
        } else {
            state.pushInt(value ?? enumType.defaultInt);
        }
    },

    [ScriptOpcode.ENUM_GETOUTPUTCOUNT]: state => {
        state.pushInt(check(state.popInt(), EnumTypeValid).values.size);
    }
};

export default EnumOps;
