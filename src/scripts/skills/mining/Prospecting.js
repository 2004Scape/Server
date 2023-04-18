import BaseScript from '#scripts/BaseScript.js';
import ScriptManager from '#scripts/ScriptManager.js';

class ProspectRock extends BaseScript {
    *run(player) {
        const { locId } = this.params;

        this.mes('You examine the rock for ores...');
        yield this.p_delay(3);

        if (locId == 2090) {
            this.mes('This rock contains copper.');
        } else if (locId == 2092) {
            this.mes('This rock contains iron.');
        } else if (locId == 2093) {
            this.mes('This rock contains iron.');
        } else if (locId == 2094) {
            this.mes('This rock contains tin.');
        } else if (locId == 2095) {
            this.mes('This rock contains silver.');
        } else if (locId == 2095) {
            this.mes('This rock contains coal.');
        } else if (locId == 2102) {
            this.mes('This rock contains mithril.');
        } else if (locId == 2105) {
            this.mes('This rock contains adamantite.');
        } else if (locId == 2108) {
            this.mes('This rock contains clay.');
        }
    }
}

ScriptManager.register('OPLOC2', { locId: 2090 }, ProspectRock);
ScriptManager.register('OPLOC2', { locId: 2092 }, ProspectRock);
ScriptManager.register('OPLOC2', { locId: 2093 }, ProspectRock);
ScriptManager.register('OPLOC2', { locId: 2094 }, ProspectRock);
ScriptManager.register('OPLOC2', { locId: 2095 }, ProspectRock);
ScriptManager.register('OPLOC2', { locId: 2097 }, ProspectRock);
ScriptManager.register('OPLOC2', { locId: 2102 }, ProspectRock);
ScriptManager.register('OPLOC2', { locId: 2105 }, ProspectRock);
ScriptManager.register('OPLOC2', { locId: 2108 }, ProspectRock);

class RespondNoOre extends BaseScript {
    *run(player) {
        this.mes('There is currently no ore available in this rock.');
    }
}

ScriptManager.register('OPLOC2', { locId: 452 }, RespondNoOre);
