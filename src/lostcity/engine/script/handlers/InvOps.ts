import { CommandHandlers } from '#lostcity/engine/script/ScriptRunner.js';
import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import InvType from '#lostcity/cache/InvType.js';
import ObjType from '#lostcity/cache/ObjType.js';
import Obj from '#lostcity/entity/Obj.js';
import World from '#lostcity/engine/World.js';

const InvOps: CommandHandlers = {
    [ScriptOpcode.INV_ADD]: (state) => {
        const [inv, obj, count] = state.popInts(3);

        if (obj == -1) {
            return;
        }

        const player = state.activePlayer;
        const overflow = count - player.invAdd(inv, obj, count);

        if (overflow > 0) {
            const floorObj = new Obj(
                player.level,
                player.x,
                player.z,
                obj,
                overflow
            );
            World.addObj(floorObj, player, 200);
        }
    },

    [ScriptOpcode.INV_CHANGESLOT]: (state) => {
        throw new Error('unimplemented');
    },

    [ScriptOpcode.INV_DEL]: (state) => {
        const [inv, obj, count] = state.popInts(3);

        if (obj == -1) {
            return;
        }

        state.activePlayer.invDel(inv, obj, count);
    },

    [ScriptOpcode.INV_GETOBJ]: (state) => {
        const [inv, slot] = state.popInts(2);

        const obj = state.activePlayer.invGetSlot(inv, slot);
        state.pushInt(obj?.id ?? -1);
    },

    [ScriptOpcode.INV_ITEMSPACE2]: (state) => {
        const [inv, obj, count, size] = state.popInts(4);

        if (obj == -1) {
            // make the entire count request overflow
            state.pushInt(count);
            return;
        }

        state.pushInt(state.activePlayer.invItemSpace(inv, obj, count, size));
    },

    [ScriptOpcode.INV_MOVEITEM]: (state) => {
        const [fromInv, toInv, obj, count] = state.popInts(4);

        if (obj == -1) {
            return;
        }

        const completed = state.activePlayer.invDel(fromInv, obj, count);
        if (completed == 0) {
            return;
        }

        state.activePlayer.invAdd(toInv, obj, completed);
    },

    [ScriptOpcode.INV_RESENDSLOT]: (state) => {
        const [inv, slot] = state.popInts(2);

        state.activePlayer.invResendSlot(inv, slot);
    },

    [ScriptOpcode.INV_SETSLOT]: (state) => {
        const [inv, slot, obj, count] = state.popInts(4);

        if (obj == -1) {
            return;
        }

        state.activePlayer.invSet(inv, obj, count, slot);
    },

    [ScriptOpcode.INV_SIZE]: (state) => {
        const inv = state.popInt();

        state.pushInt(state.activePlayer.invSize(inv) as number);
    },

    [ScriptOpcode.INV_TOTAL]: (state) => {
        const [inv, obj] = state.popInts(2);

        if (obj == -1) {
            state.pushInt(0);
            return;
        }

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

    [ScriptOpcode.INV_ITEMSPACE]: (state) => {
        const [inv, obj, count, size] = state.popInts(4);

        if (obj == -1) {
            // 0 for overflow (false)
            state.pushInt(0);
            return;
        }

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

        if (obj == -1) {
            // it doesn't exist
            state.pushInt(0);
            return;
        }

        const invType = InvType.get(inv);
        state.pushInt(invType.stockobj.some(objId => objId === obj) ? 1 : 0);
    },

    [ScriptOpcode.INV_GETNUM]: (state) => {
        const [inv, slot] = state.popInts(2);

        const obj = state.activePlayer.invGetSlot(inv, slot);
        state.pushInt(obj?.count ?? 0);
    },

    [ScriptOpcode.INV_MOVEITEM_CERT]: (state) => {
        const [fromInv, toInv, obj, count] = state.popInts(4);

        if (obj == -1) {
            return;
        }

        const completed = state.activePlayer.invDel(fromInv, obj, count);
        if (completed == 0) {
            return;
        }

        const objType = ObjType.get(obj);
        if (objType.certtemplate == -1 && objType.certlink >= 0) {
            state.activePlayer.invAdd(toInv, objType.certlink, completed);
        } else {
            state.activePlayer.invAdd(toInv, obj, completed);
        }
    },

    [ScriptOpcode.INV_MOVEITEM_UNCERT]: (state) => {
        const [fromInv, toInv, obj, count] = state.popInts(4);

        if (obj == -1) {
            return;
        }

        const completed = state.activePlayer.invDel(fromInv, obj, count);
        if (completed == 0) {
            return;
        }

        const objType = ObjType.get(obj);
        if (objType.certtemplate >= 0 && objType.certlink >= 0) {
            state.activePlayer.invAdd(toInv, objType.certlink, completed);
        } else {
            state.activePlayer.invAdd(toInv, obj, completed);
        }
    },

    [ScriptOpcode.INV_MOVETOSLOT]: (state) => {
        const [fromInv, toInv, fromSlot, toSlot] = state.popInts(4);

        state.activePlayer.invMoveToSlot(fromInv, toInv, fromSlot, toSlot);
    },

    [ScriptOpcode.INV_MOVEFROMSLOT]: (state) => {
        const [fromInv, toInv, fromSlot] = state.popInts(3);

        const player = state.activePlayer;
        const {overflow, fromObj} = player.invMoveFromSlot(fromInv, toInv, fromSlot);
        if (overflow > 0 && fromObj > -1) {
            const floorObj = new Obj(
                player.level,
                player.x,
                player.z,
                fromObj,
                overflow
            );
            World.addObj(floorObj, player, 200);
        }
    },

    [ScriptOpcode.INV_DELSLOT]: (state) => {
        const [inv, slot] = state.popInts(2);

        const obj = state.activePlayer.invGetSlot(inv, slot);
        if (!obj) {
            return;
        }

        state.activePlayer.invDelSlot(inv, slot);
    },

    [ScriptOpcode.INV_DROPSLOT]: (state) => {
        const [inv, coord, slot, duration] = state.popInts(4);

        const obj = state.activePlayer.invGetSlot(inv, slot);
        if (!obj) {
            return;
        }

        const level = (coord >> 28) & 0x3fff;
        const x = (coord >> 14) & 0x3fff;
        const z = coord & 0x3fff;

        const player = state.activePlayer;
        const completed = player.invDel(inv, obj.id, obj.count, slot);
        if (completed == 0) {
            return;
        }

        const floorObj = new Obj(level, x, z, obj.id, completed);
        World.addObj(floorObj, player, duration);
    },

    [ScriptOpcode.INV_DROPITEM]: (state) => {
        const [inv, coord, obj, count, duration] = state.popInts(5);

        if (obj == -1) {
            return;
        }

        const level = (coord >> 28) & 0x3fff;
        const x = (coord >> 14) & 0x3fff;
        const z = coord & 0x3fff;

        const player = state.activePlayer;
        const completed = player.invDel(inv, obj, count);
        if (completed == 0) {
            return;
        }

        const floorObj = new Obj(level, x, z, obj, completed);
        World.addObj(floorObj, player, duration);
    },

    [ScriptOpcode.BOTH_MOVEINV]: (state) => {
        throw new Error('unimplemented');
    },

    [ScriptOpcode.INV_TOTALCAT]: (state) => {
        const [inv, category] = state.popInts(2);
        state.pushInt(state.activePlayer.invTotalCat(inv, category));
    },
};

export default InvOps;
