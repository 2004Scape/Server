import InvType from '#lostcity/cache/config/InvType.js';
import ObjType from '#lostcity/cache/config/ObjType.js';
import {ParamHelper} from '#lostcity/cache/config/ParamHelper.js';
import ParamType from '#lostcity/cache/config/ParamType.js';

import World from '#lostcity/engine/World.js';
import Zone from '#lostcity/engine/zone/Zone.js';

import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import {ActiveObj, ActivePlayer} from '#lostcity/engine/script/ScriptPointer.js';
import {CommandHandlers} from '#lostcity/engine/script/ScriptRunner.js';

import Obj from '#lostcity/entity/Obj.js';
import {Position} from '#lostcity/entity/Position.js';
import EntityLifeCycle from '#lostcity/entity/EntityLifeCycle.js';

import {
    check,
    CoordValid,
    DurationValid,
    InvTypeValid,
    ObjStackValid,
    ObjTypeValid,
    ParamTypeValid
} from '#lostcity/engine/script/ScriptValidators.js';
import Environment from '#lostcity/util/Environment.js';

const ObjOps: CommandHandlers = {
    [ScriptOpcode.OBJ_ADD]: state => {
        const [coord, objId, count, duration] = state.popInts(4);

        if (objId === -1 || count === -1) {
            return;
        }

        const objType: ObjType = check(objId, ObjTypeValid);
        check(duration, DurationValid);
        const position: Position = check(coord, CoordValid);
        check(count, ObjStackValid);

        if (objType.dummyitem !== 0) {
            throw new Error(`attempted to add dummy item: ${objType.debugname}`);
        }

        if (objType.members && !Environment.NODE_MEMBERS) {
            return;
        }

        if (!objType.stackable || count === 1) {
            for (let i = 0; i < count; i++) {
                const obj: Obj = new Obj(position.level, position.x, position.z, EntityLifeCycle.DESPAWN, objId, 1);
                World.addObj(obj, state.activePlayer.pid, duration);

                state.activeObj = obj;
                state.pointerAdd(ActiveObj[state.intOperand]);
            }
        } else {
            const obj: Obj = new Obj(position.level, position.x, position.z, EntityLifeCycle.DESPAWN, objId, count);
            World.addObj(obj, state.activePlayer.pid, duration);

            state.activeObj = obj;
            state.pointerAdd(ActiveObj[state.intOperand]);
        }
    },

    [ScriptOpcode.OBJ_ADDALL]: state => {
        const [coord, objId, count, duration] = state.popInts(4);

        if (objId === -1 || count === -1) {
            return;
        }

        const objType: ObjType = check(objId, ObjTypeValid);
        check(duration, DurationValid);
        const position: Position = check(coord, CoordValid);
        check(count, ObjStackValid);

        if (objType.dummyitem !== 0) {
            throw new Error(`attempted to add dummy item: ${objType.debugname}`);
        }

        if (objType.members && !Environment.NODE_MEMBERS) {
            return;
        }

        if (!objType.stackable || count === 1) {
            for (let i = 0; i < count; i++) {
                const obj: Obj = new Obj(position.level, position.x, position.z, EntityLifeCycle.DESPAWN, objId, 1);
                World.addObj(obj, -1, duration);
    
                state.activeObj = obj;
                state.pointerAdd(ActiveObj[state.intOperand]);
            }
        } else {
            const obj: Obj = new Obj(position.level, position.x, position.z, EntityLifeCycle.DESPAWN, objId, count);
            World.addObj(obj, -1, duration);

            state.activeObj = obj;
            state.pointerAdd(ActiveObj[state.intOperand]);
        }
    },

    [ScriptOpcode.OBJ_PARAM]: state => {
        const paramType: ParamType = check(state.popInt(), ParamTypeValid);

        const objType: ObjType = check(state.activeObj.type, ObjTypeValid);
        if (paramType.isString()) {
            state.pushString(ParamHelper.getStringParam(paramType.id, objType, paramType.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramType.id, objType, paramType.defaultInt));
        }
    },

    [ScriptOpcode.OBJ_NAME]: state => {
        const objType: ObjType = check(state.activeObj.type, ObjTypeValid);

        state.pushString(objType.name ?? objType.debugname ?? 'null');
    },

    [ScriptOpcode.OBJ_DEL]: state => {
        const duration: number = ObjType.get(state.activeObj.type).respawnrate;
        if (state.pointerGet(ActivePlayer[state.intOperand])) {
            World.removeObj(state.activeObj, duration);
        } else {
            World.removeObj(state.activeObj, duration);
        }
    },

    [ScriptOpcode.OBJ_COUNT]: state => {
        state.pushInt(check(state.activeObj.count, ObjStackValid));
    },

    [ScriptOpcode.OBJ_TYPE]: state => {
        state.pushInt(check(state.activeObj.type, ObjTypeValid).id);
    },

    [ScriptOpcode.OBJ_TAKEITEM]: state => {
        const invType: InvType = check(state.popInt(), InvTypeValid);

        const obj: Obj = state.activeObj;
        const objType = ObjType.get(obj.type);
        const zone: Zone = World.getZone(obj.x, obj.z, obj.level);
        for (const o of zone.getObjsSafe(Position.packZoneCoord(obj.x, obj.z))) {
            if (o.type !== obj.type || o.count !== obj.count) {
                continue;
            }

            if (o.receiverId !== -1 && o.receiverId !== state.activePlayer.pid) {
                continue;
            }

            state.activePlayer.playerLog('Picked up item', objType.debugname as string);
            state.activePlayer.invAdd(invType.id, obj.type, obj.count);
            if (obj.lifecycle === EntityLifeCycle.RESPAWN) {
                World.removeObj(obj, objType.respawnrate);
                break;
            } else if (obj.lifecycle === EntityLifeCycle.DESPAWN) {
                World.removeObj(obj, 0);
                break;
            }
        }
    },

    [ScriptOpcode.OBJ_COORD]: state => {
        const position: Position = state.activeObj;
        state.pushInt(Position.packCoord(position.level, position.x, position.z));
    }
};

export default ObjOps;
