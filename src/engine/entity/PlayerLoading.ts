import 'dotenv/config';

import InvType from '#/cache/config/InvType.js';
import { NetworkPlayer } from '#/engine/entity/NetworkPlayer.js';
import Player, { getExpByLevel, getLevelByExp } from '#/engine/entity/Player.js';
import { PlayerStat } from '#/engine/entity/PlayerStat.js';
import World from '#/engine/World.js';
import Packet from '#/io/Packet.js';
import ClientSocket from '#/server/ClientSocket.js';
import { fromBase37, toBase37 } from '#/util/JString.js';




export class PlayerLoading {
    static verify(sav: Packet) {
        if (sav.g2() !== 0x2004) {
            return false;
        }

        const version = sav.g2();
        if (version > 5) {
            return false;
        }

        sav.pos = sav.data.length - 4;
        const crc = sav.g4();
        if (crc != Packet.getcrc(sav.data, 0, sav.data.length - 4)) {
            return false;
        }

        return true;
    }

    static load(name: string, sav: Packet, client: ClientSocket | null) {
        const hash64 = toBase37(name); // username or email.
        const name37 = toBase37(name); // always username.
        const safeName = fromBase37(name37); // always safe username.

        const player = client ? new NetworkPlayer(safeName, name37, hash64, client) : new Player(safeName, name37, hash64);

        player.lastConnected = World.currentTick;
        player.lastResponse = World.currentTick;

        if (sav.data.length < 2) {
            for (let i = 0; i < 21; i++) {
                player.stats[i] = 0;
                player.baseLevels[i] = 1;
                player.levels[i] = 1;
            }

            // hitpoints starts at level 10
            player.stats[PlayerStat.HITPOINTS] = getExpByLevel(10);
            player.baseLevels[PlayerStat.HITPOINTS] = 10;
            player.levels[PlayerStat.HITPOINTS] = 10;
            return player;
        }

        if (sav.g2() !== 0x2004) {
            throw new Error('Invalid save file');
        }

        const version = sav.g2();
        if (version > 5) {
            throw new Error('Unsupported save version');
        }

        sav.pos = sav.data.length - 4;
        const crc = sav.g4();
        if (crc != Packet.getcrc(sav.data, 0, sav.data.length - 4)) {
            throw new Error('Incorrect save checksum');
        }

        sav.pos = 4;
        player.x = sav.g2();
        player.z = sav.g2();
        player.level = sav.g1();
        for (let i = 0; i < 7; i++) {
            player.body[i] = sav.g1();
            if (player.body[i] === 255) {
                player.body[i] = -1;
            }
        }
        for (let i = 0; i < 5; i++) {
            player.colors[i] = sav.g1();
        }
        player.gender = sav.g1();
        player.runenergy = sav.g2();
        if (version >= 2) {
            // oops playtime overflow
            player.playtime = sav.g4();
        } else {
            player.playtime = sav.g2();
        }

        for (let i = 0; i < 21; i++) {
            player.stats[i] = sav.g4();
            player.baseLevels[i] = getLevelByExp(player.stats[i]);
            player.levels[i] = sav.g1();
        }

        const varpCount = sav.g2();
        for (let i = 0; i < varpCount; i++) {
            player.vars[i] = sav.g4();
        }

        const invCount = sav.g1();
        for (let i = 0; i < invCount; i++) {
            const type = sav.g2();
            const size = version >= 5 ? sav.g2() : InvType.get(type).size;

            const objs = [];
            for (let slot = 0; slot < size; slot++) {
                const id = sav.g2() - 1;
                if (id === -1) {
                    continue;
                }

                let count = sav.g1();
                if (count === 255) {
                    count = sav.g4();
                }

                objs.push({ slot, id, count });
            }

            const inv = player.getInventory(type);
            if (inv) {
                for (const obj of objs) {
                    inv.set(obj.slot, { id: obj.id, count: obj.count });
                }
            }
        }

        // afk zones
        if (version >= 3) {
            const afkZones: number = sav.g1();
            for (let index: number = 0; index < afkZones; index++) {
                player.afkZones[index] = sav.g4();
            }
            player.lastAfkZone = sav.g2();
        }

        // chat modes
        if (version >= 4) {
            const packedChatModes = sav.g1();
            player.publicChat = (packedChatModes >> 4) & 0b11;
            player.privateChat = (packedChatModes >> 2) & 0b11;
            player.tradeDuel = packedChatModes & 0b11;
        }

        player.combatLevel = player.getCombatLevel();

        return player;
    }
}
