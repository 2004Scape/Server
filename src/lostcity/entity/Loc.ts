import Entity from '#lostcity/entity/Entity.js';

export default class Loc extends Entity {
    type = -1;
    shape = 10;
    rotation = 0;

    despawn = -1;
    respawn = -1;

    constructor(level: number, x: number, z: number, width: number, length: number, type: number, shape: number, rotation: number) {
        super(level, x, z, width, length);
        this.type = type;
        this.shape = shape;
        this.rotation = rotation;
    }
}
