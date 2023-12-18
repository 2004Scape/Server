import World from '#lostcity/engine/World.js';

export default function (f, opts, next) {
    f.get('/world', async (req, res) => {
        const players = [];

        for (let i = 0; i < World.players.length; i++) {
            if (World.players[i] === null) {
                continue;
            }

            players.push(World.players[i].username);
        }

        return {
            tick: World.currentTick,
            lastTickMs: World.lastTickMs,
            players
        };
    });

    f.get('/players', async (req, res) => {
        const list = [];

        for (let i = 0; i < World.players.length; i++) {
            if (World.players[i] === null) {
                continue;
            }

            list.push({
                pid: World.players[i].pid,
                username: World.players[i].username,
                x: World.players[i].x,
                z: World.players[i].z,
                level: World.players[i].level,
                client: World.players[i].client !== null,
                lastResponse: World.currentTick - World.players[i].lastResponse
            });
        }

        return list;
    });

    next();
}
