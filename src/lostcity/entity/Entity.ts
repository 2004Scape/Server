export default abstract class Entity {
    // position
    level: number;
    x: number;
    z: number;

    // size
    width: number;
    length: number;

    constructor(level: number, x: number, z: number, width: number, length: number) {
        this.level = level;
        this.x = x;
        this.z = z;
        this.width = width;
        this.length = length;
    }
}
