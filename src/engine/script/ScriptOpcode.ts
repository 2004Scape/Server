export const enum ScriptOpcode {
    // Core language ops (0-99)
    PUSH_CONSTANT_INT = 0, // official, see cs2
    PUSH_VARP, // official, see cs2
    POP_VARP, // official, see cs2
    PUSH_CONSTANT_STRING, // official, see cs2
    PUSH_VARN,
    POP_VARN,
    BRANCH, // official, see cs2
    BRANCH_NOT, // official, see cs2
    BRANCH_EQUALS, // official, see cs2
    BRANCH_LESS_THAN, // official, see cs2
    BRANCH_GREATER_THAN, // official, see cs2
    PUSH_VARS,
    POP_VARS,
    RETURN = 21, // official, see cs2
    GOSUB,
    JUMP,
    SWITCH,
    // 25 = push_varbit
    // 27 = pop_varbit
    BRANCH_LESS_THAN_OR_EQUALS = 31, // official, see cs2
    BRANCH_GREATER_THAN_OR_EQUALS, // official, see cs2
    PUSH_INT_LOCAL, // official, see cs2
    POP_INT_LOCAL, // official, see cs2
    PUSH_STRING_LOCAL, // official, see cs2
    POP_STRING_LOCAL, // official, see cs2
    JOIN_STRING, // official, see cs2
    POP_INT_DISCARD, // official, see cs2
    POP_STRING_DISCARD, // official, see cs2
    GOSUB_WITH_PARAMS, // official, see cs2
    JUMP_WITH_PARAMS, // official, see cs2
    // 42 = push_varc_int
    // 43 = pop_varc_int
    DEFINE_ARRAY = 44, // official, see cs2
    PUSH_ARRAY_INT, // official, see cs2
    POP_ARRAY_INT, // official, see cs2

    // Server ops (1000-1999)
    COORDX = 1000, // official, see cs2
    COORDY, // official, see cs2
    COORDZ, // official, see cs2
    DISTANCE,
    HUNTALL,
    HUNTNEXT, // official
    INZONE, // official
    LINEOFSIGHT,
    LINEOFWALK,
    MAP_BLOCKED, // official
    MAP_INDOORS,
    MAP_CLOCK, // official
    MAP_LOCADDUNSAFE, // official
    MAP_MEMBERS, // official
    MAP_PLAYERCOUNT, // official, see giant dwarf cutscene
    MAP_FINDSQUARE, // official
    MOVECOORD, // official
    PLAYERCOUNT,
    PROJANIM_MAP,
    PROJANIM_NPC, // todo: take active_npc
    PROJANIM_PL, // todo: take active_player
    SEQLENGTH, // official
    SPLIT_GET,
    SPLIT_GETANIM,
    SPLIT_INIT, // official
    SPLIT_LINECOUNT,
    SPLIT_PAGECOUNT, // official
    SPOTANIM_MAP,
    STAT_RANDOM,
    STRUCT_PARAM,
    WORLD_DELAY, // official
    NPCCOUNT,
    ZONECOUNT,
    LOCCOUNT,
    OBJCOUNT,
    MAP_MULTIWAY, // official

    // Player ops (2000-2499)
    ALLOWDESIGN = 2000,
    ANIM, // official, newspost
    BAS_READYANIM,
    BAS_RUNNING,
    BAS_TURNONSPOT,
    BAS_WALK_B,
    BAS_WALK_F,
    BAS_WALK_L,
    BAS_WALK_R,
    BUFFER_FULL, // official
    BUILDAPPEARANCE, // official
    BUSY, // official
    CAM_LOOKAT, // official
    CAM_MOVETO, // official
    CAM_RESET, // official
    CAM_SHAKE, // official, see server packets
    CLEARQUEUE, // official
    CLEARSOFTTIMER,
    CLEARTIMER,
    GETTIMER,
    COORD, // official
    DAMAGE,
    DISPLAYNAME, // official, joke reply
    FACESQUARE, // official
    FINDUID, // official
    GENDER,
    GETQUEUE, // official
    STAT_ADVANCE,
    HEADICONS_GET,
    HEADICONS_SET,
    HEALENERGY, // official
    HINT_COORD,
    HINT_NPC, // todo: take active_npc
    HINT_PLAYER, // todo: take active_player
    HINT_STOP,
    IF_CLOSE, // official
    TUT_CLOSE,
    IF_MULTIZONE, // moved to engine, remove this
    IF_OPENCHAT,
    TUT_OPEN,
    IF_OPENMAIN,
    // IF_OPENOVERLAY comes later
    IF_OPENMAIN_SIDE,
    IF_OPENSIDE,
    IF_SETANIM, // official
    IF_SETCOLOUR, // official
    IF_SETHIDE, // official
    IF_SETMODEL, // official
    IF_SETRECOL,
    IF_SETNPCHEAD, // official
    IF_SETOBJECT, // official
    IF_SETPLAYERHEAD, // official
    IF_SETPOSITION, // official
    IF_SETRESUMEBUTTONS,
    IF_SETTAB,
    IF_SETTABACTIVE,
    TUT_FLASH,
    IF_SETTEXT, // official
    LAST_LOGIN_INFO,
    LAST_COM,
    LAST_INT, // official
    LAST_ITEM,
    LAST_SLOT, // official
    LAST_TARGETSLOT,
    LAST_USEITEM, // official
    LAST_USESLOT, // official
    LONGQUEUE, // official
    MES, // official
    MIDI_JINGLE, // official, see cs2
    MIDI_SONG, // official, see cs2
    NAME, // official, joke reply
    P_APRANGE, // official
    P_ARRIVEDELAY, // official
    P_COUNTDIALOG, // official
    P_DELAY, // official
    P_EXACTMOVE, // official
    P_FINDUID, // official
    P_LOCMERGE, // official
    P_LOGOUT,
    P_PREVENTLOGOUT,
    P_OPHELD, // official
    P_OPLOC, // official
    P_OPNPC, // official
    P_OPNPCT, // official
    P_OPOBJ,
    P_OPPLAYER,
    P_OPPLAYERT, // official
    P_PAUSEBUTTON, // official
    P_STOPACTION, // official
    P_TELEJUMP, // official
    P_TELEPORT,
    P_WALK, // official
    PLAYER_FINDALLZONE, // todo: replace with huntall
    PLAYER_FINDNEXT, // todo: replace with huntnext
    QUEUE, // official
    SAY, // official
    WALKTRIGGER, // official
    SETTIMER,
    SOFTTIMER, // official
    SOUND_SYNTH, // official, newspost
    SPOTANIM_PL,
    STAFFMODLEVEL, // official
    STAT, // official
    STAT_ADD,
    STAT_BASE, // official
    STAT_HEAL, // official
    STAT_SUB,
    STAT_BOOST, // official
    STAT_DRAIN,
    STRONGQUEUE,
    UID, // official
    WEAKQUEUE, // official
    IF_OPENMAINOVERLAY,
    AFK_EVENT,
    LOWMEMORY,
    SETIDKIT,
    P_CLEARPENDINGACTION, // official
    GETWALKTRIGGER, // official
    BUSY2, // official
    FINDHERO, // official
    BOTH_HEROPOINTS, // official
    SETGENDER,
    SETSKINCOLOUR,
    P_ANIMPROTECT,
    RUNENERGY,
    WEIGHT,
    LAST_COORD,
    SESSION_LOG, // custom
    WEALTH_LOG, // custom
    P_RUN, // todo: real command name?

    // Npc ops (2500-2999)
    NPC_ADD = 2500, // official
    NPC_ANIM, // official, newspost
    NPC_BASESTAT, // official
    NPC_CATEGORY, // official
    NPC_CHANGETYPE,
    NPC_CHANGETYPE_KEEPALL,
    NPC_COORD, // official
    NPC_DAMAGE,
    NPC_DEL, // official
    NPC_DELAY, // official
    NPC_FACESQUARE, // official
    NPC_FIND, // official
    NPC_FINDALLANY, // official
    NPC_FINDALL,
    NPC_FINDEXACT, // official
    NPC_FINDHERO, // official
    NPC_FINDALLZONE,
    NPC_FINDNEXT,
    NPC_FINDUID,
    NPC_GETMODE,
    NPC_HEROPOINTS, // official
    NPC_NAME,
    NPC_PARAM, // official
    NPC_QUEUE, // official
    NPC_RANGE, // official
    NPC_SAY, // official
    NPC_HUNT,
    NPC_HUNTALL, // official
    NPC_HUNTNEXT,
    NPC_SETHUNT, // official
    NPC_SETHUNTMODE, // official
    NPC_SETMODE, // official
    NPC_WALKTRIGGER, // official
    NPC_SETTIMER,
    NPC_STAT,
    NPC_STATADD,
    NPC_STATHEAL, // official
    NPC_STATSUB,
    NPC_TELE,
    NPC_TYPE, // official
    NPC_UID,
    SPOTANIM_NPC,
    NPC_WALK,
    NPC_ATTACKRANGE, // official
    NPC_HASOP, // official
    NPC_ARRIVEDELAY,

    // Loc ops (3000-3499)
    LOC_ADD = 3000, // official
    LOC_ANGLE, // official
    LOC_ANIM, // official
    LOC_CATEGORY, // official
    LOC_CHANGE,
    LOC_COORD, // official
    LOC_DEL, // official
    LOC_FIND, // official
    LOC_FINDALLZONE, // official
    LOC_FINDNEXT, // official
    LOC_NAME,
    LOC_PARAM, // official
    LOC_SHAPE,
    LOC_TYPE, // official

    // Obj ops (3500-4000)
    OBJ_ADD = 3500, // official
    OBJ_ADDALL,
    OBJ_COORD,
    OBJ_COUNT,
    OBJ_DEL,
    OBJ_NAME,
    OBJ_PARAM,
    OBJ_TAKEITEM,
    OBJ_TYPE,
    OBJ_FIND,
    OBJ_FINDALLZONE,
    OBJ_FINDNEXT,

    // Npc config ops (4000-4099)
    NC_CATEGORY = 4000,
    NC_DEBUGNAME,
    NC_DESC,
    NC_NAME,
    NC_OP,
    NC_PARAM,

    // Loc config ops (4100-4199)
    LC_CATEGORY = 4100,
    LC_DEBUGNAME,
    LC_DESC,
    LC_NAME,
    LC_OP,
    LC_PARAM,
    LC_WIDTH,
    LC_LENGTH,

    // Obj config ops (4200-4299)
    OC_CATEGORY = 4200, // official
    OC_CERT, // official, see cs2
    OC_COST, // official, see cs2
    OC_DEBUGNAME,
    OC_DESC, // official
    OC_IOP, // official, see cs2
    OC_MEMBERS, // official
    OC_NAME, // official
    OC_OP, // official, see cs2
    OC_PARAM, // official
    OC_STACKABLE, // official, see cs2
    OC_TRADEABLE,
    OC_UNCERT, // official, see cs2
    OC_WEARPOS2,
    OC_WEARPOS3,
    OC_WEARPOS,
    OC_WEIGHT,

    // Inventory ops (4300-4399)
    INV_ALLSTOCK = 4300,
    INV_SIZE, // official
    INV_STOCKBASE,
    INV_ADD, // official
    INV_CHANGESLOT, // official
    INV_CLEAR,
    INV_DEL, // official
    INV_DELSLOT,
    INV_DROPITEM,
    INV_DROPSLOT,
    INV_FREESPACE,
    INV_GETNUM,
    INV_GETOBJ, // official
    INV_ITEMSPACE,
    INV_ITEMSPACE2, // official
    INV_MOVEFROMSLOT,
    INV_MOVETOSLOT, // official
    BOTH_MOVEINV, // official
    INV_MOVEITEM, // official
    INV_MOVEITEM_CERT, // official
    INV_MOVEITEM_UNCERT, // official
    INV_SETSLOT, // official
    INV_TOTAL, // official
    INV_TOTALCAT,
    INV_TRANSMIT,
    INVOTHER_TRANSMIT,
    INV_STOPTRANSMIT,
    BOTH_DROPSLOT,
    INV_DROPALL,
    INV_TOTALPARAM, // official, see cs2
    INV_TOTALPARAM_STACK, // official, see cs2
    INV_DEBUGNAME,

    // Enum ops (4400-4499)
    ENUM = 4400, // official
    ENUM_GETOUTPUTCOUNT, // official

    // String ops (4500-4599)
    APPEND_NUM = 4500, // official, see cs2
    APPEND, // official, see cs2
    APPEND_SIGNNUM, // official, see cs2
    LOWERCASE, // official, see cs2
    // FROMDATE, // official, see cs2
    TEXT_GENDER, // official, see cs2
    TOSTRING, // official, see cs2
    COMPARE, // official, see cs2
    // PARAHEIGHT, // official, see cs2
    // PARAWIDTH, // official, see cs2
    TEXT_SWITCH, // official, see cs2
    // ESCAPE, // official, see cs2
    APPEND_CHAR, // official, see cs2
    // CHAR_ISPRINTABLE, // official, see cs2
    // CHAR_ISALPHANUMERIC, // official, see cs2
    // CHAR_ISALPHA, // official, see cs2
    // CHAR_ISNUMERIC, // official, see cs2
    STRING_LENGTH, // official, see cs2
    SUBSTRING, // official, see cs2
    // REMOVETAGS, // official, see cs2
    STRING_INDEXOF_CHAR, // official, see cs2
    STRING_INDEXOF_STRING, // official, see cs2
    // CHAR_TOLOWERCASE, // official, see cs2
    // CHAR_TOUPPERCASE, // official, see cs2
    // TOSTRING_LOCALISED, // official, see cs2
    // STRINGWIDTH, // official, see cs2

    // Number ops (4600-4699)
    ADD = 4600, // official, see cs2
    SUB, // official, see cs2
    MULTIPLY, // official, see cs2
    DIVIDE, // official, see cs2
    RANDOM, // official, see cs2
    RANDOMINC, // official, see cs2
    INTERPOLATE, // official, see cs2
    ADDPERCENT, // official, see cs2
    SETBIT, // official, see cs2
    CLEARBIT, // official, see cs2
    TESTBIT, // official, see cs2
    MODULO, // official, see cs2
    POW, // official, see cs2
    INVPOW, // official, see cs2
    AND, // official, see cs2
    OR, // official, see cs2
    MIN, // official, see cs2
    MAX, // official, see cs2
    SCALE, // official, see cs2
    BITCOUNT, // custom
    TOGGLEBIT, // custom
    SETBIT_RANGE, // custom
    CLEARBIT_RANGE, // custom
    GETBIT_RANGE, // custom
    SETBIT_RANGE_TOINT, // custom
    SIN_DEG, // custom
    COS_DEG, // custom
    ATAN2_DEG, // custom
    ABS, // custom

    // DB ops (7500-7599)
    DB_FIND_WITH_COUNT = 7500,
    DB_FINDNEXT,
    DB_GETFIELD,
    DB_GETFIELDCOUNT,
    DB_LISTALL_WITH_COUNT,
    DB_GETROWTABLE,
    DB_FINDBYINDEX,
    DB_FIND_REFINE_WITH_COUNT,
    DB_FIND,
    DB_FIND_REFINE,
    DB_LISTALL,

    // Debug ops (10000-11000)
    ERROR = 10000,
    MAP_PRODUCTION,
    MAP_LASTCLOCK,
    MAP_LASTWORLD,
    MAP_LASTCLIENTIN,
    MAP_LASTNPC,
    MAP_LASTPLAYER,
    MAP_LASTLOGOUT,
    MAP_LASTLOGIN,
    MAP_LASTZONE,
    MAP_LASTCLIENTOUT,
    MAP_LASTCLEANUP,
    MAP_LASTBANDWIDTHIN,
    MAP_LASTBANDWIDTHOUT,
    TIMESPENT, // custom: used to profile script execution (record start time)
    GETTIMESPENT, // custom: used to profile script execution (current duration)
    CONSOLE
}

export const ScriptOpcodeMap: Map<string, number> = new Map([
    ['PUSH_CONSTANT_INT', ScriptOpcode.PUSH_CONSTANT_INT],
    ['PUSH_VARP', ScriptOpcode.PUSH_VARP],
    ['POP_VARP', ScriptOpcode.POP_VARP],
    ['PUSH_CONSTANT_STRING', ScriptOpcode.PUSH_CONSTANT_STRING],
    ['PUSH_VARN', ScriptOpcode.PUSH_VARN],
    ['POP_VARN', ScriptOpcode.POP_VARN],
    ['BRANCH', ScriptOpcode.BRANCH],
    ['BRANCH_NOT', ScriptOpcode.BRANCH_NOT],
    ['BRANCH_EQUALS', ScriptOpcode.BRANCH_EQUALS],
    ['BRANCH_LESS_THAN', ScriptOpcode.BRANCH_LESS_THAN],
    ['BRANCH_GREATER_THAN', ScriptOpcode.BRANCH_GREATER_THAN],
    ['PUSH_VARS', ScriptOpcode.PUSH_VARS],
    ['POP_VARS', ScriptOpcode.POP_VARS],
    ['RETURN', ScriptOpcode.RETURN],
    ['GOSUB', ScriptOpcode.GOSUB],
    ['JUMP', ScriptOpcode.JUMP],
    ['SWITCH', ScriptOpcode.SWITCH],
    ['BRANCH_LESS_THAN_OR_EQUALS', ScriptOpcode.BRANCH_LESS_THAN_OR_EQUALS],
    ['BRANCH_GREATER_THAN_OR_EQUALS', ScriptOpcode.BRANCH_GREATER_THAN_OR_EQUALS],
    ['PUSH_INT_LOCAL', ScriptOpcode.PUSH_INT_LOCAL],
    ['POP_INT_LOCAL', ScriptOpcode.POP_INT_LOCAL],
    ['PUSH_STRING_LOCAL', ScriptOpcode.PUSH_STRING_LOCAL],
    ['POP_STRING_LOCAL', ScriptOpcode.POP_STRING_LOCAL],
    ['JOIN_STRING', ScriptOpcode.JOIN_STRING],
    ['POP_INT_DISCARD', ScriptOpcode.POP_INT_DISCARD],
    ['POP_STRING_DISCARD', ScriptOpcode.POP_STRING_DISCARD],
    ['GOSUB_WITH_PARAMS', ScriptOpcode.GOSUB_WITH_PARAMS],
    ['JUMP_WITH_PARAMS', ScriptOpcode.JUMP_WITH_PARAMS],
    ['DEFINE_ARRAY', ScriptOpcode.DEFINE_ARRAY],
    ['PUSH_ARRAY_INT', ScriptOpcode.PUSH_ARRAY_INT],
    ['POP_ARRAY_INT', ScriptOpcode.POP_ARRAY_INT],
    ['COORDX', ScriptOpcode.COORDX],
    ['COORDY', ScriptOpcode.COORDY],
    ['COORDZ', ScriptOpcode.COORDZ],
    ['DISTANCE', ScriptOpcode.DISTANCE],
    ['HUNTALL', ScriptOpcode.HUNTALL],
    ['HUNTNEXT', ScriptOpcode.HUNTNEXT],
    ['INZONE', ScriptOpcode.INZONE],
    ['LINEOFSIGHT', ScriptOpcode.LINEOFSIGHT],
    ['LINEOFWALK', ScriptOpcode.LINEOFWALK],
    ['MAP_BLOCKED', ScriptOpcode.MAP_BLOCKED],
    ['MAP_INDOORS', ScriptOpcode.MAP_INDOORS],
    ['MAP_CLOCK', ScriptOpcode.MAP_CLOCK],
    ['MAP_LOCADDUNSAFE', ScriptOpcode.MAP_LOCADDUNSAFE],
    ['MAP_MEMBERS', ScriptOpcode.MAP_MEMBERS],
    ['MAP_PLAYERCOUNT', ScriptOpcode.MAP_PLAYERCOUNT],
    ['MAP_FINDSQUARE', ScriptOpcode.MAP_FINDSQUARE],
    ['MOVECOORD', ScriptOpcode.MOVECOORD],
    ['PLAYERCOUNT', ScriptOpcode.PLAYERCOUNT],
    ['PROJANIM_MAP', ScriptOpcode.PROJANIM_MAP],
    ['PROJANIM_NPC', ScriptOpcode.PROJANIM_NPC],
    ['PROJANIM_PL', ScriptOpcode.PROJANIM_PL],
    ['SEQLENGTH', ScriptOpcode.SEQLENGTH],
    ['SPLIT_GET', ScriptOpcode.SPLIT_GET],
    ['SPLIT_GETANIM', ScriptOpcode.SPLIT_GETANIM],
    ['SPLIT_INIT', ScriptOpcode.SPLIT_INIT],
    ['SPLIT_LINECOUNT', ScriptOpcode.SPLIT_LINECOUNT],
    ['SPLIT_PAGECOUNT', ScriptOpcode.SPLIT_PAGECOUNT],
    ['SPOTANIM_MAP', ScriptOpcode.SPOTANIM_MAP],
    ['STAT_RANDOM', ScriptOpcode.STAT_RANDOM],
    ['STRUCT_PARAM', ScriptOpcode.STRUCT_PARAM],
    ['WORLD_DELAY', ScriptOpcode.WORLD_DELAY],
    ['NPCCOUNT', ScriptOpcode.NPCCOUNT],
    ['ZONECOUNT', ScriptOpcode.ZONECOUNT],
    ['LOCCOUNT', ScriptOpcode.LOCCOUNT],
    ['OBJCOUNT', ScriptOpcode.OBJCOUNT],
    ['MAP_MULTIWAY', ScriptOpcode.MAP_MULTIWAY],
    ['ALLOWDESIGN', ScriptOpcode.ALLOWDESIGN],
    ['ANIM', ScriptOpcode.ANIM],
    ['BAS_READYANIM', ScriptOpcode.BAS_READYANIM],
    ['BAS_RUNNING', ScriptOpcode.BAS_RUNNING],
    ['BAS_TURNONSPOT', ScriptOpcode.BAS_TURNONSPOT],
    ['BAS_WALK_B', ScriptOpcode.BAS_WALK_B],
    ['BAS_WALK_F', ScriptOpcode.BAS_WALK_F],
    ['BAS_WALK_L', ScriptOpcode.BAS_WALK_L],
    ['BAS_WALK_R', ScriptOpcode.BAS_WALK_R],
    ['BUFFER_FULL', ScriptOpcode.BUFFER_FULL],
    ['BUILDAPPEARANCE', ScriptOpcode.BUILDAPPEARANCE],
    ['BUSY', ScriptOpcode.BUSY],
    ['CAM_LOOKAT', ScriptOpcode.CAM_LOOKAT],
    ['CAM_MOVETO', ScriptOpcode.CAM_MOVETO],
    ['CAM_RESET', ScriptOpcode.CAM_RESET],
    ['CAM_SHAKE', ScriptOpcode.CAM_SHAKE],
    ['CLEARQUEUE', ScriptOpcode.CLEARQUEUE],
    ['CLEARSOFTTIMER', ScriptOpcode.CLEARSOFTTIMER],
    ['CLEARTIMER', ScriptOpcode.CLEARTIMER],
    ['GETTIMER', ScriptOpcode.GETTIMER],
    ['COORD', ScriptOpcode.COORD],
    ['DAMAGE', ScriptOpcode.DAMAGE],
    ['DISPLAYNAME', ScriptOpcode.DISPLAYNAME],
    ['FACESQUARE', ScriptOpcode.FACESQUARE],
    ['FINDUID', ScriptOpcode.FINDUID],
    ['GENDER', ScriptOpcode.GENDER],
    ['GETQUEUE', ScriptOpcode.GETQUEUE],
    ['STAT_ADVANCE', ScriptOpcode.STAT_ADVANCE],
    ['HEADICONS_GET', ScriptOpcode.HEADICONS_GET],
    ['HEADICONS_SET', ScriptOpcode.HEADICONS_SET],
    ['HEALENERGY', ScriptOpcode.HEALENERGY],
    ['HINT_COORD', ScriptOpcode.HINT_COORD],
    ['HINT_NPC', ScriptOpcode.HINT_NPC],
    ['HINT_PLAYER', ScriptOpcode.HINT_PLAYER],
    ['HINT_STOP', ScriptOpcode.HINT_STOP],
    ['IF_CLOSE', ScriptOpcode.IF_CLOSE],
    ['TUT_CLOSE', ScriptOpcode.TUT_CLOSE],
    ['IF_MULTIZONE', ScriptOpcode.IF_MULTIZONE],
    ['IF_OPENCHAT', ScriptOpcode.IF_OPENCHAT],
    ['TUT_OPEN', ScriptOpcode.TUT_OPEN],
    ['IF_OPENMAIN', ScriptOpcode.IF_OPENMAIN],
    ['IF_OPENMAIN_SIDE', ScriptOpcode.IF_OPENMAIN_SIDE],
    ['IF_OPENSIDE', ScriptOpcode.IF_OPENSIDE],
    ['IF_SETANIM', ScriptOpcode.IF_SETANIM],
    ['IF_SETCOLOUR', ScriptOpcode.IF_SETCOLOUR],
    ['IF_SETHIDE', ScriptOpcode.IF_SETHIDE],
    ['IF_SETMODEL', ScriptOpcode.IF_SETMODEL],
    ['IF_SETRECOL', ScriptOpcode.IF_SETRECOL],
    ['IF_SETNPCHEAD', ScriptOpcode.IF_SETNPCHEAD],
    ['IF_SETOBJECT', ScriptOpcode.IF_SETOBJECT],
    ['IF_SETPLAYERHEAD', ScriptOpcode.IF_SETPLAYERHEAD],
    ['IF_SETPOSITION', ScriptOpcode.IF_SETPOSITION],
    ['IF_SETRESUMEBUTTONS', ScriptOpcode.IF_SETRESUMEBUTTONS],
    ['IF_SETTAB', ScriptOpcode.IF_SETTAB],
    ['IF_SETTABACTIVE', ScriptOpcode.IF_SETTABACTIVE],
    ['TUT_FLASH', ScriptOpcode.TUT_FLASH],
    ['IF_SETTEXT', ScriptOpcode.IF_SETTEXT],
    ['LAST_LOGIN_INFO', ScriptOpcode.LAST_LOGIN_INFO],
    ['LAST_COM', ScriptOpcode.LAST_COM],
    ['LAST_INT', ScriptOpcode.LAST_INT],
    ['LAST_ITEM', ScriptOpcode.LAST_ITEM],
    ['LAST_SLOT', ScriptOpcode.LAST_SLOT],
    ['LAST_TARGETSLOT', ScriptOpcode.LAST_TARGETSLOT],
    ['LAST_USEITEM', ScriptOpcode.LAST_USEITEM],
    ['LAST_USESLOT', ScriptOpcode.LAST_USESLOT],
    ['LONGQUEUE', ScriptOpcode.LONGQUEUE],
    ['MES', ScriptOpcode.MES],
    ['MIDI_JINGLE', ScriptOpcode.MIDI_JINGLE],
    ['MIDI_SONG', ScriptOpcode.MIDI_SONG],
    ['NAME', ScriptOpcode.NAME],
    ['P_APRANGE', ScriptOpcode.P_APRANGE],
    ['P_ARRIVEDELAY', ScriptOpcode.P_ARRIVEDELAY],
    ['P_COUNTDIALOG', ScriptOpcode.P_COUNTDIALOG],
    ['P_DELAY', ScriptOpcode.P_DELAY],
    ['P_EXACTMOVE', ScriptOpcode.P_EXACTMOVE],
    ['P_FINDUID', ScriptOpcode.P_FINDUID],
    ['P_LOCMERGE', ScriptOpcode.P_LOCMERGE],
    ['P_LOGOUT', ScriptOpcode.P_LOGOUT],
    ['P_PREVENTLOGOUT', ScriptOpcode.P_PREVENTLOGOUT],
    ['P_OPHELD', ScriptOpcode.P_OPHELD],
    ['P_OPLOC', ScriptOpcode.P_OPLOC],
    ['P_OPNPC', ScriptOpcode.P_OPNPC],
    ['P_OPNPCT', ScriptOpcode.P_OPNPCT],
    ['P_OPOBJ', ScriptOpcode.P_OPOBJ],
    ['P_OPPLAYER', ScriptOpcode.P_OPPLAYER],
    ['P_OPPLAYERT', ScriptOpcode.P_OPPLAYERT],
    ['P_PAUSEBUTTON', ScriptOpcode.P_PAUSEBUTTON],
    ['P_STOPACTION', ScriptOpcode.P_STOPACTION],
    ['P_TELEJUMP', ScriptOpcode.P_TELEJUMP],
    ['P_TELEPORT', ScriptOpcode.P_TELEPORT],
    ['P_WALK', ScriptOpcode.P_WALK],
    ['PLAYER_FINDALLZONE', ScriptOpcode.PLAYER_FINDALLZONE],
    ['PLAYER_FINDNEXT', ScriptOpcode.PLAYER_FINDNEXT],
    ['QUEUE', ScriptOpcode.QUEUE],
    ['SAY', ScriptOpcode.SAY],
    ['WALKTRIGGER', ScriptOpcode.WALKTRIGGER],
    ['SETTIMER', ScriptOpcode.SETTIMER],
    ['SOFTTIMER', ScriptOpcode.SOFTTIMER],
    ['SOUND_SYNTH', ScriptOpcode.SOUND_SYNTH],
    ['SPOTANIM_PL', ScriptOpcode.SPOTANIM_PL],
    ['STAFFMODLEVEL', ScriptOpcode.STAFFMODLEVEL],
    ['STAT', ScriptOpcode.STAT],
    ['STAT_ADD', ScriptOpcode.STAT_ADD],
    ['STAT_BASE', ScriptOpcode.STAT_BASE],
    ['STAT_HEAL', ScriptOpcode.STAT_HEAL],
    ['STAT_SUB', ScriptOpcode.STAT_SUB],
    ['STAT_BOOST', ScriptOpcode.STAT_BOOST],
    ['STAT_DRAIN', ScriptOpcode.STAT_DRAIN],
    ['STRONGQUEUE', ScriptOpcode.STRONGQUEUE],
    ['UID', ScriptOpcode.UID],
    ['WEAKQUEUE', ScriptOpcode.WEAKQUEUE],
    ['IF_OPENMAINOVERLAY', ScriptOpcode.IF_OPENMAINOVERLAY],
    ['AFK_EVENT', ScriptOpcode.AFK_EVENT],
    ['LOWMEMORY', ScriptOpcode.LOWMEMORY],
    ['SETIDKIT', ScriptOpcode.SETIDKIT],
    ['P_CLEARPENDINGACTION', ScriptOpcode.P_CLEARPENDINGACTION],
    ['GETWALKTRIGGER', ScriptOpcode.GETWALKTRIGGER],
    ['BUSY2', ScriptOpcode.BUSY2],
    ['FINDHERO', ScriptOpcode.FINDHERO],
    ['BOTH_HEROPOINTS', ScriptOpcode.BOTH_HEROPOINTS],
    ['SETGENDER', ScriptOpcode.SETGENDER],
    ['SETSKINCOLOUR', ScriptOpcode.SETSKINCOLOUR],
    ['P_ANIMPROTECT', ScriptOpcode.P_ANIMPROTECT],
    ['RUNENERGY', ScriptOpcode.RUNENERGY],
    ['WEIGHT', ScriptOpcode.WEIGHT],
    ['LAST_COORD', ScriptOpcode.LAST_COORD],
    ['SESSION_LOG', ScriptOpcode.SESSION_LOG],
    ['WEALTH_LOG', ScriptOpcode.WEALTH_LOG],
    ['P_RUN', ScriptOpcode.P_RUN],
    ['NPC_ADD', ScriptOpcode.NPC_ADD],
    ['NPC_ANIM', ScriptOpcode.NPC_ANIM],
    ['NPC_BASESTAT', ScriptOpcode.NPC_BASESTAT],
    ['NPC_CATEGORY', ScriptOpcode.NPC_CATEGORY],
    ['NPC_CHANGETYPE', ScriptOpcode.NPC_CHANGETYPE],
    ['NPC_CHANGETYPE_KEEPALL', ScriptOpcode.NPC_CHANGETYPE_KEEPALL],
    ['NPC_COORD', ScriptOpcode.NPC_COORD],
    ['NPC_DAMAGE', ScriptOpcode.NPC_DAMAGE],
    ['NPC_DEL', ScriptOpcode.NPC_DEL],
    ['NPC_DELAY', ScriptOpcode.NPC_DELAY],
    ['NPC_FACESQUARE', ScriptOpcode.NPC_FACESQUARE],
    ['NPC_FIND', ScriptOpcode.NPC_FIND],
    ['NPC_FINDALLANY', ScriptOpcode.NPC_FINDALLANY],
    ['NPC_FINDALL', ScriptOpcode.NPC_FINDALL],
    ['NPC_FINDEXACT', ScriptOpcode.NPC_FINDEXACT],
    ['NPC_FINDHERO', ScriptOpcode.NPC_FINDHERO],
    ['NPC_FINDALLZONE', ScriptOpcode.NPC_FINDALLZONE],
    ['NPC_FINDNEXT', ScriptOpcode.NPC_FINDNEXT],
    ['NPC_FINDUID', ScriptOpcode.NPC_FINDUID],
    ['NPC_GETMODE', ScriptOpcode.NPC_GETMODE],
    ['NPC_HEROPOINTS', ScriptOpcode.NPC_HEROPOINTS],
    ['NPC_NAME', ScriptOpcode.NPC_NAME],
    ['NPC_PARAM', ScriptOpcode.NPC_PARAM],
    ['NPC_QUEUE', ScriptOpcode.NPC_QUEUE],
    ['NPC_RANGE', ScriptOpcode.NPC_RANGE],
    ['NPC_SAY', ScriptOpcode.NPC_SAY],
    ['NPC_HUNT', ScriptOpcode.NPC_HUNT],
    ['NPC_HUNTALL', ScriptOpcode.NPC_HUNTALL],
    ['NPC_HUNTNEXT', ScriptOpcode.NPC_HUNTNEXT],
    ['NPC_SETHUNT', ScriptOpcode.NPC_SETHUNT],
    ['NPC_SETHUNTMODE', ScriptOpcode.NPC_SETHUNTMODE],
    ['NPC_SETMODE', ScriptOpcode.NPC_SETMODE],
    ['NPC_WALKTRIGGER', ScriptOpcode.NPC_WALKTRIGGER],
    ['NPC_SETTIMER', ScriptOpcode.NPC_SETTIMER],
    ['NPC_STAT', ScriptOpcode.NPC_STAT],
    ['NPC_STATADD', ScriptOpcode.NPC_STATADD],
    ['NPC_STATHEAL', ScriptOpcode.NPC_STATHEAL],
    ['NPC_STATSUB', ScriptOpcode.NPC_STATSUB],
    ['NPC_TELE', ScriptOpcode.NPC_TELE],
    ['NPC_TYPE', ScriptOpcode.NPC_TYPE],
    ['NPC_UID', ScriptOpcode.NPC_UID],
    ['SPOTANIM_NPC', ScriptOpcode.SPOTANIM_NPC],
    ['NPC_WALK', ScriptOpcode.NPC_WALK],
    ['NPC_ATTACKRANGE', ScriptOpcode.NPC_ATTACKRANGE],
    ['NPC_HASOP', ScriptOpcode.NPC_HASOP],
    ['NPC_ARRIVEDELAY', ScriptOpcode.NPC_ARRIVEDELAY],
    ['LOC_ADD', ScriptOpcode.LOC_ADD],
    ['LOC_ANGLE', ScriptOpcode.LOC_ANGLE],
    ['LOC_ANIM', ScriptOpcode.LOC_ANIM],
    ['LOC_CATEGORY', ScriptOpcode.LOC_CATEGORY],
    ['LOC_CHANGE', ScriptOpcode.LOC_CHANGE],
    ['LOC_COORD', ScriptOpcode.LOC_COORD],
    ['LOC_DEL', ScriptOpcode.LOC_DEL],
    ['LOC_FIND', ScriptOpcode.LOC_FIND],
    ['LOC_FINDALLZONE', ScriptOpcode.LOC_FINDALLZONE],
    ['LOC_FINDNEXT', ScriptOpcode.LOC_FINDNEXT],
    ['LOC_NAME', ScriptOpcode.LOC_NAME],
    ['LOC_PARAM', ScriptOpcode.LOC_PARAM],
    ['LOC_SHAPE', ScriptOpcode.LOC_SHAPE],
    ['LOC_TYPE', ScriptOpcode.LOC_TYPE],
    ['OBJ_ADD', ScriptOpcode.OBJ_ADD],
    ['OBJ_ADDALL', ScriptOpcode.OBJ_ADDALL],
    ['OBJ_FIND', ScriptOpcode.OBJ_FIND],
    ['OBJ_FINDALLZONE', ScriptOpcode.OBJ_FINDALLZONE],
    ['OBJ_FINDNEXT', ScriptOpcode.OBJ_FINDNEXT],
    ['OBJ_COORD', ScriptOpcode.OBJ_COORD],
    ['OBJ_COUNT', ScriptOpcode.OBJ_COUNT],
    ['OBJ_DEL', ScriptOpcode.OBJ_DEL],
    ['OBJ_NAME', ScriptOpcode.OBJ_NAME],
    ['OBJ_PARAM', ScriptOpcode.OBJ_PARAM],
    ['OBJ_TAKEITEM', ScriptOpcode.OBJ_TAKEITEM],
    ['OBJ_TYPE', ScriptOpcode.OBJ_TYPE],
    ['NC_CATEGORY', ScriptOpcode.NC_CATEGORY],
    ['NC_DEBUGNAME', ScriptOpcode.NC_DEBUGNAME],
    ['NC_DESC', ScriptOpcode.NC_DESC],
    ['NC_NAME', ScriptOpcode.NC_NAME],
    ['NC_OP', ScriptOpcode.NC_OP],
    ['NC_PARAM', ScriptOpcode.NC_PARAM],
    ['LC_CATEGORY', ScriptOpcode.LC_CATEGORY],
    ['LC_DEBUGNAME', ScriptOpcode.LC_DEBUGNAME],
    ['LC_DESC', ScriptOpcode.LC_DESC],
    ['LC_NAME', ScriptOpcode.LC_NAME],
    ['LC_OP', ScriptOpcode.LC_OP],
    ['LC_PARAM', ScriptOpcode.LC_PARAM],
    ['LC_WIDTH', ScriptOpcode.LC_WIDTH],
    ['LC_LENGTH', ScriptOpcode.LC_LENGTH],
    ['OC_CATEGORY', ScriptOpcode.OC_CATEGORY],
    ['OC_CERT', ScriptOpcode.OC_CERT],
    ['OC_COST', ScriptOpcode.OC_COST],
    ['OC_DEBUGNAME', ScriptOpcode.OC_DEBUGNAME],
    ['OC_DESC', ScriptOpcode.OC_DESC],
    ['OC_IOP', ScriptOpcode.OC_IOP],
    ['OC_MEMBERS', ScriptOpcode.OC_MEMBERS],
    ['OC_NAME', ScriptOpcode.OC_NAME],
    ['OC_OP', ScriptOpcode.OC_OP],
    ['OC_PARAM', ScriptOpcode.OC_PARAM],
    ['OC_STACKABLE', ScriptOpcode.OC_STACKABLE],
    ['OC_TRADEABLE', ScriptOpcode.OC_TRADEABLE],
    ['OC_UNCERT', ScriptOpcode.OC_UNCERT],
    ['OC_WEARPOS2', ScriptOpcode.OC_WEARPOS2],
    ['OC_WEARPOS3', ScriptOpcode.OC_WEARPOS3],
    ['OC_WEARPOS', ScriptOpcode.OC_WEARPOS],
    ['OC_WEIGHT', ScriptOpcode.OC_WEIGHT],
    ['INV_ALLSTOCK', ScriptOpcode.INV_ALLSTOCK],
    ['INV_SIZE', ScriptOpcode.INV_SIZE],
    ['INV_STOCKBASE', ScriptOpcode.INV_STOCKBASE],
    ['INV_ADD', ScriptOpcode.INV_ADD],
    ['INV_CHANGESLOT', ScriptOpcode.INV_CHANGESLOT],
    ['INV_CLEAR', ScriptOpcode.INV_CLEAR],
    ['INV_DEL', ScriptOpcode.INV_DEL],
    ['INV_DELSLOT', ScriptOpcode.INV_DELSLOT],
    ['INV_DROPITEM', ScriptOpcode.INV_DROPITEM],
    ['INV_DROPSLOT', ScriptOpcode.INV_DROPSLOT],
    ['INV_FREESPACE', ScriptOpcode.INV_FREESPACE],
    ['INV_GETNUM', ScriptOpcode.INV_GETNUM],
    ['INV_GETOBJ', ScriptOpcode.INV_GETOBJ],
    ['INV_ITEMSPACE', ScriptOpcode.INV_ITEMSPACE],
    ['INV_ITEMSPACE2', ScriptOpcode.INV_ITEMSPACE2],
    ['INV_MOVEFROMSLOT', ScriptOpcode.INV_MOVEFROMSLOT],
    ['INV_MOVETOSLOT', ScriptOpcode.INV_MOVETOSLOT],
    ['BOTH_MOVEINV', ScriptOpcode.BOTH_MOVEINV],
    ['INV_MOVEITEM', ScriptOpcode.INV_MOVEITEM],
    ['INV_MOVEITEM_CERT', ScriptOpcode.INV_MOVEITEM_CERT],
    ['INV_MOVEITEM_UNCERT', ScriptOpcode.INV_MOVEITEM_UNCERT],
    ['INV_SETSLOT', ScriptOpcode.INV_SETSLOT],
    ['INV_TOTAL', ScriptOpcode.INV_TOTAL],
    ['INV_TOTALCAT', ScriptOpcode.INV_TOTALCAT],
    ['INV_TRANSMIT', ScriptOpcode.INV_TRANSMIT],
    ['INVOTHER_TRANSMIT', ScriptOpcode.INVOTHER_TRANSMIT],
    ['INV_STOPTRANSMIT', ScriptOpcode.INV_STOPTRANSMIT],
    ['BOTH_DROPSLOT', ScriptOpcode.BOTH_DROPSLOT],
    ['INV_DROPALL', ScriptOpcode.INV_DROPALL],
    ['INV_TOTALPARAM', ScriptOpcode.INV_TOTALPARAM],
    ['INV_TOTALPARAM_STACK', ScriptOpcode.INV_TOTALPARAM_STACK],
    ['INV_DEBUGNAME', ScriptOpcode.INV_DEBUGNAME],
    ['ENUM', ScriptOpcode.ENUM],
    ['ENUM_GETOUTPUTCOUNT', ScriptOpcode.ENUM_GETOUTPUTCOUNT],
    ['APPEND_NUM', ScriptOpcode.APPEND_NUM],
    ['APPEND', ScriptOpcode.APPEND],
    ['APPEND_SIGNNUM', ScriptOpcode.APPEND_SIGNNUM],
    ['LOWERCASE', ScriptOpcode.LOWERCASE],
    ['TEXT_GENDER', ScriptOpcode.TEXT_GENDER],
    ['TOSTRING', ScriptOpcode.TOSTRING],
    ['COMPARE', ScriptOpcode.COMPARE],
    ['TEXT_SWITCH', ScriptOpcode.TEXT_SWITCH],
    ['APPEND_CHAR', ScriptOpcode.APPEND_CHAR],
    ['STRING_LENGTH', ScriptOpcode.STRING_LENGTH],
    ['SUBSTRING', ScriptOpcode.SUBSTRING],
    ['STRING_INDEXOF_CHAR', ScriptOpcode.STRING_INDEXOF_CHAR],
    ['STRING_INDEXOF_STRING', ScriptOpcode.STRING_INDEXOF_STRING],
    ['ADD', ScriptOpcode.ADD],
    ['SUB', ScriptOpcode.SUB],
    ['MULTIPLY', ScriptOpcode.MULTIPLY],
    ['DIVIDE', ScriptOpcode.DIVIDE],
    ['RANDOM', ScriptOpcode.RANDOM],
    ['RANDOMINC', ScriptOpcode.RANDOMINC],
    ['INTERPOLATE', ScriptOpcode.INTERPOLATE],
    ['ADDPERCENT', ScriptOpcode.ADDPERCENT],
    ['SETBIT', ScriptOpcode.SETBIT],
    ['CLEARBIT', ScriptOpcode.CLEARBIT],
    ['TESTBIT', ScriptOpcode.TESTBIT],
    ['MODULO', ScriptOpcode.MODULO],
    ['POW', ScriptOpcode.POW],
    ['INVPOW', ScriptOpcode.INVPOW],
    ['AND', ScriptOpcode.AND],
    ['OR', ScriptOpcode.OR],
    ['MIN', ScriptOpcode.MIN],
    ['MAX', ScriptOpcode.MAX],
    ['SCALE', ScriptOpcode.SCALE],
    ['BITCOUNT', ScriptOpcode.BITCOUNT],
    ['TOGGLEBIT', ScriptOpcode.TOGGLEBIT],
    ['SETBIT_RANGE', ScriptOpcode.SETBIT_RANGE],
    ['CLEARBIT_RANGE', ScriptOpcode.CLEARBIT_RANGE],
    ['GETBIT_RANGE', ScriptOpcode.GETBIT_RANGE],
    ['SETBIT_RANGE_TOINT', ScriptOpcode.SETBIT_RANGE_TOINT],
    ['SIN_DEG', ScriptOpcode.SIN_DEG],
    ['COS_DEG', ScriptOpcode.COS_DEG],
    ['ATAN2_DEG', ScriptOpcode.ATAN2_DEG],
    ['ABS', ScriptOpcode.ABS],
    ['DB_FIND_WITH_COUNT', ScriptOpcode.DB_FIND_WITH_COUNT],
    ['DB_FINDNEXT', ScriptOpcode.DB_FINDNEXT],
    ['DB_GETFIELD', ScriptOpcode.DB_GETFIELD],
    ['DB_GETFIELDCOUNT', ScriptOpcode.DB_GETFIELDCOUNT],
    ['DB_LISTALL_WITH_COUNT', ScriptOpcode.DB_LISTALL_WITH_COUNT],
    ['DB_GETROWTABLE', ScriptOpcode.DB_GETROWTABLE],
    ['DB_FINDBYINDEX', ScriptOpcode.DB_FINDBYINDEX],
    ['DB_FIND_REFINE_WITH_COUNT', ScriptOpcode.DB_FIND_REFINE_WITH_COUNT],
    ['DB_FIND', ScriptOpcode.DB_FIND],
    ['DB_FIND_REFINE', ScriptOpcode.DB_FIND_REFINE],
    ['DB_LISTALL', ScriptOpcode.DB_LISTALL],
    ['ERROR', ScriptOpcode.ERROR],
    ['MAP_PRODUCTION', ScriptOpcode.MAP_PRODUCTION],
    ['MAP_LASTCLOCK', ScriptOpcode.MAP_LASTCLOCK],
    ['MAP_LASTWORLD', ScriptOpcode.MAP_LASTWORLD],
    ['MAP_LASTCLIENTIN', ScriptOpcode.MAP_LASTCLIENTIN],
    ['MAP_LASTNPC', ScriptOpcode.MAP_LASTNPC],
    ['MAP_LASTPLAYER', ScriptOpcode.MAP_LASTPLAYER],
    ['MAP_LASTLOGOUT', ScriptOpcode.MAP_LASTLOGOUT],
    ['MAP_LASTLOGIN', ScriptOpcode.MAP_LASTLOGIN],
    ['MAP_LASTZONE', ScriptOpcode.MAP_LASTZONE],
    ['MAP_LASTCLIENTOUT', ScriptOpcode.MAP_LASTCLIENTOUT],
    ['MAP_LASTCLEANUP', ScriptOpcode.MAP_LASTCLEANUP],
    ['MAP_LASTBANDWIDTHIN', ScriptOpcode.MAP_LASTBANDWIDTHIN],
    ['MAP_LASTBANDWIDTHOUT', ScriptOpcode.MAP_LASTBANDWIDTHOUT],
    ['TIMESPENT', ScriptOpcode.TIMESPENT],
    ['GETTIMESPENT', ScriptOpcode.GETTIMESPENT],
    ['CONSOLE', ScriptOpcode.CONSOLE],
]);

export const ScriptOpcodeNameMap: Map<number, string> = new Map(
    Array.from(ScriptOpcodeMap.entries()).map(([key, value]) => [value, key])
);
