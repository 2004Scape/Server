import fs from 'fs';

import { LoginClient } from '#lostcity/server/LoginServer.js';

import Environment from '#lostcity/util/Environment.js';

// todo: typing
const WorldList: any[] = [];

if (fs.existsSync('data/config/worlds.json')) {
    try {
        const worlds = JSON.parse(fs.readFileSync('data/config/worlds.json', 'utf8'));

        for (const world of worlds) {
            world.players = 0;
            WorldList.push(world);
        }
    } catch (err) {
        console.error('Error initializing world list', err);
    }
}

if (Environment.LOCAL_DEV) {
    WorldList.push({
        id: Environment.WORLD_ID,
        region: 'Local Development',
        members: Environment.MEMBERS_WORLD,
        address: (Environment.HTTPS_CERT ? 'https://' : 'http://') + Environment.PUBLIC_IP + ':' + Environment.WEB_PORT,
        portOffset: 0,
        players: 0
    });
}

async function refreshWorldList() {
    for (const world of WorldList) {
        await LoginClient.count(world.id);

        // probably won't update until the next interval, but that's okay, we don't need sub-minute updates...
        world.players = LoginClient.worldCount.get(world.id) || 0;
    }
}

if (Environment.LOGIN_HOST) {
    await refreshWorldList();
    setInterval(refreshWorldList, 20000);
}

export default WorldList;
