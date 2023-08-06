export default class CollisionFlag {
    static NULL: number = 0xFFFFFFFF; // -1
    static OPEN: number = 0x0;
    static WALL_NORTH_WEST: number = 0x1;
    static WALL_NORTH: number = 0x2;
    static WALL_NORTH_EAST: number = 0x4;
    static WALL_EAST: number = 0x8;
    static WALL_SOUTH_EAST: number = 0x10;
    static WALL_SOUTH: number = 0x20;
    static WALL_SOUTH_WEST: number = 0x40;
    static WALL_WEST: number = 0x80;
    static LOC: number = 0x100;
    static WALL_NORTH_WEST_PROJ_BLOCKER: number = 0x200;
    static WALL_NORTH_PROJ_BLOCKER: number = 0x400;
    static WALL_NORTH_EAST_PROJ_BLOCKER: number = 0x800;
    static WALL_EAST_PROJ_BLOCKER: number = 0x1000;
    static WALL_SOUTH_EAST_PROJ_BLOCKER: number = 0x2000;
    static WALL_SOUTH_PROJ_BLOCKER: number = 0x4000;
    static WALL_SOUTH_WEST_PROJ_BLOCKER: number = 0x8000;
    static WALL_WEST_PROJ_BLOCKER: number = 0x10000;
    static LOC_PROJ_BLOCKER: number = 0x20000;
    static FLOOR_DECORATION: number = 0x40000;

    /**
     * Custom flag dedicated to blocking NPCs.
     * It should be noted that this is a custom flag, and you do not need to use this.
     * The pathfinder takes the flag as a custom option, so you may use any other flag, this just defines
     * a reliable constant to use
     */
    static BLOCK_NPC: number = 0x80000;

    /**
     * Custom flag dedicated to blocking players, projectiles as well as NPCs.
     * An example of a monster to set this flag is Brawler. Note that it is unclear if this flag
     * prevents NPCs, as there is a separate flag option for it.
     * This flag is similar to the one above, except it's strictly for NPCs.
     */
    static BLOCK_PLAYER: number = 0x100000;

    static FLOOR: number = 0x200000;

    /**
     * Roof flag, used to bind NPCs to not leave the buildings they spawn in. This is a custom flag.
     */
    static ROOF: number = 0x80000000;

    /* A shorthand combination of both the floor flags. */
    static FLOOR_BLOCKED: number = CollisionFlag.FLOOR | CollisionFlag.FLOOR_DECORATION;

    static WALK_BLOCKED: number = CollisionFlag.LOC | CollisionFlag.FLOOR_BLOCKED;

    /* Mixed masks of the above flags */
    static BLOCK_WEST: number = CollisionFlag.WALL_EAST |
        CollisionFlag.LOC |
        CollisionFlag.FLOOR_BLOCKED;

    static BLOCK_EAST: number = CollisionFlag.WALL_WEST |
        CollisionFlag.LOC |
        CollisionFlag.FLOOR_BLOCKED;

    static BLOCK_SOUTH: number = CollisionFlag.WALL_NORTH |
        CollisionFlag.LOC |
        CollisionFlag.FLOOR_BLOCKED;

    static BLOCK_NORTH: number = CollisionFlag.WALL_SOUTH |
        CollisionFlag.LOC |
        CollisionFlag.FLOOR_BLOCKED;

    static BLOCK_SOUTH_WEST: number = CollisionFlag.WALL_NORTH |
        CollisionFlag.WALL_NORTH_EAST |
        CollisionFlag.WALL_EAST |
        CollisionFlag.LOC |
        CollisionFlag.FLOOR_BLOCKED;

    static BLOCK_SOUTH_EAST: number = CollisionFlag.WALL_NORTH_WEST |
        CollisionFlag.WALL_NORTH |
        CollisionFlag.WALL_WEST |
        CollisionFlag.LOC |
        CollisionFlag.FLOOR_BLOCKED;

    static BLOCK_NORTH_WEST: number = CollisionFlag.WALL_EAST |
        CollisionFlag.WALL_SOUTH_EAST |
        CollisionFlag.WALL_SOUTH |
        CollisionFlag.LOC |
        CollisionFlag.FLOOR_BLOCKED;

    static BLOCK_NORTH_EAST: number = CollisionFlag.WALL_SOUTH |
        CollisionFlag.WALL_SOUTH_WEST |
        CollisionFlag.WALL_WEST |
        CollisionFlag.LOC |
        CollisionFlag.FLOOR_BLOCKED;

    static BLOCK_NORTH_AND_SOUTH_EAST: number = CollisionFlag.WALL_NORTH |
        CollisionFlag.WALL_NORTH_EAST |
        CollisionFlag.WALL_EAST |
        CollisionFlag.WALL_SOUTH_EAST |
        CollisionFlag.WALL_SOUTH |
        CollisionFlag.LOC |
        CollisionFlag.FLOOR_BLOCKED;

    static BLOCK_NORTH_AND_SOUTH_WEST: number = CollisionFlag.WALL_NORTH_WEST |
        CollisionFlag.WALL_NORTH |
        CollisionFlag.WALL_SOUTH |
        CollisionFlag.WALL_SOUTH_WEST |
        CollisionFlag.WALL_WEST |
        CollisionFlag.LOC |
        CollisionFlag.FLOOR_BLOCKED;

    static BLOCK_NORTH_EAST_AND_WEST: number = CollisionFlag.WALL_NORTH_WEST |
        CollisionFlag.WALL_NORTH |
        CollisionFlag.WALL_NORTH_EAST |
        CollisionFlag.WALL_EAST |
        CollisionFlag.WALL_WEST |
        CollisionFlag.LOC |
        CollisionFlag.FLOOR_BLOCKED;

    static BLOCK_SOUTH_EAST_AND_WEST: number = CollisionFlag.WALL_EAST |
        CollisionFlag.WALL_SOUTH_EAST |
        CollisionFlag.WALL_SOUTH |
        CollisionFlag.WALL_SOUTH_WEST |
        CollisionFlag.WALL_WEST |
        CollisionFlag.LOC |
        CollisionFlag.FLOOR_BLOCKED;
};
