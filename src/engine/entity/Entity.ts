import EntityLifeCycle from '#/engine/entity/EntityLifeCycle.js';
import World from '#/engine/World.js';
import Linkable from '#/util/Linkable.js';

export default abstract class Entity extends Linkable {
    // constructor
    level: number;
    x: number;
    z: number;
    isActive: boolean;
    readonly width: number;
    readonly length: number;
    readonly lifecycle: EntityLifeCycle;

    // runtime
    lifecycleTick: number = -1;
    lastLifecycleTick: number = -1;

    protected constructor(level: number, x: number, z: number, width: number, length: number, lifecycle: EntityLifeCycle) {
        super();
        this.level = level;
        this.x = x;
        this.z = z;
        this.width = width;
        this.length = length;
        this.lifecycle = lifecycle;
        this.isActive = false;
    }

    abstract resetEntity(respawn: boolean): void;

    isValid(_hash64?: bigint): boolean {
        return this.isActive;
    }

    updateLifeCycle(tick: number): boolean {
        return this.lifecycleTick === tick && this.lifecycle !== EntityLifeCycle.FOREVER;
    }

    setLifeCycle(tick: number): void {
        this.lifecycleTick = tick;
        this.lastLifecycleTick = World.currentTick;
    }
}
