import Entity from '#/engine/entity/Entity.js';
import World from '#/engine/World.js';
export default abstract class NonPathingEntity extends Entity {
    resetEntity(_respawn: boolean) {
        // nothing happens here
    }

    setLifeCycle(tick: number): void {
        // In OSRS I suspect they use a counter per Loc/Obj to keep track of events rather than scheduling for a tick
        // In 2004scape, we schedule for a tick. Scheduling for a tick ends up naturally 1 tick slower, so we do a -1 to compensate to match OSRS behavior
        // - Bea5
        this.lifecycleTick = tick - 1;
        this.lastLifecycleTick = World.currentTick;
    }
}
