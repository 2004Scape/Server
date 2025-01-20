import fs from 'fs';

import LoginServer from '#/server/login/LoginServer.js';

fs.mkdirSync('data/players', { recursive: true });

new LoginServer();
