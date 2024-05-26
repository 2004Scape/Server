import MessageHandler from '#lostcity/network/incoming/handler/MessageHandler.js';
import Player from '#lostcity/entity/Player.js';
import ClientCheat from '#lostcity/network/incoming/model/ClientCheat.js';
import Environment from '#lostcity/util/Environment.js';
import CategoryType from '#lostcity/cache/CategoryType.js';
import ParamType from '#lostcity/cache/ParamType.js';
import EnumType from '#lostcity/cache/EnumType.js';
import StructType from '#lostcity/cache/StructType.js';
import InvType from '#lostcity/cache/InvType.js';
import IdkType from '#lostcity/cache/IdkType.js';
import VarPlayerType from '#lostcity/cache/VarPlayerType.js';
import ObjType from '#lostcity/cache/ObjType.js';
import World from '#lostcity/engine/World.js';
import LocType from '#lostcity/cache/LocType.js';
import NpcType from '#lostcity/cache/NpcType.js';
import Component from '#lostcity/cache/Component.js';
import SeqType from '#lostcity/cache/SeqType.js';
import SpotanimType from '#lostcity/cache/SpotanimType.js';
import MesanimType from '#lostcity/cache/MesanimType.js';
import DbTableType from '#lostcity/cache/DbTableType.js';
import DbRowType from '#lostcity/cache/DbRowType.js';
import HuntType from '#lostcity/cache/HuntType.js';
import ScriptProvider from '#lostcity/engine/script/ScriptProvider.js';
import { CollisionFlag, findPath, isFlagged } from '@2004scape/rsmod-pathfinder';
import { NetworkPlayer } from '#lostcity/entity/NetworkPlayer.js';
import { toBase37 } from '#jagex2/jstring/JString.js';
import NullClientSocket from '#lostcity/server/NullClientSocket.js';
import { tryParseInt } from '#lostcity/util/TryParse.js';
import ScriptVarType from '#lostcity/cache/ScriptVarType.js';
import { Position } from '#lostcity/entity/Position.js';
import ScriptRunner from '#lostcity/engine/script/ScriptRunner.js';

export default class ClientCheatHandler extends MessageHandler<ClientCheat> {
    handle(message: ClientCheat, player: Player): boolean {
        if (message.input.length > 80) {
            return false;
        }

        const { input: cheat } = message;

        const args: string[] = cheat.toLowerCase().split(' ');
        const cmd: string | undefined = args.shift();
        if (cmd === undefined || cmd.length <= 0) {
            return false;
        }

        player.playerLog('Cheat ran', cheat);

        if (cmd === 'reload' && Environment.LOCAL_DEV) {
            // TODO: only reload config types that have changed to save time
            CategoryType.load('data/pack');
            ParamType.load('data/pack');
            EnumType.load('data/pack');
            StructType.load('data/pack');
            InvType.load('data/pack');
            IdkType.load('data/pack');
            VarPlayerType.load('data/pack');
            ObjType.load('data/pack', World.members);
            LocType.load('data/pack');
            NpcType.load('data/pack');
            Component.load('data/pack');
            SeqType.load('data/pack');
            SpotanimType.load('data/pack');
            MesanimType.load('data/pack');
            DbTableType.load('data/pack');
            DbRowType.load('data/pack');
            HuntType.load('data/pack');

            const count = ScriptProvider.load('data/pack');
            player.messageGame(`Reloaded ${count} scripts.`);
        } else if (cmd === 'setvar') {
            const varp = args.shift();
            if (!varp) {
                player.messageGame('Usage: ::setvar <var> <value>');
                return false;
            }

            const value = args.shift();
            if (!value) {
                player.messageGame('Usage: ::setvar <var> <value>');
                return false;
            }

            const varpType = VarPlayerType.getByName(varp);
            if (varpType) {
                player.setVar(varpType.id, parseInt(value, 10));
                player.messageGame(`Setting var ${varp} to ${value}`);
            } else {
                player.messageGame(`Unknown var ${varp}`);
            }
        } else if (cmd === 'getvar') {
            const varp = args.shift();
            if (!varp) {
                player.messageGame('Usage: ::getvar <var>');
                return false;
            }

            const varpType = VarPlayerType.getByName(varp);
            if (varpType) {
                player.messageGame(`Var ${varp}: ${player.vars[varpType.id]}`);
            } else {
                player.messageGame(`Unknown var ${varp}`);
            }
        } else if (cmd === 'setlevel') {
            if (args.length < 2) {
                player.messageGame('Usage: ::setlevel <stat> <level>');
                return false;
            }

            const stat = Player.SKILLS.indexOf(args[0]);
            if (stat === -1) {
                player.messageGame(`Unknown stat ${args[0]}`);
                return false;
            }

            player.setLevel(stat, parseInt(args[1]));
        } else if (cmd === 'setxp') {
            if (args.length < 2) {
                player.messageGame('Usage: ::setxp <stat> <xp>');
                return false;
            }

            const stat = Player.SKILLS.indexOf(args[0]);
            if (stat === -1) {
                player.messageGame(`Unknown stat ${args[0]}`);
                return false;
            }

            const exp = parseInt(args[1]) * 10;
            // player.setLevel(stat, player.getLevelByExp(exp));
            player.stats[stat] = exp;
        } else if (cmd === 'minlevel') {
            for (let i = 0; i < Player.SKILLS.length; i++) {
                if (i === Player.HITPOINTS) {
                    player.setLevel(i, 10);
                } else {
                    player.setLevel(i, 1);
                }
            }
        } else if (cmd === 'serverdrop') {
            player.terminate();
        } else if (cmd === 'random') {
            player.afkEventReady = true;
        } else if (cmd === 'bench' && player.staffModLevel >= 3) {
            const start = Date.now();
            for (let index = 0; index < 100_000; index++) {
                findPath(player.level, player.x, player.z, player.x, player.z + 10);
            }
            const end = Date.now();
            console.log(`took = ${end - start} ms`);
        } else if (cmd === 'bots' && player.staffModLevel >= 3) {
            player.messageGame('Adding bots');
            for (let i = 0; i < 2000; i++) {
                const bot = new NetworkPlayer(`bot${i}`, toBase37(`bot${i}`), new NullClientSocket());
                bot.onLogin();
                World.addPlayer(bot);
            }
        } else if (cmd === 'teleall' && player.staffModLevel >= 3) {
            player.messageGame('Teleporting all players');
            for (const player of World.players) {
                player.closeModal();

                do {
                    const x = Math.floor(Math.random() * 640) + 3200;
                    const z = Math.floor(Math.random() * 640) + 3200;

                    player.teleport(x + Math.floor(Math.random() * 64) - 32, z + Math.floor(Math.random() * 64) - 32, 0);
                } while (isFlagged(player.x, player.z, player.level, CollisionFlag.WALK_BLOCKED));
            }
        } else if (cmd === 'moveall' && player.staffModLevel >= 3) {
            player.messageGame('Moving all players');
            console.time('moveall');
            for (const player of World.players) {
                player.closeModal();
                player.queueWaypoints(findPath(player.level, player.x, player.z, ((player.x >>> 6) << 6) + 32, ((player.z >>> 6) << 6) + 32));
            }
            console.timeEnd('moveall');
        } else if (cmd === 'speed' && player.staffModLevel >= 3) {
            if (args.length < 1) {
                player.messageGame('Usage: ::speed <ms>');
                return false;
            }

            const speed: number = tryParseInt(args.shift(), 20);
            if (speed < 20) {
                player.messageGame('::speed input was too low.');
                return false;
            }

            player.messageGame(`World speed was changed to ${speed}ms`);
            World.tickRate = speed;
        }

        // lookup debugproc with the name and execute it
        const script = ScriptProvider.getByName(`[debugproc,${cmd}]`);
        if (!script) {
            return false;
        }

        const params = new Array(script.info.parameterTypes.length).fill(-1);

        for (let i = 0; i < script.info.parameterTypes.length; i++) {
            const type = script.info.parameterTypes[i];

            try {
                switch (type) {
                    case ScriptVarType.STRING: {
                        const value = args.shift();
                        params[i] = value ?? '';
                        break;
                    }
                    case ScriptVarType.INT: {
                        const value = args.shift();
                        params[i] = parseInt(value ?? '0', 10) | 0;
                        break;
                    }
                    case ScriptVarType.OBJ:
                    case ScriptVarType.NAMEDOBJ: {
                        const name = args.shift();
                        params[i] = ObjType.getId(name ?? '');
                        break;
                    }
                    case ScriptVarType.NPC: {
                        const name = args.shift();
                        params[i] = NpcType.getId(name ?? '');
                        break;
                    }
                    case ScriptVarType.LOC: {
                        const name = args.shift();
                        params[i] = LocType.getId(name ?? '');
                        break;
                    }
                    case ScriptVarType.SEQ: {
                        const name = args.shift();
                        params[i] = SeqType.getId(name ?? '');
                        break;
                    }
                    case ScriptVarType.STAT: {
                        const name = args.shift();
                        params[i] = Player.SKILLS.indexOf(name ?? '');
                        break;
                    }
                    case ScriptVarType.INV: {
                        const name = args.shift();
                        params[i] = InvType.getId(name ?? '');
                        break;
                    }
                    case ScriptVarType.COORD: {
                        const args2 = cheat.split('_');

                        const level = parseInt(args2[0].slice(6));
                        const mx = parseInt(args2[1]);
                        const mz = parseInt(args2[2]);
                        const lx = parseInt(args2[3]);
                        const lz = parseInt(args2[4]);

                        params[i] = Position.packCoord(level, (mx << 6) + lx, (mz << 6) + lz);
                        break;
                    }
                    case ScriptVarType.INTERFACE: {
                        const name = args.shift();
                        params[i] = Component.getId(name ?? '');
                        break;
                    }
                    case ScriptVarType.SPOTANIM: {
                        const name = args.shift();
                        params[i] = SpotanimType.getId(name ?? '');
                        break;
                    }
                    case ScriptVarType.IDKIT: {
                        const name = args.shift();
                        params[i] = IdkType.getId(name ?? '');
                        break;
                    }
                }
            } catch (err) {
                return false;
            }
        }

        player.executeScript(ScriptRunner.init(script, player, null, params), false);
        return true;
    }
}
