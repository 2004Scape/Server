import { CommandHandlers } from '#lostcity/engine/script/ScriptRunner.js';
import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import EnumType from '#lostcity/cache/EnumType.js';

const EnumOps: CommandHandlers = {
    [ScriptOpcode.ENUM]: (state) => {
        const [inputType, outputType, enumId, key] = state.popInts(4);
        const enumType = EnumType.get(enumId);

        // verify types
        if (enumType.inputtype !== inputType || enumType.outputtype !== outputType) {
            throw new Error(`${enumId} ${key}`);
        }

        const value = enumType.values.get(key);
        if (typeof value === 'string') {
            state.pushString(value ?? enumType.defaultString);
        } else {
            state.pushInt(value ?? enumType.defaultInt);
        }
    },

    [ScriptOpcode.ENUM_GETOUTPUTCOUNT]: (state) => {
        const enumId = state.popInt();
        const enumType = EnumType.get(enumId);

        state.pushInt(enumType.values.size);
    },
};

export default EnumOps;
