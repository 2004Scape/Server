import Environment from '#lostcity/util/Environment.js';

const WorldList = [
    {
        id: 1,
        region: 'East Coast (USA)',
        players: [],
        address: 'https://w1.225.2004scape.org',
        portOffset: 0
    },
    {
        id: 2,
        region: 'East Coast (USA)',
        members: true,
        players: [],
        address: 'https://w2.225.2004scape.org',
        portOffset: 3
    }
];

if (Environment.LOCAL_DEV) {
    WorldList.forEach(x => {
        x.address = x.address.replace('https', 'http');
    });

    WorldList.push({
        id: 0,
        region: 'East Coast (USA)',
        members: Environment.MEMBERS_WORLD === 'true',
        players: [],
        address: (Environment.HTTPS_CERT ? 'https://' : 'http://') + Environment.PUBLIC_IP + ':' + Environment.WEB_PORT,
        portOffset: 0
    });
}

const WorldListPlayers: unknown[] = [];

export { WorldList, WorldListPlayers };
