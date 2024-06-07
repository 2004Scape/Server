import fs from 'fs';

import { startWeb } from '#lostcity/web/app.js';

fs.mkdirSync('data/players', { recursive: true });

startWeb();
