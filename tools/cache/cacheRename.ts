import fs from 'fs';

import { fromBase37 } from '#/util/JString.js';
import { printFatalError } from '#/util/Logger.js';

const args = process.argv.slice(2);

if (args.length < 1) {
    printFatalError('Usage: node cacheRename.js <path>');
}

fs.readdirSync(args[0]).forEach(f => {
    try {
        const fBig = BigInt(f);
        const fName = fromBase37(fBig);

        if (fName === 'invalid_name') {
            return;
        }

        fs.renameSync(args[0] + '/' + f, args[0] + '/' + fName);
    } catch (err) {
        // empty
        console.log(f, err);
    }
});
