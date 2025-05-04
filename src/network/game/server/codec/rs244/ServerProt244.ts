import ServerProtBase from '#/network/game/server/codec/ServerProtBase.js';

export default class ServerProt244 extends ServerProtBase {
    // interfaces
    static readonly IF_OPENCHAT = new ServerProt244(189, 2);
    static readonly IF_OPENMAIN_SIDE = new ServerProt244(207, 4);
    static readonly IF_CLOSE = new ServerProt244(214, 0);
    static readonly IF_SETTAB = new ServerProt244(200, 3);
    static readonly IF_SETTAB_ACTIVE = new ServerProt244(56, 1);
    static readonly IF_OPENMAIN = new ServerProt244(10, 2);
    static readonly IF_OPENSIDE = new ServerProt244(176, 2);
    static readonly IF_OPENOVERLAY = new ServerProt244(158, 2);

    // updating interfaces
    static readonly IF_SETCOLOUR = new ServerProt244(78, 4); // NXT naming
    static readonly IF_SETHIDE = new ServerProt244(123, 3); // NXT naming
    static readonly IF_SETOBJECT = new ServerProt244(164, 6); // NXT naming
    static readonly IF_SETMODEL = new ServerProt244(245, 4); // NXT naming
    static readonly IF_SETRECOL = new ServerProt244(103, 6); // NXT naming
    static readonly IF_SETANIM = new ServerProt244(219, 4); // NXT naming
    static readonly IF_SETPLAYERHEAD = new ServerProt244(108, 2); // NXT naming
    static readonly IF_SETTEXT = new ServerProt244(154, -2); // NXT naming
    static readonly IF_SETNPCHEAD = new ServerProt244(129, 4); // NXT naming
    static readonly IF_SETPOSITION = new ServerProt244(241, 6); // NXT naming

    // tutorial area
    static readonly TUT_FLASH = new ServerProt244(168, 1);
    static readonly TUT_OPEN = new ServerProt244(174, 2);

    // inventory
    static readonly UPDATE_INV_STOP_TRANSMIT = new ServerProt244(162, 2); // NXT naming
    static readonly UPDATE_INV_FULL = new ServerProt244(72, -2); // NXT naming
    static readonly UPDATE_INV_PARTIAL = new ServerProt244(132, -2); // NXT naming

    // camera control
    static readonly CAM_LOOKAT = new ServerProt244(222, 6); // NXT naming
    static readonly CAM_SHAKE = new ServerProt244(50, 4); // NXT naming
    static readonly CAM_MOVETO = new ServerProt244(12, 6); // NXT naming
    static readonly CAM_RESET = new ServerProt244(53, 0); // NXT naming

    // entity updates
    static readonly NPC_INFO = new ServerProt244(244, -2); // NXT naming
    static readonly PLAYER_INFO = new ServerProt244(86, -2); // NXT naming

    // input tracking
    static readonly FINISH_TRACKING = new ServerProt244(60, 0);
    static readonly ENABLE_TRACKING = new ServerProt244(22, 0);

    // social
    static readonly MESSAGE_GAME = new ServerProt244(95, -1); // NXT naming
    static readonly UPDATE_IGNORELIST = new ServerProt244(7, -2); // NXT naming
    static readonly CHAT_FILTER_SETTINGS = new ServerProt244(9, 3); // NXT naming
    static readonly MESSAGE_PRIVATE = new ServerProt244(30, -1); // NXT naming
    static readonly UPDATE_FRIENDLIST = new ServerProt244(70, 9); // NXT naming

    // misc
    static readonly UNSET_MAP_FLAG = new ServerProt244(62, 0); // NXT has "SET_MAP_FLAG" but we cannot control the position
    static readonly UPDATE_RUNWEIGHT = new ServerProt244(160, 2); // NXT naming
    static readonly HINT_ARROW = new ServerProt244(49, 6); // NXT naming
    static readonly UPDATE_REBOOT_TIMER = new ServerProt244(85, 2); // NXT naming
    static readonly UPDATE_STAT = new ServerProt244(24, 6); // NXT naming
    static readonly UPDATE_RUNENERGY = new ServerProt244(177, 1); // NXT naming
    static readonly RESET_ANIMS = new ServerProt244(242, 0); // NXT naming
    static readonly UPDATE_PID = new ServerProt244(210, 3);
    static readonly LAST_LOGIN_INFO = new ServerProt244(44, 9); // NXT naming
    static readonly LOGOUT = new ServerProt244(17, 0); // NXT naming
    static readonly P_COUNTDIALOG = new ServerProt244(152, 0); // named after runescript command + client resume_p_countdialog packet
    static readonly SET_MULTIWAY = new ServerProt244(97, 1);

    // maps
    static readonly REBUILD_NORMAL = new ServerProt244(165, 4); // NXT naming (do we really need _normal if there's no region rebuild?)

    // vars
    static readonly VARP_SMALL = new ServerProt244(236, 3); // NXT naming
    static readonly VARP_LARGE = new ServerProt244(226, 6); // NXT naming
    static readonly RESET_CLIENT_VARCACHE = new ServerProt244(87, 0); // NXT naming

    // audio
    static readonly SYNTH_SOUND = new ServerProt244(151, 5); // NXT naming
    static readonly MIDI_SONG = new ServerProt244(240, 2); // NXT naming
    static readonly MIDI_JINGLE = new ServerProt244(212, 4); // NXT naming

    // zones
    static readonly UPDATE_ZONE_PARTIAL_FOLLOWS = new ServerProt244(94, 2); // NXT naming
    static readonly UPDATE_ZONE_FULL_FOLLOWS = new ServerProt244(131, 2); // NXT naming
    static readonly UPDATE_ZONE_PARTIAL_ENCLOSED = new ServerProt244(233, -2); // NXT naming
}
