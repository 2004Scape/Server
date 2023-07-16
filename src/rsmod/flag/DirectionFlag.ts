export default class DirectionFlag {
    static NORTH: number = 0x1;
    static EAST: number = 0x2;
    static SOUTH: number = 0x4;
    static WEST: number = 0x8;

    static SOUTH_WEST: number = DirectionFlag.WEST | DirectionFlag.SOUTH;
    static NORTH_WEST: number = DirectionFlag.WEST | DirectionFlag.NORTH;
    static SOUTH_EAST: number = DirectionFlag.EAST | DirectionFlag.SOUTH;
    static NORTH_EAST: number = DirectionFlag.EAST | DirectionFlag.NORTH;
}