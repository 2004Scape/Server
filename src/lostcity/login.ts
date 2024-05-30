import fs from 'fs';

import { LoginServer } from '#lostcity/server/LoginServer.js';

if (!fs.existsSync('data/config/login.json')) {
    console.error('Missing login.json configuration');
    process.exit(1);
}

fs.mkdirSync('data/players', { recursive: true });

const login = new LoginServer();
login.start();
