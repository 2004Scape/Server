import { CommandHandlers } from '#lostcity/engine/script/ScriptRunner.js';
import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import World from '#lostcity/engine/World.js';
import SeqType from '#lostcity/cache/SeqType.js';
import FontType from '#lostcity/cache/FontType.js';
import ParamType from '#lostcity/cache/ParamType.js';
import StructType from '#lostcity/cache/StructType.js';
import { ParamHelper } from '#lostcity/cache/ParamHelper.js';
import MesanimType from '#lostcity/cache/MesanimType.js';
import CollisionFlag from '#rsmod/flag/CollisionFlag.js';

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

        if (c1 < 0 || c1 > 0x3ffffffffff) {
            throw new Error(`INZONE attempted to use coord that was out of range: ${c1}. Range should be: 0 to 0x3ffffffffff`);
        }

        if (c2 < 0 || c2 > 0x3ffffffffff) {
            throw new Error(`INZONE attempted to use coord that was out of range: ${c2}. Range should be: 0 to 0x3ffffffffff`);
        }

        if (c3 < 0 || c3 > 0x3ffffffffff) {
            throw new Error(`INZONE attempted to use coord that was out of range: ${c3}. Range should be: 0 to 0x3ffffffffff`);
        }

        if (c1 === c2) {
            throw new Error(`INZONE attempted to check a boundary that was equal to one tile. The boundary should be > 1 tile. The coords were: ${c1} and ${c2}`);
        }

        const c1Level = (c1 >> 28) & 0x3fff;
        const c2Level = (c2 >> 28) & 0x3fff;

        if (c1Level !== c2Level) {
            throw new Error(`INZONE attempted to check a boundary that was on different levels. The levels were: ${c1Level} and ${c2Level}`);
        }

        const c1X = (c1 >> 14) & 0x3fff;
        const c1Z = c1 & 0x3fff;

        const c2X = (c2 >> 14) & 0x3fff;
        const c2Z = c2 & 0x3fff;

        const x = (c3 >> 14) & 0x3fff;
        const z = c3 & 0x3fff;
        const level = (c3 >> 28) & 0x3fff;

        const flipX = c1X < c2X;
        const flipZ = c1Z < c2Z;

        const inX = flipX ? (x >= c1X && x <= c2X) : (x >= c2X && x <= c1X);
        const inZ = flipZ ? (z >= c1Z && z <= c2Z) : (z >= c2Z && z <= c1Z);
        const inLevel = (level === c1Level) && (level === c2Level);

        state.pushInt(inX && inZ && inLevel ? 1 : 0);
    },

    [ScriptOpcode.LINEOFWALK]: (state) => {
        const [ from, to ] = state.popInts(2);

        const fromLevel = (from >> 28) & 0x3fff;
        const fromX = (from >> 14) & 0x3fff;
        const fromZ = from & 0x3fff;

        const toLevel = (to >> 28) & 0x3fff;
        const toX = (to >> 14) & 0x3fff;
        const toZ = to & 0x3fff;

        if (fromLevel != toLevel) {
            state.pushInt(0);
            return;
        }

        const lineOfWalk = World.linePathFinder.lineOfWalk(
            toLevel,
            fromX,
            fromZ,
            toX,
            toZ,
            state.activePlayer.width,
            1,
            1
        );

        state.pushInt(lineOfWalk.success ? 1 : 0);
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

        if (coord < 0 || coord > 0x3ffffffffff) {
            throw new Error(`SPOTANIM_MAP attempted to use coord that was out of range: ${coord}. Range should be: 0 to 0x3ffffffffff`);
        }

        const level = (coord >> 28) & 0x3fff;
        const x = (coord >> 14) & 0x3fff;
        const z = coord & 0x3fff;

        World.getZone(x, z, level).animMap(x, z, spotanim, height, delay);
    },

    [ScriptOpcode.DISTANCE]: (state) => {
        const [c1, c2] = state.popInts(2);

        if (c1 < 0 || c1 > 0x3ffffffffff) {
            throw new Error(`DISTANCE attempted to use coord that was out of range: ${c1}. Range should be: 0 to 0x3ffffffffff`);
        }

        if (c2 < 0 || c2 > 0x3ffffffffff) {
            throw new Error(`DISTANCE attempted to use coord that was out of range: ${c2}. Range should be: 0 to 0x3ffffffffff`);
        }

        const x1 = (c1 >> 14) & 0x3fff;
        const z1 = c1 & 0x3fff;
        const x2 = (c2 >> 14) & 0x3fff;
        const z2 = c2 & 0x3fff;

        const dx = Math.abs(x1 - x2);
        const dz = Math.abs(z1 - z2);

        state.pushInt(Math.max(dx, dz));
    },

    [ScriptOpcode.MOVECOORD]: (state) => {
        const [coord, x, y, z] = state.popInts(4);

        if (coord < 0 || coord > 0x3ffffffffff) {
            throw new Error(`MOVECOORD attempted to use coord that was out of range: ${coord}. Range should be: 0 to 0x3ffffffffff`);
        }

        let mutCoord = coord;
        mutCoord += x << 14;
        mutCoord += y << 28;
        mutCoord += z;
        state.pushInt(mutCoord);
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

        if (coord < 0 || coord > 0x3ffffffffff) {
            throw new Error(`COORDX attempted to use coord that was out of range: ${coord}. Range should be: 0 to 0x3ffffffffff`);
        }

        state.pushInt((coord >> 14) & 0x3fff);
    },

    [ScriptOpcode.COORDY]: (state) => {
        const coord = state.popInt();

        if (coord < 0 || coord > 0x3ffffffffff) {
            throw new Error(`COORDY attempted to use coord that was out of range: ${coord}. Range should be: 0 to 0x3ffffffffff`);
        }

        state.pushInt((coord >> 28) & 0x3);
    },

    [ScriptOpcode.COORDZ]: (state) => {
        const coord = state.popInt();

        if (coord < 0 || coord > 0x3ffffffffff) {
            throw new Error(`COORDZ attempted to use coord that was out of range: ${coord}. Range should be: 0 to 0x3ffffffffff`);
        }

        state.pushInt(coord & 0x3fff);
    },

    [ScriptOpcode.PLAYERCOUNT]: (state) => {
        state.pushInt(World.getTotalPlayers());
    },

    [ScriptOpcode.MAP_BLOCKED]: (state) => {
        const coord = state.popInt();

        if (coord < 0 || coord > 0x3ffffffffff) {
            throw new Error(`MAP_BLOCKED attempted to use coord that was out of range: ${coord}. Range should be: 0 to 0x3ffffffffff`);
        }

        const x = (coord >> 14) & 0x3fff;
        const level = (coord >> 28) & 0x3fff;
        const z = coord & 0x3fff;
        state.pushInt(World.collisionFlags.isFlagged(x, z, level, CollisionFlag.WALK_BLOCKED) ? 1 : 0);
    },

    [ScriptOpcode.LINEOFSIGHT]: (state) => {
        const [ from, to ] = state.popInts(2);

        const fromLevel = (from >> 28) & 0x3fff;
        const fromX = (from >> 14) & 0x3fff;
        const fromZ = from & 0x3fff;

        const toLevel = (to >> 28) & 0x3fff;
        const toX = (to >> 14) & 0x3fff;
        const toZ = to & 0x3fff;

        if (fromLevel != toLevel) {
            state.pushInt(0);
            return;
        }

        const lineOfSight = World.linePathFinder.lineOfSight(
            toLevel,
            fromX,
            fromZ,
            toX,
            toZ,
            state.activePlayer.width,
            1,
            1
        );

        state.pushInt(lineOfSight.success ? 1 : 0);
    },
};

export default ServerOps;