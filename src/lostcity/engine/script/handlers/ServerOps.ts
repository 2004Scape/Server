import { ParamHelper } from '#lostcity/cache/config/ParamHelper.js';
import ParamType from '#lostcity/cache/config/ParamType.js';
import StructType from '#lostcity/cache/config/StructType.js';
import SpotanimType from '#lostcity/cache/config/SpotanimType.js';
import MesanimType from '#lostcity/cache/config/MesanimType.js';

import World from '#lostcity/engine/World.js';

import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import { CommandHandlers } from '#lostcity/engine/script/ScriptRunner.js';
import ScriptState from '#lostcity/engine/script/ScriptState.js';
import {ActiveNpc, ActivePlayer} from '#lostcity/engine/script/ScriptPointer.js';
import {HuntIterator, NpcHuntAllCommandIterator} from '#lostcity/engine/script/ScriptIterators.js';

import { Position } from '#lostcity/entity/Position.js';
import MapFindSqaureType from '#lostcity/entity/MapFindSquareType.js';
import HuntModeType from '#lostcity/entity/hunt/HuntModeType.js';
import Player from '#lostcity/entity/Player.js';
import Npc from '#lostcity/entity/Npc.js';
import HuntVis from '#lostcity/entity/hunt/HuntVis.js';

import Environment from '#lostcity/util/Environment.js';

import * as rsmod from '@2004scape/rsmod-pathfinder';
import {CollisionFlag, LocLayer, LocAngle} from '@2004scape/rsmod-pathfinder';

import {
    check,
    CoordValid,
    FontTypeValid,
    HuntVisValid,
    LocTypeValid,
    MesanimValid,
    NumberNotNull,
    NumberPositive,
    ParamTypeValid,
    SeqTypeValid,
    SpotAnimTypeValid,
    StructTypeValid,
    FindSquareValid
} from '#lostcity/engine/script/ScriptValidators.js';

const ServerOps: CommandHandlers = {
    [ScriptOpcode.MAP_CLOCK]: state => {
        state.pushInt(World.currentTick);
    },

    [ScriptOpcode.MAP_MEMBERS]: state => {
        state.pushInt(Environment.NODE_MEMBERS ? 1 : 0);
    },

    [ScriptOpcode.MAP_PLAYERCOUNT]: state => {
        const [c1, c2] = state.popInts(2);

        const from: Position = check(c1, CoordValid);
        const to: Position = check(c2, CoordValid);
    
        let count = 0;
        for (let x = Math.floor(from.x / 8); x <= Math.ceil(to.x / 8); x++) {
            for (let z = Math.floor(from.z / 8); z <= Math.ceil(to.z / 8); z++) {
                for (const player of World.getZone(x << 3, z << 3, from.level).getAllPlayersSafe()) {
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

        const position: Position = check(coord, CoordValid);
        check(distance, NumberNotNull);
        const huntvis: HuntVis = check(checkVis, HuntVisValid);

        state.huntIterator = new HuntIterator(World.currentTick, position.level, position.x, position.z, distance, huntvis, -1, -1, HuntModeType.PLAYER);
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

    // https://x.com/JagexAsh/status/1796460129430433930
    // https://x.com/JagexAsh/status/1821236327150710829
    [ScriptOpcode.NPC_HUNTALL]: state => {
        const [coord, distance, checkVis] = state.popInts(3);

        const position: Position = check(coord, CoordValid);
        check(distance, NumberNotNull);
        const huntvis: HuntVis = check(checkVis, HuntVisValid);

        state.huntIterator = new NpcHuntAllCommandIterator(World.currentTick, position.level, position.x, position.z, distance, huntvis);
    },

    [ScriptOpcode.NPC_HUNTNEXT]: state => {
        const result = state.huntIterator?.next();
        if (!result || result.done) {
            state.pushInt(0);
            return;
        }

        if (!(result.value instanceof Npc)) {
            throw new Error('[ServerOps] npc_huntnext command must result instance of Npc.');
        }

        state.activeNpc = result.value;
        state.pointerAdd(ActiveNpc[state.intOperand]);
        state.pushInt(1);
    },

    [ScriptOpcode.INZONE]: state => {
        const [c1, c2, c3] = state.popInts(3);

        const from: Position = check(c1, CoordValid);
        const to: Position = check(c2, CoordValid);
        const pos: Position = check(c3, CoordValid);

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

        const from: Position = check(c1, CoordValid);
        const to: Position = check(c2, CoordValid);

        if (from.level !== to.level) {
            state.pushInt(0);
            return;
        }

        state.pushInt(rsmod.hasLineOfWalk(from.level, from.x, from.z, to.x, to.z, 1, 1, 1, 1) ? 1 : 0);
    },

    // https://x.com/JagexAsh/status/1110604592138670083
    [ScriptOpcode.STAT_RANDOM]: state => {
        const [level, low, high] = state.popInts(3);

        const value = Math.floor((low * (99 - level)) / 98) + Math.floor((high * (level - 1)) / 98) + 1;
        const chance = Math.floor(Math.random() * 256);

        state.pushInt(value > chance ? 1 : 0);
    },

    [ScriptOpcode.SPOTANIM_MAP]: state => {
        const [spotanim, coord, height, delay] = state.popInts(4);

        const position: Position = check(coord, CoordValid);
        const spotanimType: SpotanimType = check(spotanim, SpotAnimTypeValid);

        World.animMap(position.level, position.x, position.z, spotanimType.id, height, delay);
    },

    [ScriptOpcode.DISTANCE]: state => {
        const [c1, c2] = state.popInts(2);

        const from: Position = check(c1, CoordValid);
        const to: Position = check(c2, CoordValid);

        state.pushInt(Position.distanceToSW(from, to));
    },

    [ScriptOpcode.MOVECOORD]: state => {
        const [coord, x, y, z] = state.popInts(4);

        const position: Position = check(coord, CoordValid);
        state.pushInt(Position.packCoord(position.level + y, position.x + x, position.z + z));
    },

    [ScriptOpcode.SEQLENGTH]: state => {
        state.pushInt(check(state.popInt(), SeqTypeValid).duration);
    },

    [ScriptOpcode.SPLIT_INIT]: state => {
        const [maxWidth, linesPerPage, fontId] = state.popInts(3);
        let text = state.popString();

        const font = check(fontId, FontTypeValid);

        // todo: later this needs to lookup by <p=id> instead of <p,name>
        if (text.startsWith('<p,') && text.indexOf('>') !== -1) {
            const mesanim = text.substring(3, text.indexOf('>'));
            state.splitMesanim = MesanimType.getId(mesanim);
            text = text.substring(text.indexOf('>') + 1);
        } else {
            state.splitMesanim = -1;
        }

        state.splitPages = [];
        const lines = font.split(text, maxWidth);
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

        state.pushInt(check(state.splitMesanim, MesanimValid).len[state.splitPages[page].length - 1]);
    },

    [ScriptOpcode.STRUCT_PARAM]: state => {
        const [structId, paramId] = state.popInts(2);

        const paramType: ParamType = check(paramId, ParamTypeValid);
        const structType: StructType = check(structId, StructTypeValid);
        if (paramType.isString()) {
            state.pushString(ParamHelper.getStringParam(paramType.id, structType, paramType.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramType.id, structType, paramType.defaultInt));
        }
    },

    [ScriptOpcode.COORDX]: state => {
        state.pushInt(check(state.popInt(), CoordValid).x);
    },

    [ScriptOpcode.COORDY]: state => {
        state.pushInt(check(state.popInt(), CoordValid).level);
    },

    [ScriptOpcode.COORDZ]: state => {
        state.pushInt(check(state.popInt(), CoordValid).z);
    },

    [ScriptOpcode.PLAYERCOUNT]: state => {
        state.pushInt(World.getTotalPlayers());
    },

    [ScriptOpcode.MAP_BLOCKED]: state => {
        const position: Position = check(state.popInt(), CoordValid);

        state.pushInt(rsmod.isFlagged(position.x, position.z, position.level, CollisionFlag.WALK_BLOCKED) ? 1 : 0);
    },

    [ScriptOpcode.MAP_INDOORS]: state => {
        const position: Position = check(state.popInt(), CoordValid);

        state.pushInt(rsmod.isFlagged(position.x, position.z, position.level, CollisionFlag.ROOF) ? 1 : 0);
    },

    [ScriptOpcode.LINEOFSIGHT]: state => {
        const [c1, c2] = state.popInts(2);

        const from: Position = check(c1, CoordValid);
        const to: Position = check(c2, CoordValid);

        if (from.level !== to.level) {
            state.pushInt(0);
            return;
        }

        state.pushInt(rsmod.hasLineOfSight(from.level, from.x, from.z, to.x, to.z, 1, 1, 1, 1) ? 1 : 0);
    },

    // https://x.com/JagexAsh/status/1730321158858276938
    // https://x.com/JagexAsh/status/1814230119411540058
    [ScriptOpcode.WORLD_DELAY]: state => {
        // arg is popped elsewhere
        state.execution = ScriptState.WORLD_SUSPENDED;
    },

    [ScriptOpcode.PROJANIM_PL]: state => {
        const [srcCoord, uid, spotanim, srcHeight, dstHeight, delay, duration, peak, arc] = state.popInts(9);

        const srcPos: Position = check(srcCoord, CoordValid);
        const spotanimType: SpotanimType = check(spotanim, SpotAnimTypeValid);

        const player = World.getPlayerByUid(uid);
        if (!player) {
            throw new Error(`attempted to use invalid player uid: ${uid}`);
        }

        World.mapProjAnim(srcPos.level, srcPos.x, srcPos.z, player.x, player.z, -player.pid - 1, spotanimType.id, srcHeight + 100, dstHeight + 100, delay, duration, peak, arc);
    },

    [ScriptOpcode.PROJANIM_NPC]: state => {
        const [srcCoord, npcUid, spotanim, srcHeight, dstHeight, delay, duration, peak, arc] = state.popInts(9);

        const srcPos: Position = check(srcCoord, CoordValid);
        const spotanimType: SpotanimType = check(spotanim, SpotAnimTypeValid);

        const slot = npcUid & 0xffff;
        const expectedType = (npcUid >> 16) & 0xffff;

        const npc = World.getNpc(slot);
        if (!npc) {
            throw new Error(`attempted to use invalid npc uid: ${npcUid}`);
        }

        World.mapProjAnim(srcPos.level, srcPos.x, srcPos.z, npc.x, npc.z, npc.nid + 1, spotanimType.id, srcHeight + 100, dstHeight + 100, delay, duration, peak, arc);
    },

    [ScriptOpcode.PROJANIM_MAP]: state => {
        const [srcCoord, dstCoord, spotanim, srcHeight, dstHeight, delay, duration, peak, arc] = state.popInts(9);

        const spotanimType: SpotanimType = check(spotanim, SpotAnimTypeValid);
        const srcPos: Position = check(srcCoord, CoordValid);
        const dstPos: Position = check(dstCoord, CoordValid);

        World.mapProjAnim(srcPos.level, srcPos.x, srcPos.z, dstPos.x, dstPos.z, 0, spotanimType.id, srcHeight + 100, dstHeight, delay, duration, peak, arc);
    },

    [ScriptOpcode.MAP_LOCADDUNSAFE]: state => {
        const pos: Position = check(state.popInt(), CoordValid);

        for (const loc of World.getZone(pos.x, pos.z, pos.level).getAllLocsUnsafe()) {
            const type = check(loc.type, LocTypeValid);

            if (type.active !== 1) {
                continue;
            }

            const layer = rsmod.locShapeLayer(loc.shape);

            if (!loc.checkLifeCycle(World.currentTick) && layer === LocLayer.WALL) {
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
                    const deltaZ = loc.z + ((index / width) | 0);
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

    [ScriptOpcode.NPCCOUNT]: state => {
        state.pushInt(World.getTotalNpcs());
    },

    [ScriptOpcode.ZONECOUNT]: state => {
        state.pushInt(World.getTotalZones());
    },

    [ScriptOpcode.LOCCOUNT]: state => {
        state.pushInt(World.getTotalLocs());
    },

    [ScriptOpcode.OBJCOUNT]: state => {
        state.pushInt(World.getTotalObjs());
    },

    [ScriptOpcode.MAP_FINDSQUARE]: state => {
        const [coord, minRadius, maxRadius, type] = state.popInts(4);
        check(minRadius, NumberPositive);
        check(maxRadius, NumberPositive);
        check(type, FindSquareValid);
        const origin: Position = check(coord, CoordValid);
        if (maxRadius < 10) {
            if (type === MapFindSqaureType.NONE) {
                for (let i = 0; i < 50; i++) {
                    const randomX = origin.x + (Math.floor(Math.random() * (maxRadius - minRadius + 1)) + minRadius) * (Math.random() < 0.5 ? 1 : -1);
                    const randomZ = origin.z + (Math.floor(Math.random() * (maxRadius - minRadius + 1)) + minRadius) * (Math.random() < 0.5 ? 1 : -1);          
                    if (!rsmod.isFlagged(randomX, randomZ, origin.level, CollisionFlag.WALK_BLOCKED)) {
                        state.pushInt(Position.packCoord(origin.level, randomX, randomZ));
                        return;
                    }
                }
            } else if (type === MapFindSqaureType.LINEOFWALK) {
                for (let i = 0; i < 50; i++) {
                    const randomX = origin.x + (Math.floor(Math.random() * (maxRadius - minRadius + 1)) + minRadius) * (Math.random() < 0.5 ? 1 : -1);
                    const randomZ = origin.z + (Math.floor(Math.random() * (maxRadius - minRadius + 1)) + minRadius) * (Math.random() < 0.5 ? 1 : -1);
                    if (rsmod.hasLineOfWalk(origin.level, randomX, randomZ, origin.x, origin.z) && !rsmod.isFlagged(randomX, randomZ, origin.level, CollisionFlag.WALK_BLOCKED)) {
                        state.pushInt(Position.packCoord(origin.level, randomX, randomZ));
                        return;
                    }
                }
            } else if (type === MapFindSqaureType.LINEOFSIGHT) {
                for (let i = 0; i < 50; i++) {
                    const randomX = origin.x + (Math.floor(Math.random() * (maxRadius - minRadius + 1)) + minRadius) * (Math.random() < 0.5 ? 1 : -1);
                    const randomZ = origin.z + (Math.floor(Math.random() * (maxRadius - minRadius + 1)) + minRadius) * (Math.random() < 0.5 ? 1 : -1);                  
                    if (rsmod.hasLineOfSight(origin.level, randomX, randomZ, origin.x, origin.z) && !rsmod.isFlagged(randomX, randomZ, origin.level, CollisionFlag.WALK_BLOCKED)) {
                        state.pushInt(Position.packCoord(origin.level, randomX, randomZ));
                        return;
                    }
                }
            }
        } else {
            // west bias (imps)
            if (type === MapFindSqaureType.NONE) {
                for (let x = origin.x - maxRadius; x <= origin.x + maxRadius; x++) {
                    const randomZ = origin.z + (Math.floor(Math.random() * (maxRadius - minRadius + 1)) + minRadius) * (Math.random() < 0.5 ? 1 : -1);
                    if (!rsmod.isFlagged(x, randomZ, origin.level, CollisionFlag.WALK_BLOCKED) && !Position.isWithinDistanceSW({x: x, z: randomZ}, origin, minRadius)) {
                        state.pushInt(Position.packCoord(origin.level, x, randomZ));
                        return;
                    }
                }
            } else if (type === MapFindSqaureType.LINEOFWALK) {
                for (let x = origin.x - maxRadius; x <= origin.x + maxRadius; x++) {
                    const randomZ = origin.z + (Math.floor(Math.random() * (maxRadius - minRadius + 1)) + minRadius) * (Math.random() < 0.5 ? 1 : -1);
                    if (rsmod.hasLineOfWalk(origin.level, x, randomZ, origin.x, origin.z) && !rsmod.isFlagged(x, randomZ, origin.level, CollisionFlag.WALK_BLOCKED) && !Position.isWithinDistanceSW({x: x, z: randomZ}, origin, minRadius)) {
                        state.pushInt(Position.packCoord(origin.level, x, randomZ));
                        return;
                    }
                }
            } else if (type === MapFindSqaureType.LINEOFSIGHT) {
                for (let x = origin.x - maxRadius; x <= origin.x + maxRadius; x++) {
                    const randomZ = origin.z + (Math.floor(Math.random() * (maxRadius - minRadius + 1)) + minRadius) * (Math.random() < 0.5 ? 1 : -1);
                    if (rsmod.hasLineOfSight(origin.level, x, randomZ, origin.x, origin.z) && !rsmod.isFlagged(x, randomZ, origin.level, CollisionFlag.WALK_BLOCKED) && !Position.isWithinDistanceSW({x: x, z: randomZ}, origin, minRadius)) {
                        state.pushInt(Position.packCoord(origin.level, x, randomZ));
                        return;
                    }
                }
            }
        }
        
        state.pushInt(coord);
    },

    [ScriptOpcode.MAP_MULTI]: state => {
        const coord = state.popInt();

        state.pushInt(World.gameMap.multimap.has(coord) ? 1 : 0);
    }

    // npc_findallany // https://x.com/JagexAsh/status/1796878374398246990
};

export default ServerOps;
