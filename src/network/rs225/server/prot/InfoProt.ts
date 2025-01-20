import ServerProt from '#/network/rs225/server/prot/ServerProt.js';

export default class InfoProt extends ServerProt {
    static readonly PLAYER_APPEARANCE = new InfoProt(0x1, -1);
    static readonly PLAYER_ANIM = new InfoProt(0x2, 3);
    static readonly PLAYER_FACE_ENTITY = new InfoProt(0x4, 2);
    static readonly PLAYER_SAY = new InfoProt(0x8, -2);
    static readonly PLAYER_DAMAGE = new InfoProt(0x10, 4);
    static readonly PLAYER_FACE_COORD = new InfoProt(0x20, 4);
    static readonly PLAYER_CHAT = new InfoProt(0x40, -2);
    static readonly PLAYER_BIG_UPDATE = new InfoProt(0x80, 1);
    static readonly PLAYER_SPOTANIM = new InfoProt(0x100, 6);
    static readonly PLAYER_EXACT_MOVE = new InfoProt(0x200, 9);

    static readonly NPC_ANIM = new InfoProt(0x2, 3);
    static readonly NPC_FACE_ENTITY = new InfoProt(0x4, 2);
    static readonly NPC_SAY = new InfoProt(0x8, -2);
    static readonly NPC_DAMAGE = new InfoProt(0x10, 4);
    static readonly NPC_CHANGE_TYPE = new InfoProt(0x20, 2);
    static readonly NPC_SPOTANIM = new InfoProt(0x40, 6);
    static readonly NPC_FACE_COORD = new InfoProt(0x80, 4);
}