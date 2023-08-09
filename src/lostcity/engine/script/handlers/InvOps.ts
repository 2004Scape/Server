import { CommandHandlers } from '#lostcity/engine/script/ScriptRunner.js';
import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import InvType from '#lostcity/cache/InvType.js';

const InvOps: CommandHandlers = {
    [ScriptOpcode.INV_ADD]: (state) => {
        const [inv, obj, count] = state.popInts(3);

        state.activePlayer.invAdd(inv, obj, count);
    },

    [ScriptOpcode.INV_CHANGESLOT]: (state) => {
        throw new Error('unimplemented');
    },

    [ScriptOpcode.INV_DEL]: (state) => {
        const [inv, obj, count] = state.popInts(3);

        state.activePlayer.invDel(inv, obj, count);
    },

    [ScriptOpcode.INV_GETOBJ]: (state) => {
        const [inv, slot] = state.popInts(2);

        const obj = state.activePlayer.invGetSlot(inv, slot);
        state.pushInt(obj?.id ?? -1);
    },

    [ScriptOpcode.INV_ITEMSPACE2]: (state) => {
        const [inv, obj, count, size] = state.popInts(4);

        const transaction = state.activePlayer.getInventory(inv)!.add(obj, count, -1, false, false, true);
        state.pushInt(transaction.completed);
    },

    [ScriptOpcode.INV_MOVEITEM]: (state) => {
        throw new Error('unimplemented');
    },

    [ScriptOpcode.INV_RESENDSLOT]: (state) => {
        throw new Error('unimplemented');
    },

    [ScriptOpcode.INV_SETSLOT]: (state) => {
        const [inv, slot, obj, count] = state.popInts(4);

        state.activePlayer.invSet(inv, obj, count, slot);
    },

    [ScriptOpcode.INV_SIZE]: (state) => {
        const inv = state.popInt();

        state.pushInt(state.activePlayer.invSize(inv) as number);
    },

    [ScriptOpcode.INV_TOTAL]: (state) => {
        const [inv, obj] = state.popInts(2);

        state.pushInt(state.activePlayer.invTotal(inv, obj) as number);
    },

    [ScriptOpcode.INV_TRANSMIT]: (state) => {
        const [inv, com] = state.popInts(2);

        state.activePlayer.invListenOnCom(inv, com);
    },

    [ScriptOpcode.INV_STOPTRANSMIT]: (state) => {
        const [inv, com] = state.popInts(2);

        state.activePlayer.invStopListenOnCom(inv, com);
    },

    [ScriptOpcode.INV_SWAP]: (state) => {
        const [inv, slot1, slot2] = state.popInts(3);

        state.activePlayer.invSwap(inv, slot1, slot2);
    },

    [ScriptOpcode.INV_ITEMSPACE]: (state) => {
        const [inv, obj, count, size] = state.popInts(4);

        const transaction = state.activePlayer.getInventory(inv)!.add(obj, count, -1, false, false, true);
        state.pushInt(transaction.hasSucceeded() ? 1 : 0);
    },

    [ScriptOpcode.INV_FREESPACE]: (state) => {
        const inv = state.popInt();

        state.pushInt(state.activePlayer.invFreeSpace(inv) as number);
    },

    [ScriptOpcode.INV_CLEAR]: (state) => {
        const inv = state.popInt();

        state.activePlayer.invClear(inv);
    },

    [ScriptOpcode.INV_ALLSTOCK]: (state) => {
        const inv = state.popInt();

        const invType = InvType.get(inv);
        state.pushInt(invType.allstock ? 1 : 0);
    },

    [ScriptOpcode.INV_EXISTS]: (state) => {
        const [inv, obj] = state.popInts(2);

        const invType = InvType.get(inv);
        state.pushInt(invType.stockobj.some(objId => objId === obj) ? 1 : 0);
    },

    [ScriptOpcode.INV_GETSLOTCOUNT]: (state) => {
        const [inv, slot] = state.popInts(2);

        const obj = state.activePlayer.invGetSlot(inv, slot);
        state.pushInt(obj?.count ?? 0);
    },
};

export default InvOps;
