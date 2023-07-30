import { CommandHandlers } from '#lostcity/engine/script/ScriptRunner.js';
import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import World from '#lostcity/engine/World.js';
import SeqType from '#lostcity/cache/SeqType.js';
import FontType from '#lostcity/cache/FontType.js';
import ParamType from '#lostcity/cache/ParamType.js';
import StructType from '#lostcity/cache/StructType.js';
import { ParamHelper } from '#lostcity/cache/ParamHelper.js';
import MesanimType from '#lostcity/cache/MesanimType.js';

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
        throw new Error('unimplemented');
    },

    [ScriptOpcode.LINEOFWALK]: (state) => {
        throw new Error('unimplemented');
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
        throw new Error('unimplemented');
    },

    [ScriptOpcode.DISTANCE]: (state) => {
        const [c1, c2] = state.popInts(2);
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
        state.pushInt((coord >> 14) & 0x3fff);
    },

    [ScriptOpcode.COORDY]: (state) => {
        const coord = state.popInt();
        state.pushInt((coord >> 28) & 0x3);
    },

    [ScriptOpcode.COORDZ]: (state) => {
        const coord = state.popInt();
        state.pushInt(coord & 0x3fff);
    },
};

export default ServerOps;