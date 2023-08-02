import CollisionFlagMap from '#rsmod/collision/CollisionFlagMap.js';
import CollisionFlag from '#rsmod/flag/CollisionFlag.js';

export default class EntityCollider {
    private readonly flags: CollisionFlagMap;

    constructor(flags: CollisionFlagMap) {
        this.flags = flags;
    }

    change(
        x: number,
        z: number,
        level: number,
        add: boolean
    ): void {
        if (add) {
            this.flags.add(x, z, level, CollisionFlag.BLOCK_NPC);
        } else {
            this.flags.remove(x, z, level, CollisionFlag.BLOCK_NPC);
        }
    }
}
