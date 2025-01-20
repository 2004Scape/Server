import NonPathingEntity from '#/engine/entity/NonPathingEntity.js';
import EntityLifeCycle from '#/engine/entity/EntityLifeCycle.js';

export default class Obj extends NonPathingEntity {
    /**
     * The number of ticks for an obj to reveal.
     */
    static readonly REVEAL: number = 100;
    static readonly NO_RECEIVER: bigint = -1n;

    // constructor properties
    type: number;
    count: number;

    // runtime
    receiver64: bigint = Obj.NO_RECEIVER;
    reveal: number = -1;
    lastChange: number = -1;

    constructor(level: number, x: number, z: number, lifecycle: EntityLifeCycle, type: number, count: number) {
        super(level, x, z, 1, 1, lifecycle);
        this.type = type;
        this.count = count;
    }
}
