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
    damageTaken = -1;
    damageType = -1;
    currentHealth = 10;
    maxHealth = 10;

    resetMasks() {
        if (this.mask === 0) {
            return;
        }

        this.mask = 0;
        this.damageTaken = -1;
        this.damageType = -1;
    }

    applyDamage(damage, type) {
        this.damageTaken = damage;
        this.damageType = type;

        this.currentHealth -= damage;
        if (this.currentHealth < 0) {
            this.currentHealth = 0;
        }

        this.mask |= Npc.DAMAGE;
    }
}
