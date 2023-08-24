import { CommandHandlers } from '#lostcity/engine/script/ScriptRunner.js';
import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import InvType from '#lostcity/cache/InvType.js';
import ObjType from '#lostcity/cache/ObjType.js';

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

        state.pushInt(state.activePlayer.invItemSpace(inv, obj, count, size));
    },

    [ScriptOpcode.INV_MOVEITEM]: (state) => {
        const [fromInv, toInv, obj, count] = state.popInts(4);

        state.activePlayer.invDel(fromInv, obj, count);
        state.activePlayer.invAdd(toInv, obj, count);
    },

    [ScriptOpcode.INV_RESENDSLOT]: (state) => {
        const [inv, slot] = state.popInts(2);

        state.activePlayer.invResendSlot(inv, slot);
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

        state.pushInt(state.activePlayer.invItemSpace(inv, obj, count, size) == 0 ? 1 : 0);
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

    [ScriptOpcode.INV_MOVEITEM_CERT]: (state) => {
        const [fromInv, toInv, obj, count] = state.popInts(4);
        const objType = ObjType.get(obj);

        state.activePlayer.invDel(fromInv, obj, count);

        if (objType.certtemplate == -1 && objType.certlink >= 0) {
            state.activePlayer.invAdd(toInv, objType.certlink, count);
        } else {
            state.activePlayer.invAdd(toInv, obj, count);
        }
    },

    [ScriptOpcode.INV_MOVEITEM_UNCERT]: (state) => {
        const [fromInv, toInv, obj, count] = state.popInts(4);
        const objType = ObjType.get(obj);

        state.activePlayer.invDel(fromInv, obj, count);

        if (objType.certtemplate >= 0 && objType.certlink >= 0) {
            state.activePlayer.invAdd(toInv, objType.certlink, count);
        } else {
            state.activePlayer.invAdd(toInv, obj, count);
        }
    },
};

export default InvOps;
