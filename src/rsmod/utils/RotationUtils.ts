export default class RotationUtils {
    static rotate(angle: number, dimensionA: number, dimensionB: number): number {
        return (angle & 0x1) != 0 ? dimensionB : dimensionA;
    }

    static rotateFlags(angle: number, blockAccessFlags: number): number {
        return angle == 0 ? blockAccessFlags : ((blockAccessFlags << angle) & 0xF) | (blockAccessFlags >> (4 - angle));
    }
}
