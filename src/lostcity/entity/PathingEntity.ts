export default abstract class PathingEntity {
    // position
    level: number = -1;
    x: number = -1;
    z: number = -1;

    // movement
    walkDir = -1;
    walkStep = -1;
    walkQueue: { x: number, z: number }[] = [];
}
