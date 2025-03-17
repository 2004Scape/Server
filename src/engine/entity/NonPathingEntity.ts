import Entity from '#/engine/entity/Entity.js';
export default abstract class NonPathingEntity extends Entity {
    resetEntity(_respawn: boolean) {
        // nothing happens here
    }
}
