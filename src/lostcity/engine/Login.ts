import fs from 'fs';
import forge from 'node-forge';

import Packet from '#jagex/io/Packet.js';
import ClientSocket from '#lostcity/server/ClientSocket.js';

const priv = forge.pki.privateKeyFromPem(fs.readFileSync('data/config/private.pem', 'ascii'));

const buf = Packet.alloc(1);

class Login {
    clients: Map<string, ClientSocket> = new Map();

    cycle() {
        for (const client of this.clients.values()) {
            for (let i = 0; i < 5 && this.read(client); i++) {
                // empty
            }
        }

        // todo: determine if logins happen same-tick on live
        setTimeout(this.cycle.bind(this), 1000);
    }

    read(client: ClientSocket) {
        let available = client.available;
        if (available < 1) {
            return false;
        }

        if (client.opcode === -1) {
            buf.pos = 0;
            client.read(buf.data, 0, 1);
            available -= 1;

            client.opcode = buf.g1();

            // todo: move login to decoder/encoder/handler
            if (client.opcode === 16 || client.opcode === 18) {
                client.waiting = -1;
            } else {
                client.waiting = 0;
            }
        }

        if (client.waiting === -1) {
            if (available < 1) {
                return false;
            }

            buf.pos = 0;
            client.read(buf.data, 0, 1);
            available -= 1;

            client.waiting = buf.g1();
        } else if (client.waiting === -2) {
            if (available < 2) {
                return false;
            }

            buf.pos = 0;
            client.read(buf.data, 0, 2);
            available -= 2;

            client.waiting = buf.g2();
        }

        if (available < client.waiting) {
            return false;
        }

        client.read(buf.data, 0, client.waiting);
        available -= client.waiting;

        if (client.opcode === 16 || client.opcode === 18) {
            buf.pos = 0;
            client.read(buf.data, 0, client.waiting);
            available -= client.waiting;

            const rev = buf.g1();
            const info = buf.g1();

            const checksums = new Uint8Array(9 * 4);
            buf.gdata(checksums, 0, checksums.length);

            buf.rsadec(priv);

            const seed = [];
            for (let i = 0; i < 4; i++) {
                seed[i] = buf.g4();
            }

            const uid = buf.g4();
            const username = buf.gjstr();
            const password = buf.gjstr();

            return true;
        }

        client.close();
        return false;
    }
}

export default new Login();
