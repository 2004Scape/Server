let WorldList = [
    {
        id: 1,
        region: 'East Coast (USA)',
        players: [],
        address: 'https://world1.runewiki.org',
        portOffset: 3
    },
    {
        id: 2,
        region: 'East Coast (USA)',
        members: true,
        players: [],
        address: 'https://world2.runewiki.org',
        portOffset: 0
    }
];

if (process.env.LOCAL_DEV) {
    WorldList.forEach(x => {
        x.address = x.address.replace('https', 'http');
    });

    WorldList.push({
        id: 0,
        region: 'East Coast (USA)',
        members: process.env.MEMBERS_WORLD ? true : false,
        players: [],
        address: (process.env.HTTPS_CERT ? 'https://' : 'http://') + process.env.PUBLIC_IP + ':' + process.env.WEB_PORT,
        portOffset: 0
    });
}

let WorldListPlayers: any[] = [];

export { WorldList, WorldListPlayers };
