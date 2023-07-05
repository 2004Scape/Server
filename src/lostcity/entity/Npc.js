export default class Npc {
    static ANIM = 0x2;
    static FACE_ENTITY = 0x4;
    static FORCED_CHAT = 0x8;
    static DAMAGE = 0x10;
    static TRANSMOGRIFY = 0x20;
    static SPOTANIM = 0x40;
    static FACE_COORD = 0x80;

    nid = -1;
    type = -1;

    x = -1;
    z = -1;
    level = -1;

    // runtime variables

    startX = -1;
    startZ = -1;
    orientation = -1;

    walkDir = -1;
    steps = [];

    mask = 0;
    faceX = -1;
    faceZ = -1;
    faceEntity = -1;
}
