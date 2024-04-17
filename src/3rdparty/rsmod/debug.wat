(module
 (type $0 (func (param i32) (result i32)))
 (type $1 (func (param i32 i32 i32 i32 i32 i32 i32 i32 i32) (result i32)))
 (type $2 (func (param i32 i32 i32 i32 i32 i32 i32) (result i32)))
 (type $3 (func (param i32)))
 (type $4 (func (param i32 i32 i32 i32 i32)))
 (type $5 (func (param i32 i32) (result i32)))
 (type $6 (func (param i32 i32)))
 (type $7 (func (param i32 i32 i32 i32)))
 (type $8 (func))
 (type $9 (func (param i32 i32 i32 i32 i32 i32 i32 i32) (result i32)))
 (type $10 (func (param i32 i32 i32 i32) (result i32)))
 (type $11 (func (param i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32) (result i32)))
 (type $12 (func (param i32 i32 i32 i32 i32 i32 i32)))
 (type $13 (func (param i32 i32 i32)))
 (type $14 (func (param i32 i32 i32 i32 i32 i32 i32 i32)))
 (type $15 (func (param i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32) (result i32)))
 (type $16 (func (param i32 i32 i32 i32 i32) (result i32)))
 (type $17 (func (param i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32) (result i32)))
 (type $18 (func (param i32 i32 i64)))
 (type $19 (func (result i32)))
 (type $20 (func (param i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32) (result i32)))
 (type $21 (func (param i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32) (result i32)))
 (type $22 (func (param i32 i32 i32 i32 i32 i32) (result i32)))
 (type $23 (func (param i32 i32 i32) (result i32)))
 (type $24 (func (param i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32) (result i32)))
 (import "env" "abort" (func $~lib/builtins/abort (param i32 i32 i32 i32)))
 (import "env" "console.log" (func $~lib/bindings/dom/console.log (param i32)))
 (global $~lib/memory/__stack_pointer (mut i32) (i32.const 37924))
 (global $assembly/index/flags (mut i32) (i32.const 0))
 (global $~argumentsLength (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/toSpace (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/iter (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/white (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/visitCount (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/total (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/state (mut i32) (i32.const 0))
 (global $assembly/Line/Line.HALF_TILE (mut i32) (i32.const 0))
 (global $~lib/rt/tlsf/ROOT (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/threshold (mut i32) (i32.const 0))
 (global $assembly/index/linePathFinder (mut i32) (i32.const 0))
 (global $assembly/index/lineValidator (mut i32) (i32.const 0))
 (global $assembly/collision/CollisionStrategies/CollisionStrategies.LINE_OF_SIGHT (mut i32) (i32.const 0))
 (global $assembly/collision/CollisionStrategies/CollisionStrategies.OUTDOORS (mut i32) (i32.const 0))
 (global $assembly/collision/CollisionStrategies/CollisionStrategies.INDOORS (mut i32) (i32.const 0))
 (global $assembly/collision/CollisionStrategies/CollisionStrategies.BLOCKED (mut i32) (i32.const 0))
 (global $assembly/collision/CollisionStrategies/CollisionStrategies.NORMAL (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/fromSpace (mut i32) (i32.const 0))
 (global $assembly/index/stepValidator (mut i32) (i32.const 0))
 (global $assembly/index/pathfinder (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/pinSpace (mut i32) (i32.const 0))
 (global $assembly/LocShape/LocShape.GROUND_DECOR i32 (i32.const 22))
 (global $assembly/LocShape/LocShape.ROOFEDGE_SQUARE_CORNER i32 (i32.const 21))
 (global $assembly/LocShape/LocShape.ROOFEDGE_L i32 (i32.const 20))
 (global $assembly/LocShape/LocShape.ROOFEDGE_DIAGONAL_CORNER i32 (i32.const 19))
 (global $assembly/LocShape/LocShape.ROOFEDGE_STRAIGHT i32 (i32.const 18))
 (global $assembly/LocShape/LocShape.ROOF_FLAT i32 (i32.const 17))
 (global $assembly/LocShape/LocShape.ROOF_L_CONVEX i32 (i32.const 16))
 (global $assembly/LocShape/LocShape.ROOF_L_CONCAVE i32 (i32.const 15))
 (global $assembly/LocShape/LocShape.ROOF_DIAGONAL i32 (i32.const 14))
 (global $assembly/LocShape/LocShape.ROOF_DIAGONAL_WITH_ROOFEDGE i32 (i32.const 13))
 (global $assembly/LocShape/LocShape.ROOF_STRAIGHT i32 (i32.const 12))
 (global $assembly/LocShape/LocShape.CENTREPIECE_DIAGONAL i32 (i32.const 11))
 (global $assembly/LocShape/LocShape.CENTREPIECE_STRAIGHT i32 (i32.const 10))
 (global $assembly/LocShape/LocShape.WALL_DIAGONAL i32 (i32.const 9))
 (global $assembly/LocShape/LocShape.WALLDECOR_DIAGONAL_BOTH i32 (i32.const 8))
 (global $assembly/LocShape/LocShape.WALLDECOR_DIAGONAL_NOOFFSET i32 (i32.const 7))
 (global $assembly/LocShape/LocShape.WALLDECOR_DIAGONAL_OFFSET i32 (i32.const 6))
 (global $assembly/LocShape/LocShape.WALLDECOR_STRAIGHT_OFFSET i32 (i32.const 5))
 (global $assembly/LocShape/LocShape.WALLDECOR_STRAIGHT_NOOFFSET i32 (i32.const 4))
 (global $assembly/LocShape/LocShape.WALL_SQUARE_CORNER i32 (i32.const 3))
 (global $assembly/LocShape/LocShape.WALL_L i32 (i32.const 2))
 (global $assembly/LocShape/LocShape.WALL_DIAGONAL_CORNER i32 (i32.const 1))
 (global $assembly/LocShape/LocShape.WALL_STRAIGHT i32 (i32.const 0))
 (global $assembly/LocAngle/LocAngle.SOUTH i32 (i32.const 3))
 (global $assembly/LocAngle/LocAngle.EAST i32 (i32.const 2))
 (global $assembly/LocAngle/LocAngle.NORTH i32 (i32.const 1))
 (global $assembly/LocAngle/LocAngle.WEST i32 (i32.const 0))
 (global $assembly/collision/CollisionStrategy/CollisionType.LINE_OF_SIGHT i32 (i32.const 4))
 (global $assembly/collision/CollisionStrategy/CollisionType.OUTDOORS i32 (i32.const 3))
 (global $assembly/collision/CollisionStrategy/CollisionType.INDOORS i32 (i32.const 2))
 (global $assembly/collision/CollisionStrategy/CollisionType.BLOCKED i32 (i32.const 1))
 (global $assembly/collision/CollisionStrategy/CollisionType.NORMAL i32 (i32.const 0))
 (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_SOUTH_EAST_AND_WEST_ROUTE_BLOCKER i32 (i32.const 2116288512))
 (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_NORTH_EAST_AND_WEST_ROUTE_BLOCKER i32 (i32.const 1675886592))
 (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_NORTH_AND_SOUTH_WEST_ROUTE_BLOCKER i32 (i32.const 2028208128))
 (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_NORTH_AND_SOUTH_EAST_ROUTE_BLOCKER i32 (i32.const 1336147968))
 (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_NORTH_EAST_ROUTE_BLOCKER i32 (i32.const 2015625216))
 (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_NORTH_WEST_ROUTE_BLOCKER i32 (i32.const 1310982144))
 (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_SOUTH_EAST_ROUTE_BLOCKER i32 (i32.const 1625554944))
 (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_SOUTH_WEST_ROUTE_BLOCKER i32 (i32.const 1134821376))
 (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_NORTH_ROUTE_BLOCKER i32 (i32.const 1210318848))
 (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_SOUTH_ROUTE_BLOCKER i32 (i32.const 1084489728))
 (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_EAST_ROUTE_BLOCKER i32 (i32.const 1612972032))
 (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_WEST_ROUTE_BLOCKER i32 (i32.const 1109655552))
 (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_SOUTH_EAST_AND_WEST i32 (i32.const 2359800))
 (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_NORTH_EAST_AND_WEST i32 (i32.const 2359695))
 (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_NORTH_AND_SOUTH_WEST i32 (i32.const 2359779))
 (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_NORTH_AND_SOUTH_EAST i32 (i32.const 2359614))
 (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_NORTH_EAST i32 (i32.const 2359776))
 (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_NORTH_WEST i32 (i32.const 2359608))
 (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_SOUTH_EAST i32 (i32.const 2359683))
 (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_SOUTH_WEST i32 (i32.const 2359566))
 (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_NORTH i32 (i32.const 2359584))
 (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_SOUTH i32 (i32.const 2359554))
 (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_EAST i32 (i32.const 2359680))
 (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_WEST i32 (i32.const 2359560))
 (global $assembly/flag/CollisionFlag/CollisionFlag.WALK_BLOCKED i32 (i32.const 2359552))
 (global $assembly/flag/CollisionFlag/CollisionFlag.FLOOR_BLOCKED i32 (i32.const 2359296))
 (global $assembly/flag/CollisionFlag/CollisionFlag.ROOF i32 (i32.const -2147483648))
 (global $assembly/flag/CollisionFlag/CollisionFlag.LOC_ROUTE_BLOCKER i32 (i32.const 1073741824))
 (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_WEST_ROUTE_BLOCKER i32 (i32.const 536870912))
 (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_SOUTH_WEST_ROUTE_BLOCKER i32 (i32.const 268435456))
 (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_SOUTH_ROUTE_BLOCKER i32 (i32.const 134217728))
 (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_SOUTH_EAST_ROUTE_BLOCKER i32 (i32.const 67108864))
 (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_EAST_ROUTE_BLOCKER i32 (i32.const 33554432))
 (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_NORTH_EAST_ROUTE_BLOCKER i32 (i32.const 16777216))
 (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_NORTH_ROUTE_BLOCKER i32 (i32.const 8388608))
 (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_NORTH_WEST_ROUTE_BLOCKER i32 (i32.const 4194304))
 (global $assembly/flag/CollisionFlag/CollisionFlag.FLOOR i32 (i32.const 2097152))
 (global $assembly/flag/CollisionFlag/CollisionFlag.PLAYER i32 (i32.const 1048576))
 (global $assembly/flag/CollisionFlag/CollisionFlag.NPC i32 (i32.const 524288))
 (global $assembly/flag/CollisionFlag/CollisionFlag.FLOOR_DECORATION i32 (i32.const 262144))
 (global $assembly/flag/CollisionFlag/CollisionFlag.LOC_PROJ_BLOCKER i32 (i32.const 131072))
 (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_WEST_PROJ_BLOCKER i32 (i32.const 65536))
 (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_SOUTH_WEST_PROJ_BLOCKER i32 (i32.const 32768))
 (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_SOUTH_PROJ_BLOCKER i32 (i32.const 16384))
 (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_SOUTH_EAST_PROJ_BLOCKER i32 (i32.const 8192))
 (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_EAST_PROJ_BLOCKER i32 (i32.const 4096))
 (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_NORTH_EAST_PROJ_BLOCKER i32 (i32.const 2048))
 (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_NORTH_PROJ_BLOCKER i32 (i32.const 1024))
 (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_NORTH_WEST_PROJ_BLOCKER i32 (i32.const 512))
 (global $assembly/flag/CollisionFlag/CollisionFlag.LOC i32 (i32.const 256))
 (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_WEST i32 (i32.const 128))
 (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_SOUTH_WEST i32 (i32.const 64))
 (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_SOUTH i32 (i32.const 32))
 (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_SOUTH_EAST i32 (i32.const 16))
 (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_EAST i32 (i32.const 8))
 (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_NORTH_EAST i32 (i32.const 4))
 (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_NORTH i32 (i32.const 2))
 (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_NORTH_WEST i32 (i32.const 1))
 (global $assembly/flag/CollisionFlag/CollisionFlag.OPEN i32 (i32.const 0))
 (global $assembly/flag/CollisionFlag/CollisionFlag.NULL i32 (i32.const -1))
 (memory $0 1)
 (data $0 (i32.const 1036) "<")
 (data $0.1 (i32.const 1048) "\02\00\00\00(\00\00\00A\00l\00l\00o\00c\00a\00t\00i\00o\00n\00 \00t\00o\00o\00 \00l\00a\00r\00g\00e")
 (data $1 (i32.const 1100) "<")
 (data $1.1 (i32.const 1112) "\02\00\00\00 \00\00\00~\00l\00i\00b\00/\00r\00t\00/\00i\00t\00c\00m\00s\00.\00t\00s")
 (data $4 (i32.const 1228) "<")
 (data $4.1 (i32.const 1240) "\02\00\00\00$\00\00\00I\00n\00d\00e\00x\00 \00o\00u\00t\00 \00o\00f\00 \00r\00a\00n\00g\00e")
 (data $5 (i32.const 1292) ",")
 (data $5.1 (i32.const 1304) "\02\00\00\00\14\00\00\00~\00l\00i\00b\00/\00r\00t\00.\00t\00s")
 (data $7 (i32.const 1372) "<")
 (data $7.1 (i32.const 1384) "\02\00\00\00\1e\00\00\00~\00l\00i\00b\00/\00r\00t\00/\00t\00l\00s\00f\00.\00t\00s")
 (data $8 (i32.const 1436) ",")
 (data $8.1 (i32.const 1448) "\02\00\00\00\1c\00\00\00I\00n\00v\00a\00l\00i\00d\00 \00l\00e\00n\00g\00t\00h")
 (data $9 (i32.const 1484) "<")
 (data $9.1 (i32.const 1496) "\02\00\00\00&\00\00\00~\00l\00i\00b\00/\00s\00t\00a\00t\00i\00c\00a\00r\00r\00a\00y\00.\00t\00s")
 (data $10 (i32.const 1548) "|")
 (data $10.1 (i32.const 1560) "\02\00\00\00l\00\00\00[\00f\00i\00n\00d\00P\00a\00t\00h\00]\00 \00F\00a\00i\00l\00e\00d\00 \00r\00e\00q\00u\00i\00r\00e\00m\00e\00n\00t\00.\00 \00c\00o\00l\00l\00i\00s\00i\00o\00n\00S\00t\00r\00a\00t\00e\00g\00y\00 \00w\00a\00s\00:\00 ")
 (data $11 (i32.const 1676) ",")
 (data $11.1 (i32.const 1688) "\02\00\00\00\1c\00\00\00.\00 \00m\00u\00s\00t\00 \00b\00e\00 \000\00-\004\00.")
 (data $12 (i32.const 1724) "\1c\00\00\00\03\00\00\00\00\00\00\00\12\00\00\00\0c\00\00\00 \06\00\00\00\00\00\00\a0\06")
 (data $13 (i32.const 1756) "|")
 (data $13.1 (i32.const 1768) "\02\00\00\00d\00\00\00t\00o\00S\00t\00r\00i\00n\00g\00(\00)\00 \00r\00a\00d\00i\00x\00 \00a\00r\00g\00u\00m\00e\00n\00t\00 \00m\00u\00s\00t\00 \00b\00e\00 \00b\00e\00t\00w\00e\00e\00n\00 \002\00 \00a\00n\00d\00 \003\006")
 (data $14 (i32.const 1884) "<")
 (data $14.1 (i32.const 1896) "\02\00\00\00&\00\00\00~\00l\00i\00b\00/\00u\00t\00i\00l\00/\00n\00u\00m\00b\00e\00r\00.\00t\00s")
 (data $15 (i32.const 1948) "\1c")
 (data $15.1 (i32.const 1960) "\02\00\00\00\02\00\00\000")
 (data $16 (i32.const 1980) "0\000\000\001\000\002\000\003\000\004\000\005\000\006\000\007\000\008\000\009\001\000\001\001\001\002\001\003\001\004\001\005\001\006\001\007\001\008\001\009\002\000\002\001\002\002\002\003\002\004\002\005\002\006\002\007\002\008\002\009\003\000\003\001\003\002\003\003\003\004\003\005\003\006\003\007\003\008\003\009\004\000\004\001\004\002\004\003\004\004\004\005\004\006\004\007\004\008\004\009\005\000\005\001\005\002\005\003\005\004\005\005\005\006\005\007\005\008\005\009\006\000\006\001\006\002\006\003\006\004\006\005\006\006\006\007\006\008\006\009\007\000\007\001\007\002\007\003\007\004\007\005\007\006\007\007\007\008\007\009\008\000\008\001\008\002\008\003\008\004\008\005\008\006\008\007\008\008\008\009\009\000\009\001\009\002\009\003\009\004\009\005\009\006\009\007\009\008\009\009")
 (data $17 (i32.const 2380) "\1c\04")
 (data $17.1 (i32.const 2392) "\02\00\00\00\00\04\00\000\000\000\001\000\002\000\003\000\004\000\005\000\006\000\007\000\008\000\009\000\00a\000\00b\000\00c\000\00d\000\00e\000\00f\001\000\001\001\001\002\001\003\001\004\001\005\001\006\001\007\001\008\001\009\001\00a\001\00b\001\00c\001\00d\001\00e\001\00f\002\000\002\001\002\002\002\003\002\004\002\005\002\006\002\007\002\008\002\009\002\00a\002\00b\002\00c\002\00d\002\00e\002\00f\003\000\003\001\003\002\003\003\003\004\003\005\003\006\003\007\003\008\003\009\003\00a\003\00b\003\00c\003\00d\003\00e\003\00f\004\000\004\001\004\002\004\003\004\004\004\005\004\006\004\007\004\008\004\009\004\00a\004\00b\004\00c\004\00d\004\00e\004\00f\005\000\005\001\005\002\005\003\005\004\005\005\005\006\005\007\005\008\005\009\005\00a\005\00b\005\00c\005\00d\005\00e\005\00f\006\000\006\001\006\002\006\003\006\004\006\005\006\006\006\007\006\008\006\009\006\00a\006\00b\006\00c\006\00d\006\00e\006\00f\007\000\007\001\007\002\007\003\007\004\007\005\007\006\007\007\007\008\007\009\007\00a\007\00b\007\00c\007\00d\007\00e\007\00f\008\000\008\001\008\002\008\003\008\004\008\005\008\006\008\007\008\008\008\009\008\00a\008\00b\008\00c\008\00d\008\00e\008\00f\009\000\009\001\009\002\009\003\009\004\009\005\009\006\009\007\009\008\009\009\009\00a\009\00b\009\00c\009\00d\009\00e\009\00f\00a\000\00a\001\00a\002\00a\003\00a\004\00a\005\00a\006\00a\007\00a\008\00a\009\00a\00a\00a\00b\00a\00c\00a\00d\00a\00e\00a\00f\00b\000\00b\001\00b\002\00b\003\00b\004\00b\005\00b\006\00b\007\00b\008\00b\009\00b\00a\00b\00b\00b\00c\00b\00d\00b\00e\00b\00f\00c\000\00c\001\00c\002\00c\003\00c\004\00c\005\00c\006\00c\007\00c\008\00c\009\00c\00a\00c\00b\00c\00c\00c\00d\00c\00e\00c\00f\00d\000\00d\001\00d\002\00d\003\00d\004\00d\005\00d\006\00d\007\00d\008\00d\009\00d\00a\00d\00b\00d\00c\00d\00d\00d\00e\00d\00f\00e\000\00e\001\00e\002\00e\003\00e\004\00e\005\00e\006\00e\007\00e\008\00e\009\00e\00a\00e\00b\00e\00c\00e\00d\00e\00e\00e\00f\00f\000\00f\001\00f\002\00f\003\00f\004\00f\005\00f\006\00f\007\00f\008\00f\009\00f\00a\00f\00b\00f\00c\00f\00d\00f\00e\00f\00f")
 (data $18 (i32.const 3436) "\\")
 (data $18.1 (i32.const 3448) "\02\00\00\00H\00\00\000\001\002\003\004\005\006\007\008\009\00a\00b\00c\00d\00e\00f\00g\00h\00i\00j\00k\00l\00m\00n\00o\00p\00q\00r\00s\00t\00u\00v\00w\00x\00y\00z")
 (data $19 (i32.const 3532) "\1c")
 (data $19.1 (i32.const 3544) "\02")
 (data $20 (i32.const 3564) "<")
 (data $20.1 (i32.const 3576) "\02\00\00\00\"\00\00\00a\00s\00s\00e\00m\00b\00l\00y\00/\00i\00n\00d\00e\00x\00.\00t\00s")
 (data $21 (i32.const 3628) "l")
 (data $21.1 (i32.const 3640) "\02\00\00\00R\00\00\00[\00f\00i\00n\00d\00P\00a\00t\00h\00]\00 \00F\00a\00i\00l\00e\00d\00 \00r\00e\00q\00u\00i\00r\00e\00m\00e\00n\00t\00.\00 \00s\00r\00c\00X\00 \00w\00a\00s\00:\00 ")
 (data $22 (i32.const 3740) ",")
 (data $22.1 (i32.const 3752) "\02\00\00\00\18\00\00\00,\00 \00s\00r\00c\00Z\00 \00w\00a\00s\00:\00 ")
 (data $23 (i32.const 3788) "\1c")
 (data $23.1 (i32.const 3800) "\02\00\00\00\02\00\00\00.")
 (data $24 (i32.const 3820) ",\00\00\00\03\00\00\00\00\00\00\00\12\00\00\00\14\00\00\00@\0e\00\00\00\00\00\00\b0\0e\00\00\00\00\00\00\e0\0e")
 (data $25 (i32.const 3868) "<")
 (data $25.1 (i32.const 3880) "\02\00\00\00,\00\00\00a\00s\00s\00e\00m\00b\00l\00y\00/\00P\00a\00t\00h\00F\00i\00n\00d\00e\00r\00.\00t\00s")
 (data $26 (i32.const 3932) "l")
 (data $26.1 (i32.const 3944) "\02\00\00\00R\00\00\00[\00f\00i\00n\00d\00P\00a\00t\00h\00]\00F\00a\00i\00l\00e\00d\00 \00r\00e\00q\00u\00i\00r\00e\00m\00e\00n\00t\00.\00 \00d\00e\00s\00t\00X\00 \00w\00a\00s\00:\00 ")
 (data $27 (i32.const 4044) ",")
 (data $27.1 (i32.const 4056) "\02\00\00\00\1a\00\00\00,\00 \00d\00e\00s\00t\00Z\00 \00w\00a\00s\00:\00 ")
 (data $28 (i32.const 4092) ",\00\00\00\03\00\00\00\00\00\00\00\12\00\00\00\14\00\00\00p\0f\00\00\00\00\00\00\e0\0f\00\00\00\00\00\00\e0\0e")
 (data $29 (i32.const 4140) "l")
 (data $29.1 (i32.const 4152) "\02\00\00\00R\00\00\00[\00f\00i\00n\00d\00P\00a\00t\00h\00]\00F\00a\00i\00l\00e\00d\00 \00r\00e\00q\00u\00i\00r\00e\00m\00e\00n\00t\00.\00 \00l\00e\00v\00e\00l\00 \00w\00a\00s\00:\00 ")
 (data $30 (i32.const 4252) ",")
 (data $30.1 (i32.const 4264) "\02\00\00\00\1c\00\00\00.\00 \00m\00u\00s\00t\00 \00b\00e\00 \000\00-\003\00.")
 (data $31 (i32.const 4300) "\1c\00\00\00\03\00\00\00\00\00\00\00\12\00\00\00\0c\00\00\00@\10\00\00\00\00\00\00\b0\10")
 (data $32 (i32.const 4332) "<")
 (data $32.1 (i32.const 4344) "\02\00\00\00&\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00b\00u\00f\00f\00e\00r\00.\00t\00s")
 (data $33 (i32.const 4396) "\1c")
 (data $33.1 (i32.const 4408) "\01")
 (data $34 (i32.const 4428) ",")
 (data $34.1 (i32.const 4440) "\02\00\00\00\1c\00\00\00A\00r\00r\00a\00y\00 \00i\00s\00 \00e\00m\00p\00t\00y")
 (data $35 (i32.const 4476) ",")
 (data $35.1 (i32.const 4488) "\02\00\00\00\1a\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00.\00t\00s")
 (data $36 (i32.const 4524) "<")
 (data $36.1 (i32.const 4536) "\02\00\00\00$\00\00\00~\00l\00i\00b\00/\00t\00y\00p\00e\00d\00a\00r\00r\00a\00y\00.\00t\00s")
 (data $37 (i32.const 4588) "\8c")
 (data $37.1 (i32.const 4600) "\02\00\00\00n\00\00\00[\00c\00a\00n\00T\00r\00a\00v\00e\00l\00]\00 \00F\00a\00i\00l\00e\00d\00 \00r\00e\00q\00u\00i\00r\00e\00m\00e\00n\00t\00.\00 \00c\00o\00l\00l\00i\00s\00i\00o\00n\00S\00t\00r\00a\00t\00e\00g\00y\00 \00w\00a\00s\00:\00 ")
 (data $38 (i32.const 4732) "\1c\00\00\00\03\00\00\00\00\00\00\00\12\00\00\00\0c\00\00\00\00\12\00\00\00\00\00\00\a0\06")
 (data $39 (i32.const 4764) "L")
 (data $39.1 (i32.const 4776) "\02\00\00\00<\00\00\00I\00n\00v\00a\00l\00i\00d\00 \00o\00f\00f\00s\00e\00t\00s\00:\00 \00o\00f\00f\00s\00e\00t\00X\00 \00w\00a\00s\00:\00 ")
 (data $40 (i32.const 4844) "<")
 (data $40.1 (i32.const 4856) "\02\00\00\00\1e\00\00\00,\00 \00o\00f\00f\00s\00e\00t\00Z\00 \00w\00a\00s\00:\00 ")
 (data $41 (i32.const 4908) ",\00\00\00\03\00\00\00\00\00\00\00\12\00\00\00\10\00\00\00\b0\12\00\00\00\00\00\00\00\13")
 (data $42 (i32.const 4956) "L")
 (data $42.1 (i32.const 4968) "\02\00\00\002\00\00\00a\00s\00s\00e\00m\00b\00l\00y\00/\00S\00t\00e\00p\00V\00a\00l\00i\00d\00a\00t\00o\00r\00.\00t\00s")
 (data $43 (i32.const 5036) "\1c")
 (data $43.1 (i32.const 5048) "\01")
 (data $44 (i32.const 5072) "\14\00\00\00 \00\00\00 \00\00\00 \00\00\00\00\00\00\00 \00\00\00 \00\00\00 \00\00\00 \00\00\00 \00\00\00 \00\00\00\00\00\00\00$\t\00\00\04a")
 (data $44.1 (i32.const 5144) "\01\t\00\00\04A\00\00\02\t")
 (export "findPath" (func $assembly/index/findPath@varargs))
 (export "changeFloor" (func $assembly/index/changeFloor))
 (export "changeLoc" (func $assembly/index/changeLoc))
 (export "changeNpc" (func $assembly/index/changeNpc))
 (export "changePlayer" (func $assembly/index/changePlayer))
 (export "changeRoof" (func $assembly/index/changeRoof))
 (export "changeWall" (func $assembly/index/changeWall))
 (export "allocateIfAbsent" (func $assembly/index/allocateIfAbsent))
 (export "isFlagged" (func $assembly/index/isFlagged))
 (export "canTravel" (func $assembly/index/canTravel@varargs))
 (export "hasLineOfSight" (func $assembly/index/hasLineOfSight@varargs))
 (export "hasLineOfWalk" (func $assembly/index/hasLineOfWalk@varargs))
 (export "lineOfSight" (func $assembly/index/lineOfSight@varargs))
 (export "lineOfWalk" (func $assembly/index/lineOfWalk@varargs))
 (export "reached" (func $assembly/index/reached@varargs))
 (export "CollisionFlag.NULL" (global $assembly/flag/CollisionFlag/CollisionFlag.NULL))
 (export "CollisionFlag.OPEN" (global $assembly/flag/CollisionFlag/CollisionFlag.OPEN))
 (export "CollisionFlag.WALL_NORTH_WEST" (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_NORTH_WEST))
 (export "CollisionFlag.WALL_NORTH" (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_NORTH))
 (export "CollisionFlag.WALL_NORTH_EAST" (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_NORTH_EAST))
 (export "CollisionFlag.WALL_EAST" (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_EAST))
 (export "CollisionFlag.WALL_SOUTH_EAST" (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_SOUTH_EAST))
 (export "CollisionFlag.WALL_SOUTH" (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_SOUTH))
 (export "CollisionFlag.WALL_SOUTH_WEST" (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_SOUTH_WEST))
 (export "CollisionFlag.WALL_WEST" (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_WEST))
 (export "CollisionFlag.LOC" (global $assembly/flag/CollisionFlag/CollisionFlag.LOC))
 (export "CollisionFlag.WALL_NORTH_WEST_PROJ_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_NORTH_WEST_PROJ_BLOCKER))
 (export "CollisionFlag.WALL_NORTH_PROJ_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_NORTH_PROJ_BLOCKER))
 (export "CollisionFlag.WALL_NORTH_EAST_PROJ_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_NORTH_EAST_PROJ_BLOCKER))
 (export "CollisionFlag.WALL_EAST_PROJ_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_EAST_PROJ_BLOCKER))
 (export "CollisionFlag.WALL_SOUTH_EAST_PROJ_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_SOUTH_EAST_PROJ_BLOCKER))
 (export "CollisionFlag.WALL_SOUTH_PROJ_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_SOUTH_PROJ_BLOCKER))
 (export "CollisionFlag.WALL_SOUTH_WEST_PROJ_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_SOUTH_WEST_PROJ_BLOCKER))
 (export "CollisionFlag.WALL_WEST_PROJ_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_WEST_PROJ_BLOCKER))
 (export "CollisionFlag.LOC_PROJ_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.LOC_PROJ_BLOCKER))
 (export "CollisionFlag.FLOOR_DECORATION" (global $assembly/flag/CollisionFlag/CollisionFlag.FLOOR_DECORATION))
 (export "CollisionFlag.NPC" (global $assembly/flag/CollisionFlag/CollisionFlag.NPC))
 (export "CollisionFlag.PLAYER" (global $assembly/flag/CollisionFlag/CollisionFlag.PLAYER))
 (export "CollisionFlag.FLOOR" (global $assembly/flag/CollisionFlag/CollisionFlag.FLOOR))
 (export "CollisionFlag.WALL_NORTH_WEST_ROUTE_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_NORTH_WEST_ROUTE_BLOCKER))
 (export "CollisionFlag.WALL_NORTH_ROUTE_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_NORTH_ROUTE_BLOCKER))
 (export "CollisionFlag.WALL_NORTH_EAST_ROUTE_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_NORTH_EAST_ROUTE_BLOCKER))
 (export "CollisionFlag.WALL_EAST_ROUTE_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_EAST_ROUTE_BLOCKER))
 (export "CollisionFlag.WALL_SOUTH_EAST_ROUTE_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_SOUTH_EAST_ROUTE_BLOCKER))
 (export "CollisionFlag.WALL_SOUTH_ROUTE_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_SOUTH_ROUTE_BLOCKER))
 (export "CollisionFlag.WALL_SOUTH_WEST_ROUTE_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_SOUTH_WEST_ROUTE_BLOCKER))
 (export "CollisionFlag.WALL_WEST_ROUTE_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.WALL_WEST_ROUTE_BLOCKER))
 (export "CollisionFlag.LOC_ROUTE_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.LOC_ROUTE_BLOCKER))
 (export "CollisionFlag.ROOF" (global $assembly/flag/CollisionFlag/CollisionFlag.ROOF))
 (export "CollisionFlag.FLOOR_BLOCKED" (global $assembly/flag/CollisionFlag/CollisionFlag.FLOOR_BLOCKED))
 (export "CollisionFlag.WALK_BLOCKED" (global $assembly/flag/CollisionFlag/CollisionFlag.WALK_BLOCKED))
 (export "CollisionFlag.BLOCK_WEST" (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_WEST))
 (export "CollisionFlag.BLOCK_EAST" (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_EAST))
 (export "CollisionFlag.BLOCK_SOUTH" (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_SOUTH))
 (export "CollisionFlag.BLOCK_NORTH" (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_NORTH))
 (export "CollisionFlag.BLOCK_SOUTH_WEST" (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_SOUTH_WEST))
 (export "CollisionFlag.BLOCK_SOUTH_EAST" (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_SOUTH_EAST))
 (export "CollisionFlag.BLOCK_NORTH_WEST" (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_NORTH_WEST))
 (export "CollisionFlag.BLOCK_NORTH_EAST" (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_NORTH_EAST))
 (export "CollisionFlag.BLOCK_NORTH_AND_SOUTH_EAST" (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_NORTH_AND_SOUTH_EAST))
 (export "CollisionFlag.BLOCK_NORTH_AND_SOUTH_WEST" (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_NORTH_AND_SOUTH_WEST))
 (export "CollisionFlag.BLOCK_NORTH_EAST_AND_WEST" (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_NORTH_EAST_AND_WEST))
 (export "CollisionFlag.BLOCK_SOUTH_EAST_AND_WEST" (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_SOUTH_EAST_AND_WEST))
 (export "CollisionFlag.BLOCK_WEST_ROUTE_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_WEST_ROUTE_BLOCKER))
 (export "CollisionFlag.BLOCK_EAST_ROUTE_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_EAST_ROUTE_BLOCKER))
 (export "CollisionFlag.BLOCK_SOUTH_ROUTE_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_SOUTH_ROUTE_BLOCKER))
 (export "CollisionFlag.BLOCK_NORTH_ROUTE_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_NORTH_ROUTE_BLOCKER))
 (export "CollisionFlag.BLOCK_SOUTH_WEST_ROUTE_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_SOUTH_WEST_ROUTE_BLOCKER))
 (export "CollisionFlag.BLOCK_SOUTH_EAST_ROUTE_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_SOUTH_EAST_ROUTE_BLOCKER))
 (export "CollisionFlag.BLOCK_NORTH_WEST_ROUTE_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_NORTH_WEST_ROUTE_BLOCKER))
 (export "CollisionFlag.BLOCK_NORTH_EAST_ROUTE_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_NORTH_EAST_ROUTE_BLOCKER))
 (export "CollisionFlag.BLOCK_NORTH_AND_SOUTH_EAST_ROUTE_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_NORTH_AND_SOUTH_EAST_ROUTE_BLOCKER))
 (export "CollisionFlag.BLOCK_NORTH_AND_SOUTH_WEST_ROUTE_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_NORTH_AND_SOUTH_WEST_ROUTE_BLOCKER))
 (export "CollisionFlag.BLOCK_NORTH_EAST_AND_WEST_ROUTE_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_NORTH_EAST_AND_WEST_ROUTE_BLOCKER))
 (export "CollisionFlag.BLOCK_SOUTH_EAST_AND_WEST_ROUTE_BLOCKER" (global $assembly/flag/CollisionFlag/CollisionFlag.BLOCK_SOUTH_EAST_AND_WEST_ROUTE_BLOCKER))
 (export "LocShape.WALL_STRAIGHT" (global $assembly/LocShape/LocShape.WALL_STRAIGHT))
 (export "LocShape.WALL_DIAGONAL_CORNER" (global $assembly/LocShape/LocShape.WALL_DIAGONAL_CORNER))
 (export "LocShape.WALL_L" (global $assembly/LocShape/LocShape.WALL_L))
 (export "LocShape.WALL_SQUARE_CORNER" (global $assembly/LocShape/LocShape.WALL_SQUARE_CORNER))
 (export "LocShape.WALLDECOR_STRAIGHT_NOOFFSET" (global $assembly/LocShape/LocShape.WALLDECOR_STRAIGHT_NOOFFSET))
 (export "LocShape.WALLDECOR_STRAIGHT_OFFSET" (global $assembly/LocShape/LocShape.WALLDECOR_STRAIGHT_OFFSET))
 (export "LocShape.WALLDECOR_DIAGONAL_OFFSET" (global $assembly/LocShape/LocShape.WALLDECOR_DIAGONAL_OFFSET))
 (export "LocShape.WALLDECOR_DIAGONAL_NOOFFSET" (global $assembly/LocShape/LocShape.WALLDECOR_DIAGONAL_NOOFFSET))
 (export "LocShape.WALLDECOR_DIAGONAL_BOTH" (global $assembly/LocShape/LocShape.WALLDECOR_DIAGONAL_BOTH))
 (export "LocShape.WALL_DIAGONAL" (global $assembly/LocShape/LocShape.WALL_DIAGONAL))
 (export "LocShape.CENTREPIECE_STRAIGHT" (global $assembly/LocShape/LocShape.CENTREPIECE_STRAIGHT))
 (export "LocShape.CENTREPIECE_DIAGONAL" (global $assembly/LocShape/LocShape.CENTREPIECE_DIAGONAL))
 (export "LocShape.ROOF_STRAIGHT" (global $assembly/LocShape/LocShape.ROOF_STRAIGHT))
 (export "LocShape.ROOF_DIAGONAL_WITH_ROOFEDGE" (global $assembly/LocShape/LocShape.ROOF_DIAGONAL_WITH_ROOFEDGE))
 (export "LocShape.ROOF_DIAGONAL" (global $assembly/LocShape/LocShape.ROOF_DIAGONAL))
 (export "LocShape.ROOF_L_CONCAVE" (global $assembly/LocShape/LocShape.ROOF_L_CONCAVE))
 (export "LocShape.ROOF_L_CONVEX" (global $assembly/LocShape/LocShape.ROOF_L_CONVEX))
 (export "LocShape.ROOF_FLAT" (global $assembly/LocShape/LocShape.ROOF_FLAT))
 (export "LocShape.ROOFEDGE_STRAIGHT" (global $assembly/LocShape/LocShape.ROOFEDGE_STRAIGHT))
 (export "LocShape.ROOFEDGE_DIAGONAL_CORNER" (global $assembly/LocShape/LocShape.ROOFEDGE_DIAGONAL_CORNER))
 (export "LocShape.ROOFEDGE_L" (global $assembly/LocShape/LocShape.ROOFEDGE_L))
 (export "LocShape.ROOFEDGE_SQUARE_CORNER" (global $assembly/LocShape/LocShape.ROOFEDGE_SQUARE_CORNER))
 (export "LocShape.GROUND_DECOR" (global $assembly/LocShape/LocShape.GROUND_DECOR))
 (export "LocAngle.WEST" (global $assembly/LocAngle/LocAngle.WEST))
 (export "LocAngle.NORTH" (global $assembly/LocAngle/LocAngle.NORTH))
 (export "LocAngle.EAST" (global $assembly/LocAngle/LocAngle.EAST))
 (export "LocAngle.SOUTH" (global $assembly/LocAngle/LocAngle.SOUTH))
 (export "CollisionType.NORMAL" (global $assembly/collision/CollisionStrategy/CollisionType.NORMAL))
 (export "CollisionType.BLOCKED" (global $assembly/collision/CollisionStrategy/CollisionType.BLOCKED))
 (export "CollisionType.INDOORS" (global $assembly/collision/CollisionStrategy/CollisionType.INDOORS))
 (export "CollisionType.OUTDOORS" (global $assembly/collision/CollisionStrategy/CollisionType.OUTDOORS))
 (export "CollisionType.LINE_OF_SIGHT" (global $assembly/collision/CollisionStrategy/CollisionType.LINE_OF_SIGHT))
 (export "memory" (memory $0))
 (export "__setArgumentsLength" (func $~setArgumentsLength))
 (start $~start)
 (func $~lib/rt/itcms/visitRoots
  (local $0 i32)
  (local $1 i32)
  global.get $assembly/index/flags
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/index/pathfinder
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/index/stepValidator
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/index/lineValidator
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/index/linePathFinder
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/collision/CollisionStrategies/CollisionStrategies.NORMAL
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/collision/CollisionStrategies/CollisionStrategies.BLOCKED
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/collision/CollisionStrategies/CollisionStrategies.INDOORS
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/collision/CollisionStrategies/CollisionStrategies.OUTDOORS
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/collision/CollisionStrategies/CollisionStrategies.LINE_OF_SIGHT
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  i32.const 1248
  call $~lib/rt/itcms/__visit
  i32.const 1456
  call $~lib/rt/itcms/__visit
  i32.const 4448
  call $~lib/rt/itcms/__visit
  i32.const 1056
  call $~lib/rt/itcms/__visit
  i32.const 2400
  call $~lib/rt/itcms/__visit
  i32.const 3456
  call $~lib/rt/itcms/__visit
  global.get $~lib/rt/itcms/pinSpace
  local.tee $1
  i32.load offset=4
  i32.const -4
  i32.and
  local.set $0
  loop $while-continue|0
   local.get $0
   local.get $1
   i32.ne
   if
    local.get $0
    i32.load offset=4
    i32.const 3
    i32.and
    i32.const 3
    i32.ne
    if
     i32.const 0
     i32.const 1120
     i32.const 160
     i32.const 16
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.const 20
    i32.add
    call $~lib/rt/__visit_members
    local.get $0
    i32.load offset=4
    i32.const -4
    i32.and
    local.set $0
    br $while-continue|0
   end
  end
 )
 (func $~lib/rt/itcms/Object#makeGray (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  global.get $~lib/rt/itcms/iter
  i32.eq
  if
   local.get $0
   i32.load offset=8
   local.tee $1
   i32.eqz
   if
    i32.const 0
    i32.const 1120
    i32.const 148
    i32.const 30
    call $~lib/builtins/abort
    unreachable
   end
   local.get $1
   global.set $~lib/rt/itcms/iter
  end
  block $__inlined_func$~lib/rt/itcms/Object#unlink$749
   local.get $0
   i32.load offset=4
   i32.const -4
   i32.and
   local.tee $1
   i32.eqz
   if
    local.get $0
    i32.load offset=8
    i32.eqz
    local.get $0
    i32.const 37924
    i32.lt_u
    i32.and
    i32.eqz
    if
     i32.const 0
     i32.const 1120
     i32.const 128
     i32.const 18
     call $~lib/builtins/abort
     unreachable
    end
    br $__inlined_func$~lib/rt/itcms/Object#unlink$749
   end
   local.get $0
   i32.load offset=8
   local.tee $2
   i32.eqz
   if
    i32.const 0
    i32.const 1120
    i32.const 132
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
   local.get $1
   local.get $2
   i32.store offset=8
   local.get $2
   local.get $1
   local.get $2
   i32.load offset=4
   i32.const 3
   i32.and
   i32.or
   i32.store offset=4
  end
  global.get $~lib/rt/itcms/toSpace
  local.set $2
  local.get $0
  i32.load offset=12
  local.tee $1
  i32.const 2
  i32.le_u
  if (result i32)
   i32.const 1
  else
   local.get $1
   i32.const 5072
   i32.load
   i32.gt_u
   if
    i32.const 1248
    i32.const 1312
    i32.const 21
    i32.const 28
    call $~lib/builtins/abort
    unreachable
   end
   local.get $1
   i32.const 2
   i32.shl
   i32.const 5076
   i32.add
   i32.load
   i32.const 32
   i32.and
  end
  local.set $3
  local.get $2
  i32.load offset=8
  local.set $1
  local.get $0
  global.get $~lib/rt/itcms/white
  i32.eqz
  i32.const 2
  local.get $3
  select
  local.get $2
  i32.or
  i32.store offset=4
  local.get $0
  local.get $1
  i32.store offset=8
  local.get $1
  local.get $0
  local.get $1
  i32.load offset=4
  i32.const 3
  i32.and
  i32.or
  i32.store offset=4
  local.get $2
  local.get $0
  i32.store offset=8
 )
 (func $~lib/rt/itcms/__visit (param $0 i32)
  local.get $0
  i32.eqz
  if
   return
  end
  global.get $~lib/rt/itcms/white
  local.get $0
  i32.const 20
  i32.sub
  local.tee $0
  i32.load offset=4
  i32.const 3
  i32.and
  i32.eq
  if
   local.get $0
   call $~lib/rt/itcms/Object#makeGray
   global.get $~lib/rt/itcms/visitCount
   i32.const 1
   i32.add
   global.set $~lib/rt/itcms/visitCount
  end
 )
 (func $~lib/rt/tlsf/removeBlock (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $1
  i32.load
  local.tee $3
  i32.const 1
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1392
   i32.const 268
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $3
  i32.const -4
  i32.and
  local.tee $3
  i32.const 12
  i32.lt_u
  if
   i32.const 0
   i32.const 1392
   i32.const 270
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $3
  i32.const 256
  i32.lt_u
  if (result i32)
   local.get $3
   i32.const 4
   i32.shr_u
  else
   i32.const 31
   i32.const 1073741820
   local.get $3
   local.get $3
   i32.const 1073741820
   i32.ge_u
   select
   local.tee $3
   i32.clz
   i32.sub
   local.tee $4
   i32.const 7
   i32.sub
   local.set $2
   local.get $3
   local.get $4
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
  end
  local.tee $3
  i32.const 16
  i32.lt_u
  local.get $2
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1392
   i32.const 284
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.load offset=8
  local.set $5
  local.get $1
  i32.load offset=4
  local.tee $4
  if
   local.get $4
   local.get $5
   i32.store offset=8
  end
  local.get $5
  if
   local.get $5
   local.get $4
   i32.store offset=4
  end
  local.get $1
  local.get $0
  local.get $2
  i32.const 4
  i32.shl
  local.get $3
  i32.add
  i32.const 2
  i32.shl
  i32.add
  local.tee $1
  i32.load offset=96
  i32.eq
  if
   local.get $1
   local.get $5
   i32.store offset=96
   local.get $5
   i32.eqz
   if
    local.get $0
    local.get $2
    i32.const 2
    i32.shl
    i32.add
    local.tee $1
    i32.load offset=4
    i32.const -2
    local.get $3
    i32.rotl
    i32.and
    local.set $3
    local.get $1
    local.get $3
    i32.store offset=4
    local.get $3
    i32.eqz
    if
     local.get $0
     local.get $0
     i32.load
     i32.const -2
     local.get $2
     i32.rotl
     i32.and
     i32.store
    end
   end
  end
 )
 (func $~lib/rt/tlsf/insertBlock (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $1
  i32.eqz
  if
   i32.const 0
   i32.const 1392
   i32.const 201
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.load
  local.tee $3
  i32.const 1
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1392
   i32.const 203
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.const 4
  i32.add
  local.get $1
  i32.load
  i32.const -4
  i32.and
  i32.add
  local.tee $4
  i32.load
  local.tee $2
  i32.const 1
  i32.and
  if
   local.get $0
   local.get $4
   call $~lib/rt/tlsf/removeBlock
   local.get $1
   local.get $3
   i32.const 4
   i32.add
   local.get $2
   i32.const -4
   i32.and
   i32.add
   local.tee $3
   i32.store
   local.get $1
   i32.const 4
   i32.add
   local.get $1
   i32.load
   i32.const -4
   i32.and
   i32.add
   local.tee $4
   i32.load
   local.set $2
  end
  local.get $3
  i32.const 2
  i32.and
  if
   local.get $1
   i32.const 4
   i32.sub
   i32.load
   local.tee $1
   i32.load
   local.tee $6
   i32.const 1
   i32.and
   i32.eqz
   if
    i32.const 0
    i32.const 1392
    i32.const 221
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
   local.get $0
   local.get $1
   call $~lib/rt/tlsf/removeBlock
   local.get $1
   local.get $6
   i32.const 4
   i32.add
   local.get $3
   i32.const -4
   i32.and
   i32.add
   local.tee $3
   i32.store
  end
  local.get $4
  local.get $2
  i32.const 2
  i32.or
  i32.store
  local.get $3
  i32.const -4
  i32.and
  local.tee $2
  i32.const 12
  i32.lt_u
  if
   i32.const 0
   i32.const 1392
   i32.const 233
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $4
  local.get $1
  i32.const 4
  i32.add
  local.get $2
  i32.add
  i32.ne
  if
   i32.const 0
   i32.const 1392
   i32.const 234
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $4
  i32.const 4
  i32.sub
  local.get $1
  i32.store
  local.get $2
  i32.const 256
  i32.lt_u
  if (result i32)
   local.get $2
   i32.const 4
   i32.shr_u
  else
   i32.const 31
   i32.const 1073741820
   local.get $2
   local.get $2
   i32.const 1073741820
   i32.ge_u
   select
   local.tee $2
   i32.clz
   i32.sub
   local.tee $3
   i32.const 7
   i32.sub
   local.set $5
   local.get $2
   local.get $3
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
  end
  local.tee $2
  i32.const 16
  i32.lt_u
  local.get $5
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1392
   i32.const 251
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $5
  i32.const 4
  i32.shl
  local.get $2
  i32.add
  i32.const 2
  i32.shl
  i32.add
  i32.load offset=96
  local.set $3
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  local.get $3
  i32.store offset=8
  local.get $3
  if
   local.get $3
   local.get $1
   i32.store offset=4
  end
  local.get $0
  local.get $5
  i32.const 4
  i32.shl
  local.get $2
  i32.add
  i32.const 2
  i32.shl
  i32.add
  local.get $1
  i32.store offset=96
  local.get $0
  local.get $0
  i32.load
  i32.const 1
  local.get $5
  i32.shl
  i32.or
  i32.store
  local.get $0
  local.get $5
  i32.const 2
  i32.shl
  i32.add
  local.tee $0
  local.get $0
  i32.load offset=4
  i32.const 1
  local.get $2
  i32.shl
  i32.or
  i32.store offset=4
 )
 (func $~lib/rt/tlsf/addMemory (param $0 i32) (param $1 i32) (param $2 i64)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $2
  local.get $1
  i64.extend_i32_u
  i64.lt_u
  if
   i32.const 0
   i32.const 1392
   i32.const 382
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.const 19
  i32.add
  i32.const -16
  i32.and
  i32.const 4
  i32.sub
  local.set $1
  local.get $0
  i32.load offset=1568
  local.tee $3
  if
   local.get $3
   i32.const 4
   i32.add
   local.get $1
   i32.gt_u
   if
    i32.const 0
    i32.const 1392
    i32.const 389
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
   local.get $3
   local.get $1
   i32.const 16
   i32.sub
   local.tee $5
   i32.eq
   if
    local.get $3
    i32.load
    local.set $4
    local.get $5
    local.set $1
   end
  else
   local.get $0
   i32.const 1572
   i32.add
   local.get $1
   i32.gt_u
   if
    i32.const 0
    i32.const 1392
    i32.const 402
    i32.const 5
    call $~lib/builtins/abort
    unreachable
   end
  end
  local.get $2
  i32.wrap_i64
  i32.const -16
  i32.and
  local.get $1
  i32.sub
  local.tee $3
  i32.const 20
  i32.lt_u
  if
   return
  end
  local.get $1
  local.get $4
  i32.const 2
  i32.and
  local.get $3
  i32.const 8
  i32.sub
  local.tee $3
  i32.const 1
  i32.or
  i32.or
  i32.store
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=8
  local.get $1
  i32.const 4
  i32.add
  local.get $3
  i32.add
  local.tee $3
  i32.const 2
  i32.store
  local.get $0
  local.get $3
  i32.store offset=1568
  local.get $0
  local.get $1
  call $~lib/rt/tlsf/insertBlock
 )
 (func $~lib/rt/tlsf/initialize
  (local $0 i32)
  (local $1 i32)
  memory.size
  local.tee $1
  i32.const 0
  i32.le_s
  if (result i32)
   i32.const 1
   local.get $1
   i32.sub
   memory.grow
   i32.const 0
   i32.lt_s
  else
   i32.const 0
  end
  if
   unreachable
  end
  i32.const 37936
  i32.const 0
  i32.store
  i32.const 39504
  i32.const 0
  i32.store
  loop $for-loop|0
   local.get $0
   i32.const 23
   i32.lt_u
   if
    local.get $0
    i32.const 2
    i32.shl
    i32.const 37936
    i32.add
    i32.const 0
    i32.store offset=4
    i32.const 0
    local.set $1
    loop $for-loop|1
     local.get $1
     i32.const 16
     i32.lt_u
     if
      local.get $0
      i32.const 4
      i32.shl
      local.get $1
      i32.add
      i32.const 2
      i32.shl
      i32.const 37936
      i32.add
      i32.const 0
      i32.store offset=96
      local.get $1
      i32.const 1
      i32.add
      local.set $1
      br $for-loop|1
     end
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  i32.const 37936
  i32.const 39508
  memory.size
  i64.extend_i32_s
  i64.const 16
  i64.shl
  call $~lib/rt/tlsf/addMemory
  i32.const 37936
  global.set $~lib/rt/tlsf/ROOT
 )
 (func $~lib/rt/itcms/step (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  block $break|0
   block $case2|0
    block $case1|0
     block $case0|0
      global.get $~lib/rt/itcms/state
      br_table $case0|0 $case1|0 $case2|0 $break|0
     end
     i32.const 1
     global.set $~lib/rt/itcms/state
     i32.const 0
     global.set $~lib/rt/itcms/visitCount
     call $~lib/rt/itcms/visitRoots
     global.get $~lib/rt/itcms/toSpace
     global.set $~lib/rt/itcms/iter
     global.get $~lib/rt/itcms/visitCount
     return
    end
    global.get $~lib/rt/itcms/white
    i32.eqz
    local.set $1
    global.get $~lib/rt/itcms/iter
    i32.load offset=4
    i32.const -4
    i32.and
    local.set $0
    loop $while-continue|1
     local.get $0
     global.get $~lib/rt/itcms/toSpace
     i32.ne
     if
      local.get $0
      global.set $~lib/rt/itcms/iter
      local.get $1
      local.get $0
      i32.load offset=4
      local.tee $2
      i32.const 3
      i32.and
      i32.ne
      if
       local.get $0
       local.get $2
       i32.const -4
       i32.and
       local.get $1
       i32.or
       i32.store offset=4
       i32.const 0
       global.set $~lib/rt/itcms/visitCount
       local.get $0
       i32.const 20
       i32.add
       call $~lib/rt/__visit_members
       global.get $~lib/rt/itcms/visitCount
       return
      end
      local.get $0
      i32.load offset=4
      i32.const -4
      i32.and
      local.set $0
      br $while-continue|1
     end
    end
    i32.const 0
    global.set $~lib/rt/itcms/visitCount
    call $~lib/rt/itcms/visitRoots
    global.get $~lib/rt/itcms/toSpace
    global.get $~lib/rt/itcms/iter
    i32.load offset=4
    i32.const -4
    i32.and
    i32.eq
    if
     global.get $~lib/memory/__stack_pointer
     local.set $0
     loop $while-continue|0
      local.get $0
      i32.const 37924
      i32.lt_u
      if
       local.get $0
       i32.load
       call $~lib/rt/itcms/__visit
       local.get $0
       i32.const 4
       i32.add
       local.set $0
       br $while-continue|0
      end
     end
     global.get $~lib/rt/itcms/iter
     i32.load offset=4
     i32.const -4
     i32.and
     local.set $0
     loop $while-continue|2
      local.get $0
      global.get $~lib/rt/itcms/toSpace
      i32.ne
      if
       local.get $1
       local.get $0
       i32.load offset=4
       local.tee $2
       i32.const 3
       i32.and
       i32.ne
       if
        local.get $0
        local.get $2
        i32.const -4
        i32.and
        local.get $1
        i32.or
        i32.store offset=4
        local.get $0
        i32.const 20
        i32.add
        call $~lib/rt/__visit_members
       end
       local.get $0
       i32.load offset=4
       i32.const -4
       i32.and
       local.set $0
       br $while-continue|2
      end
     end
     global.get $~lib/rt/itcms/fromSpace
     local.set $0
     global.get $~lib/rt/itcms/toSpace
     global.set $~lib/rt/itcms/fromSpace
     local.get $0
     global.set $~lib/rt/itcms/toSpace
     local.get $1
     global.set $~lib/rt/itcms/white
     local.get $0
     i32.load offset=4
     i32.const -4
     i32.and
     global.set $~lib/rt/itcms/iter
     i32.const 2
     global.set $~lib/rt/itcms/state
    end
    global.get $~lib/rt/itcms/visitCount
    return
   end
   global.get $~lib/rt/itcms/iter
   local.tee $0
   global.get $~lib/rt/itcms/toSpace
   i32.ne
   if
    local.get $0
    i32.load offset=4
    local.tee $1
    i32.const -4
    i32.and
    global.set $~lib/rt/itcms/iter
    global.get $~lib/rt/itcms/white
    i32.eqz
    local.get $1
    i32.const 3
    i32.and
    i32.ne
    if
     i32.const 0
     i32.const 1120
     i32.const 229
     i32.const 20
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.const 37924
    i32.lt_u
    if
     local.get $0
     i32.const 0
     i32.store offset=4
     local.get $0
     i32.const 0
     i32.store offset=8
    else
     global.get $~lib/rt/itcms/total
     local.get $0
     i32.load
     i32.const -4
     i32.and
     i32.const 4
     i32.add
     i32.sub
     global.set $~lib/rt/itcms/total
     local.get $0
     i32.const 4
     i32.add
     local.tee $0
     i32.const 37924
     i32.ge_u
     if
      global.get $~lib/rt/tlsf/ROOT
      i32.eqz
      if
       call $~lib/rt/tlsf/initialize
      end
      global.get $~lib/rt/tlsf/ROOT
      local.set $1
      local.get $0
      i32.const 4
      i32.sub
      local.set $2
      local.get $0
      i32.const 15
      i32.and
      i32.const 1
      local.get $0
      select
      if (result i32)
       i32.const 1
      else
       local.get $2
       i32.load
       i32.const 1
       i32.and
      end
      if
       i32.const 0
       i32.const 1392
       i32.const 562
       i32.const 3
       call $~lib/builtins/abort
       unreachable
      end
      local.get $2
      local.get $2
      i32.load
      i32.const 1
      i32.or
      i32.store
      local.get $1
      local.get $2
      call $~lib/rt/tlsf/insertBlock
     end
    end
    i32.const 10
    return
   end
   global.get $~lib/rt/itcms/toSpace
   global.get $~lib/rt/itcms/toSpace
   i32.store offset=4
   global.get $~lib/rt/itcms/toSpace
   global.get $~lib/rt/itcms/toSpace
   i32.store offset=8
   i32.const 0
   global.set $~lib/rt/itcms/state
  end
  i32.const 0
 )
 (func $~lib/rt/tlsf/searchBlock (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  local.get $1
  i32.const 256
  i32.lt_u
  if
   local.get $1
   i32.const 4
   i32.shr_u
   local.set $1
  else
   local.get $1
   i32.const 536870910
   i32.lt_u
   if
    local.get $1
    i32.const 1
    i32.const 27
    local.get $1
    i32.clz
    i32.sub
    i32.shl
    i32.add
    i32.const 1
    i32.sub
    local.set $1
   end
   local.get $1
   i32.const 31
   local.get $1
   i32.clz
   i32.sub
   local.tee $2
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
   local.set $1
   local.get $2
   i32.const 7
   i32.sub
   local.set $2
  end
  local.get $1
  i32.const 16
  i32.lt_u
  local.get $2
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1392
   i32.const 334
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $2
  i32.const 2
  i32.shl
  i32.add
  i32.load offset=4
  i32.const -1
  local.get $1
  i32.shl
  i32.and
  local.tee $1
  if (result i32)
   local.get $0
   local.get $1
   i32.ctz
   local.get $2
   i32.const 4
   i32.shl
   i32.add
   i32.const 2
   i32.shl
   i32.add
   i32.load offset=96
  else
   local.get $0
   i32.load
   i32.const -1
   local.get $2
   i32.const 1
   i32.add
   i32.shl
   i32.and
   local.tee $1
   if (result i32)
    local.get $0
    local.get $1
    i32.ctz
    local.tee $1
    i32.const 2
    i32.shl
    i32.add
    i32.load offset=4
    local.tee $2
    i32.eqz
    if
     i32.const 0
     i32.const 1392
     i32.const 347
     i32.const 18
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    local.get $2
    i32.ctz
    local.get $1
    i32.const 4
    i32.shl
    i32.add
    i32.const 2
    i32.shl
    i32.add
    i32.load offset=96
   else
    i32.const 0
   end
  end
 )
 (func $~lib/rt/itcms/__new (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $0
  i32.const 1073741804
  i32.ge_u
  if
   i32.const 1056
   i32.const 1120
   i32.const 261
   i32.const 31
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/rt/itcms/total
  global.get $~lib/rt/itcms/threshold
  i32.ge_u
  if
   block $__inlined_func$~lib/rt/itcms/interrupt$69
    i32.const 2048
    local.set $2
    loop $do-loop|0
     local.get $2
     call $~lib/rt/itcms/step
     i32.sub
     local.set $2
     global.get $~lib/rt/itcms/state
     i32.eqz
     if
      global.get $~lib/rt/itcms/total
      i64.extend_i32_u
      i64.const 200
      i64.mul
      i64.const 100
      i64.div_u
      i32.wrap_i64
      i32.const 1024
      i32.add
      global.set $~lib/rt/itcms/threshold
      br $__inlined_func$~lib/rt/itcms/interrupt$69
     end
     local.get $2
     i32.const 0
     i32.gt_s
     br_if $do-loop|0
    end
    global.get $~lib/rt/itcms/total
    global.get $~lib/rt/itcms/total
    global.get $~lib/rt/itcms/threshold
    i32.sub
    i32.const 1024
    i32.lt_u
    i32.const 10
    i32.shl
    i32.add
    global.set $~lib/rt/itcms/threshold
   end
  end
  global.get $~lib/rt/tlsf/ROOT
  i32.eqz
  if
   call $~lib/rt/tlsf/initialize
  end
  global.get $~lib/rt/tlsf/ROOT
  local.set $4
  local.get $0
  i32.const 16
  i32.add
  local.tee $2
  i32.const 1073741820
  i32.gt_u
  if
   i32.const 1056
   i32.const 1392
   i32.const 461
   i32.const 29
   call $~lib/builtins/abort
   unreachable
  end
  local.get $4
  local.get $2
  i32.const 12
  i32.le_u
  if (result i32)
   i32.const 12
  else
   local.get $2
   i32.const 19
   i32.add
   i32.const -16
   i32.and
   i32.const 4
   i32.sub
  end
  local.tee $5
  call $~lib/rt/tlsf/searchBlock
  local.tee $2
  i32.eqz
  if
   memory.size
   local.tee $2
   local.get $5
   i32.const 256
   i32.ge_u
   if (result i32)
    local.get $5
    i32.const 536870910
    i32.lt_u
    if (result i32)
     local.get $5
     i32.const 1
     i32.const 27
     local.get $5
     i32.clz
     i32.sub
     i32.shl
     i32.add
     i32.const 1
     i32.sub
    else
     local.get $5
    end
   else
    local.get $5
   end
   i32.const 4
   local.get $4
   i32.load offset=1568
   local.get $2
   i32.const 16
   i32.shl
   i32.const 4
   i32.sub
   i32.ne
   i32.shl
   i32.add
   i32.const 65535
   i32.add
   i32.const -65536
   i32.and
   i32.const 16
   i32.shr_u
   local.tee $3
   local.get $2
   local.get $3
   i32.gt_s
   select
   memory.grow
   i32.const 0
   i32.lt_s
   if
    local.get $3
    memory.grow
    i32.const 0
    i32.lt_s
    if
     unreachable
    end
   end
   local.get $4
   local.get $2
   i32.const 16
   i32.shl
   memory.size
   i64.extend_i32_s
   i64.const 16
   i64.shl
   call $~lib/rt/tlsf/addMemory
   local.get $4
   local.get $5
   call $~lib/rt/tlsf/searchBlock
   local.tee $2
   i32.eqz
   if
    i32.const 0
    i32.const 1392
    i32.const 499
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
  end
  local.get $5
  local.get $2
  i32.load
  i32.const -4
  i32.and
  i32.gt_u
  if
   i32.const 0
   i32.const 1392
   i32.const 501
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $4
  local.get $2
  call $~lib/rt/tlsf/removeBlock
  local.get $2
  i32.load
  local.set $6
  local.get $5
  i32.const 4
  i32.add
  i32.const 15
  i32.and
  if
   i32.const 0
   i32.const 1392
   i32.const 361
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $6
  i32.const -4
  i32.and
  local.get $5
  i32.sub
  local.tee $3
  i32.const 16
  i32.ge_u
  if
   local.get $2
   local.get $5
   local.get $6
   i32.const 2
   i32.and
   i32.or
   i32.store
   local.get $2
   i32.const 4
   i32.add
   local.get $5
   i32.add
   local.tee $5
   local.get $3
   i32.const 4
   i32.sub
   i32.const 1
   i32.or
   i32.store
   local.get $4
   local.get $5
   call $~lib/rt/tlsf/insertBlock
  else
   local.get $2
   local.get $6
   i32.const -2
   i32.and
   i32.store
   local.get $2
   i32.const 4
   i32.add
   local.get $2
   i32.load
   i32.const -4
   i32.and
   i32.add
   local.tee $3
   local.get $3
   i32.load
   i32.const -3
   i32.and
   i32.store
  end
  local.get $2
  local.get $1
  i32.store offset=12
  local.get $2
  local.get $0
  i32.store offset=16
  global.get $~lib/rt/itcms/fromSpace
  local.tee $1
  i32.load offset=8
  local.set $3
  local.get $2
  local.get $1
  global.get $~lib/rt/itcms/white
  i32.or
  i32.store offset=4
  local.get $2
  local.get $3
  i32.store offset=8
  local.get $3
  local.get $2
  local.get $3
  i32.load offset=4
  i32.const 3
  i32.and
  i32.or
  i32.store offset=4
  local.get $1
  local.get $2
  i32.store offset=8
  global.get $~lib/rt/itcms/total
  local.get $2
  i32.load
  i32.const -4
  i32.and
  i32.const 4
  i32.add
  i32.add
  global.set $~lib/rt/itcms/total
  local.get $2
  i32.const 20
  i32.add
  local.tee $1
  i32.const 0
  local.get $0
  memory.fill
  local.get $1
 )
 (func $~lib/rt/itcms/__link (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  local.get $1
  i32.eqz
  if
   return
  end
  local.get $0
  i32.eqz
  if
   i32.const 0
   i32.const 1120
   i32.const 295
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/rt/itcms/white
  local.get $1
  i32.const 20
  i32.sub
  local.tee $1
  i32.load offset=4
  i32.const 3
  i32.and
  i32.eq
  if
   local.get $0
   i32.const 20
   i32.sub
   local.tee $0
   i32.load offset=4
   i32.const 3
   i32.and
   local.tee $3
   global.get $~lib/rt/itcms/white
   i32.eqz
   i32.eq
   if
    local.get $0
    local.get $1
    local.get $2
    select
    call $~lib/rt/itcms/Object#makeGray
   else
    global.get $~lib/rt/itcms/state
    i32.const 1
    i32.eq
    local.get $3
    i32.const 3
    i32.eq
    i32.and
    if
     local.get $1
     call $~lib/rt/itcms/Object#makeGray
    end
   end
  end
 )
 (func $~lib/number/I32#toString (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $__inlined_func$~lib/util/number/itoa32$80
   local.get $0
   i32.eqz
   if
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    i32.const 1968
    local.set $2
    br $__inlined_func$~lib/util/number/itoa32$80
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   local.get $0
   i32.sub
   local.get $0
   local.get $0
   i32.const 31
   i32.shr_u
   i32.const 1
   i32.shl
   local.tee $3
   select
   local.tee $0
   i32.const 100000
   i32.lt_u
   if (result i32)
    local.get $0
    i32.const 100
    i32.lt_u
    if (result i32)
     local.get $0
     i32.const 10
     i32.ge_u
     i32.const 1
     i32.add
    else
     local.get $0
     i32.const 10000
     i32.ge_u
     i32.const 3
     i32.add
     local.get $0
     i32.const 1000
     i32.ge_u
     i32.add
    end
   else
    local.get $0
    i32.const 10000000
    i32.lt_u
    if (result i32)
     local.get $0
     i32.const 1000000
     i32.ge_u
     i32.const 6
     i32.add
    else
     local.get $0
     i32.const 1000000000
     i32.ge_u
     i32.const 8
     i32.add
     local.get $0
     i32.const 100000000
     i32.ge_u
     i32.add
    end
   end
   local.tee $1
   i32.const 1
   i32.shl
   local.get $3
   i32.add
   i32.const 2
   call $~lib/rt/itcms/__new
   local.tee $2
   i32.store
   local.get $2
   local.get $3
   i32.add
   local.set $5
   loop $while-continue|0
    local.get $0
    i32.const 10000
    i32.ge_u
    if
     local.get $0
     i32.const 10000
     i32.rem_u
     local.set $4
     local.get $0
     i32.const 10000
     i32.div_u
     local.set $0
     local.get $5
     local.get $1
     i32.const 4
     i32.sub
     local.tee $1
     i32.const 1
     i32.shl
     i32.add
     local.get $4
     i32.const 100
     i32.div_u
     i32.const 2
     i32.shl
     i32.const 1980
     i32.add
     i64.load32_u
     local.get $4
     i32.const 100
     i32.rem_u
     i32.const 2
     i32.shl
     i32.const 1980
     i32.add
     i64.load32_u
     i64.const 32
     i64.shl
     i64.or
     i64.store
     br $while-continue|0
    end
   end
   local.get $0
   i32.const 100
   i32.ge_u
   if
    local.get $5
    local.get $1
    i32.const 2
    i32.sub
    local.tee $1
    i32.const 1
    i32.shl
    i32.add
    local.get $0
    i32.const 100
    i32.rem_u
    i32.const 2
    i32.shl
    i32.const 1980
    i32.add
    i32.load
    i32.store
    local.get $0
    i32.const 100
    i32.div_u
    local.set $0
   end
   local.get $0
   i32.const 10
   i32.ge_u
   if
    local.get $5
    local.get $1
    i32.const 2
    i32.sub
    i32.const 1
    i32.shl
    i32.add
    local.get $0
    i32.const 2
    i32.shl
    i32.const 1980
    i32.add
    i32.load
    i32.store
   else
    local.get $5
    local.get $1
    i32.const 1
    i32.sub
    i32.const 1
    i32.shl
    i32.add
    local.get $0
    i32.const 48
    i32.add
    i32.store16
   end
   local.get $3
   if
    local.get $2
    i32.const 45
    i32.store16
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
  end
  local.get $2
 )
 (func $assembly/index/findPath@varargs (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (param $7 i32) (param $8 i32) (param $9 i32) (param $10 i32) (param $11 i32) (param $12 i32) (param $13 i32) (result i32)
  (local $14 i32)
  block $9of9
   block $8of9
    block $7of9
     block $6of9
      block $5of9
       block $4of9
        block $3of9
         block $2of9
          block $1of9
           block $0of9
            block $outOfRange
             global.get $~argumentsLength
             i32.const 5
             i32.sub
             br_table $0of9 $1of9 $2of9 $3of9 $4of9 $5of9 $6of9 $7of9 $8of9 $9of9 $outOfRange
            end
            unreachable
           end
           i32.const 1
           local.set $5
          end
          i32.const 1
          local.set $6
         end
         i32.const 1
         local.set $7
        end
        i32.const 0
        local.set $8
       end
       i32.const -1
       local.set $9
      end
      i32.const 1
      local.set $10
     end
     i32.const 0
     local.set $11
    end
    i32.const 25
    local.set $12
   end
   i32.const 0
   local.set $13
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  local.get $13
  i32.const 4
  i32.le_s
  local.get $13
  i32.const 0
  i32.ge_s
  i32.and
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   local.get $13
   call $~lib/number/I32#toString
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 1744
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=8
   i32.const 1748
   local.get $0
   i32.store
   i32.const 1744
   local.get $0
   i32.const 1
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   i32.const 1744
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 3552
   i32.store offset=8
   i32.const 1744
   call $~lib/staticarray/StaticArray<~lib/string/String>#join
   i32.const 3584
   i32.const 51
   i32.const 9
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/index/pathfinder
  local.tee $14
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $13
  if (result i32)
   local.get $13
   i32.const 1
   i32.eq
   if (result i32)
    global.get $assembly/collision/CollisionStrategies/CollisionStrategies.BLOCKED
   else
    local.get $13
    i32.const 2
    i32.eq
    if (result i32)
     global.get $assembly/collision/CollisionStrategies/CollisionStrategies.INDOORS
    else
     global.get $assembly/collision/CollisionStrategies/CollisionStrategies.OUTDOORS
     global.get $assembly/collision/CollisionStrategies/CollisionStrategies.LINE_OF_SIGHT
     local.get $13
     i32.const 3
     i32.eq
     select
    end
   end
  else
   global.get $assembly/collision/CollisionStrategies/CollisionStrategies.NORMAL
  end
  local.tee $13
  i32.store offset=8
  local.get $14
  local.get $0
  local.get $1
  local.get $2
  local.get $3
  local.get $4
  local.get $5
  local.get $6
  local.get $7
  local.get $8
  local.get $9
  local.get $10
  local.get $11
  local.get $12
  local.get $13
  call $assembly/PathFinder/PathFinder#findPath
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/index/changeWall (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (param $7 i32)
  local.get $4
  if
   local.get $4
   i32.const 3
   i32.eq
   local.get $4
   i32.const 1
   i32.eq
   i32.or
   if
    local.get $0
    local.get $1
    local.get $2
    local.get $3
    local.get $5
    local.get $6
    local.get $7
    call $assembly/index/changeWallCorner
   else
    local.get $4
    i32.const 2
    i32.eq
    if
     local.get $0
     local.get $1
     local.get $2
     local.get $3
     local.get $5
     local.get $6
     local.get $7
     call $assembly/index/changeWallL
    end
   end
  else
   local.get $0
   local.get $1
   local.get $2
   local.get $3
   local.get $5
   local.get $6
   local.get $7
   call $assembly/index/changeWallStraight
  end
 )
 (func $assembly/index/canTravel@varargs (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (param $7 i32) (result i32)
  (local $8 i32)
  block $1of1
   block $0of1
    block $outOfRange
     global.get $~argumentsLength
     i32.const 7
     i32.sub
     br_table $0of1 $1of1 $outOfRange
    end
    unreachable
   end
   i32.const 0
   local.set $7
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  local.get $7
  i32.const 4
  i32.le_s
  local.get $7
  i32.const 0
  i32.ge_s
  i32.and
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   local.get $7
   call $~lib/number/I32#toString
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 4752
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=8
   i32.const 4756
   local.get $0
   i32.store
   i32.const 4752
   local.get $0
   i32.const 1
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   i32.const 4752
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 3552
   i32.store offset=8
   i32.const 4752
   call $~lib/staticarray/StaticArray<~lib/string/String>#join
   i32.const 3584
   i32.const 314
   i32.const 9
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/index/stepValidator
  local.tee $8
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $7
  if (result i32)
   local.get $7
   i32.const 1
   i32.eq
   if (result i32)
    global.get $assembly/collision/CollisionStrategies/CollisionStrategies.BLOCKED
   else
    local.get $7
    i32.const 2
    i32.eq
    if (result i32)
     global.get $assembly/collision/CollisionStrategies/CollisionStrategies.INDOORS
    else
     global.get $assembly/collision/CollisionStrategies/CollisionStrategies.OUTDOORS
     global.get $assembly/collision/CollisionStrategies/CollisionStrategies.LINE_OF_SIGHT
     local.get $7
     i32.const 3
     i32.eq
     select
    end
   end
  else
   global.get $assembly/collision/CollisionStrategies/CollisionStrategies.NORMAL
  end
  local.tee $7
  i32.store offset=8
  local.get $8
  local.get $0
  local.get $1
  local.get $2
  local.get $3
  local.get $4
  local.get $5
  local.get $6
  local.get $7
  call $assembly/StepValidator/StepValidator#canTravel
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/index/hasLineOfSight@varargs (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (param $7 i32) (param $8 i32) (result i32)
  (local $9 i32)
  block $4of4
   block $3of4
    block $2of4
     block $1of4
      block $0of4
       block $outOfRange
        global.get $~argumentsLength
        i32.const 5
        i32.sub
        br_table $0of4 $1of4 $2of4 $3of4 $4of4 $outOfRange
       end
       unreachable
      end
      i32.const 1
      local.set $5
     end
     i32.const 0
     local.set $6
    end
    i32.const 0
    local.set $7
   end
   i32.const 0
   local.set $8
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 5156
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/index/lineValidator
   local.tee $9
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5156
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $9
   i32.store
   local.get $9
   local.get $0
   local.get $1
   local.get $2
   local.get $3
   local.get $4
   local.get $5
   local.get $6
   local.get $7
   local.get $8
   i32.const 196608
   i32.or
   local.get $8
   i32.const 135168
   i32.or
   local.get $8
   i32.const 147456
   i32.or
   local.get $8
   i32.const 132096
   i32.or
   local.get $8
   i32.const 256
   i32.or
   local.get $8
   i32.const 131072
   i32.or
   i32.const 1
   call $assembly/LineValidator/LineValidator#rayCast
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 37952
  i32.const 38000
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $assembly/index/hasLineOfWalk@varargs (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (param $7 i32) (param $8 i32) (result i32)
  (local $9 i32)
  block $4of4
   block $3of4
    block $2of4
     block $1of4
      block $0of4
       block $outOfRange
        global.get $~argumentsLength
        i32.const 5
        i32.sub
        br_table $0of4 $1of4 $2of4 $3of4 $4of4 $outOfRange
       end
       unreachable
      end
      i32.const 1
      local.set $5
     end
     i32.const 0
     local.set $6
    end
    i32.const 0
    local.set $7
   end
   i32.const 0
   local.set $8
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 5156
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/index/lineValidator
   local.tee $9
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5156
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $9
   i32.store
   local.get $9
   local.get $0
   local.get $1
   local.get $2
   local.get $3
   local.get $4
   local.get $5
   local.get $6
   local.get $7
   local.get $8
   i32.const 2359680
   i32.or
   local.get $8
   i32.const 2359560
   i32.or
   local.get $8
   i32.const 2359584
   i32.or
   local.get $8
   i32.const 2359554
   i32.or
   local.get $8
   i32.const 256
   i32.or
   local.get $8
   i32.const 131072
   i32.or
   i32.const 0
   call $assembly/LineValidator/LineValidator#rayCast
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 37952
  i32.const 38000
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $assembly/index/lineOfSight@varargs (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (param $7 i32) (param $8 i32) (result i32)
  (local $9 i32)
  block $4of4
   block $3of4
    block $2of4
     block $1of4
      block $0of4
       block $outOfRange
        global.get $~argumentsLength
        i32.const 5
        i32.sub
        br_table $0of4 $1of4 $2of4 $3of4 $4of4 $outOfRange
       end
       unreachable
      end
      i32.const 1
      local.set $5
     end
     i32.const 0
     local.set $6
    end
    i32.const 0
    local.set $7
   end
   i32.const 0
   local.set $8
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 5156
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/index/linePathFinder
   local.tee $9
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5156
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $9
   i32.store
   local.get $9
   local.get $0
   local.get $1
   local.get $2
   local.get $3
   local.get $4
   local.get $5
   local.get $6
   local.get $7
   local.get $8
   i32.const 196608
   i32.or
   local.get $8
   i32.const 135168
   i32.or
   local.get $8
   i32.const 147456
   i32.or
   local.get $8
   i32.const 132096
   i32.or
   local.get $8
   i32.const 256
   i32.or
   i32.const 1
   call $assembly/LinePathFinder/LinePathFinder#rayCast
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 37952
  i32.const 38000
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $assembly/index/lineOfWalk@varargs (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (param $7 i32) (param $8 i32) (result i32)
  (local $9 i32)
  block $4of4
   block $3of4
    block $2of4
     block $1of4
      block $0of4
       block $outOfRange
        global.get $~argumentsLength
        i32.const 5
        i32.sub
        br_table $0of4 $1of4 $2of4 $3of4 $4of4 $outOfRange
       end
       unreachable
      end
      i32.const 1
      local.set $5
     end
     i32.const 0
     local.set $6
    end
    i32.const 0
    local.set $7
   end
   i32.const 0
   local.set $8
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 5156
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/index/linePathFinder
   local.tee $9
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5156
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $9
   i32.store
   local.get $9
   local.get $0
   local.get $1
   local.get $2
   local.get $3
   local.get $4
   local.get $5
   local.get $6
   local.get $7
   local.get $8
   i32.const 2359680
   i32.or
   local.get $8
   i32.const 2359560
   i32.or
   local.get $8
   i32.const 2359584
   i32.or
   local.get $8
   i32.const 2359554
   i32.or
   local.get $8
   i32.const 256
   i32.or
   i32.const 0
   call $assembly/LinePathFinder/LinePathFinder#rayCast
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 37952
  i32.const 38000
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $assembly/index/reached@varargs (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (param $7 i32) (param $8 i32) (param $9 i32) (param $10 i32) (result i32)
  (local $11 i32)
  block $3of3
   block $2of3
    block $1of3
     block $0of3
      block $outOfRange
       global.get $~argumentsLength
       i32.const 8
       i32.sub
       br_table $0of3 $1of3 $2of3 $3of3 $outOfRange
      end
      unreachable
     end
     i32.const 0
     local.set $8
    end
    i32.const -1
    local.set $9
   end
   i32.const 0
   local.set $10
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/index/flags
  local.tee $11
  i32.store
  local.get $11
  local.get $0
  local.get $1
  local.get $2
  local.get $3
  local.get $4
  local.get $5
  local.get $6
  local.get $7
  local.get $8
  local.get $9
  local.get $10
  call $assembly/reach/ReachStrategy/ReachStrategy.reached
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/staticarray/StaticArray<~lib/staticarray/StaticArray<i32>|null>~visit (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.add
  local.set $1
  loop $while-continue|0
   local.get $0
   local.get $1
   i32.lt_u
   if
    local.get $0
    i32.load
    local.tee $2
    if
     local.get $2
     call $~lib/rt/itcms/__visit
    end
    local.get $0
    i32.const 4
    i32.add
    local.set $0
    br $while-continue|0
   end
  end
 )
 (func $~lib/rt/__visit_members (param $0 i32)
  (local $1 i32)
  block $folding-inner0
   block $invalid
    block $~lib/array/Array<i32>
     block $~lib/staticarray/StaticArray<~lib/string/String>
      block $assembly/PathFinder/PathFinder
       block $~lib/staticarray/StaticArray<~lib/staticarray/StaticArray<i32>|null>
        block $~lib/staticarray/StaticArray<i32>
         block $assembly/collision/CollisionStrategies/LineOfSight
          block $assembly/collision/CollisionStrategies/Outdoors
           block $assembly/collision/CollisionStrategies/Indoors
            block $assembly/collision/CollisionStrategies/Blocked
             block $assembly/collision/CollisionStrategies/Normal
              block $assembly/collision/CollisionStrategy/CollisionStrategy
               block $~lib/string/String
                block $~lib/arraybuffer/ArrayBuffer
                 block $~lib/object/Object
                  local.get $0
                  i32.const 8
                  i32.sub
                  i32.load
                  br_table $~lib/object/Object $~lib/arraybuffer/ArrayBuffer $~lib/string/String $folding-inner0 $assembly/collision/CollisionStrategy/CollisionStrategy $assembly/collision/CollisionStrategies/Normal $assembly/collision/CollisionStrategies/Blocked $assembly/collision/CollisionStrategies/Indoors $assembly/collision/CollisionStrategies/Outdoors $assembly/collision/CollisionStrategies/LineOfSight $folding-inner0 $~lib/staticarray/StaticArray<i32> $~lib/staticarray/StaticArray<~lib/staticarray/StaticArray<i32>|null> $assembly/PathFinder/PathFinder $folding-inner0 $folding-inner0 $folding-inner0 $folding-inner0 $~lib/staticarray/StaticArray<~lib/string/String> $~lib/array/Array<i32> $invalid
                 end
                 return
                end
                return
               end
               return
              end
              return
             end
             return
            end
            return
           end
           return
          end
          return
         end
         return
        end
        return
       end
       local.get $0
       call $~lib/staticarray/StaticArray<~lib/staticarray/StaticArray<i32>|null>~visit
       return
      end
      local.get $0
      i32.load
      local.tee $1
      if
       local.get $1
       call $~lib/rt/itcms/__visit
      end
      local.get $0
      i32.load offset=12
      local.tee $1
      if
       local.get $1
       call $~lib/rt/itcms/__visit
      end
      local.get $0
      i32.load offset=16
      local.tee $1
      if
       local.get $1
       call $~lib/rt/itcms/__visit
      end
      local.get $0
      i32.load offset=20
      local.tee $1
      if
       local.get $1
       call $~lib/rt/itcms/__visit
      end
      local.get $0
      i32.load offset=24
      local.tee $0
      if
       local.get $0
       call $~lib/rt/itcms/__visit
      end
      return
     end
     local.get $0
     call $~lib/staticarray/StaticArray<~lib/staticarray/StaticArray<i32>|null>~visit
     return
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.sub
    global.set $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    i32.const 5156
    i32.lt_s
    if
     i32.const 37952
     i32.const 38000
     i32.const 1
     i32.const 1
     call $~lib/builtins/abort
     unreachable
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load
    call $~lib/rt/itcms/__visit
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    return
   end
   unreachable
  end
  local.get $0
  i32.load
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
 )
 (func $~setArgumentsLength (param $0 i32)
  local.get $0
  global.set $~argumentsLength
 )
 (func $~start
  (local $0 i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i32.const 5156
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   memory.size
   i32.const 16
   i32.shl
   i32.const 37924
   i32.sub
   i32.const 1
   i32.shr_u
   global.set $~lib/rt/itcms/threshold
   i32.const 1172
   i32.const 1168
   i32.store
   i32.const 1176
   i32.const 1168
   i32.store
   i32.const 1168
   global.set $~lib/rt/itcms/pinSpace
   i32.const 1204
   i32.const 1200
   i32.store
   i32.const 1208
   i32.const 1200
   i32.store
   i32.const 1200
   global.set $~lib/rt/itcms/toSpace
   i32.const 1348
   i32.const 1344
   i32.store
   i32.const 1352
   i32.const 1344
   i32.store
   i32.const 1344
   global.set $~lib/rt/itcms/fromSpace
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5156
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.const 5
   call $~lib/rt/itcms/__new
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   call $~lib/object/Object#constructor
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   global.set $assembly/collision/CollisionStrategies/CollisionStrategies.NORMAL
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5156
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.const 6
   call $~lib/rt/itcms/__new
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   call $~lib/object/Object#constructor
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   global.set $assembly/collision/CollisionStrategies/CollisionStrategies.BLOCKED
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5156
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.const 7
   call $~lib/rt/itcms/__new
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   call $~lib/object/Object#constructor
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   global.set $assembly/collision/CollisionStrategies/CollisionStrategies.INDOORS
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5156
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.const 8
   call $~lib/rt/itcms/__new
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   call $~lib/object/Object#constructor
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   global.set $assembly/collision/CollisionStrategies/CollisionStrategies.OUTDOORS
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5156
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.const 9
   call $~lib/rt/itcms/__new
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   call $~lib/object/Object#constructor
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   global.set $assembly/collision/CollisionStrategies/CollisionStrategies.LINE_OF_SIGHT
   i32.const 32768
   global.set $assembly/Line/Line.HALF_TILE
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5156
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.const 10
   call $~lib/rt/itcms/__new
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   call $~lib/object/Object#constructor
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5156
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 67108864
   i32.const 12
   call $~lib/rt/itcms/__new
   local.tee $1
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   local.get $0
   local.get $1
   i32.store
   local.get $0
   local.get $1
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   global.set $assembly/index/flags
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/index/flags
   local.tee $0
   i32.store
   i32.const 1
   global.set $~argumentsLength
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5156
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   call $assembly/PathFinder/PathFinder#constructor
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   global.set $assembly/index/pathfinder
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/index/flags
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5156
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.const 14
   call $~lib/rt/itcms/__new
   local.tee $1
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $1
   i32.const 0
   i32.store
   local.get $1
   i32.const 0
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=8
   local.get $1
   local.get $0
   i32.store
   local.get $1
   local.get $0
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $1
   global.set $assembly/index/stepValidator
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/index/flags
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5156
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.const 15
   call $~lib/rt/itcms/__new
   local.tee $1
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $1
   i32.const 0
   i32.store
   local.get $1
   i32.const 0
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=8
   local.get $1
   local.get $0
   i32.store
   local.get $1
   local.get $0
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $1
   global.set $assembly/index/lineValidator
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/index/flags
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5156
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.const 16
   call $~lib/rt/itcms/__new
   local.tee $1
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $1
   i32.const 0
   i32.store
   local.get $1
   i32.const 0
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=8
   local.get $1
   local.get $0
   i32.store
   local.get $1
   local.get $0
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $1
   global.set $assembly/index/linePathFinder
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 37952
  i32.const 38000
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $~lib/staticarray/StaticArray<i32>#fill@varargs (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 5156
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   block $2of2
    block $1of2
     block $outOfRange
      global.get $~argumentsLength
      i32.const 1
      i32.sub
      br_table $1of2 $1of2 $2of2 $outOfRange
     end
     unreachable
    end
    i32.const 2147483647
    local.set $2
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5156
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $2
   local.get $0
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 2
   i32.shr_u
   local.tee $4
   local.get $2
   local.get $4
   i32.lt_s
   select
   local.set $2
   block $__inlined_func$~lib/util/bytes/FILL<i32>$110
    local.get $1
    i32.eqz
    local.get $1
    i32.const -1
    i32.eq
    i32.or
    if
     local.get $2
     i32.const 0
     i32.gt_s
     if
      local.get $0
      local.get $1
      local.get $2
      i32.const 2
      i32.shl
      memory.fill
     end
     br $__inlined_func$~lib/util/bytes/FILL<i32>$110
    end
    loop $for-loop|0
     local.get $2
     local.get $3
     i32.gt_s
     if
      local.get $0
      local.get $3
      i32.const 2
      i32.shl
      i32.add
      local.get $1
      i32.store
      local.get $3
      i32.const 1
      i32.add
      local.set $3
      br $for-loop|0
     end
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 37952
  i32.const 38000
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $assembly/PathFinder/PathFinder#constructor (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 44
  i32.const 13
  call $~lib/rt/itcms/__new
  local.tee $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store
  local.get $1
  i32.const 0
  i32.const 0
  call $~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=12
  local.get $1
  i32.const 0
  i32.const 0
  call $~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=16
  local.get $1
  i32.const 0
  i32.const 0
  call $~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=20
  local.get $1
  i32.const 0
  i32.const 0
  call $~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=24
  local.get $1
  i32.const 0
  i32.const 0
  call $~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=28
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=32
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=36
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=40
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  local.get $1
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.const 0
  call $~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 128
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 4096
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  i32.const 16384
  call $~lib/staticarray/StaticArray<i32>#constructor
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  local.get $1
  local.get $0
  i32.store offset=12
  local.get $1
  local.get $0
  i32.const 0
  call $~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  i32.const 16384
  call $~lib/staticarray/StaticArray<i32>#constructor
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=12
  i32.const 1
  global.set $~argumentsLength
  local.get $0
  i32.const 99999999
  call $~lib/staticarray/StaticArray<i32>#fill@varargs
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  local.get $1
  local.get $0
  i32.store offset=16
  local.get $1
  local.get $0
  i32.const 0
  call $~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  i32.const 4096
  call $~lib/staticarray/StaticArray<i32>#constructor
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  local.get $1
  local.get $0
  i32.store offset=20
  local.get $1
  local.get $0
  i32.const 0
  call $~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  i32.const 4096
  call $~lib/staticarray/StaticArray<i32>#constructor
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  local.get $1
  local.get $0
  i32.store offset=24
  local.get $1
  local.get $0
  i32.const 0
  call $~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $~lib/util/string/joinStringArray (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store offset=8
  local.get $1
  i32.const 1
  i32.sub
  local.tee $4
  i32.const 0
  i32.lt_s
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 3552
   return
  end
  local.get $4
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   i32.const 3552
   local.get $0
   select
   return
  end
  loop $for-loop|0
   local.get $1
   local.get $3
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    local.get $3
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.tee $5
    i32.store offset=4
    local.get $5
    if
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.store offset=8
     local.get $2
     local.get $5
     i32.const 20
     i32.sub
     i32.load offset=16
     i32.const 1
     i32.shr_u
     i32.add
     local.set $2
    end
    local.get $3
    i32.const 1
    i32.add
    local.set $3
    br $for-loop|0
   end
  end
  i32.const 0
  local.set $3
  global.get $~lib/memory/__stack_pointer
  i32.const 3552
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.const 3548
  i32.load
  i32.const 1
  i32.shr_u
  local.tee $1
  local.get $4
  i32.mul
  i32.add
  i32.const 1
  i32.shl
  i32.const 2
  call $~lib/rt/itcms/__new
  local.tee $5
  i32.store offset=12
  i32.const 0
  local.set $2
  loop $for-loop|1
   local.get $2
   local.get $4
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    local.get $2
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.tee $6
    i32.store offset=4
    local.get $6
    if
     global.get $~lib/memory/__stack_pointer
     local.get $6
     i32.store offset=8
     local.get $5
     local.get $3
     i32.const 1
     i32.shl
     i32.add
     local.get $6
     local.get $6
     i32.const 20
     i32.sub
     i32.load offset=16
     i32.const 1
     i32.shr_u
     local.tee $6
     i32.const 1
     i32.shl
     memory.copy
     local.get $3
     local.get $6
     i32.add
     local.set $3
    end
    local.get $1
    if
     local.get $5
     local.get $3
     i32.const 1
     i32.shl
     i32.add
     i32.const 3552
     local.get $1
     i32.const 1
     i32.shl
     memory.copy
     local.get $1
     local.get $3
     i32.add
     local.set $3
    end
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|1
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  local.get $4
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.tee $0
  i32.store offset=4
  local.get $0
  if
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=8
   local.get $5
   local.get $3
   i32.const 1
   i32.shl
   i32.add
   local.get $0
   local.get $0
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const -2
   i32.and
   memory.copy
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $5
 )
 (func $~lib/staticarray/StaticArray<~lib/string/String>#join (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 2
  i32.shr_u
  local.set $1
  global.get $~lib/memory/__stack_pointer
  i32.const 3552
  i32.store
  local.get $0
  local.get $1
  call $~lib/util/string/joinStringArray
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/PathFinder/PathFinder#appendDirection (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32)
  (local $5 i32)
  (local $6 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  local.get $1
  local.get $0
  i32.load offset=4
  i32.mul
  local.get $2
  i32.add
  local.set $6
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load offset=12
  local.tee $5
  i32.store offset=4
  local.get $5
  local.get $6
  i32.const 2
  i32.shl
  local.tee $5
  i32.add
  local.get $3
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load offset=16
  local.tee $3
  i32.store offset=4
  local.get $3
  local.get $5
  i32.add
  local.get $4
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load offset=20
  local.tee $3
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  local.get $3
  local.get $0
  i32.load offset=40
  i32.const 2
  i32.shl
  i32.add
  local.get $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load offset=24
  local.tee $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  local.get $1
  local.get $0
  i32.load offset=40
  i32.const 2
  i32.shl
  i32.add
  local.get $2
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  local.get $0
  i32.load offset=40
  i32.const 1
  i32.add
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  local.get $0
  local.get $1
  local.get $0
  i32.load offset=8
  i32.const 1
  i32.sub
  i32.and
  i32.store offset=40
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/collision/CollisionFlagMap/CollisionFlagMap#get (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  local.get $1
  i32.const 7
  i32.and
  local.get $2
  i32.const 7
  i32.and
  i32.const 3
  i32.shl
  i32.or
  local.set $4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  local.get $1
  i32.const 3
  i32.shr_s
  i32.const 2047
  i32.and
  local.get $2
  i32.const 3
  i32.shr_s
  i32.const 2047
  i32.and
  i32.const 11
  i32.shl
  i32.or
  local.get $3
  i32.const 3
  i32.and
  i32.const 22
  i32.shl
  i32.or
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.tee $0
  i32.store offset=8
  block $folding-inner0
   local.get $0
   i32.eqz
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $4
   local.get $0
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 2
   i32.shr_u
   i32.ge_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   local.get $4
   i32.const 2
   i32.shl
   i32.add
   i32.load
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const -1
 )
 (func $assembly/reach/ReachStrategy/ReachStrategy.reachWall1 (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (param $7 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $2
  local.get $3
  local.get $1
  call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
  local.set $0
  block $folding-inner1
   block $folding-inner0
    local.get $6
    if
     local.get $6
     i32.const 2
     i32.eq
     if
      local.get $7
      if
       local.get $7
       i32.const 1
       i32.eq
       if
        local.get $0
        i32.const 2359560
        i32.and
        i32.eqz
        local.get $3
        local.get $5
        i32.eq
        local.tee $1
        local.get $2
        local.get $4
        i32.const 1
        i32.sub
        i32.eq
        i32.and
        i32.and
        br_if $folding-inner0
        local.get $2
        local.get $4
        i32.eq
        local.tee $6
        local.get $3
        local.get $5
        i32.const 1
        i32.add
        i32.eq
        i32.and
        br_if $folding-inner0
        local.get $2
        local.get $4
        i32.const 1
        i32.add
        i32.eq
        local.get $1
        i32.and
        br_if $folding-inner0
        local.get $0
        i32.const 2359554
        i32.and
        i32.eqz
        local.get $6
        local.get $3
        local.get $5
        i32.const 1
        i32.sub
        i32.eq
        i32.and
        i32.and
        br_if $folding-inner0
        br $folding-inner1
       else
        local.get $7
        i32.const 2
        i32.eq
        if
         local.get $0
         i32.const 2359560
         i32.and
         i32.eqz
         local.get $3
         local.get $5
         i32.eq
         local.tee $1
         local.get $2
         local.get $4
         i32.const 1
         i32.sub
         i32.eq
         i32.and
         i32.and
         br_if $folding-inner0
         local.get $0
         i32.const 2359584
         i32.and
         i32.eqz
         local.get $2
         local.get $4
         i32.eq
         local.tee $0
         local.get $3
         local.get $5
         i32.const 1
         i32.add
         i32.eq
         i32.and
         i32.and
         br_if $folding-inner0
         local.get $2
         local.get $4
         i32.const 1
         i32.add
         i32.eq
         local.get $1
         i32.and
         br_if $folding-inner0
         local.get $0
         local.get $3
         local.get $5
         i32.const 1
         i32.sub
         i32.eq
         i32.and
         br_if $folding-inner0
         br $folding-inner1
        else
         local.get $7
         i32.const 3
         i32.eq
         if
          local.get $3
          local.get $5
          i32.eq
          local.tee $1
          local.get $2
          local.get $4
          i32.const 1
          i32.sub
          i32.eq
          i32.and
          br_if $folding-inner0
          local.get $0
          i32.const 2359584
          i32.and
          i32.eqz
          local.get $2
          local.get $4
          i32.eq
          local.tee $6
          local.get $3
          local.get $5
          i32.const 1
          i32.add
          i32.eq
          i32.and
          i32.and
          br_if $folding-inner0
          local.get $0
          i32.const 2359680
          i32.and
          i32.eqz
          local.get $2
          local.get $4
          i32.const 1
          i32.add
          i32.eq
          local.get $1
          i32.and
          i32.and
          br_if $folding-inner0
          local.get $6
          local.get $3
          local.get $5
          i32.const 1
          i32.sub
          i32.eq
          i32.and
          br_if $folding-inner0
          br $folding-inner1
         end
        end
       end
      else
       local.get $3
       local.get $5
       i32.eq
       local.tee $1
       local.get $2
       local.get $4
       i32.const 1
       i32.sub
       i32.eq
       i32.and
       br_if $folding-inner0
       local.get $2
       local.get $4
       i32.eq
       local.tee $6
       local.get $3
       local.get $5
       i32.const 1
       i32.add
       i32.eq
       i32.and
       br_if $folding-inner0
       local.get $0
       i32.const 2359680
       i32.and
       i32.eqz
       local.get $2
       local.get $4
       i32.const 1
       i32.add
       i32.eq
       local.get $1
       i32.and
       i32.and
       br_if $folding-inner0
       local.get $0
       i32.const 2359554
       i32.and
       i32.eqz
       local.get $6
       local.get $3
       local.get $5
       i32.const 1
       i32.sub
       i32.eq
       i32.and
       i32.and
       br_if $folding-inner0
       br $folding-inner1
      end
      br $folding-inner1
     else
      local.get $6
      i32.const 9
      i32.eq
      if
       local.get $0
       i32.const 32
       i32.and
       i32.eqz
       local.get $2
       local.get $4
       i32.eq
       local.tee $1
       local.get $3
       local.get $5
       i32.const 1
       i32.add
       i32.eq
       i32.and
       i32.and
       br_if $folding-inner0
       local.get $0
       i32.const 2
       i32.and
       i32.eqz
       local.get $1
       local.get $3
       local.get $5
       i32.const 1
       i32.sub
       i32.eq
       i32.and
       i32.and
       br_if $folding-inner0
       local.get $0
       i32.const 8
       i32.and
       i32.eqz
       local.get $3
       local.get $5
       i32.eq
       local.tee $1
       local.get $2
       local.get $4
       i32.const 1
       i32.sub
       i32.eq
       i32.and
       i32.and
       br_if $folding-inner0
       local.get $0
       i32.const 128
       i32.and
       i32.eqz
       local.get $2
       local.get $4
       i32.const 1
       i32.add
       i32.eq
       local.get $1
       i32.and
       i32.and
       br_if $folding-inner0
       br $folding-inner1
      end
     end
    else
     local.get $7
     if
      local.get $7
      i32.const 1
      i32.eq
      if
       local.get $3
       local.get $5
       i32.const 1
       i32.add
       i32.eq
       local.get $2
       local.get $4
       i32.eq
       i32.and
       br_if $folding-inner0
       local.get $0
       i32.const 2359560
       i32.and
       i32.eqz
       local.get $3
       local.get $5
       i32.eq
       local.tee $1
       local.get $2
       local.get $4
       i32.const 1
       i32.sub
       i32.eq
       i32.and
       i32.and
       br_if $folding-inner0
       local.get $0
       i32.const 2359680
       i32.and
       i32.eqz
       local.get $2
       local.get $4
       i32.const 1
       i32.add
       i32.eq
       local.get $1
       i32.and
       i32.and
       br_if $folding-inner0
       br $folding-inner1
      else
       local.get $7
       i32.const 2
       i32.eq
       if
        local.get $3
        local.get $5
        i32.eq
        local.get $2
        local.get $4
        i32.const 1
        i32.add
        i32.eq
        i32.and
        br_if $folding-inner0
        local.get $0
        i32.const 2359584
        i32.and
        i32.eqz
        local.get $2
        local.get $4
        i32.eq
        local.tee $1
        local.get $3
        local.get $5
        i32.const 1
        i32.add
        i32.eq
        i32.and
        i32.and
        br_if $folding-inner0
        local.get $0
        i32.const 2359554
        i32.and
        i32.eqz
        local.get $1
        local.get $3
        local.get $5
        i32.const 1
        i32.sub
        i32.eq
        i32.and
        i32.and
        br_if $folding-inner0
        br $folding-inner1
       else
        local.get $7
        i32.const 3
        i32.eq
        if
         local.get $3
         local.get $5
         i32.const 1
         i32.sub
         i32.eq
         local.get $2
         local.get $4
         i32.eq
         i32.and
         br_if $folding-inner0
         local.get $0
         i32.const 2359560
         i32.and
         i32.eqz
         local.get $3
         local.get $5
         i32.eq
         local.tee $1
         local.get $2
         local.get $4
         i32.const 1
         i32.sub
         i32.eq
         i32.and
         i32.and
         br_if $folding-inner0
         local.get $0
         i32.const 2359680
         i32.and
         i32.eqz
         local.get $2
         local.get $4
         i32.const 1
         i32.add
         i32.eq
         local.get $1
         i32.and
         i32.and
         br_if $folding-inner0
         br $folding-inner1
        end
       end
      end
     else
      local.get $3
      local.get $5
      i32.eq
      local.get $2
      local.get $4
      i32.const 1
      i32.sub
      i32.eq
      i32.and
      br_if $folding-inner0
      local.get $0
      i32.const 2359584
      i32.and
      i32.eqz
      local.get $2
      local.get $4
      i32.eq
      local.tee $1
      local.get $3
      local.get $5
      i32.const 1
      i32.add
      i32.eq
      i32.and
      i32.and
      br_if $folding-inner0
      local.get $0
      i32.const 2359554
      i32.and
      i32.eqz
      local.get $1
      local.get $3
      local.get $5
      i32.const 1
      i32.sub
      i32.eq
      i32.and
      i32.and
      br_if $folding-inner0
      br $folding-inner1
     end
     br $folding-inner1
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    i32.const 0
    return
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 1
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $assembly/reach/ReachStrategy/ReachStrategy.reachWallN (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (param $7 i32) (param $8 i32) (result i32)
  (local $9 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $2
  local.get $3
  local.get $1
  call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
  local.set $1
  local.get $2
  local.get $6
  i32.add
  i32.const 1
  i32.sub
  local.set $0
  local.get $3
  local.get $6
  i32.add
  i32.const 1
  i32.sub
  local.set $9
  block $folding-inner1
   block $folding-inner0
    local.get $7
    if
     local.get $7
     i32.const 2
     i32.eq
     if
      local.get $8
      if
       local.get $8
       i32.const 1
       i32.eq
       if
        local.get $1
        i32.const 2359560
        i32.and
        i32.eqz
        local.get $5
        local.get $9
        i32.le_s
        local.tee $7
        local.get $3
        local.get $5
        i32.le_s
        local.tee $8
        local.get $2
        local.get $4
        local.get $6
        i32.sub
        i32.eq
        i32.and
        i32.and
        i32.and
        br_if $folding-inner0
        local.get $2
        local.get $4
        i32.le_s
        local.get $0
        local.get $4
        i32.ge_s
        i32.and
        local.tee $0
        local.get $3
        local.get $5
        i32.const 1
        i32.add
        i32.eq
        i32.and
        br_if $folding-inner0
        local.get $7
        local.get $8
        local.get $2
        local.get $4
        i32.const 1
        i32.add
        i32.eq
        i32.and
        i32.and
        br_if $folding-inner0
        local.get $1
        i32.const 2359554
        i32.and
        i32.eqz
        local.get $3
        local.get $5
        local.get $6
        i32.sub
        i32.eq
        local.get $0
        i32.and
        i32.and
        br_if $folding-inner0
        br $folding-inner1
       else
        local.get $8
        i32.const 2
        i32.eq
        if
         local.get $1
         i32.const 2359560
         i32.and
         i32.eqz
         local.get $5
         local.get $9
         i32.le_s
         local.tee $7
         local.get $3
         local.get $5
         i32.le_s
         local.tee $8
         local.get $2
         local.get $4
         local.get $6
         i32.sub
         i32.eq
         i32.and
         i32.and
         i32.and
         br_if $folding-inner0
         local.get $1
         i32.const 2359584
         i32.and
         i32.eqz
         local.get $2
         local.get $4
         i32.le_s
         local.get $0
         local.get $4
         i32.ge_s
         i32.and
         local.tee $0
         local.get $3
         local.get $5
         i32.const 1
         i32.add
         i32.eq
         i32.and
         i32.and
         br_if $folding-inner0
         local.get $7
         local.get $8
         local.get $2
         local.get $4
         i32.const 1
         i32.add
         i32.eq
         i32.and
         i32.and
         br_if $folding-inner0
         local.get $3
         local.get $5
         local.get $6
         i32.sub
         i32.eq
         local.get $0
         i32.and
         br_if $folding-inner0
         br $folding-inner1
        else
         local.get $8
         i32.const 3
         i32.eq
         if
          local.get $5
          local.get $9
          i32.le_s
          local.tee $7
          local.get $3
          local.get $5
          i32.le_s
          local.tee $8
          local.get $2
          local.get $4
          local.get $6
          i32.sub
          i32.eq
          i32.and
          i32.and
          br_if $folding-inner0
          local.get $1
          i32.const 2359584
          i32.and
          i32.eqz
          local.get $2
          local.get $4
          i32.le_s
          local.get $0
          local.get $4
          i32.ge_s
          i32.and
          local.tee $0
          local.get $3
          local.get $5
          i32.const 1
          i32.add
          i32.eq
          i32.and
          i32.and
          br_if $folding-inner0
          local.get $1
          i32.const 2359680
          i32.and
          i32.eqz
          local.get $7
          local.get $8
          local.get $2
          local.get $4
          i32.const 1
          i32.add
          i32.eq
          i32.and
          i32.and
          i32.and
          br_if $folding-inner0
          local.get $3
          local.get $5
          local.get $6
          i32.sub
          i32.eq
          local.get $0
          i32.and
          br_if $folding-inner0
          br $folding-inner1
         end
        end
       end
      else
       local.get $5
       local.get $9
       i32.le_s
       local.tee $7
       local.get $3
       local.get $5
       i32.le_s
       local.tee $8
       local.get $2
       local.get $4
       local.get $6
       i32.sub
       i32.eq
       i32.and
       i32.and
       br_if $folding-inner0
       local.get $2
       local.get $4
       i32.le_s
       local.get $0
       local.get $4
       i32.ge_s
       i32.and
       local.tee $0
       local.get $3
       local.get $5
       i32.const 1
       i32.add
       i32.eq
       i32.and
       br_if $folding-inner0
       local.get $1
       i32.const 2359680
       i32.and
       i32.eqz
       local.get $7
       local.get $8
       local.get $2
       local.get $4
       i32.const 1
       i32.add
       i32.eq
       i32.and
       i32.and
       i32.and
       br_if $folding-inner0
       local.get $1
       i32.const 2359554
       i32.and
       i32.eqz
       local.get $3
       local.get $5
       local.get $6
       i32.sub
       i32.eq
       local.get $0
       i32.and
       i32.and
       br_if $folding-inner0
       br $folding-inner1
      end
      br $folding-inner1
     else
      local.get $7
      i32.const 9
      i32.eq
      if
       local.get $1
       i32.const 2359584
       i32.and
       i32.eqz
       local.get $2
       local.get $4
       i32.le_s
       local.get $0
       local.get $4
       i32.ge_s
       i32.and
       local.tee $0
       local.get $3
       local.get $5
       i32.const 1
       i32.add
       i32.eq
       i32.and
       i32.and
       br_if $folding-inner0
       local.get $1
       i32.const 2359554
       i32.and
       i32.eqz
       local.get $3
       local.get $5
       local.get $6
       i32.sub
       i32.eq
       local.get $0
       i32.and
       i32.and
       br_if $folding-inner0
       local.get $1
       i32.const 2359560
       i32.and
       i32.eqz
       local.get $3
       local.get $5
       i32.le_s
       local.tee $0
       local.get $2
       local.get $4
       local.get $6
       i32.sub
       i32.eq
       i32.and
       local.get $5
       local.get $9
       i32.le_s
       local.tee $3
       i32.and
       i32.and
       br_if $folding-inner0
       local.get $1
       i32.const 2359680
       i32.and
       i32.eqz
       local.get $3
       local.get $0
       local.get $2
       local.get $4
       i32.const 1
       i32.add
       i32.eq
       i32.and
       i32.and
       i32.and
       br_if $folding-inner0
       br $folding-inner1
      end
     end
    else
     local.get $8
     if
      local.get $8
      i32.const 1
      i32.eq
      if
       local.get $2
       local.get $4
       i32.le_s
       local.get $0
       local.get $4
       i32.ge_s
       i32.and
       local.get $3
       local.get $5
       i32.const 1
       i32.add
       i32.eq
       i32.and
       br_if $folding-inner0
       local.get $1
       i32.const 2359560
       i32.and
       i32.eqz
       local.get $3
       local.get $5
       i32.le_s
       local.tee $0
       local.get $2
       local.get $4
       local.get $6
       i32.sub
       i32.eq
       i32.and
       local.get $5
       local.get $9
       i32.le_s
       local.tee $3
       i32.and
       i32.and
       br_if $folding-inner0
       local.get $1
       i32.const 2359680
       i32.and
       i32.eqz
       local.get $3
       local.get $0
       local.get $2
       local.get $4
       i32.const 1
       i32.add
       i32.eq
       i32.and
       i32.and
       i32.and
       br_if $folding-inner0
       br $folding-inner1
      else
       local.get $8
       i32.const 2
       i32.eq
       if
        local.get $2
        local.get $4
        i32.const 1
        i32.add
        i32.eq
        local.get $3
        local.get $5
        i32.le_s
        i32.and
        local.get $5
        local.get $9
        i32.le_s
        i32.and
        br_if $folding-inner0
        local.get $1
        i32.const 2359584
        i32.and
        i32.eqz
        local.get $2
        local.get $4
        i32.le_s
        local.get $0
        local.get $4
        i32.ge_s
        i32.and
        local.tee $0
        local.get $3
        local.get $5
        i32.const 1
        i32.add
        i32.eq
        i32.and
        i32.and
        br_if $folding-inner0
        local.get $1
        i32.const 2359554
        i32.and
        i32.eqz
        local.get $3
        local.get $5
        local.get $6
        i32.sub
        i32.eq
        local.get $0
        i32.and
        i32.and
        br_if $folding-inner0
        br $folding-inner1
       else
        local.get $8
        i32.const 3
        i32.eq
        if
         local.get $2
         local.get $4
         i32.le_s
         local.get $0
         local.get $4
         i32.ge_s
         i32.and
         local.get $3
         local.get $5
         local.get $6
         i32.sub
         i32.eq
         i32.and
         br_if $folding-inner0
         local.get $1
         i32.const 2359560
         i32.and
         i32.eqz
         local.get $3
         local.get $5
         i32.le_s
         local.tee $0
         local.get $2
         local.get $4
         local.get $6
         i32.sub
         i32.eq
         i32.and
         local.get $5
         local.get $9
         i32.le_s
         local.tee $3
         i32.and
         i32.and
         br_if $folding-inner0
         local.get $1
         i32.const 2359680
         i32.and
         i32.eqz
         local.get $3
         local.get $0
         local.get $2
         local.get $4
         i32.const 1
         i32.add
         i32.eq
         i32.and
         i32.and
         i32.and
         br_if $folding-inner0
         br $folding-inner1
        end
       end
      end
     else
      local.get $2
      local.get $4
      local.get $6
      i32.sub
      i32.eq
      local.get $3
      local.get $5
      i32.le_s
      i32.and
      local.get $5
      local.get $9
      i32.le_s
      i32.and
      br_if $folding-inner0
      local.get $1
      i32.const 2359584
      i32.and
      i32.eqz
      local.get $2
      local.get $4
      i32.le_s
      local.get $0
      local.get $4
      i32.ge_s
      i32.and
      local.tee $0
      local.get $3
      local.get $5
      i32.const 1
      i32.add
      i32.eq
      i32.and
      i32.and
      br_if $folding-inner0
      local.get $1
      i32.const 2359554
      i32.and
      i32.eqz
      local.get $3
      local.get $5
      local.get $6
      i32.sub
      i32.eq
      local.get $0
      i32.and
      i32.and
      br_if $folding-inner0
      br $folding-inner1
     end
     br $folding-inner1
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    i32.const 0
    return
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 1
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $assembly/reach/ReachStrategy/ReachStrategy.reachWallDecor1 (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (param $7 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $2
  local.get $3
  local.get $1
  call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
  local.set $0
  block $folding-inner1
   block $folding-inner0
    local.get $6
    i32.const 7
    i32.eq
    local.tee $1
    local.get $6
    i32.const 6
    i32.eq
    i32.or
    if
     local.get $7
     i32.const 2
     i32.add
     i32.const 3
     i32.and
     local.get $7
     local.get $1
     select
     local.tee $1
     if
      local.get $1
      i32.const 1
      i32.eq
      if
       local.get $0
       i32.const 8
       i32.and
       i32.eqz
       local.get $3
       local.get $5
       i32.eq
       local.get $2
       local.get $4
       i32.const 1
       i32.sub
       i32.eq
       i32.and
       i32.and
       br_if $folding-inner0
       local.get $0
       i32.const 2
       i32.and
       i32.eqz
       local.get $3
       local.get $5
       i32.const 1
       i32.sub
       i32.eq
       local.get $2
       local.get $4
       i32.eq
       i32.and
       i32.and
       br_if $folding-inner0
       br $folding-inner1
      else
       local.get $1
       i32.const 2
       i32.eq
       if
        local.get $0
        i32.const 8
        i32.and
        i32.eqz
        local.get $3
        local.get $5
        i32.eq
        local.get $2
        local.get $4
        i32.const 1
        i32.sub
        i32.eq
        i32.and
        i32.and
        br_if $folding-inner0
        local.get $0
        i32.const 32
        i32.and
        i32.eqz
        local.get $3
        local.get $5
        i32.const 1
        i32.add
        i32.eq
        local.get $2
        local.get $4
        i32.eq
        i32.and
        i32.and
        br_if $folding-inner0
        br $folding-inner1
       else
        local.get $1
        i32.const 3
        i32.eq
        if
         local.get $0
         i32.const 128
         i32.and
         i32.eqz
         local.get $3
         local.get $5
         i32.eq
         local.get $2
         local.get $4
         i32.const 1
         i32.add
         i32.eq
         i32.and
         i32.and
         if
          br $folding-inner0
         else
          local.get $0
          i32.const 32
          i32.and
          i32.eqz
          local.get $3
          local.get $5
          i32.const 1
          i32.add
          i32.eq
          local.get $2
          local.get $4
          i32.eq
          i32.and
          i32.and
          br_if $folding-inner0
         end
        end
       end
      end
     else
      local.get $0
      i32.const 128
      i32.and
      i32.eqz
      local.get $3
      local.get $5
      i32.eq
      local.get $2
      local.get $4
      i32.const 1
      i32.add
      i32.eq
      i32.and
      i32.and
      br_if $folding-inner0
      local.get $0
      i32.const 2
      i32.and
      i32.eqz
      local.get $3
      local.get $5
      i32.const 1
      i32.sub
      i32.eq
      local.get $2
      local.get $4
      i32.eq
      i32.and
      i32.and
      br_if $folding-inner0
      br $folding-inner1
     end
     br $folding-inner1
    else
     local.get $6
     i32.const 8
     i32.eq
     if
      local.get $0
      i32.const 32
      i32.and
      i32.eqz
      local.get $2
      local.get $4
      i32.eq
      local.tee $1
      local.get $3
      local.get $5
      i32.const 1
      i32.add
      i32.eq
      i32.and
      i32.and
      br_if $folding-inner0
      local.get $0
      i32.const 2
      i32.and
      i32.eqz
      local.get $1
      local.get $3
      local.get $5
      i32.const 1
      i32.sub
      i32.eq
      i32.and
      i32.and
      br_if $folding-inner0
      local.get $0
      i32.const 8
      i32.and
      i32.eqz
      local.get $3
      local.get $5
      i32.eq
      local.tee $1
      local.get $2
      local.get $4
      i32.const 1
      i32.sub
      i32.eq
      i32.and
      i32.and
      br_if $folding-inner0
      local.get $0
      i32.const 128
      i32.and
      i32.eqz
      local.get $2
      local.get $4
      i32.const 1
      i32.add
      i32.eq
      local.get $1
      i32.and
      i32.and
      br_if $folding-inner0
      br $folding-inner1
     end
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    i32.const 0
    return
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 1
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $assembly/reach/ReachStrategy/ReachStrategy.reachWallDecorN (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (param $7 i32) (param $8 i32) (result i32)
  (local $9 i32)
  (local $10 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $2
  local.get $3
  local.get $1
  call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
  local.set $0
  local.get $2
  local.get $6
  i32.add
  i32.const 1
  i32.sub
  local.set $1
  local.get $3
  local.get $6
  i32.add
  i32.const 1
  i32.sub
  local.set $9
  block $folding-inner1
   block $folding-inner0
    local.get $7
    i32.const 7
    i32.eq
    local.tee $10
    local.get $7
    i32.const 6
    i32.eq
    i32.or
    if
     local.get $8
     i32.const 2
     i32.add
     i32.const 3
     i32.and
     local.get $8
     local.get $10
     select
     local.tee $7
     if
      local.get $7
      i32.const 1
      i32.eq
      if
       local.get $0
       i32.const 8
       i32.and
       i32.eqz
       local.get $2
       local.get $4
       local.get $6
       i32.sub
       i32.eq
       local.get $3
       local.get $5
       i32.le_s
       i32.and
       local.get $5
       local.get $9
       i32.le_s
       i32.and
       i32.and
       br_if $folding-inner0
       local.get $0
       i32.const 2
       i32.and
       i32.eqz
       local.get $3
       local.get $5
       local.get $6
       i32.sub
       i32.eq
       local.get $2
       local.get $4
       i32.le_s
       i32.and
       local.get $1
       local.get $4
       i32.ge_s
       i32.and
       i32.and
       br_if $folding-inner0
       br $folding-inner1
      else
       local.get $7
       i32.const 2
       i32.eq
       if
        local.get $0
        i32.const 8
        i32.and
        i32.eqz
        local.get $2
        local.get $4
        local.get $6
        i32.sub
        i32.eq
        local.get $3
        local.get $5
        i32.le_s
        i32.and
        local.get $5
        local.get $9
        i32.le_s
        i32.and
        i32.and
        br_if $folding-inner0
        local.get $0
        i32.const 32
        i32.and
        i32.eqz
        local.get $3
        local.get $5
        i32.const 1
        i32.add
        i32.eq
        local.get $2
        local.get $4
        i32.le_s
        i32.and
        local.get $1
        local.get $4
        i32.ge_s
        i32.and
        i32.and
        br_if $folding-inner0
        br $folding-inner1
       else
        local.get $7
        i32.const 3
        i32.eq
        if
         local.get $0
         i32.const 128
         i32.and
         i32.eqz
         local.get $2
         local.get $4
         i32.const 1
         i32.add
         i32.eq
         local.get $3
         local.get $5
         i32.le_s
         i32.and
         local.get $5
         local.get $9
         i32.le_s
         i32.and
         i32.and
         br_if $folding-inner0
         local.get $0
         i32.const 32
         i32.and
         i32.eqz
         local.get $3
         local.get $5
         i32.const 1
         i32.add
         i32.eq
         local.get $2
         local.get $4
         i32.le_s
         i32.and
         local.get $1
         local.get $4
         i32.ge_s
         i32.and
         i32.and
         br_if $folding-inner0
         br $folding-inner1
        end
       end
      end
     else
      local.get $0
      i32.const 128
      i32.and
      i32.eqz
      local.get $2
      local.get $4
      i32.const 1
      i32.add
      i32.eq
      local.get $3
      local.get $5
      i32.le_s
      i32.and
      local.get $5
      local.get $9
      i32.le_s
      i32.and
      i32.and
      br_if $folding-inner0
      local.get $0
      i32.const 2
      i32.and
      i32.eqz
      local.get $3
      local.get $5
      local.get $6
      i32.sub
      i32.eq
      local.get $2
      local.get $4
      i32.le_s
      i32.and
      local.get $1
      local.get $4
      i32.ge_s
      i32.and
      i32.and
      br_if $folding-inner0
      br $folding-inner1
     end
     br $folding-inner1
    else
     local.get $7
     i32.const 8
     i32.eq
     if
      local.get $0
      i32.const 32
      i32.and
      i32.eqz
      local.get $1
      local.get $4
      i32.ge_s
      local.tee $1
      local.get $2
      local.get $4
      i32.le_s
      local.tee $7
      local.get $3
      local.get $5
      i32.const 1
      i32.add
      i32.eq
      i32.and
      i32.and
      i32.and
      br_if $folding-inner0
      local.get $0
      i32.const 2
      i32.and
      i32.eqz
      local.get $1
      local.get $7
      local.get $3
      local.get $5
      local.get $6
      i32.sub
      i32.eq
      i32.and
      i32.and
      i32.and
      br_if $folding-inner0
      local.get $0
      i32.const 8
      i32.and
      i32.eqz
      local.get $3
      local.get $5
      i32.le_s
      local.tee $1
      local.get $2
      local.get $4
      local.get $6
      i32.sub
      i32.eq
      i32.and
      local.get $5
      local.get $9
      i32.le_s
      local.tee $3
      i32.and
      i32.and
      br_if $folding-inner0
      local.get $0
      i32.const 128
      i32.and
      i32.eqz
      local.get $3
      local.get $1
      local.get $2
      local.get $4
      i32.const 1
      i32.add
      i32.eq
      i32.and
      i32.and
      i32.and
      br_if $folding-inner0
      br $folding-inner1
     end
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    i32.const 0
    return
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 1
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $assembly/reach/RectangleBoundaryUtils/RectangleBoundaryUtils.reachRectangleN (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (param $7 i32) (param $8 i32) (param $9 i32) (param $10 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $2
  local.get $6
  i32.add
  local.set $6
  local.get $3
  local.get $7
  i32.add
  local.set $7
  local.get $5
  local.get $9
  i32.add
  local.set $9
  block $folding-inner0
   local.get $10
   i32.const 2
   i32.and
   i32.eqz
   local.get $4
   local.get $8
   i32.add
   local.tee $8
   local.get $2
   i32.eq
   i32.and
   if
    local.get $7
    f64.convert_i32_s
    local.get $9
    f64.convert_i32_s
    f64.min
    i32.trunc_sat_f64_s
    local.set $4
    local.get $3
    f64.convert_i32_s
    local.get $5
    f64.convert_i32_s
    f64.max
    i32.trunc_sat_f64_s
    local.set $2
    loop $for-loop|0
     local.get $2
     local.get $4
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store
      local.get $0
      local.get $8
      i32.const 1
      i32.sub
      local.get $2
      local.get $1
      call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
      i32.const 8
      i32.and
      i32.eqz
      br_if $folding-inner0
      local.get $2
      i32.const 1
      i32.add
      local.set $2
      br $for-loop|0
     end
    end
   else
    local.get $10
    i32.const 8
    i32.and
    i32.eqz
    local.get $4
    local.get $6
    i32.eq
    i32.and
    if
     local.get $7
     f64.convert_i32_s
     local.get $9
     f64.convert_i32_s
     f64.min
     i32.trunc_sat_f64_s
     local.set $6
     local.get $3
     f64.convert_i32_s
     local.get $5
     f64.convert_i32_s
     f64.max
     i32.trunc_sat_f64_s
     local.set $2
     loop $for-loop|1
      local.get $2
      local.get $6
      i32.lt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store
       local.get $0
       local.get $4
       local.get $2
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       i32.const 128
       i32.and
       i32.eqz
       br_if $folding-inner0
       local.get $2
       i32.const 1
       i32.add
       local.set $2
       br $for-loop|1
      end
     end
    else
     local.get $10
     i32.const 1
     i32.and
     i32.eqz
     local.get $3
     local.get $9
     i32.eq
     i32.and
     if
      local.get $6
      f64.convert_i32_s
      local.get $8
      f64.convert_i32_s
      f64.min
      i32.trunc_sat_f64_s
      local.set $3
      local.get $2
      f64.convert_i32_s
      local.get $4
      f64.convert_i32_s
      f64.max
      i32.trunc_sat_f64_s
      local.set $2
      loop $for-loop|2
       local.get $2
       local.get $3
       i32.lt_s
       if
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store
        local.get $0
        local.get $2
        local.get $9
        i32.const 1
        i32.sub
        local.get $1
        call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
        i32.const 2
        i32.and
        i32.eqz
        br_if $folding-inner0
        local.get $2
        i32.const 1
        i32.add
        local.set $2
        br $for-loop|2
       end
      end
     else
      local.get $10
      i32.const 4
      i32.and
      i32.eqz
      local.get $5
      local.get $7
      i32.eq
      i32.and
      if
       local.get $6
       f64.convert_i32_s
       local.get $8
       f64.convert_i32_s
       f64.min
       i32.trunc_sat_f64_s
       local.set $3
       local.get $2
       f64.convert_i32_s
       local.get $4
       f64.convert_i32_s
       f64.max
       i32.trunc_sat_f64_s
       local.set $2
       loop $for-loop|3
        local.get $2
        local.get $3
        i32.lt_s
        if
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.store
         local.get $0
         local.get $2
         local.get $5
         local.get $1
         call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
         i32.const 32
         i32.and
         i32.eqz
         br_if $folding-inner0
         local.get $2
         i32.const 1
         i32.add
         local.set $2
         br $for-loop|3
        end
       end
      end
     end
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 1
 )
 (func $assembly/reach/RectangleBoundaryUtils/RectangleBoundaryUtils.reachRectangle1 (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (param $7 i32) (param $8 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $4
  local.get $6
  i32.add
  i32.const 1
  i32.sub
  local.set $6
  block $folding-inner0
   local.get $2
   local.get $4
   i32.const 1
   i32.sub
   i32.eq
   local.get $3
   local.get $5
   i32.ge_s
   i32.and
   local.get $5
   local.get $7
   i32.add
   i32.const 1
   i32.sub
   local.tee $7
   local.get $3
   i32.ge_s
   i32.and
   if (result i32)
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    local.get $2
    local.get $3
    local.get $1
    call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
    i32.const 8
    i32.and
   else
    i32.const 1
   end
   local.get $8
   i32.const 8
   i32.and
   i32.or
   i32.eqz
   br_if $folding-inner0
   local.get $2
   local.get $6
   i32.const 1
   i32.add
   i32.eq
   local.get $3
   local.get $5
   i32.ge_s
   i32.and
   local.get $3
   local.get $7
   i32.le_s
   i32.and
   if (result i32)
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    local.get $2
    local.get $3
    local.get $1
    call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
    i32.const 128
    i32.and
   else
    i32.const 1
   end
   local.get $8
   i32.const 2
   i32.and
   i32.or
   i32.eqz
   br_if $folding-inner0
   local.get $3
   i32.const 1
   i32.add
   local.get $5
   i32.eq
   local.get $2
   local.get $4
   i32.ge_s
   i32.and
   local.get $2
   local.get $6
   i32.le_s
   i32.and
   if (result i32)
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    local.get $2
    local.get $3
    local.get $1
    call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
    i32.const 2
    i32.and
   else
    i32.const 1
   end
   local.get $8
   i32.const 4
   i32.and
   i32.or
   i32.eqz
   br_if $folding-inner0
   local.get $3
   local.get $7
   i32.const 1
   i32.add
   i32.eq
   local.get $2
   local.get $4
   i32.ge_s
   i32.and
   local.get $2
   local.get $6
   i32.le_s
   i32.and
   if (result i32)
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    local.get $2
    local.get $3
    local.get $1
    call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
    i32.const 32
    i32.and
   else
    i32.const 1
   end
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   local.get $8
   i32.const 1
   i32.and
   i32.or
   i32.eqz
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 1
 )
 (func $assembly/reach/ReachStrategy/ReachStrategy.reached (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (param $7 i32) (param $8 i32) (param $9 i32) (param $10 i32) (param $11 i32) (result i32)
  (local $12 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner1
   block $folding-inner0
    global.get $~lib/memory/__stack_pointer
    i32.const 5156
    i32.lt_s
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    i32.const 0
    i32.store
    local.get $2
    local.get $4
    i32.eq
    block $__inlined_func$assembly/reach/ReachStrategy/ReachStrategy.exitStrategy$182 (result i32)
     i32.const 4
     local.get $10
     i32.const -2
     i32.eq
     br_if $__inlined_func$assembly/reach/ReachStrategy/ReachStrategy.exitStrategy$182
     drop
     i32.const 3
     local.get $10
     i32.const -1
     i32.eq
     br_if $__inlined_func$assembly/reach/ReachStrategy/ReachStrategy.exitStrategy$182
     drop
     i32.const 0
     local.get $10
     i32.const 3
     i32.le_s
     local.get $10
     i32.const 0
     i32.ge_s
     i32.and
     local.get $10
     i32.const 9
     i32.eq
     i32.or
     br_if $__inlined_func$assembly/reach/ReachStrategy/ReachStrategy.exitStrategy$182
     drop
     i32.const 1
     local.get $10
     i32.const 9
     i32.lt_s
     br_if $__inlined_func$assembly/reach/ReachStrategy/ReachStrategy.exitStrategy$182
     drop
     i32.const 2
     local.get $10
     i32.const 11
     i32.le_s
     local.get $10
     i32.const 10
     i32.ge_s
     i32.and
     local.get $10
     i32.const 22
     i32.eq
     i32.or
     br_if $__inlined_func$assembly/reach/ReachStrategy/ReachStrategy.exitStrategy$182
     drop
     i32.const 3
    end
    local.tee $12
    i32.const 4
    i32.ne
    i32.and
    local.get $3
    local.get $5
    i32.eq
    i32.and
    if
     global.get $~lib/memory/__stack_pointer
     i32.const 4
     i32.add
     global.set $~lib/memory/__stack_pointer
     i32.const 1
     return
    end
    block $break|0
     block $case3|0
      block $case2|0
       block $case1|0
        block $case0|0
         local.get $12
         br_table $case0|0 $case1|0 $case2|0 $break|0 $case3|0 $break|0
        end
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store
        global.get $~lib/memory/__stack_pointer
        i32.const 4
        i32.sub
        global.set $~lib/memory/__stack_pointer
        global.get $~lib/memory/__stack_pointer
        i32.const 5156
        i32.lt_s
        br_if $folding-inner0
        global.get $~lib/memory/__stack_pointer
        i32.const 0
        i32.store
        block $__inlined_func$assembly/reach/ReachStrategy/ReachStrategy.reachWall$736
         local.get $2
         local.get $4
         i32.eq
         local.get $8
         i32.const 1
         i32.eq
         i32.and
         local.get $3
         local.get $5
         i32.eq
         i32.and
         if
          global.get $~lib/memory/__stack_pointer
          i32.const 4
          i32.add
          global.set $~lib/memory/__stack_pointer
          i32.const 1
          local.set $0
          br $__inlined_func$assembly/reach/ReachStrategy/ReachStrategy.reachWall$736
         else
          local.get $8
          i32.const 1
          i32.ne
          local.get $2
          local.get $4
          i32.le_s
          i32.and
          local.get $2
          local.get $8
          i32.add
          i32.const 1
          i32.sub
          local.get $4
          i32.ge_s
          i32.and
          local.get $3
          local.get $5
          i32.le_s
          i32.and
          local.get $3
          local.get $8
          i32.add
          i32.const 1
          i32.sub
          local.get $5
          i32.ge_s
          i32.and
          if
           global.get $~lib/memory/__stack_pointer
           i32.const 4
           i32.add
           global.set $~lib/memory/__stack_pointer
           i32.const 1
           local.set $0
           br $__inlined_func$assembly/reach/ReachStrategy/ReachStrategy.reachWall$736
          else
           local.get $8
           i32.const 1
           i32.eq
           if
            global.get $~lib/memory/__stack_pointer
            local.get $0
            i32.store
            local.get $0
            local.get $1
            local.get $2
            local.get $3
            local.get $4
            local.get $5
            local.get $10
            local.get $9
            call $assembly/reach/ReachStrategy/ReachStrategy.reachWall1
            local.set $0
            global.get $~lib/memory/__stack_pointer
            i32.const 4
            i32.add
            global.set $~lib/memory/__stack_pointer
            br $__inlined_func$assembly/reach/ReachStrategy/ReachStrategy.reachWall$736
           end
          end
         end
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.store
         local.get $0
         local.get $1
         local.get $2
         local.get $3
         local.get $4
         local.get $5
         local.get $8
         local.get $10
         local.get $9
         call $assembly/reach/ReachStrategy/ReachStrategy.reachWallN
         local.set $0
         global.get $~lib/memory/__stack_pointer
         i32.const 4
         i32.add
         global.set $~lib/memory/__stack_pointer
        end
        br $folding-inner1
       end
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store
       global.get $~lib/memory/__stack_pointer
       i32.const 4
       i32.sub
       global.set $~lib/memory/__stack_pointer
       global.get $~lib/memory/__stack_pointer
       i32.const 5156
       i32.lt_s
       br_if $folding-inner0
       global.get $~lib/memory/__stack_pointer
       i32.const 0
       i32.store
       block $__inlined_func$assembly/reach/ReachStrategy/ReachStrategy.reachWallDecor$737
        local.get $2
        local.get $4
        i32.eq
        local.get $8
        i32.const 1
        i32.eq
        i32.and
        local.get $3
        local.get $5
        i32.eq
        i32.and
        if
         global.get $~lib/memory/__stack_pointer
         i32.const 4
         i32.add
         global.set $~lib/memory/__stack_pointer
         i32.const 1
         local.set $0
         br $__inlined_func$assembly/reach/ReachStrategy/ReachStrategy.reachWallDecor$737
        else
         local.get $8
         i32.const 1
         i32.ne
         local.get $2
         local.get $4
         i32.le_s
         i32.and
         local.get $2
         local.get $8
         i32.add
         i32.const 1
         i32.sub
         local.get $4
         i32.ge_s
         i32.and
         local.get $3
         local.get $5
         i32.le_s
         i32.and
         local.get $3
         local.get $8
         i32.add
         i32.const 1
         i32.sub
         local.get $5
         i32.ge_s
         i32.and
         if
          global.get $~lib/memory/__stack_pointer
          i32.const 4
          i32.add
          global.set $~lib/memory/__stack_pointer
          i32.const 1
          local.set $0
          br $__inlined_func$assembly/reach/ReachStrategy/ReachStrategy.reachWallDecor$737
         else
          local.get $8
          i32.const 1
          i32.eq
          if
           global.get $~lib/memory/__stack_pointer
           local.get $0
           i32.store
           local.get $0
           local.get $1
           local.get $2
           local.get $3
           local.get $4
           local.get $5
           local.get $10
           local.get $9
           call $assembly/reach/ReachStrategy/ReachStrategy.reachWallDecor1
           local.set $0
           global.get $~lib/memory/__stack_pointer
           i32.const 4
           i32.add
           global.set $~lib/memory/__stack_pointer
           br $__inlined_func$assembly/reach/ReachStrategy/ReachStrategy.reachWallDecor$737
          end
         end
        end
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store
        local.get $0
        local.get $1
        local.get $2
        local.get $3
        local.get $4
        local.get $5
        local.get $8
        local.get $10
        local.get $9
        call $assembly/reach/ReachStrategy/ReachStrategy.reachWallDecorN
        local.set $0
        global.get $~lib/memory/__stack_pointer
        i32.const 4
        i32.add
        global.set $~lib/memory/__stack_pointer
       end
       br $folding-inner1
      end
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store
      global.get $~lib/memory/__stack_pointer
      i32.const 4
      i32.sub
      global.set $~lib/memory/__stack_pointer
      global.get $~lib/memory/__stack_pointer
      i32.const 5156
      i32.lt_s
      br_if $folding-inner0
      global.get $~lib/memory/__stack_pointer
      i32.const 0
      i32.store
      local.get $7
      local.get $6
      local.get $9
      i32.const 1
      i32.and
      local.tee $10
      select
      local.set $12
      local.get $9
      if
       local.get $11
       local.get $9
       i32.shl
       i32.const 15
       i32.and
       local.get $11
       i32.const 4
       local.get $9
       i32.sub
       i32.shr_s
       i32.or
       local.set $11
      end
      local.get $6
      local.get $7
      local.get $10
      select
      local.set $6
      local.get $2
      local.get $8
      i32.add
      local.get $4
      i32.le_s
      local.get $2
      local.get $4
      local.get $12
      i32.add
      i32.ge_s
      i32.or
      if (result i32)
       i32.const 0
      else
       local.get $5
       local.get $3
       local.get $8
       i32.add
       i32.lt_s
       local.get $3
       local.get $5
       local.get $6
       i32.add
       i32.lt_s
       i32.and
      end
      local.set $7
      block $__inlined_func$assembly/reach/ReachStrategy/ReachStrategy.reachRectangle$738 (result i32)
       local.get $8
       i32.const 1
       i32.gt_s
       if
        local.get $7
        if (result i32)
         i32.const 1
        else
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.store
         local.get $0
         local.get $1
         local.get $2
         local.get $3
         local.get $4
         local.get $5
         local.get $8
         local.get $8
         local.get $12
         local.get $6
         local.get $11
         call $assembly/reach/RectangleBoundaryUtils/RectangleBoundaryUtils.reachRectangleN
        end
        br $__inlined_func$assembly/reach/ReachStrategy/ReachStrategy.reachRectangle$738
       end
       local.get $7
       if (result i32)
        i32.const 1
       else
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store
        local.get $0
        local.get $1
        local.get $2
        local.get $3
        local.get $4
        local.get $5
        local.get $12
        local.get $6
        local.get $11
        call $assembly/reach/RectangleBoundaryUtils/RectangleBoundaryUtils.reachRectangle1
       end
      end
      local.set $0
      global.get $~lib/memory/__stack_pointer
      i32.const 4
      i32.add
      global.set $~lib/memory/__stack_pointer
      br $folding-inner1
     end
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     global.get $~lib/memory/__stack_pointer
     i32.const 4
     i32.sub
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     i32.const 5156
     i32.lt_s
     br_if $folding-inner0
     global.get $~lib/memory/__stack_pointer
     i32.const 0
     i32.store
     local.get $7
     local.get $6
     local.get $9
     i32.const 1
     i32.and
     local.tee $10
     select
     local.set $12
     local.get $9
     if
      local.get $11
      local.get $9
      i32.shl
      i32.const 15
      i32.and
      local.get $11
      i32.const 4
      local.get $9
      i32.sub
      i32.shr_s
      i32.or
      local.set $11
     end
     local.get $6
     local.get $7
     local.get $10
     select
     local.set $6
     local.get $2
     local.get $8
     i32.add
     local.get $4
     i32.le_s
     local.get $2
     local.get $4
     local.get $12
     i32.add
     i32.ge_s
     i32.or
     if (result i32)
      i32.const 0
     else
      local.get $5
      local.get $3
      local.get $8
      i32.add
      i32.lt_s
      local.get $3
      local.get $5
      local.get $6
      i32.add
      i32.lt_s
      i32.and
     end
     local.set $7
     block $__inlined_func$assembly/reach/ReachStrategy/ReachStrategy.reachExclusiveRectangle$739 (result i32)
      local.get $8
      i32.const 1
      i32.gt_s
      if
       local.get $7
       if (result i32)
        i32.const 0
       else
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store
        local.get $0
        local.get $1
        local.get $2
        local.get $3
        local.get $4
        local.get $5
        local.get $8
        local.get $8
        local.get $12
        local.get $6
        local.get $11
        call $assembly/reach/RectangleBoundaryUtils/RectangleBoundaryUtils.reachRectangleN
       end
       br $__inlined_func$assembly/reach/ReachStrategy/ReachStrategy.reachExclusiveRectangle$739
      end
      local.get $7
      if (result i32)
       i32.const 0
      else
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store
       local.get $0
       local.get $1
       local.get $2
       local.get $3
       local.get $4
       local.get $5
       local.get $12
       local.get $6
       local.get $11
       call $assembly/reach/RectangleBoundaryUtils/RectangleBoundaryUtils.reachRectangle1
      end
     end
     local.set $0
     global.get $~lib/memory/__stack_pointer
     i32.const 4
     i32.add
     global.set $~lib/memory/__stack_pointer
     br $folding-inner1
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    i32.const 0
    return
   end
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/PathFinder/PathFinder#collisionFlag (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $0
  i32.store
  local.get $0
  local.get $1
  local.get $3
  i32.add
  local.get $2
  local.get $4
  i32.add
  local.get $5
  call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/PathFinder/PathFinder#findPath1 (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (param $7 i32) (param $8 i32) (param $9 i32) (param $10 i32) (param $11 i32) (param $12 i32) (result i32)
  (local $13 i32)
  (local $14 i32)
  (local $15 i32)
  (local $16 i32)
  (local $17 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 48
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 48
  memory.fill
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=4
  i32.const 1
  i32.sub
  local.set $13
  loop $while-continue|0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   i32.load offset=40
   local.set $14
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $14
   local.get $0
   i32.load offset=36
   i32.ne
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=20
    local.tee $14
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    local.get $0
    local.get $14
    local.get $0
    i32.load offset=36
    i32.const 2
    i32.shl
    i32.add
    i32.load
    i32.store offset=28
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=24
    local.tee $14
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    local.get $0
    local.get $14
    local.get $0
    i32.load offset=36
    i32.const 2
    i32.shl
    i32.add
    i32.load
    i32.store offset=32
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $0
    i32.load offset=36
    i32.const 1
    i32.add
    local.set $14
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $0
    local.get $14
    local.get $0
    i32.load offset=8
    i32.const 1
    i32.sub
    i32.and
    i32.store offset=36
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $14
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $1
    local.get $0
    i32.load offset=28
    i32.add
    local.set $15
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $14
    local.get $3
    local.get $15
    local.get $2
    local.get $0
    i32.load offset=32
    i32.add
    local.get $1
    local.get $4
    i32.add
    local.get $2
    local.get $5
    i32.add
    local.get $6
    local.get $7
    local.get $8
    local.get $9
    local.get $10
    local.get $11
    call $assembly/reach/ReachStrategy/ReachStrategy.reached
    if
     global.get $~lib/memory/__stack_pointer
     i32.const 48
     i32.add
     global.set $~lib/memory/__stack_pointer
     i32.const 1
     return
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=16
    local.tee $14
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=12
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $0
    i32.load offset=28
    local.set $15
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $0
    i32.load offset=32
    local.set $16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $14
    local.get $16
    local.get $15
    local.get $0
    i32.load offset=4
    i32.mul
    i32.add
    i32.const 2
    i32.shl
    i32.add
    i32.load
    i32.const 1
    i32.add
    local.set $14
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 1
    i32.sub
    local.set $15
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    local.set $16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 0
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=12
     local.tee $17
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=16
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $17
     local.get $15
     local.get $0
     i32.load offset=4
     i32.mul
     local.get $16
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
    else
     i32.const 1
    end
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$3 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $15
      local.get $16
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default
       block $case4
        block $case3
         block $case2
          block $case1
           block $case0
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case0 $case1 $case2 $case3 $case4 $default
           end
           local.get $17
           i32.const 2359560
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$3
          end
          local.get $17
          i32.const 262408
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$3
         end
         local.get $17
         i32.const 2359560
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$3
        end
        local.get $17
        i32.const -2145124088
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$3
       end
       local.get $17
       i32.const 135168
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$3
      end
      unreachable
     end
    end
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     local.get $15
     local.get $16
     i32.const 2
     local.get $14
     call $assembly/PathFinder/PathFinder#appendDirection
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 1
    i32.add
    local.set $15
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    local.set $16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $13
    local.get $0
    i32.load offset=28
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=12
     local.tee $17
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=20
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $17
     local.get $15
     local.get $0
     i32.load offset=4
     i32.mul
     local.get $16
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
    else
     i32.const 1
    end
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$4 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $15
      local.get $16
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default0
       block $case41
        block $case32
         block $case23
          block $case14
           block $case05
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case05 $case14 $case23 $case32 $case41 $default0
           end
           local.get $17
           i32.const 2359680
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$4
          end
          local.get $17
          i32.const 262528
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$4
         end
         local.get $17
         i32.const 2359680
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$4
        end
        local.get $17
        i32.const -2145123968
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$4
       end
       local.get $17
       i32.const 196608
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$4
      end
      unreachable
     end
    end
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     local.get $15
     local.get $16
     i32.const 8
     local.get $14
     call $assembly/PathFinder/PathFinder#appendDirection
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    local.set $15
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    i32.const 1
    i32.sub
    local.set $16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    i32.const 0
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=12
     local.tee $17
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=24
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $17
     local.get $15
     local.get $0
     i32.load offset=4
     i32.mul
     local.get $16
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
    else
     i32.const 1
    end
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$5 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $15
      local.get $16
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default1
       block $case42
        block $case33
         block $case24
          block $case15
           block $case06
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case06 $case15 $case24 $case33 $case42 $default1
           end
           local.get $17
           i32.const 2359554
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$5
          end
          local.get $17
          i32.const 262402
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$5
         end
         local.get $17
         i32.const 2359554
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$5
        end
        local.get $17
        i32.const -2145124094
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$5
       end
       local.get $17
       i32.const 132096
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$5
      end
      unreachable
     end
    end
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     local.get $15
     local.get $16
     i32.const 1
     local.get $14
     call $assembly/PathFinder/PathFinder#appendDirection
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    local.set $15
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    i32.const 1
    i32.add
    local.set $16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $13
    local.get $0
    i32.load offset=32
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=12
     local.tee $17
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=28
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $17
     local.get $15
     local.get $0
     i32.load offset=4
     i32.mul
     local.get $16
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
    else
     i32.const 1
    end
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$6 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $15
      local.get $16
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default2
       block $case43
        block $case34
         block $case25
          block $case16
           block $case07
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case07 $case16 $case25 $case34 $case43 $default2
           end
           local.get $17
           i32.const 2359584
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$6
          end
          local.get $17
          i32.const 262432
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$6
         end
         local.get $17
         i32.const 2359584
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$6
        end
        local.get $17
        i32.const -2145124064
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$6
       end
       local.get $17
       i32.const 147456
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$6
      end
      unreachable
     end
    end
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     local.get $15
     local.get $16
     i32.const 4
     local.get $14
     call $assembly/PathFinder/PathFinder#appendDirection
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 1
    i32.sub
    local.set $15
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    i32.const 1
    i32.sub
    local.set $16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 0
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     i32.load offset=32
     i32.const 0
     i32.gt_s
    else
     i32.const 0
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=12
     local.tee $17
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=32
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $17
     local.get $15
     local.get $0
     i32.load offset=4
     i32.mul
     local.get $16
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
    else
     i32.const 1
    end
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$7 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $15
      local.get $16
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default3
       block $case44
        block $case35
         block $case26
          block $case17
           block $case08
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case08 $case17 $case26 $case35 $case44 $default3
           end
           local.get $17
           i32.const 2359566
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$7
          end
          local.get $17
          i32.const 262414
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$7
         end
         local.get $17
         i32.const 2359566
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$7
        end
        local.get $17
        i32.const -2145124082
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$7
       end
       local.get $17
       i32.const 138240
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$7
      end
      unreachable
     end
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$8 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $15
      local.get $0
      i32.load offset=32
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default4
       block $case45
        block $case36
         block $case27
          block $case18
           block $case09
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case09 $case18 $case27 $case36 $case45 $default4
           end
           local.get $17
           i32.const 2359560
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$8
          end
          local.get $17
          i32.const 262408
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$8
         end
         local.get $17
         i32.const 2359560
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$8
        end
        local.get $17
        i32.const -2145124088
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$8
       end
       local.get $17
       i32.const 135168
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$8
      end
      unreachable
     end
    else
     i32.const 0
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$9 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $0
      i32.load offset=28
      local.get $16
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default5
       block $case46
        block $case37
         block $case28
          block $case19
           block $case010
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case010 $case19 $case28 $case37 $case46 $default5
           end
           local.get $17
           i32.const 2359554
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$9
          end
          local.get $17
          i32.const 262402
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$9
         end
         local.get $17
         i32.const 2359554
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$9
        end
        local.get $17
        i32.const -2145124094
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$9
       end
       local.get $17
       i32.const 132096
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$9
      end
      unreachable
     end
    else
     i32.const 0
    end
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     local.get $15
     local.get $16
     i32.const 3
     local.get $14
     call $assembly/PathFinder/PathFinder#appendDirection
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 1
    i32.add
    local.set $15
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    i32.const 1
    i32.sub
    local.set $16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $13
    local.get $0
    i32.load offset=28
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     i32.load offset=32
     i32.const 0
     i32.gt_s
    else
     i32.const 0
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=12
     local.tee $17
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=36
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $17
     local.get $15
     local.get $0
     i32.load offset=4
     i32.mul
     local.get $16
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
    else
     i32.const 1
    end
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$10 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $15
      local.get $16
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default6
       block $case47
        block $case38
         block $case29
          block $case110
           block $case011
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case011 $case110 $case29 $case38 $case47 $default6
           end
           local.get $17
           i32.const 2359683
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$10
          end
          local.get $17
          i32.const 262531
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$10
         end
         local.get $17
         i32.const 2359683
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$10
        end
        local.get $17
        i32.const -2145123965
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$10
       end
       local.get $17
       i32.const 198144
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$10
      end
      unreachable
     end
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$11 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $15
      local.get $0
      i32.load offset=32
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default7
       block $case48
        block $case39
         block $case210
          block $case111
           block $case012
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case012 $case111 $case210 $case39 $case48 $default7
           end
           local.get $17
           i32.const 2359680
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$11
          end
          local.get $17
          i32.const 262528
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$11
         end
         local.get $17
         i32.const 2359680
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$11
        end
        local.get $17
        i32.const -2145123968
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$11
       end
       local.get $17
       i32.const 196608
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$11
      end
      unreachable
     end
    else
     i32.const 0
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$12 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $0
      i32.load offset=28
      local.get $16
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default8
       block $case49
        block $case310
         block $case211
          block $case112
           block $case013
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case013 $case112 $case211 $case310 $case49 $default8
           end
           local.get $17
           i32.const 2359554
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$12
          end
          local.get $17
          i32.const 262402
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$12
         end
         local.get $17
         i32.const 2359554
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$12
        end
        local.get $17
        i32.const -2145124094
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$12
       end
       local.get $17
       i32.const 132096
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$12
      end
      unreachable
     end
    else
     i32.const 0
    end
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     local.get $15
     local.get $16
     i32.const 9
     local.get $14
     call $assembly/PathFinder/PathFinder#appendDirection
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 1
    i32.sub
    local.set $15
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    i32.const 1
    i32.add
    local.set $16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 0
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $13
     local.get $0
     i32.load offset=32
     i32.gt_s
    else
     i32.const 0
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=12
     local.tee $17
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=40
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $17
     local.get $15
     local.get $0
     i32.load offset=4
     i32.mul
     local.get $16
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
    else
     i32.const 1
    end
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$13 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $15
      local.get $16
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default9
       block $case410
        block $case311
         block $case212
          block $case113
           block $case014
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case014 $case113 $case212 $case311 $case410 $default9
           end
           local.get $17
           i32.const 2359608
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$13
          end
          local.get $17
          i32.const 262456
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$13
         end
         local.get $17
         i32.const 2359608
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$13
        end
        local.get $17
        i32.const -2145124040
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$13
       end
       local.get $17
       i32.const 159744
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$13
      end
      unreachable
     end
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$14 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $15
      local.get $0
      i32.load offset=32
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default10
       block $case411
        block $case312
         block $case213
          block $case114
           block $case015
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case015 $case114 $case213 $case312 $case411 $default10
           end
           local.get $17
           i32.const 2359560
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$14
          end
          local.get $17
          i32.const 262408
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$14
         end
         local.get $17
         i32.const 2359560
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$14
        end
        local.get $17
        i32.const -2145124088
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$14
       end
       local.get $17
       i32.const 135168
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$14
      end
      unreachable
     end
    else
     i32.const 0
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$15 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $0
      i32.load offset=28
      local.get $16
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default11
       block $case412
        block $case313
         block $case214
          block $case115
           block $case016
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case016 $case115 $case214 $case313 $case412 $default11
           end
           local.get $17
           i32.const 2359584
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$15
          end
          local.get $17
          i32.const 262432
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$15
         end
         local.get $17
         i32.const 2359584
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$15
        end
        local.get $17
        i32.const -2145124064
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$15
       end
       local.get $17
       i32.const 147456
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$15
      end
      unreachable
     end
    else
     i32.const 0
    end
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     local.get $15
     local.get $16
     i32.const 6
     local.get $14
     call $assembly/PathFinder/PathFinder#appendDirection
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 1
    i32.add
    local.set $15
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    i32.const 1
    i32.add
    local.set $16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $13
    local.get $0
    i32.load offset=28
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $13
     local.get $0
     i32.load offset=32
     i32.gt_s
    else
     i32.const 0
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=12
     local.tee $17
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=44
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $17
     local.get $15
     local.get $0
     i32.load offset=4
     i32.mul
     local.get $16
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
    else
     i32.const 1
    end
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$16 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $15
      local.get $16
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default12
       block $case413
        block $case314
         block $case215
          block $case116
           block $case017
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case017 $case116 $case215 $case314 $case413 $default12
           end
           local.get $17
           i32.const 2359776
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$16
          end
          local.get $17
          i32.const 262624
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$16
         end
         local.get $17
         i32.const 2359776
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$16
        end
        local.get $17
        i32.const -2145123872
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$16
       end
       local.get $17
       i32.const 245760
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$16
      end
      unreachable
     end
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$17 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $15
      local.get $0
      i32.load offset=32
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default13
       block $case414
        block $case315
         block $case216
          block $case117
           block $case018
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case018 $case117 $case216 $case315 $case414 $default13
           end
           local.get $17
           i32.const 2359680
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$17
          end
          local.get $17
          i32.const 262528
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$17
         end
         local.get $17
         i32.const 2359680
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$17
        end
        local.get $17
        i32.const -2145123968
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$17
       end
       local.get $17
       i32.const 196608
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$17
      end
      unreachable
     end
    else
     i32.const 0
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$18 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $0
      i32.load offset=28
      local.get $16
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default14
       block $case415
        block $case316
         block $case217
          block $case118
           block $case019
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case019 $case118 $case217 $case316 $case415 $default14
           end
           local.get $17
           i32.const 2359584
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$18
          end
          local.get $17
          i32.const 262432
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$18
         end
         local.get $17
         i32.const 2359584
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$18
        end
        local.get $17
        i32.const -2145124064
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$18
       end
       local.get $17
       i32.const 147456
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$18
      end
      unreachable
     end
    else
     i32.const 0
    end
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     local.get $15
     local.get $16
     i32.const 12
     local.get $14
     call $assembly/PathFinder/PathFinder#appendDirection
    end
    br $while-continue|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 48
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $assembly/PathFinder/PathFinder#findPath2 (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (param $7 i32) (param $8 i32) (param $9 i32) (param $10 i32) (param $11 i32) (param $12 i32) (result i32)
  (local $13 i32)
  (local $14 i32)
  (local $15 i32)
  (local $16 i32)
  (local $17 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 48
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 48
  memory.fill
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=4
  i32.const 2
  i32.sub
  local.set $13
  loop $while-continue|0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   i32.load offset=40
   local.set $14
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $14
   local.get $0
   i32.load offset=36
   i32.ne
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=20
    local.tee $14
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    local.get $0
    local.get $14
    local.get $0
    i32.load offset=36
    i32.const 2
    i32.shl
    i32.add
    i32.load
    i32.store offset=28
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=24
    local.tee $14
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    local.get $0
    local.get $14
    local.get $0
    i32.load offset=36
    i32.const 2
    i32.shl
    i32.add
    i32.load
    i32.store offset=32
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $0
    i32.load offset=36
    i32.const 1
    i32.add
    local.set $14
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $0
    local.get $14
    local.get $0
    i32.load offset=8
    i32.const 1
    i32.sub
    i32.and
    i32.store offset=36
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $14
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $1
    local.get $0
    i32.load offset=28
    i32.add
    local.set $15
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $14
    local.get $3
    local.get $15
    local.get $2
    local.get $0
    i32.load offset=32
    i32.add
    local.get $1
    local.get $4
    i32.add
    local.get $2
    local.get $5
    i32.add
    local.get $6
    local.get $7
    local.get $8
    local.get $9
    local.get $10
    local.get $11
    call $assembly/reach/ReachStrategy/ReachStrategy.reached
    if
     global.get $~lib/memory/__stack_pointer
     i32.const 48
     i32.add
     global.set $~lib/memory/__stack_pointer
     i32.const 1
     return
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=16
    local.tee $14
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=12
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $0
    i32.load offset=28
    local.set $15
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $0
    i32.load offset=32
    local.set $16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $14
    local.get $16
    local.get $15
    local.get $0
    i32.load offset=4
    i32.mul
    i32.add
    i32.const 2
    i32.shl
    i32.add
    i32.load
    i32.const 1
    i32.add
    local.set $14
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 1
    i32.sub
    local.set $15
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    local.set $16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 0
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=12
     local.tee $17
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=16
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $17
     local.get $15
     local.get $0
     i32.load offset=4
     i32.mul
     local.get $16
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
    else
     i32.const 1
    end
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$19 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $15
      local.get $16
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default
       block $case4
        block $case3
         block $case2
          block $case1
           block $case0
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case0 $case1 $case2 $case3 $case4 $default
           end
           local.get $17
           i32.const 2359566
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$19
          end
          local.get $17
          i32.const 262414
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$19
         end
         local.get $17
         i32.const 2359566
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$19
        end
        local.get $17
        i32.const -2145124082
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$19
       end
       local.get $17
       i32.const 138240
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$19
      end
      unreachable
     end
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$20 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $15
      local.get $0
      i32.load offset=32
      i32.const 1
      i32.add
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default0
       block $case41
        block $case32
         block $case23
          block $case14
           block $case05
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case05 $case14 $case23 $case32 $case41 $default0
           end
           local.get $17
           i32.const 2359608
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$20
          end
          local.get $17
          i32.const 262456
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$20
         end
         local.get $17
         i32.const 2359608
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$20
        end
        local.get $17
        i32.const -2145124040
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$20
       end
       local.get $17
       i32.const 159744
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$20
      end
      unreachable
     end
    else
     i32.const 0
    end
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     local.get $15
     local.get $16
     i32.const 2
     local.get $14
     call $assembly/PathFinder/PathFinder#appendDirection
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 1
    i32.add
    local.set $15
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    local.set $16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $13
    local.get $0
    i32.load offset=28
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=12
     local.tee $17
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=20
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $17
     local.get $15
     local.get $0
     i32.load offset=4
     i32.mul
     local.get $16
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
    else
     i32.const 1
    end
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$21 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $0
      i32.load offset=28
      i32.const 2
      i32.add
      local.get $16
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default1
       block $case42
        block $case33
         block $case24
          block $case15
           block $case06
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case06 $case15 $case24 $case33 $case42 $default1
           end
           local.get $17
           i32.const 2359683
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$21
          end
          local.get $17
          i32.const 262531
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$21
         end
         local.get $17
         i32.const 2359683
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$21
        end
        local.get $17
        i32.const -2145123965
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$21
       end
       local.get $17
       i32.const 198144
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$21
      end
      unreachable
     end
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     local.get $0
     i32.load offset=28
     i32.const 2
     i32.add
     local.set $17
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$22 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $17
      local.get $0
      i32.load offset=32
      i32.const 1
      i32.add
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default2
       block $case43
        block $case34
         block $case25
          block $case16
           block $case07
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case07 $case16 $case25 $case34 $case43 $default2
           end
           local.get $17
           i32.const 2359776
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$22
          end
          local.get $17
          i32.const 262624
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$22
         end
         local.get $17
         i32.const 2359776
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$22
        end
        local.get $17
        i32.const -2145123872
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$22
       end
       local.get $17
       i32.const 245760
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$22
      end
      unreachable
     end
    else
     i32.const 0
    end
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     local.get $15
     local.get $16
     i32.const 8
     local.get $14
     call $assembly/PathFinder/PathFinder#appendDirection
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    local.set $15
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    i32.const 1
    i32.sub
    local.set $16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    i32.const 0
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=12
     local.tee $17
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=24
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $17
     local.get $15
     local.get $0
     i32.load offset=4
     i32.mul
     local.get $16
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
    else
     i32.const 1
    end
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$23 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $15
      local.get $16
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default3
       block $case44
        block $case35
         block $case26
          block $case17
           block $case08
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case08 $case17 $case26 $case35 $case44 $default3
           end
           local.get $17
           i32.const 2359566
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$23
          end
          local.get $17
          i32.const 262414
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$23
         end
         local.get $17
         i32.const 2359566
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$23
        end
        local.get $17
        i32.const -2145124082
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$23
       end
       local.get $17
       i32.const 138240
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$23
      end
      unreachable
     end
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$24 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $0
      i32.load offset=28
      i32.const 1
      i32.add
      local.get $16
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default4
       block $case45
        block $case36
         block $case27
          block $case18
           block $case09
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case09 $case18 $case27 $case36 $case45 $default4
           end
           local.get $17
           i32.const 2359683
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$24
          end
          local.get $17
          i32.const 262531
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$24
         end
         local.get $17
         i32.const 2359683
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$24
        end
        local.get $17
        i32.const -2145123965
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$24
       end
       local.get $17
       i32.const 198144
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$24
      end
      unreachable
     end
    else
     i32.const 0
    end
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     local.get $15
     local.get $16
     i32.const 1
     local.get $14
     call $assembly/PathFinder/PathFinder#appendDirection
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    local.set $15
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    i32.const 1
    i32.add
    local.set $16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $13
    local.get $0
    i32.load offset=32
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=12
     local.tee $17
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=28
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $17
     local.get $15
     local.get $0
     i32.load offset=4
     i32.mul
     local.get $16
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
    else
     i32.const 1
    end
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$25 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $15
      local.get $0
      i32.load offset=32
      i32.const 2
      i32.add
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default5
       block $case46
        block $case37
         block $case28
          block $case19
           block $case010
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case010 $case19 $case28 $case37 $case46 $default5
           end
           local.get $17
           i32.const 2359608
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$25
          end
          local.get $17
          i32.const 262456
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$25
         end
         local.get $17
         i32.const 2359608
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$25
        end
        local.get $17
        i32.const -2145124040
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$25
       end
       local.get $17
       i32.const 159744
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$25
      end
      unreachable
     end
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     local.get $0
     i32.load offset=28
     i32.const 1
     i32.add
     local.set $17
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$26 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $17
      local.get $0
      i32.load offset=32
      i32.const 2
      i32.add
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default6
       block $case47
        block $case38
         block $case29
          block $case110
           block $case011
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case011 $case110 $case29 $case38 $case47 $default6
           end
           local.get $17
           i32.const 2359776
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$26
          end
          local.get $17
          i32.const 262624
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$26
         end
         local.get $17
         i32.const 2359776
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$26
        end
        local.get $17
        i32.const -2145123872
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$26
       end
       local.get $17
       i32.const 245760
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$26
      end
      unreachable
     end
    else
     i32.const 0
    end
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     local.get $15
     local.get $16
     i32.const 4
     local.get $14
     call $assembly/PathFinder/PathFinder#appendDirection
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 1
    i32.sub
    local.set $15
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    i32.const 1
    i32.sub
    local.set $16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 0
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     i32.load offset=32
     i32.const 0
     i32.gt_s
    else
     i32.const 0
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=12
     local.tee $17
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=32
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $17
     local.get $15
     local.get $0
     i32.load offset=4
     i32.mul
     local.get $16
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
    else
     i32.const 1
    end
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$27 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $15
      local.get $0
      i32.load offset=32
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default7
       block $case48
        block $case39
         block $case210
          block $case111
           block $case012
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case012 $case111 $case210 $case39 $case48 $default7
           end
           local.get $17
           i32.const 2359614
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$27
          end
          local.get $17
          i32.const 262462
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$27
         end
         local.get $17
         i32.const 2359614
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$27
        end
        local.get $17
        i32.const -2145124034
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$27
       end
       local.get $17
       i32.const 162816
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$27
      end
      unreachable
     end
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$28 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $15
      local.get $16
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default8
       block $case49
        block $case310
         block $case211
          block $case112
           block $case013
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case013 $case112 $case211 $case310 $case49 $default8
           end
           local.get $17
           i32.const 2359566
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$28
          end
          local.get $17
          i32.const 262414
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$28
         end
         local.get $17
         i32.const 2359566
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$28
        end
        local.get $17
        i32.const -2145124082
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$28
       end
       local.get $17
       i32.const 138240
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$28
      end
      unreachable
     end
    else
     i32.const 0
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$29 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $0
      i32.load offset=28
      local.get $16
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default9
       block $case410
        block $case311
         block $case212
          block $case113
           block $case014
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case014 $case113 $case212 $case311 $case410 $default9
           end
           local.get $17
           i32.const 2359695
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$29
          end
          local.get $17
          i32.const 262543
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$29
         end
         local.get $17
         i32.const 2359695
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$29
        end
        local.get $17
        i32.const -2145123953
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$29
       end
       local.get $17
       i32.const 204288
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$29
      end
      unreachable
     end
    else
     i32.const 0
    end
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     local.get $15
     local.get $16
     i32.const 3
     local.get $14
     call $assembly/PathFinder/PathFinder#appendDirection
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 1
    i32.add
    local.set $15
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    i32.const 1
    i32.sub
    local.set $16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $13
    local.get $0
    i32.load offset=28
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     i32.load offset=32
     i32.const 0
     i32.gt_s
    else
     i32.const 0
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=12
     local.tee $17
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=36
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $17
     local.get $15
     local.get $0
     i32.load offset=4
     i32.mul
     local.get $16
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
    else
     i32.const 1
    end
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$30 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $15
      local.get $16
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default10
       block $case411
        block $case312
         block $case213
          block $case114
           block $case015
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case015 $case114 $case213 $case312 $case411 $default10
           end
           local.get $17
           i32.const 2359695
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$30
          end
          local.get $17
          i32.const 262543
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$30
         end
         local.get $17
         i32.const 2359695
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$30
        end
        local.get $17
        i32.const -2145123953
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$30
       end
       local.get $17
       i32.const 204288
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$30
      end
      unreachable
     end
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$31 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $0
      i32.load offset=28
      i32.const 2
      i32.add
      local.get $16
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default11
       block $case412
        block $case313
         block $case214
          block $case115
           block $case016
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case016 $case115 $case214 $case313 $case412 $default11
           end
           local.get $17
           i32.const 2359683
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$31
          end
          local.get $17
          i32.const 262531
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$31
         end
         local.get $17
         i32.const 2359683
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$31
        end
        local.get $17
        i32.const -2145123965
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$31
       end
       local.get $17
       i32.const 198144
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$31
      end
      unreachable
     end
    else
     i32.const 0
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     local.get $0
     i32.load offset=28
     i32.const 2
     i32.add
     local.set $17
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$32 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $17
      local.get $0
      i32.load offset=32
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default12
       block $case413
        block $case314
         block $case215
          block $case116
           block $case017
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case017 $case116 $case215 $case314 $case413 $default12
           end
           local.get $17
           i32.const 2359779
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$32
          end
          local.get $17
          i32.const 262627
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$32
         end
         local.get $17
         i32.const 2359779
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$32
        end
        local.get $17
        i32.const -2145123869
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$32
       end
       local.get $17
       i32.const 247296
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$32
      end
      unreachable
     end
    else
     i32.const 0
    end
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     local.get $15
     local.get $16
     i32.const 9
     local.get $14
     call $assembly/PathFinder/PathFinder#appendDirection
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 1
    i32.sub
    local.set $15
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    i32.const 1
    i32.add
    local.set $16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 0
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $13
     local.get $0
     i32.load offset=32
     i32.gt_s
    else
     i32.const 0
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=12
     local.tee $17
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=40
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $17
     local.get $15
     local.get $0
     i32.load offset=4
     i32.mul
     local.get $16
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
    else
     i32.const 1
    end
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$33 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $15
      local.get $16
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default13
       block $case414
        block $case315
         block $case216
          block $case117
           block $case018
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case018 $case117 $case216 $case315 $case414 $default13
           end
           local.get $17
           i32.const 2359614
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$33
          end
          local.get $17
          i32.const 262462
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$33
         end
         local.get $17
         i32.const 2359614
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$33
        end
        local.get $17
        i32.const -2145124034
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$33
       end
       local.get $17
       i32.const 162816
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$33
      end
      unreachable
     end
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$34 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $15
      local.get $0
      i32.load offset=32
      i32.const 2
      i32.add
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default14
       block $case415
        block $case316
         block $case217
          block $case118
           block $case019
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case019 $case118 $case217 $case316 $case415 $default14
           end
           local.get $17
           i32.const 2359608
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$34
          end
          local.get $17
          i32.const 262456
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$34
         end
         local.get $17
         i32.const 2359608
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$34
        end
        local.get $17
        i32.const -2145124040
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$34
       end
       local.get $17
       i32.const 159744
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$34
      end
      unreachable
     end
    else
     i32.const 0
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     local.get $0
     i32.load offset=28
     local.set $17
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$35 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $17
      local.get $0
      i32.load offset=32
      i32.const 2
      i32.add
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default15
       block $case416
        block $case317
         block $case218
          block $case119
           block $case020
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case020 $case119 $case218 $case317 $case416 $default15
           end
           local.get $17
           i32.const 2359800
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$35
          end
          local.get $17
          i32.const 262648
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$35
         end
         local.get $17
         i32.const 2359800
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$35
        end
        local.get $17
        i32.const -2145123848
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$35
       end
       local.get $17
       i32.const 258048
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$35
      end
      unreachable
     end
    else
     i32.const 0
    end
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     local.get $15
     local.get $16
     i32.const 6
     local.get $14
     call $assembly/PathFinder/PathFinder#appendDirection
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 1
    i32.add
    local.set $15
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    i32.const 1
    i32.add
    local.set $16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $13
    local.get $0
    i32.load offset=28
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $13
     local.get $0
     i32.load offset=32
     i32.gt_s
    else
     i32.const 0
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=12
     local.tee $17
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=44
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $17
     local.get $15
     local.get $0
     i32.load offset=4
     i32.mul
     local.get $16
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
    else
     i32.const 1
    end
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$36 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $15
      local.get $0
      i32.load offset=32
      i32.const 2
      i32.add
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default16
       block $case417
        block $case318
         block $case219
          block $case120
           block $case021
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case021 $case120 $case219 $case318 $case417 $default16
           end
           local.get $17
           i32.const 2359800
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$36
          end
          local.get $17
          i32.const 262648
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$36
         end
         local.get $17
         i32.const 2359800
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$36
        end
        local.get $17
        i32.const -2145123848
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$36
       end
       local.get $17
       i32.const 258048
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$36
      end
      unreachable
     end
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     local.get $0
     i32.load offset=28
     i32.const 2
     i32.add
     local.set $17
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$37 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $17
      local.get $0
      i32.load offset=32
      i32.const 2
      i32.add
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default17
       block $case418
        block $case319
         block $case220
          block $case121
           block $case022
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case022 $case121 $case220 $case319 $case418 $default17
           end
           local.get $17
           i32.const 2359776
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$37
          end
          local.get $17
          i32.const 262624
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$37
         end
         local.get $17
         i32.const 2359776
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$37
        end
        local.get $17
        i32.const -2145123872
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$37
       end
       local.get $17
       i32.const 245760
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$37
      end
      unreachable
     end
    else
     i32.const 0
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$38 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $0
      i32.load offset=28
      i32.const 2
      i32.add
      local.get $16
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $17
      block $default18
       block $case419
        block $case320
         block $case221
          block $case122
           block $case023
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case023 $case122 $case221 $case320 $case419 $default18
           end
           local.get $17
           i32.const 2359779
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$38
          end
          local.get $17
          i32.const 262627
          i32.and
          i32.eqz
          local.get $17
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$38
         end
         local.get $17
         i32.const 2359779
         i32.and
         i32.eqz
         local.get $17
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$38
        end
        local.get $17
        i32.const -2145123869
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$38
       end
       local.get $17
       i32.const 247296
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$38
      end
      unreachable
     end
    else
     i32.const 0
    end
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     local.get $15
     local.get $16
     i32.const 12
     local.get $14
     call $assembly/PathFinder/PathFinder#appendDirection
    end
    br $while-continue|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 48
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $assembly/PathFinder/PathFinder#findPathN (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (param $7 i32) (param $8 i32) (param $9 i32) (param $10 i32) (param $11 i32) (param $12 i32) (result i32)
  (local $13 i32)
  (local $14 i32)
  (local $15 i32)
  (local $16 i32)
  (local $17 i32)
  (local $18 i32)
  (local $19 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 48
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 48
  memory.fill
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=4
  local.get $8
  i32.sub
  local.set $15
  loop $while-continue|0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   i32.load offset=40
   local.set $13
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $13
   local.get $0
   i32.load offset=36
   i32.ne
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=20
    local.tee $13
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    local.get $0
    local.get $13
    local.get $0
    i32.load offset=36
    i32.const 2
    i32.shl
    i32.add
    i32.load
    i32.store offset=28
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=24
    local.tee $13
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    local.get $0
    local.get $13
    local.get $0
    i32.load offset=36
    i32.const 2
    i32.shl
    i32.add
    i32.load
    i32.store offset=32
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $0
    i32.load offset=36
    i32.const 1
    i32.add
    local.set $13
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $0
    local.get $13
    local.get $0
    i32.load offset=8
    i32.const 1
    i32.sub
    i32.and
    i32.store offset=36
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $13
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $1
    local.get $0
    i32.load offset=28
    i32.add
    local.set $14
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $13
    local.get $3
    local.get $14
    local.get $2
    local.get $0
    i32.load offset=32
    i32.add
    local.get $1
    local.get $4
    i32.add
    local.get $2
    local.get $5
    i32.add
    local.get $6
    local.get $7
    local.get $8
    local.get $9
    local.get $10
    local.get $11
    call $assembly/reach/ReachStrategy/ReachStrategy.reached
    if
     global.get $~lib/memory/__stack_pointer
     i32.const 48
     i32.add
     global.set $~lib/memory/__stack_pointer
     i32.const 1
     return
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=16
    local.tee $13
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=12
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $0
    i32.load offset=28
    local.set $14
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $0
    i32.load offset=32
    local.set $16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $13
    local.get $16
    local.get $14
    local.get $0
    i32.load offset=4
    i32.mul
    i32.add
    i32.const 2
    i32.shl
    i32.add
    i32.load
    i32.const 1
    i32.add
    local.set $16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 1
    i32.sub
    local.set $17
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    local.set $18
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 0
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=12
     local.tee $13
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=16
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $13
     local.get $17
     local.get $0
     i32.load offset=4
     i32.mul
     local.get $18
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
    else
     i32.const 1
    end
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$39 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $17
      local.get $18
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $13
      block $default
       block $case4
        block $case3
         block $case2
          block $case1
           block $case0
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case0 $case1 $case2 $case3 $case4 $default
           end
           local.get $13
           i32.const 2359566
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$39
          end
          local.get $13
          i32.const 262414
          i32.and
          i32.eqz
          local.get $13
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$39
         end
         local.get $13
         i32.const 2359566
         i32.and
         i32.eqz
         local.get $13
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$39
        end
        local.get $13
        i32.const -2145124082
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$39
       end
       local.get $13
       i32.const 138240
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$39
      end
      unreachable
     end
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$40 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $17
      local.get $8
      local.get $0
      i32.load offset=32
      i32.add
      i32.const 1
      i32.sub
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $13
      block $default0
       block $case41
        block $case32
         block $case23
          block $case14
           block $case05
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case05 $case14 $case23 $case32 $case41 $default0
           end
           local.get $13
           i32.const 2359608
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$40
          end
          local.get $13
          i32.const 262456
          i32.and
          i32.eqz
          local.get $13
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$40
         end
         local.get $13
         i32.const 2359608
         i32.and
         i32.eqz
         local.get $13
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$40
        end
        local.get $13
        i32.const -2145124040
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$40
       end
       local.get $13
       i32.const 159744
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$40
      end
      unreachable
     end
    else
     i32.const 0
    end
    if
     i32.const 0
     local.set $14
     i32.const 1
     local.set $13
     loop $for-loop|1
      local.get $13
      local.get $8
      i32.const 1
      i32.sub
      i32.lt_s
      if
       block $for-break1
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=4
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=8
        block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$41 (result i32)
         local.get $0
         local.get $1
         local.get $2
         local.get $17
         local.get $13
         local.get $0
         i32.load offset=32
         i32.add
         local.get $3
         call $assembly/PathFinder/PathFinder#collisionFlag
         local.set $19
         block $default1
          block $case42
           block $case33
            block $case24
             block $case15
              block $case06
               local.get $12
               i32.const 8
               i32.sub
               i32.load
               i32.const 5
               i32.sub
               br_table $case06 $case15 $case24 $case33 $case42 $default1
              end
              local.get $19
              i32.const 2359614
              i32.and
              i32.eqz
              br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$41
             end
             local.get $19
             i32.const 262462
             i32.and
             i32.eqz
             local.get $19
             i32.const 2097152
             i32.and
             i32.const 0
             i32.ne
             i32.and
             br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$41
            end
            local.get $19
            i32.const 2359614
            i32.and
            i32.eqz
            local.get $19
            i32.const -2147483648
            i32.and
            i32.const 0
            i32.ne
            i32.and
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$41
           end
           local.get $19
           i32.const -2145124034
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$41
          end
          local.get $19
          i32.const 162816
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$41
         end
         unreachable
        end
        i32.eqz
        if
         i32.const 1
         local.set $14
         br $for-break1
        end
        local.get $13
        i32.const 1
        i32.add
        local.set $13
        br $for-loop|1
       end
      end
     end
     local.get $14
     i32.eqz
     if
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store
      local.get $0
      local.get $17
      local.get $18
      i32.const 2
      local.get $16
      call $assembly/PathFinder/PathFinder#appendDirection
     end
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 1
    i32.add
    local.set $17
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    local.set $18
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $15
    local.get $0
    i32.load offset=28
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=12
     local.tee $13
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=20
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $13
     local.get $17
     local.get $0
     i32.load offset=4
     i32.mul
     local.get $18
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
    else
     i32.const 1
    end
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$42 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $8
      local.get $0
      i32.load offset=28
      i32.add
      local.get $18
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $13
      block $default2
       block $case43
        block $case34
         block $case25
          block $case16
           block $case07
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case07 $case16 $case25 $case34 $case43 $default2
           end
           local.get $13
           i32.const 2359683
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$42
          end
          local.get $13
          i32.const 262531
          i32.and
          i32.eqz
          local.get $13
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$42
         end
         local.get $13
         i32.const 2359683
         i32.and
         i32.eqz
         local.get $13
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$42
        end
        local.get $13
        i32.const -2145123965
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$42
       end
       local.get $13
       i32.const 198144
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$42
      end
      unreachable
     end
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     local.get $8
     local.get $0
     i32.load offset=28
     i32.add
     local.set $13
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$43 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $13
      local.get $8
      local.get $0
      i32.load offset=32
      i32.add
      i32.const 1
      i32.sub
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $13
      block $default3
       block $case44
        block $case35
         block $case26
          block $case17
           block $case08
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case08 $case17 $case26 $case35 $case44 $default3
           end
           local.get $13
           i32.const 2359776
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$43
          end
          local.get $13
          i32.const 262624
          i32.and
          i32.eqz
          local.get $13
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$43
         end
         local.get $13
         i32.const 2359776
         i32.and
         i32.eqz
         local.get $13
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$43
        end
        local.get $13
        i32.const -2145123872
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$43
       end
       local.get $13
       i32.const 245760
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$43
      end
      unreachable
     end
    else
     i32.const 0
    end
    if
     i32.const 0
     local.set $14
     i32.const 1
     local.set $13
     loop $for-loop|2
      local.get $13
      local.get $8
      i32.const 1
      i32.sub
      i32.lt_s
      if
       block $for-break2
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=4
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=8
        local.get $8
        local.get $0
        i32.load offset=28
        i32.add
        local.set $19
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=8
        block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$44 (result i32)
         local.get $0
         local.get $1
         local.get $2
         local.get $19
         local.get $13
         local.get $0
         i32.load offset=32
         i32.add
         local.get $3
         call $assembly/PathFinder/PathFinder#collisionFlag
         local.set $19
         block $default4
          block $case45
           block $case36
            block $case27
             block $case18
              block $case09
               local.get $12
               i32.const 8
               i32.sub
               i32.load
               i32.const 5
               i32.sub
               br_table $case09 $case18 $case27 $case36 $case45 $default4
              end
              local.get $19
              i32.const 2359779
              i32.and
              i32.eqz
              br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$44
             end
             local.get $19
             i32.const 262627
             i32.and
             i32.eqz
             local.get $19
             i32.const 2097152
             i32.and
             i32.const 0
             i32.ne
             i32.and
             br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$44
            end
            local.get $19
            i32.const 2359779
            i32.and
            i32.eqz
            local.get $19
            i32.const -2147483648
            i32.and
            i32.const 0
            i32.ne
            i32.and
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$44
           end
           local.get $19
           i32.const -2145123869
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$44
          end
          local.get $19
          i32.const 247296
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$44
         end
         unreachable
        end
        i32.eqz
        if
         i32.const 1
         local.set $14
         br $for-break2
        end
        local.get $13
        i32.const 1
        i32.add
        local.set $13
        br $for-loop|2
       end
      end
     end
     local.get $14
     i32.eqz
     if
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store
      local.get $0
      local.get $17
      local.get $18
      i32.const 8
      local.get $16
      call $assembly/PathFinder/PathFinder#appendDirection
     end
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    local.set $17
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    i32.const 1
    i32.sub
    local.set $18
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    i32.const 0
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=12
     local.tee $13
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=24
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $13
     local.get $17
     local.get $0
     i32.load offset=4
     i32.mul
     local.get $18
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
    else
     i32.const 1
    end
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$45 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $17
      local.get $18
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $13
      block $default5
       block $case46
        block $case37
         block $case28
          block $case19
           block $case010
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case010 $case19 $case28 $case37 $case46 $default5
           end
           local.get $13
           i32.const 2359566
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$45
          end
          local.get $13
          i32.const 262414
          i32.and
          i32.eqz
          local.get $13
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$45
         end
         local.get $13
         i32.const 2359566
         i32.and
         i32.eqz
         local.get $13
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$45
        end
        local.get $13
        i32.const -2145124082
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$45
       end
       local.get $13
       i32.const 138240
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$45
      end
      unreachable
     end
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$46 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $8
      local.get $0
      i32.load offset=28
      i32.add
      i32.const 1
      i32.sub
      local.get $18
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $13
      block $default6
       block $case47
        block $case38
         block $case29
          block $case110
           block $case011
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case011 $case110 $case29 $case38 $case47 $default6
           end
           local.get $13
           i32.const 2359683
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$46
          end
          local.get $13
          i32.const 262531
          i32.and
          i32.eqz
          local.get $13
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$46
         end
         local.get $13
         i32.const 2359683
         i32.and
         i32.eqz
         local.get $13
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$46
        end
        local.get $13
        i32.const -2145123965
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$46
       end
       local.get $13
       i32.const 198144
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$46
      end
      unreachable
     end
    else
     i32.const 0
    end
    if
     i32.const 0
     local.set $14
     i32.const 1
     local.set $13
     loop $for-loop|3
      local.get $13
      local.get $8
      i32.const 1
      i32.sub
      i32.lt_s
      if
       block $for-break3
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=4
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=8
        block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$47 (result i32)
         local.get $0
         local.get $1
         local.get $2
         local.get $13
         local.get $0
         i32.load offset=28
         i32.add
         local.get $18
         local.get $3
         call $assembly/PathFinder/PathFinder#collisionFlag
         local.set $19
         block $default7
          block $case48
           block $case39
            block $case210
             block $case111
              block $case012
               local.get $12
               i32.const 8
               i32.sub
               i32.load
               i32.const 5
               i32.sub
               br_table $case012 $case111 $case210 $case39 $case48 $default7
              end
              local.get $19
              i32.const 2359695
              i32.and
              i32.eqz
              br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$47
             end
             local.get $19
             i32.const 262543
             i32.and
             i32.eqz
             local.get $19
             i32.const 2097152
             i32.and
             i32.const 0
             i32.ne
             i32.and
             br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$47
            end
            local.get $19
            i32.const 2359695
            i32.and
            i32.eqz
            local.get $19
            i32.const -2147483648
            i32.and
            i32.const 0
            i32.ne
            i32.and
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$47
           end
           local.get $19
           i32.const -2145123953
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$47
          end
          local.get $19
          i32.const 204288
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$47
         end
         unreachable
        end
        i32.eqz
        if
         i32.const 1
         local.set $14
         br $for-break3
        end
        local.get $13
        i32.const 1
        i32.add
        local.set $13
        br $for-loop|3
       end
      end
     end
     local.get $14
     i32.eqz
     if
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store
      local.get $0
      local.get $17
      local.get $18
      i32.const 1
      local.get $16
      call $assembly/PathFinder/PathFinder#appendDirection
     end
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    local.set $17
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    i32.const 1
    i32.add
    local.set $18
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $15
    local.get $0
    i32.load offset=32
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=12
     local.tee $13
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=28
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $13
     local.get $17
     local.get $0
     i32.load offset=4
     i32.mul
     local.get $18
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
    else
     i32.const 1
    end
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$48 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $17
      local.get $8
      local.get $0
      i32.load offset=32
      i32.add
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $13
      block $default8
       block $case49
        block $case310
         block $case211
          block $case112
           block $case013
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case013 $case112 $case211 $case310 $case49 $default8
           end
           local.get $13
           i32.const 2359608
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$48
          end
          local.get $13
          i32.const 262456
          i32.and
          i32.eqz
          local.get $13
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$48
         end
         local.get $13
         i32.const 2359608
         i32.and
         i32.eqz
         local.get $13
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$48
        end
        local.get $13
        i32.const -2145124040
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$48
       end
       local.get $13
       i32.const 159744
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$48
      end
      unreachable
     end
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     local.get $8
     local.get $0
     i32.load offset=28
     i32.add
     i32.const 1
     i32.sub
     local.set $13
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$49 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $13
      local.get $8
      local.get $0
      i32.load offset=32
      i32.add
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $13
      block $default9
       block $case410
        block $case311
         block $case212
          block $case113
           block $case014
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case014 $case113 $case212 $case311 $case410 $default9
           end
           local.get $13
           i32.const 2359776
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$49
          end
          local.get $13
          i32.const 262624
          i32.and
          i32.eqz
          local.get $13
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$49
         end
         local.get $13
         i32.const 2359776
         i32.and
         i32.eqz
         local.get $13
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$49
        end
        local.get $13
        i32.const -2145123872
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$49
       end
       local.get $13
       i32.const 245760
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$49
      end
      unreachable
     end
    else
     i32.const 0
    end
    if
     i32.const 0
     local.set $14
     i32.const 1
     local.set $13
     loop $for-loop|4
      local.get $13
      local.get $8
      i32.const 1
      i32.sub
      i32.lt_s
      if
       block $for-break4
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=4
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=8
        block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$50 (result i32)
         local.get $0
         local.get $1
         local.get $2
         local.get $13
         local.get $17
         i32.add
         local.get $8
         local.get $0
         i32.load offset=32
         i32.add
         local.get $3
         call $assembly/PathFinder/PathFinder#collisionFlag
         local.set $19
         block $default10
          block $case411
           block $case312
            block $case213
             block $case114
              block $case015
               local.get $12
               i32.const 8
               i32.sub
               i32.load
               i32.const 5
               i32.sub
               br_table $case015 $case114 $case213 $case312 $case411 $default10
              end
              local.get $19
              i32.const 2359800
              i32.and
              i32.eqz
              br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$50
             end
             local.get $19
             i32.const 262648
             i32.and
             i32.eqz
             local.get $19
             i32.const 2097152
             i32.and
             i32.const 0
             i32.ne
             i32.and
             br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$50
            end
            local.get $19
            i32.const 2359800
            i32.and
            i32.eqz
            local.get $19
            i32.const -2147483648
            i32.and
            i32.const 0
            i32.ne
            i32.and
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$50
           end
           local.get $19
           i32.const -2145123848
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$50
          end
          local.get $19
          i32.const 258048
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$50
         end
         unreachable
        end
        i32.eqz
        if
         i32.const 1
         local.set $14
         br $for-break4
        end
        local.get $13
        i32.const 1
        i32.add
        local.set $13
        br $for-loop|4
       end
      end
     end
     local.get $14
     i32.eqz
     if
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store
      local.get $0
      local.get $17
      local.get $18
      i32.const 4
      local.get $16
      call $assembly/PathFinder/PathFinder#appendDirection
     end
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 1
    i32.sub
    local.set $17
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    i32.const 1
    i32.sub
    local.set $18
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 0
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     i32.load offset=32
     i32.const 0
     i32.gt_s
    else
     i32.const 0
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=12
     local.tee $13
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=32
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $13
     local.get $17
     local.get $0
     i32.load offset=4
     i32.mul
     local.get $18
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
    else
     i32.const 1
    end
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$51 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $17
      local.get $18
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $13
      block $default11
       block $case412
        block $case313
         block $case214
          block $case115
           block $case016
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case016 $case115 $case214 $case313 $case412 $default11
           end
           local.get $13
           i32.const 2359566
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$51
          end
          local.get $13
          i32.const 262414
          i32.and
          i32.eqz
          local.get $13
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$51
         end
         local.get $13
         i32.const 2359566
         i32.and
         i32.eqz
         local.get $13
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$51
        end
        local.get $13
        i32.const -2145124082
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$51
       end
       local.get $13
       i32.const 138240
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$51
      end
      unreachable
     end
    end
    if
     i32.const 0
     local.set $14
     i32.const 1
     local.set $13
     loop $for-loop|5
      local.get $8
      local.get $13
      i32.gt_s
      if
       block $for-break5
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=4
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=8
        block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$52 (result i32)
         local.get $0
         local.get $1
         local.get $2
         local.get $17
         local.get $13
         local.get $0
         i32.load offset=32
         i32.add
         i32.const 1
         i32.sub
         local.get $3
         call $assembly/PathFinder/PathFinder#collisionFlag
         local.set $19
         block $default12
          block $case413
           block $case314
            block $case215
             block $case116
              block $case017
               local.get $12
               i32.const 8
               i32.sub
               i32.load
               i32.const 5
               i32.sub
               br_table $case017 $case116 $case215 $case314 $case413 $default12
              end
              local.get $19
              i32.const 2359614
              i32.and
              i32.eqz
              br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$52
             end
             local.get $19
             i32.const 262462
             i32.and
             i32.eqz
             local.get $19
             i32.const 2097152
             i32.and
             i32.const 0
             i32.ne
             i32.and
             br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$52
            end
            local.get $19
            i32.const 2359614
            i32.and
            i32.eqz
            local.get $19
            i32.const -2147483648
            i32.and
            i32.const 0
            i32.ne
            i32.and
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$52
           end
           local.get $19
           i32.const -2145124034
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$52
          end
          local.get $19
          i32.const 162816
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$52
         end
         unreachable
        end
        if (result i32)
         global.get $~lib/memory/__stack_pointer
         local.get $12
         i32.store
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.store offset=4
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.store offset=8
         block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$53 (result i32)
          local.get $0
          local.get $1
          local.get $2
          local.get $13
          local.get $0
          i32.load offset=28
          i32.add
          i32.const 1
          i32.sub
          local.get $18
          local.get $3
          call $assembly/PathFinder/PathFinder#collisionFlag
          local.set $19
          block $default13
           block $case414
            block $case315
             block $case216
              block $case117
               block $case018
                local.get $12
                i32.const 8
                i32.sub
                i32.load
                i32.const 5
                i32.sub
                br_table $case018 $case117 $case216 $case315 $case414 $default13
               end
               local.get $19
               i32.const 2359695
               i32.and
               i32.eqz
               br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$53
              end
              local.get $19
              i32.const 262543
              i32.and
              i32.eqz
              local.get $19
              i32.const 2097152
              i32.and
              i32.const 0
              i32.ne
              i32.and
              br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$53
             end
             local.get $19
             i32.const 2359695
             i32.and
             i32.eqz
             local.get $19
             i32.const -2147483648
             i32.and
             i32.const 0
             i32.ne
             i32.and
             br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$53
            end
            local.get $19
            i32.const -2145123953
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$53
           end
           local.get $19
           i32.const 204288
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$53
          end
          unreachable
         end
        else
         i32.const 0
        end
        i32.eqz
        if
         i32.const 1
         local.set $14
         br $for-break5
        end
        local.get $13
        i32.const 1
        i32.add
        local.set $13
        br $for-loop|5
       end
      end
     end
     local.get $14
     i32.eqz
     if
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store
      local.get $0
      local.get $17
      local.get $18
      i32.const 3
      local.get $16
      call $assembly/PathFinder/PathFinder#appendDirection
     end
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 1
    i32.add
    local.set $17
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    i32.const 1
    i32.sub
    local.set $18
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $15
    local.get $0
    i32.load offset=28
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     i32.load offset=32
     i32.const 0
     i32.gt_s
    else
     i32.const 0
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=12
     local.tee $13
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=36
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $13
     local.get $17
     local.get $0
     i32.load offset=4
     i32.mul
     local.get $18
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
    else
     i32.const 1
    end
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$54 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $8
      local.get $0
      i32.load offset=28
      i32.add
      local.get $18
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $13
      block $default14
       block $case415
        block $case316
         block $case217
          block $case118
           block $case019
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case019 $case118 $case217 $case316 $case415 $default14
           end
           local.get $13
           i32.const 2359683
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$54
          end
          local.get $13
          i32.const 262531
          i32.and
          i32.eqz
          local.get $13
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$54
         end
         local.get $13
         i32.const 2359683
         i32.and
         i32.eqz
         local.get $13
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$54
        end
        local.get $13
        i32.const -2145123965
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$54
       end
       local.get $13
       i32.const 198144
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$54
      end
      unreachable
     end
    end
    if
     i32.const 0
     local.set $14
     i32.const 1
     local.set $13
     loop $for-loop|6
      local.get $8
      local.get $13
      i32.gt_s
      if
       block $for-break6
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=4
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=8
        local.get $8
        local.get $0
        i32.load offset=28
        i32.add
        local.set $19
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=8
        block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$55 (result i32)
         local.get $0
         local.get $1
         local.get $2
         local.get $19
         local.get $13
         local.get $0
         i32.load offset=32
         i32.add
         i32.const 1
         i32.sub
         local.get $3
         call $assembly/PathFinder/PathFinder#collisionFlag
         local.set $19
         block $default15
          block $case416
           block $case317
            block $case218
             block $case119
              block $case020
               local.get $12
               i32.const 8
               i32.sub
               i32.load
               i32.const 5
               i32.sub
               br_table $case020 $case119 $case218 $case317 $case416 $default15
              end
              local.get $19
              i32.const 2359779
              i32.and
              i32.eqz
              br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$55
             end
             local.get $19
             i32.const 262627
             i32.and
             i32.eqz
             local.get $19
             i32.const 2097152
             i32.and
             i32.const 0
             i32.ne
             i32.and
             br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$55
            end
            local.get $19
            i32.const 2359779
            i32.and
            i32.eqz
            local.get $19
            i32.const -2147483648
            i32.and
            i32.const 0
            i32.ne
            i32.and
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$55
           end
           local.get $19
           i32.const -2145123869
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$55
          end
          local.get $19
          i32.const 247296
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$55
         end
         unreachable
        end
        if (result i32)
         global.get $~lib/memory/__stack_pointer
         local.get $12
         i32.store
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.store offset=4
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.store offset=8
         block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$56 (result i32)
          local.get $0
          local.get $1
          local.get $2
          local.get $13
          local.get $0
          i32.load offset=28
          i32.add
          local.get $18
          local.get $3
          call $assembly/PathFinder/PathFinder#collisionFlag
          local.set $19
          block $default16
           block $case417
            block $case318
             block $case219
              block $case120
               block $case021
                local.get $12
                i32.const 8
                i32.sub
                i32.load
                i32.const 5
                i32.sub
                br_table $case021 $case120 $case219 $case318 $case417 $default16
               end
               local.get $19
               i32.const 2359695
               i32.and
               i32.eqz
               br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$56
              end
              local.get $19
              i32.const 262543
              i32.and
              i32.eqz
              local.get $19
              i32.const 2097152
              i32.and
              i32.const 0
              i32.ne
              i32.and
              br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$56
             end
             local.get $19
             i32.const 2359695
             i32.and
             i32.eqz
             local.get $19
             i32.const -2147483648
             i32.and
             i32.const 0
             i32.ne
             i32.and
             br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$56
            end
            local.get $19
            i32.const -2145123953
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$56
           end
           local.get $19
           i32.const 204288
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$56
          end
          unreachable
         end
        else
         i32.const 0
        end
        i32.eqz
        if
         i32.const 1
         local.set $14
         br $for-break6
        end
        local.get $13
        i32.const 1
        i32.add
        local.set $13
        br $for-loop|6
       end
      end
     end
     local.get $14
     i32.eqz
     if
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store
      local.get $0
      local.get $17
      local.get $18
      i32.const 9
      local.get $16
      call $assembly/PathFinder/PathFinder#appendDirection
     end
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 1
    i32.sub
    local.set $17
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    i32.const 1
    i32.add
    local.set $18
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 0
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $15
     local.get $0
     i32.load offset=32
     i32.gt_s
    else
     i32.const 0
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=12
     local.tee $13
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=40
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $13
     local.get $17
     local.get $0
     i32.load offset=4
     i32.mul
     local.get $18
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
    else
     i32.const 1
    end
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$57 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $17
      local.get $8
      local.get $0
      i32.load offset=32
      i32.add
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $13
      block $default17
       block $case418
        block $case319
         block $case220
          block $case121
           block $case022
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case022 $case121 $case220 $case319 $case418 $default17
           end
           local.get $13
           i32.const 2359608
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$57
          end
          local.get $13
          i32.const 262456
          i32.and
          i32.eqz
          local.get $13
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$57
         end
         local.get $13
         i32.const 2359608
         i32.and
         i32.eqz
         local.get $13
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$57
        end
        local.get $13
        i32.const -2145124040
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$57
       end
       local.get $13
       i32.const 159744
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$57
      end
      unreachable
     end
    end
    if
     i32.const 0
     local.set $14
     i32.const 1
     local.set $13
     loop $for-loop|7
      local.get $8
      local.get $13
      i32.gt_s
      if
       block $for-break7
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=4
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=8
        block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$58 (result i32)
         local.get $0
         local.get $1
         local.get $2
         local.get $17
         local.get $13
         local.get $0
         i32.load offset=32
         i32.add
         local.get $3
         call $assembly/PathFinder/PathFinder#collisionFlag
         local.set $19
         block $default18
          block $case419
           block $case320
            block $case221
             block $case122
              block $case023
               local.get $12
               i32.const 8
               i32.sub
               i32.load
               i32.const 5
               i32.sub
               br_table $case023 $case122 $case221 $case320 $case419 $default18
              end
              local.get $19
              i32.const 2359614
              i32.and
              i32.eqz
              br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$58
             end
             local.get $19
             i32.const 262462
             i32.and
             i32.eqz
             local.get $19
             i32.const 2097152
             i32.and
             i32.const 0
             i32.ne
             i32.and
             br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$58
            end
            local.get $19
            i32.const 2359614
            i32.and
            i32.eqz
            local.get $19
            i32.const -2147483648
            i32.and
            i32.const 0
            i32.ne
            i32.and
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$58
           end
           local.get $19
           i32.const -2145124034
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$58
          end
          local.get $19
          i32.const 162816
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$58
         end
         unreachable
        end
        if (result i32)
         global.get $~lib/memory/__stack_pointer
         local.get $12
         i32.store
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.store offset=4
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.store offset=8
         local.get $13
         local.get $0
         i32.load offset=28
         i32.add
         i32.const 1
         i32.sub
         local.set $19
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.store offset=8
         block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$59 (result i32)
          local.get $0
          local.get $1
          local.get $2
          local.get $19
          local.get $8
          local.get $0
          i32.load offset=32
          i32.add
          local.get $3
          call $assembly/PathFinder/PathFinder#collisionFlag
          local.set $19
          block $default19
           block $case420
            block $case321
             block $case222
              block $case123
               block $case024
                local.get $12
                i32.const 8
                i32.sub
                i32.load
                i32.const 5
                i32.sub
                br_table $case024 $case123 $case222 $case321 $case420 $default19
               end
               local.get $19
               i32.const 2359800
               i32.and
               i32.eqz
               br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$59
              end
              local.get $19
              i32.const 262648
              i32.and
              i32.eqz
              local.get $19
              i32.const 2097152
              i32.and
              i32.const 0
              i32.ne
              i32.and
              br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$59
             end
             local.get $19
             i32.const 2359800
             i32.and
             i32.eqz
             local.get $19
             i32.const -2147483648
             i32.and
             i32.const 0
             i32.ne
             i32.and
             br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$59
            end
            local.get $19
            i32.const -2145123848
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$59
           end
           local.get $19
           i32.const 258048
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$59
          end
          unreachable
         end
        else
         i32.const 0
        end
        i32.eqz
        if
         i32.const 1
         local.set $14
         br $for-break7
        end
        local.get $13
        i32.const 1
        i32.add
        local.set $13
        br $for-loop|7
       end
      end
     end
     local.get $14
     i32.eqz
     if
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store
      local.get $0
      local.get $17
      local.get $18
      i32.const 6
      local.get $16
      call $assembly/PathFinder/PathFinder#appendDirection
     end
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=28
    i32.const 1
    i32.add
    local.set $17
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=32
    i32.const 1
    i32.add
    local.set $18
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $15
    local.get $0
    i32.load offset=28
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $15
     local.get $0
     i32.load offset=32
     i32.gt_s
    else
     i32.const 0
    end
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=12
     local.tee $13
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=44
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $13
     local.get $17
     local.get $0
     i32.load offset=4
     i32.mul
     local.get $18
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
    else
     i32.const 1
    end
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     local.get $8
     local.get $0
     i32.load offset=28
     i32.add
     local.set $13
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$60 (result i32)
      local.get $0
      local.get $1
      local.get $2
      local.get $13
      local.get $8
      local.get $0
      i32.load offset=32
      i32.add
      local.get $3
      call $assembly/PathFinder/PathFinder#collisionFlag
      local.set $13
      block $default20
       block $case421
        block $case322
         block $case223
          block $case124
           block $case025
            local.get $12
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case025 $case124 $case223 $case322 $case421 $default20
           end
           local.get $13
           i32.const 2359776
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$60
          end
          local.get $13
          i32.const 262624
          i32.and
          i32.eqz
          local.get $13
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$60
         end
         local.get $13
         i32.const 2359776
         i32.and
         i32.eqz
         local.get $13
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$60
        end
        local.get $13
        i32.const -2145123872
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$60
       end
       local.get $13
       i32.const 245760
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$60
      end
      unreachable
     end
    end
    if
     i32.const 0
     local.set $14
     i32.const 1
     local.set $13
     loop $for-loop|8
      local.get $8
      local.get $13
      i32.gt_s
      if
       block $for-break8
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=4
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=8
        local.get $13
        local.get $0
        i32.load offset=28
        i32.add
        local.set $19
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=8
        block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$61 (result i32)
         local.get $0
         local.get $1
         local.get $2
         local.get $19
         local.get $8
         local.get $0
         i32.load offset=32
         i32.add
         local.get $3
         call $assembly/PathFinder/PathFinder#collisionFlag
         local.set $19
         block $default21
          block $case422
           block $case323
            block $case224
             block $case125
              block $case026
               local.get $12
               i32.const 8
               i32.sub
               i32.load
               i32.const 5
               i32.sub
               br_table $case026 $case125 $case224 $case323 $case422 $default21
              end
              local.get $19
              i32.const 2359800
              i32.and
              i32.eqz
              br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$61
             end
             local.get $19
             i32.const 262648
             i32.and
             i32.eqz
             local.get $19
             i32.const 2097152
             i32.and
             i32.const 0
             i32.ne
             i32.and
             br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$61
            end
            local.get $19
            i32.const 2359800
            i32.and
            i32.eqz
            local.get $19
            i32.const -2147483648
            i32.and
            i32.const 0
            i32.ne
            i32.and
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$61
           end
           local.get $19
           i32.const -2145123848
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$61
          end
          local.get $19
          i32.const 258048
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$61
         end
         unreachable
        end
        if (result i32)
         global.get $~lib/memory/__stack_pointer
         local.get $12
         i32.store
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.store offset=4
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.store offset=8
         local.get $8
         local.get $0
         i32.load offset=28
         i32.add
         local.set $19
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.store offset=8
         block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$62 (result i32)
          local.get $0
          local.get $1
          local.get $2
          local.get $19
          local.get $13
          local.get $0
          i32.load offset=32
          i32.add
          local.get $3
          call $assembly/PathFinder/PathFinder#collisionFlag
          local.set $19
          block $default22
           block $case423
            block $case324
             block $case225
              block $case126
               block $case027
                local.get $12
                i32.const 8
                i32.sub
                i32.load
                i32.const 5
                i32.sub
                br_table $case027 $case126 $case225 $case324 $case423 $default22
               end
               local.get $19
               i32.const 2359779
               i32.and
               i32.eqz
               br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$62
              end
              local.get $19
              i32.const 262627
              i32.and
              i32.eqz
              local.get $19
              i32.const 2097152
              i32.and
              i32.const 0
              i32.ne
              i32.and
              br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$62
             end
             local.get $19
             i32.const 2359779
             i32.and
             i32.eqz
             local.get $19
             i32.const -2147483648
             i32.and
             i32.const 0
             i32.ne
             i32.and
             br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$62
            end
            local.get $19
            i32.const -2145123869
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$62
           end
           local.get $19
           i32.const 247296
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$62
          end
          unreachable
         end
        else
         i32.const 0
        end
        i32.eqz
        if
         i32.const 1
         local.set $14
         br $for-break8
        end
        local.get $13
        i32.const 1
        i32.add
        local.set $13
        br $for-loop|8
       end
      end
     end
     local.get $14
     i32.eqz
     if
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store
      local.get $0
      local.get $17
      local.get $18
      i32.const 12
      local.get $16
      call $assembly/PathFinder/PathFinder#appendDirection
     end
    end
    br $while-continue|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 48
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $~lib/typedarray/Int32Array#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 5156
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.const 17
   call $~lib/rt/itcms/__new
   local.tee $1
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.set $2
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5156
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store offset=8
   local.get $1
   i32.eqz
   if
    global.get $~lib/memory/__stack_pointer
    i32.const 12
    i32.const 3
    call $~lib/rt/itcms/__new
    local.tee $1
    i32.store
   end
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $1
   i32.const 0
   i32.store
   local.get $1
   i32.const 0
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $1
   i32.const 0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $1
   i32.const 0
   i32.store offset=8
   local.get $0
   i32.const 268435455
   i32.gt_u
   if
    i32.const 1456
    i32.const 4352
    i32.const 19
    i32.const 57
    call $~lib/builtins/abort
    unreachable
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.const 2
   i32.shl
   local.tee $0
   i32.const 1
   call $~lib/rt/itcms/__new
   local.tee $3
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=12
   local.get $1
   local.get $3
   i32.store
   local.get $1
   local.get $3
   i32.const 0
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $1
   local.get $3
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $1
   local.get $0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $2
   local.get $1
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $1
   return
  end
  i32.const 37952
  i32.const 38000
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $assembly/PathFinder/PathFinder#findClosestApproachPoint (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (result i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 20
  memory.fill
  i32.const 1000
  local.set $7
  i32.const 100
  local.set $5
  local.get $1
  i32.const 10
  i32.sub
  local.set $10
  loop $for-loop|0
   local.get $10
   local.get $1
   i32.const 10
   i32.add
   i32.le_s
   if
    local.get $2
    i32.const 10
    i32.sub
    local.set $9
    loop $for-loop|1
     local.get $9
     local.get $2
     i32.const 10
     i32.add
     i32.le_s
     if
      local.get $10
      i32.const 0
      i32.ge_s
      if (result i32)
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store
       local.get $10
       local.get $0
       i32.load offset=4
       i32.lt_s
      else
       i32.const 0
      end
      if (result i32)
       local.get $9
       i32.const 0
       i32.ge_s
       if (result i32)
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store
        local.get $9
        local.get $0
        i32.load offset=4
        i32.lt_s
       else
        i32.const 0
       end
      else
       i32.const 0
      end
      if (result i32)
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=4
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.load offset=16
       local.tee $6
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=8
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=4
       local.get $6
       local.get $10
       local.get $0
       i32.load offset=4
       i32.mul
       local.get $9
       i32.add
       i32.const 2
       i32.shl
       i32.add
       i32.load
       i32.const 100
       i32.ge_s
      else
       i32.const 1
      end
      i32.eqz
      if
       local.get $1
       local.get $10
       i32.gt_s
       if (result i32)
        local.get $1
        local.get $10
        i32.sub
       else
        local.get $10
        local.get $1
        local.get $3
        i32.add
        i32.const 1
        i32.sub
        local.tee $6
        i32.sub
        i32.const 0
        local.get $6
        local.get $10
        i32.lt_s
        select
       end
       local.tee $6
       local.get $6
       i32.mul
       local.get $2
       local.get $9
       i32.gt_s
       if (result i32)
        local.get $2
        local.get $9
        i32.sub
       else
        local.get $9
        local.get $2
        local.get $4
        i32.add
        i32.const 1
        i32.sub
        local.tee $6
        i32.sub
        i32.const 0
        local.get $6
        local.get $9
        i32.lt_s
        select
       end
       local.tee $6
       local.get $6
       i32.mul
       i32.add
       local.tee $6
       local.get $7
       i32.lt_s
       if (result i32)
        i32.const 1
       else
        local.get $6
        local.get $7
        i32.eq
        if (result i32)
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.store offset=4
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.load offset=16
         local.tee $8
         i32.store
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.store offset=12
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.store offset=4
         local.get $5
         local.get $8
         local.get $10
         local.get $0
         i32.load offset=4
         i32.mul
         local.get $9
         i32.add
         i32.const 2
         i32.shl
         i32.add
         i32.load
         i32.gt_s
        else
         i32.const 0
        end
       end
       if
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store
        local.get $0
        local.get $10
        i32.store offset=28
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store
        local.get $0
        local.get $9
        i32.store offset=32
        local.get $6
        local.set $7
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=4
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.load offset=16
        local.tee $5
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=16
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=4
        local.get $5
        local.get $10
        local.get $0
        i32.load offset=4
        i32.mul
        local.get $9
        i32.add
        i32.const 2
        i32.shl
        i32.add
        i32.load
        local.set $5
       end
      end
      local.get $9
      i32.const 1
      i32.add
      local.set $9
      br $for-loop|1
     end
    end
    local.get $10
    i32.const 1
    i32.add
    local.set $10
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $7
  i32.const 1000
  i32.ne
 )
 (func $~lib/array/Array<i32>#get:length (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=12
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/array/ensureCapacity (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.load offset=8
  local.tee $2
  i32.const 2
  i32.shr_u
  i32.gt_u
  if
   local.get $1
   i32.const 268435455
   i32.gt_u
   if
    i32.const 1456
    i32.const 4496
    i32.const 19
    i32.const 48
    call $~lib/builtins/abort
    unreachable
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   block $__inlined_func$~lib/rt/itcms/__renew$741
    i32.const 1073741820
    local.get $2
    i32.const 1
    i32.shl
    local.tee $2
    local.get $2
    i32.const 1073741820
    i32.ge_u
    select
    local.tee $2
    i32.const 8
    local.get $1
    local.get $1
    i32.const 8
    i32.le_u
    select
    i32.const 2
    i32.shl
    local.tee $1
    local.get $1
    local.get $2
    i32.lt_u
    select
    local.tee $3
    local.get $0
    i32.load
    local.tee $2
    i32.const 20
    i32.sub
    local.tee $4
    i32.load
    i32.const -4
    i32.and
    i32.const 16
    i32.sub
    i32.le_u
    if
     local.get $4
     local.get $3
     i32.store offset=16
     local.get $2
     local.set $1
     br $__inlined_func$~lib/rt/itcms/__renew$741
    end
    local.get $3
    local.get $4
    i32.load offset=12
    call $~lib/rt/itcms/__new
    local.tee $1
    local.get $2
    local.get $3
    local.get $4
    i32.load offset=16
    local.tee $4
    local.get $3
    local.get $4
    i32.lt_u
    select
    memory.copy
   end
   local.get $1
   local.get $2
   i32.ne
   if
    local.get $0
    local.get $1
    i32.store
    local.get $0
    local.get $1
    i32.store offset=4
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/rt/itcms/__link
   end
   local.get $0
   local.get $3
   i32.store offset=8
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/array/Array<i32>#__get (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.load offset=12
  i32.ge_u
  if
   i32.const 1248
   i32.const 4496
   i32.const 114
   i32.const 42
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=4
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/typedarray/Int32Array#__set (param $0 i32) (param $1 i32) (param $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.load offset=8
  i32.const 2
  i32.shr_u
  i32.ge_u
  if
   i32.const 1248
   i32.const 4544
   i32.const 747
   i32.const 64
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=4
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  local.get $2
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/PathFinder/PathFinder#findPath (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (param $7 i32) (param $8 i32) (param $9 i32) (param $10 i32) (param $11 i32) (param $12 i32) (param $13 i32) (param $14 i32) (result i32)
  (local $15 i32)
  (local $16 i32)
  (local $17 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 44
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner1
   block $folding-inner0
    global.get $~lib/memory/__stack_pointer
    i32.const 5156
    i32.lt_s
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    i32.const 0
    i32.const 44
    memory.fill
    local.get $2
    i32.const 32767
    i32.le_s
    local.get $2
    i32.const 0
    i32.ge_s
    i32.and
    local.get $3
    i32.const 0
    i32.ge_s
    i32.and
    local.get $3
    i32.const 32767
    i32.le_s
    i32.and
    i32.eqz
    if
     global.get $~lib/memory/__stack_pointer
     local.get $2
     call $~lib/number/I32#toString
     local.tee $0
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $3
     call $~lib/number/I32#toString
     local.tee $1
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     i32.const 3840
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=12
     i32.const 3844
     local.get $0
     i32.store
     i32.const 3840
     local.get $0
     i32.const 1
     call $~lib/rt/itcms/__link
     global.get $~lib/memory/__stack_pointer
     i32.const 3840
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=12
     i32.const 3852
     local.get $1
     i32.store
     i32.const 3840
     local.get $1
     i32.const 1
     call $~lib/rt/itcms/__link
     global.get $~lib/memory/__stack_pointer
     i32.const 3840
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     i32.const 3552
     i32.store offset=12
     i32.const 3840
     call $~lib/staticarray/StaticArray<~lib/string/String>#join
     i32.const 3888
     i32.const 57
     i32.const 13
     call $~lib/builtins/abort
     unreachable
    end
    local.get $4
    i32.const 32767
    i32.le_s
    local.get $4
    i32.const 0
    i32.ge_s
    i32.and
    local.get $5
    i32.const 0
    i32.ge_s
    i32.and
    local.get $5
    i32.const 32767
    i32.le_s
    i32.and
    i32.eqz
    if
     global.get $~lib/memory/__stack_pointer
     local.get $4
     call $~lib/number/I32#toString
     local.tee $0
     i32.store offset=16
     global.get $~lib/memory/__stack_pointer
     local.get $5
     call $~lib/number/I32#toString
     local.tee $1
     i32.store offset=20
     global.get $~lib/memory/__stack_pointer
     i32.const 4112
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=12
     i32.const 4116
     local.get $0
     i32.store
     i32.const 4112
     local.get $0
     i32.const 1
     call $~lib/rt/itcms/__link
     global.get $~lib/memory/__stack_pointer
     i32.const 4112
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=12
     i32.const 4124
     local.get $1
     i32.store
     i32.const 4112
     local.get $1
     i32.const 1
     call $~lib/rt/itcms/__link
     global.get $~lib/memory/__stack_pointer
     i32.const 4112
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     i32.const 3552
     i32.store offset=12
     i32.const 4112
     call $~lib/staticarray/StaticArray<~lib/string/String>#join
     i32.const 3888
     i32.const 60
     i32.const 13
     call $~lib/builtins/abort
     unreachable
    end
    local.get $1
    i32.const 3
    i32.le_s
    local.get $1
    i32.const 0
    i32.ge_s
    i32.and
    i32.eqz
    if
     global.get $~lib/memory/__stack_pointer
     local.get $1
     call $~lib/number/I32#toString
     local.tee $0
     i32.store offset=24
     global.get $~lib/memory/__stack_pointer
     i32.const 4320
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=12
     i32.const 4324
     local.get $0
     i32.store
     i32.const 4320
     local.get $0
     i32.const 1
     call $~lib/rt/itcms/__link
     global.get $~lib/memory/__stack_pointer
     i32.const 4320
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     i32.const 3552
     i32.store offset=12
     i32.const 4320
     call $~lib/staticarray/StaticArray<~lib/string/String>#join
     i32.const 3888
     i32.const 63
     i32.const 13
     call $~lib/builtins/abort
     unreachable
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.sub
    global.set $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    i32.const 5156
    i32.lt_s
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    i64.const 0
    i64.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=12
    local.tee $15
    i32.store
    i32.const 1
    global.set $~argumentsLength
    local.get $15
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#fill@varargs
    drop
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=16
    local.tee $15
    i32.store
    i32.const 1
    global.set $~argumentsLength
    local.get $15
    i32.const 99999999
    call $~lib/staticarray/StaticArray<i32>#fill@varargs
    drop
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.const 0
    i32.store offset=36
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.const 0
    i32.store offset=40
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.add
    global.set $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    local.get $2
    local.get $0
    i32.load offset=4
    i32.const 2
    i32.div_s
    i32.sub
    local.set $16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    local.get $3
    local.get $3
    local.get $0
    i32.load offset=4
    i32.const 2
    i32.div_s
    i32.sub
    local.tee $17
    i32.sub
    local.set $15
    local.get $4
    local.get $16
    i32.sub
    local.set $3
    local.get $5
    local.get $17
    i32.sub
    local.set $4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    local.get $0
    local.get $2
    local.get $16
    i32.sub
    local.tee $2
    local.get $15
    i32.const 99
    i32.const 0
    call $assembly/PathFinder/PathFinder#appendDirection
    block $break|0 (result i32)
     block $case2|0
      block $case1|0
       local.get $6
       i32.const 1
       i32.ne
       if
        local.get $6
        i32.const 2
        i32.eq
        br_if $case1|0
        br $case2|0
       end
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=8
       global.get $~lib/memory/__stack_pointer
       local.get $14
       i32.store offset=12
       local.get $0
       local.get $16
       local.get $17
       local.get $1
       local.get $3
       local.get $4
       local.get $7
       local.get $8
       local.get $6
       local.get $9
       local.get $10
       local.get $12
       local.get $14
       call $assembly/PathFinder/PathFinder#findPath1
       br $break|0
      end
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $14
      i32.store offset=12
      local.get $0
      local.get $16
      local.get $17
      local.get $1
      local.get $3
      local.get $4
      local.get $7
      local.get $8
      local.get $6
      local.get $9
      local.get $10
      local.get $12
      local.get $14
      call $assembly/PathFinder/PathFinder#findPath2
      br $break|0
     end
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $14
     i32.store offset=12
     local.get $0
     local.get $16
     local.get $17
     local.get $1
     local.get $3
     local.get $4
     local.get $7
     local.get $8
     local.get $6
     local.get $9
     local.get $10
     local.get $12
     local.get $14
     call $assembly/PathFinder/PathFinder#findPathN
    end
    i32.eqz
    if
     local.get $11
     i32.eqz
     br_if $folding-inner1
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     local.get $0
     local.get $3
     local.get $4
     local.get $8
     local.get $7
     local.get $9
     i32.const 1
     i32.and
     local.tee $3
     select
     local.get $7
     local.get $8
     local.get $3
     select
     call $assembly/PathFinder/PathFinder#findClosestApproachPoint
     i32.eqz
     br_if $folding-inner1
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 4416
    call $~lib/rt/__newArray
    local.tee $5
    i32.store offset=28
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=12
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=12
    local.tee $3
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=32
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=12
    local.get $0
    i32.load offset=28
    local.set $4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=12
    local.get $0
    i32.load offset=32
    local.set $6
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=12
    local.get $3
    local.get $6
    local.get $4
    local.get $0
    i32.load offset=4
    i32.mul
    i32.add
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.set $4
    i32.const -1
    local.set $3
    i32.const 0
    local.set $6
    loop $for-loop|1
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=12
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=12
     local.tee $7
     i32.store offset=8
     local.get $6
     local.get $7
     i32.const 20
     i32.sub
     i32.load offset=16
     i32.const 2
     i32.shr_u
     i32.lt_s
     if
      block $for-break1
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=8
       local.get $2
       local.get $0
       i32.load offset=28
       i32.eq
       if (result i32)
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=8
        local.get $15
        local.get $0
        i32.load offset=32
        i32.eq
       else
        i32.const 0
       end
       br_if $for-break1
       local.get $3
       local.get $4
       i32.ne
       if
        local.get $4
        local.set $3
        global.get $~lib/memory/__stack_pointer
        local.get $5
        i32.store offset=8
        local.get $5
        call $~lib/array/Array<i32>#get:length
        local.get $13
        i32.ge_s
        if
         global.get $~lib/memory/__stack_pointer
         local.get $5
         i32.store offset=8
         global.get $~lib/memory/__stack_pointer
         i32.const 4
         i32.sub
         global.set $~lib/memory/__stack_pointer
         global.get $~lib/memory/__stack_pointer
         i32.const 5156
         i32.lt_s
         br_if $folding-inner0
         global.get $~lib/memory/__stack_pointer
         i32.const 0
         i32.store
         global.get $~lib/memory/__stack_pointer
         local.get $5
         i32.store
         local.get $5
         i32.load offset=12
         local.tee $4
         i32.const 0
         i32.le_s
         if
          i32.const 4448
          i32.const 4496
          i32.const 271
          i32.const 18
          call $~lib/builtins/abort
          unreachable
         end
         global.get $~lib/memory/__stack_pointer
         local.get $5
         i32.store
         local.get $5
         i32.load offset=4
         local.get $4
         i32.const 1
         i32.sub
         local.tee $4
         i32.const 2
         i32.shl
         i32.add
         i32.load
         drop
         global.get $~lib/memory/__stack_pointer
         local.get $5
         i32.store
         local.get $5
         local.get $4
         i32.store offset=12
         global.get $~lib/memory/__stack_pointer
         i32.const 4
         i32.add
         global.set $~lib/memory/__stack_pointer
        end
        global.get $~lib/memory/__stack_pointer
        local.get $5
        i32.store offset=8
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=12
        local.get $17
        local.get $0
        i32.load offset=32
        i32.add
        i32.const 16383
        i32.and
        local.set $4
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=12
        local.get $4
        local.get $16
        local.get $0
        i32.load offset=28
        i32.add
        i32.const 16383
        i32.and
        i32.const 14
        i32.shl
        i32.or
        local.get $1
        i32.const 3
        i32.and
        i32.const 28
        i32.shl
        i32.or
        local.set $4
        global.get $~lib/memory/__stack_pointer
        i32.const 4
        i32.sub
        global.set $~lib/memory/__stack_pointer
        global.get $~lib/memory/__stack_pointer
        i32.const 5156
        i32.lt_s
        br_if $folding-inner0
        global.get $~lib/memory/__stack_pointer
        i32.const 0
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $5
        i32.store
        local.get $5
        local.get $5
        i32.load offset=12
        i32.const 1
        i32.add
        local.tee $7
        call $~lib/array/ensureCapacity
        global.get $~lib/memory/__stack_pointer
        local.get $5
        i32.store
        local.get $5
        i32.load offset=4
        local.tee $8
        i32.const 4
        i32.add
        local.get $8
        local.get $7
        i32.const 1
        i32.sub
        i32.const 2
        i32.shl
        memory.copy
        local.get $8
        local.get $4
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $5
        i32.store
        local.get $5
        local.get $7
        i32.store offset=12
        global.get $~lib/memory/__stack_pointer
        i32.const 4
        i32.add
        global.set $~lib/memory/__stack_pointer
       end
       local.get $3
       i32.const 2
       i32.and
       if
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=8
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=12
        local.get $0
        local.get $0
        i32.load offset=28
        i32.const 1
        i32.add
        i32.store offset=28
       else
        local.get $3
        i32.const 8
        i32.and
        if
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.store offset=8
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.store offset=12
         local.get $0
         local.get $0
         i32.load offset=28
         i32.const 1
         i32.sub
         i32.store offset=28
        end
       end
       local.get $3
       i32.const 1
       i32.and
       if
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=8
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=12
        local.get $0
        local.get $0
        i32.load offset=32
        i32.const 1
        i32.add
        i32.store offset=32
       else
        local.get $3
        i32.const 4
        i32.and
        if
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.store offset=8
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.store offset=12
         local.get $0
         local.get $0
         i32.load offset=32
         i32.const 1
         i32.sub
         i32.store offset=32
        end
       end
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=12
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.load offset=12
       local.tee $4
       i32.store offset=8
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=36
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=12
       local.get $0
       i32.load offset=28
       local.set $7
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=12
       local.get $0
       i32.load offset=32
       local.set $8
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=12
       local.get $4
       local.get $8
       local.get $7
       local.get $0
       i32.load offset=4
       i32.mul
       i32.add
       i32.const 2
       i32.shl
       i32.add
       i32.load
       local.set $4
       local.get $6
       i32.const 1
       i32.add
       local.set $6
       br $for-loop|1
      end
     end
    end
    global.get $~lib/memory/__stack_pointer
    local.get $5
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $5
    call $~lib/array/Array<i32>#get:length
    call $~lib/typedarray/Int32Array#constructor
    local.tee $0
    i32.store offset=40
    i32.const 0
    local.set $1
    loop $for-loop|2
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.store offset=8
     local.get $5
     call $~lib/array/Array<i32>#get:length
     local.get $1
     i32.gt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $5
      i32.store offset=12
      local.get $0
      local.get $1
      local.get $5
      local.get $1
      call $~lib/array/Array<i32>#__get
      call $~lib/typedarray/Int32Array#__set
      local.get $1
      i32.const 1
      i32.add
      local.set $1
      br $for-loop|2
     end
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 44
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $0
    return
   end
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  i32.const 0
  call $~lib/typedarray/Int32Array#constructor
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 44
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/collision/CollisionFlagMap/CollisionFlagMap#allocateIfAbsent (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 20
  memory.fill
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $4
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.const 3
  i32.shr_s
  i32.const 2047
  i32.and
  local.get $2
  i32.const 3
  i32.shr_s
  i32.const 2047
  i32.and
  i32.const 11
  i32.shl
  i32.or
  local.get $3
  i32.const 3
  i32.and
  i32.const 22
  i32.shl
  i32.or
  local.tee $1
  i32.const 2
  i32.shl
  local.get $4
  i32.add
  i32.load
  local.tee $2
  i32.store offset=8
  local.get $2
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 20
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $2
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 64
  call $~lib/staticarray/StaticArray<i32>#constructor
  local.tee $2
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=16
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  local.get $0
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  local.get $2
  i32.store
  local.get $0
  local.get $2
  i32.const 1
  call $~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $assembly/collision/CollisionFlagMap/CollisionFlagMap#set (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $5
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $5
  local.get $1
  i32.const 3
  i32.shr_s
  i32.const 2047
  i32.and
  local.get $2
  i32.const 3
  i32.shr_s
  i32.const 2047
  i32.and
  i32.const 11
  i32.shl
  i32.or
  local.get $3
  i32.const 3
  i32.and
  i32.const 22
  i32.shl
  i32.or
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.tee $5
  i32.store offset=8
  local.get $5
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   local.get $1
   local.get $2
   local.get $3
   call $assembly/collision/CollisionFlagMap/CollisionFlagMap#allocateIfAbsent
   local.tee $5
   i32.store offset=8
  end
  global.get $~lib/memory/__stack_pointer
  local.get $5
  i32.store
  local.get $5
  local.get $1
  i32.const 7
  i32.and
  local.get $2
  i32.const 7
  i32.and
  i32.const 3
  i32.shl
  i32.or
  i32.const 2
  i32.shl
  i32.add
  local.get $4
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/collision/CollisionFlagMap/CollisionFlagMap#add (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32)
  (local $5 i32)
  (local $6 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  local.get $1
  i32.const 7
  i32.and
  local.get $2
  i32.const 7
  i32.and
  i32.const 3
  i32.shl
  i32.or
  local.set $5
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $6
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $6
  local.get $1
  i32.const 3
  i32.shr_s
  i32.const 2047
  i32.and
  local.get $2
  i32.const 3
  i32.shr_s
  i32.const 2047
  i32.and
  i32.const 11
  i32.shl
  i32.or
  local.get $3
  i32.const 3
  i32.and
  i32.const 22
  i32.shl
  i32.or
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.tee $6
  i32.store offset=8
  local.get $6
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   local.get $6
   i32.store
   local.get $5
   local.get $6
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 2
   i32.shr_u
   i32.lt_s
  else
   i32.const 0
  end
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   local.get $6
   i32.store
   local.get $6
   local.get $5
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $5
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $1
  local.get $2
  local.get $3
  local.get $4
  local.get $5
  i32.or
  call $assembly/collision/CollisionFlagMap/CollisionFlagMap#set
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32)
  (local $5 i32)
  (local $6 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  local.get $1
  i32.const 7
  i32.and
  local.get $2
  i32.const 7
  i32.and
  i32.const 3
  i32.shl
  i32.or
  local.set $5
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $6
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $6
  local.get $1
  i32.const 3
  i32.shr_s
  i32.const 2047
  i32.and
  local.get $2
  i32.const 3
  i32.shr_s
  i32.const 2047
  i32.and
  i32.const 11
  i32.shl
  i32.or
  local.get $3
  i32.const 3
  i32.and
  i32.const 22
  i32.shl
  i32.or
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.tee $6
  i32.store offset=8
  local.get $6
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   local.get $6
   i32.store
   local.get $5
   local.get $6
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 2
   i32.shr_u
   i32.lt_s
  else
   i32.const 0
  end
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   local.get $6
   i32.store
   local.get $6
   local.get $5
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $5
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $1
  local.get $2
  local.get $3
  local.get $5
  local.get $4
  i32.const -1
  i32.xor
  i32.and
  call $assembly/collision/CollisionFlagMap/CollisionFlagMap#set
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/index/changeFloor (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $3
  if
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/index/flags
   local.tee $3
   i32.store
   local.get $3
   local.get $0
   local.get $1
   local.get $2
   i32.const 2097152
   call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
  else
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/index/flags
   local.tee $3
   i32.store
   local.get $3
   local.get $0
   local.get $1
   local.get $2
   i32.const 2097152
   call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/index/changeLoc (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (param $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  i32.const 131328
  i32.const 256
  local.get $5
  select
  local.tee $5
  i32.const 1073741824
  i32.or
  local.get $5
  local.get $6
  select
  local.set $8
  i32.const 0
  local.set $5
  loop $for-loop|0
   local.get $5
   local.get $3
   local.get $4
   i32.mul
   i32.lt_s
   if
    local.get $0
    local.get $5
    local.get $3
    i32.rem_s
    i32.add
    local.set $9
    local.get $1
    local.get $5
    local.get $3
    i32.div_s
    i32.add
    local.set $6
    local.get $7
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/index/flags
     local.tee $10
     i32.store
     local.get $10
     local.get $9
     local.get $6
     local.get $2
     local.get $8
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
    else
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/index/flags
     local.tee $10
     i32.store
     local.get $10
     local.get $9
     local.get $6
     local.get $2
     local.get $8
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
    end
    local.get $5
    i32.const 1
    i32.add
    local.set $5
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/index/changeNpc (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  loop $for-loop|0
   local.get $5
   local.get $3
   local.get $3
   i32.mul
   i32.lt_s
   if
    local.get $0
    local.get $5
    local.get $3
    i32.rem_s
    i32.add
    local.set $6
    local.get $1
    local.get $5
    local.get $3
    i32.div_s
    i32.add
    local.set $7
    local.get $4
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/index/flags
     local.tee $8
     i32.store
     local.get $8
     local.get $6
     local.get $7
     local.get $2
     i32.const 524288
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
    else
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/index/flags
     local.tee $8
     i32.store
     local.get $8
     local.get $6
     local.get $7
     local.get $2
     i32.const 524288
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
    end
    local.get $5
    i32.const 1
    i32.add
    local.set $5
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/index/changePlayer (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  loop $for-loop|0
   local.get $5
   local.get $3
   local.get $3
   i32.mul
   i32.lt_s
   if
    local.get $0
    local.get $5
    local.get $3
    i32.rem_s
    i32.add
    local.set $6
    local.get $1
    local.get $5
    local.get $3
    i32.div_s
    i32.add
    local.set $7
    local.get $4
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/index/flags
     local.tee $8
     i32.store
     local.get $8
     local.get $6
     local.get $7
     local.get $2
     i32.const 1048576
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
    else
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/index/flags
     local.tee $8
     i32.store
     local.get $8
     local.get $6
     local.get $7
     local.get $2
     i32.const 1048576
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
    end
    local.get $5
    i32.const 1
    i32.add
    local.set $5
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/index/changeRoof (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $3
  if
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/index/flags
   local.tee $3
   i32.store
   local.get $3
   local.get $0
   local.get $1
   local.get $2
   i32.const -2147483648
   call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
  else
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/index/flags
   local.tee $3
   i32.store
   local.get $3
   local.get $0
   local.get $1
   local.get $2
   i32.const -2147483648
   call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/index/changeWallStraight (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  i32.const 536870912
  i32.const 65536
  i32.const 128
  local.get $4
  select
  local.get $5
  select
  local.set $9
  i32.const 33554432
  i32.const 4096
  i32.const 8
  local.get $4
  select
  local.get $5
  select
  local.set $7
  local.get $3
  if
   i32.const 8388608
   i32.const 1024
   i32.const 2
   local.get $4
   select
   local.get $5
   select
   local.set $8
   i32.const 134217728
   i32.const 16384
   i32.const 32
   local.get $4
   select
   local.get $5
   select
   local.set $10
   local.get $3
   i32.const 1
   i32.eq
   if
    local.get $6
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/index/flags
     local.tee $7
     i32.store
     local.get $7
     local.get $0
     local.get $1
     local.get $2
     local.get $8
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/index/flags
     local.tee $7
     i32.store
     local.get $7
     local.get $0
     local.get $1
     i32.const 1
     i32.add
     local.get $2
     local.get $10
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
    else
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/index/flags
     local.tee $7
     i32.store
     local.get $7
     local.get $0
     local.get $1
     local.get $2
     local.get $8
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/index/flags
     local.tee $7
     i32.store
     local.get $7
     local.get $0
     local.get $1
     i32.const 1
     i32.add
     local.get $2
     local.get $10
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
    end
   else
    local.get $3
    i32.const 2
    i32.eq
    if
     local.get $6
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/index/flags
      local.tee $8
      i32.store
      local.get $8
      local.get $0
      local.get $1
      local.get $2
      local.get $7
      call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/index/flags
      local.tee $7
      i32.store
      local.get $7
      local.get $0
      i32.const 1
      i32.add
      local.get $1
      local.get $2
      local.get $9
      call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
     else
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/index/flags
      local.tee $8
      i32.store
      local.get $8
      local.get $0
      local.get $1
      local.get $2
      local.get $7
      call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/index/flags
      local.tee $7
      i32.store
      local.get $7
      local.get $0
      i32.const 1
      i32.add
      local.get $1
      local.get $2
      local.get $9
      call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
     end
    else
     local.get $3
     i32.const 3
     i32.eq
     if
      local.get $6
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/index/flags
       local.tee $7
       i32.store
       local.get $7
       local.get $0
       local.get $1
       local.get $2
       local.get $10
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/index/flags
       local.tee $7
       i32.store
       local.get $7
       local.get $0
       local.get $1
       i32.const 1
       i32.sub
       local.get $2
       local.get $8
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
      else
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/index/flags
       local.tee $7
       i32.store
       local.get $7
       local.get $0
       local.get $1
       local.get $2
       local.get $10
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/index/flags
       local.tee $7
       i32.store
       local.get $7
       local.get $0
       local.get $1
       i32.const 1
       i32.sub
       local.get $2
       local.get $8
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
      end
     end
    end
   end
  else
   local.get $6
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/index/flags
    local.tee $8
    i32.store
    local.get $8
    local.get $0
    local.get $1
    local.get $2
    local.get $9
    call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/index/flags
    local.tee $8
    i32.store
    local.get $8
    local.get $0
    i32.const 1
    i32.sub
    local.get $1
    local.get $2
    local.get $7
    call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
   else
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/index/flags
    local.tee $8
    i32.store
    local.get $8
    local.get $0
    local.get $1
    local.get $2
    local.get $9
    call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/index/flags
    local.tee $8
    i32.store
    local.get $8
    local.get $0
    i32.const 1
    i32.sub
    local.get $1
    local.get $2
    local.get $7
    call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
   end
  end
  local.get $5
  if
   local.get $0
   local.get $1
   local.get $2
   local.get $3
   local.get $4
   i32.const 0
   local.get $6
   call $assembly/index/changeWallStraight
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  local.get $4
  if
   local.get $0
   local.get $1
   local.get $2
   local.get $3
   i32.const 0
   i32.const 0
   local.get $6
   call $assembly/index/changeWallStraight
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/index/changeWallCorner (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  i32.const 4194304
  i32.const 512
  i32.const 1
  local.get $4
  select
  local.get $5
  select
  local.set $9
  i32.const 67108864
  i32.const 8192
  i32.const 16
  local.get $4
  select
  local.get $5
  select
  local.set $7
  local.get $3
  if
   i32.const 16777216
   i32.const 2048
   i32.const 4
   local.get $4
   select
   local.get $5
   select
   local.set $8
   i32.const 268435456
   i32.const 32768
   i32.const 64
   local.get $4
   select
   local.get $5
   select
   local.set $10
   local.get $3
   i32.const 1
   i32.eq
   if
    local.get $6
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/index/flags
     local.tee $7
     i32.store
     local.get $7
     local.get $0
     local.get $1
     local.get $2
     local.get $8
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/index/flags
     local.tee $7
     i32.store
     local.get $7
     local.get $0
     i32.const 1
     i32.add
     local.get $1
     i32.const 1
     i32.add
     local.get $2
     local.get $10
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
    else
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/index/flags
     local.tee $7
     i32.store
     local.get $7
     local.get $0
     local.get $1
     local.get $2
     local.get $8
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/index/flags
     local.tee $7
     i32.store
     local.get $7
     local.get $0
     i32.const 1
     i32.add
     local.get $1
     i32.const 1
     i32.add
     local.get $2
     local.get $10
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
    end
   else
    local.get $3
    i32.const 2
    i32.eq
    if
     local.get $6
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/index/flags
      local.tee $8
      i32.store
      local.get $8
      local.get $0
      local.get $1
      local.get $2
      local.get $7
      call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/index/flags
      local.tee $7
      i32.store
      local.get $7
      local.get $0
      i32.const 1
      i32.add
      local.get $1
      i32.const 1
      i32.sub
      local.get $2
      local.get $9
      call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
     else
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/index/flags
      local.tee $8
      i32.store
      local.get $8
      local.get $0
      local.get $1
      local.get $2
      local.get $7
      call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/index/flags
      local.tee $7
      i32.store
      local.get $7
      local.get $0
      i32.const 1
      i32.add
      local.get $1
      i32.const 1
      i32.sub
      local.get $2
      local.get $9
      call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
     end
    else
     local.get $3
     i32.const 3
     i32.eq
     if
      local.get $6
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/index/flags
       local.tee $7
       i32.store
       local.get $7
       local.get $0
       local.get $1
       local.get $2
       local.get $10
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/index/flags
       local.tee $7
       i32.store
       local.get $7
       local.get $0
       i32.const 1
       i32.sub
       local.get $1
       i32.const 1
       i32.sub
       local.get $2
       local.get $8
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
      else
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/index/flags
       local.tee $7
       i32.store
       local.get $7
       local.get $0
       local.get $1
       local.get $2
       local.get $10
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/index/flags
       local.tee $7
       i32.store
       local.get $7
       local.get $0
       i32.const 1
       i32.sub
       local.get $1
       i32.const 1
       i32.sub
       local.get $2
       local.get $8
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
      end
     end
    end
   end
  else
   local.get $6
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/index/flags
    local.tee $8
    i32.store
    local.get $8
    local.get $0
    local.get $1
    local.get $2
    local.get $9
    call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/index/flags
    local.tee $8
    i32.store
    local.get $8
    local.get $0
    i32.const 1
    i32.sub
    local.get $1
    i32.const 1
    i32.add
    local.get $2
    local.get $7
    call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
   else
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/index/flags
    local.tee $8
    i32.store
    local.get $8
    local.get $0
    local.get $1
    local.get $2
    local.get $9
    call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/index/flags
    local.tee $8
    i32.store
    local.get $8
    local.get $0
    i32.const 1
    i32.sub
    local.get $1
    i32.const 1
    i32.add
    local.get $2
    local.get $7
    call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
   end
  end
  local.get $5
  if
   local.get $0
   local.get $1
   local.get $2
   local.get $3
   local.get $4
   i32.const 0
   local.get $6
   call $assembly/index/changeWallCorner
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  local.get $4
  if
   local.get $0
   local.get $1
   local.get $2
   local.get $3
   i32.const 0
   i32.const 0
   local.get $6
   call $assembly/index/changeWallCorner
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/index/changeWallL (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  i32.const 536870912
  i32.const 65536
  i32.const 128
  local.get $4
  select
  local.get $5
  select
  local.set $7
  i32.const 33554432
  i32.const 4096
  i32.const 8
  local.get $4
  select
  local.get $5
  select
  local.set $8
  i32.const 8388608
  i32.const 1024
  i32.const 2
  local.get $4
  select
  local.get $5
  select
  local.set $9
  i32.const 134217728
  i32.const 16384
  i32.const 32
  local.get $4
  select
  local.get $5
  select
  local.set $10
  local.get $3
  if
   local.get $3
   i32.const 1
   i32.eq
   if
    local.get $6
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/index/flags
     local.tee $11
     i32.store
     local.get $11
     local.get $0
     local.get $1
     local.get $2
     local.get $8
     local.get $9
     i32.or
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/index/flags
     local.tee $8
     i32.store
     local.get $8
     local.get $0
     local.get $1
     i32.const 1
     i32.add
     local.get $2
     local.get $10
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/index/flags
     local.tee $8
     i32.store
     local.get $8
     local.get $0
     i32.const 1
     i32.add
     local.get $1
     local.get $2
     local.get $7
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
    else
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/index/flags
     local.tee $11
     i32.store
     local.get $11
     local.get $0
     local.get $1
     local.get $2
     local.get $8
     local.get $9
     i32.or
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/index/flags
     local.tee $8
     i32.store
     local.get $8
     local.get $0
     local.get $1
     i32.const 1
     i32.add
     local.get $2
     local.get $10
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/index/flags
     local.tee $8
     i32.store
     local.get $8
     local.get $0
     i32.const 1
     i32.add
     local.get $1
     local.get $2
     local.get $7
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
    end
   else
    local.get $3
    i32.const 2
    i32.eq
    if
     local.get $6
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/index/flags
      local.tee $11
      i32.store
      local.get $11
      local.get $0
      local.get $1
      local.get $2
      local.get $8
      local.get $10
      i32.or
      call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/index/flags
      local.tee $8
      i32.store
      local.get $8
      local.get $0
      i32.const 1
      i32.add
      local.get $1
      local.get $2
      local.get $7
      call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/index/flags
      local.tee $7
      i32.store
      local.get $7
      local.get $0
      local.get $1
      i32.const 1
      i32.sub
      local.get $2
      local.get $9
      call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
     else
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/index/flags
      local.tee $11
      i32.store
      local.get $11
      local.get $0
      local.get $1
      local.get $2
      local.get $8
      local.get $10
      i32.or
      call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/index/flags
      local.tee $8
      i32.store
      local.get $8
      local.get $0
      i32.const 1
      i32.add
      local.get $1
      local.get $2
      local.get $7
      call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/index/flags
      local.tee $7
      i32.store
      local.get $7
      local.get $0
      local.get $1
      i32.const 1
      i32.sub
      local.get $2
      local.get $9
      call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
     end
    else
     local.get $3
     i32.const 3
     i32.eq
     if
      local.get $6
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/index/flags
       local.tee $11
       i32.store
       local.get $11
       local.get $0
       local.get $1
       local.get $2
       local.get $7
       local.get $10
       i32.or
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/index/flags
       local.tee $7
       i32.store
       local.get $7
       local.get $0
       local.get $1
       i32.const 1
       i32.sub
       local.get $2
       local.get $9
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/index/flags
       local.tee $7
       i32.store
       local.get $7
       local.get $0
       i32.const 1
       i32.sub
       local.get $1
       local.get $2
       local.get $8
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
      else
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/index/flags
       local.tee $11
       i32.store
       local.get $11
       local.get $0
       local.get $1
       local.get $2
       local.get $7
       local.get $10
       i32.or
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/index/flags
       local.tee $7
       i32.store
       local.get $7
       local.get $0
       local.get $1
       i32.const 1
       i32.sub
       local.get $2
       local.get $9
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/index/flags
       local.tee $7
       i32.store
       local.get $7
       local.get $0
       i32.const 1
       i32.sub
       local.get $1
       local.get $2
       local.get $8
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
      end
     end
    end
   end
  else
   local.get $6
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/index/flags
    local.tee $11
    i32.store
    local.get $11
    local.get $0
    local.get $1
    local.get $2
    local.get $7
    local.get $9
    i32.or
    call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/index/flags
    local.tee $7
    i32.store
    local.get $7
    local.get $0
    i32.const 1
    i32.sub
    local.get $1
    local.get $2
    local.get $8
    call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/index/flags
    local.tee $7
    i32.store
    local.get $7
    local.get $0
    local.get $1
    i32.const 1
    i32.add
    local.get $2
    local.get $10
    call $assembly/collision/CollisionFlagMap/CollisionFlagMap#add
   else
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/index/flags
    local.tee $11
    i32.store
    local.get $11
    local.get $0
    local.get $1
    local.get $2
    local.get $7
    local.get $9
    i32.or
    call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/index/flags
    local.tee $7
    i32.store
    local.get $7
    local.get $0
    i32.const 1
    i32.sub
    local.get $1
    local.get $2
    local.get $8
    call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/index/flags
    local.tee $7
    i32.store
    local.get $7
    local.get $0
    local.get $1
    i32.const 1
    i32.add
    local.get $2
    local.get $10
    call $assembly/collision/CollisionFlagMap/CollisionFlagMap#remove
   end
  end
  local.get $5
  if
   local.get $0
   local.get $1
   local.get $2
   local.get $3
   local.get $4
   i32.const 0
   local.get $6
   call $assembly/index/changeWallL
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  local.get $4
  if
   local.get $0
   local.get $1
   local.get $2
   local.get $3
   i32.const 0
   i32.const 0
   local.get $6
   call $assembly/index/changeWallL
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/index/allocateIfAbsent (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/index/flags
  local.tee $3
  i32.store
  local.get $3
  local.get $0
  local.get $1
  local.get $2
  call $assembly/collision/CollisionFlagMap/CollisionFlagMap#allocateIfAbsent
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/collision/CollisionFlagMap/CollisionFlagMap#isFlagged (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $1
  local.get $2
  local.get $3
  call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
  local.get $4
  i32.and
  i32.const 0
  i32.ne
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/index/isFlagged (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 5156
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   local.get $3
   call $~lib/number/I32#toString
   local.set $4
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5156
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store
   local.get $4
   call $~lib/bindings/dom/console.log
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/index/flags
   local.tee $4
   i32.store
   local.get $4
   local.get $0
   local.get $1
   local.get $2
   local.get $3
   call $assembly/collision/CollisionFlagMap/CollisionFlagMap#isFlagged
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 37952
  i32.const 38000
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $assembly/StepValidator/StepValidator#isBlockedSouth (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (result i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  block $folding-inner1
   block $folding-inner0
    block $case2|0
     block $case1|0
      local.get $4
      i32.const 1
      i32.ne
      if
       local.get $4
       i32.const 2
       i32.eq
       br_if $case1|0
       br $case2|0
      end
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $0
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$69 (result i32)
       local.get $0
       local.get $2
       local.get $3
       i32.const 1
       i32.sub
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $0
       local.get $5
       i32.const 2359554
       i32.or
       local.set $1
       block $default
        block $case4
         block $case3
          block $case2
           block $case1
            block $case0
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case0 $case1 $case2 $case3 $case4 $default
            end
            local.get $0
            local.get $1
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$69
           end
           local.get $1
           i32.const -2097153
           i32.and
           local.get $0
           i32.and
           i32.eqz
           local.get $0
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$69
          end
          local.get $0
          local.get $1
          i32.and
          i32.eqz
          local.get $0
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$69
         end
         local.get $0
         local.get $1
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$69
        end
        local.get $1
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $1
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $0
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$69
       end
       unreachable
      end
      i32.eqz
      local.set $0
      br $folding-inner0
     end
     global.get $~lib/memory/__stack_pointer
     local.get $6
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load
     local.tee $4
     i32.store offset=4
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$70 (result i32)
      local.get $4
      local.get $2
      local.get $3
      i32.const 1
      i32.sub
      local.tee $3
      local.get $1
      call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
      local.set $4
      local.get $5
      i32.const 2359566
      i32.or
      local.set $7
      block $default0
       block $case41
        block $case32
         block $case23
          block $case14
           block $case05
            local.get $6
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case05 $case14 $case23 $case32 $case41 $default0
           end
           local.get $4
           local.get $7
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$70
          end
          local.get $7
          i32.const -2097153
          i32.and
          local.get $4
          i32.and
          i32.eqz
          local.get $4
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$70
         end
         local.get $4
         local.get $7
         i32.and
         i32.eqz
         local.get $4
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$70
        end
        local.get $4
        local.get $7
        i32.const -2147483648
        i32.or
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$70
       end
       local.get $7
       i32.const 511
       i32.and
       i32.const 9
       i32.shl
       local.get $7
       i32.const 2143289344
       i32.and
       i32.const 13
       i32.shr_u
       i32.or
       local.get $4
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$70
      end
      unreachable
     end
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $0
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$71 (result i32)
       local.get $0
       local.get $2
       i32.const 1
       i32.add
       local.get $3
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $0
       local.get $5
       i32.const 2359683
       i32.or
       local.set $1
       block $default1
        block $case42
         block $case33
          block $case24
           block $case15
            block $case06
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case06 $case15 $case24 $case33 $case42 $default1
            end
            local.get $0
            local.get $1
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$71
           end
           local.get $1
           i32.const -2097153
           i32.and
           local.get $0
           i32.and
           i32.eqz
           local.get $0
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$71
          end
          local.get $0
          local.get $1
          i32.and
          i32.eqz
          local.get $0
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$71
         end
         local.get $0
         local.get $1
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$71
        end
        local.get $1
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $1
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $0
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$71
       end
       unreachable
      end
     else
      i32.const 0
     end
     i32.eqz
     local.set $0
     br $folding-inner0
    end
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $7
    i32.store offset=4
    block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$72 (result i32)
     local.get $7
     local.get $2
     local.get $3
     i32.const 1
     i32.sub
     local.tee $7
     local.get $1
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
     local.set $8
     local.get $5
     i32.const 2359566
     i32.or
     local.set $9
     block $default2
      block $case43
       block $case34
        block $case25
         block $case16
          block $case07
           local.get $6
           i32.const 8
           i32.sub
           i32.load
           i32.const 5
           i32.sub
           br_table $case07 $case16 $case25 $case34 $case43 $default2
          end
          local.get $8
          local.get $9
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$72
         end
         local.get $9
         i32.const -2097153
         i32.and
         local.get $8
         i32.and
         i32.eqz
         local.get $8
         i32.const 2097152
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$72
        end
        local.get $8
        local.get $9
        i32.and
        i32.eqz
        local.get $8
        i32.const -2147483648
        i32.and
        i32.const 0
        i32.ne
        i32.and
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$72
       end
       local.get $8
       local.get $9
       i32.const -2147483648
       i32.or
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$72
      end
      local.get $9
      i32.const 511
      i32.and
      i32.const 9
      i32.shl
      local.get $9
      i32.const 2143289344
      i32.and
      i32.const 13
      i32.shr_u
      i32.or
      local.get $8
      i32.and
      i32.eqz
      br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$72
     end
     unreachable
    end
    i32.eqz
    br_if $folding-inner1
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $8
    i32.store offset=4
    block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$73 (result i32)
     local.get $8
     local.get $2
     local.get $4
     i32.add
     i32.const 1
     i32.sub
     local.get $7
     local.get $1
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
     local.set $7
     local.get $5
     i32.const 2359683
     i32.or
     local.set $8
     block $default3
      block $case44
       block $case35
        block $case26
         block $case17
          block $case08
           local.get $6
           i32.const 8
           i32.sub
           i32.load
           i32.const 5
           i32.sub
           br_table $case08 $case17 $case26 $case35 $case44 $default3
          end
          local.get $7
          local.get $8
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$73
         end
         local.get $8
         i32.const -2097153
         i32.and
         local.get $7
         i32.and
         i32.eqz
         local.get $7
         i32.const 2097152
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$73
        end
        local.get $7
        local.get $8
        i32.and
        i32.eqz
        local.get $7
        i32.const -2147483648
        i32.and
        i32.const 0
        i32.ne
        i32.and
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$73
       end
       local.get $7
       local.get $8
       i32.const -2147483648
       i32.or
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$73
      end
      local.get $8
      i32.const 511
      i32.and
      i32.const 9
      i32.shl
      local.get $8
      i32.const 2143289344
      i32.and
      i32.const 13
      i32.shr_u
      i32.or
      local.get $7
      i32.and
      i32.eqz
      br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$73
     end
     unreachable
    end
    i32.eqz
    br_if $folding-inner1
    local.get $2
    i32.const 1
    i32.add
    local.set $7
    loop $for-loop|1
     local.get $7
     local.get $2
     local.get $4
     i32.add
     i32.const 1
     i32.sub
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $8
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$74 (result i32)
       local.get $8
       local.get $7
       local.get $3
       i32.const 1
       i32.sub
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $8
       local.get $5
       i32.const 2359695
       i32.or
       local.set $9
       block $default4
        block $case45
         block $case36
          block $case27
           block $case18
            block $case09
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case09 $case18 $case27 $case36 $case45 $default4
            end
            local.get $8
            local.get $9
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$74
           end
           local.get $9
           i32.const -2097153
           i32.and
           local.get $8
           i32.and
           i32.eqz
           local.get $8
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$74
          end
          local.get $8
          local.get $9
          i32.and
          i32.eqz
          local.get $8
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$74
         end
         local.get $8
         local.get $9
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$74
        end
        local.get $9
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $9
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $8
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$74
       end
       unreachable
      end
      i32.eqz
      br_if $folding-inner1
      local.get $7
      i32.const 1
      i32.add
      local.set $7
      br $for-loop|1
     end
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 12
    i32.add
    global.set $~lib/memory/__stack_pointer
    i32.const 0
    return
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 1
 )
 (func $assembly/StepValidator/StepValidator#isBlockedNorth (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (result i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  block $folding-inner1
   block $folding-inner0
    block $case2|0
     block $case1|0
      local.get $4
      i32.const 1
      i32.ne
      if
       local.get $4
       i32.const 2
       i32.eq
       br_if $case1|0
       br $case2|0
      end
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $0
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$75 (result i32)
       local.get $0
       local.get $2
       local.get $3
       i32.const 1
       i32.add
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $0
       local.get $5
       i32.const 2359584
       i32.or
       local.set $1
       block $default
        block $case4
         block $case3
          block $case2
           block $case1
            block $case0
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case0 $case1 $case2 $case3 $case4 $default
            end
            local.get $0
            local.get $1
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$75
           end
           local.get $1
           i32.const -2097153
           i32.and
           local.get $0
           i32.and
           i32.eqz
           local.get $0
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$75
          end
          local.get $0
          local.get $1
          i32.and
          i32.eqz
          local.get $0
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$75
         end
         local.get $0
         local.get $1
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$75
        end
        local.get $1
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $1
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $0
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$75
       end
       unreachable
      end
      i32.eqz
      local.set $0
      br $folding-inner0
     end
     global.get $~lib/memory/__stack_pointer
     local.get $6
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load
     local.tee $4
     i32.store offset=4
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$76 (result i32)
      local.get $4
      local.get $2
      local.get $3
      i32.const 2
      i32.add
      local.tee $3
      local.get $1
      call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
      local.set $4
      local.get $5
      i32.const 2359608
      i32.or
      local.set $7
      block $default0
       block $case41
        block $case32
         block $case23
          block $case14
           block $case05
            local.get $6
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case05 $case14 $case23 $case32 $case41 $default0
           end
           local.get $4
           local.get $7
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$76
          end
          local.get $7
          i32.const -2097153
          i32.and
          local.get $4
          i32.and
          i32.eqz
          local.get $4
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$76
         end
         local.get $4
         local.get $7
         i32.and
         i32.eqz
         local.get $4
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$76
        end
        local.get $4
        local.get $7
        i32.const -2147483648
        i32.or
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$76
       end
       local.get $7
       i32.const 511
       i32.and
       i32.const 9
       i32.shl
       local.get $7
       i32.const 2143289344
       i32.and
       i32.const 13
       i32.shr_u
       i32.or
       local.get $4
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$76
      end
      unreachable
     end
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $0
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$77 (result i32)
       local.get $0
       local.get $2
       i32.const 1
       i32.add
       local.get $3
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $0
       local.get $5
       i32.const 2359776
       i32.or
       local.set $1
       block $default1
        block $case42
         block $case33
          block $case24
           block $case15
            block $case06
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case06 $case15 $case24 $case33 $case42 $default1
            end
            local.get $0
            local.get $1
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$77
           end
           local.get $1
           i32.const -2097153
           i32.and
           local.get $0
           i32.and
           i32.eqz
           local.get $0
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$77
          end
          local.get $0
          local.get $1
          i32.and
          i32.eqz
          local.get $0
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$77
         end
         local.get $0
         local.get $1
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$77
        end
        local.get $1
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $1
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $0
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$77
       end
       unreachable
      end
     else
      i32.const 0
     end
     i32.eqz
     local.set $0
     br $folding-inner0
    end
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $7
    i32.store offset=4
    block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$78 (result i32)
     local.get $7
     local.get $2
     local.get $3
     local.get $4
     i32.add
     local.tee $7
     local.get $1
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
     local.set $8
     local.get $5
     i32.const 2359608
     i32.or
     local.set $9
     block $default2
      block $case43
       block $case34
        block $case25
         block $case16
          block $case07
           local.get $6
           i32.const 8
           i32.sub
           i32.load
           i32.const 5
           i32.sub
           br_table $case07 $case16 $case25 $case34 $case43 $default2
          end
          local.get $8
          local.get $9
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$78
         end
         local.get $9
         i32.const -2097153
         i32.and
         local.get $8
         i32.and
         i32.eqz
         local.get $8
         i32.const 2097152
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$78
        end
        local.get $8
        local.get $9
        i32.and
        i32.eqz
        local.get $8
        i32.const -2147483648
        i32.and
        i32.const 0
        i32.ne
        i32.and
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$78
       end
       local.get $8
       local.get $9
       i32.const -2147483648
       i32.or
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$78
      end
      local.get $9
      i32.const 511
      i32.and
      i32.const 9
      i32.shl
      local.get $9
      i32.const 2143289344
      i32.and
      i32.const 13
      i32.shr_u
      i32.or
      local.get $8
      i32.and
      i32.eqz
      br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$78
     end
     unreachable
    end
    i32.eqz
    br_if $folding-inner1
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $8
    i32.store offset=4
    block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$79 (result i32)
     local.get $8
     local.get $2
     local.get $4
     i32.add
     i32.const 1
     i32.sub
     local.get $7
     local.get $1
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
     local.set $7
     local.get $5
     i32.const 2359776
     i32.or
     local.set $8
     block $default3
      block $case44
       block $case35
        block $case26
         block $case17
          block $case08
           local.get $6
           i32.const 8
           i32.sub
           i32.load
           i32.const 5
           i32.sub
           br_table $case08 $case17 $case26 $case35 $case44 $default3
          end
          local.get $7
          local.get $8
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$79
         end
         local.get $8
         i32.const -2097153
         i32.and
         local.get $7
         i32.and
         i32.eqz
         local.get $7
         i32.const 2097152
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$79
        end
        local.get $7
        local.get $8
        i32.and
        i32.eqz
        local.get $7
        i32.const -2147483648
        i32.and
        i32.const 0
        i32.ne
        i32.and
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$79
       end
       local.get $7
       local.get $8
       i32.const -2147483648
       i32.or
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$79
      end
      local.get $8
      i32.const 511
      i32.and
      i32.const 9
      i32.shl
      local.get $8
      i32.const 2143289344
      i32.and
      i32.const 13
      i32.shr_u
      i32.or
      local.get $7
      i32.and
      i32.eqz
      br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$79
     end
     unreachable
    end
    i32.eqz
    br_if $folding-inner1
    local.get $2
    i32.const 1
    i32.add
    local.set $7
    loop $for-loop|1
     local.get $7
     local.get $2
     local.get $4
     i32.add
     i32.const 1
     i32.sub
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $8
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$80 (result i32)
       local.get $8
       local.get $7
       local.get $3
       local.get $4
       i32.add
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $8
       local.get $5
       i32.const 2359800
       i32.or
       local.set $9
       block $default4
        block $case45
         block $case36
          block $case27
           block $case18
            block $case09
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case09 $case18 $case27 $case36 $case45 $default4
            end
            local.get $8
            local.get $9
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$80
           end
           local.get $9
           i32.const -2097153
           i32.and
           local.get $8
           i32.and
           i32.eqz
           local.get $8
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$80
          end
          local.get $8
          local.get $9
          i32.and
          i32.eqz
          local.get $8
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$80
         end
         local.get $8
         local.get $9
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$80
        end
        local.get $9
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $9
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $8
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$80
       end
       unreachable
      end
      i32.eqz
      br_if $folding-inner1
      local.get $7
      i32.const 1
      i32.add
      local.set $7
      br $for-loop|1
     end
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 12
    i32.add
    global.set $~lib/memory/__stack_pointer
    i32.const 0
    return
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 1
 )
 (func $assembly/StepValidator/StepValidator#isBlockedWest (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (result i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  block $folding-inner1
   block $folding-inner0
    block $case2|0
     block $case1|0
      local.get $4
      i32.const 1
      i32.ne
      if
       local.get $4
       i32.const 2
       i32.eq
       br_if $case1|0
       br $case2|0
      end
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $0
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$81 (result i32)
       local.get $0
       local.get $2
       i32.const 1
       i32.sub
       local.get $3
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $0
       local.get $5
       i32.const 2359560
       i32.or
       local.set $1
       block $default
        block $case4
         block $case3
          block $case2
           block $case1
            block $case0
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case0 $case1 $case2 $case3 $case4 $default
            end
            local.get $0
            local.get $1
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$81
           end
           local.get $1
           i32.const -2097153
           i32.and
           local.get $0
           i32.and
           i32.eqz
           local.get $0
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$81
          end
          local.get $0
          local.get $1
          i32.and
          i32.eqz
          local.get $0
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$81
         end
         local.get $0
         local.get $1
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$81
        end
        local.get $1
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $1
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $0
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$81
       end
       unreachable
      end
      i32.eqz
      local.set $0
      br $folding-inner0
     end
     global.get $~lib/memory/__stack_pointer
     local.get $6
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load
     local.tee $4
     i32.store offset=4
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$82 (result i32)
      local.get $4
      local.get $2
      i32.const 1
      i32.sub
      local.tee $2
      local.get $3
      local.get $1
      call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
      local.set $4
      local.get $5
      i32.const 2359566
      i32.or
      local.set $7
      block $default0
       block $case41
        block $case32
         block $case23
          block $case14
           block $case05
            local.get $6
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case05 $case14 $case23 $case32 $case41 $default0
           end
           local.get $4
           local.get $7
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$82
          end
          local.get $7
          i32.const -2097153
          i32.and
          local.get $4
          i32.and
          i32.eqz
          local.get $4
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$82
         end
         local.get $4
         local.get $7
         i32.and
         i32.eqz
         local.get $4
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$82
        end
        local.get $4
        local.get $7
        i32.const -2147483648
        i32.or
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$82
       end
       local.get $7
       i32.const 511
       i32.and
       i32.const 9
       i32.shl
       local.get $7
       i32.const 2143289344
       i32.and
       i32.const 13
       i32.shr_u
       i32.or
       local.get $4
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$82
      end
      unreachable
     end
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $0
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$83 (result i32)
       local.get $0
       local.get $2
       local.get $3
       i32.const 1
       i32.add
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $0
       local.get $5
       i32.const 2359608
       i32.or
       local.set $1
       block $default1
        block $case42
         block $case33
          block $case24
           block $case15
            block $case06
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case06 $case15 $case24 $case33 $case42 $default1
            end
            local.get $0
            local.get $1
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$83
           end
           local.get $1
           i32.const -2097153
           i32.and
           local.get $0
           i32.and
           i32.eqz
           local.get $0
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$83
          end
          local.get $0
          local.get $1
          i32.and
          i32.eqz
          local.get $0
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$83
         end
         local.get $0
         local.get $1
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$83
        end
        local.get $1
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $1
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $0
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$83
       end
       unreachable
      end
     else
      i32.const 0
     end
     i32.eqz
     local.set $0
     br $folding-inner0
    end
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $7
    i32.store offset=4
    block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$84 (result i32)
     local.get $7
     local.get $2
     i32.const 1
     i32.sub
     local.tee $7
     local.get $3
     local.get $1
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
     local.set $8
     local.get $5
     i32.const 2359566
     i32.or
     local.set $9
     block $default2
      block $case43
       block $case34
        block $case25
         block $case16
          block $case07
           local.get $6
           i32.const 8
           i32.sub
           i32.load
           i32.const 5
           i32.sub
           br_table $case07 $case16 $case25 $case34 $case43 $default2
          end
          local.get $8
          local.get $9
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$84
         end
         local.get $9
         i32.const -2097153
         i32.and
         local.get $8
         i32.and
         i32.eqz
         local.get $8
         i32.const 2097152
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$84
        end
        local.get $8
        local.get $9
        i32.and
        i32.eqz
        local.get $8
        i32.const -2147483648
        i32.and
        i32.const 0
        i32.ne
        i32.and
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$84
       end
       local.get $8
       local.get $9
       i32.const -2147483648
       i32.or
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$84
      end
      local.get $9
      i32.const 511
      i32.and
      i32.const 9
      i32.shl
      local.get $9
      i32.const 2143289344
      i32.and
      i32.const 13
      i32.shr_u
      i32.or
      local.get $8
      i32.and
      i32.eqz
      br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$84
     end
     unreachable
    end
    i32.eqz
    br_if $folding-inner1
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $8
    i32.store offset=4
    block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$85 (result i32)
     local.get $8
     local.get $7
     local.get $3
     local.get $4
     i32.add
     i32.const 1
     i32.sub
     local.get $1
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
     local.set $7
     local.get $5
     i32.const 2359608
     i32.or
     local.set $8
     block $default3
      block $case44
       block $case35
        block $case26
         block $case17
          block $case08
           local.get $6
           i32.const 8
           i32.sub
           i32.load
           i32.const 5
           i32.sub
           br_table $case08 $case17 $case26 $case35 $case44 $default3
          end
          local.get $7
          local.get $8
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$85
         end
         local.get $8
         i32.const -2097153
         i32.and
         local.get $7
         i32.and
         i32.eqz
         local.get $7
         i32.const 2097152
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$85
        end
        local.get $7
        local.get $8
        i32.and
        i32.eqz
        local.get $7
        i32.const -2147483648
        i32.and
        i32.const 0
        i32.ne
        i32.and
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$85
       end
       local.get $7
       local.get $8
       i32.const -2147483648
       i32.or
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$85
      end
      local.get $8
      i32.const 511
      i32.and
      i32.const 9
      i32.shl
      local.get $8
      i32.const 2143289344
      i32.and
      i32.const 13
      i32.shr_u
      i32.or
      local.get $7
      i32.and
      i32.eqz
      br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$85
     end
     unreachable
    end
    i32.eqz
    br_if $folding-inner1
    local.get $3
    i32.const 1
    i32.add
    local.set $7
    loop $for-loop|1
     local.get $7
     local.get $3
     local.get $4
     i32.add
     i32.const 1
     i32.sub
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $8
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$86 (result i32)
       local.get $8
       local.get $2
       i32.const 1
       i32.sub
       local.get $7
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $8
       local.get $5
       i32.const 2359614
       i32.or
       local.set $9
       block $default4
        block $case45
         block $case36
          block $case27
           block $case18
            block $case09
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case09 $case18 $case27 $case36 $case45 $default4
            end
            local.get $8
            local.get $9
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$86
           end
           local.get $9
           i32.const -2097153
           i32.and
           local.get $8
           i32.and
           i32.eqz
           local.get $8
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$86
          end
          local.get $8
          local.get $9
          i32.and
          i32.eqz
          local.get $8
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$86
         end
         local.get $8
         local.get $9
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$86
        end
        local.get $9
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $9
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $8
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$86
       end
       unreachable
      end
      i32.eqz
      br_if $folding-inner1
      local.get $7
      i32.const 1
      i32.add
      local.set $7
      br $for-loop|1
     end
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 12
    i32.add
    global.set $~lib/memory/__stack_pointer
    i32.const 0
    return
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 1
 )
 (func $assembly/StepValidator/StepValidator#isBlockedEast (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (result i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  block $folding-inner1
   block $folding-inner0
    block $case2|0
     block $case1|0
      local.get $4
      i32.const 1
      i32.ne
      if
       local.get $4
       i32.const 2
       i32.eq
       br_if $case1|0
       br $case2|0
      end
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $0
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$87 (result i32)
       local.get $0
       local.get $2
       i32.const 1
       i32.add
       local.get $3
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $0
       local.get $5
       i32.const 2359680
       i32.or
       local.set $1
       block $default
        block $case4
         block $case3
          block $case2
           block $case1
            block $case0
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case0 $case1 $case2 $case3 $case4 $default
            end
            local.get $0
            local.get $1
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$87
           end
           local.get $1
           i32.const -2097153
           i32.and
           local.get $0
           i32.and
           i32.eqz
           local.get $0
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$87
          end
          local.get $0
          local.get $1
          i32.and
          i32.eqz
          local.get $0
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$87
         end
         local.get $0
         local.get $1
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$87
        end
        local.get $1
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $1
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $0
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$87
       end
       unreachable
      end
      i32.eqz
      local.set $0
      br $folding-inner0
     end
     global.get $~lib/memory/__stack_pointer
     local.get $6
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load
     local.tee $4
     i32.store offset=4
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$88 (result i32)
      local.get $4
      local.get $2
      i32.const 2
      i32.add
      local.tee $2
      local.get $3
      local.get $1
      call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
      local.set $4
      local.get $5
      i32.const 2359683
      i32.or
      local.set $7
      block $default0
       block $case41
        block $case32
         block $case23
          block $case14
           block $case05
            local.get $6
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case05 $case14 $case23 $case32 $case41 $default0
           end
           local.get $4
           local.get $7
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$88
          end
          local.get $7
          i32.const -2097153
          i32.and
          local.get $4
          i32.and
          i32.eqz
          local.get $4
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$88
         end
         local.get $4
         local.get $7
         i32.and
         i32.eqz
         local.get $4
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$88
        end
        local.get $4
        local.get $7
        i32.const -2147483648
        i32.or
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$88
       end
       local.get $7
       i32.const 511
       i32.and
       i32.const 9
       i32.shl
       local.get $7
       i32.const 2143289344
       i32.and
       i32.const 13
       i32.shr_u
       i32.or
       local.get $4
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$88
      end
      unreachable
     end
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $0
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$89 (result i32)
       local.get $0
       local.get $2
       local.get $3
       i32.const 1
       i32.add
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $0
       local.get $5
       i32.const 2359776
       i32.or
       local.set $1
       block $default1
        block $case42
         block $case33
          block $case24
           block $case15
            block $case06
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case06 $case15 $case24 $case33 $case42 $default1
            end
            local.get $0
            local.get $1
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$89
           end
           local.get $1
           i32.const -2097153
           i32.and
           local.get $0
           i32.and
           i32.eqz
           local.get $0
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$89
          end
          local.get $0
          local.get $1
          i32.and
          i32.eqz
          local.get $0
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$89
         end
         local.get $0
         local.get $1
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$89
        end
        local.get $1
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $1
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $0
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$89
       end
       unreachable
      end
     else
      i32.const 0
     end
     i32.eqz
     local.set $0
     br $folding-inner0
    end
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $7
    i32.store offset=4
    block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$90 (result i32)
     local.get $7
     local.get $2
     local.get $4
     i32.add
     local.tee $7
     local.get $3
     local.get $1
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
     local.set $8
     local.get $5
     i32.const 2359683
     i32.or
     local.set $9
     block $default2
      block $case43
       block $case34
        block $case25
         block $case16
          block $case07
           local.get $6
           i32.const 8
           i32.sub
           i32.load
           i32.const 5
           i32.sub
           br_table $case07 $case16 $case25 $case34 $case43 $default2
          end
          local.get $8
          local.get $9
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$90
         end
         local.get $9
         i32.const -2097153
         i32.and
         local.get $8
         i32.and
         i32.eqz
         local.get $8
         i32.const 2097152
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$90
        end
        local.get $8
        local.get $9
        i32.and
        i32.eqz
        local.get $8
        i32.const -2147483648
        i32.and
        i32.const 0
        i32.ne
        i32.and
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$90
       end
       local.get $8
       local.get $9
       i32.const -2147483648
       i32.or
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$90
      end
      local.get $9
      i32.const 511
      i32.and
      i32.const 9
      i32.shl
      local.get $9
      i32.const 2143289344
      i32.and
      i32.const 13
      i32.shr_u
      i32.or
      local.get $8
      i32.and
      i32.eqz
      br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$90
     end
     unreachable
    end
    i32.eqz
    br_if $folding-inner1
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $8
    i32.store offset=4
    block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$91 (result i32)
     local.get $8
     local.get $7
     local.get $3
     local.get $4
     i32.add
     i32.const 1
     i32.sub
     local.get $1
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
     local.set $7
     local.get $5
     i32.const 2359776
     i32.or
     local.set $8
     block $default3
      block $case44
       block $case35
        block $case26
         block $case17
          block $case08
           local.get $6
           i32.const 8
           i32.sub
           i32.load
           i32.const 5
           i32.sub
           br_table $case08 $case17 $case26 $case35 $case44 $default3
          end
          local.get $7
          local.get $8
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$91
         end
         local.get $8
         i32.const -2097153
         i32.and
         local.get $7
         i32.and
         i32.eqz
         local.get $7
         i32.const 2097152
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$91
        end
        local.get $7
        local.get $8
        i32.and
        i32.eqz
        local.get $7
        i32.const -2147483648
        i32.and
        i32.const 0
        i32.ne
        i32.and
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$91
       end
       local.get $7
       local.get $8
       i32.const -2147483648
       i32.or
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$91
      end
      local.get $8
      i32.const 511
      i32.and
      i32.const 9
      i32.shl
      local.get $8
      i32.const 2143289344
      i32.and
      i32.const 13
      i32.shr_u
      i32.or
      local.get $7
      i32.and
      i32.eqz
      br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$91
     end
     unreachable
    end
    i32.eqz
    br_if $folding-inner1
    local.get $3
    i32.const 1
    i32.add
    local.set $7
    loop $for-loop|1
     local.get $7
     local.get $3
     local.get $4
     i32.add
     i32.const 1
     i32.sub
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $8
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$92 (result i32)
       local.get $8
       local.get $2
       local.get $4
       i32.add
       local.get $7
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $8
       local.get $5
       i32.const 2359779
       i32.or
       local.set $9
       block $default4
        block $case45
         block $case36
          block $case27
           block $case18
            block $case09
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case09 $case18 $case27 $case36 $case45 $default4
            end
            local.get $8
            local.get $9
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$92
           end
           local.get $9
           i32.const -2097153
           i32.and
           local.get $8
           i32.and
           i32.eqz
           local.get $8
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$92
          end
          local.get $8
          local.get $9
          i32.and
          i32.eqz
          local.get $8
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$92
         end
         local.get $8
         local.get $9
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$92
        end
        local.get $9
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $9
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $8
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$92
       end
       unreachable
      end
      i32.eqz
      br_if $folding-inner1
      local.get $7
      i32.const 1
      i32.add
      local.set $7
      br $for-loop|1
     end
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 12
    i32.add
    global.set $~lib/memory/__stack_pointer
    i32.const 0
    return
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 1
 )
 (func $assembly/StepValidator/StepValidator#isBlockedSouthWest (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (result i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  block $folding-inner1
   block $folding-inner0
    block $case2|0
     block $case1|0
      local.get $4
      i32.const 1
      i32.ne
      if
       local.get $4
       i32.const 2
       i32.eq
       br_if $case1|0
       br $case2|0
      end
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $4
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$93 (result i32)
       local.get $4
       local.get $2
       i32.const 1
       i32.sub
       local.tee $4
       local.get $3
       i32.const 1
       i32.sub
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $7
       local.get $5
       i32.const 2359566
       i32.or
       local.set $8
       block $default
        block $case4
         block $case3
          block $case2
           block $case1
            block $case0
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case0 $case1 $case2 $case3 $case4 $default
            end
            local.get $7
            local.get $8
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$93
           end
           local.get $8
           i32.const -2097153
           i32.and
           local.get $7
           i32.and
           i32.eqz
           local.get $7
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$93
          end
          local.get $7
          local.get $8
          i32.and
          i32.eqz
          local.get $7
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$93
         end
         local.get $7
         local.get $8
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$93
        end
        local.get $8
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $8
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $7
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$93
       end
       unreachable
      end
      if (result i32)
       global.get $~lib/memory/__stack_pointer
       local.get $6
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=8
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.load
       local.tee $7
       i32.store offset=4
       block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$94 (result i32)
        local.get $7
        local.get $4
        local.get $3
        local.get $1
        call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
        local.set $4
        local.get $5
        i32.const 2359560
        i32.or
        local.set $7
        block $default0
         block $case41
          block $case32
           block $case23
            block $case14
             block $case05
              local.get $6
              i32.const 8
              i32.sub
              i32.load
              i32.const 5
              i32.sub
              br_table $case05 $case14 $case23 $case32 $case41 $default0
             end
             local.get $4
             local.get $7
             i32.and
             i32.eqz
             br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$94
            end
            local.get $7
            i32.const -2097153
            i32.and
            local.get $4
            i32.and
            i32.eqz
            local.get $4
            i32.const 2097152
            i32.and
            i32.const 0
            i32.ne
            i32.and
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$94
           end
           local.get $4
           local.get $7
           i32.and
           i32.eqz
           local.get $4
           i32.const -2147483648
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$94
          end
          local.get $4
          local.get $7
          i32.const -2147483648
          i32.or
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$94
         end
         local.get $7
         i32.const 511
         i32.and
         i32.const 9
         i32.shl
         local.get $7
         i32.const 2143289344
         i32.and
         i32.const 13
         i32.shr_u
         i32.or
         local.get $4
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$94
        end
        unreachable
       end
      else
       i32.const 0
      end
      if (result i32)
       global.get $~lib/memory/__stack_pointer
       local.get $6
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=8
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.load
       local.tee $0
       i32.store offset=4
       block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$95 (result i32)
        local.get $0
        local.get $2
        local.get $3
        i32.const 1
        i32.sub
        local.get $1
        call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
        local.set $0
        local.get $5
        i32.const 2359554
        i32.or
        local.set $1
        block $default1
         block $case42
          block $case33
           block $case24
            block $case15
             block $case06
              local.get $6
              i32.const 8
              i32.sub
              i32.load
              i32.const 5
              i32.sub
              br_table $case06 $case15 $case24 $case33 $case42 $default1
             end
             local.get $0
             local.get $1
             i32.and
             i32.eqz
             br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$95
            end
            local.get $1
            i32.const -2097153
            i32.and
            local.get $0
            i32.and
            i32.eqz
            local.get $0
            i32.const 2097152
            i32.and
            i32.const 0
            i32.ne
            i32.and
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$95
           end
           local.get $0
           local.get $1
           i32.and
           i32.eqz
           local.get $0
           i32.const -2147483648
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$95
          end
          local.get $0
          local.get $1
          i32.const -2147483648
          i32.or
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$95
         end
         local.get $1
         i32.const 511
         i32.and
         i32.const 9
         i32.shl
         local.get $1
         i32.const 2143289344
         i32.and
         i32.const 13
         i32.shr_u
         i32.or
         local.get $0
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$95
        end
        unreachable
       end
      else
       i32.const 0
      end
      i32.eqz
      local.set $0
      br $folding-inner0
     end
     global.get $~lib/memory/__stack_pointer
     local.get $6
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load
     local.tee $4
     i32.store offset=4
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$96 (result i32)
      local.get $4
      local.get $2
      i32.const 1
      i32.sub
      local.tee $4
      local.get $3
      local.get $1
      call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
      local.set $7
      local.get $5
      i32.const 2359614
      i32.or
      local.set $8
      block $default2
       block $case43
        block $case34
         block $case25
          block $case16
           block $case07
            local.get $6
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case07 $case16 $case25 $case34 $case43 $default2
           end
           local.get $7
           local.get $8
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$96
          end
          local.get $8
          i32.const -2097153
          i32.and
          local.get $7
          i32.and
          i32.eqz
          local.get $7
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$96
         end
         local.get $7
         local.get $8
         i32.and
         i32.eqz
         local.get $7
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$96
        end
        local.get $7
        local.get $8
        i32.const -2147483648
        i32.or
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$96
       end
       local.get $8
       i32.const 511
       i32.and
       i32.const 9
       i32.shl
       local.get $8
       i32.const 2143289344
       i32.and
       i32.const 13
       i32.shr_u
       i32.or
       local.get $7
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$96
      end
      unreachable
     end
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $7
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$97 (result i32)
       local.get $7
       local.get $4
       local.get $3
       i32.const 1
       i32.sub
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $4
       local.get $5
       i32.const 2359566
       i32.or
       local.set $7
       block $default3
        block $case44
         block $case35
          block $case26
           block $case17
            block $case08
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case08 $case17 $case26 $case35 $case44 $default3
            end
            local.get $4
            local.get $7
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$97
           end
           local.get $7
           i32.const -2097153
           i32.and
           local.get $4
           i32.and
           i32.eqz
           local.get $4
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$97
          end
          local.get $4
          local.get $7
          i32.and
          i32.eqz
          local.get $4
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$97
         end
         local.get $4
         local.get $7
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$97
        end
        local.get $7
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $7
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $4
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$97
       end
       unreachable
      end
     else
      i32.const 0
     end
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $0
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$98 (result i32)
       local.get $0
       local.get $2
       local.get $3
       i32.const 1
       i32.sub
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $0
       local.get $5
       i32.const 2359695
       i32.or
       local.set $1
       block $default4
        block $case45
         block $case36
          block $case27
           block $case18
            block $case09
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case09 $case18 $case27 $case36 $case45 $default4
            end
            local.get $0
            local.get $1
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$98
           end
           local.get $1
           i32.const -2097153
           i32.and
           local.get $0
           i32.and
           i32.eqz
           local.get $0
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$98
          end
          local.get $0
          local.get $1
          i32.and
          i32.eqz
          local.get $0
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$98
         end
         local.get $0
         local.get $1
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$98
        end
        local.get $1
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $1
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $0
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$98
       end
       unreachable
      end
     else
      i32.const 0
     end
     i32.eqz
     local.set $0
     br $folding-inner0
    end
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $7
    i32.store offset=4
    block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$99 (result i32)
     local.get $7
     local.get $2
     i32.const 1
     i32.sub
     local.get $3
     i32.const 1
     i32.sub
     local.get $1
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
     local.set $7
     local.get $5
     i32.const 2359566
     i32.or
     local.set $8
     block $default5
      block $case46
       block $case37
        block $case28
         block $case19
          block $case010
           local.get $6
           i32.const 8
           i32.sub
           i32.load
           i32.const 5
           i32.sub
           br_table $case010 $case19 $case28 $case37 $case46 $default5
          end
          local.get $7
          local.get $8
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$99
         end
         local.get $8
         i32.const -2097153
         i32.and
         local.get $7
         i32.and
         i32.eqz
         local.get $7
         i32.const 2097152
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$99
        end
        local.get $7
        local.get $8
        i32.and
        i32.eqz
        local.get $7
        i32.const -2147483648
        i32.and
        i32.const 0
        i32.ne
        i32.and
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$99
       end
       local.get $7
       local.get $8
       i32.const -2147483648
       i32.or
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$99
      end
      local.get $8
      i32.const 511
      i32.and
      i32.const 9
      i32.shl
      local.get $8
      i32.const 2143289344
      i32.and
      i32.const 13
      i32.shr_u
      i32.or
      local.get $7
      i32.and
      i32.eqz
      br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$99
     end
     unreachable
    end
    i32.eqz
    br_if $folding-inner1
    i32.const 1
    local.set $7
    loop $for-loop|1
     local.get $4
     local.get $7
     i32.gt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $8
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$100 (result i32)
       local.get $8
       local.get $2
       i32.const 1
       i32.sub
       local.get $3
       local.get $7
       i32.add
       i32.const 1
       i32.sub
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $8
       local.get $5
       i32.const 2359614
       i32.or
       local.set $9
       block $default6
        block $case47
         block $case38
          block $case29
           block $case110
            block $case011
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case011 $case110 $case29 $case38 $case47 $default6
            end
            local.get $8
            local.get $9
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$100
           end
           local.get $9
           i32.const -2097153
           i32.and
           local.get $8
           i32.and
           i32.eqz
           local.get $8
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$100
          end
          local.get $8
          local.get $9
          i32.and
          i32.eqz
          local.get $8
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$100
         end
         local.get $8
         local.get $9
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$100
        end
        local.get $9
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $9
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $8
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$100
       end
       unreachable
      end
      i32.eqz
      br_if $folding-inner1
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $8
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$101 (result i32)
       local.get $8
       local.get $2
       local.get $7
       i32.add
       i32.const 1
       i32.sub
       local.get $3
       i32.const 1
       i32.sub
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $8
       local.get $5
       i32.const 2359695
       i32.or
       local.set $9
       block $default7
        block $case48
         block $case39
          block $case210
           block $case111
            block $case012
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case012 $case111 $case210 $case39 $case48 $default7
            end
            local.get $8
            local.get $9
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$101
           end
           local.get $9
           i32.const -2097153
           i32.and
           local.get $8
           i32.and
           i32.eqz
           local.get $8
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$101
          end
          local.get $8
          local.get $9
          i32.and
          i32.eqz
          local.get $8
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$101
         end
         local.get $8
         local.get $9
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$101
        end
        local.get $9
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $9
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $8
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$101
       end
       unreachable
      end
      i32.eqz
      br_if $folding-inner1
      local.get $7
      i32.const 1
      i32.add
      local.set $7
      br $for-loop|1
     end
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 12
    i32.add
    global.set $~lib/memory/__stack_pointer
    i32.const 0
    return
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 1
 )
 (func $assembly/StepValidator/StepValidator#isBlockedNorthWest (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (result i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  block $folding-inner1
   block $folding-inner0
    block $case2|0
     block $case1|0
      local.get $4
      i32.const 1
      i32.ne
      if
       local.get $4
       i32.const 2
       i32.eq
       br_if $case1|0
       br $case2|0
      end
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $4
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$102 (result i32)
       local.get $4
       local.get $2
       i32.const 1
       i32.sub
       local.tee $4
       local.get $3
       i32.const 1
       i32.add
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $7
       local.get $5
       i32.const 2359608
       i32.or
       local.set $8
       block $default
        block $case4
         block $case3
          block $case2
           block $case1
            block $case0
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case0 $case1 $case2 $case3 $case4 $default
            end
            local.get $7
            local.get $8
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$102
           end
           local.get $8
           i32.const -2097153
           i32.and
           local.get $7
           i32.and
           i32.eqz
           local.get $7
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$102
          end
          local.get $7
          local.get $8
          i32.and
          i32.eqz
          local.get $7
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$102
         end
         local.get $7
         local.get $8
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$102
        end
        local.get $8
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $8
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $7
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$102
       end
       unreachable
      end
      if (result i32)
       global.get $~lib/memory/__stack_pointer
       local.get $6
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=8
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.load
       local.tee $7
       i32.store offset=4
       block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$103 (result i32)
        local.get $7
        local.get $4
        local.get $3
        local.get $1
        call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
        local.set $4
        local.get $5
        i32.const 2359560
        i32.or
        local.set $7
        block $default0
         block $case41
          block $case32
           block $case23
            block $case14
             block $case05
              local.get $6
              i32.const 8
              i32.sub
              i32.load
              i32.const 5
              i32.sub
              br_table $case05 $case14 $case23 $case32 $case41 $default0
             end
             local.get $4
             local.get $7
             i32.and
             i32.eqz
             br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$103
            end
            local.get $7
            i32.const -2097153
            i32.and
            local.get $4
            i32.and
            i32.eqz
            local.get $4
            i32.const 2097152
            i32.and
            i32.const 0
            i32.ne
            i32.and
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$103
           end
           local.get $4
           local.get $7
           i32.and
           i32.eqz
           local.get $4
           i32.const -2147483648
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$103
          end
          local.get $4
          local.get $7
          i32.const -2147483648
          i32.or
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$103
         end
         local.get $7
         i32.const 511
         i32.and
         i32.const 9
         i32.shl
         local.get $7
         i32.const 2143289344
         i32.and
         i32.const 13
         i32.shr_u
         i32.or
         local.get $4
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$103
        end
        unreachable
       end
      else
       i32.const 0
      end
      if (result i32)
       global.get $~lib/memory/__stack_pointer
       local.get $6
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=8
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.load
       local.tee $0
       i32.store offset=4
       block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$104 (result i32)
        local.get $0
        local.get $2
        local.get $3
        i32.const 1
        i32.add
        local.get $1
        call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
        local.set $0
        local.get $5
        i32.const 2359584
        i32.or
        local.set $1
        block $default1
         block $case42
          block $case33
           block $case24
            block $case15
             block $case06
              local.get $6
              i32.const 8
              i32.sub
              i32.load
              i32.const 5
              i32.sub
              br_table $case06 $case15 $case24 $case33 $case42 $default1
             end
             local.get $0
             local.get $1
             i32.and
             i32.eqz
             br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$104
            end
            local.get $1
            i32.const -2097153
            i32.and
            local.get $0
            i32.and
            i32.eqz
            local.get $0
            i32.const 2097152
            i32.and
            i32.const 0
            i32.ne
            i32.and
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$104
           end
           local.get $0
           local.get $1
           i32.and
           i32.eqz
           local.get $0
           i32.const -2147483648
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$104
          end
          local.get $0
          local.get $1
          i32.const -2147483648
          i32.or
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$104
         end
         local.get $1
         i32.const 511
         i32.and
         i32.const 9
         i32.shl
         local.get $1
         i32.const 2143289344
         i32.and
         i32.const 13
         i32.shr_u
         i32.or
         local.get $0
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$104
        end
        unreachable
       end
      else
       i32.const 0
      end
      i32.eqz
      local.set $0
      br $folding-inner0
     end
     global.get $~lib/memory/__stack_pointer
     local.get $6
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load
     local.tee $4
     i32.store offset=4
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$105 (result i32)
      local.get $4
      local.get $2
      i32.const 1
      i32.sub
      local.tee $4
      local.get $3
      i32.const 1
      i32.add
      local.get $1
      call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
      local.set $7
      local.get $5
      i32.const 2359614
      i32.or
      local.set $8
      block $default2
       block $case43
        block $case34
         block $case25
          block $case16
           block $case07
            local.get $6
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case07 $case16 $case25 $case34 $case43 $default2
           end
           local.get $7
           local.get $8
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$105
          end
          local.get $8
          i32.const -2097153
          i32.and
          local.get $7
          i32.and
          i32.eqz
          local.get $7
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$105
         end
         local.get $7
         local.get $8
         i32.and
         i32.eqz
         local.get $7
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$105
        end
        local.get $7
        local.get $8
        i32.const -2147483648
        i32.or
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$105
       end
       local.get $8
       i32.const 511
       i32.and
       i32.const 9
       i32.shl
       local.get $8
       i32.const 2143289344
       i32.and
       i32.const 13
       i32.shr_u
       i32.or
       local.get $7
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$105
      end
      unreachable
     end
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $7
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$106 (result i32)
       local.get $7
       local.get $4
       local.get $3
       i32.const 2
       i32.add
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $4
       local.get $5
       i32.const 2359608
       i32.or
       local.set $7
       block $default3
        block $case44
         block $case35
          block $case26
           block $case17
            block $case08
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case08 $case17 $case26 $case35 $case44 $default3
            end
            local.get $4
            local.get $7
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$106
           end
           local.get $7
           i32.const -2097153
           i32.and
           local.get $4
           i32.and
           i32.eqz
           local.get $4
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$106
          end
          local.get $4
          local.get $7
          i32.and
          i32.eqz
          local.get $4
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$106
         end
         local.get $4
         local.get $7
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$106
        end
        local.get $7
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $7
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $4
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$106
       end
       unreachable
      end
     else
      i32.const 0
     end
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $0
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$107 (result i32)
       local.get $0
       local.get $2
       local.get $3
       i32.const 2
       i32.add
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $0
       local.get $5
       i32.const 2359800
       i32.or
       local.set $1
       block $default4
        block $case45
         block $case36
          block $case27
           block $case18
            block $case09
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case09 $case18 $case27 $case36 $case45 $default4
            end
            local.get $0
            local.get $1
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$107
           end
           local.get $1
           i32.const -2097153
           i32.and
           local.get $0
           i32.and
           i32.eqz
           local.get $0
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$107
          end
          local.get $0
          local.get $1
          i32.and
          i32.eqz
          local.get $0
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$107
         end
         local.get $0
         local.get $1
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$107
        end
        local.get $1
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $1
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $0
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$107
       end
       unreachable
      end
     else
      i32.const 0
     end
     i32.eqz
     local.set $0
     br $folding-inner0
    end
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $7
    i32.store offset=4
    block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$108 (result i32)
     local.get $7
     local.get $2
     i32.const 1
     i32.sub
     local.get $3
     local.get $4
     i32.add
     local.get $1
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
     local.set $7
     local.get $5
     i32.const 2359608
     i32.or
     local.set $8
     block $default5
      block $case46
       block $case37
        block $case28
         block $case19
          block $case010
           local.get $6
           i32.const 8
           i32.sub
           i32.load
           i32.const 5
           i32.sub
           br_table $case010 $case19 $case28 $case37 $case46 $default5
          end
          local.get $7
          local.get $8
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$108
         end
         local.get $8
         i32.const -2097153
         i32.and
         local.get $7
         i32.and
         i32.eqz
         local.get $7
         i32.const 2097152
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$108
        end
        local.get $7
        local.get $8
        i32.and
        i32.eqz
        local.get $7
        i32.const -2147483648
        i32.and
        i32.const 0
        i32.ne
        i32.and
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$108
       end
       local.get $7
       local.get $8
       i32.const -2147483648
       i32.or
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$108
      end
      local.get $8
      i32.const 511
      i32.and
      i32.const 9
      i32.shl
      local.get $8
      i32.const 2143289344
      i32.and
      i32.const 13
      i32.shr_u
      i32.or
      local.get $7
      i32.and
      i32.eqz
      br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$108
     end
     unreachable
    end
    i32.eqz
    br_if $folding-inner1
    i32.const 1
    local.set $7
    loop $for-loop|1
     local.get $4
     local.get $7
     i32.gt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $8
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$109 (result i32)
       local.get $8
       local.get $2
       i32.const 1
       i32.sub
       local.get $3
       local.get $7
       i32.add
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $8
       local.get $5
       i32.const 2359614
       i32.or
       local.set $9
       block $default6
        block $case47
         block $case38
          block $case29
           block $case110
            block $case011
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case011 $case110 $case29 $case38 $case47 $default6
            end
            local.get $8
            local.get $9
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$109
           end
           local.get $9
           i32.const -2097153
           i32.and
           local.get $8
           i32.and
           i32.eqz
           local.get $8
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$109
          end
          local.get $8
          local.get $9
          i32.and
          i32.eqz
          local.get $8
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$109
         end
         local.get $8
         local.get $9
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$109
        end
        local.get $9
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $9
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $8
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$109
       end
       unreachable
      end
      i32.eqz
      br_if $folding-inner1
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $8
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$110 (result i32)
       local.get $8
       local.get $2
       local.get $7
       i32.add
       i32.const 1
       i32.sub
       local.get $3
       local.get $4
       i32.add
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $8
       local.get $5
       i32.const 2359800
       i32.or
       local.set $9
       block $default7
        block $case48
         block $case39
          block $case210
           block $case111
            block $case012
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case012 $case111 $case210 $case39 $case48 $default7
            end
            local.get $8
            local.get $9
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$110
           end
           local.get $9
           i32.const -2097153
           i32.and
           local.get $8
           i32.and
           i32.eqz
           local.get $8
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$110
          end
          local.get $8
          local.get $9
          i32.and
          i32.eqz
          local.get $8
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$110
         end
         local.get $8
         local.get $9
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$110
        end
        local.get $9
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $9
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $8
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$110
       end
       unreachable
      end
      i32.eqz
      br_if $folding-inner1
      local.get $7
      i32.const 1
      i32.add
      local.set $7
      br $for-loop|1
     end
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 12
    i32.add
    global.set $~lib/memory/__stack_pointer
    i32.const 0
    return
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 1
 )
 (func $assembly/StepValidator/StepValidator#isBlockedSouthEast (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (result i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  block $folding-inner1
   block $folding-inner0
    block $case2|0
     block $case1|0
      local.get $4
      i32.const 1
      i32.ne
      if
       local.get $4
       i32.const 2
       i32.eq
       br_if $case1|0
       br $case2|0
      end
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $4
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$111 (result i32)
       local.get $4
       local.get $2
       i32.const 1
       i32.add
       local.tee $4
       local.get $3
       i32.const 1
       i32.sub
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $7
       local.get $5
       i32.const 2359683
       i32.or
       local.set $8
       block $default
        block $case4
         block $case3
          block $case2
           block $case1
            block $case0
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case0 $case1 $case2 $case3 $case4 $default
            end
            local.get $7
            local.get $8
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$111
           end
           local.get $8
           i32.const -2097153
           i32.and
           local.get $7
           i32.and
           i32.eqz
           local.get $7
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$111
          end
          local.get $7
          local.get $8
          i32.and
          i32.eqz
          local.get $7
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$111
         end
         local.get $7
         local.get $8
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$111
        end
        local.get $8
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $8
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $7
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$111
       end
       unreachable
      end
      if (result i32)
       global.get $~lib/memory/__stack_pointer
       local.get $6
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=8
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.load
       local.tee $7
       i32.store offset=4
       block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$112 (result i32)
        local.get $7
        local.get $4
        local.get $3
        local.get $1
        call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
        local.set $4
        local.get $5
        i32.const 2359680
        i32.or
        local.set $7
        block $default0
         block $case41
          block $case32
           block $case23
            block $case14
             block $case05
              local.get $6
              i32.const 8
              i32.sub
              i32.load
              i32.const 5
              i32.sub
              br_table $case05 $case14 $case23 $case32 $case41 $default0
             end
             local.get $4
             local.get $7
             i32.and
             i32.eqz
             br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$112
            end
            local.get $7
            i32.const -2097153
            i32.and
            local.get $4
            i32.and
            i32.eqz
            local.get $4
            i32.const 2097152
            i32.and
            i32.const 0
            i32.ne
            i32.and
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$112
           end
           local.get $4
           local.get $7
           i32.and
           i32.eqz
           local.get $4
           i32.const -2147483648
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$112
          end
          local.get $4
          local.get $7
          i32.const -2147483648
          i32.or
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$112
         end
         local.get $7
         i32.const 511
         i32.and
         i32.const 9
         i32.shl
         local.get $7
         i32.const 2143289344
         i32.and
         i32.const 13
         i32.shr_u
         i32.or
         local.get $4
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$112
        end
        unreachable
       end
      else
       i32.const 0
      end
      if (result i32)
       global.get $~lib/memory/__stack_pointer
       local.get $6
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=8
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.load
       local.tee $0
       i32.store offset=4
       block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$113 (result i32)
        local.get $0
        local.get $2
        local.get $3
        i32.const 1
        i32.sub
        local.get $1
        call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
        local.set $0
        local.get $5
        i32.const 2359554
        i32.or
        local.set $1
        block $default1
         block $case42
          block $case33
           block $case24
            block $case15
             block $case06
              local.get $6
              i32.const 8
              i32.sub
              i32.load
              i32.const 5
              i32.sub
              br_table $case06 $case15 $case24 $case33 $case42 $default1
             end
             local.get $0
             local.get $1
             i32.and
             i32.eqz
             br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$113
            end
            local.get $1
            i32.const -2097153
            i32.and
            local.get $0
            i32.and
            i32.eqz
            local.get $0
            i32.const 2097152
            i32.and
            i32.const 0
            i32.ne
            i32.and
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$113
           end
           local.get $0
           local.get $1
           i32.and
           i32.eqz
           local.get $0
           i32.const -2147483648
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$113
          end
          local.get $0
          local.get $1
          i32.const -2147483648
          i32.or
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$113
         end
         local.get $1
         i32.const 511
         i32.and
         i32.const 9
         i32.shl
         local.get $1
         i32.const 2143289344
         i32.and
         i32.const 13
         i32.shr_u
         i32.or
         local.get $0
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$113
        end
        unreachable
       end
      else
       i32.const 0
      end
      i32.eqz
      local.set $0
      br $folding-inner0
     end
     global.get $~lib/memory/__stack_pointer
     local.get $6
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load
     local.tee $4
     i32.store offset=4
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$114 (result i32)
      local.get $4
      local.get $2
      i32.const 1
      i32.add
      local.get $3
      i32.const 1
      i32.sub
      local.tee $4
      local.get $1
      call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
      local.set $7
      local.get $5
      i32.const 2359695
      i32.or
      local.set $8
      block $default2
       block $case43
        block $case34
         block $case25
          block $case16
           block $case07
            local.get $6
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case07 $case16 $case25 $case34 $case43 $default2
           end
           local.get $7
           local.get $8
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$114
          end
          local.get $8
          i32.const -2097153
          i32.and
          local.get $7
          i32.and
          i32.eqz
          local.get $7
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$114
         end
         local.get $7
         local.get $8
         i32.and
         i32.eqz
         local.get $7
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$114
        end
        local.get $7
        local.get $8
        i32.const -2147483648
        i32.or
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$114
       end
       local.get $8
       i32.const 511
       i32.and
       i32.const 9
       i32.shl
       local.get $8
       i32.const 2143289344
       i32.and
       i32.const 13
       i32.shr_u
       i32.or
       local.get $7
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$114
      end
      unreachable
     end
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $7
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$115 (result i32)
       local.get $7
       local.get $2
       i32.const 2
       i32.add
       local.get $4
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $4
       local.get $5
       i32.const 2359683
       i32.or
       local.set $7
       block $default3
        block $case44
         block $case35
          block $case26
           block $case17
            block $case08
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case08 $case17 $case26 $case35 $case44 $default3
            end
            local.get $4
            local.get $7
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$115
           end
           local.get $7
           i32.const -2097153
           i32.and
           local.get $4
           i32.and
           i32.eqz
           local.get $4
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$115
          end
          local.get $4
          local.get $7
          i32.and
          i32.eqz
          local.get $4
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$115
         end
         local.get $4
         local.get $7
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$115
        end
        local.get $7
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $7
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $4
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$115
       end
       unreachable
      end
     else
      i32.const 0
     end
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $0
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$116 (result i32)
       local.get $0
       local.get $2
       i32.const 2
       i32.add
       local.get $3
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $0
       local.get $5
       i32.const 2359779
       i32.or
       local.set $1
       block $default4
        block $case45
         block $case36
          block $case27
           block $case18
            block $case09
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case09 $case18 $case27 $case36 $case45 $default4
            end
            local.get $0
            local.get $1
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$116
           end
           local.get $1
           i32.const -2097153
           i32.and
           local.get $0
           i32.and
           i32.eqz
           local.get $0
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$116
          end
          local.get $0
          local.get $1
          i32.and
          i32.eqz
          local.get $0
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$116
         end
         local.get $0
         local.get $1
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$116
        end
        local.get $1
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $1
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $0
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$116
       end
       unreachable
      end
     else
      i32.const 0
     end
     i32.eqz
     local.set $0
     br $folding-inner0
    end
    i32.const 1
    local.set $7
    loop $for-loop|1
     local.get $4
     local.get $7
     i32.gt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $8
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$117 (result i32)
       local.get $8
       local.get $2
       local.get $4
       i32.add
       local.get $3
       local.get $7
       i32.add
       i32.const 1
       i32.sub
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $8
       local.get $5
       i32.const 2359779
       i32.or
       local.set $9
       block $default5
        block $case46
         block $case37
          block $case28
           block $case19
            block $case010
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case010 $case19 $case28 $case37 $case46 $default5
            end
            local.get $8
            local.get $9
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$117
           end
           local.get $9
           i32.const -2097153
           i32.and
           local.get $8
           i32.and
           i32.eqz
           local.get $8
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$117
          end
          local.get $8
          local.get $9
          i32.and
          i32.eqz
          local.get $8
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$117
         end
         local.get $8
         local.get $9
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$117
        end
        local.get $9
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $9
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $8
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$117
       end
       unreachable
      end
      i32.eqz
      br_if $folding-inner1
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $8
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$118 (result i32)
       local.get $8
       local.get $2
       local.get $7
       i32.add
       local.get $3
       i32.const 1
       i32.sub
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $8
       local.get $5
       i32.const 2359695
       i32.or
       local.set $9
       block $default6
        block $case47
         block $case38
          block $case29
           block $case110
            block $case011
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case011 $case110 $case29 $case38 $case47 $default6
            end
            local.get $8
            local.get $9
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$118
           end
           local.get $9
           i32.const -2097153
           i32.and
           local.get $8
           i32.and
           i32.eqz
           local.get $8
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$118
          end
          local.get $8
          local.get $9
          i32.and
          i32.eqz
          local.get $8
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$118
         end
         local.get $8
         local.get $9
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$118
        end
        local.get $9
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $9
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $8
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$118
       end
       unreachable
      end
      i32.eqz
      br_if $folding-inner1
      local.get $7
      i32.const 1
      i32.add
      local.set $7
      br $for-loop|1
     end
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 12
    i32.add
    global.set $~lib/memory/__stack_pointer
    i32.const 0
    return
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 1
 )
 (func $assembly/StepValidator/StepValidator#isBlockedNorthEast (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (result i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  block $folding-inner1
   block $folding-inner0
    block $case2|0
     block $case1|0
      local.get $4
      i32.const 1
      i32.ne
      if
       local.get $4
       i32.const 2
       i32.eq
       br_if $case1|0
       br $case2|0
      end
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $4
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$119 (result i32)
       local.get $4
       local.get $2
       i32.const 1
       i32.add
       local.tee $4
       local.get $3
       i32.const 1
       i32.add
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $7
       local.get $5
       i32.const 2359776
       i32.or
       local.set $8
       block $default
        block $case4
         block $case3
          block $case2
           block $case1
            block $case0
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case0 $case1 $case2 $case3 $case4 $default
            end
            local.get $7
            local.get $8
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$119
           end
           local.get $8
           i32.const -2097153
           i32.and
           local.get $7
           i32.and
           i32.eqz
           local.get $7
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$119
          end
          local.get $7
          local.get $8
          i32.and
          i32.eqz
          local.get $7
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$119
         end
         local.get $7
         local.get $8
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$119
        end
        local.get $8
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $8
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $7
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$119
       end
       unreachable
      end
      if (result i32)
       global.get $~lib/memory/__stack_pointer
       local.get $6
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=8
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.load
       local.tee $7
       i32.store offset=4
       block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$120 (result i32)
        local.get $7
        local.get $4
        local.get $3
        local.get $1
        call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
        local.set $4
        local.get $5
        i32.const 2359680
        i32.or
        local.set $7
        block $default0
         block $case41
          block $case32
           block $case23
            block $case14
             block $case05
              local.get $6
              i32.const 8
              i32.sub
              i32.load
              i32.const 5
              i32.sub
              br_table $case05 $case14 $case23 $case32 $case41 $default0
             end
             local.get $4
             local.get $7
             i32.and
             i32.eqz
             br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$120
            end
            local.get $7
            i32.const -2097153
            i32.and
            local.get $4
            i32.and
            i32.eqz
            local.get $4
            i32.const 2097152
            i32.and
            i32.const 0
            i32.ne
            i32.and
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$120
           end
           local.get $4
           local.get $7
           i32.and
           i32.eqz
           local.get $4
           i32.const -2147483648
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$120
          end
          local.get $4
          local.get $7
          i32.const -2147483648
          i32.or
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$120
         end
         local.get $7
         i32.const 511
         i32.and
         i32.const 9
         i32.shl
         local.get $7
         i32.const 2143289344
         i32.and
         i32.const 13
         i32.shr_u
         i32.or
         local.get $4
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$120
        end
        unreachable
       end
      else
       i32.const 0
      end
      if (result i32)
       global.get $~lib/memory/__stack_pointer
       local.get $6
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=8
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.load
       local.tee $0
       i32.store offset=4
       block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$121 (result i32)
        local.get $0
        local.get $2
        local.get $3
        i32.const 1
        i32.add
        local.get $1
        call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
        local.set $0
        local.get $5
        i32.const 2359584
        i32.or
        local.set $1
        block $default1
         block $case42
          block $case33
           block $case24
            block $case15
             block $case06
              local.get $6
              i32.const 8
              i32.sub
              i32.load
              i32.const 5
              i32.sub
              br_table $case06 $case15 $case24 $case33 $case42 $default1
             end
             local.get $0
             local.get $1
             i32.and
             i32.eqz
             br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$121
            end
            local.get $1
            i32.const -2097153
            i32.and
            local.get $0
            i32.and
            i32.eqz
            local.get $0
            i32.const 2097152
            i32.and
            i32.const 0
            i32.ne
            i32.and
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$121
           end
           local.get $0
           local.get $1
           i32.and
           i32.eqz
           local.get $0
           i32.const -2147483648
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$121
          end
          local.get $0
          local.get $1
          i32.const -2147483648
          i32.or
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$121
         end
         local.get $1
         i32.const 511
         i32.and
         i32.const 9
         i32.shl
         local.get $1
         i32.const 2143289344
         i32.and
         i32.const 13
         i32.shr_u
         i32.or
         local.get $0
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$121
        end
        unreachable
       end
      else
       i32.const 0
      end
      i32.eqz
      local.set $0
      br $folding-inner0
     end
     global.get $~lib/memory/__stack_pointer
     local.get $6
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load
     local.tee $4
     i32.store offset=4
     block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$122 (result i32)
      local.get $4
      local.get $2
      i32.const 1
      i32.add
      local.get $3
      i32.const 2
      i32.add
      local.tee $4
      local.get $1
      call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
      local.set $7
      local.get $5
      i32.const 2359800
      i32.or
      local.set $8
      block $default2
       block $case43
        block $case34
         block $case25
          block $case16
           block $case07
            local.get $6
            i32.const 8
            i32.sub
            i32.load
            i32.const 5
            i32.sub
            br_table $case07 $case16 $case25 $case34 $case43 $default2
           end
           local.get $7
           local.get $8
           i32.and
           i32.eqz
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$122
          end
          local.get $8
          i32.const -2097153
          i32.and
          local.get $7
          i32.and
          i32.eqz
          local.get $7
          i32.const 2097152
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$122
         end
         local.get $7
         local.get $8
         i32.and
         i32.eqz
         local.get $7
         i32.const -2147483648
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$122
        end
        local.get $7
        local.get $8
        i32.const -2147483648
        i32.or
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$122
       end
       local.get $8
       i32.const 511
       i32.and
       i32.const 9
       i32.shl
       local.get $8
       i32.const 2143289344
       i32.and
       i32.const 13
       i32.shr_u
       i32.or
       local.get $7
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$122
      end
      unreachable
     end
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $7
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$123 (result i32)
       local.get $7
       local.get $2
       i32.const 2
       i32.add
       local.get $4
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $4
       local.get $5
       i32.const 2359776
       i32.or
       local.set $7
       block $default3
        block $case44
         block $case35
          block $case26
           block $case17
            block $case08
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case08 $case17 $case26 $case35 $case44 $default3
            end
            local.get $4
            local.get $7
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$123
           end
           local.get $7
           i32.const -2097153
           i32.and
           local.get $4
           i32.and
           i32.eqz
           local.get $4
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$123
          end
          local.get $4
          local.get $7
          i32.and
          i32.eqz
          local.get $4
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$123
         end
         local.get $4
         local.get $7
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$123
        end
        local.get $7
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $7
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $4
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$123
       end
       unreachable
      end
     else
      i32.const 0
     end
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $0
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$124 (result i32)
       local.get $0
       local.get $2
       i32.const 2
       i32.add
       local.get $3
       i32.const 1
       i32.add
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $0
       local.get $5
       i32.const 2359779
       i32.or
       local.set $1
       block $default4
        block $case45
         block $case36
          block $case27
           block $case18
            block $case09
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case09 $case18 $case27 $case36 $case45 $default4
            end
            local.get $0
            local.get $1
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$124
           end
           local.get $1
           i32.const -2097153
           i32.and
           local.get $0
           i32.and
           i32.eqz
           local.get $0
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$124
          end
          local.get $0
          local.get $1
          i32.and
          i32.eqz
          local.get $0
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$124
         end
         local.get $0
         local.get $1
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$124
        end
        local.get $1
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $1
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $0
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$124
       end
       unreachable
      end
     else
      i32.const 0
     end
     i32.eqz
     local.set $0
     br $folding-inner0
    end
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $7
    i32.store offset=4
    block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$125 (result i32)
     local.get $7
     local.get $2
     local.get $4
     i32.add
     local.get $3
     local.get $4
     i32.add
     local.get $1
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
     local.set $7
     local.get $5
     i32.const 2359776
     i32.or
     local.set $8
     block $default5
      block $case46
       block $case37
        block $case28
         block $case19
          block $case010
           local.get $6
           i32.const 8
           i32.sub
           i32.load
           i32.const 5
           i32.sub
           br_table $case010 $case19 $case28 $case37 $case46 $default5
          end
          local.get $7
          local.get $8
          i32.and
          i32.eqz
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$125
         end
         local.get $8
         i32.const -2097153
         i32.and
         local.get $7
         i32.and
         i32.eqz
         local.get $7
         i32.const 2097152
         i32.and
         i32.const 0
         i32.ne
         i32.and
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$125
        end
        local.get $7
        local.get $8
        i32.and
        i32.eqz
        local.get $7
        i32.const -2147483648
        i32.and
        i32.const 0
        i32.ne
        i32.and
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$125
       end
       local.get $7
       local.get $8
       i32.const -2147483648
       i32.or
       i32.and
       i32.eqz
       br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$125
      end
      local.get $8
      i32.const 511
      i32.and
      i32.const 9
      i32.shl
      local.get $8
      i32.const 2143289344
      i32.and
      i32.const 13
      i32.shr_u
      i32.or
      local.get $7
      i32.and
      i32.eqz
      br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$125
     end
     unreachable
    end
    i32.eqz
    br_if $folding-inner1
    i32.const 1
    local.set $7
    loop $for-loop|1
     local.get $4
     local.get $7
     i32.gt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $8
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$126 (result i32)
       local.get $8
       local.get $2
       local.get $7
       i32.add
       local.get $3
       local.get $4
       i32.add
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $8
       local.get $5
       i32.const 2359800
       i32.or
       local.set $9
       block $default6
        block $case47
         block $case38
          block $case29
           block $case110
            block $case011
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case011 $case110 $case29 $case38 $case47 $default6
            end
            local.get $8
            local.get $9
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$126
           end
           local.get $9
           i32.const -2097153
           i32.and
           local.get $8
           i32.and
           i32.eqz
           local.get $8
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$126
          end
          local.get $8
          local.get $9
          i32.and
          i32.eqz
          local.get $8
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$126
         end
         local.get $8
         local.get $9
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$126
        end
        local.get $9
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $9
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $8
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$126
       end
       unreachable
      end
      i32.eqz
      br_if $folding-inner1
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $8
      i32.store offset=4
      block $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$127 (result i32)
       local.get $8
       local.get $2
       local.get $4
       i32.add
       local.get $3
       local.get $7
       i32.add
       local.get $1
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#get
       local.set $8
       local.get $5
       i32.const 2359779
       i32.or
       local.set $9
       block $default7
        block $case48
         block $case39
          block $case210
           block $case111
            block $case012
             local.get $6
             i32.const 8
             i32.sub
             i32.load
             i32.const 5
             i32.sub
             br_table $case012 $case111 $case210 $case39 $case48 $default7
            end
            local.get $8
            local.get $9
            i32.and
            i32.eqz
            br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$127
           end
           local.get $9
           i32.const -2097153
           i32.and
           local.get $8
           i32.and
           i32.eqz
           local.get $8
           i32.const 2097152
           i32.and
           i32.const 0
           i32.ne
           i32.and
           br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$127
          end
          local.get $8
          local.get $9
          i32.and
          i32.eqz
          local.get $8
          i32.const -2147483648
          i32.and
          i32.const 0
          i32.ne
          i32.and
          br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$127
         end
         local.get $8
         local.get $9
         i32.const -2147483648
         i32.or
         i32.and
         i32.eqz
         br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$127
        end
        local.get $9
        i32.const 511
        i32.and
        i32.const 9
        i32.shl
        local.get $9
        i32.const 2143289344
        i32.and
        i32.const 13
        i32.shr_u
        i32.or
        local.get $8
        i32.and
        i32.eqz
        br $__inlined_func$assembly/collision/CollisionStrategy/CollisionStrategy#canMove@override$127
       end
       unreachable
      end
      i32.eqz
      br_if $folding-inner1
      local.get $7
      i32.const 1
      i32.add
      local.set $7
      br $for-loop|1
     end
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 12
    i32.add
    global.set $~lib/memory/__stack_pointer
    i32.const 0
    return
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 1
 )
 (func $assembly/StepValidator/StepValidator#canTravel (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (param $7 i32) (param $8 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store offset=8
  local.get $4
  i32.eqz
  local.get $5
  i32.const -1
  i32.eq
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $8
   i32.store offset=4
   local.get $0
   local.get $1
   local.get $2
   local.get $3
   local.get $6
   local.get $7
   local.get $8
   call $assembly/StepValidator/StepValidator#isBlockedSouth
  else
   local.get $4
   i32.eqz
   local.get $5
   i32.const 1
   i32.eq
   i32.and
   if (result i32)
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $8
    i32.store offset=4
    local.get $0
    local.get $1
    local.get $2
    local.get $3
    local.get $6
    local.get $7
    local.get $8
    call $assembly/StepValidator/StepValidator#isBlockedNorth
   else
    local.get $5
    i32.eqz
    local.get $4
    i32.const -1
    i32.eq
    i32.and
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $8
     i32.store offset=4
     local.get $0
     local.get $1
     local.get $2
     local.get $3
     local.get $6
     local.get $7
     local.get $8
     call $assembly/StepValidator/StepValidator#isBlockedWest
    else
     local.get $5
     i32.eqz
     local.get $4
     i32.const 1
     i32.eq
     i32.and
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $8
      i32.store offset=4
      local.get $0
      local.get $1
      local.get $2
      local.get $3
      local.get $6
      local.get $7
      local.get $8
      call $assembly/StepValidator/StepValidator#isBlockedEast
     else
      local.get $4
      local.get $5
      i32.and
      i32.const -1
      i32.eq
      if (result i32)
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $8
       i32.store offset=4
       local.get $0
       local.get $1
       local.get $2
       local.get $3
       local.get $6
       local.get $7
       local.get $8
       call $assembly/StepValidator/StepValidator#isBlockedSouthWest
      else
       local.get $5
       i32.const 1
       i32.eq
       local.get $4
       i32.const -1
       i32.eq
       i32.and
       if (result i32)
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $8
        i32.store offset=4
        local.get $0
        local.get $1
        local.get $2
        local.get $3
        local.get $6
        local.get $7
        local.get $8
        call $assembly/StepValidator/StepValidator#isBlockedNorthWest
       else
        local.get $5
        i32.const -1
        i32.eq
        local.get $4
        i32.const 1
        i32.eq
        i32.and
        if (result i32)
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.store
         global.get $~lib/memory/__stack_pointer
         local.get $8
         i32.store offset=4
         local.get $0
         local.get $1
         local.get $2
         local.get $3
         local.get $6
         local.get $7
         local.get $8
         call $assembly/StepValidator/StepValidator#isBlockedSouthEast
        else
         local.get $5
         i32.const 1
         i32.eq
         local.get $4
         i32.const 1
         i32.eq
         i32.and
         if (result i32)
          global.get $~lib/memory/__stack_pointer
          local.get $0
          i32.store
          global.get $~lib/memory/__stack_pointer
          local.get $8
          i32.store offset=4
          local.get $0
          local.get $1
          local.get $2
          local.get $3
          local.get $6
          local.get $7
          local.get $8
          call $assembly/StepValidator/StepValidator#isBlockedNorthEast
         else
          global.get $~lib/memory/__stack_pointer
          local.get $4
          call $~lib/number/I32#toString
          local.tee $0
          i32.store offset=8
          global.get $~lib/memory/__stack_pointer
          local.get $5
          call $~lib/number/I32#toString
          local.tee $1
          i32.store offset=12
          global.get $~lib/memory/__stack_pointer
          i32.const 4928
          i32.store
          global.get $~lib/memory/__stack_pointer
          local.get $0
          i32.store offset=4
          i32.const 4932
          local.get $0
          i32.store
          i32.const 4928
          local.get $0
          i32.const 1
          call $~lib/rt/itcms/__link
          global.get $~lib/memory/__stack_pointer
          i32.const 4928
          i32.store
          global.get $~lib/memory/__stack_pointer
          local.get $1
          i32.store offset=4
          i32.const 4940
          local.get $1
          i32.store
          i32.const 4928
          local.get $1
          i32.const 1
          call $~lib/rt/itcms/__link
          global.get $~lib/memory/__stack_pointer
          i32.const 4928
          i32.store
          global.get $~lib/memory/__stack_pointer
          i32.const 3552
          i32.store offset=4
          i32.const 4928
          call $~lib/staticarray/StaticArray<~lib/string/String>#join
          i32.const 4976
          i32.const 31
          i32.const 13
          call $~lib/builtins/abort
          unreachable
         end
        end
       end
      end
     end
    end
   end
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
  i32.eqz
 )
 (func $assembly/LineValidator/LineValidator#rayCast (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (param $7 i32) (param $8 i32) (param $9 i32) (param $10 i32) (param $11 i32) (param $12 i32) (param $13 i32) (param $14 i32) (param $15 i32) (result i32)
  (local $16 i32)
  (local $17 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  block $__inlined_func$assembly/Line/Line.coordinate$631
   local.get $2
   local.tee $16
   local.get $4
   i32.ge_s
   br_if $__inlined_func$assembly/Line/Line.coordinate$631
   local.get $6
   local.get $16
   i32.add
   i32.const 1
   i32.sub
   local.tee $16
   local.get $4
   i32.le_s
   br_if $__inlined_func$assembly/Line/Line.coordinate$631
   local.get $4
   local.set $16
  end
  local.get $16
  local.set $17
  block $__inlined_func$assembly/Line/Line.coordinate$632
   local.get $3
   local.tee $16
   local.get $5
   i32.ge_s
   br_if $__inlined_func$assembly/Line/Line.coordinate$632
   local.get $6
   local.get $16
   i32.add
   i32.const 1
   i32.sub
   local.tee $16
   local.get $5
   i32.le_s
   br_if $__inlined_func$assembly/Line/Line.coordinate$632
   local.get $5
   local.set $16
  end
  block $folding-inner1
   block $folding-inner0
    local.get $15
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load
     local.tee $6
     i32.store
     local.get $6
     local.get $17
     local.get $16
     local.get $1
     local.get $13
     call $assembly/collision/CollisionFlagMap/CollisionFlagMap#isFlagged
    else
     i32.const 0
    end
    br_if $folding-inner0
    block $__inlined_func$assembly/Line/Line.coordinate$634
     local.get $2
     local.get $4
     i32.le_s
     br_if $__inlined_func$assembly/Line/Line.coordinate$634
     local.get $4
     local.get $7
     i32.add
     i32.const 1
     i32.sub
     local.tee $4
     local.get $2
     i32.le_s
     br_if $__inlined_func$assembly/Line/Line.coordinate$634
     local.get $2
     local.set $4
    end
    block $__inlined_func$assembly/Line/Line.coordinate$635
     local.get $3
     local.get $5
     i32.le_s
     br_if $__inlined_func$assembly/Line/Line.coordinate$635
     local.get $5
     local.get $8
     i32.add
     i32.const 1
     i32.sub
     local.tee $5
     local.get $3
     i32.le_s
     br_if $__inlined_func$assembly/Line/Line.coordinate$635
     local.get $3
     local.set $5
    end
    local.get $5
    local.get $16
    i32.eq
    local.get $4
    local.get $17
    i32.eq
    i32.and
    br_if $folding-inner1
    local.get $4
    local.get $17
    i32.sub
    local.tee $2
    f64.convert_i32_s
    f64.abs
    i32.trunc_sat_f64_s
    local.set $3
    local.get $5
    local.get $16
    i32.sub
    local.tee $6
    f64.convert_i32_s
    f64.abs
    i32.trunc_sat_f64_s
    local.set $8
    local.get $9
    local.get $10
    local.get $2
    i32.const 0
    i32.ge_s
    local.tee $7
    select
    local.set $10
    local.get $11
    local.get $12
    local.get $6
    i32.const 0
    i32.ge_s
    local.tee $11
    select
    local.set $9
    local.get $3
    local.get $8
    i32.gt_s
    if
     i32.const 1
     i32.const -1
     local.get $7
     select
     local.set $2
     global.get $assembly/Line/Line.HALF_TILE
     local.get $16
     i32.const 16
     i32.shl
     i32.add
     i32.const 0
     i32.const -1
     local.get $11
     select
     i32.add
     local.set $8
     local.get $6
     i32.const 16
     i32.shl
     local.get $3
     i32.div_s
     local.set $3
     loop $while-continue|0
      local.get $4
      local.get $17
      i32.ne
      if
       local.get $10
       local.get $14
       i32.const -1
       i32.xor
       local.tee $6
       i32.and
       local.get $10
       local.get $8
       i32.const 16
       i32.shr_u
       local.tee $7
       local.get $5
       i32.eq
       i32.const 0
       local.get $4
       local.get $2
       local.get $17
       i32.add
       local.tee $17
       i32.eq
       i32.const 0
       local.get $15
       select
       local.tee $11
       select
       select
       local.set $10
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=4
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.load
       local.tee $12
       i32.store
       local.get $12
       local.get $17
       local.get $7
       local.get $1
       local.get $10
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#isFlagged
       br_if $folding-inner0
       local.get $6
       local.get $9
       i32.and
       local.get $9
       local.get $3
       local.get $8
       i32.add
       local.tee $8
       i32.const 16
       i32.shr_u
       local.tee $6
       local.get $5
       i32.eq
       i32.const 0
       local.get $11
       select
       select
       local.set $9
       local.get $6
       local.get $7
       i32.ne
       if (result i32)
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=4
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.load
        local.tee $7
        i32.store
        local.get $7
        local.get $17
        local.get $6
        local.get $1
        local.get $9
        call $assembly/collision/CollisionFlagMap/CollisionFlagMap#isFlagged
       else
        i32.const 0
       end
       br_if $folding-inner0
       br $while-continue|0
      end
     end
    else
     i32.const 1
     i32.const -1
     local.get $11
     select
     local.set $3
     global.get $assembly/Line/Line.HALF_TILE
     local.get $17
     i32.const 16
     i32.shl
     i32.add
     i32.const 0
     i32.const -1
     local.get $7
     select
     i32.add
     local.set $7
     local.get $2
     i32.const 16
     i32.shl
     local.get $8
     i32.div_s
     local.set $2
     loop $while-continue|1
      local.get $5
      local.get $16
      i32.ne
      if
       local.get $9
       local.get $14
       i32.const -1
       i32.xor
       local.tee $6
       i32.and
       local.get $9
       local.get $5
       local.get $3
       local.get $16
       i32.add
       local.tee $16
       i32.eq
       local.tee $8
       i32.const 0
       local.get $7
       i32.const 16
       i32.shr_u
       local.tee $11
       local.get $4
       i32.eq
       i32.const 0
       local.get $15
       select
       select
       select
       local.set $9
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=4
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.load
       local.tee $12
       i32.store
       local.get $12
       local.get $11
       local.get $16
       local.get $1
       local.get $9
       call $assembly/collision/CollisionFlagMap/CollisionFlagMap#isFlagged
       br_if $folding-inner0
       local.get $6
       local.get $10
       i32.and
       local.get $10
       local.get $8
       i32.const 0
       local.get $2
       local.get $7
       i32.add
       local.tee $7
       i32.const 16
       i32.shr_u
       local.tee $6
       local.get $4
       i32.eq
       i32.const 0
       local.get $15
       select
       select
       select
       local.set $10
       local.get $6
       local.get $11
       i32.ne
       if (result i32)
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=4
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.load
        local.tee $8
        i32.store
        local.get $8
        local.get $6
        local.get $16
        local.get $1
        local.get $10
        call $assembly/collision/CollisionFlagMap/CollisionFlagMap#isFlagged
       else
        i32.const 0
       end
       br_if $folding-inner0
       br $while-continue|1
      end
     end
    end
    br $folding-inner1
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 1
 )
 (func $~lib/array/Array<i32>#push (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $0
  i32.load offset=12
  local.tee $2
  i32.const 1
  i32.add
  local.tee $3
  call $~lib/array/ensureCapacity
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=4
  local.get $2
  i32.const 2
  i32.shl
  i32.add
  local.get $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $3
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/LinePathFinder/LinePathFinder#rayCast (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (param $7 i32) (param $8 i32) (param $9 i32) (param $10 i32) (param $11 i32) (param $12 i32) (param $13 i32) (param $14 i32) (result i32)
  (local $15 i32)
  (local $16 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 32
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 32
  memory.fill
  block $__inlined_func$assembly/Line/Line.coordinate$647
   local.get $2
   local.tee $15
   local.get $4
   i32.ge_s
   br_if $__inlined_func$assembly/Line/Line.coordinate$647
   local.get $6
   local.get $15
   i32.add
   i32.const 1
   i32.sub
   local.tee $15
   local.get $4
   i32.le_s
   br_if $__inlined_func$assembly/Line/Line.coordinate$647
   local.get $4
   local.set $15
  end
  local.get $15
  local.set $16
  block $__inlined_func$assembly/Line/Line.coordinate$648
   local.get $3
   local.tee $15
   local.get $5
   i32.ge_s
   br_if $__inlined_func$assembly/Line/Line.coordinate$648
   local.get $6
   local.get $15
   i32.add
   i32.const 1
   i32.sub
   local.tee $15
   local.get $5
   i32.le_s
   br_if $__inlined_func$assembly/Line/Line.coordinate$648
   local.get $5
   local.set $15
  end
  block $folding-inner2
   block $folding-inner1
    block $folding-inner0
     local.get $14
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=4
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $6
      i32.store
      local.get $6
      local.get $16
      local.get $15
      local.get $1
      local.get $13
      call $assembly/collision/CollisionFlagMap/CollisionFlagMap#isFlagged
     else
      i32.const 0
     end
     br_if $folding-inner0
     block $__inlined_func$assembly/Line/Line.coordinate$650
      local.get $2
      local.get $4
      i32.le_s
      br_if $__inlined_func$assembly/Line/Line.coordinate$650
      local.get $4
      local.get $7
      i32.add
      i32.const 1
      i32.sub
      local.tee $4
      local.get $2
      i32.le_s
      br_if $__inlined_func$assembly/Line/Line.coordinate$650
      local.get $2
      local.set $4
     end
     block $__inlined_func$assembly/Line/Line.coordinate$651
      local.get $3
      local.get $5
      i32.le_s
      br_if $__inlined_func$assembly/Line/Line.coordinate$651
      local.get $5
      local.get $8
      i32.add
      i32.const 1
      i32.sub
      local.tee $5
      local.get $3
      i32.le_s
      br_if $__inlined_func$assembly/Line/Line.coordinate$651
      local.get $3
      local.set $5
     end
     local.get $5
     local.get $15
     i32.eq
     local.get $4
     local.get $16
     i32.eq
     i32.and
     br_if $folding-inner0
     local.get $4
     local.get $16
     i32.sub
     local.tee $3
     f64.convert_i32_s
     f64.abs
     i32.trunc_sat_f64_s
     local.set $6
     local.get $5
     local.get $15
     i32.sub
     local.tee $7
     f64.convert_i32_s
     f64.abs
     i32.trunc_sat_f64_s
     local.set $8
     local.get $9
     local.get $10
     local.get $3
     i32.const 0
     i32.ge_s
     local.tee $9
     select
     local.set $2
     local.get $11
     local.get $12
     local.get $7
     i32.const 0
     i32.ge_s
     local.tee $11
     select
     local.set $10
     global.get $~lib/memory/__stack_pointer
     i32.const 5056
     call $~lib/rt/__newArray
     local.tee $12
     i32.store offset=8
     local.get $6
     local.get $8
     i32.gt_s
     if
      i32.const 1
      i32.const -1
      local.get $9
      select
      local.set $3
      global.get $assembly/Line/Line.HALF_TILE
      local.get $15
      i32.const 16
      i32.shl
      i32.add
      i32.const 0
      i32.const -1
      local.get $11
      select
      i32.add
      local.set $9
      local.get $7
      i32.const 16
      i32.shl
      local.get $6
      i32.div_s
      local.set $6
      loop $while-continue|0
       local.get $4
       local.get $16
       i32.ne
       if
        local.get $9
        i32.const 16
        i32.shr_u
        local.tee $7
        local.get $5
        i32.eq
        i32.const 0
        local.get $4
        local.get $3
        local.get $16
        i32.add
        local.tee $16
        i32.eq
        i32.const 0
        local.get $14
        select
        select
        if
         local.get $2
         i32.const -131073
         i32.and
         local.get $2
         i32.const -1048577
         i32.and
         i32.or
         local.set $2
        end
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=4
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.load
        local.tee $8
        i32.store
        local.get $8
        local.get $16
        local.get $7
        local.get $1
        local.get $2
        call $assembly/collision/CollisionFlagMap/CollisionFlagMap#isFlagged
        if
         global.get $~lib/memory/__stack_pointer
         local.get $12
         i32.store
         global.get $~lib/memory/__stack_pointer
         local.get $12
         call $~lib/array/Array<i32>#get:length
         call $~lib/typedarray/Int32Array#constructor
         local.tee $0
         i32.store offset=12
         br $folding-inner1
        end
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store
        local.get $12
        local.get $16
        i32.const 16383
        i32.and
        local.get $7
        i32.const 16383
        i32.and
        i32.const 14
        i32.shl
        i32.or
        local.get $1
        i32.const 3
        i32.and
        i32.const 28
        i32.shl
        i32.or
        call $~lib/array/Array<i32>#push
        local.get $6
        local.get $9
        i32.add
        local.tee $9
        i32.const 16
        i32.shr_u
        local.tee $8
        local.get $7
        i32.ne
        if
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.store offset=4
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.load
         local.tee $7
         i32.store
         local.get $5
         local.get $8
         i32.eq
         i32.const 0
         local.get $4
         local.get $16
         i32.eq
         i32.const 0
         local.get $14
         select
         select
         if
          local.get $10
          i32.const -131073
          i32.and
          local.get $10
          i32.const -1048577
          i32.and
          i32.or
          local.set $10
         end
         local.get $7
         local.get $16
         local.get $8
         local.get $1
         local.get $10
         call $assembly/collision/CollisionFlagMap/CollisionFlagMap#isFlagged
         if
          global.get $~lib/memory/__stack_pointer
          local.get $12
          i32.store
          global.get $~lib/memory/__stack_pointer
          local.get $12
          call $~lib/array/Array<i32>#get:length
          call $~lib/typedarray/Int32Array#constructor
          local.tee $0
          i32.store offset=16
          br $folding-inner1
         end
         global.get $~lib/memory/__stack_pointer
         local.get $12
         i32.store
         local.get $12
         local.get $16
         i32.const 16383
         i32.and
         local.get $8
         i32.const 16383
         i32.and
         i32.const 14
         i32.shl
         i32.or
         local.get $1
         i32.const 3
         i32.and
         i32.const 28
         i32.shl
         i32.or
         call $~lib/array/Array<i32>#push
        end
        br $while-continue|0
       end
      end
     else
      i32.const 1
      i32.const -1
      local.get $11
      select
      local.set $6
      global.get $assembly/Line/Line.HALF_TILE
      local.get $16
      i32.const 16
      i32.shl
      i32.add
      i32.const 0
      i32.const -1
      local.get $9
      select
      i32.add
      local.set $7
      local.get $3
      i32.const 16
      i32.shl
      local.get $8
      i32.div_s
      local.set $3
      loop $while-continue|3
       local.get $5
       local.get $15
       i32.ne
       if
        local.get $5
        local.get $6
        local.get $15
        i32.add
        local.tee $15
        i32.eq
        i32.const 0
        local.get $7
        i32.const 16
        i32.shr_u
        local.tee $8
        local.get $4
        i32.eq
        i32.const 0
        local.get $14
        select
        select
        if
         local.get $10
         i32.const -131073
         i32.and
         local.get $10
         i32.const -1048577
         i32.and
         i32.or
         local.set $10
        end
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=4
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.load
        local.tee $9
        i32.store
        local.get $9
        local.get $8
        local.get $15
        local.get $1
        local.get $10
        call $assembly/collision/CollisionFlagMap/CollisionFlagMap#isFlagged
        if
         global.get $~lib/memory/__stack_pointer
         local.get $12
         i32.store
         global.get $~lib/memory/__stack_pointer
         local.get $12
         call $~lib/array/Array<i32>#get:length
         call $~lib/typedarray/Int32Array#constructor
         local.tee $0
         i32.store offset=20
         br $folding-inner1
        end
        global.get $~lib/memory/__stack_pointer
        local.get $12
        i32.store
        local.get $12
        local.get $8
        i32.const 16383
        i32.and
        local.get $15
        i32.const 16383
        i32.and
        i32.const 14
        i32.shl
        i32.or
        local.get $1
        i32.const 3
        i32.and
        i32.const 28
        i32.shl
        i32.or
        call $~lib/array/Array<i32>#push
        local.get $3
        local.get $7
        i32.add
        local.tee $7
        i32.const 16
        i32.shr_u
        local.tee $9
        local.get $8
        i32.ne
        if
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.store offset=4
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.load
         local.tee $8
         i32.store
         local.get $5
         local.get $15
         i32.eq
         i32.const 0
         local.get $4
         local.get $9
         i32.eq
         i32.const 0
         local.get $14
         select
         select
         if
          local.get $2
          i32.const -131073
          i32.and
          local.get $2
          i32.const -1048577
          i32.and
          i32.or
          local.set $2
         end
         local.get $8
         local.get $9
         local.get $15
         local.get $1
         local.get $2
         call $assembly/collision/CollisionFlagMap/CollisionFlagMap#isFlagged
         if
          global.get $~lib/memory/__stack_pointer
          local.get $12
          i32.store
          global.get $~lib/memory/__stack_pointer
          local.get $12
          call $~lib/array/Array<i32>#get:length
          call $~lib/typedarray/Int32Array#constructor
          local.tee $0
          i32.store offset=24
          br $folding-inner1
         end
         global.get $~lib/memory/__stack_pointer
         local.get $12
         i32.store
         local.get $12
         local.get $9
         i32.const 16383
         i32.and
         local.get $15
         i32.const 16383
         i32.and
         i32.const 14
         i32.shl
         i32.or
         local.get $1
         i32.const 3
         i32.and
         i32.const 28
         i32.shl
         i32.or
         call $~lib/array/Array<i32>#push
        end
        br $while-continue|3
       end
      end
     end
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $12
     call $~lib/array/Array<i32>#get:length
     call $~lib/typedarray/Int32Array#constructor
     local.tee $0
     i32.store offset=28
     i32.const 0
     local.set $1
     loop $for-loop|6
      global.get $~lib/memory/__stack_pointer
      local.get $12
      i32.store
      local.get $12
      call $~lib/array/Array<i32>#get:length
      local.get $1
      i32.gt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $12
       i32.store offset=4
       local.get $0
       local.get $1
       local.get $12
       local.get $1
       call $~lib/array/Array<i32>#__get
       call $~lib/typedarray/Int32Array#__set
       local.get $1
       i32.const 1
       i32.add
       local.set $1
       br $for-loop|6
      end
     end
     br $folding-inner2
    end
    i32.const 0
    call $~lib/typedarray/Int32Array#constructor
    local.set $0
    br $folding-inner2
   end
   i32.const 0
   local.set $1
   loop $for-loop|1
    global.get $~lib/memory/__stack_pointer
    local.get $12
    i32.store
    local.get $12
    call $~lib/array/Array<i32>#get:length
    local.get $1
    i32.gt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $12
     i32.store offset=4
     local.get $0
     local.get $1
     local.get $12
     local.get $1
     call $~lib/array/Array<i32>#__get
     call $~lib/typedarray/Int32Array#__set
     local.get $1
     i32.const 1
     i32.add
     local.set $1
     br $for-loop|1
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 32
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 32
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/object/Object#constructor (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.const 0
   call $~lib/rt/itcms/__new
   local.tee $0
   i32.store
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/staticarray/StaticArray<i32>#constructor (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 268435455
  i32.gt_u
  if
   i32.const 1456
   i32.const 1504
   i32.const 51
   i32.const 60
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.const 2
  i32.shl
  i32.const 11
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/rt/__newArray (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5156
  i32.lt_s
  if
   i32.const 37952
   i32.const 38000
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.set $2
  i32.const 0
  i32.const 1
  call $~lib/rt/itcms/__new
  local.set $1
  local.get $0
  if
   local.get $1
   local.get $0
   i32.const 0
   memory.copy
  end
  local.get $2
  local.get $1
  i32.store
  i32.const 16
  i32.const 19
  call $~lib/rt/itcms/__new
  local.tee $0
  local.get $1
  i32.store
  local.get $0
  local.get $1
  i32.const 0
  call $~lib/rt/itcms/__link
  local.get $0
  local.get $1
  i32.store offset=4
  local.get $0
  i32.const 0
  i32.store offset=8
  local.get $0
  i32.const 0
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
)
