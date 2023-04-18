import fs from 'fs';

import World from '#engine/World.js';
import { WorldList, WorldListPlayers } from '#engine/WorldList.js';
import axios from 'axios';

export default function (f, opts, next) {
    // world -> master

    f.post('/login', async (req, res) => {
        try {
            if (!req.body || !req.body.username || !req.body.password || !req.body.world) {
                return res.status(400).send({ errorCode: 1, error: 'Missing fields' });
            }

            const { username, password, world } = req.body;
            let safeUsername = username.toLowerCase();

            // temporarily disabled
            // if (!fs.existsSync(`data/players/${safeUsername}.json`)) {
            //     return res.status(400).send({ errorCode: 2, error: 'Invalid username or password' });
            // }

            if (WorldListPlayers.find(x => x.username === safeUsername)) {
                return res.status(400).send({ errorCode: 3, error: 'User already logged in' });
            }

            let worldEntry = WorldList.find(x => x.id == world);
            if (worldEntry) {
                worldEntry.players.push(safeUsername);
            }

            WorldListPlayers.push({
                username: safeUsername,
                world
            });

            if (fs.existsSync(`data/players/${safeUsername}.json`)) {
                return res.sendFile(`data/players/${safeUsername}.json`, process.cwd());
            } else {
                return {};
            }
        } catch (err) {
            console.error(err);
            return res.status(500).send({ errorCode: 0, error: 'Internal server error' });
        }
    });

    f.post('/logout', async (req, res) => {
        try {
            if (!req.body || !req.body.username || !req.body.varps) {
                return res.status(400).send({ errorCode: 1, error: 'Missing fields' });
            }

            const { username } = req.body;
            let safeUsername = username.toLowerCase();

            // temporarily disabled
            // if (!fs.existsSync(`data/players/${safeUsername}.json`)) {
            //     return res.status(400).send({ errorCode: 2, error: 'Invalid username' });
            // }

            let index = WorldListPlayers.findIndex(x => x.username === safeUsername);
            if (index === -1) {
                return res.status(400).send({ errorCode: 3, error: 'User not logged in' });
            }

            let player = WorldListPlayers[index];
            let worldEntry = WorldList.find(x => x.id == player.world);
            if (worldEntry) {
                worldEntry.players.splice(worldEntry.players.findIndex(x => x === safeUsername), 1);
            }

            WorldListPlayers.splice(index, 1);
            fs.writeFileSync(`data/players/${safeUsername}.json`, JSON.stringify(req.body));

            return { success: true };
        } catch (err) {
            console.error(err);
            return res.status(500).send({ errorCode: 0, error: 'Internal server error' });
        }
    });

    // logout without saving
    f.post('/forcelogout', async (req, res) => {
        try {
            if (!req.body || !req.body.username) {
                return res.status(400).send({ errorCode: 1, error: 'Missing fields' });
            }

            const { username } = req.body;
            let safeUsername = username.toLowerCase();

            // temporarily disabled
            // if (!fs.existsSync(`data/players/${safeUsername}.json`)) {
            //     return res.status(400).send({ errorCode: 2, error: 'Invalid username' });
            // }

            let index = WorldListPlayers.findIndex(x => x.username === safeUsername);
            if (index === -1) {
                return res.status(400).send({ errorCode: 3, error: 'User not logged in' });
            }

            let player = WorldListPlayers[index];
            let worldEntry = WorldList.find(x => x.id == player.world);
            if (worldEntry) {
                worldEntry.players.splice(worldEntry.players.findIndex(x => x === safeUsername), 1);
            }

            WorldListPlayers.splice(index, 1);

            return res.status(200).send({ success: true });
        } catch (err) {
            console.error(err);
            return res.status(500).send({ errorCode: 0, error: 'Internal server error' });
        }
    });

    f.post('/find', async (req, res) => {
        try {
            if (!req.body || !req.body.usernames) {
                return res.status(400).send({ errorCode: 1, error: 'Missing fields' });
            }

            const { usernames } = req.body;

            let result = [];
            for (let i = 0; i < usernames.length; ++i) {
                let safeUsername = usernames[i].toLowerCase();

                let player = WorldListPlayers.find(x => x.username === safeUsername);
                if (player) {
                    result.push(player.world);
                } else {
                    result.push(null);
                }
            }

            return result;
        } catch (err) {
            console.error(err);
            return res.status(500).send({ errorCode: 0, error: 'Internal server error' });
        }
    });

    f.post('/message', async (req, res) => {
        // const { from, to, message } = req.body;

        // let safeUsernameFrom = from.toLowerCase();
        // let safeUsernameTo = to.toLowerCase();

        // if (!fs.existsSync(`data/players/${safeUsernameFrom}.json`) || !fs.existsSync(`data/players/${safeUsernameTo}.json`)) {
        //     return res.status(400).send({ errorCode: 2, error: 'Invalid username' });
        // }

        // let fromPlayer = WorldListPlayers.find(x => x.username === safeUsernameFrom);
        // let toPlayer = WorldListPlayers.find(x => x.username === safeUsernameTo);

        // if (!fromPlayer || !toPlayer) {
        //     return res.status(400).send({ errorCode: 3, error: 'User not logged in' });
        // }

        // let world = WorldList[toPlayer.world];
        // await axios.post(``, req.body);
    });

    // for world to ask master if it's ready to receive messages
    f.get('/masterready', async (req, res) => {
        return true;
    });

    // master -> world

    // receive message from master
    f.post('/recvmsg', async (req, res) => {
    });

    // subscribe to logged in/logged out notifications for a user
    f.post('/subscribe', async (req, res) => {
    });

    // unsubscribe from logged in/logged out notifications for a user
    f.post('/unsubscribe', async (req, res) => {
    });

    // check online users list
    f.post('/online', async (req, res) => {
        World.receiveMessage(req.body.from, req.body.to, req.body.message);
    });

    // for master to tell world it's ready to receive messages
    f.get('/worldready', async (req, res) => {
        World.loginReady = true;
        return true;
    });

    next();
}
