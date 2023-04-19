import ScriptManager from '#engine/ScriptManager.js';
import BaseScript from '#engine/Script.js';

class OpHeld5 extends BaseScript {
    *run(player) {
        const { itemId, slot, interfaceId } = this.params;

        if (interfaceId == 3214) {
            // drop item
            player.dropItem(slot, itemId);
        }
    }
}

ScriptManager.register('OPHELD5', { }, OpHeld5);
