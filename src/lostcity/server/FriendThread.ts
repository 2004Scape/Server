import { parentPort } from 'worker_threads';

import { FriendClient } from '#lostcity/server/FriendServer.js';

if (!parentPort) throw new Error('This file must be run as a worker thread.');

parentPort.on('message', async data => {
    try {
        switch (data.type) {
            case 'addfriend': {
                const client = new FriendClient();
                await client.addFriend(data.player, data.other);
            } break;
            case 'delfriend': {
                const client = new FriendClient();
                await client.removeFriend(data.player, data.other);
            } break;
            case 'addignore': {
                const client = new FriendClient();
                await client.addIgnore(data.player, data.other);
            } break;
            case 'delignore': {
                const client = new FriendClient();
                await client.removeIgnore(data.player, data.other);
            } break;
            case 'getlatest': {
                const client = new FriendClient();
            } break;
            default:
                console.error('Unknown message type: ' + data.type);
                break;
        }
    } catch (err) {
        console.error(err);
    }
});
