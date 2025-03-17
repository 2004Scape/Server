import crypto from 'crypto';
import fs from 'fs';

import axios from 'axios';

import ScriptProvider from '#/engine/script/ScriptProvider.js';
import { printDebug, printWarning } from '#/util/Logger.js';

export async function updateCompiler(): Promise<boolean> {
    printDebug('Checking for compiler update');

    let needsUpdate = false;

    try {
        if (!fs.existsSync('RuneScriptCompiler.jar')) {
            needsUpdate = true;
        } else {
            const sha256 = crypto.createHash('sha256');
            sha256.update(fs.readFileSync('RuneScriptCompiler.jar'));
            const shasum = sha256.digest('hex');

            const req = await axios.get('https://github.com/LostCityRS/RuneScriptKt/releases/download/' + ScriptProvider.COMPILER_VERSION + '/RuneScriptCompiler.jar.sha256');
            const expected = req.data.substring(0, 64);

            if (shasum != expected) {
                needsUpdate = true;
            }
        }

        if (needsUpdate) {
            printDebug('Updating compiler');

            const req = await axios.get('https://github.com/LostCityRS/RuneScriptKt/releases/download/' + ScriptProvider.COMPILER_VERSION + '/RuneScriptCompiler.jar', {
                responseType: 'arraybuffer'
            });

            fs.writeFileSync('RuneScriptCompiler.jar', req.data);
        }
    } catch (err) {
        console.warn(err);
        printWarning('Unable to check for compiler update');
        return false;
    }

    printDebug('Compiler is up to date');
    return true;
}
