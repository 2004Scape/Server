import fs from 'fs';

import LoginServer from '#lostcity/server/LoginServer.js';

fs.mkdirSync('data/players', { recursive: true });

const login = new LoginServer();
login.start();
