export const ClientProt = {
    MAP_REQUEST_AREAS: 150, // 4
    IDLE_TIMER: 70, // 6

    NO_TIMEOUT: 108, // 30
    EVENT_TRACKING: 81, // 34
    EVENT_CAMERA_POSITION: 189, // 35

    ANTICHEAT_OPLOC4: 7, // 60
    ANTICHEAT_OPNPC3: 88, // 61
    ANTICHEAT_OPHELD1: 30, // 62
    ANTICHEAT_OPNPC5: 176, // 63
    ANTICHEAT_OPHELD4: 220, // 64
    ANTICHEAT_OPLOC5: 66, // 65
    ANTICHEAT_IF_BUTTON5: 17, // 66
    ANTICHEAT_OPPLAYER2: 2, // 67
    ANTICHEAT_IF_BUTTON4: 238, // 68

    ANTICHEAT_SIDEBAR_INPUT: 233, // 70
    ANTICHEAT_DRAW: 146, // 71
    ANTICHEAT_UPDATE: 215, // 74
    ANTICHEAT_UPDATE2: 236, // 72
    ANTICHEAT_UPDATE_LOCS: 85, // 75
    ANTICHEAT_UPDATE_PLAYERS: 219, // 73

    OPOBJ1: 140, // 80
    OPOBJ2: 40, // 81
    OPOBJ3: 200, // 82
    OPOBJ4: 178, // 83
    OPOBJ5: 247, // 84
    OPOBJT: 138, // 88
    OPOBJU: 239, // 89

    OPNPC1: 194, // 100
    OPNPC2: 8, // 101
    OPNPC3: 27, // 102
    OPNPC4: 113, // 103
    OPNPC5: 100, // 104
    OPNPCT: 134, // 108
    OPNPCU: 202, // 109

    OPLOC1: 245, // 120
    OPLOC2: 172, // 121
    OPLOC3: 96, // 122
    OPLOC4: 97, // 123
    OPLOC5: 116, // 124
    OPLOCT: 9, // 128
    OPLOCU: 75, // 129

    OPPLAYER1: 164, // 140
    OPPLAYER2: 53, // 141
    OPPLAYER3: 185, // 142
    OPPLAYER4: 206, // 143
    OPPLAYERT: 177, // 148
    OPPLAYERU: 248, // 149

    OPHELD1: 195, // 160
    OPHELD2: 71, // 161
    OPHELD3: 133, // 162
    OPHELD4: 157, // 163
    OPHELD5: 211, // 164
    OPHELDT: 48, // 168
    OPHELDU: 130, // 169

    IF_BUTTON1: 31, // 190
    IF_BUTTON2: 59, // 191
    IF_BUTTON3: 212, // 192
    IF_BUTTON4: 38, // 193
    IF_BUTTON5: 6, // 194
    IF_BUTTON: 155, // 200

    RESUME_PAUSEBUTTON: 235, // 201
    CLOSE_MODAL: 231, // 202
    RESUME_P_COUNTDIALOG: 237, // 203
    IF_FLASHING_TAB: 175, // 204

    MOVE_OPCLICK: 93, // 242
    BUG_REPORT: 190, // 243
    MOVE_MINIMAPCLICK: 165, // 244
    IF_BUTTOND: 159, // 245
    IGNORELIST_DEL: 171, // 246
    IGNORELIST_ADD: 79, // 247
    IF_DESIGN: 52, // 248
    CHAT_SETMODE: 244, // 249
    MESSAGE_PRIVATE: 148, // 250
    FRIENDLIST_DEL: 11, // 251
    FRIENDLIST_ADD: 118, // 252
    CLIENT_CHEAT: 4, // 253
    MESSAGE_PUBLIC: 158, // 254
    MOVE_GAMECLICK: 181, // 255
};

// generate reverse lookup:
export const ClientProtNames: Record<number, string> = {};
Object.keys(ClientProt).forEach((key: keyof typeof ClientProt) => ClientProtNames[ClientProt[key]] = key);

export const ClientProtLengths: number[] = [];

ClientProtLengths[ClientProt.MAP_REQUEST_AREAS] = -1;
ClientProtLengths[ClientProt.IDLE_TIMER] = 0;
ClientProtLengths[ClientProt.NO_TIMEOUT] = 0;

ClientProtLengths[ClientProt.EVENT_TRACKING] = -2;
ClientProtLengths[ClientProt.EVENT_CAMERA_POSITION] = 6;

ClientProtLengths[ClientProt.ANTICHEAT_OPLOC4] = 4;
ClientProtLengths[ClientProt.ANTICHEAT_OPNPC3] = 4;
ClientProtLengths[ClientProt.ANTICHEAT_OPHELD1] = 3;
ClientProtLengths[ClientProt.ANTICHEAT_OPNPC5] = 2;
ClientProtLengths[ClientProt.ANTICHEAT_OPHELD4] = 0;
ClientProtLengths[ClientProt.ANTICHEAT_OPLOC5] = 4;
ClientProtLengths[ClientProt.ANTICHEAT_IF_BUTTON5] = 4;
ClientProtLengths[ClientProt.ANTICHEAT_OPPLAYER2] = 2;
ClientProtLengths[ClientProt.ANTICHEAT_IF_BUTTON4] = 1;

ClientProtLengths[ClientProt.ANTICHEAT_SIDEBAR_INPUT] = 1;
ClientProtLengths[ClientProt.ANTICHEAT_DRAW] = -1;
ClientProtLengths[ClientProt.ANTICHEAT_UPDATE] = 3;
ClientProtLengths[ClientProt.ANTICHEAT_UPDATE2] = 4;
ClientProtLengths[ClientProt.ANTICHEAT_UPDATE_LOCS] = 0;
ClientProtLengths[ClientProt.ANTICHEAT_UPDATE_PLAYERS] = -1;

ClientProtLengths[ClientProt.OPOBJ1] = 6;
ClientProtLengths[ClientProt.OPOBJ2] = 6;
ClientProtLengths[ClientProt.OPOBJ3] = 6;
ClientProtLengths[ClientProt.OPOBJ4] = 6;
ClientProtLengths[ClientProt.OPOBJ5] = 6;
ClientProtLengths[ClientProt.OPOBJT] = 8;
ClientProtLengths[ClientProt.OPOBJU] = 12;

ClientProtLengths[ClientProt.OPNPC1] = 2;
ClientProtLengths[ClientProt.OPNPC2] = 2;
ClientProtLengths[ClientProt.OPNPC3] = 2;
ClientProtLengths[ClientProt.OPNPC4] = 2;
ClientProtLengths[ClientProt.OPNPC5] = 2;
ClientProtLengths[ClientProt.OPNPCT] = 4;
ClientProtLengths[ClientProt.OPNPCU] = 8;

ClientProtLengths[ClientProt.OPLOC1] = 6;
ClientProtLengths[ClientProt.OPLOC2] = 6;
ClientProtLengths[ClientProt.OPLOC3] = 6;
ClientProtLengths[ClientProt.OPLOC4] = 6;
ClientProtLengths[ClientProt.OPLOC5] = 6;
ClientProtLengths[ClientProt.OPLOCT] = 8;
ClientProtLengths[ClientProt.OPLOCU] = 12;

ClientProtLengths[ClientProt.OPPLAYER1] = 2;
ClientProtLengths[ClientProt.OPPLAYER2] = 2;
ClientProtLengths[ClientProt.OPPLAYER3] = 2;
ClientProtLengths[ClientProt.OPPLAYER4] = 2;
ClientProtLengths[ClientProt.OPPLAYERT] = 4;
ClientProtLengths[ClientProt.OPPLAYERU] = 8;

ClientProtLengths[ClientProt.OPHELD1] = 6;
ClientProtLengths[ClientProt.OPHELD2] = 6;
ClientProtLengths[ClientProt.OPHELD3] = 6;
ClientProtLengths[ClientProt.OPHELD4] = 6;
ClientProtLengths[ClientProt.OPHELD5] = 6;
ClientProtLengths[ClientProt.OPHELDT] = 8;
ClientProtLengths[ClientProt.OPHELDU] = 12;

ClientProtLengths[ClientProt.IF_BUTTON1] = 6;
ClientProtLengths[ClientProt.IF_BUTTON2] = 6;
ClientProtLengths[ClientProt.IF_BUTTON3] = 6;
ClientProtLengths[ClientProt.IF_BUTTON4] = 6;
ClientProtLengths[ClientProt.IF_BUTTON5] = 6;
ClientProtLengths[ClientProt.IF_BUTTON] = 2;

ClientProtLengths[ClientProt.RESUME_PAUSEBUTTON] = 2;
ClientProtLengths[ClientProt.CLOSE_MODAL] = 0;
ClientProtLengths[ClientProt.RESUME_P_COUNTDIALOG] = 4;
ClientProtLengths[ClientProt.IF_FLASHING_TAB] = 1;

ClientProtLengths[ClientProt.MOVE_OPCLICK] = -1;
ClientProtLengths[ClientProt.BUG_REPORT] = 10;
ClientProtLengths[ClientProt.MOVE_MINIMAPCLICK] = -1;
ClientProtLengths[ClientProt.IF_BUTTOND] = 6;
ClientProtLengths[ClientProt.IGNORELIST_DEL] = 8;
ClientProtLengths[ClientProt.IGNORELIST_ADD] = 8;
ClientProtLengths[ClientProt.IF_DESIGN] = 13;
ClientProtLengths[ClientProt.CHAT_SETMODE] = 3;
ClientProtLengths[ClientProt.MESSAGE_PRIVATE] = -1;
ClientProtLengths[ClientProt.FRIENDLIST_DEL] = 8;
ClientProtLengths[ClientProt.FRIENDLIST_ADD] = 8;
ClientProtLengths[ClientProt.CLIENT_CHEAT] = -1;
ClientProtLengths[ClientProt.MESSAGE_PUBLIC] = -1;
ClientProtLengths[ClientProt.MOVE_GAMECLICK] = -1;
