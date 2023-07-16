import CollisionFlagMap from "#rsmod/collision/CollisionFlagMap.js";
import CollisionFlag from "#rsmod/flag/CollisionFlag.js";

export default class FloorCollider {
    private readonly flags: CollisionFlagMap;

    constructor(flags: CollisionFlagMap) {
        this.flags = flags;
    }

    change(
        x: number,
        z: number,
        level: number,
        width: number,
        length: number,
        blockproj: boolean,
        add: boolean
    ): void {
        let mask = CollisionFlag.LOC;
        if (blockproj) {
            mask = mask | CollisionFlag.LOC_PROJ_BLOCKER;
        }
        for (let index = 0; index < width * length; index++) {
            const deltaX = x + (index % width);
            const deltaZ = z + (index / width);
            if (add) {
                this.flags.add(deltaX, deltaZ, level, mask);
            } else {
                this.flags.remove(deltaX, deltaZ, level, mask);
            }
        }
    }
}