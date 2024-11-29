import { packClient, packServer } from '#lostcity/pack/packall.js';

import Environment from '#lostcity/util/Environment.js';
import { updateCompiler } from '#lostcity/util/RuneScriptCompiler.js';

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
