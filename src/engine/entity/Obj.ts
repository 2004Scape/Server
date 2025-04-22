import { EntityLifeCycle } from '#/engine/entity/EntityLifeCycle.js';
import NonPathingEntity from '#/engine/entity/NonPathingEntity.js';
import World from '#/engine/World.js';

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

    turn() {
        if (this.reveal > -1 && --this.reveal === 0) {
            World.revealObj(this);
        }

        // Decrement lifecycle tick
        --this.lifecycleTick;

        if (this.lifecycleTick === 0) {
            if (this.lifecycle === EntityLifeCycle.DESPAWN && this.isActive) {
                World.removeObj(this, 0);
            } else if (this.lifecycle === EntityLifeCycle.RESPAWN && !this.isActive) {
                World.addObj(this, Obj.NO_RECEIVER, 0);
            } else {
                // Fail safe in case no conditions are met (should never happen)
                this.setLifeCycle(-1);
                console.error('Obj is tracked but has no event');
            }
        } else if (this.lifecycleTick < 0) {
            // Fail safe in case this is tracked but isn't supposed to be
            this.setLifeCycle(-1);
            console.error('Obj is tracked but has a negative lifecycle tick');
        }
    }

    isValid(hash64?: bigint): boolean {
        if (this.reveal > -1 && hash64 && hash64 !== this.receiver64) {
            return false;
        }

        if (this.count < 1) {
            return false;
        }

        return super.isValid();
    }
}
