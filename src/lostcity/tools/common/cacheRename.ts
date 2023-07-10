import fs from 'fs';

import { fromBase37 } from '#jagex2/jstring/JString.js';

let args = process.argv.slice(2);

if (args.length < 1) {
    console.log('Usage: node renameCache.js <path>');
    process.exit(1);
}

fs.readdirSync(args[0]).forEach(f => {
    fs.renameSync(`${args[0]}/${f}`, `${args[0]}/${fromBase37(f)}`);
});
