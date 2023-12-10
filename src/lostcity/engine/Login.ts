import fs from 'fs';
import forge from 'node-forge';

import Isaac from '#jagex2/io/Isaac.js';
import Packet from '#jagex2/io/Packet.js';

import { CrcBuffer32 } from '#lostcity/cache/CrcTable.js';

import World from '#lostcity/engine/World.js';

import Player from '#lostcity/entity/Player.js';

import ClientSocket from '#lostcity/server/ClientSocket.js';

const priv = forge.pki.privateKeyFromPem(fs.readFileSync('data/config/private.pem', 'ascii'));

class Login {
    readIn(socket: ClientSocket, data: Packet) {
        const opcode = data.g1();

        if (opcode === 16 || opcode === 18) {
            const login = data.gPacket(data.g1());

            const revision = login.g1();
            if (revision !== 225) {
                socket.send(Uint8Array.from([6]));
                socket.close();
                return;
            }

            const info = login.g1();

            const crcs = login.gdata(9 * 4);
            if (Packet.crc32(crcs) !== CrcBuffer32) {
                socket.send(Uint8Array.from([6]));
                socket.close();
                return;
            }

            login.rsadec(priv);
            const magic = login.g1();
            if (magic !== 10) {
                socket.send(Uint8Array.from([11]));
                socket.close();
                return;
            }

            const seed = [];
            for (let i = 0; i < 4; i++) {
                seed.push(login.g4());
            }

            const uid = login.g4();
            let username = login.gjstr().toLowerCase();
            // if (username.length < 1 || username.length > 12) {
            //     socket.send(Uint8Array.from([3]));
            //     socket.close();
            //     return;
            // }
            if (!username.length) {
                username = 'Guest' + uid;
            }

            const password = login.gjstr();
            // if (password.length < 4 || password.length > 20) {
            //     socket.send(Uint8Array.from([3]));
            //     socket.close();
            //     return;
            // }

            if (World.shutdownTick > -1 && World.currentTick - World.shutdownTick > 0) {
                socket.send(Uint8Array.from([14]));
                socket.close();
                return;
            }

            let player = World.getPlayerByUsername(username);
            if ((opcode === 16 && player) || (opcode === 18 && !player && process.env.LOCAL_DEV !== 'true')) {
                socket.send(Uint8Array.from([5]));
                socket.close();
                return;
            }

            if (opcode === 18 && player && player.client !== null) {
                socket.send(Uint8Array.from([5]));
                socket.close();
                return;
            }

            socket.state = 1;
            socket.decryptor = new Isaac(seed);
            for (let i = 0; i < 4; i++) {
                seed[i] += 50;
            }
            socket.encryptor = new Isaac(seed);

            if (!player) {
                player = Player.load(username);
                World.addPlayer(player, socket);

                socket.send(Uint8Array.from([2]));
            } else {
                player.logoutRequested = false;
                player.netOut = []; // clear old packets
                player.playerIds = []; // clear old observed players
                player.npcIds = []; // clear old observed npcs
                player.loadedX = -1; // reload area
                player.loadedZ = -1;
                player.tele = true;
                player.jump = true;

                socket.send(Uint8Array.from([15]));
            }

            player.client = socket;
            player.lowMemory = (info & 0x1) === 1;
            player.webClient = socket.isWebSocket();
        } else {
            socket.close();
        }
    }
}

export default new Login();
