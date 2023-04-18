export class Npc {
    static ANIM = 0x2;
    static FACE_ENTITY = 0x4;
    static FORCED_CHAT = 0x8;
    static DAMAGE = 0x10;
    static TRANSMOGRIFY = 0x20;
    static SPOTANIM = 0x40;
    static FACE_COORD = 0x80;

    nid = -1; // server identifier
    id = 0; // cache identifier
    target = null;

    startX = 0;
    startZ = 0;
    startPlane = 0;
    startDir = -1;

    x = 0;
    z = 0;
    plane = 0;
    orientation = -1;

    wander = 5;
    movementUpdate = false;
    steps = [];
    step = -1;
    walkDir = -1;
    runDir = -1;

    // update masks
    mask = 0;
    animId = -1;
    animDelay = 0;
    faceEntity = -1;
    forcedChat = null;
    damageTaken = 0;
    damageType = 0;
    currentHealth = 0;
    maxHealth = 0;
    transmogId = 0;
    graphicId = 0;
    graphicHeight = 0;
    graphicDelay = 0;
    faceX = -1;
    faceZ = -1;
}
