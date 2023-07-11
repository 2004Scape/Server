import { CommandHandlers } from "#lostcity/engine/script/ScriptRunner.js";
import ScriptOpcode from "#lostcity/engine/script/ScriptOpcode.js";

const NumberOps: CommandHandlers = {
    [ScriptOpcode.ADD]: (state) => {
        let b = state.popInt();
        let a = state.popInt();
        state.pushInt(a + b);
    },

    [ScriptOpcode.SUB]: (state) => {
        let b = state.popInt();
        let a = state.popInt();
        state.pushInt(a - b);
    },

    [ScriptOpcode.MULTIPLY]: (state) => {
        let b = state.popInt();
        let a = state.popInt();
        state.pushInt(a * b);
    },

    [ScriptOpcode.DIVIDE]: (state) => {
        let b = state.popInt();
        let a = state.popInt();
        state.pushInt(a / b);
    },

    [ScriptOpcode.RANDOM]: (state) => {
        let a = state.popInt();
        state.pushInt(Math.random() * a);
    },

    [ScriptOpcode.RANDOMINC]: (state) => {
        let a = state.popInt();
        state.pushInt(Math.random() * (a + 1));
    },

    [ScriptOpcode.INTERPOLATE]: (state) => {
        let [y0, y1, x0, x1, x] = state.popInts(5);
        let lerp = Math.floor((y1 - y0) / (x1 - x0)) * (x - x0) + y0;

        state.pushInt(lerp);
    },

    [ScriptOpcode.ADDPERCENT]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.SETBIT]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.CLEARBIT]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.TESTBIT]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.MODULO]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.POW]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.INVPOW]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.AND]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.OR]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.MIN]: (state) => {
        let [a, b] = state.popInts(2);
        state.pushInt(Math.min(a, b));
    },

    [ScriptOpcode.MAX]: (state) => {
        let [a, b] = state.popInts(2);
        state.pushInt(Math.max(a, b));
    },

    [ScriptOpcode.SCALE]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.BITCOUNT]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.TOGGLEBIT]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.SETBIT_RANGE]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.CLEARBIT_RANGE]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.GETBIT_RANGE]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.SETBIT_RANGE_TOINT]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.SIN_DEG]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.COS_DEG]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.ATAN2_DEG]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.ABS]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.PARSEINT]: (state) => {
        throw new Error("unimplemented");
    },
};

export default NumberOps;
