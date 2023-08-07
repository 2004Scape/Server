import CollisionFlag from "#rsmod/flag/CollisionFlag.js";

export default class CollisionFlagMap {
    // 256x256 mapsquares (room for instances): 2048 * 2048 * 4 = ((256 * 256) * 64) * 4
    // 60x160 mapsquares (we don't support instances): ((60 * 160) * 64) * 4
    private static TOTAL_ZONE_COUNT: number = ((60 * 160) * 64) * 4;
    private static ZONE_TILE_COUNT: number = 8 * 8;

    private static tileIndex(x: number, z: number): number {
        return (x & 0x7) | ((z & 0x7) << 3);
    }

    private static zoneIndex(x: number, z: number, level: number): number {
        return ((x >> 3) & 0x7FF) | (((z >> 3) & 0x7FF) << 11) | ((level & 0x3) << 22);
    }

    flags: Array<Int32Array | null> = new Array<Int32Array>(CollisionFlagMap.TOTAL_ZONE_COUNT);

    get(absoluteX: number, absoluteZ: number, level: number): number {
        const zoneIndex = CollisionFlagMap.zoneIndex(absoluteX, absoluteZ, level);
        const tileIndex = CollisionFlagMap.tileIndex(absoluteX, absoluteZ);
        return this.flags?.[zoneIndex]?.[tileIndex] ?? CollisionFlag.NULL;
    }

    set(absoluteX: number, absoluteZ: number, level: number, mask: number): void {
        const zoneIndex = CollisionFlagMap.zoneIndex(absoluteX, absoluteZ, level);
        const tileIndex = CollisionFlagMap.tileIndex(absoluteX, absoluteZ);
        const tiles = this.flags[zoneIndex] ?? this.allocateIfAbsent(absoluteX, absoluteZ, level);
        tiles[tileIndex] = mask;
    }

    add(absoluteX: number, absoluteZ: number, level: number, mask: number): void {
        const zoneIndex = CollisionFlagMap.zoneIndex(absoluteX, absoluteZ, level);
        const tileIndex = CollisionFlagMap.tileIndex(absoluteX, absoluteZ);
        const currentFlags = this.flags?.[zoneIndex]?.[tileIndex] ?? CollisionFlag.OPEN;
        this.set(absoluteX, absoluteZ, level, currentFlags | mask);
    }

    remove(absoluteX: number, absoluteZ: number, level: number, mask: number): void {
        const zoneIndex = CollisionFlagMap.zoneIndex(absoluteX, absoluteZ, level);
        const tileIndex = CollisionFlagMap.tileIndex(absoluteX, absoluteZ);
        const currentFlags = this.flags?.[zoneIndex]?.[tileIndex] ?? CollisionFlag.OPEN
        this.set(absoluteX, absoluteZ, level, currentFlags & ~mask);
    }

    allocateIfAbsent(absoluteX: number, absoluteZ: number, level: number): Int32Array {
        const zoneIndex = CollisionFlagMap.zoneIndex(absoluteX, absoluteZ, level);
        const existingFlags = this.flags[zoneIndex];
        if (existingFlags != null) {
            return existingFlags;
        }

        const tileFlags = new Int32Array(CollisionFlagMap.ZONE_TILE_COUNT);
        this.flags[zoneIndex] = tileFlags;
        return tileFlags;
    }

    deallocateIfPresent(absoluteX: number, absoluteZ: number, level: number): void {
        const zoneIndex = CollisionFlagMap.zoneIndex(absoluteX, absoluteZ, level);
        this.flags[zoneIndex] = null;
    }

    isZoneAllocated(absoluteX: number, absoluteZ: number, level: number): boolean {
        const zoneIndex = CollisionFlagMap.zoneIndex(absoluteX, absoluteZ, level);
        return this.flags[zoneIndex] != null;
    }

    isFlagged(x: number, z: number, level: number, flags: number): boolean {
        return (this.get(x, z, level) & flags) != CollisionFlag.OPEN;
    }
}
