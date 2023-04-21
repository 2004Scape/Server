// Client does not have a scrambled lookup for this, so we're adding it as-is (no difference between ID/opcode in this revision)
export const ServerProt = {
    IF_SETCOLOUR: 2,
    IF_OPENBOTTOM: 14,
    IF_OPENSUB: 28,
    IF_SETHIDE: 26,
    IF_SETOBJECT: 46,
    IF_SETTAB_ACTIVE: 84,
    IF_SETMODEL: 87,
    IF_SETMODEL_COLOUR: 103,
    IF_SETTAB_FLASH: 126,
    IF_CLOSESUB: 129,
    IF_SETANIM: 146,
    IF_SETTAB: 167,
    IF_OPENTOP: 168,
    IF_OPENSTICKY: 185,
    IF_OPENSIDEBAR: 195,
    IF_SETPLAYERHEAD: 197,
    IF_SETTEXT: 201,
    IF_SETNPCHEAD: 204,
    IF_SETPOSITION: 209,
    IF_IAMOUNT: 243,
    IF_MULTIZONE: 254,

    UPDATE_INV_CLEAR: 15,
    UPDATE_INV_FULL: 98,
    UPDATE_INV_PARTIAL: 213,

    CAM_FORCEANGLE: 3,
    CAM_SHAKE: 13,
    CAM_MOVETO: 74,
    CAM_RESET: 239,

    NPC_INFO: 1,
    PLAYER_INFO: 184,

    CLEAR_WALKING_QUEUE: 19,
    UPDATE_RUNWEIGHT: 22,
    HINT_ARROW: 25,
    UPDATE_REBOOT_TIMER: 43,
    UPDATE_STAT: 44,
    UPDATE_RUNENERGY: 68,
    FINISH_TRACKING: 133,
    RESET_ANIMS: 136,
    UPDATE_UID192: 139,
    LAST_LOGIN_INFO: 140,
    LOGOUT: 142,
    ENABLE_TRACKING: 226,
    MESSAGE_GAME: 4,
    UPDATE_IGNORELIST: 21,
    CHAT_FILTER_SETTINGS: 32,
    MESSAGE_PRIVATE: 41,
    UPDATE_FRIENDLIST: 152,

    DATA_LOC_DONE: 20,
    DATA_LAND_DONE: 80,
    DATA_LAND: 132,
    DATA_LOC: 220,
    LOAD_AREA: 237,

    VARP_SMALL: 150,
    VARP_LARGE: 175,
    RESET_CLIENT_VARCACHE: 193,

    SYNTH_SOUND: 12,
    MIDI_SONG: 54,
    MIDI_JINGLE: 212,

    UPDATE_ZONE_PARTIAL_FOLLOWS: 7,
    UPDATE_ZONE_FULL_FOLLOWS: 135,
    UPDATE_ZONE_PARTIAL_ENCLOSED: 162,

    LOC_ADD_CHANGE: 23,
    LOC_ANIM: 42,
    OBJ_DEL: 49,
    OBJ_ADD: 50,
    LOC_ADD: 59,
    MAP_PROJANIM: 69,
    LOC_DEL: 76,
    OBJ_COUNT: 151,
    MAP_ANIM: 191,
    OBJ_REVEAL: 223
};

// generate reverse lookup
const names = Object.keys(ServerProt);
for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const id = ServerProt[name];
    ServerProt[id] = name;
}

export const ServerProtOpcode = new Int16Array(256); // opcode -> ID
export const ServerProtOpcodeFromID = new Int16Array(256); // ID -> opcode
export const ServerProtSize = new Int16Array(256);

ServerProtOpcode.fill(-1);
ServerProtOpcodeFromID.fill(-1);

ServerProtOpcode[2] = ServerProt.IF_SETCOLOUR;
ServerProtSize[2] = 4;

ServerProtOpcode[14] = ServerProt.IF_OPENBOTTOM;
ServerProtSize[14] = 2;

ServerProtOpcode[28] = ServerProt.IF_OPENSUB;
ServerProtSize[28] = 4;

ServerProtOpcode[26] = ServerProt.IF_SETHIDE;
ServerProtSize[26] = 3;

ServerProtOpcode[46] = ServerProt.IF_SETOBJECT;
ServerProtSize[46] = 6;

ServerProtOpcode[84] = ServerProt.IF_SETTAB_ACTIVE;
ServerProtSize[84] = 1;

ServerProtOpcode[87] = ServerProt.IF_SETMODEL;
ServerProtSize[87] = 4;

ServerProtOpcode[103] = ServerProt.IF_SETMODEL_COLOUR;
ServerProtSize[103] = 6;

ServerProtOpcode[126] = ServerProt.IF_SETTAB_FLASH;
ServerProtSize[126] = 1;

ServerProtOpcode[129] = ServerProt.IF_CLOSESUB;
ServerProtSize[129] = 0;

ServerProtOpcode[146] = ServerProt.IF_SETANIM;
ServerProtSize[146] = 4;

ServerProtOpcode[167] = ServerProt.IF_SETTAB;
ServerProtSize[167] = 3;

ServerProtOpcode[168] = ServerProt.IF_OPENTOP;
ServerProtSize[168] = 2;

ServerProtOpcode[185] = ServerProt.IF_OPENSTICKY;
ServerProtSize[185] = 2;

ServerProtOpcode[195] = ServerProt.IF_OPENSIDEBAR;
ServerProtSize[195] = 2;

ServerProtOpcode[197] = ServerProt.IF_SETPLAYERHEAD;
ServerProtSize[197] = 2;

ServerProtOpcode[201] = ServerProt.IF_SETTEXT;
ServerProtSize[201] = -2;

ServerProtOpcode[204] = ServerProt.IF_SETNPCHEAD;
ServerProtSize[204] = 4;

ServerProtOpcode[209] = ServerProt.IF_SETPOSITION;
ServerProtSize[209] = 6;

ServerProtOpcode[243] = ServerProt.IF_IAMOUNT;
ServerProtSize[243] = 0;

ServerProtOpcode[254] = ServerProt.IF_MULTIZONE;
ServerProtSize[254] = 1;

ServerProtOpcode[15] = ServerProt.UPDATE_INV_CLEAR;
ServerProtSize[15] = 2;

ServerProtOpcode[98] = ServerProt.UPDATE_INV_FULL;
ServerProtSize[98] = -2;

ServerProtOpcode[213] = ServerProt.UPDATE_INV_PARTIAL;
ServerProtSize[213] = -2;

ServerProtOpcode[3] = ServerProt.CAM_FORCEANGLE;
ServerProtSize[3] = 6;

ServerProtOpcode[13] = ServerProt.CAM_SHAKE;
ServerProtSize[13] = 4;

ServerProtOpcode[74] = ServerProt.CAM_MOVETO;
ServerProtSize[74] = 6;

ServerProtOpcode[239] = ServerProt.CAM_RESET;
ServerProtSize[239] = 0;

ServerProtOpcode[1] = ServerProt.NPC_INFO;
ServerProtSize[1] = -2;

ServerProtOpcode[184] = ServerProt.PLAYER_INFO;
ServerProtSize[184] = -2;

ServerProtOpcode[19] = ServerProt.CLEAR_WALKING_QUEUE;
ServerProtSize[19] = 0;

ServerProtOpcode[22] = ServerProt.UPDATE_RUNWEIGHT;
ServerProtSize[22] = 2;

ServerProtOpcode[25] = ServerProt.HINT_ARROW;
ServerProtSize[25] = 6;

ServerProtOpcode[43] = ServerProt.UPDATE_REBOOT_TIMER;
ServerProtSize[43] = 2;

ServerProtOpcode[44] = ServerProt.UPDATE_STAT;
ServerProtSize[44] = 6;

ServerProtOpcode[68] = ServerProt.UPDATE_RUNENERGY;
ServerProtSize[68] = 1;

ServerProtOpcode[133] = ServerProt.FINISH_TRACKING;
ServerProtSize[133] = 0;

ServerProtOpcode[136] = ServerProt.RESET_ANIMS;
ServerProtSize[136] = 0;

ServerProtOpcode[139] = ServerProt.UPDATE_UID192;
ServerProtSize[139] = 2;

ServerProtOpcode[140] = ServerProt.LAST_LOGIN_INFO;
ServerProtSize[140] = 9;

ServerProtOpcode[142] = ServerProt.LOGOUT;
ServerProtSize[142] = 0;

ServerProtOpcode[226] = ServerProt.ENABLE_TRACKING;
ServerProtSize[226] = 0;

ServerProtOpcode[4] = ServerProt.MESSAGE_GAME;
ServerProtSize[4] = -1;

ServerProtOpcode[21] = ServerProt.UPDATE_IGNORELIST;
ServerProtSize[21] = -2;

ServerProtOpcode[32] = ServerProt.CHAT_FILTER_SETTINGS;
ServerProtSize[32] = 3;

ServerProtOpcode[41] = ServerProt.MESSAGE_PRIVATE;
ServerProtSize[41] = -1;

ServerProtOpcode[152] = ServerProt.UPDATE_FRIENDLIST;
ServerProtSize[152] = 9;

ServerProtOpcode[20] = ServerProt.DATA_LOC_DONE;
ServerProtSize[20] = 2;

ServerProtOpcode[80] = ServerProt.DATA_LAND_DONE;
ServerProtSize[80] = 2;

ServerProtOpcode[132] = ServerProt.DATA_LAND;
ServerProtSize[132] = -2;

ServerProtOpcode[220] = ServerProt.DATA_LOC;
ServerProtSize[220] = -2;

ServerProtOpcode[237] = ServerProt.LOAD_AREA;
ServerProtSize[237] = -2;

ServerProtOpcode[150] = ServerProt.VARP_SMALL;
ServerProtSize[150] = 3;

ServerProtOpcode[175] = ServerProt.VARP_LARGE;
ServerProtSize[175] = 6;

ServerProtOpcode[193] = ServerProt.RESET_CLIENT_VARCACHE;
ServerProtSize[193] = 0;

ServerProtOpcode[12] = ServerProt.SYNTH_SOUND;
ServerProtSize[12] = 5;

ServerProtOpcode[54] = ServerProt.MIDI_SONG;
ServerProtSize[54] = -1;

ServerProtOpcode[212] = ServerProt.MIDI_JINGLE;
ServerProtSize[212] = -2;

ServerProtOpcode[7] = ServerProt.UPDATE_ZONE_PARTIAL_FOLLOWS;
ServerProtSize[7] = 2;

ServerProtOpcode[135] = ServerProt.UPDATE_ZONE_FULL_FOLLOWS;
ServerProtSize[135] = 2;

ServerProtOpcode[162] = ServerProt.UPDATE_ZONE_PARTIAL_ENCLOSED;
ServerProtSize[162] = -2;

ServerProtOpcode[23] = ServerProt.LOC_ADD_CHANGE;
ServerProtSize[23] = 14;

ServerProtOpcode[42] = ServerProt.LOC_ANIM;
ServerProtSize[42] = 4;

ServerProtOpcode[49] = ServerProt.OBJ_DEL;
ServerProtSize[49] = 3;

ServerProtOpcode[50] = ServerProt.OBJ_ADD;
ServerProtSize[50] = 7;

ServerProtOpcode[59] = ServerProt.LOC_ADD;
ServerProtSize[59] = 4;

ServerProtOpcode[69] = ServerProt.MAP_PROJANIM;
ServerProtSize[69] = 15;

ServerProtOpcode[76] = ServerProt.LOC_DEL;
ServerProtSize[76] = 2;

ServerProtOpcode[151] = ServerProt.OBJ_COUNT;
ServerProtSize[151] = 7;

ServerProtOpcode[191] = ServerProt.MAP_ANIM;
ServerProtSize[191] = 6;

ServerProtOpcode[223] = ServerProt.OBJ_REVEAL;
ServerProtSize[223] = 5;

// generate reverse lookup
for (let i = 0; i < 256; i++) {
    if (ServerProtOpcode[i] !== -1) {
        ServerProtOpcodeFromID[ServerProtOpcode[i]] = i;
    }
}
