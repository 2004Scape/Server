export default class DirectionFlag {
    static readonly NORTH: number = 0x1;
    static readonly EAST: number = 0x2;
    static readonly SOUTH: number = 0x4;
    static readonly WEST: number = 0x8;

    static readonly SOUTH_WEST: number = DirectionFlag.WEST | DirectionFlag.SOUTH;
    static readonly NORTH_WEST: number = DirectionFlag.WEST | DirectionFlag.NORTH;
    static readonly SOUTH_EAST: number = DirectionFlag.EAST | DirectionFlag.SOUTH;
    static readonly NORTH_EAST: number = DirectionFlag.EAST | DirectionFlag.NORTH;
}
