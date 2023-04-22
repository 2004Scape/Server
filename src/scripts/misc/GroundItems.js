import ScriptManager from '#engine/ScriptManager.js';
import BaseScript from '#engine/Script.js';
import World from '#engine/World.js';
import { Player } from '#engine/Player.js';
import { Position } from '#util/Position.js';

// drop
class OpHeld5 extends BaseScript {
    *run(player) {
        const { itemId, slot, interfaceId } = this.params;

        if (interfaceId == 3214) {
            player.dropItem(slot, itemId);
        }
    }
}

ScriptManager.register('OPHELD5', { }, OpHeld5);

// pick up
class OpObj3 extends BaseScript {
    *run(player) {
        const { objId, x, z } = this.params;

        let zone = World.getZone(Position.zone(x), Position.zone(z), player.plane);
        let obj = zone.getObj(x, z, objId);
        zone.removeObj(x, z, objId, obj.count);

        this.inv_add(player.inv, this.params.objId, obj.count);
    }
}

ScriptManager.register('OPOBJ3', { }, OpObj3);
