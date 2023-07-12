import { CommandHandlers } from "#lostcity/engine/script/ScriptRunner.js";
import ScriptOpcode from "#lostcity/engine/script/ScriptOpcode.js";
import World from "#lostcity/engine/World.js";
import SeqType from "#lostcity/cache/SeqType.js";
import FontType from "#lostcity/cache/FontType.js";
import ParamType from "#lostcity/cache/ParamType.js";
import StructType from "#lostcity/cache/StructType.js";
import { ParamHelper } from "#lostcity/cache/ParamHelper.js";
import MesanimType from "#lostcity/cache/MesanimType.js";

const ServerOps: CommandHandlers = {
    [ScriptOpcode.MAP_CLOCK]: (state) => {
        state.pushInt(World.currentTick);
    },

    [ScriptOpcode.MAP_MEMBERS]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.MAP_PLAYERCOUNT]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.HUNTALL]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.HUNTNEXT]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.INAREA]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.INZONE]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.LINEOFWALK]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.OBJECTVERIFY]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.STAT_RANDOM]: (state) => {
        let [level, low, high] = state.popInts(3);

        let value = Math.floor(low * (99 - level) / 98) + Math.floor(high * (level - 1) / 98) + 1;
        let chance = Math.floor(Math.random() * 256);

        state.pushInt(value > chance ? 1 : 0);
    },

    [ScriptOpcode.SPOTANIM_MAP]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.DISTANCE]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.MOVECOORD]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.SEQLENGTH]: (state) => {
        let seq = state.popInt();

        state.pushInt(SeqType.get(seq).duration);
    },

    [ScriptOpcode.SPLIT_INIT]: (state) => {
        let [maxWidth, linesPerPage, fontId, mesanimId] = state.popInts(4);
        let text = state.popString();

        let font = FontType.get(fontId);

        state.splitPages = [];
        state.splitMesanim = mesanimId;
        let page = 0;

        // first, we need to split lines on each pipe character
        let lines = text.split('|');

        // next, we need to check if any lines exceed maxWidth and put them on a new line immediately following
        for (let line of lines) {
            while (line.length > 0) {
                if (!state.splitPages[page]) {
                    state.splitPages[page] = [];
                }

                // 1) if the string is too long, we may have to split it
                let width = font.stringWidth(line);
                if (width <= maxWidth) {
                    state.splitPages[page].push(line);
                    break;
                }

                // 2) we need to split on the next word boundary
                let splitIndex = line.length;
                let splitWidth = width;

                // check the width at every space to see where we can cut the line
                for (let i = 0; i < line.length; i++) {
                    if (line[i] === ' ') {
                        let w = font.stringWidth(line.substring(0, i));

                        if (w <= maxWidth) {
                            splitIndex = i;
                            splitWidth = w;
                        } else {
                            break;
                        }
                    }
                }

                state.splitPages[page].push(line.substring(0, splitIndex));
                line = line.substring(splitIndex + 1);

                if (state.splitPages[page].length >= linesPerPage) {
                    page++;
                }
            }
        }
    },

    [ScriptOpcode.SPLIT_GET]: (state) => {
        let [page, line] = state.popInts(2);

        state.pushString(state.splitPages[page][line]);
    },

    [ScriptOpcode.SPLIT_PAGECOUNT]: (state) => {
        state.pushInt(state.splitPages.length);
    },

    [ScriptOpcode.SPLIT_LINECOUNT]: (state) => {
        let page = state.popInt();

        state.pushInt(state.splitPages[page].length);
    },

    [ScriptOpcode.SPLIT_GETANIM]: (state) => {
        let page = state.popInt();
        if (state.splitMesanim === -1) {
            state.pushInt(-1);
            return;
        }

        let mesanimType = MesanimType.get(state.splitMesanim);
        state.pushInt(mesanimType.len[state.splitPages[page].length - 1]);
    },

    [ScriptOpcode.STRUCT_PARAM]: (state) => {
        let [structId, paramId] = state.popInts(2);
        let param = ParamType.get(paramId);
        let struct = StructType.get(structId);
        if (param.isString()) {
            state.pushString(ParamHelper.getStringParam(paramId, struct, param.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramId, struct, param.defaultInt));
        }
    },
};

export default ServerOps;