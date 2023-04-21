import fs from 'fs';
import _ from 'lodash';

import { Npc } from '#engine/Npc.js';
import { Player } from '#engine/Player.js';
import { Container } from '#engine/Container.js';

import NpcType from '#cache/config/NpcType.js';
import IdentityKitType from '#cache/config/IdentityKitType.js';

import LoadNewAreas from '#scripts/core/LoadNewAreas.js';
import PlayerInfo from '#scripts/core/PlayerInfo.js';
import MusicRegions from '#scripts/core/MusicRegions.js';
import NpcInfo from '#scripts/core/NpcInfo.js';
import InventoryUpdate from '#scripts/core/InventoryUpdate.js';
import NpcMovement from '#scripts/core/NpcMovement.js';
import ZoneUpdate from '#scripts/core/ZoneUpdate.js';

import '#scripts/index.js';
import axios from 'axios';
import { ClientProt, ClientProtOpcode, ClientProtOpcodeFromID, ClientProtSize } from '#enum/ClientProt.js';

const FLAG_TYPED_ARRAY = 'FLAG_TYPED_ARRAY';

class World {
    STATE = 1;

    players = [];
    playerCount = 0;

    nids = []; // Available NPC IDs (true/false)
    npcs = [];
    groundObjs = []; // 128 per zone

    currentTick = 0;
    endTick = -1;

    members = process.env.MEMBERS_WORLD;

    start() {
        const MAX_PLAYERS = 2047;

        for (let i = 0; i < MAX_PLAYERS; i++) {
            this.players[i] = null;
        }

        const MAX_NPCS = 8192;
        for (let i = 0; i < MAX_NPCS; i++) {
            this.nids[i] = true;
        }
        this.nids[0] = false;

        console.time(`Loaded NPCs`);

        let npcSpawns = fs.readFileSync('data/config/npc-spawns.csv', 'ascii').replaceAll('\r\n', '\n').split('\n').filter(l => l && l.indexOf(',') !== -1).slice(1);
        let npcList = [];
        
        for (let i = 0; i < npcSpawns.length; i++) {
            let spawn = npcSpawns[i].split(',');
            npcList.push({
                x: Number(spawn[0]),
                z: Number(spawn[1]),
                plane: Number(spawn[2]),
                id: Number(spawn[3])
            });
        }

        for (let i = 0; i < npcList.length; i++) {
            let def = NpcType.get(npcList[i].id);
            if (!def) {
                continue;
            }

            let npc = new Npc();
            npc.nid = this.nids.indexOf(true);
            this.nids[npc.nid] = false;
            npc.id = def.id;
            npc.x = npcList[i].x;
            npc.z = npcList[i].z;
            npc.plane = npcList[i].plane ?? 0;
            // npc.orientation = directionList[npc.id] ?? -1;
            npc.startX = npc.x;
            npc.startZ = npc.z;
            npc.startPlane = npc.plane;
            npc.startDir = npc.orientation;
            npc.step = -1;
            npc.steps = [];
            if (def.name == 'Banker' || def.name == 'Fishing spot') {
                npc.wander = 0;
            } else {
                npc.wander = 5;
            }
            this.npcs[npc.nid] = npc;
        }
        console.timeEnd(`Loaded NPCs`);

        console.time('Added bot players');
        // need to preload identitykits
        for (let i = 0; i < IdentityKitType.count; i++) {
            IdentityKitType.get(i);
        }
        for (let i = 0; i < 0; i++) {
            let player = new Player(null, `Bot${i}`, 0, true);

            // spawn in random coords
            player.x += Math.floor(Math.random() * 32);
            player.z += Math.floor(Math.random() * 32);
            if (Math.random() >= 0.5) {
                player.x -= 64;
                player.z -= 64;
            }

            // face a random direction
            let faceX = player.x + Math.floor(Math.random() * 16);
            let faceZ = player.z + Math.floor(Math.random() * 16);
            if (Math.random() >= 0.5) {
                faceX -= 32;
                faceZ -= 32;
            }

            player.mask |= Player.FACE_COORD;
            player.faceX = faceX * 2 + 1;
            player.faceZ = faceZ * 2 + 1;

            // generate a random appearance
            let head;
            let torso;
            let arms;
            let hands;
            let legs;
            let feet;
            if (Math.random() >= 0.5) {
                player.gender = 1;
                player.body[11] = -1; // remove beard

                head = IdentityKitType.filter(x => x.type == IdentityKitType.BODYPART_FEMALE_HAIR);
                torso = IdentityKitType.filter(x => x.type == IdentityKitType.BODYPART_FEMALE_TORSO);
                arms = IdentityKitType.filter(x => x.type == IdentityKitType.BODYPART_FEMALE_ARMS);
                hands = IdentityKitType.filter(x => x.type == IdentityKitType.BODYPART_FEMALE_HANDS);
                legs = IdentityKitType.filter(x => x.type == IdentityKitType.BODYPART_FEMALE_LEGS);
                feet = IdentityKitType.filter(x => x.type == IdentityKitType.BODYPART_FEMALE_FEET);
            } else {
                head = IdentityKitType.filter(x => x.type == IdentityKitType.BODYPART_MALE_HAIR);
                torso = IdentityKitType.filter(x => x.type == IdentityKitType.BODYPART_MALE_TORSO);
                arms = IdentityKitType.filter(x => x.type == IdentityKitType.BODYPART_MALE_ARMS);
                hands = IdentityKitType.filter(x => x.type == IdentityKitType.BODYPART_MALE_HANDS);
                legs = IdentityKitType.filter(x => x.type == IdentityKitType.BODYPART_MALE_LEGS);
                feet = IdentityKitType.filter(x => x.type == IdentityKitType.BODYPART_MALE_FEET);
            }

            player.body[8] = head[Math.floor(Math.random() * head.length)].id;
            player.body[4] = torso[Math.floor(Math.random() * torso.length)].id;
            player.body[6] = arms[Math.floor(Math.random() * arms.length)].id;
            player.body[9] = hands[Math.floor(Math.random() * hands.length)].id;
            player.body[7] = legs[Math.floor(Math.random() * legs.length)].id;
            player.body[10] = feet[Math.floor(Math.random() * feet.length)].id;

            if (player.gender == 0) {
                let jaw = IdentityKitType.filter(x => x.type == IdentityKitType.BODYPART_MALE_JAW);
                player.body[11] = jaw[Math.floor(Math.random() * jaw.length)].id;
            }

            player.colors[0] = Math.floor(Math.random() * 12);
            player.colors[1] = Math.floor(Math.random() * 16);
            player.colors[2] = Math.floor(Math.random() * 16);
            player.colors[3] = Math.floor(Math.random() * 6);
            player.colors[4] = Math.floor(Math.random() * 8);

            player.generateAppearance();
            player.ready = true;

            player.pid = this.getNextPid();
            this.players[player.pid] = player;
            this.playerCount++;
        }
        console.timeEnd('Added bot players');

        this.tick();
    }

    stopServer(inTicks) {
        if (process.env.LOCAL_DEV && this.playerCount <= 0) {
            console.log('No players online, shutting down immediately');
            process.exit(0);
        }

        console.log('Preparing for shutdown...', inTicks, 'ticks away');
        this.endTick = this.currentTick + inTicks;

        for (const player of this.players) {
            if (!player) {
                continue;
            }

            player.sendRebootTimer(inTicks);
        }
    }

    tick() {
        if (this.endTick !== -1 && this.currentTick > this.endTick) {
            if (this.playerCount > 0) {
                // retry logouts until we have no more players to save
                const start = Date.now();
                for (const player of this.players) {
                    if (!player) {
                        continue;
                    }

                    player.logout();

                    // immediately flush the logout packet:
                    if (player.netOut.length) {
                        player.encodeOut();
                        player.netOut = [];
                    }

                    player.client.flush();
                    player.client.reset();
                    player.client.close();
                }
                const end = Date.now();

                this.currentTick++;
                const nextTick = 600 - (end - start);
                setTimeout(() => {
                    this.tick();
                }, nextTick);
            } else {
                // see ya later
                process.exit(0);
            }

            return;
        }

        const start = Date.now();
        // world processing
        // ...

        // client input
        for (const player of this.players) {
            if (!player) {
                continue;
            }

            try {
                if (player.client && player.client.inOffset) {
                    player.decodeIn();
                }
            } catch (err) {
                console.log(err);
                player.logout();
            }
        }

        // npc script processing
        for (const npc of this.npcs) {
            if (!npc) {
                continue;
            }

            // disabled:
            // new NpcMovement().execute(npc);

            // if (npc.runDir != -1) {
            //     npc.orientation = npc.runDir;
            // } else if (npc.walkDir != -1) {
            //     npc.orientation = npc.walkDir;
            // }
        }

        // player script processing
        for (const player of this.players) {
            if (!player) {
                continue;
            }

            try {
                player.process();
            } catch (err) {
                console.log(err);
                player.logout();
            }

            if (player.step == -1 && player.walkDir == -1 && (player.faceX != -1 || player.faceZ != -1) && !player.alreadyFaced) {
                player.mask |= Player.FACE_COORD;
                player.alreadyFaced = true;
            }

            new LoadNewAreas().execute(player);
            new MusicRegions().execute(player); // TODO: convert to inarea trigger
        }

        // client output
        for (const player of this.players) {
            if (!player || !player.client) {
                continue;
            }

            new InventoryUpdate().execute(player);
            new PlayerInfo().execute(player);
            new NpcInfo().execute(player);
            new ZoneUpdate().execute(player);

            if (player.netOut.length) {
                player.encodeOut();
                player.netOut = [];
            }

            player.client.flush();
            player.client.reset();
        }

        // TODO: make the following 2 loops (reset transient states) unnecessary

        for (const player of this.players) {
            if (!player) {
                continue;
            }

            player.animId = -1;
            player.animDelay = 0;

            player.messageColor = 0;
            player.messageEffect = 0;
            player.messageType = 0;
            player.message = new Uint8Array();

            player.graphicId = -1;
            player.graphicHeight = 0;
            player.graphicDelay = 0;

            player.mask = 0;
        }

        // same with npcs
        for (const npc of this.npcs) {
            if (!npc) {
                continue;
            }

            npc.walkDir = -1;
            npc.runDir = -1;

            npc.mask = 0;
            npc.animId = -1;
            npc.animDelay = 0;
            npc.forcedChat = null;
            npc.damageTaken = 0;
            npc.damageType = 0;
            npc.currentHealth = 0;
            npc.maxHealth = 0;
            npc.transmogId = 0;
            npc.graphicId = 0;
            npc.graphicHeight = 0;
            npc.graphicDelay = 0;
        }
        const end = Date.now();

        if (process.env.VERBOSE) {
            console.log(`Tick ${this.currentTick} took ${end - start}ms (${this.playerCount} players) (${this.npcs.length} NPCs)`);
        }

        this.currentTick++;
        const nextTick = 600 - (end - start); // we don't want to start the next tick 600ms from when this one ended, instead at the next 600ms mark
        setTimeout(() => {
            this.tick();
        }, nextTick);
    }

    async savePlayer(player) {
        let save = JSON.stringify({
            username: player.username.toLowerCase(),
            x: player.x,
            z: player.z,
            plane: player.plane,
            gender: player.gender,
            body: player.body,
            colors: player.colors,
            varps: player.varps,
            running: player.running,
            inv: player.inv,
            bank: player.bank,
            exp: player.exp,
            levels: player.levels,
            tempLevels: player.tempLevels,
            withdrawCert: player.withdrawCert,
            worn: player.worn,
            autoplay: player.autoplay,
            lastLoginIp: player.client.remoteAddress,
            lastLoginDate: Date.now(),
            streamer: player.streamer,
            energy: player.energy
        }, function (key, value) {
            if (value instanceof Int8Array ||
                value instanceof Uint8Array ||
                value instanceof Uint8ClampedArray ||
                value instanceof Int16Array ||
                value instanceof Uint16Array ||
                value instanceof Int32Array ||
                value instanceof Uint32Array ||
                value instanceof Float32Array ||
                value instanceof Float64Array) {
                var replacement = {
                    data: Array.apply([], value),
                    flag: FLAG_TYPED_ARRAY
                };
                return replacement;
            }
            return value;
        }, 2);

        if (process.env.MASTER_ADDRESS) {
            try {
                await axios.post(`${process.env.MASTER_ADDRESS}/servapi/v1/logout`, JSON.parse(save));
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                fs.mkdirSync('data/players', { recursive: true });
                fs.writeFileSync(`data/players/${player.username.toLowerCase()}.json`, save);
            } catch (err) {
                console.log(err);
            }
        }
    }

    async removePlayer(player) {
        if (!player || !player.pid) {
            return;
        }

        await this.savePlayer(player);
        this.players[player.pid] = null;
        this.playerCount--;

        player.client.close();
    }

    async removeBySocket(socket) {
        if (!socket || !socket.player || !socket.player.pid) {
            return;
        }

        let player = this.players[socket.player.pid];
        await this.savePlayer(player);
        this.players[player.pid] = null;
        this.playerCount--;
    }

    getPlayer(pid) {
        return this.players[pid];
    }

    getNpc(nid) {
        return this.npcs[nid];
    }

    addGroundObj(item, x, z, plane = 0, pid = -1) {
        if (!this.groundObjs[plane]) {
            this.groundObjs[plane] = {};
        }

        // convert to zone coords
        let zoneX = x >> 3;
        let zoneZ = z >> 3;
        x = x - (zoneX << 3);
        z = z - (zoneZ << 3);

        if (!this.groundObjs[plane][zoneX]) {
            this.groundObjs[plane][zoneX] = {};
        }

        if (!this.groundObjs[plane][zoneX][zoneZ]) {
            this.groundObjs[plane][zoneX][zoneZ] = [];
        }

        this.groundObjs[plane][zoneX][zoneZ].push({
            x,
            z,
            item,
            pid
        });
    }

    getGroundObjs(x, z, plane = 0) {
        // convert to zone coords
        let zoneX = x >> 3;
        let zoneZ = z >> 3;

        if (!this.groundObjs[plane] || !this.groundObjs[plane][zoneX] || !this.groundObjs[plane][zoneX][zoneZ]) {
            return [];
        }

        return this.groundObjs[plane][zoneX][zoneZ];
    }

    getTotalPlayers() {
        return this.players.filter(p => p !== null).length;
    }

    getNextPid() {
        return this.players.indexOf(null, 1);
    }

    addPlayer(socket, reconnecting, username, lowMemory, webClient, save) {
        let pid = this.getNextPid();
        if (pid === -1) {
            return false;
        }

        let player = new Player(socket, reconnecting, username, lowMemory, webClient, fs.existsSync(`data/players/${username}.json`));

        if (save) {
            save.varps = Uint32Array.from(save.varps.data);
        } else if (fs.existsSync(`data/players/${username}.json`)) {
            save = JSON.parse(fs.readFileSync(`data/players/${username}.json`), function (key, value) {
                try {
                    if (value && value.flag === FLAG_TYPED_ARRAY) {
                        return Uint32Array.from(value.data);
                    }
                } catch (e) {
                    console.log(e);
                }
                return value;
            });
        }

        if (save) {
            player.x = save.x;
            player.z = save.z;
            player.plane = save.plane;
            player.gender = save.gender ?? 0;
            player.body = save.body;
            player.colors = save.colors;
            player.varps = save.varps ?? [];
            player.running = save.running ?? false;

            if (save.inv) {
                player.inv = save.inv;
                Object.setPrototypeOf(player.inv, Container.prototype);
                player.inv.update = true;
            }

            if (save.bank) {
                player.bank = save.bank;
                Object.setPrototypeOf(player.bank, Container.prototype);
            }

            if (save.exp) {
                player.exp = save.exp;
            }

            if (save.levels) {
                player.levels = save.levels;
            }

            if (save.tempLevels) {
                player.tempLevels = save.tempLevels;
            }

            if (save.withdrawCert) {
                player.withdrawCert = save.withdrawCert;
            }

            if (save.worn) {
                player.worn = save.worn;
                Object.setPrototypeOf(player.worn, Container.prototype);
                player.worn.update = true;

                if (player.worn.capacity < 14) {
                    player.worn.capacity = 14;
                }
            }

            if (typeof save.autoplay !== 'undefined') {
                player.autoplay = save.autoplay;
            }

            if (save.lastLoginIp) {
                player.lastLoginIp = save.lastLoginIp;
            }

            if (save.lastLoginDate) {
                player.lastLoginDate = save.lastLoginDate;
            }

            if (save.streamer) {
                player.streamer = save.streamer;
            }

            if (save.energy) {
                player.energy = save.energy;
            }

            player.combatLevel = player.getCombatLevel();
            player.firstLogin = false;
            player.generateAppearance();
            player.ready = true;
        }

        this.players[pid] = player;
        this.players[pid].pid = pid;
        socket.state = this.STATE;
        socket.player = this.players[pid];
        this.playerCount++;
        return true;
    }

    readIn(socket, data) {
        while (data.available > 0) {
            let start = data.pos;
            let opcode = data.g1();

            if (socket.decryptor) {
                opcode = (opcode - socket.decryptor.nextInt()) & 0xFF;
                data.data[data.pos - 1] = opcode;
            }

            let id = ClientProtOpcode[opcode];
            if (id === -1) {
                console.log(`Unknown opcode: ${opcode}`);
                return;
            }

            let size = ClientProtSize[opcode];
            if (size === -1) {
                size = data.g1();
            } else if (size === -2) {
                size = data.g2();
            }

            if (data.available < size) {
                // TODO: tcp fragmentation? bad packet?
                return;
            }

            data.pos += size;

            socket.inCount[opcode]++;
            if (socket.inCount[opcode] > 10) {
                continue;
            }

            socket.in.set(data.gdata(data.pos - start, start, false), socket.inOffset);
            socket.inOffset += data.pos - start;
        }
    }
}

export default new World();
