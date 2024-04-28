import World from '#lostcity/engine/World.js';
import ScriptProvider from '#lostcity/engine/script/ScriptProvider.js';
import ScriptRunner from '#lostcity/engine/script/ScriptRunner.js';
import { PlayerLoading } from '#lostcity/entity/PlayerLoading.js';

import Environment from '#lostcity/util/Environment.js';

Environment.CLIRUNNER = true;

const args = process.argv.slice(2);

await World.start(false);

const script = ScriptProvider.getByName(`[debugproc,${args[0]}]`);
if (!script) {
    console.error(`Script [debugproc,${args[0]}] not found`);
    process.exit(1);
}

const self = PlayerLoading.loadFromFile('clirunner');
World.addPlayer(self);
await World.cycle(false);

const state = ScriptRunner.init(script, self);
ScriptRunner.execute(state);

process.exit(0);
