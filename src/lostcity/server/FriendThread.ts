import fs from 'fs';
import forge from 'node-forge';
import { parentPort } from 'worker_threads';

import Environment from '#lostcity/util/Environment.js';
import { FriendClient } from './FriendServer.js';

const client = new FriendClient();

if (typeof self === 'undefined') {
    if (!parentPort) throw new Error('This file must be run as a worker thread.');

    const priv = forge.pki.privateKeyFromPem(fs.readFileSync('data/config/private.pem', 'ascii'));

    parentPort.on('message', async msg => {
        try {
            if (!parentPort) throw new Error('This file must be run as a worker thread.');
            await handleRequests(parentPort, msg, priv);
        } catch (err) {
            console.error(err);
        }
    });

    client.onMessage((opcode, data) => {
        parentPort!.postMessage({ opcode, data });
    });
} else {
    const priv = forge.pki.privateKeyFromPem(await (await fetch('data/config/private.pem')).text());

    self.onmessage = async msg => {
        try {
            await handleRequests(self, msg.data, priv);
        } catch (err) {
            console.error(err);
        }
    };
    
    client.onMessage((opcode, data) => {
        self.postMessage({ opcode, data });
    });
}

type ParentPort = {
    postMessage: (msg: any) => void;
};

async function handleRequests(parentPort: ParentPort, msg: any, priv: forge.pki.rsa.PrivateKey) {
    switch (msg.type) {
        case 'connect': {
            await client.worldConnect(Environment.NODE_ID as number);
            break;
        }
        case 'player_login': {
            const { username, chatModePrivate } = msg;
            await client.playerLogin(username, chatModePrivate);
            break;
        }
        case 'player_logout': {
            const { username } = msg;
            await client.playerLogout(username);
            break;
        }
        case 'player_friendslist_add': {
            const { username, target } = msg;
            await client.playerFriendslistAdd(username, target);
            break;
        }
        case 'player_friendslist_remove': {
            const { username, target } = msg;
            await client.playerFriendslistRemove(username, target);
            break;
        }
        case 'player_ignorelist_add': {
            const { username, target } = msg;
            await client.playerIgnorelistAdd(username, target);
            break;
        }
        case 'player_ignorelist_remove': {
            const { username, target } = msg;
            await client.playerIgnorelistRemove(username, target);
            break;
        }
        case 'player_chat_setmode': {
            const { username, chatModePrivate } = msg;
            await client.playerChatSetMode(username, chatModePrivate);
            break;
        }
        case 'private_message': {
            const { username, staffLvl, pmId, target, message } = msg;
            await client.privateMessage(username, staffLvl, pmId, target, message);
            break;
        }
        default:
            console.error('Unknown message type: ' + msg.type);
            break;
    }
}
