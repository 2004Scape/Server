import { } from 'dotenv/config';

import { startWeb } from './web/app.js';
import { loadCrcTable } from '#util/GlobalCache.js';

loadCrcTable();
startWeb();
