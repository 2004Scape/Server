import NonPathingEntity from '#lostcity/entity/NonPathingEntity.js';

export default class Obj extends NonPathingEntity {
    // constructor properties
    type: number;
    count: number;

    constructor(level: number, x: number, z: number, type: number, count: number) {
        super(level, x, z, 1, 1);
        this.type = type;
        this.count = count;
    }

    get id() {
        return this.type;
    }
}
