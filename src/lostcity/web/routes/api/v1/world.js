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
            stats: {
                memory: process.memoryUsage(),
                network: {
                    in: World.lastCycleBandwidth[0],
                    out: World.lastCycleBandwidth[1]
                },
                cycle: {
                    overall: World.lastCycleStats[0],
                    world: World.lastCycleStats[1],
                    clientIn: World.lastCycleStats[2],
                    npcs: World.lastCycleStats[3],
                    players: World.lastCycleStats[4],
                    logout: World.lastCycleStats[5],
                    login: World.lastCycleStats[6],
                    zones: World.lastCycleStats[7],
                    clientOut: World.lastCycleStats[8],
                    cleanup: World.lastCycleStats[9]
                }
            },
            players,
            npcs: World.getTotalNpcs()
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
