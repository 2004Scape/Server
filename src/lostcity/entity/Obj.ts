import Entity from '#lostcity/entity/Entity.js';

export default class Obj extends Entity {
    type = -1;
    count = 0;

    despawn = -1;
    respawn = -1;

    constructor(level: number, x: number, z: number, type: number, count: number) {
        super(level, x, z, 1, 1);
        this.type = type;
        this.count = count;
    }

    get id() {
        return this.type;
    }
}
