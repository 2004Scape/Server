import fs from 'fs';

import { FriendsServer } from '#lostcity/server/FriendsServer.js';

if (!fs.existsSync('data/config/friend.json')) {
    console.error('Missing friend.json configuration');
    process.exit(1);
}

const server = new FriendsServer();
server.start();
