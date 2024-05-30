import FontType from '#lostcity/cache/FontType.js';
import LocType from '#lostcity/cache/LocType.js';
import MesanimType from '#lostcity/cache/MesanimType.js';
import { ParamHelper } from '#lostcity/cache/ParamHelper.js';
import ParamType from '#lostcity/cache/ParamType.js';
import SeqType from '#lostcity/cache/SeqType.js';
import StructType from '#lostcity/cache/StructType.js';

import World from '#lostcity/engine/World.js';

import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import { CommandHandlers } from '#lostcity/engine/script/ScriptRunner.js';
import ScriptState from '#lostcity/engine/script/ScriptState.js';
import ScriptPointer from '#lostcity/engine/script/ScriptPointer.js';
import {HuntIterator} from '#lostcity/engine/script/ScriptIterators.js';

import { Position } from '#lostcity/entity/Position.js';
import HuntModeType from '#lostcity/entity/hunt/HuntModeType.js';
import Player from '#lostcity/entity/Player.js';

import {
    CollisionFlag,
    hasLineOfSight,
    hasLineOfWalk,
    isFlagged,
    LocAngle,
    LocLayer,
    locShapeLayer
} from '@2004scape/rsmod-pathfinder';

import {
    check,
    CoordValid,
    HuntVisValid,
    NumberNotNull,
    SpotAnimTypeValid
} from '#lostcity/engine/script/ScriptValidators.js';

const ActivePlayer = [ScriptPointer.ActivePlayer, ScriptPointer.ActivePlayer2];

const ServerOps: CommandHandlers = {
    [ScriptOpcode.MAP_CLOCK]: state => {
        state.pushInt(World.currentTick);
    },

    [ScriptOpcode.MAP_MEMBERS]: state => {
        state.pushInt(World.members ? 1 : 0);
    },

    [ScriptOpcode.MAP_PLAYERCOUNT]: state => {
        const [c1, c2] = state.popInts(2);

        const from = Position.unpackCoord(check(c1, CoordValid));
        const to = Position.unpackCoord(check(c2, CoordValid));
    
        let count = 0;
        for (let x = Math.floor(from.x / 8); x <= Math.ceil(to.x / 8); x++) {
            for (let z = Math.floor(from.z / 8); z <= Math.ceil(to.z / 8); z++) {
                const { players } = World.getZone(x << 3, z << 3, from.level);
                for (const uid of players) {
                    const player = World.getPlayerByUid(uid);
                    if (player === null) {
                        continue;
                    }
                    if (player.x >= from.x && player.x <= to.x && player.z >= from.z && player.z <= to.z) {
                        count++;
                    }
                }
            }
        }
    
        state.pushInt(count);
    },

    [ScriptOpcode.HUNTALL]: state => {
        const [coord, distance, checkVis] = state.popInts(3);

        check(coord, CoordValid);
        check(distance, NumberNotNull);
        check(checkVis, HuntVisValid);

        const {level, x, z} = Position.unpackCoord(coord);

        state.huntIterator = new HuntIterator(World.currentTick, level, x, z, distance, checkVis, HuntModeType.PLAYER);
    },

    [ScriptOpcode.HUNTNEXT]: state => {
        const result = state.huntIterator?.next();
        if (!result || result.done) {
            state.pushInt(0);
            return;
        }

        if (!(result.value instanceof Player)) {
            throw new Error('[ServerOps] huntnext command must result instance of Player.');
        }

        state.activePlayer = result.value;
        state.pointerAdd(ActivePlayer[state.intOperand]);
        state.pushInt(1);
    },

    [ScriptOpcode.INZONE]: state => {
        const [c1, c2, c3] = state.popInts(3);

        const from = Position.unpackCoord(check(c1, CoordValid));
        const to = Position.unpackCoord(check(c2, CoordValid));
        const pos = Position.unpackCoord(check(c3, CoordValid));

        if (pos.x < from.x || pos.x > to.x) {
            state.pushInt(0);
        } else if (pos.level < from.level || pos.level > to.level) {
            state.pushInt(0);
        } else if (pos.z < from.z || pos.z > to.z) {
            state.pushInt(0);
        } else {
            state.pushInt(1);
        }
    },

    [ScriptOpcode.LINEOFWALK]: state => {
        const [c1, c2] = state.popInts(2);

        const from = Position.unpackCoord(check(c1, CoordValid));
        const to = Position.unpackCoord(check(c2, CoordValid));

        state.pushInt(hasLineOfWalk(from.level, from.x, from.z, to.x, to.z, 1, 1, 1, 1) ? 1 : 0);
    },

    [ScriptOpcode.STAT_RANDOM]: state => {
        const [level, low, high] = state.popInts(3);

        const value = Math.floor((low * (99 - level)) / 98) + Math.floor((high * (level - 1)) / 98) + 1;
        const chance = Math.floor(Math.random() * 256);

        state.pushInt(value > chance ? 1 : 0);
    },

    [ScriptOpcode.SPOTANIM_MAP]: state => {
        const [spotanim, coord, height, delay] = state.popInts(4);

        check(spotanim, SpotAnimTypeValid);

        const {level, x, z} = Position.unpackCoord(check(coord, CoordValid));

        World.getZone(x, z, level).animMap(x, z, spotanim, height, delay);
    },

    [ScriptOpcode.DISTANCE]: state => {
        const [c1, c2] = state.popInts(2);

        const from = Position.unpackCoord(check(c1, CoordValid));
        const to = Position.unpackCoord(check(c2, CoordValid));

        const dx = Math.abs(from.x - to.x);
        const dz = Math.abs(from.z - to.z);

        state.pushInt(Math.max(dx, dz));
    },

    [ScriptOpcode.MOVECOORD]: state => {
        const [coord, x, y, z] = state.popInts(4);

        const pos = Position.unpackCoord(check(coord, CoordValid));
        state.pushInt(Position.packCoord(pos.level + y, pos.x + x, pos.z + z));
    },

    [ScriptOpcode.SEQLENGTH]: state => {
        const seq = state.popInt();

        state.pushInt(SeqType.get(seq).duration);
    },

    [ScriptOpcode.SPLIT_INIT]: state => {
        const [maxWidth, linesPerPage, fontId, mesanimId] = state.popInts(4);
        const text = state.popString();
        const font = FontType.get(fontId);
        const lines = font.split(text, maxWidth);

        state.splitPages = [];
        state.splitMesanim = mesanimId;
        while (lines.length > 0) {
            state.splitPages.push(lines.splice(0, linesPerPage));
        }
    },

    [ScriptOpcode.SPLIT_GET]: state => {
        const [page, line] = state.popInts(2);

        state.pushString(state.splitPages[page][line]);
    },

    [ScriptOpcode.SPLIT_PAGECOUNT]: state => {
        state.pushInt(state.splitPages.length);
    },

    [ScriptOpcode.SPLIT_LINECOUNT]: state => {
        const page = state.popInt();

        state.pushInt(state.splitPages[page].length);
    },

    [ScriptOpcode.SPLIT_GETANIM]: state => {
        const page = state.popInt();
        if (state.splitMesanim === -1) {
            state.pushInt(-1);
            return;
        }

        const mesanimType = MesanimType.get(state.splitMesanim);
        state.pushInt(mesanimType.len[state.splitPages[page].length - 1]);
    },

    [ScriptOpcode.STRUCT_PARAM]: state => {
        const [structId, paramId] = state.popInts(2);
        const param = ParamType.get(paramId);
        const struct = StructType.get(structId);
        if (param.isString()) {
            state.pushString(ParamHelper.getStringParam(paramId, struct, param.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramId, struct, param.defaultInt));
        }
    },

    [ScriptOpcode.COORDX]: state => {
        const coord = check(state.popInt(), CoordValid);
        state.pushInt(Position.unpackCoord(coord).x);
    },

    [ScriptOpcode.COORDY]: state => {
        const coord = check(state.popInt(), CoordValid);
        state.pushInt(Position.unpackCoord(coord).level);
    },

    [ScriptOpcode.COORDZ]: state => {
        const coord = check(state.popInt(), CoordValid);
        state.pushInt(Position.unpackCoord(coord).z);
    },

    [ScriptOpcode.PLAYERCOUNT]: state => {
        state.pushInt(World.getTotalPlayers());
    },

    [ScriptOpcode.MAP_BLOCKED]: state => {
        const coord = check(state.popInt(), CoordValid);

        const pos = Position.unpackCoord(coord);
        state.pushInt(isFlagged(pos.x, pos.z, pos.level, CollisionFlag.WALK_BLOCKED) ? 1 : 0);
    },

    [ScriptOpcode.MAP_INDOORS]: state => {
        const coord = check(state.popInt(), CoordValid);

        const pos = Position.unpackCoord(coord);
        state.pushInt(isFlagged(pos.x, pos.z, pos.level, CollisionFlag.ROOF) ? 1 : 0);
    },

    [ScriptOpcode.LINEOFSIGHT]: state => {
        const [c1, c2] = state.popInts(2);

        const from = Position.unpackCoord(check(c1, CoordValid));
        const to = Position.unpackCoord(check(c2, CoordValid));

        state.pushInt(hasLineOfSight(from.level, from.x, from.z, to.x, to.z, 1, 1, 1, 1) ? 1 : 0);
    },

    [ScriptOpcode.WORLD_DELAY]: state => {
        // arg is popped elsewhere
        state.execution = ScriptState.WORLD_SUSPENDED;
    },

    [ScriptOpcode.PROJANIM_PL]: state => {
        const [srcCoord, uid, spotanim, srcHeight, dstHeight, delay, duration, peak, arc] = state.popInts(9);

        check(srcCoord, CoordValid);
        check(spotanim, SpotAnimTypeValid);

        const player = World.getPlayerByUid(uid);
        if (!player) {
            throw new Error(`attempted to use invalid player uid: ${uid}`);
        }

        const srcPos = Position.unpackCoord(srcCoord);
        const zone = World.getZone(srcPos.x, srcPos.z, srcPos.level);
        zone.mapProjAnim(srcPos.x, srcPos.z, player.x, player.z, -player.pid - 1, spotanim, srcHeight + 100, dstHeight + 100, delay, duration, peak, arc);
    },

    [ScriptOpcode.PROJANIM_NPC]: state => {
        const [srcCoord, npcUid, spotanim, srcHeight, dstHeight, delay, duration, peak, arc] = state.popInts(9);

        check(srcCoord, CoordValid);
        check(spotanim, SpotAnimTypeValid);

        const slot = npcUid & 0xffff;
        const expectedType = (npcUid >> 16) & 0xffff;

        const npc = World.getNpc(slot);
        if (!npc) {
            throw new Error(`attempted to use invalid npc uid: ${npcUid}`);
        }

        const srcPos = Position.unpackCoord(srcCoord);
        const zone = World.getZone(srcPos.x, srcPos.z, srcPos.level);
        zone.mapProjAnim(srcPos.x, srcPos.z, npc.x, npc.z, npc.nid + 1, spotanim, srcHeight + 100, dstHeight + 100, delay, duration, peak, arc);
    },

    [ScriptOpcode.PROJANIM_MAP]: state => {
        const [srcCoord, dstCoord, spotanim, srcHeight, dstHeight, delay, duration, peak, arc] = state.popInts(9);

        check(spotanim, SpotAnimTypeValid);

        const srcPos = Position.unpackCoord(check(srcCoord, CoordValid));
        const dstPos = Position.unpackCoord(check(dstCoord, CoordValid));
        const zone = World.getZone(srcPos.x, srcPos.z, srcPos.level);
        zone.mapProjAnim(srcPos.x, srcPos.z, dstPos.x, dstPos.z, 0, spotanim, srcHeight + 100, dstHeight, delay, duration, peak, arc);
    },

    [ScriptOpcode.MAP_LOCADDUNSAFE]: state => {
        const coord = check(state.popInt(), CoordValid);

        const pos = Position.unpackCoord(coord);

        const zone = World.getZone(pos.x, pos.z, pos.level);
        const locs = zone.staticLocs.concat(zone.locs);

        for (let index = 0; index < locs.length; index++) {
            const loc = locs[index];
            const type = LocType.get(loc.type);

            if (type.active !== 1) {
                continue;
            }

            const layer = locShapeLayer(loc.shape);

            if (loc.respawn !== -1 && layer === LocLayer.WALL) {
                continue;
            }

            if (layer === LocLayer.WALL) {
                if (loc.x === pos.x && loc.z === pos.z) {
                    state.pushInt(1);
                    return;
                }
            } else if (layer === LocLayer.GROUND) {
                const width = loc.angle === LocAngle.NORTH || loc.angle === LocAngle.SOUTH ? loc.length : loc.width;
                const length = loc.angle === LocAngle.NORTH || loc.angle === LocAngle.SOUTH ? loc.width : loc.length;
                for (let index = 0; index < width * length; index++) {
                    const deltaX = loc.x + (index % width);
                    const deltaZ = loc.z + index / width;
                    if (deltaX === pos.x && deltaZ === pos.z) {
                        state.pushInt(1);
                        return;
                    }
                }
            } else if (layer === LocLayer.GROUND_DECOR) {
                if (loc.x === pos.x && loc.z === pos.z) {
                    state.pushInt(1);
                    return;
                }
            }
        }
        state.pushInt(0);
    }
};

export default ServerOps;
