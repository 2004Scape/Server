export default class RotationUtils {
    static rotate(rotation: number, dimensionA: number, dimensionB: number) {
        return (rotation & 0x1) != 0 ? dimensionB : dimensionA;
    }

    static rotateFlags(rotation: number, blockAccessFlags: number) {
        return rotation == 0 ? blockAccessFlags : ((blockAccessFlags << rotation) & 0xF) | (blockAccessFlags >> (4 - rotation));
    }
}
