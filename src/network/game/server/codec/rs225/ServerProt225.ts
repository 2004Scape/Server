import ServerProtBase from '#/network/game/server/codec/ServerProtBase.js';

export default class ServerProt225 extends ServerProtBase {
    // interfaces
    static readonly IF_OPENCHAT = new ServerProt225(14, 2);
    static readonly IF_OPENMAIN_SIDE = new ServerProt225(28, 4);
    static readonly IF_CLOSE = new ServerProt225(129, 0);
    static readonly IF_SETTAB = new ServerProt225(167, 3);
    static readonly IF_OPENMAIN = new ServerProt225(168, 2);
    static readonly IF_OPENSIDE = new ServerProt225(195, 2);

    // updating interfaces
    static readonly IF_SETCOLOUR = new ServerProt225(2, 4); // NXT naming
    static readonly IF_SETHIDE = new ServerProt225(26, 3); // NXT naming
    static readonly IF_SETOBJECT = new ServerProt225(46, 6); // NXT naming
    static readonly IF_SETTAB_ACTIVE = new ServerProt225(84, 1);
    static readonly IF_SETMODEL = new ServerProt225(87, 4); // NXT naming
    static readonly IF_SETRECOL = new ServerProt225(103, 6); // NXT naming
    static readonly IF_SETANIM = new ServerProt225(146, 4); // NXT naming
    static readonly IF_SETPLAYERHEAD = new ServerProt225(197, 2); // NXT naming
    static readonly IF_SETTEXT = new ServerProt225(201, -2); // NXT naming
    static readonly IF_SETNPCHEAD = new ServerProt225(204, 4); // NXT naming
    static readonly IF_SETPOSITION = new ServerProt225(209, 6); // NXT naming

    // tutorial area
    static readonly TUT_FLASH = new ServerProt225(126, 1);
    static readonly TUT_OPEN = new ServerProt225(185, 2);

    // inventory
    static readonly UPDATE_INV_STOP_TRANSMIT = new ServerProt225(15, 2); // NXT naming
    static readonly UPDATE_INV_FULL = new ServerProt225(98, -2); // NXT naming
    static readonly UPDATE_INV_PARTIAL = new ServerProt225(213, -2); // NXT naming

    // camera control
    static readonly CAM_LOOKAT = new ServerProt225(74, 6); // NXT naming
    static readonly CAM_SHAKE = new ServerProt225(13, 4); // NXT naming
    static readonly CAM_MOVETO = new ServerProt225(3, 6); // NXT naming
    static readonly CAM_RESET = new ServerProt225(239, 0); // NXT naming

    // entity updates
    static readonly NPC_INFO = new ServerProt225(1, -2); // NXT naming
    static readonly PLAYER_INFO = new ServerProt225(184, -2); // NXT naming

    // input tracking
    static readonly FINISH_TRACKING = new ServerProt225(133, 0);
    static readonly ENABLE_TRACKING = new ServerProt225(226, 0);

    // social
    static readonly MESSAGE_GAME = new ServerProt225(4, -1); // NXT naming
    static readonly UPDATE_IGNORELIST = new ServerProt225(21, -2); // NXT naming
    static readonly CHAT_FILTER_SETTINGS = new ServerProt225(32, 3); // NXT naming
    static readonly MESSAGE_PRIVATE = new ServerProt225(41, -1); // NXT naming
    static readonly UPDATE_FRIENDLIST = new ServerProt225(152, 9); // NXT naming

    // misc
    static readonly UNSET_MAP_FLAG = new ServerProt225(19, 0); // NXT has "SET_MAP_FLAG" but we cannot control the position
    static readonly UPDATE_RUNWEIGHT = new ServerProt225(22, 2); // NXT naming
    static readonly HINT_ARROW = new ServerProt225(25, 6); // NXT naming
    static readonly UPDATE_REBOOT_TIMER = new ServerProt225(43, 2); // NXT naming
    static readonly UPDATE_STAT = new ServerProt225(44, 6); // NXT naming
    static readonly UPDATE_RUNENERGY = new ServerProt225(68, 1); // NXT naming
    static readonly RESET_ANIMS = new ServerProt225(136, 0); // NXT naming
    static readonly UPDATE_PID = new ServerProt225(139, 2);
    static readonly LAST_LOGIN_INFO = new ServerProt225(140, 9); // NXT naming
    static readonly LOGOUT = new ServerProt225(142, 0); // NXT naming
    static readonly P_COUNTDIALOG = new ServerProt225(243, 0); // named after runescript command + client resume_p_countdialog packet
    static readonly SET_MULTIWAY = new ServerProt225(254, 1);

    // maps
    static readonly DATA_LOC_DONE = new ServerProt225(20, 2);
    static readonly DATA_LAND_DONE = new ServerProt225(80, 2);
    static readonly DATA_LAND = new ServerProt225(132, -2);
    static readonly DATA_LOC = new ServerProt225(220, -2);
    static readonly REBUILD_NORMAL = new ServerProt225(237, -2); // NXT naming (do we really need _normal if there's no region rebuild?)

    // vars
    static readonly VARP_SMALL = new ServerProt225(150, 3); // NXT naming
    static readonly VARP_LARGE = new ServerProt225(175, 6); // NXT naming
    static readonly RESET_CLIENT_VARCACHE = new ServerProt225(193, 0); // NXT naming

    // audio
    static readonly SYNTH_SOUND = new ServerProt225(12, 5); // NXT naming
    static readonly MIDI_SONG = new ServerProt225(54, -1); // NXT naming
    static readonly MIDI_JINGLE = new ServerProt225(212, -2); // NXT naming

    // zones
    static readonly UPDATE_ZONE_PARTIAL_FOLLOWS = new ServerProt225(7, 2); // NXT naming
    static readonly UPDATE_ZONE_FULL_FOLLOWS = new ServerProt225(135, 2); // NXT naming
    static readonly UPDATE_ZONE_PARTIAL_ENCLOSED = new ServerProt225(162, -2); // NXT naming
}
