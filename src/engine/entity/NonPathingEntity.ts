import Entity from '#/engine/entity/Entity.js';

import LocObjEvent from './LocObjEvent.js';
export default abstract class NonPathingEntity extends Entity {
    eventTracker: LocObjEvent | null = null;

    abstract turn(): void;

    untrack() {
        if (this.eventTracker) {
            this.eventTracker.unlink();
            this.eventTracker = null;
        }
    }

    track(event: LocObjEvent) {
        this.untrack();
        this.eventTracker = event;
    }

    resetEntity(_respawn: boolean) {
        // nothing happens here
    }
}
