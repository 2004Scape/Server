import BaseScript from '#scripts/BaseScript.js';
import ScriptManager from '#scripts/ScriptManager.js';

class TeleportScript extends BaseScript {
    *run(player) {
        player.clearWalkingQueue();
        player.resetInteraction();

        this.anim('human_castteleport');
        player.playGraphic('teleport_casting', 100);
        this.sound_synth('teleport_all');
        yield this.p_delay(2);

        player.teleport(this.params.x, this.params.z, this.params.plane);
    }
}

class VarrockTeleport extends BaseScript {
    *run(player) {
        this.if_close();
        this.strongqueue(TeleportScript, { x: 3212, z: 3424, plane: 0 });
    }
}

ScriptManager.register('IF_BUTTON', { buttonId: 1164 }, VarrockTeleport);

class LumbridgeTeleport extends BaseScript {
    *run(player) {
        this.if_close();
        this.strongqueue(TeleportScript, { x: 3222, z: 3219, plane: 0 });
    }
}

ScriptManager.register('IF_BUTTON', { buttonId: 1167 }, LumbridgeTeleport);

class FaladorTeleport extends BaseScript {
    *run(player) {
        this.if_close();
        this.strongqueue(TeleportScript, { x: 2964, z: 3379, plane: 0 });
    }
}

ScriptManager.register('IF_BUTTON', { buttonId: 1170 }, FaladorTeleport);

class CamelotTeleport extends BaseScript {
    *run(player) {
        this.if_close();
        this.strongqueue(TeleportScript, { x: 2757, z: 3478, plane: 0 });
    }
}

ScriptManager.register('IF_BUTTON', { buttonId: 1174 }, CamelotTeleport);

class ArdougneTeleport extends BaseScript {
    *run(player) {
        this.if_close();
        this.strongqueue(TeleportScript, { x: 2662, z: 3306, plane: 0 });
    }
}

ScriptManager.register('IF_BUTTON', { buttonId: 1540 }, ArdougneTeleport);

class WatchtowerTeleport extends BaseScript {
    *run(player) {
        this.if_close();
        this.strongqueue(TeleportScript, { x: 2549, z: 3114, plane: 2 });
    }
}

ScriptManager.register('IF_BUTTON', { buttonId: 1541 }, WatchtowerTeleport);
