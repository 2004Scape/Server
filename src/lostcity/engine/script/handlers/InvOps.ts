import { CommandHandlers } from "#lostcity/engine/script/ScriptRunner.js";
import ScriptOpcode from "#lostcity/engine/script/ScriptOpcode.js";

const InvOps: CommandHandlers = {
    [ScriptOpcode.INV_ADD]: (state) => {
        let count = state.popInt();
        let obj = state.popInt();
        let inv = state.popInt();

        state.activePlayer.invAdd(inv, obj, count);
    },

    [ScriptOpcode.INV_CHANGESLOT]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.INV_DEL]: (state) => {
        let count = state.popInt();
        let obj = state.popInt();
        let inv = state.popInt();

        state.activePlayer.invDel(inv, obj, count);
    },

    [ScriptOpcode.INV_GETOBJ]: (state) => {
        let slot = state.popInt();
        let inv = state.popInt();

        let obj = state.activePlayer.invGetSlot(inv, slot);
        state.pushInt(obj?.id ?? -1);
    },

    [ScriptOpcode.INV_ITEMSPACE2]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.INV_MOVEITEM]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.INV_RESENDSLOT]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.INV_SETSLOT]: (state) => {
        let count = state.popInt();
        let obj = state.popInt();
        let slot = state.popInt();
        let inv = state.popInt();
        state.activePlayer.invSet(inv, obj, count, slot);
    },

    [ScriptOpcode.INV_SIZE]: (state) => {
        let inv = state.popInt();
        state.pushInt(state.activePlayer.invSize(inv) as number);
    },

    [ScriptOpcode.INV_TOTAL]: (state) => {
        let obj = state.popInt();
        let inv = state.popInt();
        state.pushInt(state.activePlayer.invTotal(inv, obj) as number);
    },

    [ScriptOpcode.INV_TRANSMIT]: (state) => {
        let com = state.popInt();
        let inv = state.popInt();

        state.activePlayer.createInv(inv);
        state.activePlayer.invListenOnCom(inv, com);
    },

    [ScriptOpcode.INV_STOPTRANSMIT]: (state) => {
        let inv = state.popInt();

        state.activePlayer.invStopListenOnCom(inv);
    },
};

export default InvOps;
