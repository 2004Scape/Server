export const Direction = {
    NORTH_WEST: 0,
    NORTH: 1,
    NORTH_EAST: 2,
    WEST: 3,
    EAST: 4,
    SOUTH_WEST: 5,
    SOUTH: 6,
    SOUTH_EAST: 7,
};
// TODO (jkm) consider making this an enum
type Direction = typeof Direction[keyof typeof Direction];

// TODO (jkm) consider making this a class
export const Position: any = {
    zone: (pos: number) => pos >> 3,
    zoneCenter: (pos: number) => Position.zone(pos) - 6,
    zoneOrigin: (pos: number) => Position.zoneCenter(pos) << 3,
    mapsquare: (pos: number) => pos >> 6,
    local: (pos: number) => pos - (Position.zoneCenter(pos) << 3),
    localOrigin: (pos: number) => pos - (Position.mapsquare(pos) << 6),
    zoneUpdate: (pos: number) => pos - (pos >> 3 << 3),

    face: (srcX: number, srcZ: number, dstX: number, dstZ: number) => {
        if (srcX == dstX) {
            if (srcZ > dstZ) {
                return Direction.SOUTH;
            } else if (srcZ < dstZ) {
                return Direction.NORTH;
            }
        } else if (srcX > dstX) {
            if (srcZ > dstZ) {
                return Direction.SOUTH_WEST;
            } else if (srcZ < dstZ) {
                return Direction.NORTH_WEST;
            } else {
                return Direction.WEST;
            }
        } else {
            if (srcZ > dstZ) {
                return Direction.SOUTH_EAST;
            } else if (srcZ < dstZ) {
                return Direction.NORTH_EAST;
            } else {
                return Direction.EAST;
            }
        }

        return -1;
    },

    moveX: (pos: number, dir: Direction) => {
        return pos + Position.deltaX(dir);
    },

    moveZ: (pos: number, dir: Direction) => {
        return pos + Position.deltaZ(dir);
    },

    distanceTo(pos: { x: number, z: number }, other: { x: number, z: number }) {
        const deltaX = Math.abs(pos.x - other.x);
        const deltaZ = Math.abs(pos.z - other.z);

        return Math.max(deltaX, deltaZ);
    },

    deltaX(dir: Direction): number {
        switch (dir) {
            case Direction.SOUTH_EAST:
            case Direction.NORTH_EAST:
            case Direction.EAST:
                return 1;
            case Direction.SOUTH_WEST:
            case Direction.NORTH_WEST:
            case Direction.WEST:
                return -1;
        }
        return 0;
    },

    deltaZ(dir: Direction): number {
        switch (dir) {
            case Direction.NORTH_WEST:
            case Direction.NORTH_EAST:
            case Direction.NORTH:
                return 1;
            case Direction.SOUTH_WEST:
            case Direction.SOUTH_EAST:
            case Direction.SOUTH:
                return -1;
        }
        return 0;
    }
} as const;