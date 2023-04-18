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

export const Position = {
    region: (pos) => pos >> 3,
    zone: (pos) => Position.region(pos) - 6,
    zoneOrigin: (pos) => Position.zone(pos) << 3,
    file: (pos) => pos >> 6,
    local: (pos) => pos - (Position.zone(pos) << 3),
    localOrigin: (pos) => pos - (Position.file(pos) << 6),

    face: (srcX, srcZ, dstX, dstZ) => {
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

    moveX: (pos, dir) => {
        if (dir == Direction.EAST || dir == Direction.SOUTH_EAST || dir == Direction.NORTH_EAST) {
            return pos + 1;
        } else if (dir == Direction.WEST || dir == Direction.SOUTH_WEST || dir == Direction.NORTH_WEST) {
            return pos - 1;
        }
        return pos;
    },

    moveZ: (pos, dir) => {
        if (dir == Direction.NORTH || dir == Direction.NORTH_WEST || dir == Direction.NORTH_EAST) {
            return pos + 1;
        } else if (dir == Direction.SOUTH || dir == Direction.SOUTH_WEST || dir == Direction.SOUTH_EAST) {
            return pos - 1;
        }
        return pos;
    }
};
