import Entity from '#lostcity/entity/Entity.js';

export default class Loc extends Entity {
    // constructor properties
    type: number;
    shape: number;
    rotation: number;

    // runtime variables
    despawn: number = -1;
    respawn: number = -1;

    constructor(level: number, x: number, z: number, width: number, length: number, type: number, shape: number, rotation: number) {
        super(level, x, z, width, length);
        this.type = type;
        this.shape = shape;
        this.rotation = rotation;
    }
}
