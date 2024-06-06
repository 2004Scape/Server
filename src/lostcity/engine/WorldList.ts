import fs from 'fs';

import { LoginClient } from '#lostcity/server/LoginServer.js';

import Environment from '#lostcity/util/Environment.js';

interface World {
    id: number
    region: string
    address: string
    portOffset: number
    players: number
    members: boolean
}

const WorldList: World[] = [];

if (fs.existsSync('data/config/worlds.json')) {
    try {
        const worlds: World[] = JSON.parse(fs.readFileSync('data/config/worlds.json', 'utf8'));

        for (const world of worlds) {
            world.players = 0;
            WorldList.push(world);
        }
    } catch (err) {
        console.error('Error initializing world list', err);
    }
}

if (Environment.LOCAL_DEV) {
    let address = (Environment.HTTPS_ENABLED ? 'https://' : 'http://') + Environment.PUBLIC_IP;
    if (Environment.ADDRESS_SHOWPORT) {
        if (Environment.HTTPS_ENABLED && Environment.WEB_PORT != 443 && Environment.WEB_PORT != 80) {
            address += ':' + Environment.WEB_PORT;
        } else if (!Environment.HTTPS_ENABLED && Environment.WEB_PORT != 80) {
            address += ':' + Environment.WEB_PORT;
        }
    }

    WorldList.push({
        id: Environment.WORLD_ID,
        region: 'Local Development',
        members: Environment.MEMBERS_WORLD,
        address,
        portOffset: Environment.GAME_PORT - 43594,
        players: 0
    });
}

async function refreshWorldList() {
    for (const world of WorldList) {
        const login = new LoginClient();
        world.players = await login.count(world.id);
    }
}

if (Environment.LOGIN_KEY) {
    await refreshWorldList();
    setInterval(refreshWorldList, 20000);
}

export default WorldList;
