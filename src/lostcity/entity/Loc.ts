import NonPathingEntity from '#lostcity/entity/NonPathingEntity.js';

export default class Loc extends NonPathingEntity {
    // constructor properties
    type: number;
    shape: number;
    rotation: number;

    constructor(level: number, x: number, z: number, width: number, length: number, type: number, shape: number, rotation: number) {
        super(level, x, z, width, length);
        this.type = type;
        this.shape = shape;
        this.rotation = rotation;
    }
}
