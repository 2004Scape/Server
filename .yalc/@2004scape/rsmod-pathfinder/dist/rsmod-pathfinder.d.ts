/** Exported memory */
export declare const memory: WebAssembly.Memory;
/**
 * src/index/findPath
 * @param level `i32`
 * @param srcX `i32`
 * @param srcZ `i32`
 * @param destX `i32`
 * @param destZ `i32`
 * @param srcSize `i32`
 * @param destWidth `i32`
 * @param destHeight `i32`
 * @param angle `i32`
 * @param shape `i32`
 * @param moveNear `bool`
 * @param blockAccessFlags `i32`
 * @param maxWaypoints `i32`
 * @param collision `i32`
 * @returns `~lib/staticarray/StaticArray<i32>`
 */
export declare function findPath(level: number, srcX: number, srcZ: number, destX: number, destZ: number, srcSize?: number, destWidth?: number, destHeight?: number, angle?: number, shape?: number, moveNear?: boolean, blockAccessFlags?: number, maxWaypoints?: number, collision?: number): ArrayLike<number>;
/**
 * src/index/findNaivePath
 * @param level `i32`
 * @param srcX `i32`
 * @param srcZ `i32`
 * @param destX `i32`
 * @param destZ `i32`
 * @param srcWidth `i32`
 * @param srcHeight `i32`
 * @param destWidth `i32`
 * @param destHeight `i32`
 * @param blockAccessFlags `i32`
 * @param collision `i32`
 * @returns `~lib/staticarray/StaticArray<i32>`
 */
export declare function findNaivePath(level: number, srcX: number, srcZ: number, destX: number, destZ: number, srcWidth: number, srcHeight: number, destWidth: number, destHeight: number, blockAccessFlags: number, collision?: number): ArrayLike<number>;
/**
 * src/index/changeFloor
 * @param x `i32`
 * @param z `i32`
 * @param level `i32`
 * @param add `bool`
 */
export declare function changeFloor(x: number, z: number, level: number, add: boolean): void;
/**
 * src/index/changeLoc
 * @param x `i32`
 * @param z `i32`
 * @param level `i32`
 * @param width `i32`
 * @param length `i32`
 * @param blockrange `bool`
 * @param breakroutefinding `bool`
 * @param add `bool`
 */
export declare function changeLoc(x: number, z: number, level: number, width: number, length: number, blockrange: boolean, breakroutefinding: boolean, add: boolean): void;
/**
 * src/index/changeNpc
 * @param x `i32`
 * @param z `i32`
 * @param level `i32`
 * @param size `i32`
 * @param add `bool`
 */
export declare function changeNpc(x: number, z: number, level: number, size: number, add: boolean): void;
/**
 * src/index/changePlayer
 * @param x `i32`
 * @param z `i32`
 * @param level `i32`
 * @param size `i32`
 * @param add `bool`
 */
export declare function changePlayer(x: number, z: number, level: number, size: number, add: boolean): void;
/**
 * src/index/changeRoof
 * @param x `i32`
 * @param z `i32`
 * @param level `i32`
 * @param add `bool`
 */
export declare function changeRoof(x: number, z: number, level: number, add: boolean): void;
/**
 * src/index/changeWall
 * @param x `i32`
 * @param z `i32`
 * @param level `i32`
 * @param angle `i32`
 * @param shape `i32`
 * @param blockrange `bool`
 * @param breakroutefinding `bool`
 * @param add `bool`
 */
export declare function changeWall(x: number, z: number, level: number, angle: number, shape: number, blockrange: boolean, breakroutefinding: boolean, add: boolean): void;
/**
 * src/index/allocateIfAbsent
 * @param absoluteX `i32`
 * @param absoluteZ `i32`
 * @param level `i32`
 * @returns `~lib/staticarray/StaticArray<i32>`
 */
export declare function allocateIfAbsent(absoluteX: number, absoluteZ: number, level: number): ArrayLike<number>;
/**
 * src/index/deallocateIfPresent
 * @param absoluteX `i32`
 * @param absoluteZ `i32`
 * @param level `i32`
 */
export declare function deallocateIfPresent(absoluteX: number, absoluteZ: number, level: number): void;
/**
 * src/index/isZoneAllocated
 * @param absoluteX `i32`
 * @param absoluteZ `i32`
 * @param level `i32`
 * @returns `bool`
 */
export declare function isZoneAllocated(absoluteX: number, absoluteZ: number, level: number): boolean;
/**
 * src/index/isFlagged
 * @param x `i32`
 * @param z `i32`
 * @param level `i32`
 * @param masks `i32`
 * @returns `bool`
 */
export declare function isFlagged(x: number, z: number, level: number, masks: number): boolean;
/**
 * src/index/canTravel
 * @param level `i32`
 * @param x `i32`
 * @param z `i32`
 * @param offsetX `i32`
 * @param offsetZ `i32`
 * @param size `i32`
 * @param extraFlag `i32`
 * @param collision `i32`
 * @returns `bool`
 */
export declare function canTravel(level: number, x: number, z: number, offsetX: number, offsetZ: number, size: number, extraFlag: number, collision?: number): boolean;
/**
 * src/index/hasLineOfSight
 * @param level `i32`
 * @param srcX `i32`
 * @param srcZ `i32`
 * @param destX `i32`
 * @param destZ `i32`
 * @param srcSize `i32`
 * @param destWidth `i32`
 * @param destHeight `i32`
 * @param extraFlag `i32`
 * @returns `bool`
 */
export declare function hasLineOfSight(level: number, srcX: number, srcZ: number, destX: number, destZ: number, srcSize?: number, destWidth?: number, destHeight?: number, extraFlag?: number): boolean;
/**
 * src/index/hasLineOfWalk
 * @param level `i32`
 * @param srcX `i32`
 * @param srcZ `i32`
 * @param destX `i32`
 * @param destZ `i32`
 * @param srcSize `i32`
 * @param destWidth `i32`
 * @param destHeight `i32`
 * @param extraFlag `i32`
 * @returns `bool`
 */
export declare function hasLineOfWalk(level: number, srcX: number, srcZ: number, destX: number, destZ: number, srcSize?: number, destWidth?: number, destHeight?: number, extraFlag?: number): boolean;
/**
 * src/index/lineOfSight
 * @param level `i32`
 * @param srcX `i32`
 * @param srcZ `i32`
 * @param destX `i32`
 * @param destZ `i32`
 * @param srcSize `i32`
 * @param destWidth `i32`
 * @param destHeight `i32`
 * @param extraFlag `i32`
 * @returns `~lib/staticarray/StaticArray<i32>`
 */
export declare function lineOfSight(level: number, srcX: number, srcZ: number, destX: number, destZ: number, srcSize?: number, destWidth?: number, destHeight?: number, extraFlag?: number): ArrayLike<number>;
/**
 * src/index/lineOfWalk
 * @param level `i32`
 * @param srcX `i32`
 * @param srcZ `i32`
 * @param destX `i32`
 * @param destZ `i32`
 * @param srcSize `i32`
 * @param destWidth `i32`
 * @param destHeight `i32`
 * @param extraFlag `i32`
 * @returns `~lib/staticarray/StaticArray<i32>`
 */
export declare function lineOfWalk(level: number, srcX: number, srcZ: number, destX: number, destZ: number, srcSize?: number, destWidth?: number, destHeight?: number, extraFlag?: number): ArrayLike<number>;
/**
 * src/index/reached
 * @param level `i32`
 * @param srcX `i32`
 * @param srcZ `i32`
 * @param destX `i32`
 * @param destZ `i32`
 * @param destWidth `i32`
 * @param destHeight `i32`
 * @param srcSize `i32`
 * @param angle `i32`
 * @param shape `i32`
 * @param blockAccessFlags `i32`
 * @returns `bool`
 */
export declare function reached(level: number, srcX: number, srcZ: number, destX: number, destZ: number, destWidth: number, destHeight: number, srcSize: number, angle?: number, shape?: number, blockAccessFlags?: number): boolean;
/**
 * src/index/locShapeLayer
 * @param shape `i32`
 * @returns `i32`
 */
export declare function locShapeLayer(shape: number): number;
/**
 * src/index/__get
 * @param absoluteX `i32`
 * @param absoluteZ `i32`
 * @param level `i32`
 * @returns `i32`
 */
export declare function __get(absoluteX: number, absoluteZ: number, level: number): number;
/**
 * src/index/__set
 * @param absoluteX `i32`
 * @param absoluteZ `i32`
 * @param level `i32`
 * @param mask `i32`
 */
export declare function __set(absoluteX: number, absoluteZ: number, level: number, mask: number): void;
/**
 * src/index/__add
 * @param absoluteX `i32`
 * @param absoluteZ `i32`
 * @param level `i32`
 * @param mask `i32`
 */
export declare function __add(absoluteX: number, absoluteZ: number, level: number, mask: number): void;
/**
 * src/index/__remove
 * @param absoluteX `i32`
 * @param absoluteZ `i32`
 * @param level `i32`
 * @param mask `i32`
 */
export declare function __remove(absoluteX: number, absoluteZ: number, level: number, mask: number): void;
/**
 * src/index/__rotate
 * @param angle `i32`
 * @param dimensionA `i32`
 * @param dimensionB `i32`
 * @returns `i32`
 */
export declare function __rotate(angle: number, dimensionA: number, dimensionB: number): number;
/**
 * src/index/__rotateFlags
 * @param angle `i32`
 * @param blockAccessFlags `i32`
 * @returns `i32`
 */
export declare function __rotateFlags(angle: number, blockAccessFlags: number): number;
/**
 * src/index/__collides
 * @param srcX `i32`
 * @param srcZ `i32`
 * @param destX `i32`
 * @param destZ `i32`
 * @param srcWidth `i32`
 * @param srcHeight `i32`
 * @param destWidth `i32`
 * @param destHeight `i32`
 * @returns `bool`
 */
export declare function __collides(srcX: number, srcZ: number, destX: number, destZ: number, srcWidth: number, srcHeight: number, destWidth: number, destHeight: number): boolean;
/**
 * src/index/__reachRectangle1
 * @param level `i32`
 * @param srcX `i32`
 * @param srcZ `i32`
 * @param destX `i32`
 * @param destZ `i32`
 * @param destWidth `i32`
 * @param destHeight `i32`
 * @param blockAccessFlags `i32`
 * @returns `bool`
 */
export declare function __reachRectangle1(level: number, srcX: number, srcZ: number, destX: number, destZ: number, destWidth: number, destHeight: number, blockAccessFlags: number): boolean;
/**
 * src/index/__reachRectangleN
 * @param level `i32`
 * @param srcX `i32`
 * @param srcZ `i32`
 * @param destX `i32`
 * @param destZ `i32`
 * @param srcWidth `i32`
 * @param srcHeight `i32`
 * @param destWidth `i32`
 * @param destHeight `i32`
 * @param blockAccessFlags `i32`
 * @returns `bool`
 */
export declare function __reachRectangleN(level: number, srcX: number, srcZ: number, destX: number, destZ: number, srcWidth: number, srcHeight: number, destWidth: number, destHeight: number, blockAccessFlags: number): boolean;
/**
 * src/index/__alteredRotation
 * @param angle `i32`
 * @param shape `i32`
 * @returns `i32`
 */
export declare function __alteredRotation(angle: number, shape: number): number;
/**
 * src/index/__reachRectangle
 * @param level `i32`
 * @param srcX `i32`
 * @param srcZ `i32`
 * @param destX `i32`
 * @param destZ `i32`
 * @param srcSize `i32`
 * @param destWidth `i32`
 * @param destHeight `i32`
 * @param angle `i32`
 * @param blockAccessFlags `i32`
 * @returns `bool`
 */
export declare function __reachRectangle(level: number, srcX: number, srcZ: number, destX: number, destZ: number, srcSize: number, destWidth: number, destHeight: number, angle: number, blockAccessFlags: number): boolean;
/**
 * src/index/__reachExclusiveRectangle
 * @param level `i32`
 * @param srcX `i32`
 * @param srcZ `i32`
 * @param destX `i32`
 * @param destZ `i32`
 * @param srcSize `i32`
 * @param destWidth `i32`
 * @param destHeight `i32`
 * @param angle `i32`
 * @param blockAccessFlags `i32`
 * @returns `bool`
 */
export declare function __reachExclusiveRectangle(level: number, srcX: number, srcZ: number, destX: number, destZ: number, srcSize: number, destWidth: number, destHeight: number, angle: number, blockAccessFlags: number): boolean;
/** src/rsmod/flag/CollisionFlag/CollisionFlag */
export declare enum CollisionFlag {
  /** @type `i32` */
  NULL,
  /** @type `i32` */
  OPEN,
  /** @type `i32` */
  WALL_NORTH_WEST,
  /** @type `i32` */
  WALL_NORTH,
  /** @type `i32` */
  WALL_NORTH_EAST,
  /** @type `i32` */
  WALL_EAST,
  /** @type `i32` */
  WALL_SOUTH_EAST,
  /** @type `i32` */
  WALL_SOUTH,
  /** @type `i32` */
  WALL_SOUTH_WEST,
  /** @type `i32` */
  WALL_WEST,
  /** @type `i32` */
  LOC,
  /** @type `i32` */
  WALL_NORTH_WEST_PROJ_BLOCKER,
  /** @type `i32` */
  WALL_NORTH_PROJ_BLOCKER,
  /** @type `i32` */
  WALL_NORTH_EAST_PROJ_BLOCKER,
  /** @type `i32` */
  WALL_EAST_PROJ_BLOCKER,
  /** @type `i32` */
  WALL_SOUTH_EAST_PROJ_BLOCKER,
  /** @type `i32` */
  WALL_SOUTH_PROJ_BLOCKER,
  /** @type `i32` */
  WALL_SOUTH_WEST_PROJ_BLOCKER,
  /** @type `i32` */
  WALL_WEST_PROJ_BLOCKER,
  /** @type `i32` */
  LOC_PROJ_BLOCKER,
  /** @type `i32` */
  FLOOR_DECORATION,
  /** @type `i32` */
  NPC,
  /** @type `i32` */
  PLAYER,
  /** @type `i32` */
  FLOOR,
  /** @type `i32` */
  WALL_NORTH_WEST_ROUTE_BLOCKER,
  /** @type `i32` */
  WALL_NORTH_ROUTE_BLOCKER,
  /** @type `i32` */
  WALL_NORTH_EAST_ROUTE_BLOCKER,
  /** @type `i32` */
  WALL_EAST_ROUTE_BLOCKER,
  /** @type `i32` */
  WALL_SOUTH_EAST_ROUTE_BLOCKER,
  /** @type `i32` */
  WALL_SOUTH_ROUTE_BLOCKER,
  /** @type `i32` */
  WALL_SOUTH_WEST_ROUTE_BLOCKER,
  /** @type `i32` */
  WALL_WEST_ROUTE_BLOCKER,
  /** @type `i32` */
  LOC_ROUTE_BLOCKER,
  /** @type `i32` */
  ROOF,
  /** @type `i32` */
  FLOOR_BLOCKED,
  /** @type `i32` */
  WALK_BLOCKED,
  /** @type `i32` */
  BLOCK_WEST,
  /** @type `i32` */
  BLOCK_EAST,
  /** @type `i32` */
  BLOCK_SOUTH,
  /** @type `i32` */
  BLOCK_NORTH,
  /** @type `i32` */
  BLOCK_SOUTH_WEST,
  /** @type `i32` */
  BLOCK_SOUTH_EAST,
  /** @type `i32` */
  BLOCK_NORTH_WEST,
  /** @type `i32` */
  BLOCK_NORTH_EAST,
  /** @type `i32` */
  BLOCK_NORTH_AND_SOUTH_EAST,
  /** @type `i32` */
  BLOCK_NORTH_AND_SOUTH_WEST,
  /** @type `i32` */
  BLOCK_NORTH_EAST_AND_WEST,
  /** @type `i32` */
  BLOCK_SOUTH_EAST_AND_WEST,
  /** @type `i32` */
  BLOCK_WEST_ROUTE_BLOCKER,
  /** @type `i32` */
  BLOCK_EAST_ROUTE_BLOCKER,
  /** @type `i32` */
  BLOCK_SOUTH_ROUTE_BLOCKER,
  /** @type `i32` */
  BLOCK_NORTH_ROUTE_BLOCKER,
  /** @type `i32` */
  BLOCK_SOUTH_WEST_ROUTE_BLOCKER,
  /** @type `i32` */
  BLOCK_SOUTH_EAST_ROUTE_BLOCKER,
  /** @type `i32` */
  BLOCK_NORTH_WEST_ROUTE_BLOCKER,
  /** @type `i32` */
  BLOCK_NORTH_EAST_ROUTE_BLOCKER,
  /** @type `i32` */
  BLOCK_NORTH_AND_SOUTH_EAST_ROUTE_BLOCKER,
  /** @type `i32` */
  BLOCK_NORTH_AND_SOUTH_WEST_ROUTE_BLOCKER,
  /** @type `i32` */
  BLOCK_NORTH_EAST_AND_WEST_ROUTE_BLOCKER,
  /** @type `i32` */
  BLOCK_SOUTH_EAST_AND_WEST_ROUTE_BLOCKER,
}
/** src/rsmod/LocShape/LocShape */
export declare enum LocShape {
  /** @type `i32` */
  WALL_STRAIGHT,
  /** @type `i32` */
  WALL_DIAGONAL_CORNER,
  /** @type `i32` */
  WALL_L,
  /** @type `i32` */
  WALL_SQUARE_CORNER,
  /** @type `i32` */
  WALLDECOR_STRAIGHT_NOOFFSET,
  /** @type `i32` */
  WALLDECOR_STRAIGHT_OFFSET,
  /** @type `i32` */
  WALLDECOR_DIAGONAL_OFFSET,
  /** @type `i32` */
  WALLDECOR_DIAGONAL_NOOFFSET,
  /** @type `i32` */
  WALLDECOR_DIAGONAL_BOTH,
  /** @type `i32` */
  WALL_DIAGONAL,
  /** @type `i32` */
  CENTREPIECE_STRAIGHT,
  /** @type `i32` */
  CENTREPIECE_DIAGONAL,
  /** @type `i32` */
  ROOF_STRAIGHT,
  /** @type `i32` */
  ROOF_DIAGONAL_WITH_ROOFEDGE,
  /** @type `i32` */
  ROOF_DIAGONAL,
  /** @type `i32` */
  ROOF_L_CONCAVE,
  /** @type `i32` */
  ROOF_L_CONVEX,
  /** @type `i32` */
  ROOF_FLAT,
  /** @type `i32` */
  ROOFEDGE_STRAIGHT,
  /** @type `i32` */
  ROOFEDGE_DIAGONAL_CORNER,
  /** @type `i32` */
  ROOFEDGE_L,
  /** @type `i32` */
  ROOFEDGE_SQUARE_CORNER,
  /** @type `i32` */
  GROUND_DECOR,
}
/** src/rsmod/LocAngle/LocAngle */
export declare enum LocAngle {
  /** @type `i32` */
  WEST,
  /** @type `i32` */
  NORTH,
  /** @type `i32` */
  EAST,
  /** @type `i32` */
  SOUTH,
}
/** src/rsmod/collision/CollisionStrategy/CollisionType */
export declare enum CollisionType {
  /** @type `i32` */
  NORMAL,
  /** @type `i32` */
  BLOCKED,
  /** @type `i32` */
  INDOORS,
  /** @type `i32` */
  OUTDOORS,
  /** @type `i32` */
  LINE_OF_SIGHT,
}
/** src/rsmod/LocLayer/LocLayer */
export declare enum LocLayer {
  /** @type `i32` */
  WALL,
  /** @type `i32` */
  WALL_DECOR,
  /** @type `i32` */
  GROUND,
  /** @type `i32` */
  GROUND_DECOR,
}
/** src/rsmod/flag/BlockAccessFlag/BlockAccessFlag */
export declare enum BlockAccessFlag {
  /** @type `i32` */
  BLOCK_NORTH,
  /** @type `i32` */
  BLOCK_EAST,
  /** @type `i32` */
  BLOCK_SOUTH,
  /** @type `i32` */
  BLOCK_WEST,
}
