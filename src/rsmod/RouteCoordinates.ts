export default class RouteCoordinates {
    private static readonly COORD_MASK: number = 0x3FFF;
    private static readonly LEVEL_MASK: number = 0x3;
    private static readonly X_BITS: number = 14;
    private static readonly LEVEL_BITS: number = 28;

    private readonly packed: number;

    constructor(
        x: number,
        z: number,
        level: number
    ) {
        this.packed = (z & RouteCoordinates.COORD_MASK) |
            ((x & RouteCoordinates.COORD_MASK) << RouteCoordinates.X_BITS) |
            ((level & RouteCoordinates.LEVEL_MASK) << RouteCoordinates.LEVEL_BITS);
    }

    get x(): number {
        return (this.packed >> RouteCoordinates.X_BITS) & RouteCoordinates.COORD_MASK;
    }

    get z(): number {
        return this.packed & RouteCoordinates.COORD_MASK;
    }

    get level(): number {
        return (this.packed >> RouteCoordinates.LEVEL_BITS) & RouteCoordinates.LEVEL_MASK;
    }

    translate(offsetX: number, offsetZ: number, offsetLevel: number): RouteCoordinates {
        return new RouteCoordinates(this.x + offsetX, this.z + offsetZ, this.level + offsetLevel);
    }
}
