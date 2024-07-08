import { packClient, packServer } from '#lostcity/cache/packall.js';

import Environment from '#lostcity/util/Environment.js';
import { updateCompiler } from '#lostcity/util/RuneScriptCompiler.js';

if (Environment.BUILD_STARTUP_UPDATE) {
    await updateCompiler();
}

await packServer();
await packClient();
