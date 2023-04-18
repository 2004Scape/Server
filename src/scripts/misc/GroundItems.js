import ScriptManager from '#scripts/ScriptManager.js';
import BaseScript from '#scripts/BaseScript.js';

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
