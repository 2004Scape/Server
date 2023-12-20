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
            const player = World.players[i];
            if (player === null) {
                continue;
            }

            const sees = [];
            for (const uid of player.players) {
                const other = World.getPlayerByUid(uid);
                if (other === null) {
                    continue;
                }

                sees.push(other.username);
            }

            list.push({
                pid: player.pid,
                username: player.username,
                x: player.x,
                z: player.z,
                level: player.level,
                sees,
                clientConnected: player.client !== null,
                clientIdleTicks: World.currentTick - player.lastResponse
            });
        }

        return list;
    });

    next();
}
