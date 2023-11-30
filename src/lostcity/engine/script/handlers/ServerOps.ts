import {CommandHandlers} from '#lostcity/engine/script/ScriptRunner.js';
import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import World from '#lostcity/engine/World.js';
import SeqType from '#lostcity/cache/SeqType.js';
import FontType from '#lostcity/cache/FontType.js';
import ParamType from '#lostcity/cache/ParamType.js';
import StructType from '#lostcity/cache/StructType.js';
import {ParamHelper} from '#lostcity/cache/ParamHelper.js';
import MesanimType from '#lostcity/cache/MesanimType.js';
import {Position} from '#lostcity/entity/Position.js';
import {LocShapes} from '#lostcity/engine/collision/LocShape.js';
import {LocLayer} from '#lostcity/engine/collision/LocLayer.js';
import {LocRotation} from '#lostcity/engine/collision/LocRotation.js';
import LocType from '#lostcity/cache/LocType.js';

const ServerOps: CommandHandlers = {
    [ScriptOpcode.MAP_CLOCK]: (state) => {
        state.pushInt(World.currentTick);
    },

    [ScriptOpcode.MAP_MEMBERS]: (state) => {
        state.pushInt(World.members ? 1 : 0);
    },

    [ScriptOpcode.MAP_PLAYERCOUNT]: (state) => {
        throw new Error('unimplemented');
    },

    [ScriptOpcode.HUNTALL]: (state) => {
        throw new Error('unimplemented');
    },

    [ScriptOpcode.HUNTNEXT]: (state) => {
        throw new Error('unimplemented');
    },

    [ScriptOpcode.INAREA]: (state) => {
        throw new Error('unimplemented');
    },

    [ScriptOpcode.INZONE]: (state) => {
        const [c1, c2, c3] = state.popInts(3);

        if (c1 < 0 || c1 > Position.max) {
            throw new Error(`INZONE attempted to use coord that was out of range: ${c1}. Range should be: 0 to ${Position.max}`);
        }

        if (c2 < 0 || c2 > Position.max) {
            throw new Error(`INZONE attempted to use coord that was out of range: ${c2}. Range should be: 0 to ${Position.max}`);
        }

        if (c3 < 0 || c3 > Position.max) {
            throw new Error(`INZONE attempted to use coord that was out of range: ${c3}. Range should be: 0 to ${Position.max}`);
        }

        if (c1 === c2) {
            throw new Error(`INZONE attempted to check a boundary that was equal to one tile. The boundary should be > 1 tile. The coords were: ${c1} and ${c2}`);
        }

        const pos1 = Position.unpackCoord(c1);
        const pos2 = Position.unpackCoord(c2);

        const c1Level = pos1.level;
        const c2Level = pos2.level;

        if (pos1.level !== pos2.level) {
            throw new Error(`INZONE attempted to check a boundary that was on different levels. The levels were: ${c1Level} and ${c2Level}`);
        }

        const pos3 = Position.unpackCoord(c3);

        const c1X = pos1.x;
        const c1Z = pos1.z;
        const c2X = pos2.x;
        const c2Z = pos2.z;
        const x = pos3.x;
        const z = pos3.z;
        const level = pos3.level;

        const flipX = c1X < c2X;
        const flipZ = c1Z < c2Z;

        const inX = flipX ? (x >= c1X && x <= c2X) : (x >= c2X && x <= c1X);
        const inZ = flipZ ? (z >= c1Z && z <= c2Z) : (z >= c2Z && z <= c1Z);
        const inLevel = (level === c1Level) && (level === c2Level);

        state.pushInt(inX && inZ && inLevel ? 1 : 0);
    },

    [ScriptOpcode.LINEOFWALK]: (state) => {
        const [c1, c2] = state.popInts(2);

        if (c1 < 0 || c1 > Position.max) {
            throw new Error(`LINEOFWALK attempted to use coord that was out of range: ${c1}. Range should be: 0 to ${Position.max}`);
        }

        if (c2 < 0 || c2 > Position.max) {
            throw new Error(`LINEOFWALK attempted to use coord that was out of range: ${c2}. Range should be: 0 to ${Position.max}`);
        }

        const from = Position.unpackCoord(c1);
        const to = Position.unpackCoord(c2);

        const player = state.activePlayer;

        const lineOfSight = World.linePathFinder.lineOfWalk(
            from.level,
            from.x,
            from.z,
            to.x,
            to.z,
            player.width,
            player.width,
            player.length
        );

        state.pushInt(lineOfSight.success ? 1 : 0);
    },

    [ScriptOpcode.OBJECTVERIFY]: (state) => {
        const [obj, verifyobj] = state.popInts(2);
        state.pushInt(obj === verifyobj ? 1 : 0);
    },

    [ScriptOpcode.STAT_RANDOM]: (state) => {
        const [level, low, high] = state.popInts(3);

        const value = Math.floor(low * (99 - level) / 98) + Math.floor(high * (level - 1) / 98) + 1;
        const chance = Math.floor(Math.random() * 256);

        state.pushInt(value > chance ? 1 : 0);
    },

    [ScriptOpcode.SPOTANIM_MAP]: (state) => {
        const [spotanim, coord, height, delay] = state.popInts(4);

        if (coord < 0 || coord > Position.max) {
            throw new Error(`SPOTANIM_MAP attempted to use coord that was out of range: ${coord}. Range should be: 0 to ${Position.max}`);
        }

        const pos = Position.unpackCoord(coord);
        const x = pos.x;
        const z = pos.z;
        const level = pos.level;

        World.getZone(x, z, level).animMap(x, z, spotanim, height, delay);
    },

    [ScriptOpcode.DISTANCE]: (state) => {
        const [c1, c2] = state.popInts(2);

        if (c1 < 0 || c1 > Position.max) {
            throw new Error(`DISTANCE attempted to use coord that was out of range: ${c1}. Range should be: 0 to ${Position.max}`);
        }

        if (c2 < 0 || c2 > Position.max) {
            throw new Error(`DISTANCE attempted to use coord that was out of range: ${c2}. Range should be: 0 to ${Position.max}`);
        }

        const from = Position.unpackCoord(c1);
        const to = Position.unpackCoord(c2);

        const dx = Math.abs(from.x - to.x);
        const dz = Math.abs(from.z - to.z);

        state.pushInt(Math.max(dx, dz));
    },

    [ScriptOpcode.MOVECOORD]: (state) => {
        const [coord, x, y, z] = state.popInts(4);

        if (coord < 0 || coord > Position.max) {
            throw new Error(`MOVECOORD attempted to use coord that was out of range: ${coord}. Range should be: 0 to ${Position.max}`);
        }

        const pos = Position.unpackCoord(coord);
        state.pushInt(Position.packCoord(pos.level + y, pos.x + x, pos.z + z));
    },

    [ScriptOpcode.SEQLENGTH]: (state) => {
        const seq = state.popInt();

        state.pushInt(SeqType.get(seq).duration);
    },

    [ScriptOpcode.SPLIT_INIT]: (state) => {
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

    [ScriptOpcode.SPLIT_GET]: (state) => {
        const [page, line] = state.popInts(2);

        state.pushString(state.splitPages[page][line]);
    },

    [ScriptOpcode.SPLIT_PAGECOUNT]: (state) => {
        state.pushInt(state.splitPages.length);
    },

    [ScriptOpcode.SPLIT_LINECOUNT]: (state) => {
        const page = state.popInt();

        state.pushInt(state.splitPages[page].length);
    },

    [ScriptOpcode.SPLIT_GETANIM]: (state) => {
        const page = state.popInt();
        if (state.splitMesanim === -1) {
            state.pushInt(-1);
            return;
        }

        const mesanimType = MesanimType.get(state.splitMesanim);
        state.pushInt(mesanimType.len[state.splitPages[page].length - 1]);
    },

    [ScriptOpcode.STRUCT_PARAM]: (state) => {
        const [structId, paramId] = state.popInts(2);
        const param = ParamType.get(paramId);
        const struct = StructType.get(structId);
        if (param.isString()) {
            state.pushString(ParamHelper.getStringParam(paramId, struct, param.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramId, struct, param.defaultInt));
        }
    },

    [ScriptOpcode.COORDX]: (state) => {
        const coord = state.popInt();

        if (coord < 0 || coord > Position.max) {
            throw new Error(`COORDX attempted to use coord that was out of range: ${coord}. Range should be: 0 to ${Position.max}`);
        }

        state.pushInt((coord >> 14) & 0x3fff);
    },

    [ScriptOpcode.COORDY]: (state) => {
        const coord = state.popInt();

        if (coord < 0 || coord > Position.max) {
            throw new Error(`COORDY attempted to use coord that was out of range: ${coord}. Range should be: 0 to ${Position.max}`);
        }

        state.pushInt((coord >> 28) & 0x3);
    },

    [ScriptOpcode.COORDZ]: (state) => {
        const coord = state.popInt();

        if (coord < 0 || coord > Position.max) {
            throw new Error(`COORDZ attempted to use coord that was out of range: ${coord}. Range should be: 0 to ${Position.max}`);
        }

        state.pushInt(coord & 0x3fff);
    },

    [ScriptOpcode.PLAYERCOUNT]: (state) => {
        state.pushInt(World.getTotalPlayers());
    },

    [ScriptOpcode.MAP_BLOCKED]: (state) => {
        const coord = state.popInt();

        if (coord < 0 || coord > Position.max) {
            throw new Error(`MAP_BLOCKED attempted to use coord that was out of range: ${coord}. Range should be: 0 to ${Position.max}`);
        }

        const pos = Position.unpackCoord(coord);

        const zone = World.getZone(pos.x, pos.z, pos.level);
        const locs = zone.staticLocs.concat(zone.locs);

        for (let index = 0; index < locs.length; index++) {
            const loc = locs[index];
            const type = LocType.get(loc.type);

            if (type.active !== 1) {
                continue;
            }

            const layer = LocShapes.layer(loc.shape);

            if (loc.respawn !== -1 && layer === LocLayer.WALL) {
                continue;
            }

            if (layer === LocLayer.WALL) {
                if (loc.x === pos.x && loc.z === pos.z) {
                    state.pushInt(1);
                    return;
                }
            } else if (layer === LocLayer.GROUND) {
                const width = (loc.rotation === LocRotation.NORTH || loc.rotation === LocRotation.SOUTH) ? loc.length : loc.width;
                const length = (loc.rotation === LocRotation.NORTH || loc.rotation === LocRotation.SOUTH) ? loc.width : loc.length;
                for (let index = 0; index < width * length; index++) {
                    const deltaX = loc.x + (index % width);
                    const deltaZ = loc.z + (index / width);
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
    },

    [ScriptOpcode.LINEOFSIGHT]: (state) => {
        const [c1, c2] = state.popInts(2);

        if (c1 < 0 || c1 > Position.max) {
            throw new Error(`LINEOFSIGHT attempted to use coord that was out of range: ${c1}. Range should be: 0 to ${Position.max}`);
        }

        if (c2 < 0 || c2 > Position.max) {
            throw new Error(`LINEOFSIGHT attempted to use coord that was out of range: ${c2}. Range should be: 0 to ${Position.max}`);
        }

        const from = Position.unpackCoord(c1);
        const to = Position.unpackCoord(c2);

        const player = state.activePlayer;

        const lineOfSight = World.linePathFinder.lineOfSight(
            from.level,
            from.x,
            from.z,
            to.x,
            to.z,
            player.width,
            player.width,
            player.length
        );

        state.pushInt(lineOfSight.success ? 1 : 0);
    },
};

export default ServerOps;