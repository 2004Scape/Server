export default abstract class Entity {
    // position
    level: number = -1;
    x: number = -1;
    z: number = -1;

    width = 1;
    length = 1;

    constructor(level: number, x: number, z: number, width: number, length: number) {
        this.level = level;
        this.x = x;
        this.z = z;
        this.width = width;
        this.length = length;
    }
}
