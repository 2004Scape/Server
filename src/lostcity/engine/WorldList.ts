import fs from 'fs';

import Environment from '#lostcity/util/Environment.js';

const WorldList = [];

if (fs.existsSync('data/config/worlds.json')) {
    try {
        const worlds = JSON.parse(fs.readFileSync('data/config/worlds.json', 'utf8'));

        for (const world of worlds) {
            world.players = []; // temporary
            WorldList.push(world);
        }
    } catch (err) {
        console.error('Error initializing world list', err);
    }
}

if (Environment.LOCAL_DEV) {
    WorldList.push({
        id: 0,
        region: 'Local Development',
        members: Environment.MEMBERS_WORLD,
        address: (Environment.HTTPS_CERT ? 'https://' : 'http://') + Environment.PUBLIC_IP + ':' + Environment.WEB_PORT,
        portOffset: 0,
        players: []
    });
}

const WorldListPlayers: unknown[] = [];

export { WorldList, WorldListPlayers };
