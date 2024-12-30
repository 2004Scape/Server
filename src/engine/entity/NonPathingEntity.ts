import Entity from '#/engine/entity/Entity.js';

export default abstract class NonPathingEntity extends Entity {
    resetEntity(respawn: boolean) {
        // nothing happens here
    }
}
