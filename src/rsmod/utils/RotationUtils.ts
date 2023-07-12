export default class RotationUtils {
    static rotate(locRot: number, dimensionA: number, dimensionB: number) {
        return (locRot & 0x1) != 0 ? dimensionB : dimensionA;
    }

    static rotateFlags(locRot: number, blockAccessFlags: number) {
        return locRot == 0 ? blockAccessFlags : ((blockAccessFlags << locRot) & 0xF) | (blockAccessFlags >> (4 - locRot));
    }
}
