import { CommandHandlers } from "#lostcity/engine/script/ScriptRunner.js";
import ScriptOpcode from "#lostcity/engine/script/ScriptOpcode.js";
import InvType from "#lostcity/cache/InvType.js";

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
        let [inv, com] = state.popInts(2);

        state.activePlayer.invListenOnCom(inv, com);
    },

    [ScriptOpcode.INV_STOPTRANSMIT]: (state) => {
        let [inv, com] = state.popInts(2);

        state.activePlayer.invStopListenOnCom(inv, com);
    },

    [ScriptOpcode.INV_SWAP]: (state) => {
        let [inv, slot1, slot2] = state.popInts(3);

        state.activePlayer.invSwap(inv, slot1, slot2);
    },

    [ScriptOpcode.INV_ITEMSPACE]: (state) => {
        // let [inv, obj, count, size] = state.popInts(4);
        throw new Error("unimplemented");
    },

    [ScriptOpcode.INV_FREESPACE]: (state) => {
        let inv = state.popInt();

        state.pushInt(state.activePlayer.invFreeSpace(inv) as number);
    },

    [ScriptOpcode.INV_ALLSTOCK]: (state) => {
        let inv = state.popInt();
        let invType = InvType.get(inv);
        state.pushInt(invType.allstock ? 1 : 0);
    },

    [ScriptOpcode.INV_EXISTS]: (state) => {
        let obj = state.popInt();
        let inv = state.popInt();
        let invType = InvType.get(inv);
        console.log(obj, inv, invType.stockobj.some(objId => objId === obj))
        state.pushInt(invType.stockobj.some(objId => objId === obj) ? 1 : 0);
    },
};

export default InvOps;
