async function instantiate(module, imports = {}) {
  const adaptedImports = {
    env: Object.assign(Object.create(globalThis), imports.env || {}, {
      abort(message, fileName, lineNumber, columnNumber) {
        // ~lib/builtins/abort(~lib/string/String | null?, ~lib/string/String | null?, u32?, u32?) => void
        message = __liftString(message >>> 0);
        fileName = __liftString(fileName >>> 0);
        lineNumber = lineNumber >>> 0;
        columnNumber = columnNumber >>> 0;
        (() => {
          // @external.js
          throw Error(`${message} in ${fileName}:${lineNumber}:${columnNumber}`);
        })();
      },
      "console.log"(text) {
        // ~lib/bindings/dom/console.log(~lib/string/String) => void
        text = __liftString(text >>> 0);
        console.log(text);
      },
    }),
  };
  const { exports } = await WebAssembly.instantiate(module, adaptedImports);
  const memory = exports.memory || imports.env.memory;
  const adaptedExports = Object.setPrototypeOf({
    findPath(level, srcX, srcZ, destX, destZ, srcSize, destWidth, destHeight, angle, shape, moveNear, blockAccessFlags, maxWaypoints, collision) {
      // assembly/index/findPath(i32, i32, i32, i32, i32, i32?, i32?, i32?, i32?, i32?, bool?, i32?, i32?, i32?) => ~lib/typedarray/Int32Array
      moveNear = moveNear ? 1 : 0;
      exports.__setArgumentsLength(arguments.length);
      return __liftTypedArray(Int32Array, exports.findPath(level, srcX, srcZ, destX, destZ, srcSize, destWidth, destHeight, angle, shape, moveNear, blockAccessFlags, maxWaypoints, collision) >>> 0);
    },
    changeFloor(x, z, level, add) {
      // assembly/index/changeFloor(i32, i32, i32, bool) => void
      add = add ? 1 : 0;
      exports.changeFloor(x, z, level, add);
    },
    changeLoc(x, z, level, width, length, blockrange, breakroutefinding, add) {
      // assembly/index/changeLoc(i32, i32, i32, i32, i32, bool, bool, bool) => void
      blockrange = blockrange ? 1 : 0;
      breakroutefinding = breakroutefinding ? 1 : 0;
      add = add ? 1 : 0;
      exports.changeLoc(x, z, level, width, length, blockrange, breakroutefinding, add);
    },
    changeNpc(x, z, level, size, add) {
      // assembly/index/changeNpc(i32, i32, i32, i32, bool) => void
      add = add ? 1 : 0;
      exports.changeNpc(x, z, level, size, add);
    },
    changePlayer(x, z, level, size, add) {
      // assembly/index/changePlayer(i32, i32, i32, i32, bool) => void
      add = add ? 1 : 0;
      exports.changePlayer(x, z, level, size, add);
    },
    changeRoof(x, z, level, add) {
      // assembly/index/changeRoof(i32, i32, i32, bool) => void
      add = add ? 1 : 0;
      exports.changeRoof(x, z, level, add);
    },
    changeWall(x, z, level, angle, shape, blockrange, breakroutefinding, add) {
      // assembly/index/changeWall(i32, i32, i32, i32, i32, bool, bool, bool) => void
      blockrange = blockrange ? 1 : 0;
      breakroutefinding = breakroutefinding ? 1 : 0;
      add = add ? 1 : 0;
      exports.changeWall(x, z, level, angle, shape, blockrange, breakroutefinding, add);
    },
    allocateIfAbsent(absoluteX, absoluteZ, level) {
      // assembly/index/allocateIfAbsent(i32, i32, i32) => ~lib/staticarray/StaticArray<i32>
      return __liftStaticArray(__getI32, 2, exports.allocateIfAbsent(absoluteX, absoluteZ, level) >>> 0);
    },
    isFlagged(x, z, level, masks) {
      // assembly/index/isFlagged(i32, i32, i32, i32) => bool
      return exports.isFlagged(x, z, level, masks) != 0;
    },
    canTravel(level, x, z, offsetX, offsetZ, size, extraFlag, collision) {
      // assembly/index/canTravel(i32, i32, i32, i32, i32, i32, i32, i32?) => bool
      exports.__setArgumentsLength(arguments.length);
      return exports.canTravel(level, x, z, offsetX, offsetZ, size, extraFlag, collision) != 0;
    },
    hasLineOfSight(level, srcX, srcZ, destX, destZ, srcSize, destWidth, destHeight, extraFlag) {
      // assembly/index/hasLineOfSight(i32, i32, i32, i32, i32, i32?, i32?, i32?, i32?) => bool
      exports.__setArgumentsLength(arguments.length);
      return exports.hasLineOfSight(level, srcX, srcZ, destX, destZ, srcSize, destWidth, destHeight, extraFlag) != 0;
    },
    hasLineOfWalk(level, srcX, srcZ, destX, destZ, srcSize, destWidth, destHeight, extraFlag) {
      // assembly/index/hasLineOfWalk(i32, i32, i32, i32, i32, i32?, i32?, i32?, i32?) => bool
      exports.__setArgumentsLength(arguments.length);
      return exports.hasLineOfWalk(level, srcX, srcZ, destX, destZ, srcSize, destWidth, destHeight, extraFlag) != 0;
    },
    lineOfSight(level, srcX, srcZ, destX, destZ, srcSize, destWidth, destHeight, extraFlag) {
      // assembly/index/lineOfSight(i32, i32, i32, i32, i32, i32?, i32?, i32?, i32?) => ~lib/typedarray/Int32Array
      exports.__setArgumentsLength(arguments.length);
      return __liftTypedArray(Int32Array, exports.lineOfSight(level, srcX, srcZ, destX, destZ, srcSize, destWidth, destHeight, extraFlag) >>> 0);
    },
    lineOfWalk(level, srcX, srcZ, destX, destZ, srcSize, destWidth, destHeight, extraFlag) {
      // assembly/index/lineOfWalk(i32, i32, i32, i32, i32, i32?, i32?, i32?, i32?) => ~lib/typedarray/Int32Array
      exports.__setArgumentsLength(arguments.length);
      return __liftTypedArray(Int32Array, exports.lineOfWalk(level, srcX, srcZ, destX, destZ, srcSize, destWidth, destHeight, extraFlag) >>> 0);
    },
    reached(level, srcX, srcZ, destX, destZ, destWidth, destHeight, srcSize, angle, shape, blockAccessFlags) {
      // assembly/index/reached(i32, i32, i32, i32, i32, i32, i32, i32, i32?, i32?, i32?) => bool
      exports.__setArgumentsLength(arguments.length);
      return exports.reached(level, srcX, srcZ, destX, destZ, destWidth, destHeight, srcSize, angle, shape, blockAccessFlags) != 0;
    },
    CollisionFlag: (values => (
      // assembly/flag/CollisionFlag/CollisionFlag
      values[values.NULL = exports["CollisionFlag.NULL"].valueOf()] = "NULL",
      values[values.OPEN = exports["CollisionFlag.OPEN"].valueOf()] = "OPEN",
      values[values.WALL_NORTH_WEST = exports["CollisionFlag.WALL_NORTH_WEST"].valueOf()] = "WALL_NORTH_WEST",
      values[values.WALL_NORTH = exports["CollisionFlag.WALL_NORTH"].valueOf()] = "WALL_NORTH",
      values[values.WALL_NORTH_EAST = exports["CollisionFlag.WALL_NORTH_EAST"].valueOf()] = "WALL_NORTH_EAST",
      values[values.WALL_EAST = exports["CollisionFlag.WALL_EAST"].valueOf()] = "WALL_EAST",
      values[values.WALL_SOUTH_EAST = exports["CollisionFlag.WALL_SOUTH_EAST"].valueOf()] = "WALL_SOUTH_EAST",
      values[values.WALL_SOUTH = exports["CollisionFlag.WALL_SOUTH"].valueOf()] = "WALL_SOUTH",
      values[values.WALL_SOUTH_WEST = exports["CollisionFlag.WALL_SOUTH_WEST"].valueOf()] = "WALL_SOUTH_WEST",
      values[values.WALL_WEST = exports["CollisionFlag.WALL_WEST"].valueOf()] = "WALL_WEST",
      values[values.LOC = exports["CollisionFlag.LOC"].valueOf()] = "LOC",
      values[values.WALL_NORTH_WEST_PROJ_BLOCKER = exports["CollisionFlag.WALL_NORTH_WEST_PROJ_BLOCKER"].valueOf()] = "WALL_NORTH_WEST_PROJ_BLOCKER",
      values[values.WALL_NORTH_PROJ_BLOCKER = exports["CollisionFlag.WALL_NORTH_PROJ_BLOCKER"].valueOf()] = "WALL_NORTH_PROJ_BLOCKER",
      values[values.WALL_NORTH_EAST_PROJ_BLOCKER = exports["CollisionFlag.WALL_NORTH_EAST_PROJ_BLOCKER"].valueOf()] = "WALL_NORTH_EAST_PROJ_BLOCKER",
      values[values.WALL_EAST_PROJ_BLOCKER = exports["CollisionFlag.WALL_EAST_PROJ_BLOCKER"].valueOf()] = "WALL_EAST_PROJ_BLOCKER",
      values[values.WALL_SOUTH_EAST_PROJ_BLOCKER = exports["CollisionFlag.WALL_SOUTH_EAST_PROJ_BLOCKER"].valueOf()] = "WALL_SOUTH_EAST_PROJ_BLOCKER",
      values[values.WALL_SOUTH_PROJ_BLOCKER = exports["CollisionFlag.WALL_SOUTH_PROJ_BLOCKER"].valueOf()] = "WALL_SOUTH_PROJ_BLOCKER",
      values[values.WALL_SOUTH_WEST_PROJ_BLOCKER = exports["CollisionFlag.WALL_SOUTH_WEST_PROJ_BLOCKER"].valueOf()] = "WALL_SOUTH_WEST_PROJ_BLOCKER",
      values[values.WALL_WEST_PROJ_BLOCKER = exports["CollisionFlag.WALL_WEST_PROJ_BLOCKER"].valueOf()] = "WALL_WEST_PROJ_BLOCKER",
      values[values.LOC_PROJ_BLOCKER = exports["CollisionFlag.LOC_PROJ_BLOCKER"].valueOf()] = "LOC_PROJ_BLOCKER",
      values[values.FLOOR_DECORATION = exports["CollisionFlag.FLOOR_DECORATION"].valueOf()] = "FLOOR_DECORATION",
      values[values.NPC = exports["CollisionFlag.NPC"].valueOf()] = "NPC",
      values[values.PLAYER = exports["CollisionFlag.PLAYER"].valueOf()] = "PLAYER",
      values[values.FLOOR = exports["CollisionFlag.FLOOR"].valueOf()] = "FLOOR",
      values[values.WALL_NORTH_WEST_ROUTE_BLOCKER = exports["CollisionFlag.WALL_NORTH_WEST_ROUTE_BLOCKER"].valueOf()] = "WALL_NORTH_WEST_ROUTE_BLOCKER",
      values[values.WALL_NORTH_ROUTE_BLOCKER = exports["CollisionFlag.WALL_NORTH_ROUTE_BLOCKER"].valueOf()] = "WALL_NORTH_ROUTE_BLOCKER",
      values[values.WALL_NORTH_EAST_ROUTE_BLOCKER = exports["CollisionFlag.WALL_NORTH_EAST_ROUTE_BLOCKER"].valueOf()] = "WALL_NORTH_EAST_ROUTE_BLOCKER",
      values[values.WALL_EAST_ROUTE_BLOCKER = exports["CollisionFlag.WALL_EAST_ROUTE_BLOCKER"].valueOf()] = "WALL_EAST_ROUTE_BLOCKER",
      values[values.WALL_SOUTH_EAST_ROUTE_BLOCKER = exports["CollisionFlag.WALL_SOUTH_EAST_ROUTE_BLOCKER"].valueOf()] = "WALL_SOUTH_EAST_ROUTE_BLOCKER",
      values[values.WALL_SOUTH_ROUTE_BLOCKER = exports["CollisionFlag.WALL_SOUTH_ROUTE_BLOCKER"].valueOf()] = "WALL_SOUTH_ROUTE_BLOCKER",
      values[values.WALL_SOUTH_WEST_ROUTE_BLOCKER = exports["CollisionFlag.WALL_SOUTH_WEST_ROUTE_BLOCKER"].valueOf()] = "WALL_SOUTH_WEST_ROUTE_BLOCKER",
      values[values.WALL_WEST_ROUTE_BLOCKER = exports["CollisionFlag.WALL_WEST_ROUTE_BLOCKER"].valueOf()] = "WALL_WEST_ROUTE_BLOCKER",
      values[values.LOC_ROUTE_BLOCKER = exports["CollisionFlag.LOC_ROUTE_BLOCKER"].valueOf()] = "LOC_ROUTE_BLOCKER",
      values[values.ROOF = exports["CollisionFlag.ROOF"].valueOf()] = "ROOF",
      values[values.FLOOR_BLOCKED = exports["CollisionFlag.FLOOR_BLOCKED"].valueOf()] = "FLOOR_BLOCKED",
      values[values.WALK_BLOCKED = exports["CollisionFlag.WALK_BLOCKED"].valueOf()] = "WALK_BLOCKED",
      values[values.BLOCK_WEST = exports["CollisionFlag.BLOCK_WEST"].valueOf()] = "BLOCK_WEST",
      values[values.BLOCK_EAST = exports["CollisionFlag.BLOCK_EAST"].valueOf()] = "BLOCK_EAST",
      values[values.BLOCK_SOUTH = exports["CollisionFlag.BLOCK_SOUTH"].valueOf()] = "BLOCK_SOUTH",
      values[values.BLOCK_NORTH = exports["CollisionFlag.BLOCK_NORTH"].valueOf()] = "BLOCK_NORTH",
      values[values.BLOCK_SOUTH_WEST = exports["CollisionFlag.BLOCK_SOUTH_WEST"].valueOf()] = "BLOCK_SOUTH_WEST",
      values[values.BLOCK_SOUTH_EAST = exports["CollisionFlag.BLOCK_SOUTH_EAST"].valueOf()] = "BLOCK_SOUTH_EAST",
      values[values.BLOCK_NORTH_WEST = exports["CollisionFlag.BLOCK_NORTH_WEST"].valueOf()] = "BLOCK_NORTH_WEST",
      values[values.BLOCK_NORTH_EAST = exports["CollisionFlag.BLOCK_NORTH_EAST"].valueOf()] = "BLOCK_NORTH_EAST",
      values[values.BLOCK_NORTH_AND_SOUTH_EAST = exports["CollisionFlag.BLOCK_NORTH_AND_SOUTH_EAST"].valueOf()] = "BLOCK_NORTH_AND_SOUTH_EAST",
      values[values.BLOCK_NORTH_AND_SOUTH_WEST = exports["CollisionFlag.BLOCK_NORTH_AND_SOUTH_WEST"].valueOf()] = "BLOCK_NORTH_AND_SOUTH_WEST",
      values[values.BLOCK_NORTH_EAST_AND_WEST = exports["CollisionFlag.BLOCK_NORTH_EAST_AND_WEST"].valueOf()] = "BLOCK_NORTH_EAST_AND_WEST",
      values[values.BLOCK_SOUTH_EAST_AND_WEST = exports["CollisionFlag.BLOCK_SOUTH_EAST_AND_WEST"].valueOf()] = "BLOCK_SOUTH_EAST_AND_WEST",
      values[values.BLOCK_WEST_ROUTE_BLOCKER = exports["CollisionFlag.BLOCK_WEST_ROUTE_BLOCKER"].valueOf()] = "BLOCK_WEST_ROUTE_BLOCKER",
      values[values.BLOCK_EAST_ROUTE_BLOCKER = exports["CollisionFlag.BLOCK_EAST_ROUTE_BLOCKER"].valueOf()] = "BLOCK_EAST_ROUTE_BLOCKER",
      values[values.BLOCK_SOUTH_ROUTE_BLOCKER = exports["CollisionFlag.BLOCK_SOUTH_ROUTE_BLOCKER"].valueOf()] = "BLOCK_SOUTH_ROUTE_BLOCKER",
      values[values.BLOCK_NORTH_ROUTE_BLOCKER = exports["CollisionFlag.BLOCK_NORTH_ROUTE_BLOCKER"].valueOf()] = "BLOCK_NORTH_ROUTE_BLOCKER",
      values[values.BLOCK_SOUTH_WEST_ROUTE_BLOCKER = exports["CollisionFlag.BLOCK_SOUTH_WEST_ROUTE_BLOCKER"].valueOf()] = "BLOCK_SOUTH_WEST_ROUTE_BLOCKER",
      values[values.BLOCK_SOUTH_EAST_ROUTE_BLOCKER = exports["CollisionFlag.BLOCK_SOUTH_EAST_ROUTE_BLOCKER"].valueOf()] = "BLOCK_SOUTH_EAST_ROUTE_BLOCKER",
      values[values.BLOCK_NORTH_WEST_ROUTE_BLOCKER = exports["CollisionFlag.BLOCK_NORTH_WEST_ROUTE_BLOCKER"].valueOf()] = "BLOCK_NORTH_WEST_ROUTE_BLOCKER",
      values[values.BLOCK_NORTH_EAST_ROUTE_BLOCKER = exports["CollisionFlag.BLOCK_NORTH_EAST_ROUTE_BLOCKER"].valueOf()] = "BLOCK_NORTH_EAST_ROUTE_BLOCKER",
      values[values.BLOCK_NORTH_AND_SOUTH_EAST_ROUTE_BLOCKER = exports["CollisionFlag.BLOCK_NORTH_AND_SOUTH_EAST_ROUTE_BLOCKER"].valueOf()] = "BLOCK_NORTH_AND_SOUTH_EAST_ROUTE_BLOCKER",
      values[values.BLOCK_NORTH_AND_SOUTH_WEST_ROUTE_BLOCKER = exports["CollisionFlag.BLOCK_NORTH_AND_SOUTH_WEST_ROUTE_BLOCKER"].valueOf()] = "BLOCK_NORTH_AND_SOUTH_WEST_ROUTE_BLOCKER",
      values[values.BLOCK_NORTH_EAST_AND_WEST_ROUTE_BLOCKER = exports["CollisionFlag.BLOCK_NORTH_EAST_AND_WEST_ROUTE_BLOCKER"].valueOf()] = "BLOCK_NORTH_EAST_AND_WEST_ROUTE_BLOCKER",
      values[values.BLOCK_SOUTH_EAST_AND_WEST_ROUTE_BLOCKER = exports["CollisionFlag.BLOCK_SOUTH_EAST_AND_WEST_ROUTE_BLOCKER"].valueOf()] = "BLOCK_SOUTH_EAST_AND_WEST_ROUTE_BLOCKER",
      values
    ))({}),
    LocShape: (values => (
      // assembly/LocShape/LocShape
      values[values.WALL_STRAIGHT = exports["LocShape.WALL_STRAIGHT"].valueOf()] = "WALL_STRAIGHT",
      values[values.WALL_DIAGONAL_CORNER = exports["LocShape.WALL_DIAGONAL_CORNER"].valueOf()] = "WALL_DIAGONAL_CORNER",
      values[values.WALL_L = exports["LocShape.WALL_L"].valueOf()] = "WALL_L",
      values[values.WALL_SQUARE_CORNER = exports["LocShape.WALL_SQUARE_CORNER"].valueOf()] = "WALL_SQUARE_CORNER",
      values[values.WALLDECOR_STRAIGHT_NOOFFSET = exports["LocShape.WALLDECOR_STRAIGHT_NOOFFSET"].valueOf()] = "WALLDECOR_STRAIGHT_NOOFFSET",
      values[values.WALLDECOR_STRAIGHT_OFFSET = exports["LocShape.WALLDECOR_STRAIGHT_OFFSET"].valueOf()] = "WALLDECOR_STRAIGHT_OFFSET",
      values[values.WALLDECOR_DIAGONAL_OFFSET = exports["LocShape.WALLDECOR_DIAGONAL_OFFSET"].valueOf()] = "WALLDECOR_DIAGONAL_OFFSET",
      values[values.WALLDECOR_DIAGONAL_NOOFFSET = exports["LocShape.WALLDECOR_DIAGONAL_NOOFFSET"].valueOf()] = "WALLDECOR_DIAGONAL_NOOFFSET",
      values[values.WALLDECOR_DIAGONAL_BOTH = exports["LocShape.WALLDECOR_DIAGONAL_BOTH"].valueOf()] = "WALLDECOR_DIAGONAL_BOTH",
      values[values.WALL_DIAGONAL = exports["LocShape.WALL_DIAGONAL"].valueOf()] = "WALL_DIAGONAL",
      values[values.CENTREPIECE_STRAIGHT = exports["LocShape.CENTREPIECE_STRAIGHT"].valueOf()] = "CENTREPIECE_STRAIGHT",
      values[values.CENTREPIECE_DIAGONAL = exports["LocShape.CENTREPIECE_DIAGONAL"].valueOf()] = "CENTREPIECE_DIAGONAL",
      values[values.ROOF_STRAIGHT = exports["LocShape.ROOF_STRAIGHT"].valueOf()] = "ROOF_STRAIGHT",
      values[values.ROOF_DIAGONAL_WITH_ROOFEDGE = exports["LocShape.ROOF_DIAGONAL_WITH_ROOFEDGE"].valueOf()] = "ROOF_DIAGONAL_WITH_ROOFEDGE",
      values[values.ROOF_DIAGONAL = exports["LocShape.ROOF_DIAGONAL"].valueOf()] = "ROOF_DIAGONAL",
      values[values.ROOF_L_CONCAVE = exports["LocShape.ROOF_L_CONCAVE"].valueOf()] = "ROOF_L_CONCAVE",
      values[values.ROOF_L_CONVEX = exports["LocShape.ROOF_L_CONVEX"].valueOf()] = "ROOF_L_CONVEX",
      values[values.ROOF_FLAT = exports["LocShape.ROOF_FLAT"].valueOf()] = "ROOF_FLAT",
      values[values.ROOFEDGE_STRAIGHT = exports["LocShape.ROOFEDGE_STRAIGHT"].valueOf()] = "ROOFEDGE_STRAIGHT",
      values[values.ROOFEDGE_DIAGONAL_CORNER = exports["LocShape.ROOFEDGE_DIAGONAL_CORNER"].valueOf()] = "ROOFEDGE_DIAGONAL_CORNER",
      values[values.ROOFEDGE_L = exports["LocShape.ROOFEDGE_L"].valueOf()] = "ROOFEDGE_L",
      values[values.ROOFEDGE_SQUARE_CORNER = exports["LocShape.ROOFEDGE_SQUARE_CORNER"].valueOf()] = "ROOFEDGE_SQUARE_CORNER",
      values[values.GROUND_DECOR = exports["LocShape.GROUND_DECOR"].valueOf()] = "GROUND_DECOR",
      values
    ))({}),
    LocAngle: (values => (
      // assembly/LocAngle/LocAngle
      values[values.WEST = exports["LocAngle.WEST"].valueOf()] = "WEST",
      values[values.NORTH = exports["LocAngle.NORTH"].valueOf()] = "NORTH",
      values[values.EAST = exports["LocAngle.EAST"].valueOf()] = "EAST",
      values[values.SOUTH = exports["LocAngle.SOUTH"].valueOf()] = "SOUTH",
      values
    ))({}),
    CollisionType: (values => (
      // assembly/collision/CollisionStrategy/CollisionType
      values[values.NORMAL = exports["CollisionType.NORMAL"].valueOf()] = "NORMAL",
      values[values.BLOCKED = exports["CollisionType.BLOCKED"].valueOf()] = "BLOCKED",
      values[values.INDOORS = exports["CollisionType.INDOORS"].valueOf()] = "INDOORS",
      values[values.OUTDOORS = exports["CollisionType.OUTDOORS"].valueOf()] = "OUTDOORS",
      values[values.LINE_OF_SIGHT = exports["CollisionType.LINE_OF_SIGHT"].valueOf()] = "LINE_OF_SIGHT",
      values
    ))({}),
  }, exports);
  function __liftString(pointer) {
    if (!pointer) return null;
    const
      end = pointer + new Uint32Array(memory.buffer)[pointer - 4 >>> 2] >>> 1,
      memoryU16 = new Uint16Array(memory.buffer);
    let
      start = pointer >>> 1,
      string = "";
    while (end - start > 1024) string += String.fromCharCode(...memoryU16.subarray(start, start += 1024));
    return string + String.fromCharCode(...memoryU16.subarray(start, end));
  }
  function __liftTypedArray(constructor, pointer) {
    if (!pointer) return null;
    return new constructor(
      memory.buffer,
      __getU32(pointer + 4),
      __dataview.getUint32(pointer + 8, true) / constructor.BYTES_PER_ELEMENT
    ).slice();
  }
  function __liftStaticArray(liftElement, align, pointer) {
    if (!pointer) return null;
    const
      length = __getU32(pointer - 4) >>> align,
      values = new Array(length);
    for (let i = 0; i < length; ++i) values[i] = liftElement(pointer + (i << align >>> 0));
    return values;
  }
  let __dataview = new DataView(memory.buffer);
  function __getI32(pointer) {
    try {
      return __dataview.getInt32(pointer, true);
    } catch {
      __dataview = new DataView(memory.buffer);
      return __dataview.getInt32(pointer, true);
    }
  }
  function __getU32(pointer) {
    try {
      return __dataview.getUint32(pointer, true);
    } catch {
      __dataview = new DataView(memory.buffer);
      return __dataview.getUint32(pointer, true);
    }
  }
  return adaptedExports;
}
export const {
  memory,
  findPath,
  changeFloor,
  changeLoc,
  changeNpc,
  changePlayer,
  changeRoof,
  changeWall,
  allocateIfAbsent,
  isFlagged,
  canTravel,
  hasLineOfSight,
  hasLineOfWalk,
  lineOfSight,
  lineOfWalk,
  reached,
  CollisionFlag,
  LocShape,
  LocAngle,
  CollisionType,
} = await (async url => instantiate(
  await (async () => {
    try { return await globalThis.WebAssembly.compileStreaming(globalThis.fetch(url)); }
    catch { return globalThis.WebAssembly.compile(await (await import("node:fs/promises")).readFile(url)); }
  })(), {
  }
))(new URL("debug.wasm", import.meta.url));
