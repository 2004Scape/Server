import Entity from '#lostcity/entity/Entity.js';

export default abstract class PathingEntity extends Entity {
    // movement
    walkDir = -1;
    walkStep = -1;
    walkQueue: { x: number, z: number }[] = [];
}
