import fs from 'fs';
import net from 'net';

import forge from 'node-forge';

import { CrcBuffer } from '#/cache/CrcTable.js';
import Isaac from '#/io/Isaac.js';
import Packet from '#/io/Packet.js';

const priv = forge.pki.privateKeyFromPem(fs.readFileSync('data/config/private.pem', 'ascii'));

type ClientWrapper = {
    socket: net.Socket;
    state: number;
    encryptor: Isaac | null;
    decryptor: Isaac | null;
    // lastSent: number;
};

const clients: ClientWrapper[] = [];

function connectTcp(username: string, host = '127.0.0.1', port = 43594) {
    try {
        const socket = net.createConnection({
            host,
            port
        });

        let state = -1;

        const client: ClientWrapper = {
            socket,
            state: 1,
            encryptor: null,
            decryptor: null
            // lastSent: -1,
        };

        socket.on('data', data => {
            const buf = new Packet(data);

            if (state === -1) {
                const seed = [Math.trunc(Math.random() * 9.9999999e7), Math.trunc(Math.random() * 9.9999999e7), buf.g4(), buf.g4()];

                const out = Packet.alloc(1);
                out.p1(10);
                out.p4(seed[0]);
                out.p4(seed[1]);
                out.p4(seed[2]);
                out.p4(seed[3]);
                out.p4(0); // uid
                out.pjstr(username);
                out.pjstr('asdf');
                out.rsaenc(priv);

                const login = Packet.alloc(1);
                login.p1(16);
                login.p1(out.pos + CrcBuffer.length + 1 + 1);

                login.p1(225);
                login.p1(0);
                login.pdata(CrcBuffer.data, 0, CrcBuffer.length);
                login.pdata(out.data, 0, out.pos);

                client.decryptor = new Isaac(seed);
                for (let i = 0; i < 4; i++) {
                    seed[i] += 50;
                }
                client.encryptor = new Isaac(seed);
                // client.lastSent = Date.now();

                socket.write(login.data.subarray(0, login.pos));

                out.release();
                login.release();

                state = 0;
            } else if (state === 0) {
                const reply = buf.g1();

                if (reply === 2 || reply === 18) {
                    state = 1;

                    clients.push(client);
                }
            }
        });

        socket.on('error', () => {});
    } catch (_) {
        // no-op
    }
}

function cycle() {
    console.log(clients.length, 'clients connected');

    for (let i = 0; i < clients.length; i++) {
        const client = clients[i];

        if (client.socket.closed) {
            clients.splice(i--, 1);
            continue;
        }

        /*if (Date.now() - client.lastSent > 1000) {
            // NO_TIMEOUT
            if (client.encryptor) {
                client.socket.write(Uint8Array.from([
                    (108 + client.encryptor.nextInt())
                ]));
            } else {
                client.socket.write(Uint8Array.from([
                    108
                ]));
            }

            client.lastSent = Date.now();
        }*/
    }

    setTimeout(cycle, 100);
}

for (let i = 0; i < 1990; i++) {
    connectTcp('bot' + i);
}

cycle();
