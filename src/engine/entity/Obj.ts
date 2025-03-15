import EntityLifeCycle from '#/engine/entity/EntityLifeCycle.js';
import NonPathingEntity from '#/engine/entity/NonPathingEntity.js';

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
    isRevealed: boolean = false;
    reveal: number = -1;
    lastChange: number = -1;

    constructor(level: number, x: number, z: number, lifecycle: EntityLifeCycle, type: number, count: number) {
        super(level, x, z, 1, 1, lifecycle);
        this.type = type;
        this.count = count;
    }

    isValid(hash64?: bigint): boolean {
        if (!this.isRevealed && hash64 && hash64 !== this.receiver64) {
            return false;
        }

        if (this.count < 1) {
            return false;
        }

        return super.isValid();
    }
}
