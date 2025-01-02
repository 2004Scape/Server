import fs from 'fs';
import { parentPort } from 'worker_threads';

import LoginClient from '#/server/login/LoginClient.js';

import Environment from '#/util/Environment.js';

const client = new LoginClient(Environment.NODE_ID);

if (Environment.STANDALONE_BUNDLE) {
    self.onmessage = async msg => {
        try {
            await handleRequests(self, msg.data);
        } catch (err) {
            console.error(err);
        }
    };

    client.onMessage((opcode, data) => {
        self.postMessage({ opcode, data });
    });
} else {
    if (!parentPort) throw new Error('This file must be run as a worker thread.');

    parentPort.on('message', async msg => {
        try {
            if (!parentPort) throw new Error('This file must be run as a worker thread.');
            await handleRequests(parentPort, msg);
        } catch (err) {
            console.error(err);
        }
    });

    client.onMessage((opcode, data) => {
        parentPort!.postMessage({ opcode, data });
    });
}

type ParentPort = {
    postMessage: (msg: any) => void;
};

async function handleRequests(parentPort: ParentPort, msg: any) {
    const { type } = msg;

    switch (type) {
        case 'world_startup': {
            if (Environment.LOGIN_SERVER) {
                await client.worldStartup();
            }
            break;
        }
        case 'player_login': {
            const { socket, username, password, uid, lowMemory, reconnecting } = msg;

            if (Environment.LOGIN_SERVER) {
                parentPort.postMessage({
                    type: 'player_login',
                    socket,
                    username,
                    lowMemory,
                    reconnecting,
                    ...await client.playerLogin(username, password, uid)
                });
            } else {
                if (!fs.existsSync(`data/players/${username}.sav`)) {
                    parentPort.postMessage({
                        type: 'player_login',
                        socket,
                        username,
                        lowMemory,
                        reconnecting,
                        reply: 4,
                        save: null
                    });
                } else {
                    parentPort.postMessage({
                        type: 'player_login',
                        socket,
                        username,
                        lowMemory,
                        reconnecting,
                        reply: 0,
                        save: fs.readFileSync(`data/players/${username}.sav`)
                    });
                }
            }
            break;
        }
        case 'player_logout': {
            const { username, save } = msg;

            if (Environment.LOGIN_SERVER) {
                const success = await client.playerLogout(username, save);

                parentPort.postMessage({
                    type: 'player_logout',
                    username,
                    success
                });
            } else {
                fs.writeFileSync(`data/players/${username}.sav`, save);

                parentPort.postMessage({
                    type: 'player_logout',
                    username,
                    success: true
                });
            }
            break;
        }
        case 'player_autosave': {
            const { username, save } = msg;

            if (Environment.LOGIN_SERVER) {
                await client.playerAutosave(username, save);
            } else {
                fs.writeFileSync(`data/players/${username}.sav`, save);
            }
            break;
        }
        case 'player_force_logout': {
            if (Environment.LOGIN_SERVER) {
                const { username } = msg;
                await client.playerForceLogout(username);
            }
            break;
        }
        default:
            console.error('Unknown message type: ' + msg.type);
            break;
    }
}
