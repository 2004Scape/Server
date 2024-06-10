import { packClient, packServer } from '#lostcity/cache/packall.js';

import Environment from '#lostcity/util/Environment.js';
import { updateCompiler } from '#lostcity/util/RuneScriptCompiler.js';

if (Environment.UPDATE_ON_STARTUP) {
    await updateCompiler();
}

await packServer();
await packClient();
