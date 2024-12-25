import { packClient, packServer } from '#/cache/PackAll.js';

import Environment from '#/util/Environment.js';
import { updateCompiler } from '#/util/RuneScriptCompiler.js';

if (Environment.BUILD_STARTUP_UPDATE) {
    await updateCompiler();
}

try {
    await packServer();
    await packClient();
} catch (err) {
    if (err instanceof Error) {
        console.log(err.message);
    }

    process.exit(1);
}
