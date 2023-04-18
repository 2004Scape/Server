// Order taken from client's scrambled opcode array
export const ClientProt = {
    MAP_REQUEST_AREAS: 4,
    NO_TIMEOUT: 6,
    IDLE_TIMER: 30,
    EVENT_TRACKING: 34,
    EVENT_CAMERA_POSITION: 35,

    ANTICHEAT_OPLOC4: 60,
    ANTICHEAT_OPNPC3: 61,
    ANTICHEAT_OPHELD1: 62,
    ANTICHEAT_OPNPC5: 63,
    ANTICHEAT_OPHELD4: 64,
    ANTICHEAT_OPLOC5: 65,
    ANTICHEAT_IF_BUTTON5: 66,
    ANTICHEAT_OPPLAYER2: 67,
    ANTICHEAT_IF_BUTTON4: 68,
    ANTICHEAT_SIDEBAR_INPUT: 70,
    ANTICHEAT_DRAW: 71,
    ANTICHEAT_UPDATE2: 72,
    ANTICHEAT_UPDATE_PLAYERS: 73,
    ANTICHEAT_UPDATE: 74,
    ANTICHEAT_UPDATE_LOCS: 75,

    OPOBJ1: 80,
    OPOBJ2: 81,
    OPOBJ3: 82,
    OPOBJ4: 83,
    OPOBJ5: 84,
    OPOBJT: 88,
    OPOBJU: 89,

    OPNPC1: 100,
    OPNPC2: 101,
    OPNPC3: 102,
    OPNPC4: 103,
    OPNPC5: 104,
    OPNPCT: 108,
    OPNPCU: 109,

    OPLOC1: 120,
    OPLOC2: 121,
    OPLOC3: 122,
    OPLOC4: 123,
    OPLOC5: 124,
    OPLOCT: 128,
    OPLOCU: 129,

    OPPLAYER1: 140,
    OPPLAYER2: 141,
    OPPLAYER3: 142,
    OPPLAYER4: 143,
    OPPLAYERT: 148,
    OPPLAYERU: 149,

    OPHELD1: 160,
    OPHELD2: 161,
    OPHELD3: 162,
    OPHELD4: 163,
    OPHELD5: 164,
    OPHELDT: 168,
    OPHELDU: 169,

    IF_BUTTON1: 190,
    IF_BUTTON2: 191,
    IF_BUTTON3: 192,
    IF_BUTTON4: 193,
    IF_BUTTON5: 194,
    IF_BUTTON: 200,

    RESUME_PAUSEBUTTON: 201,
    CLOSE_MODAL: 202,
    RESUME_P_COUNTDIALOG: 203,
    IF_FLASHING_TAB: 204,
    MOVE_OPCLICK: 242,
    BUG_REPORT: 243,
    MOVE_MINIMAPCLICK: 244,
    IF_BUTTOND: 245,
    IGNORELIST_DEL: 246,
    IGNORELIST_ADD: 247,
    IF_DESIGN: 248,
    CHAT_SETMODE: 249,
    MESSAGE_PRIVATE: 250,
    FRIENDLIST_DEL: 251,
    FRIENDLIST_ADD: 252,
    CLIENT_CHEAT: 253,
    MESSAGE_PUBLIC: 254,
    MOVE_GAMECLICK: 255
};

// generate reverse lookup
const names = Object.keys(ClientProt);
for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const id = ClientProt[name];
    ClientProt[id] = name;
}

export const ClientProtOpcode = new Int16Array(256); // opcode -> ID
export const ClientProtOpcodeFromID = new Int16Array(256); // ID -> opcode
export const ClientProtSize = new Int16Array(256);

ClientProtOpcode.fill(-1);
ClientProtOpcodeFromID.fill(-1);

ClientProtOpcode[146] = ClientProt.ANTICHEAT_DRAW;
ClientProtSize[146] = -1;

ClientProtOpcode[215] = ClientProt.ANTICHEAT_UPDATE;
ClientProtSize[215] = 3;

ClientProtOpcode[236] = ClientProt.ANTICHEAT_UPDATE2;
ClientProtSize[236] = 4;

ClientProtOpcode[85] = ClientProt.ANTICHEAT_UPDATE_LOCS;
ClientProtSize[85] = 0;

ClientProtOpcode[219] = ClientProt.ANTICHEAT_UPDATE_PLAYERS;
ClientProtSize[219] = -1;

ClientProtOpcode[233] = ClientProt.ANTICHEAT_SIDEBAR_INPUT;
ClientProtSize[233] = -1;

ClientProtOpcode[155] = ClientProt.IF_BUTTON;
ClientProtSize[155] = 2;

ClientProtOpcode[31] = ClientProt.IF_BUTTON1;
ClientProtSize[31] = 6;

ClientProtOpcode[59] = ClientProt.IF_BUTTON2;
ClientProtSize[59] = 6;

ClientProtOpcode[212] = ClientProt.IF_BUTTON3;
ClientProtSize[212] = 6;

ClientProtOpcode[38] = ClientProt.IF_BUTTON4;
ClientProtSize[38] = 6;

ClientProtOpcode[238] = ClientProt.ANTICHEAT_IF_BUTTON4;
ClientProtSize[238] = 1;

ClientProtOpcode[6] = ClientProt.IF_BUTTON5;
ClientProtSize[6] = 6;

ClientProtOpcode[17] = ClientProt.ANTICHEAT_IF_BUTTON5;
ClientProtSize[17] = 4;

ClientProtOpcode[159] = ClientProt.IF_BUTTOND;
ClientProtSize[159] = 6;

ClientProtOpcode[175] = ClientProt.IF_FLASHING_TAB;
ClientProtSize[175] = 1;

ClientProtOpcode[52] = ClientProt.IF_DESIGN;
ClientProtSize[52] = 13;

ClientProtOpcode[231] = ClientProt.CLOSE_MODAL;
ClientProtSize[231] = 0;

ClientProtOpcode[235] = ClientProt.RESUME_PAUSEBUTTON;
ClientProtSize[235] = 2;

ClientProtOpcode[237] = ClientProt.RESUME_P_COUNTDIALOG;
ClientProtSize[237] = 4;

ClientProtOpcode[194] = ClientProt.OPNPC1;
ClientProtSize[194] = 2;

ClientProtOpcode[8] = ClientProt.OPNPC2;
ClientProtSize[8] = 2;

ClientProtOpcode[27] = ClientProt.OPNPC3;
ClientProtSize[27] = 2;

ClientProtOpcode[88] = ClientProt.ANTICHEAT_OPNPC3;
ClientProtSize[88] = 4;

ClientProtOpcode[113] = ClientProt.OPNPC4;
ClientProtSize[113] = 2;

ClientProtOpcode[100] = ClientProt.OPNPC5;
ClientProtSize[100] = 2;

ClientProtOpcode[176] = ClientProt.ANTICHEAT_OPNPC5;
ClientProtSize[176] = 2;

ClientProtOpcode[202] = ClientProt.OPNPCU;
ClientProtSize[202] = 8;

ClientProtOpcode[134] = ClientProt.OPNPCT;
ClientProtSize[134] = 4;

ClientProtOpcode[245] = ClientProt.OPLOC1;
ClientProtSize[245] = 6;

ClientProtOpcode[172] = ClientProt.OPLOC2;
ClientProtSize[172] = 6;

ClientProtOpcode[96] = ClientProt.OPLOC3;
ClientProtSize[96] = 6;

ClientProtOpcode[97] = ClientProt.OPLOC4;
ClientProtSize[97] = 6;

ClientProtOpcode[7] = ClientProt.ANTICHEAT_OPLOC4;
ClientProtSize[7] = 4;

ClientProtOpcode[116] = ClientProt.OPLOC5;
ClientProtSize[116] = 6;

ClientProtOpcode[66] = ClientProt.ANTICHEAT_OPLOC5;
ClientProtSize[66] = 4;

ClientProtOpcode[75] = ClientProt.OPLOCU;
ClientProtSize[75] = 12;

ClientProtOpcode[9] = ClientProt.OPLOCT;
ClientProtSize[9] = 8;

ClientProtOpcode[140] = ClientProt.OPOBJ1;
ClientProtSize[140] = 6;

ClientProtOpcode[40] = ClientProt.OPOBJ2;
ClientProtSize[40] = 6;

ClientProtOpcode[200] = ClientProt.OPOBJ3;
ClientProtSize[200] = 6;

ClientProtOpcode[178] = ClientProt.OPOBJ4;
ClientProtSize[178] = 6;

ClientProtOpcode[247] = ClientProt.OPOBJ5;
ClientProtSize[247] = 6;

ClientProtOpcode[239] = ClientProt.OPOBJU;
ClientProtSize[239] = 12;

ClientProtOpcode[138] = ClientProt.OPOBJT;
ClientProtSize[138] = 8;

ClientProtOpcode[195] = ClientProt.OPHELD1;
ClientProtSize[195] = 6;

ClientProtOpcode[30] = ClientProt.ANTICHEAT_OPHELD1;
ClientProtSize[30] = 3;

ClientProtOpcode[71] = ClientProt.OPHELD2;
ClientProtSize[71] = 6;

ClientProtOpcode[133] = ClientProt.OPHELD3;
ClientProtSize[133] = 6;

ClientProtOpcode[157] = ClientProt.OPHELD4;
ClientProtSize[157] = 6;

ClientProtOpcode[220] = ClientProt.ANTICHEAT_OPHELD4;
ClientProtSize[220] = 0;

ClientProtOpcode[211] = ClientProt.OPHELD5;
ClientProtSize[211] = 6;

ClientProtOpcode[130] = ClientProt.OPHELDU;
ClientProtSize[130] = 12;

ClientProtOpcode[48] = ClientProt.OPHELDT;
ClientProtSize[48] = 8;

ClientProtOpcode[164] = ClientProt.OPPLAYER1;
ClientProtSize[164] = 2;

ClientProtOpcode[53] = ClientProt.OPPLAYER2;
ClientProtSize[53] = 2;

ClientProtOpcode[2] = ClientProt.ANTICHEAT_OPPLAYER2;
ClientProtSize[2] = 2;

ClientProtOpcode[185] = ClientProt.OPPLAYER3;
ClientProtSize[185] = 2;

ClientProtOpcode[206] = ClientProt.OPPLAYER4;
ClientProtSize[206] = 2;

ClientProtOpcode[248] = ClientProt.OPPLAYERU;
ClientProtSize[248] = 8;

ClientProtOpcode[177] = ClientProt.OPPLAYERT;
ClientProtSize[177] = 4;

ClientProtOpcode[244] = ClientProt.CHAT_SETMODE;
ClientProtSize[244] = 3;

ClientProtOpcode[190] = ClientProt.BUG_REPORT;
ClientProtSize[190] = 10;

ClientProtOpcode[158] = ClientProt.MESSAGE_PUBLIC;
ClientProtSize[158] = -1;

ClientProtOpcode[148] = ClientProt.MESSAGE_PRIVATE;
ClientProtSize[148] = -1;

ClientProtOpcode[118] = ClientProt.FRIENDLIST_ADD;
ClientProtSize[118] = 8;

ClientProtOpcode[11] = ClientProt.FRIENDLIST_DEL;
ClientProtSize[11] = 8;

ClientProtOpcode[79] = ClientProt.IGNORELIST_ADD;
ClientProtSize[79] = 8;

ClientProtOpcode[171] = ClientProt.IGNORELIST_DEL;
ClientProtSize[171] = 8;

ClientProtOpcode[165] = ClientProt.MOVE_MINIMAPCLICK;
ClientProtSize[165] = -1;

ClientProtOpcode[181] = ClientProt.MOVE_GAMECLICK;
ClientProtSize[181] = -1;

ClientProtOpcode[93] = ClientProt.MOVE_OPCLICK;
ClientProtSize[93] = -1;

ClientProtOpcode[189] = ClientProt.EVENT_CAMERA_POSITION;
ClientProtSize[189] = 6;

ClientProtOpcode[4] = ClientProt.CLIENT_CHEAT;
ClientProtSize[4] = -1;

ClientProtOpcode[108] = ClientProt.NO_TIMEOUT;
ClientProtSize[108] = 0;

ClientProtOpcode[70] = ClientProt.IDLE_TIMER;
ClientProtSize[70] = 0;

ClientProtOpcode[150] = ClientProt.MAP_REQUEST_AREAS;
ClientProtSize[150] = -1;

ClientProtOpcode[81] = ClientProt.EVENT_TRACKING;
ClientProtSize[81] = -2;

// generate reverse lookup
for (let i = 0; i < 256; i++) {
    if (ClientProtOpcode[i] !== -1) {
        ClientProtOpcodeFromID[ClientProtOpcode[i]] = i;
    }
}
