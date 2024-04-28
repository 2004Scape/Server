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

    static clone(obj: Obj) {
        return new Obj(obj.level, obj.x, obj.z, obj.type, obj.count);
    }

    get id() {
        return this.type;
    }

    equals(obj: Obj) {
        return (
            this.level === obj.level
            && this.x === obj.x 
            && this.z === obj.z 
            && this.type === obj.type 
            && this.count === obj.count
        );
    }
}
