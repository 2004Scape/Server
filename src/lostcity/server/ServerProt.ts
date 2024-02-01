export enum ServerProt {
    // interfaces
    IF_OPENCHATMODAL = 14,
    IF_OPENMAINSIDEMODAL = 28,
    IF_CLOSE = 129, // NXT has "IF_CLOSESUB"
    IF_OPENSIDEOVERLAY = 167,
    IF_OPENMAINMODAL = 168,
    IF_OPENSIDEMODAL = 195,

    // updating interfaces
    IF_SETCOLOUR = 2, // NXT naming
    IF_SETHIDE = 26, // NXT naming
    IF_SETOBJECT = 46, // NXT naming
    IF_SHOWSIDE = 84,
    IF_SETMODEL = 87, // NXT naming
    IF_SETRECOL = 103, // NXT naming
    IF_SETANIM = 146, // NXT naming
    IF_SETPLAYERHEAD = 197, // NXT naming
    IF_SETTEXT = 201, // NXT naming
    IF_SETNPCHEAD = 204, // NXT naming
    IF_SETPOSITION = 209, // NXT naming

    // tutorial area
    TUTORIAL_FLASHSIDE = 126,
    TUTORIAL_OPENCHAT = 185,

    // inventory
    UPDATE_INV_STOP_TRANSMIT = 15, // NXT naming
    UPDATE_INV_FULL = 98, // NXT naming
    UPDATE_INV_PARTIAL = 213, // NXT naming

    // camera control
    CAM_LOOKAT = 3, // NXT naming
    CAM_SHAKE = 13, // NXT naming
    CAM_MOVETO = 74, // NXT naming
    CAM_RESET = 239, // NXT naming

    // entity updates
    NPC_INFO = 1, // NXT naming
    PLAYER_INFO = 184, // NXT naming

    // input tracking
    FINISH_TRACKING = 133,
    ENABLE_TRACKING = 226,

    // social
    MESSAGE_GAME = 4, // NXT naming
    UPDATE_IGNORELIST = 21, // NXT naming
    CHAT_FILTER_SETTINGS = 32, // NXT naming
    MESSAGE_PRIVATE = 41, // NXT naming
    UPDATE_FRIENDLIST = 152, // NXT naming

    // misc
    UNSET_MAP_FLAG = 19, // NXT has "SET_MAP_FLAG" but we cannot control the position
    UPDATE_RUNWEIGHT = 22, // NXT naming
    HINT_ARROW = 25, // NXT naming
    UPDATE_REBOOT_TIMER = 43, // NXT naming
    UPDATE_STAT = 44, // NXT naming
    UPDATE_RUNENERGY = 68, // NXT naming
    RESET_ANIMS = 136, // NXT naming
    UPDATE_UID192 = 139, // NXT naming (not 100% certain if "uid192" means local player)
    LAST_LOGIN_INFO = 140, // NXT naming
    LOGOUT = 142, // NXT naming
    P_COUNTDIALOG = 243, // named after runescript command + client resume_p_countdialog packet
    SET_MULTIWAY = 254,

    // maps
    DATA_LOC_DONE = 20,
    DATA_LAND_DONE = 80,
    DATA_LAND = 132,
    DATA_LOC = 220,
    REBUILD_NORMAL = 237, // NXT naming (do we really need _normal if there's no region rebuild?)

    // vars
    VARP_SMALL = 150, // NXT naming
    VARP_LARGE = 175, // NXT naming
    RESET_CLIENT_VARCACHE = 193, // NXT naming

    // audio
    SYNTH_SOUND = 12, // NXT naming
    MIDI_SONG = 54, // NXT naming
    MIDI_JINGLE = 212, // NXT naming

    // zones
    UPDATE_ZONE_PARTIAL_FOLLOWS = 7, // NXT naming
    UPDATE_ZONE_FULL_FOLLOWS = 135, // NXT naming
    UPDATE_ZONE_PARTIAL_ENCLOSED = 162, // NXT naming

    // zone protocol
    LOC_MERGE = 23, // based on runescript command p_locmerge
    LOC_ANIM = 42, // NXT naming
    OBJ_DEL = 49, // NXT naming
    OBJ_REVEAL = 50, // NXT naming
    LOC_ADD_CHANGE = 59, // NXT naming
    MAP_PROJANIM = 69, // NXT naming
    LOC_DEL = 76, // NXT naming
    OBJ_COUNT = 151, // NXT naming
    MAP_ANIM = 191, // NXT naming
    OBJ_ADD = 223 // NXT naming
}
