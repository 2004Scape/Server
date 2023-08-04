import Entity from '#lostcity/entity/Entity.js';

export default class Obj extends Entity {
    // constructor properties
    type: number;
    count: number;

    // runtime variables
    despawn: number = -1;
    respawn: number = -1;

    constructor(level: number, x: number, z: number, type: number, count: number) {
        super(level, x, z, 1, 1);
        this.type = type;
        this.count = count;
    }

    get id() {
        return this.type;
    }
}
