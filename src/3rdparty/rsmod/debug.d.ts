/** Exported memory */
export declare const memory: WebAssembly.Memory;
/**
 * assembly/index/findPath
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
 * @returns `~lib/typedarray/Int32Array`
 */
export declare function findPath(level: number, srcX: number, srcZ: number, destX: number, destZ: number, srcSize?: number, destWidth?: number, destHeight?: number, angle?: number, shape?: number, moveNear?: boolean, blockAccessFlags?: number, maxWaypoints?: number, collision?: number): Int32Array;
/**
 * assembly/index/changeFloor
 * @param x `i32`
 * @param z `i32`
 * @param level `i32`
 * @param add `bool`
 */
export declare function changeFloor(x: number, z: number, level: number, add: boolean): void;
/**
 * assembly/index/changeLoc
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
 * assembly/index/changeNpc
 * @param x `i32`
 * @param z `i32`
 * @param level `i32`
 * @param size `i32`
 * @param add `bool`
 */
export declare function changeNpc(x: number, z: number, level: number, size: number, add: boolean): void;
/**
 * assembly/index/changePlayer
 * @param x `i32`
 * @param z `i32`
 * @param level `i32`
 * @param size `i32`
 * @param add `bool`
 */
export declare function changePlayer(x: number, z: number, level: number, size: number, add: boolean): void;
/**
 * assembly/index/changeRoof
 * @param x `i32`
 * @param z `i32`
 * @param level `i32`
 * @param add `bool`
 */
export declare function changeRoof(x: number, z: number, level: number, add: boolean): void;
/**
 * assembly/index/changeWall
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
 * assembly/index/allocateIfAbsent
 * @param absoluteX `i32`
 * @param absoluteZ `i32`
 * @param level `i32`
 * @returns `~lib/staticarray/StaticArray<i32>`
 */
export declare function allocateIfAbsent(absoluteX: number, absoluteZ: number, level: number): ArrayLike<number>;
/**
 * assembly/index/isFlagged
 * @param x `i32`
 * @param z `i32`
 * @param level `i32`
 * @param masks `i32`
 * @returns `bool`
 */
export declare function isFlagged(x: number, z: number, level: number, masks: number): boolean;
/**
 * assembly/index/canTravel
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
 * assembly/index/hasLineOfSight
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
 * assembly/index/hasLineOfWalk
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
 * assembly/index/lineOfSight
 * @param level `i32`
 * @param srcX `i32`
 * @param srcZ `i32`
 * @param destX `i32`
 * @param destZ `i32`
 * @param srcSize `i32`
 * @param destWidth `i32`
 * @param destHeight `i32`
 * @param extraFlag `i32`
 * @returns `~lib/typedarray/Int32Array`
 */
export declare function lineOfSight(level: number, srcX: number, srcZ: number, destX: number, destZ: number, srcSize?: number, destWidth?: number, destHeight?: number, extraFlag?: number): Int32Array;
/**
 * assembly/index/lineOfWalk
 * @param level `i32`
 * @param srcX `i32`
 * @param srcZ `i32`
 * @param destX `i32`
 * @param destZ `i32`
 * @param srcSize `i32`
 * @param destWidth `i32`
 * @param destHeight `i32`
 * @param extraFlag `i32`
 * @returns `~lib/typedarray/Int32Array`
 */
export declare function lineOfWalk(level: number, srcX: number, srcZ: number, destX: number, destZ: number, srcSize?: number, destWidth?: number, destHeight?: number, extraFlag?: number): Int32Array;
/**
 * assembly/index/reached
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
/** assembly/flag/CollisionFlag/CollisionFlag */
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
/** assembly/LocShape/LocShape */
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
/** assembly/LocAngle/LocAngle */
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
/** assembly/collision/CollisionStrategy/CollisionType */
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
