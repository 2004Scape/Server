import Entity from '#/engine/entity/Entity.js';
import World from '#/engine/World.js';

import LocObjEvent from './LocObjEvent.js';

export default abstract class NonPathingEntity extends Entity {
    eventTracker: LocObjEvent | null = null;

    abstract turn(): void;

    setLifeCycle(duration: number): void {
        // Clear previous event tracking
        if (this.eventTracker) {
            this.eventTracker.unlink();
            this.eventTracker = null;
        }
        // Track the event for positive durations
        if (duration > 0) {
            const event = new LocObjEvent(this);
            World.locObjTracker.addTail(event);
            super.setLifeCycle(duration);
        } else {
            super.setLifeCycle(-1);
        }
    }

    resetEntity(_respawn: boolean) {
        // nothing happens here
    }
}
