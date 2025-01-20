export default class Trig {
    private static readonly _sin: Int32Array = new Int32Array(16384);
    private static readonly _cos: Int32Array = new Int32Array(16384);

    static {
        const size: number = 3.834951969714103E-4;
        for (let index: number = 0; index < 16384; index++) {
            this._sin[index] = (Math.sin(index * size) * 16384.0) | 0;
            this._cos[index] = (Math.cos(index * size) * 16384.0) | 0;
        }
    }

    static radians(x: number): number {
        return ((x & 0x3FFF) / 16384.0) * 6.283185307179586;
    }

    static atan2(y: number, x: number): number {
        return (Math.round(Math.atan2(y, x) * 2607.5945876176133) & 0x3FFF) | 0;
    }

    static sin(x: number): number {
        return this._sin[x & 0x3fff];
    }

    static cos(x: number): number {
        return this._cos[x & 0x3fff];
    }
}